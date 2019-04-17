import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { CommonComponentsModule } from '../../components/common-components.module';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [ListComponent, CellComponent],
  imports: [CommonModule, CommonComponentsModule],
  exports: [ListComponent]
})
export class ListModule {}
