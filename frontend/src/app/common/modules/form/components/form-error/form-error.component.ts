import { Component, OnInit, Input } from '@angular/core';
import { Animations } from 'src/app/common/style/variables/animations';
import { FormFieldComponent } from 'src/app/common/modules/form/components/form-field-component';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'adata-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  animations: [Animations.ngIfHeight]
})
export class FormErrorComponent extends FormFieldComponent implements OnInit {
  @Input()
  force: boolean;

  @Input()
  errorMessage: string;
  @Input()
  errorMessageFieldRequired: string;
  @Input() errorMessageForbiddenValues: string;

  public fieldControl: AbstractControl;

  ngOnInit() {
    if (this.group && this.controlName) {
      this.fieldControl = this.group.controls[this.controlName];
      if (!this.fieldControl) {
        console.error(`Cannot find control with name: '${this.controlName}`);
      }
    }
  }

  public enumValues(enumObj: object): string {
    return Object.values(enumObj).join(', ');
  }
}
