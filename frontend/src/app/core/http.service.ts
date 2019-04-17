import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { UserActivityService } from 'src/app/core/user-activity.service';
// import { AuthService } from 'src/app/common/services/auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';
import { JwtService } from '../common/modules/auth/jwt/jwt.service';

interface HttpOptions {
  params?: { [key: string]: string };
  handledErrorStatusCodes?: number[];
  notUserAction?: boolean;
  headers?: HttpHeaders;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http500$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private userActivityService: UserActivityService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  public get http500$(): Observable<boolean> {
    return this._http500$.asObservable();
  }

  private getApiUrl(url: string): string {
    return this.configService.config.backendUrl + url;
  }

  private getParams(options: HttpOptions): HttpParams {
    let params = new HttpParams();
    if (options.params) {
      Object.keys(options.params).forEach(key => {
        params = params.append(key, options.params[key]);
      });
    }

    return params;
  }

  private handleGeneralHttpErrorResponse(err: HttpErrorResponse): void {
    if (err.status === 401) {
      console.error('HTTP 401');
    } else if (err.status === 500) {
      this._http500$.next(null);
    }
    console.error('Unhandled HTTP Error', err);
  }

  public async get<Type>(
    url: string,
    options: HttpOptions = {}
  ): Promise<Type> {
    options.handledErrorStatusCodes = options.handledErrorStatusCodes || [];

    if (!options.notUserAction) {
      this.userActivityService.onUserAction();
    }

    return new Promise<any>((resolve, reject) => {
      this.http
        .get(this.getApiUrl(url), {
          responseType: 'json',
          params: this.getParams(options),
          headers: this.getHeaders
        })
        .subscribe(
          resp => {
            resolve(resp);
          },
          (err: HttpErrorResponse) => {
            if (options.handledErrorStatusCodes.includes(err.status)) {
              reject(err);
            } else {
              this.handleGeneralHttpErrorResponse(err);
            }
          }
        );
    });
  }

  public async post<Type>(
    url: string,
    body: any,
    options: HttpOptions = {}
  ): Promise<Type> {
    options.handledErrorStatusCodes = options.handledErrorStatusCodes || [];

    if (!options.notUserAction) {
      this.userActivityService.onUserAction();
    }

    return new Promise<any>((resolve, reject) => {
      this.http
        .post(this.getApiUrl(url), body, {
          responseType: 'json',
          params: this.getParams(options),
          headers: this.getHeaders
        })
        .subscribe(
          resp => {
            resolve(resp);
          },
          (err: HttpErrorResponse) => {
            if (options.handledErrorStatusCodes.includes(err.status)) {
              reject(err);
            } else {
              this.handleGeneralHttpErrorResponse(err);
            }
          }
        );
    });
  }

  public async put<Type>(
    url: string,
    body: any,
    options: HttpOptions = {}
  ): Promise<Type> {
    options.handledErrorStatusCodes = options.handledErrorStatusCodes || [];

    if (!options.notUserAction) {
      this.userActivityService.onUserAction();
    }

    return new Promise<any>((resolve, reject) => {
      this.http
        .put(this.getApiUrl(url), body, {
          responseType: 'json',
          params: this.getParams(options),
          headers: this.getHeaders
        })
        .subscribe(
          resp => {
            resolve(resp);
          },
          (err: HttpErrorResponse) => {
            if (options.handledErrorStatusCodes.includes(err.status)) {
              reject(err);
            } else {
              this.handleGeneralHttpErrorResponse(err);
            }
          }
        );
    });
  }

  public async delete<Type>(
    url: string,
    options: HttpOptions = {}
  ): Promise<Type> {
    options.handledErrorStatusCodes = options.handledErrorStatusCodes || [];

    if (!options.notUserAction) {
      this.userActivityService.onUserAction();
    }

    return new Promise<any>((resolve, reject) => {
      this.http
        .delete(this.getApiUrl(url), {
          responseType: 'json',
          params: this.getParams(options),
          headers: this.getHeaders
        })
        .subscribe(
          resp => {
            resolve(resp);
          },
          (err: HttpErrorResponse) => {
            if (options.handledErrorStatusCodes.includes(err.status)) {
              reject(err);
            } else {
              this.handleGeneralHttpErrorResponse(err);
            }
          }
        );
    });
  }

  private get getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.jwtService.getJwtToken}`
    );
  }
}
