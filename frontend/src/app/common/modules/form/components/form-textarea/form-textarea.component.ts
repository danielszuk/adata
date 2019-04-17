import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormFieldComponent } from '../form-field-component';

@Component({
  selector: 'adata-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss', '../../style/form-field.scss']
})
export class FormTextareaComponent extends FormFieldComponent
  implements OnInit, OnDestroy {
  constructor() {
    super();
  }

  ngOnInit() {
    this.NgOnInit();
  }

  ngOnDestroy() {
    this.NgOnDestroy();
  }
}
