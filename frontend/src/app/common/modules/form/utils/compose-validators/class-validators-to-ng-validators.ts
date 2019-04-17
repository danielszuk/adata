import { Validators } from '@angular/forms';
import { NgClassValidator } from 'src/app/common/modules/form/validators/ng-class-validator';

export const ClassValidatorsToNgValidators = (
  decoratorName: string,
  constraints: any[],
  isValidationConditional: boolean
): Validators[] => {
  return decoratorName === 'isUrl'
    ? [NgClassValidator('isURL', isValidationConditional)]
    : decoratorName === 'isNumber'
    ? [NgClassValidator('isNumberString', isValidationConditional)]
    : [NgClassValidator(decoratorName, isValidationConditional, constraints)];
};
