import os
import datetime
import logging
import random
import typing

import aiohttp
from fastapi import HTTPException
from sqlalchemy import and_

from db.models import database, buy_dataset_table, query_table, Status, basket_table
from schemas.models import (
    DatasetStat,
    Query,
    Queries,
    Basket,
    Baskets,
    StatusCode,
    FieldsList,
)
from utils.query import FIELDS_INFO
from utils.generate_models import generate_fields_result
from utils.tools import load_json_config, logger_configuration
from utils.validator import QueryValidator

log = logger_configuration(logging.getLogger(__name__))

CONFIG_PATH = os.getenv("CONF_PATH", "./configs")
headers = load_json_config(CONFIG_PATH, "graphiql.json")


async def send_requests(url: str, body: str, func):
    log.info(f"get query by url={url} body={body}")
    async with aiohttp.ClientSession() as session:
        async with session.post(url=url, json=get_query(body), headers=headers) as resp:
            text = await resp.text()
            if resp.status != 200:
                log.error(f"bad response status={resp.status} text={text}")
                return HTTPException(resp.status, text)
            log.info(f"good response status={resp.status} text={text}")
            log.info(f"start parse response")
            return func(await resp.json())


def get_query(body: str, variables=None) -> dict:
    return {"query": body, "variables": variables}


async def buy_dataset_db(user_id: str, dataset_id: str) -> StatusCode:
    query = buy_dataset_table.insert().values(
        user_id=user_id,
        dataset_id=dataset_id,
        timestamp=datetime.datetime.now(),
    )
    last_record_id = await database.execute(query)
    return StatusCode(**{"id": last_record_id})


async def get_dataset_stat(name: str, url: str) -> DatasetStat:
    data = {"name": name}
    query = FIELDS_INFO % data
    data = await send_requests(url, query, generate_fields_result)
    fieldsCount = 0
    if isinstance(data, FieldsList) and data.fields:
        fieldsCount = len(data.fields)
    query = (
        buy_dataset_table.select()
        .where(buy_dataset_table.c.dataset_id == name)
        .group_by(buy_dataset_table.c.user_id)
    )
    boughtCount = len(await database.fetch_all(query))
    query = query_table.select().where(query_table.c.dataset_id == name)
    queriesCount = len(await database.fetch_all(query))
    model = DatasetStat(
        boughtCount=boughtCount,
        queriesCount=queriesCount,
        rowsCount=random.randint(1000, 10 ** 9),
        fieldsCount=fieldsCount,
    )
    return model


async def start_query(
    user_id: str, dataset_id: str, query: str
) -> typing.Union[StatusCode, HTTPException]:
    if not QueryValidator(query):
        log.error("bad query!")
        return HTTPException(500, "bad query!")
    query = query_table.insert().values(
        user_id=user_id,
        dataset_id=dataset_id,
        query=query,
        status=Status.new,
    )
    last_record_id = await database.execute(query)
    log.info(f"query started with id={last_record_id}")
    return StatusCode(**{"id": last_record_id})


async def stop_query_db(query_id: str) -> StatusCode:
    query = (
        query_table.update()
        .values(
            status=Status.stopped,
        )
        .where(query_table.c.id == query_id)
    )
    await database.execute(query)
    log.info(f"query with id={query_id} stopped")
    return StatusCode(**{"status": "OK"})


async def get_queries_db(user_id: str) -> Queries:
    log.info(f"get queries for user with id={user_id}")
    query = query_table.select().where(query_table.c.user_id == user_id)
    rows = await database.fetch_all(query)
    queries = []
    for row in rows:
        _id, _user_id, dataset_id, query, status = row
        queries.append(
            Query(
                id=_id,
                userId=_user_id,
                datasetId=dataset_id,
                query=query,
                status=status,
            )
        )

    return Queries(queries=queries)


async def add_to_basket_db(user_id: str, dataset_id: str) -> StatusCode:
    log.info(f"add to basket user_id={user_id} dataset_id={dataset_id}")
    query = basket_table.insert().values(
        user_id=user_id,
        dataset_id=dataset_id,
    )
    last_record_id = await database.execute(query)
    return StatusCode(**{"id": last_record_id})


async def get_from_basket_db(user_id: str) -> Baskets:
    log.info(f"get from basket user_id={user_id}")
    query = basket_table.select().where(
        basket_table.c.user_id == user_id,
    )
    rows = await database.fetch_all(query)
    baskets = []
    for row in rows:
        _user_id, dataset_id = row
        baskets.append(
            Basket(
                userId=_user_id,
                datasetId=dataset_id,
            )
        )

    return Baskets(baskets=baskets)


async def drop_from_basket_db(user_id: str, dataset_id: str) -> StatusCode:
    log.info(f"get from basket user_id={user_id} dataset_id={dataset_id}")
    query = basket_table.delete().where(
        and_(
            basket_table.c.user_id == user_id,
            basket_table.c.dataset_id == dataset_id,
        )
    )
    await database.execute(query)
    return StatusCode(**{"status": "OK"})
