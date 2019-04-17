import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/pages/header/header.service';
import { VisualizationDetailsComponent } from 'src/app/pages/visualization-details/visualization-details.component';

@Component({
  selector: 'adata-visualization-details-full-screen',
  templateUrl: './visualization-details-full-screen.component.html',
  styleUrls: ['./visualization-details-full-screen.component.scss']
})
export class VisualizationDetailsFullScreenComponent implements OnInit {
  constructor(private readonly header: HeaderService) {
    this.header.hide();
  }

  @ViewChild('visualizationDetails')
  private visualizationDetails: VisualizationDetailsComponent;

  ngOnInit() {
    this.visualizationDetails.fullScreen = true;
  }
}
