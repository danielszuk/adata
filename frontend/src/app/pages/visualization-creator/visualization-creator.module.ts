import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationCreatorRoutingModule } from './visualization-creator-routing.module';
import { VisualizationCreatorComponent } from './visualization-creator.component';
import { FormModule } from 'src/app/common/modules/form/form.module';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { VisualizationModule } from 'src/app/common/modules/visualization/visualization.module';
import { CommonDirectivesModule } from 'src/app/common/directives/common-directives.module';
import { MatrixBadgeComponent } from './matrix-badge/matrix-badge.component';
import { ColorPickerModule } from 'src/app/common/components/color-picker/color-picker.module';

@NgModule({
  declarations: [VisualizationCreatorComponent, MatrixBadgeComponent],
  imports: [
    CommonModule,
    VisualizationCreatorRoutingModule,
    VisualizationModule,
    CommonComponentsModule,
    CommonDirectivesModule,
    FormModule,
    ColorPickerModule
  ]
})
export class VisualizationCreatorModule {}
