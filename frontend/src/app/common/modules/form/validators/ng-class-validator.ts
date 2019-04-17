import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Validator } from 'class-validator';

export const NgClassValidator = (
  name: string,
  isValidationConditional: boolean,
  constraints: any[] = []
): ValidatorFn => {
  const validator = new Validator();

  if (typeof validator[name] !== 'function') {
    throw new Error(`There is no class-validator named '${name}'`);
  }

  return (control: AbstractControl) => {
    if (isValidationConditional && control.value == null) {
      return null;
    } else if (constraints && validator[name](control.value, ...constraints)) {
      return null;
    } else if (!constraints && validator[name](control.value)) {
      return null;
    } else {
      return {
        [name]: constraints
      };
    }
  };
};
