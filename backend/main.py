import logging
import os

import uvicorn
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from db.models import database, start_db
from schemas.models import (
    SearchResult,
    DatasetInfo,
    FieldsList,
    DatasetStat,
    Baskets,
    StatusCode,
    Queries,
)
from utils.generate_models import (
    generate_dataset_result,
    generate_fields_result,
    generate_search_result,
)
from utils.query import SEARCH_QUERY, DATASET_INFO, FIELDS_INFO
from utils.requests_utils import (
    send_requests,
    buy_dataset_db,
    get_dataset_stat,
    start_query,
    stop_query_db,
    get_queries_db,
    get_from_basket_db,
    drop_from_basket_db,
    add_to_basket_db,
)
from utils.tools import get_user_id, logger_configuration

log = logger_configuration(logging.getLogger(__name__))

app = FastAPI(
    title="DataZilla",
    version="0.0.1",
    contact={
        "name": "Полный привод",
    },
)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GRAPHQL_URL = os.getenv("GRAPHQL_URL", "http://datahub.yc.pbd.ai:9002/api/graphql/")


@app.on_event("startup")
async def startup():
    log.info("app startup")
    start_db()
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    log.info("app shutdown")
    await database.disconnect()


@app.get("/search/", response_model=SearchResult)
async def search(
    *, query: str, start: int = 0, count: int = 10, request: Request, response: Response
):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: search dataset by query={query} start={start} count={count}")
    data = {"query": query, "start": start, "count": count}
    query = SEARCH_QUERY % data
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await send_requests(GRAPHQL_URL, query, generate_search_result)


@app.get("/get_dataset/", response_model=DatasetInfo)
async def get_dataset(*, urn: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: get dataset info by name={urn}")
    data = {"name": urn}
    query = DATASET_INFO % data
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await send_requests(GRAPHQL_URL, query, generate_dataset_result)


@app.get("/get_fields/", response_model=FieldsList)
async def get_fields(*, urn: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: get dataset fields by urn={urn}")
    data = {"name": urn}
    query = FIELDS_INFO % data
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await send_requests(GRAPHQL_URL, query, generate_fields_result)


@app.post("/buy_dataset/", response_model=StatusCode)
async def buy_dataset(*, urn: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: buy dataset={urn}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await buy_dataset_db(user_id, urn)


@app.get("/get_dataset_stat/", response_model=DatasetStat)
async def get_dataset_statistic(*, urn: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: get dataset statistic by urn={urn}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await get_dataset_stat(urn, GRAPHQL_URL)


@app.post("/send_query/", response_model=StatusCode)
async def send_query(*, urn: str, query: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: send query by urn={urn}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await start_query(user_id, urn, query)


@app.get("/stop_query/", response_model=StatusCode)
async def stop_query(*, query_id: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: stop query by id={query_id}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await stop_query_db(query_id)


@app.post("/get_queries/", response_model=Queries)
async def get_queries(*, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: get queries for user_id={user_id}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await get_queries_db(user_id)


@app.post("/add_to_basket/")
async def add_to_basket(*, urn: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: add to basket userId={user_id} urn={urn}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await add_to_basket_db(user_id, urn)


@app.get("/get_from_basket/", response_model=Baskets)
async def get_from_basket(*, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: get from basket userId={user_id}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await get_from_basket_db(user_id)


@app.delete("/drop_from_basket/", response_model=StatusCode)
async def drop_from_basket(*, urn: str, request: Request, response: Response):
    user_id = get_user_id(request, log)
    log.info(f"{user_id}: drop from basket userId={user_id} urn={urn}")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return await drop_from_basket_db(user_id, urn)


if __name__ == "__main__":
    uvicorn.run(app, port=8000, loop="asyncio")
