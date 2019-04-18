import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationCreatorComponent } from 'src/app/pages/visualization-creator/visualization-creator.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizationCreatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationCreatorRoutingModule {}
