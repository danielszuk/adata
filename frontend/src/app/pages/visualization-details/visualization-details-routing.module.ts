import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationDetailsComponent } from 'src/app/pages/visualization-details/visualization-details.component';
// tslint:disable-next-line:max-line-length
import { VisualizationDetailsFullScreenComponent } from 'src/app/pages/visualization-details/visualization-details-full-screen/visualization-details-full-screen.component';

const routes: Routes = [
  { path: ':id', component: VisualizationDetailsComponent },
  {
    path: ':id/full-screen',
    component: VisualizationDetailsFullScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationDetailsRoutingModule {}
