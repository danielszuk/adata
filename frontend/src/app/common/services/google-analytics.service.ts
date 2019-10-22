import { Injectable } from '@angular/core';
import { LoadScript } from '../utils/load-script';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private initialize$: Promise<void>;

  constructor(router: Router) {
    this.initialize();

    router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        await this.initialize$;
        GoogleAnalyticsService.gtag('config', environment.googleAnalyticsTrackingId, {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  static gtag(...args): void {
    window.dataLayer.push(arguments);
  }

  private async initialize(): Promise<void> {
    this.initialize$ = new Promise<void>(async resolve => {
      await LoadScript(
        `https://www.googletagmanager.com/gtag/js?id=${
          environment.googleAnalyticsTrackingId
        }`
      );
      window.dataLayer = window.dataLayer || [];
      GoogleAnalyticsService.gtag('js', new Date());
      GoogleAnalyticsService.gtag('config', environment.googleAnalyticsTrackingId);
      resolve();
    });
    await this.initialize$;
  }
}
