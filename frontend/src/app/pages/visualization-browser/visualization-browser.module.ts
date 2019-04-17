import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { VisualizationBrowserComponent } from './visualization-browser.component';
import { VisualizationBrowserRoutingModule } from 'src/app/pages/visualization-browser/visualization-browser-routing.module';
import { VisualizationModule } from 'src/app/common/modules/visualization/visualization.module';
import { PaginationModule } from 'src/app/common/modules/pagination/pagination.module';

@NgModule({
  declarations: [VisualizationBrowserComponent],
  imports: [
    CommonModule,
    VisualizationBrowserRoutingModule,
    CommonComponentsModule,
    VisualizationModule,
    PaginationModule
  ]
})
export class VisualizationBrowserModule {}
