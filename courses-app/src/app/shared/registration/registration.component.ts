import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../directives/email.directive";
import {passwordValidator} from "../directives/password.directive";
import {Router} from "@angular/router";
import {AuthStateFacade} from "../../auth/store/auth.facade";

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

  constructor(private authStateFacade: AuthStateFacade, private router: Router ) {

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
    this.authStateFacade.getRegisterSuccess$.subscribe(()=>{
        this.registrationForm.reset();
        this.router.navigate(['/login']);
    });
  }

  onFormSubmit() {
    if (this.registrationForm.status === "VALID") {
      this.authStateFacade.register(this.registrationForm.value)
    }
  }

  get name() { return this.registrationForm.get('name'); }

  get email() { return this.registrationForm.get('email'); }

  get password() { return this.registrationForm.get('password'); }
}
