import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private fb: FormBuilder){}
  signUpForm: FormGroup = this.fb.group({
    username:[""],
    password:[""]
  })

  doSignUp(){
    console.log(this.signUpForm.value)
  }
}
