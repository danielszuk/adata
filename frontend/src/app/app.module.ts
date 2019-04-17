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

const appInitializerFn = (
  configService: ConfigService
): (() => Promise<any>) => {
  return (): Promise<any> => {
    return configService.init();
  };
};

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(LocalStorageKey.JWT);
        }
      }
    })
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
