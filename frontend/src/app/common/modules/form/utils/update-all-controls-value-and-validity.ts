import { FormGroup } from '@angular/forms';

export const UpdateAllControlsValueAndValidity = (form: FormGroup) => {
  Object.values(form.controls).forEach(control => {
    control.updateValueAndValidity();
  });
};
