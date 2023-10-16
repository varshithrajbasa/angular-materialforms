import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router){}

  loginForm: FormGroup = this.fb.group({
    username:["", [Validators.required,Validators.minLength(6)]],
    password:["", [Validators.required,Validators.minLength(6)]]
  })
  doLogin(){
    const {username, password} = this.loginForm.value;
    if(username == password){
      this.router.navigate(['/forms'])
    }
    else
    alert("Wrong password");
  }
}
