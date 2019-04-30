import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { ActivatedRoute } from '@angular/router';
import { VisualizationBrowserSearchService } from 'src/app/common/services/visualization-browser-search.service';
import { WindowService } from 'src/app/common/services/window.service';
import { TruncateText } from '../../common/utils/truncate-text';
import { generateVisualizationMatrixName } from 'src/app/common/modules/visualization/visualization-util/visualization-util.generate-chart-names';
import { IPagination } from '../../common/modules/pagination/pagination.component';

export type VisualizationResponseAndCount = [IVisualizationDomainDTO[], number];

@Component({
  selector: 'adata-visualization-browser',
  templateUrl: './visualization-browser.component.html',
  styleUrls: ['./visualization-browser.component.scss']
})
export class VisualizationBrowserComponent implements OnInit {
  public visualizationLoading = true;
  public visualizations: IVisualizationDomainDTO[];
  private page: number;
  private search: string;

  public pagination: IPagination;
  public TruncateText = TruncateText;

  constructor(
    private readonly http: HttpService,
    private activatedRoute: ActivatedRoute,
    private searchService: VisualizationBrowserSearchService,
    private windowService: WindowService
  ) {}

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (0 < params.page) {
        this.page = params.page;
        if (!this.visualizationLoading) {
          await this.getData();
        }
      }
    });
    this.activatedRoute.params.subscribe(async params => {
      this.search = params.search;
      if (!this.visualizationLoading) {
        await this.getData();
      }
    });
    await this.getData();
  }

  private async getData() {
    this.visualizationLoading = true;
    this.searchService.setSearch(this.search);
    const response = await this.http.get<VisualizationResponseAndCount>(
      this.search
        ? `/visualization/search?keyword=${this.search}&page=${this.page || 1}`
        : `/visualization?page=${this.page || 1}`
    );
    this.visualizations = [];
    this.visualizations = response[0].map(visualization =>
      generateVisualizationMatrixName(visualization)
    );
    this.pagination = {
      count: response[1],
      countPerPage: response['countPerPage']
    };

    this.visualizationLoading = false;
    this.windowService.scrollToTop();
  }
}
