import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { FormFieldComponent } from 'src/app/common/modules/form/components/form-field-component';

@Component({
  selector: 'adata-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss', '../../style/form-field.scss']
})
export class FormInputComponent extends FormFieldComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input() type: 'text' | 'number';

  constructor() {
    super();
  }

  ngOnInit() {
    this.NgOnInit();
  }

  ngAfterViewInit() {
    this.NgAfterViewInit();
  }

  ngOnDestroy() {
    this.NgOnDestroy();
  }
}
