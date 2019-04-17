import { Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmptyBoolean } from 'src/app/common/utils/component-decorators/empty-boolean';

export class FormFieldComponent {
  @ViewChild('input') input: ElementRef<HTMLElement>;

  @Input() public group: FormGroup;
  @Input() public controlName: string;

  @Input() allowEmptyString: boolean;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() autofocus: boolean;

  @Input() size: 'small' | 'medium' | 'large' | 'fill';
  @Input() icon: string;

  @Input()
  errorMessageFieldRequired: string;
  @Input() errorMessageForbiddenValues: string;

  protected valueChangesSub: Subscription;

  protected validator: ValidationErrors;

  constructor() {}

  protected NgOnInit() {
    this.autofocus = EmptyBoolean(this.autofocus);
    const control = this.group.controls[this.controlName];

    // Set empty fields to null (*required for conditional validation to work)
    if (!this.allowEmptyString) {
      if (!control.value) {
        control.setValue(null);
      }

      this.valueChangesSub = control.valueChanges.subscribe(() => {
        if (control.value === '') {
          control.setValue(null);
        }
      });
    }

    // Validation
    if (this.icon && this.label) {
      throw new Error(
        `Can't set both [icon] and [label] properties on the same component`
      );
    }

    if (this.placeholder && this.label) {
      throw new Error(
        `Both placeholder and label are set for '${
          this.controlName
        }'. You should use only one of them.`
      );
    }

    if (!control) {
      throw new Error(
        `There is no control in FormGroup named '${this.controlName}'`
      );
    }

    if (control.validator) {
      this.validator = control.validator({} as AbstractControl);
    }
  }

  protected NgAfterViewInit() {
    if (this.autofocus) {
      this.input.nativeElement.focus();
    }
  }
  protected NgOnDestroy() {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
  }

  public get required() {
    if (this.validator && this.validator.isNotEmpty) {
      return true;
    }
    return false;
  }
}
