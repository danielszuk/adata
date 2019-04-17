import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisualizationBrowserSearchService {
  private search$ = new BehaviorSubject<string>(null);

  constructor() {}

  public get getSearch(): Observable<string> {
    return this.search$.pipe(skipWhile(o => o === null));
  }

  public setSearch(search: string) {
    this.search$.next(search);
  }
}
