import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormFieldComponent } from '../form-field-component';
import { HttpService } from 'src/app/core/http.service';
import { EmptyBoolean } from 'src/app/common/utils/component-decorators/empty-boolean';

export interface IInfiniteScrollConfig<T> {
  api: string;
  pipe?: (T) => string;
}

@Component({
  selector: 'adata-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss', '../../style/form-field.scss']
})
export class FormSelectComponent extends FormFieldComponent
  implements OnInit, OnDestroy {
  @Input() items: any[];

  @Output() change = new EventEmitter();

  @Input() searchable: boolean;
  @Input() bindLabel: string;
  @Input() bindValue: string;

  public loading = false;

  @Input() inifiniteScrollConfig: IInfiniteScrollConfig<any>;
  private scrollDetails: {
    max?: number;
    responseSize?: number;
    infiniteScrollPage?: number;
    firstLoad?: boolean;
  } = { firstLoad: true, infiniteScrollPage: 0 };
  public get ScrollItems() {
    return this.scrollDetails;
  }
  public infiniteScrollAPILoading = false;
  public infiniteScrollSearchTerm = '';

  constructor(private readonly httpService: HttpService) {
    super();
  }

  async ngOnInit() {
    this.NgOnInit();
    this.searchable = EmptyBoolean(this.searchable);

    if (this.inifiniteScrollConfig && !this.isInfiniteScrollAPIValid()) {
      throw new Error(
        `ng-select @Input() 'infiniteScrollAPI' must be a valid string if 'infiniteScroll' is set to 'true'`
      );
    }

    if (this.inifiniteScrollConfig) {
      this.items = await this.loadInfiniteScroll();
    }
  }

  ngOnDestroy() {
    this.NgOnDestroy();
  }

  public onChange(event) {
    this.change.emit(event);
  }

  private isInfiniteScrollAPIValid() {
    return (
      undefined !== this.inifiniteScrollConfig.api &&
      null !== this.inifiniteScrollConfig.api &&
      '' !== this.inifiniteScrollConfig.api
    );
  }

  private async loadInfiniteScroll(): Promise<any[]> {
    if (
      this.inifiniteScrollConfig &&
      this.isInfiniteScrollAPIValid() &&
      !this.infiniteScrollAPILoading
    ) {
      this.infiniteScrollAPILoading = true;
      const response = await this.httpService.get(
        `${this.inifiniteScrollConfig.api}?search=${
          this.infiniteScrollSearchTerm
        }&page=${this.scrollDetails.infiniteScrollPage}`
      );
      this.infiniteScrollAPILoading = false;
      this.scrollDetails.max = response[1];
      if (this.scrollDetails.firstLoad) {
        this.scrollDetails.responseSize = response[0].length;
        this.scrollDetails.firstLoad = false;
      }
      if (this.inifiniteScrollConfig.pipe) {
        this.runPipe(response[0]);
      }

      return response[0];
    }
  }

  public runPipe(objectArray: any[]): any {
    for (let i = objectArray.length - 1; 0 <= i; i--) {
      objectArray[i] = this.inifiniteScrollConfig.pipe(objectArray[i]);
    }
    return objectArray;
  }

  public async onScrollToEnd() {
    // const pageSize = this.scrollDetails.max / this.scrollDetails.responseSize;
    if (
      this.inifiniteScrollConfig &&
      this.scrollDetails.infiniteScrollPage <
        this.scrollDetails.max / this.scrollDetails.responseSize
    ) {
      this.scrollDetails.infiniteScrollPage++;
      const additionalScrollItems = await this.loadInfiniteScroll();
      this.items = [...this.items, ...additionalScrollItems];
    }
  }

  public async onSearch(event) {
    if (this.inifiniteScrollConfig && event !== this.infiniteScrollSearchTerm) {
      this.infiniteScrollSearchTerm = event;
      this.resetScrollDetails();
      this.items = await this.loadInfiniteScroll();
    }
  }

  public async onClear() {
    if (this.inifiniteScrollConfig) {
      this.infiniteScrollSearchTerm = '';
      this.resetScrollDetails();
      this.items = await this.loadInfiniteScroll();
    }
  }

  private resetScrollDetails = () => {
    this.scrollDetails = {
      firstLoad: true,
      max: 0,
      infiniteScrollPage: 0,
      responseSize: 0
    };
  };
}
