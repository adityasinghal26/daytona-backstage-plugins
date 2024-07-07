import { ConfigApi, OAuthApi } from "@backstage/core-plugin-api";
import { Options } from "../types";

export class DaytonaSdkClient {

    private readonly configApi: ConfigApi; 
    private readonly daytonaAuthApi: OAuthApi;

    constructor(options: Options) {
        this.configApi = options.configApi;
        this.daytonaAuthApi = options.daytonaAuthApi;
    }
    
    private async apiUrl() {
        const baseUrl = this.configApi.getOptionalString('daytona.apiBaseUrl') ?? '';
        return baseUrl;
    }

    private async addAuthHeaders(init: RequestInit): Promise<RequestInit> {
        const token = await this.daytonaAuthApi.getAccessToken();
        const headers = init.headers || {};
    
        return {
          ...init,
          headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          }
        };
    }

    public async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
        const apiUrl = await this.apiUrl();
        const authedInit = await this.addAuthHeaders(init || {});
    
        const resp = await fetch(`${apiUrl}${input}`, authedInit);
        if (!resp.ok) {
          throw new Error(`Request failed with ${resp.status} ${resp.statusText}`);
        }
    
        return await resp.json();
    }
}