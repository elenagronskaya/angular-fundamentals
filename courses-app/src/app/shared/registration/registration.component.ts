import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../directives/email.directive";
import {passwordValidator} from "../directives/password.directive";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  registrationModel = {
    name: '',
    email :'',
    password :'',
  }

  registrationForm:  FormGroup;

  constructor() {

    this.registrationForm = new FormGroup({
      name: new FormControl(this.registrationModel.name, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(this.registrationModel.email, [
        Validators.required,
        emailValidator()
      ]),
      password: new FormControl(this.registrationModel.password, [
        Validators.required,
        passwordValidator()
      ])
    });
  }
  ngOnInit(): void {

  }

  onFormSubmit() {
    if (this.registrationForm.status === "VALID")
    {
      alert(JSON.stringify(this.registrationForm.value, null, 2));
      //redirect
    }
  }

  get name() { return this.registrationForm.get('name'); }

  get email() { return this.registrationForm.get('email'); }

  get password() { return this.registrationForm.get('password'); }
}
