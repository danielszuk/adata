import { FormGroup } from '@angular/forms';

export const MarkAllControlsTouched = (form: FormGroup) => {
  Object.values(form.controls).forEach(control => {
    control.markAsTouched();
  });
};
