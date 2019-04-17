import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './clickOutside';

@NgModule({
  declarations: [ClickOutsideDirective],
  exports: [ClickOutsideDirective]
})
export class CommonDirectivesModule {}
