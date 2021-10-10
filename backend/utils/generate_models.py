import uuid

from schemas.models import (
    DatasetInfo,
    SearchResult,
    Platform,
    ForeignField,
    ForeignFields,
    Field,
    InstitutionalMemory,
    Owner,
    FieldsList,
    Dataset,
)


def generate_dataset_result(data: dict) -> DatasetInfo:
    value = {}
    if "errors" in data:
        value["error"] = {
            "text": data["errors"][0].get("message", "Error"),
            "code": 500,
        }
    if "data" in data and "dataset" in data["data"] and data["data"]["dataset"]:
        dataset = data["data"]["dataset"]
        if "platform" in dataset and dataset["platform"]:
            value["platform"] = Platform(**dataset["platform"])
        if "schemaMetadata" in dataset and dataset["schemaMetadata"]:
            schema = {
                "name": dataset["schemaMetadata"]["name"],
                "primaryKeys": dataset["schemaMetadata"]["primaryKeys"],
            }
            foreign_fields = []
            for val in dataset["schemaMetadata"].get("foreignKeys") or []:
                struct = {
                    "name": val["name"],
                    "fields": [
                        ForeignField(
                            field=field_val["fieldPath"],
                            parent=field_val["parent"],
                        )
                        for field_val in val.get("foreignFields") or []
                    ],
                }
                foreign_fields.append(ForeignFields(**struct))
            schema["foreignKeys"] = foreign_fields
            schema["fields"] = [
                Field(
                    id=uuid.uuid4().hex,
                    type=val["type"],
                    field=val["fieldPath"],
                    description=val["description"],
                    nullable=val["nullable"],
                )
                for val in dataset["schemaMetadata"].get("fields") or []
            ]
            value["schemaMetadata"] = schema
        if "institutionalMemory" in dataset and dataset["institutionalMemory"]:
            if (
                "elements" in dataset["institutionalMemory"]
                and dataset["institutionalMemory"]["elements"]
            ):
                value["info"] = [
                    InstitutionalMemory(
                        url=val["url"],
                        label=val["label"],
                        description=val["description"],
                        username=val["author"]["username"] if val["author"] else None,
                    )
                    for val in dataset["institutionalMemory"]["elements"]
                ]
        if "ownership" in dataset and dataset["ownership"]:
            if "owners" in dataset["ownership"] and dataset["ownership"]["owners"]:
                value["owners"] = [
                    Owner(
                        type=val["type"],
                        userType=val["owner"]["type"] if val["owner"] else None,
                        username=val["owner"]["username"]
                        if val["owner"] and val["owner"].get("__typename") == "CorpUser"
                        else val["owner"]["name"]
                        if val["owner"]
                        else None,
                        urn=val["owner"]["urn"] if val["owner"] else None,
                        email=val["owner"].get("email")
                        if val["owner"] and val["owner"]["properties"]
                        else None,
                        fullName=val["owner"].get("fullName")
                        if val["owner"] and val["owner"]["properties"]
                        else None,
                        pictureLink=val["owner"].get("pictureLink")
                        if val["owner"] and val["owner"]["editableProperties"]
                        else None,
                    )
                    for val in dataset["ownership"]["owners"]
                ]

    return DatasetInfo(**value)


def generate_fields_result(data: dict) -> FieldsList:
    value = {}

    if "errors" in data:
        value["error"] = {
            "text": data["errors"][0].get("message", "Error"),
            "code": 500,
        }
    if "data" in data and "dataset" in data["data"] and data["data"]["dataset"]:
        dataset = data["data"]["dataset"]
        if "schemaMetadata" in dataset and dataset["schemaMetadata"]:
            fields = [
                Field(
                    type=val["type"],
                    field=val["fieldPath"],
                    description=val["description"],
                    nullable=val["nullable"],
                )
                for val in dataset["schemaMetadata"].get("fields") or []
            ]
            value["fields"] = fields

    return FieldsList(**value)


def generate_search_result(data: dict) -> SearchResult:
    value = {}

    if "errors" in data:
        value["error"] = {
            "text": data["errors"][0].get("message", "Error"),
            "code": 500,
        }
    if "data" in data and "search" in data["data"] and data["data"]["search"]:
        value["start"] = data["data"]["search"].get("start")
        value["count"] = data["data"]["search"].get("count")
        value["total"] = data["data"]["search"].get("total")
        datasets = []
        for val in data["data"]["search"].get("searchResults") or []:
            dataset = val["entity"]
            owners = []
            if "ownership" in dataset and dataset["ownership"]:
                if "owners" in dataset["ownership"] and dataset["ownership"]["owners"]:
                    owners = [
                        Owner(
                            type=val["type"],
                            userType=val["owner"]["type"] if val["owner"] else None,
                            username=val["owner"]["username"]
                            if val["owner"]
                            and val["owner"].get("__typename") == "CorpUser"
                            else val["owner"]["name"]
                            if val["owner"]
                            else None,
                            urn=val["owner"]["urn"] if val["owner"] else None,
                            email=val["owner"].get("email")
                            if val["owner"] and val["owner"]["properties"]
                            else None,
                            fullName=val["owner"].get("fullName")
                            if val["owner"] and val["owner"]["properties"]
                            else None,
                            pictureLink=val["owner"].get("pictureLink")
                            if val["owner"] and val["owner"]["editableProperties"]
                            else None,
                        )
                        for val in dataset["ownership"]["owners"]
                    ]
            desc = []
            if "institutionalMemory" in dataset and dataset["institutionalMemory"]:
                if (
                    "elements" in dataset["institutionalMemory"]
                    and dataset["institutionalMemory"]["elements"]
                ):
                    desc = [
                        InstitutionalMemory(
                            url=val["url"],
                            label=val["label"],
                            description=val["description"],
                            username=val["author"]["username"]
                            if val["author"]
                            else None,
                        )
                        for val in dataset["institutionalMemory"]["elements"]
                    ]
            datasets.append(
                Dataset(
                    urn=dataset["urn"],
                    type=dataset["type"],
                    name=dataset["name"],
                    owners=owners,
                    description=desc,
                )
            )
        value["dataset"] = datasets

    return SearchResult(**value)
