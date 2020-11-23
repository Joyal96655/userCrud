import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: ToasterService) {
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
      this.showFlag.spinner = true;
      // tslint:disable-next-line:prefer-const
      let formValues = this.loginForm.value;
      this.loginUser.email = formValues.email ? formValues.email : '';
      this.loginUser.password = formValues.password ? formValues.password : '';
      this.userService.loginUser(this.loginUser).subscribe(
        (res: any) => {
          this.userService.getToken(res.id).subscribe(
            (resp: any) => {
              this.router.navigate(['profile'], { queryParams: res.id });
              }, err => {});
          console.log('res', res);
          this.toastrService.showSuccess(
            'Done!',
            'Login Successfull.'
          );
          this.showFlag.spinner = false;
        }, err => {
          this.showFlag.spinner = false;
          this.toastrService.showError(
            'Error!',
           err.error.errors[0].message
          );
        });
    } else {
      this.showFlag.spinner = false;
      this.Error.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.toastrService.showError(
        'Error!',
        'Kindly fill proper data in required field'
      );
    }
  }
}
