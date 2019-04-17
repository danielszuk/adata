import { Injectable } from '@angular/core';
import { IDimensionDTO } from '../../../shared/modules/dimension/dimension.dto';
import { HttpService } from '../../core/http.service';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {
  private Dimensions: IDimensionDTO[];
  private initialized: Promise<void>;

  constructor(private http: HttpService) {}

  private async initialize() {
    if (!this.initialized) {
      this.initialized = new Promise<void>(async resolve => {
        this.Dimensions = await this.http.get<IDimensionDTO[]>('/dimension');
        resolve();
      });
    }

    await this.initialized;
  }

  public async dimensions(): Promise<IDimensionDTO[]> {
    await this.initialize();
    return this.Dimensions;
  }
}
