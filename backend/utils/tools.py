import json
import logging
import os
import sys

from fastapi import Request, HTTPException


def load_json_config(path: str, filename: str):
    fill_name = os.path.join(path, filename)
    with open(fill_name, "rb") as file:
        return json.load(file)


def get_user_id(request: Request, logger):
    if "userId" not in request.headers:
        logger.error(f"no userId in header")
        return "test_user"
        # raise HTTPException(status_code=500, detail="No userId in header")
    return request.headers["userId"]


def logger_configuration(logger):
    logger.setLevel(level=logging.DEBUG)
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    )
    logger.addHandler(handler)
    return logger
