import axios, { AxiosRequestConfig } from 'axios';

export class HttpService {
  private readonly baseEndpoint;

  constructor(endpoint?: string) {
    this.baseEndpoint = endpoint;
  }

  public HeaderSetting(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: null,
      },
    };
  }

  public GET(url: string) {
    return axios.get(this.baseEndpoint + url, this.HeaderSetting());
  }

  public POST<T>(URL: string, data: T) {
    return axios.post(this.baseEndpoint + URL, data, this.HeaderSetting());
  }

  public PUT<T>(URL: string, data: T) {
    return axios.put(this.baseEndpoint + URL, data, this.HeaderSetting());
  }

  public PATCH(URL: string) {
    return axios.patch(
      this.baseEndpoint + URL,
      undefined,
      this.HeaderSetting(),
    );
  }

  public DELETE(URL: string) {
    return axios.delete(this.baseEndpoint + URL, this.HeaderSetting());
  }
}
