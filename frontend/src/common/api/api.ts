import defaultsDeep from 'lodash/defaultsDeep';
import { IResponse } from './response/IResponse';
import { auth } from '../utils/auth';

export interface IFetchResponse<T> extends Response {
  json(): Promise<IResponse<T>>;
}

export enum Routes {
  LOGIN = '/api/auth/login',
  LOGOUT = '/api/auth/logout',
  NEARESTEVENT = '/api/post/nearest_event',
}

export const fetchMain = <T>(route: string, options: RequestInit = {}): Promise<IFetchResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
     Accept: 'application/json',
  };

  return fetch(`${route}`, defaultsDeep(options, {
    headers,
  }));
};

export const fetchMainWithToken = <T>(route: string, options: RequestInit = {}): Promise<IFetchResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${auth.token()}`,
  };

  return fetch(`${route}`, defaultsDeep(options, {
    headers,
  }));
};

export const fetchFile = <T>(route: string, options: RequestInit = {}): Promise<IFetchResponse<T>> => {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryhyb32IFyr6I1DYHV',
  };

  return fetch(`${route}`, defaultsDeep(options, {
    headers,
  }));
};
