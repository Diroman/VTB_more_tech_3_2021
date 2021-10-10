import enum
import logging

import databases
import sqlalchemy

from utils.tools import logger_configuration

DATABASE_URL = "sqlite:///./test.db"

log = logger_configuration(logging.getLogger(__name__))

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

buy_dataset_table = sqlalchemy.Table(
    "buy_dataset_table",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("dataset_id", sqlalchemy.String),
    sqlalchemy.Column("timestamp", sqlalchemy.TIMESTAMP),
)


class Status(enum.Enum):
    new = 1
    penning = 2
    stopped = 3
    done = 4


query_table = sqlalchemy.Table(
    "query_table",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("dataset_id", sqlalchemy.String),
    sqlalchemy.Column("query", sqlalchemy.String),
    sqlalchemy.Column("status", sqlalchemy.Enum(Status)),
)

basket_table = sqlalchemy.Table(
    "basket_table",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("dataset_id", sqlalchemy.String),
    sqlalchemy.UniqueConstraint("user_id", "dataset_id", name="uix_1"),
)


def start_db():
    log.info(f"Starting DataBase")
    engine = sqlalchemy.create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )
    metadata.create_all(engine)
