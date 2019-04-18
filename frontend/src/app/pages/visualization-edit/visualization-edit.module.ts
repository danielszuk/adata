import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationEditRoutingModule } from './visualization-edit-routing.module';
import { VisualizationEditComponent } from './visualization-edit.component';

@NgModule({
  declarations: [VisualizationEditComponent],
  imports: [CommonModule, VisualizationEditRoutingModule],
  exports: [VisualizationEditComponent]
})
export class VisualizationEditModule {}
