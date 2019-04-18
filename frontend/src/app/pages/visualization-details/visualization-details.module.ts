import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationDetailsComponent } from './visualization-details.component';
import { VisualizationDetailsRoutingModule } from './visualization-details-routing.module';
import { VisualizationModule } from 'src/app/common/modules/visualization/visualization.module';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { VisualizationDetailsFullScreenComponent } from './visualization-details-full-screen/visualization-details-full-screen.component';
import { SocialModule } from '../../common/modules/social/social.module';

@NgModule({
  declarations: [
    VisualizationDetailsComponent,
    VisualizationDetailsFullScreenComponent
  ],
  imports: [
    CommonModule,
    VisualizationDetailsRoutingModule,
    VisualizationModule,
    CommonComponentsModule,
    SocialModule
  ]
})
export class VisualizationDetailsModule {}
