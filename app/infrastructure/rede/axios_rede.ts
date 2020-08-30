import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Rede } from '../../domain/rede/rede';
import { RedeResponse } from '../../domain/rede/rede_response';

export class AxiosRede extends Rede {
  async get(url: string, cookies?: string) : Promise<RedeResponse> {
    const params : AxiosRequestConfig = {};
    if(cookies) {
      params["headers"] = {
        Cookie: cookies,
      }
    }
    const response : AxiosResponse = await axios.get(url, params);
    return {
      httpCode: response.status,
      body: response.data,
      cookies: response?.headers['set-cookie'] ?? cookies
    }
  }
  async post(url : string, data : any, contentType : string, cookies : string): Promise<RedeResponse> {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': contentType,
        'Cookie': cookies,
      },
    });
    return {
      httpCode: response.status,
      body: response.data,
      cookies: response?.headers['set-cookie']
    }
  }
}