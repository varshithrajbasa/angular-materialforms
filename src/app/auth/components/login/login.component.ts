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
    let users = localStorage.getItem('users');
    let usersObj = users ? JSON.parse(users): {};
    let user = Object.keys(usersObj).find(u=>u==username);
    if(user && usersObj[username] == password){
      this.router.navigate(['/forms'])
    }
    else
    alert("Wrong password");
  }
}
