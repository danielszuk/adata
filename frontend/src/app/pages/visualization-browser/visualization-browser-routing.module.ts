import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationBrowserComponent } from 'src/app/pages/visualization-browser/visualization-browser.component';

const routes: Routes = [
  { path: ':search', component: VisualizationBrowserComponent },
  { path: '', component: VisualizationBrowserComponent }
  //{ path: '', redirectTo: '/browser/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationBrowserRoutingModule {}
