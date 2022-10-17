import {Directive} from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS, ValidationErrors,
  Validator, ValidatorFn,
} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regExResult = /^[A-Za-z]\w{7,14}$/.test(control.value);
    return regExResult ?  null : {"errorText": {value: "Password is invalid"}} ;
  };
}

@Directive({
  selector: '[passwordValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true,
  }]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordValidator()(control);
  }
}
