import {Directive} from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS, ValidationErrors,
  Validator, ValidatorFn,
} from "@angular/forms";

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regExResult = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(control.value);
    return regExResult ?  null : {"errorText": {value: "Email is invalid"}} ;
  };
}


@Directive({
  selector: '[emailValidation]',
  providers: [{
  provide: NG_VALIDATORS,
  useExisting: EmailValidatorDirective,
  multi: true,
  }]
})


export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator()(control);
  }
}
