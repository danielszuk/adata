import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { CommonDirectivesModule } from '../../directives/common-directives.module';
import { CommonComponentsModule } from '../common-components.module';

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [CommonModule, CommonComponentsModule, CommonDirectivesModule],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule {}
