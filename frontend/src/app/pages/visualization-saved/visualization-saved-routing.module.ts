import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationSavedComponent } from 'src/app/pages/visualization-saved/visualization-saved.component';

const routes: Routes = [{ path: '', component: VisualizationSavedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationSavedRoutingModule {}
