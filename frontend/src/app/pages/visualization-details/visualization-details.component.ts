import { Component, OnInit } from '@angular/core';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
// tslint:disable-next-line:max-line-length
import { generateVisualizationMatrixName } from 'src/app/common/modules/visualization/visualization-util/visualization-util.generate-chart-names';

@Component({
  selector: 'adata-visualization-details',
  templateUrl: './visualization-details.component.html',
  styleUrls: ['./visualization-details.component.scss']
})
export class VisualizationDetailsComponent implements OnInit {
  public visualization: IVisualizationDomainDTO;
  public fullScreen: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.visualization = undefined;
      this.http
        .get<IVisualizationDomainDTO>(`/visualization/${params.id}`, {
          handledErrorStatusCodes: [404]
        })
        .then(
          visualization => {
            this.visualization = generateVisualizationMatrixName(visualization);
          },
          () => {
            this.router.navigateByUrl('404');
          }
        );
    });
  }
}
