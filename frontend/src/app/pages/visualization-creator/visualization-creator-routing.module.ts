import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationCreatorComponent } from 'src/app/pages/visualization-creator/visualization-creator.component';
import { VisualizationEditComponent } from './visualization-edit/visualization-edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: VisualizationCreatorComponent
  },
  {
    path: ':id/edit',
    component: VisualizationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationCreatorRoutingModule {}
