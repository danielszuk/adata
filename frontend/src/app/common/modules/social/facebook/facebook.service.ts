import { Injectable } from '@angular/core';
import {
  FacebookService as NgxFacebookService,
  InitParams
} from 'ngx-facebook';
import { LoadScript } from '../../../utils/load-script';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private readonly params: InitParams;
  private jsInitialized = false;

  constructor(private readonly fb: NgxFacebookService) {
    this.params = {
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
