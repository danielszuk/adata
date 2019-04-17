import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationComponent } from './visualization.component';
import { RouterModule } from '@angular/router';
import { VisualizationMockComponent } from './visualization-mock/visualization-mock.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [VisualizationComponent, VisualizationMockComponent],
  exports: [VisualizationComponent, VisualizationMockComponent]
})
export class VisualizationModule {}
