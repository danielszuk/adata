import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormErrorComponent } from 'src/app/common/modules/form/components/form-error/form-error.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { AutosizeDirective } from './directives/autosize';
import { CommonComponentsModule } from '../../components/common-components.module';

@NgModule({
  declarations: [
    FormInputComponent,
    FormErrorComponent,
    FormTextareaComponent,
    FormSelectComponent,
    AutosizeDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonComponentsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormErrorComponent,
    FormTextareaComponent,
    FormSelectComponent
  ]
})
export class FormModule {}
