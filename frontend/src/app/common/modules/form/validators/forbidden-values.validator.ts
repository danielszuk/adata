import { ValidatorFn, AbstractControl } from '@angular/forms';

export const ForbiddenValuesValidator = (
  forbiddenValues: string[]
): ValidatorFn => {
  return (control: AbstractControl) => {
    if (forbiddenValues.indexOf(control.value) === -1) {
      return null;
    } else {
      return {
        forbiddenValues: {
          valid: false
        }
      };
    }
  };
};
