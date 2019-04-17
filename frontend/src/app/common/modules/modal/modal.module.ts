import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CommonComponentsModule } from '../../components/common-components.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, CommonComponentsModule],
  exports: [ModalComponent]
})
export class ModalModule {}
