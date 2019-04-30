import { Component, OnInit } from '@angular/core';

import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { ActivatedRoute } from '@angular/router';
import { WindowService } from 'src/app/common/services/window.service';
// tslint:disable-next-line:max-line-length
import { generateVisualizationMatrixName } from 'src/app/common/modules/visualization/visualization-util/visualization-util.generate-chart-names';
import { TruncateText } from 'src/app/common/utils/truncate-text';
import {
  VisualizationResponseAndCount,
  VisualizationBrowserComponent
} from '../visualization-browser.component';
import { VisualizationBrowserSearchService } from '../../../common/services/visualization-browser-search.service';
import { HttpService } from '../../../core/http.service';

@Component({
  selector: 'adata-visualization-saved',
  templateUrl: '../visualization-browser.component.html',
  styleUrls: ['../visualization-browser.component.scss']
})
export class VisualizationSavedComponent extends VisualizationBrowserComponent {
  public visualizationLoading = true;
  public visualizations: IVisualizationDomainDTO[];
  public numberOfVisualizations: number;
  public count: number;

  public TruncateText = TruncateText;

  constructor(
    protected readonly http: HttpService,
    protected searchService: VisualizationBrowserSearchService,
    protected activatedRoute: ActivatedRoute,
    protected windowService: WindowService
  ) {
    super(http, activatedRoute, searchService, windowService);
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (0 < params.page) {
        this.page = params.page;
        if (!this.visualizationLoading) {
          await this.getData();
        }
      }
    });
    await this.getData();
    this.visualizationLoading = false;
  }

  protected async getData() {
    this.visualizationLoading = true;
    const response = await this.http.get<VisualizationResponseAndCount>(
      `/visualization/my-visualization?page=${this.page || 1}`
    );
    this.visualizations = [];
    this.visualizations = response[0].map(visualization =>
      generateVisualizationMatrixName(visualization)
    );
    this.count = response[1];
    this.visualizationLoading = false;
    this.windowService.scrollToTop();
  }
}
