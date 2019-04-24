import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { ButtonComponent } from './button/button.component';
import { MetaComponent } from 'src/app/common/components/meta/meta.component';

@NgModule({
  declarations: [
    IconComponent,
    LoaderComponent,
    ButtonComponent,
    MetaComponent
  ],
  imports: [CommonModule],
  exports: [IconComponent, LoaderComponent, ButtonComponent, MetaComponent]
})
export class CommonComponentsModule {}
