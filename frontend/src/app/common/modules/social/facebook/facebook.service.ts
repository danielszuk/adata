import { Injectable } from '@angular/core';
import {
  FacebookService as NgxFacebookService,
  InitParams
} from 'ngx-facebook';
import { ConfigService } from '../../../../core/config/config.service';
import { LoadScript } from '../../../utils/load-script';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private readonly params: InitParams;
  private jsInitialized = false;

  constructor(
    private readonly fb: NgxFacebookService,
    private readonly configService: ConfigService
  ) {
    this.params = {
      appId: this.configService.config.facebookAppId,
      xfbml: true,
      version: 'v3.2'
    };
  }

  public async init() {
    if (!this.jsInitialized) {
      await LoadScript('https://connect.facebook.net/en_US/sdk.js');
      this.jsInitialized = true;
    }
    await this.fb.init(this.params);
  }
}
