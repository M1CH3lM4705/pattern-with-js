export default interface IHttpClient {
  request(endpoint: string, method: string, data: any, headers: Record<string, string>): Promise<any>;

  get(endpoint: string, headers?: Record<string, string | undefined>): Promise<any>;

  post(endpoint: string, data: any, headers: Record<string, string | undefined>): Promise<any>;

  put(endpoint: string, data: any, headers: Record<string, string | undefined>): Promise<any>;

  delete(endpoint: string, headers: Record<string, string | undefined>): Promise<any>;
}