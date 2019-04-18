import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { AdminAuthGuard } from './common/modules/auth/guards/admin-auth-guard.service';
import { AuthGuard } from './common/modules/auth/guards/auth-guard.service';
import { AuthCallbackComponent } from './common/modules/auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: 'browser',
    loadChildren:
      'src/app/pages/visualization-browser/visualization-browser.module#VisualizationBrowserModule'
  },
  {
    path: 'visualization',
    loadChildren:
      'src/app/pages/visualization-creator/visualization-creator.module#VisualizationCreatorModule'
  },
  {
    path: 'sync-config',
    loadChildren:
      'src/app/pages/sync-config/sync-config.module#SyncConfigModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'visualization',
    loadChildren:
      'src/app/pages/visualization-details/visualization-details.module#VisualizationDetailsModule'
  },
  {
    path: 'my-visualizations',
    loadChildren:
      'src/app/pages/visualization-saved/visualization-saved.module#VisualizationSavedModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/callback/:jwt',
    component: AuthCallbackComponent
  },
  { path: '', redirectTo: 'browser', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
