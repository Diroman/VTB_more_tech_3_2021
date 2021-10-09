import {IEventsRequest} from "../api/request/IEventsRequest";

export const filter = (params: IEventsRequest) => {
  return `&limit=${params.limit}&offset=${params.offset}&text=${params.text}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}&byTime=${params.byTime}`
}
