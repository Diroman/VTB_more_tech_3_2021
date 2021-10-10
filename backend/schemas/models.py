from typing import List, Optional

from pydantic import BaseModel

from db.models import Status


class Error(BaseModel):
    text: Optional[str] = None
    code: Optional[int] = None


class Platform(BaseModel):
    urn: Optional[str] = None
    name: Optional[str] = None


class ForeignField(BaseModel):
    field: Optional[str] = None
    parent: Optional[str] = None


class ForeignFields(BaseModel):
    name: Optional[str] = None
    fields: List[ForeignField] = []


class Field(BaseModel):
    id: str
    type: Optional[str] = None
    field: Optional[str] = None
    description: Optional[str] = None
    nullable: bool = False


class SchemaMetadata(BaseModel):
    name: Optional[str] = None
    primaryKeys: List[str] = None
    foreignKeys: List[ForeignField] = None
    fields: Optional[List[Field]] = None


class InstitutionalMemory(BaseModel):
    url: Optional[str] = None
    label: Optional[str] = None
    description: Optional[str] = None
    username: Optional[str] = None


class Owner(BaseModel):
    type: Optional[str] = None
    userType: Optional[str] = None
    username: Optional[str] = None
    urn: Optional[str] = None
    email: Optional[str] = None
    fullName: Optional[str] = None
    pictureLink: Optional[str] = None


class DatasetInfo(BaseModel):
    platform: Optional[Platform] = None
    schemaMetadata: Optional[SchemaMetadata] = None
    info: Optional[List[InstitutionalMemory]] = None
    owners: Optional[List[Owner]]
    error: Optional[Error] = None


class FieldsList(BaseModel):
    fields: Optional[List[Field]] = None
    error: Optional[Error] = None


class Dataset(BaseModel):
    urn: str
    type: str
    name: str
    owners: Optional[List[Owner]]
    description: Optional[List[InstitutionalMemory]]


class SearchResult(BaseModel):
    start: Optional[int] = None
    count: Optional[int] = None
    total: Optional[int] = None
    dataset: Optional[List[Dataset]] = None
    error: Optional[Error] = None


class DatasetStat(BaseModel):
    boughtCount: int = 0
    queriesCount: int = 0
    rowsCount: int = 0
    fieldsCount: int = 0


class Query(BaseModel):
    id: int = 0
    userId: str
    datasetId: str
    query: str
    status: Status


class Queries(BaseModel):
    queries: List[Query]


class Basket(BaseModel):
    userId: int = 0
    datasetId: str


class Baskets(BaseModel):
    baskets: List[Basket]


class StatusCode(BaseModel):
    id: Optional[int] = None
    status: Optional[str] = None
