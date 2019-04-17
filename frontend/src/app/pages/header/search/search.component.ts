import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CallTimeout } from 'src/app/common/modules/form/utils/callTimeout';
import { ConfigService } from 'src/app/core/config/config.service';
import { Router } from '@angular/router';
import { VisualizationBrowserSearchService } from 'src/app/common/services/visualization-browser-search.service';

@Component({
  selector: 'adata-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;

  private searchCallTimeout: CallTimeout;

  constructor(
    fb: FormBuilder,
    configService: ConfigService,
    private router: Router,
    private searchService: VisualizationBrowserSearchService
  ) {
    this.searchForm = fb.group({
      search: ''
    });
    this.searchCallTimeout = new CallTimeout(
      configService.config.inputTimeoutBeforeServerCall
    );
  }

  ngOnInit() {
    this.searchService.getSearch.subscribe(search => {
      this.searchForm.controls.search.setValue(search);
    });
  }

  public search(): void {
    this.searchCallTimeout.clear();
    this.router.navigate([
      '/',
      'browser',
      this.searchForm.controls.search.value
    ]);
  }

  public searchDelayed(): void {
    this.searchCallTimeout.call(() => {
      this.search();
    });
  }
}
