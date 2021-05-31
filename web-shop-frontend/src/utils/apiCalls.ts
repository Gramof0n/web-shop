import axios, { AxiosRequestConfig } from "axios";

export class ApiCalls {
  private url: string;
  private static instance: ApiCalls;

  private constructor() {
    this.url = "http://localhost:4000/api/v1";
  }

  public static getInstance(): ApiCalls {
    if (!ApiCalls.instance) {
      ApiCalls.instance = new ApiCalls();
    }

    return ApiCalls.instance;
  }

  async get(path: string, config?: AxiosRequestConfig) {
    try {
      const data = await axios.get(this.url + path, config);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async post(path: string, body: object) {
    try {
      const data = await axios.post(this.url + path, body);
      return data;
    } catch (err) {
      return null;
    }
  }

  async put(path: string, body: object) {
    try {
      const data = await axios.put(this.url + path, body);
      return data;
    } catch (err) {
      return null;
    }
  }

  async delete(path: string) {
    try {
      const data = await axios.delete(this.url + path);
      return data;
    } catch (err) {
      return null;
    }
  }
}
