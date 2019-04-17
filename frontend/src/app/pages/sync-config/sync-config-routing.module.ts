import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbwbConfigComponent } from './dbwb-config/dbwb-config.component';
import { DimensionsConfigComponent } from './dimensions-config/dimensions-config.component';
import { DbwbAddComponent } from './dbwb-add/dbwb-add.component';

const routes: Routes = [
  { path: 'channels', component: DbwbConfigComponent },
  { path: 'add-channel', component: DbwbAddComponent },
  { path: 'dimensions', component: DimensionsConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyncConfigRoutingModule {}
