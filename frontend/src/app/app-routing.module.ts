import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { AdminAuthGuard } from './common/modules/auth/guards/admin-auth-guard.service';
import { AuthCallbackComponent } from './common/modules/auth/auth-callback/auth-callback.component';
import { VisualizationBrowserComponent } from './pages/visualization-browser/visualization-browser.component';
import { VisualizationSavedComponent } from './pages/visualization-browser/visualization-saved/visualization-saved.component';
import { VisualizationDetailsComponent } from './pages/visualization-details/visualization-details.component';
// tslint:disable-next-line:max-line-length
import { VisualizationDetailsFullScreenComponent } from './pages/visualization-details/visualization-details-full-screen/visualization-details-full-screen.component';

const routes: Routes = [
  { path: 'my-visualizations', component: VisualizationSavedComponent },
  { path: 'browser/:search', component: VisualizationBrowserComponent },
  { path: 'browser', component: VisualizationBrowserComponent },
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
  { path: 'visualization/:id', component: VisualizationDetailsComponent },
  {
    path: 'visualization/:id/full-screen',
    component: VisualizationDetailsFullScreenComponent
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
