import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationSavedComponent } from './visualization-saved.component';
import { VisualizationSavedRoutingModule } from './visualization-saved-routing.module';

import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { VisualizationModule } from 'src/app/common/modules/visualization/visualization.module';
import { PaginationModule } from 'src/app/common/modules/pagination/pagination.module';

@NgModule({
  declarations: [VisualizationSavedComponent],
  imports: [
    CommonModule,
    VisualizationSavedRoutingModule,
    CommonComponentsModule,
    VisualizationModule,
    PaginationModule
  ]
})
export class VisualizationSavedModule {}
