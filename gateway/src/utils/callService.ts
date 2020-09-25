import axios, { AxiosResponse } from 'axios'
import { serviceUrl, apiSecretKey } from '../config/env'

export function callService(url: string, method: string, data: any) {
    return axios[method](`${serviceUrl}/${url}`, data, { headers: { authorization: apiSecretKey } }).then((resp: AxiosResponse) => resp.data.data)
}