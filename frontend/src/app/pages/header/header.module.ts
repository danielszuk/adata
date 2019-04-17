import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { HamburgerComponent } from 'src/app/pages/header/hamburger/hamburger.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/common/modules/form/form.module';
import { CommonDirectivesModule } from 'src/app/common/directives/common-directives.module';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HamburgerComponent,
    SearchComponent,
    NavigationPanelComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule,
    FormModule,
    CommonDirectivesModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
