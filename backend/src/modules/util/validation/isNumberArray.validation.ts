import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsNumberArray(
  property: any = 'IsNumberArray',
  validationOptions: ValidationOptions = {
    message: 'Must be an Integer Array',
  },
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNumberArray',
      target: object.constructor,
      options: validationOptions,
      constraints: [property],
      propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // const [relatedPropertyName] = args.constraints;
          // const relatedValue = (args.object as any)[relatedPropertyName];
          return value !== undefined &&
            value.constructor === Array &&
            0 < value.length
            ? !value.some(isNaN)
            : false;
        },
      },
    });
  };
}
