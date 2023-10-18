import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private router:Router, private route:ActivatedRoute){}
  signUpForm: FormGroup = this.fb.group({
    username:["", [Validators.required,Validators.email, this.checkIfUserNameExist.bind(this)]],
    password:["", [Validators.required,Validators.minLength(6)]]
  })

  doSignUp(){
    const { username, password} = this.signUpForm.value;
    let users = localStorage.getItem('users');
    let usersObj = users ? JSON.parse(users): {};
    usersObj[username] = password;
    localStorage.setItem('users',JSON.stringify(usersObj));
    alert('SignUp Success');
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  checkIfUserNameExist(control: FormControl): { [s: string]: boolean } {
    console.log(control.value)
      let users = localStorage.getItem('users');
      let usersObj = users ? JSON.parse(users): {};
      if (Object.keys(usersObj).indexOf(control.value) !== -1) {
        return { nameIsTaken: true };
      }
    return {};
  }
  checkIfUserAlreadyRegistered(control:FormControl){
    return of(Object.keys(JSON.parse(localStorage.getItem('users')?? "")).includes(control.value)).pipe(debounceTime(500))
  }

  get username(){
    return this.signUpForm.get('username')
  }
}
