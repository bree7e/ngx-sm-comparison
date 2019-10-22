import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '@ngx-sm/api-interfaces';

import {
  API_DATA_CONFIG_TOKEN,
  ApiDataConfig
} from './api-data-access.interface';

@Injectable()
export class ApiDataAccessService {
  constructor(
    @Inject(API_DATA_CONFIG_TOKEN) private readonly _config: ApiDataConfig,
    private readonly _http: HttpClient
  ) {}

  hello() {
    return this._http.get<Message>(`${this._config.prefix}/hello`);
  }
}
