import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [IconComponent, LoaderComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [IconComponent, LoaderComponent, ButtonComponent]
})
export class CommonComponentsModule {}
