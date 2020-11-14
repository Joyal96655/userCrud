import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({});
  loginUser = {
    email: null,
    password: null
  };
  showFlag =  {
    isClickedOnSubmit: false,
    spinner: false,
  };
  @ViewChild('onError') Error: ElementRef;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password : [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    if (this.loginForm.valid) {
      // tslint:disable-next-line:prefer-const
      let formValues = this.loginForm.value;
      this.loginUser.email = formValues.email ? formValues.email : '';
      this.loginUser.password = formValues.password ? formValues.password : '';
      this.userService.loginUser(this.loginUser).subscribe(
        (res: any) => {
          console.log('res', res);
          this.router.navigate(['login']);
        }, err => {});
    } else {
      this.showFlag.spinner = false;
      this.Error.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      alert('Kindly fill proper data in required field');
    }
  }
}
