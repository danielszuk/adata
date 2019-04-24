import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from './config.interface';

@Injectable()
export class ConfigService {
  private _config: IConfig;

  constructor(private http: HttpClient) {}

  public init(): Promise<void> {
    return this.http
      .get<IConfig>('/config/config.json')
      .toPromise()
      .then(config => {
        this._config = config;
      });
  }

  public get config(): IConfig {
    return this._config;
  }
}
