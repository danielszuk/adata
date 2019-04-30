import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { HeaderModule } from 'src/app/pages/header/header.module';
import { ConfigService } from 'src/app/core/config/config.service';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageKey } from 'src/app/core/local-storage/local.storage.key';
import { WindowService } from './common/services/window.service';
import { AuthModule } from './common/modules/auth/auth.module';
import { AdminAuthGuard } from './common/modules/auth/guards/admin-auth-guard.service';
import { AuthGuard } from './common/modules/auth/guards/auth-guard.service';
import { VisualizationModule } from './common/modules/visualization/visualization.module';
import { PaginationModule } from './common/modules/pagination/pagination.module';
import { VisualizationBrowserComponent } from './pages/visualization-browser/visualization-browser.component';
import { VisualizationSavedComponent } from './pages/visualization-browser/visualization-saved/visualization-saved.component';
import { CommonComponentsModule } from './common/components/common-components.module';
import { VisualizationDetailsComponent } from './pages/visualization-details/visualization-details.component';
// tslint:disable-next-line:max-line-length
import { VisualizationDetailsFullScreenComponent } from './pages/visualization-details/visualization-details-full-screen/visualization-details-full-screen.component';
import { SocialModule } from './common/modules/social/social.module';

const appInitializerFn = (
  configService: ConfigService
): (() => Promise<any>) => {
  return (): Promise<any> => {
    return configService.init();
  };
};

export function tokenGetter(): string {
  if (localStorage) {
    return localStorage.getItem(LocalStorageKey.JWT);
  } else {
    return undefined;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    VisualizationBrowserComponent,
    VisualizationSavedComponent,
    VisualizationDetailsComponent,
    VisualizationDetailsFullScreenComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    CommonComponentsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    VisualizationModule,
    PaginationModule,
    SocialModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    },
    AdminAuthGuard,
    AuthGuard,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
