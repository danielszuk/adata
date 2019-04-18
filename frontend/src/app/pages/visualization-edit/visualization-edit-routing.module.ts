import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationEditComponent } from './visualization-edit.component';

const routes: Routes = [{ path: '', component: VisualizationEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationEditRoutingModule {}
