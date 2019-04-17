import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as Moment from 'moment-mini';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  private userInactivityTimeoutIn = 30; // in minutes
  private userInactivityTimeout;

  private lastActivityMoment: Moment.Moment;
  private _userInactive$ = new BehaviorSubject<Date>(null);

  constructor() {
    this.onUserAction();
  }

  private resetUserInactivityTimer() {
    if (this.userInactivityTimeout) {
      clearTimeout(this.userInactivityTimeout);
    }

    this._userInactive$.next(null);

    this.userInactivityTimeout = setTimeout(() => {
      // Calculate the inactivityMoment to avoid timeout call delay (e.x. when user come back after computer sleep)
      this._userInactive$.next(
        this.lastActivityMoment
          .add(this.userInactivityTimeoutIn, 'minutes')
          .toDate()
      );
    }, this.userInactivityTimeoutIn * 60 * 1000);
  }

  public get userInactive$(): Observable<Date> {
    return this._userInactive$.asObservable();
  }

  public onUserAction() {
    this.lastActivityMoment = Moment();
    this.resetUserInactivityTimer();
  }
}
