import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchFieldsValidator(matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control?.parent;

    if (form) {
      const controlToCompare = form.get(matchingControlName);
      if (controlToCompare?.value !== control?.value) {
        return { mismatch: true };
      }
    }
    return null;
  };
}
