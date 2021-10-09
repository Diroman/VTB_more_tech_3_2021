export interface IEventsRequest {
  offset?: number | any;
  limit?: number | any;
  text?: string | any;
  dateFrom ?: string | null | Date;
  dateTo ?: string | null | Date;
  byTime ?: string | any;
}
