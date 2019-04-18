import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/core/http.service';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { ActivatedRoute } from '@angular/router';
import { WindowService } from 'src/app/common/services/window.service';
import { generateVisualizationMatrixName } from 'src/app/common/modules/visualization/visualization-util/visualization-util.generate-chart-names';
import { TruncateText } from 'src/app/common/utils/truncate-text';
import { VisualizationResponseAndCount } from '../visualization-browser.component';

@Component({
  selector: 'adata-visualization-saved',
  templateUrl: '../visualization-browser.component.html',
  styleUrls: ['../visualization-browser.component.scss']
})
export class VisualizationSavedComponent implements OnInit {
  public loading = true;
  public visualizations: IVisualizationDomainDTO[];
  public numberOfVisualizations: number;
  public count: number;
  private page: number;

  public TruncateText = TruncateText;

  constructor(
    private readonly http: HttpService,
    private activatedRoute: ActivatedRoute,
    private windowService: WindowService
  ) {}

  async ngOnInit() {
    console.log('ya');

    this.activatedRoute.queryParams.subscribe(async params => {
      if (0 < params.page) {
        this.page = params.page;
        if (!this.loading) {
          await this.getData();
        }
      }
    });
    await this.getData();
    this.loading = false;
  }

  private async getData() {
    this.loading = true;
    const response = await this.http.get<VisualizationResponseAndCount>(
      `/visualization/my-visualization?page=${this.page || 1}`
    );
    this.visualizations = [];
    this.visualizations = response[0].map(visualization =>
      generateVisualizationMatrixName(visualization)
    );
    this.count = response[1];
    this.loading = false;
    this.windowService.scrollToTop();
  }
}
