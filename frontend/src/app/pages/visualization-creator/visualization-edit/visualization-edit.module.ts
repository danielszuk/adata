import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationEditRoutingModule } from './visualization-edit-routing.module';
import { VisualizationEditComponent } from './visualization-edit.component';
import { MatrixBadgeComponent } from '../matrix-badge/matrix-badge.component';
import { VisualizationModule } from 'src/app/common/modules/visualization/visualization.module';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { CommonDirectivesModule } from 'src/app/common/directives/common-directives.module';
import { FormModule } from 'src/app/common/modules/form/form.module';
import { ColorPickerModule } from 'src/app/common/components/color-picker/color-picker.module';

@NgModule({
  declarations: [VisualizationEditComponent, MatrixBadgeComponent],
  imports: [
    CommonModule,
    VisualizationEditRoutingModule,
    VisualizationModule,
    CommonComponentsModule,
    CommonDirectivesModule,
    FormModule,
    ColorPickerModule
  ]
})
export class VisualizationEditModule {}
