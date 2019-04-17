import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private hidden;

  constructor() {}

  public get visible() {
    return !this.hidden;
  }

  public async hide() {
    this.hidden = true;
  }
}
