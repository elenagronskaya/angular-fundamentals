import {
  AbstractControl, FormArray,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

export function formArrayMinLengthValidator(minLength: number = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (minLength == 0)
    {
      return null;
    }

   return  (<FormArray>control).controls.length >= minLength ?
     null: {"errorText": {value: `At least ${minLength} is required`}};
  };
}

