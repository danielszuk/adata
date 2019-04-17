import { getFromContainer, MetadataStorage } from 'class-validator';
import { Validators } from '@angular/forms';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';
import { ClassValidatorsToNgValidators } from 'src/app/common/modules/form/utils/compose-validators/class-validators-to-ng-validators';

export const ComposeValidators = (
  domain: any,
  property: string
): Validators[] => {
  const allValidationMetadatas: ValidationMetadata[] = (getFromContainer(
    MetadataStorage
  ) as any).validationMetadatas;
  const propertyValidationMetadatas = allValidationMetadatas.filter(
    _metadata =>
      _metadata.target['name'] === domain.name &&
      _metadata.propertyName === property
  );

  const validators: Validators[] = [];
  // First check if we have conditionalValidation
  let isValidationConditional = false;
  propertyValidationMetadatas.forEach(validationMetadata => {
    if (validationMetadata.type === 'conditionalValidation') {
      isValidationConditional = true;
    }
  });
  propertyValidationMetadatas.forEach(validationMetadata => {
    if (validationMetadata.type === 'conditionalValidation') {
      return;
    }
    validators.push(
      ...ClassValidatorsToNgValidators(
        validationMetadata.type,
        validationMetadata.constraints,
        isValidationConditional
      )
    );
  });

  return validators;
};
