import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { register } from '../../models/register.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registration = new FormGroup({});
  showFlag =  {
    isClickedOnSubmit: false,
    spinner: false,
  };
  registerUser = new register();
  @ViewChild('onError') Error: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: ToasterService) {
    this.registration = this.formBuilder.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null, Validators.required],
      cpassword: [null, Validators.required],
      password : [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    console.log(' this.showFlag', this.showFlag);
    console.log(' this.showFlag', this.showFlag);
    this.showFlag.isClickedOnSubmit = true;
    this.showFlag.spinner = true;
    console.log('registration', this.registration);
    if (this.registration.valid) {
      this.showFlag.isClickedOnSubmit = true;
      this.showFlag.spinner = true;
      // tslint:disable-next-line:prefer-const
      let formValues = this.registration.value;
      this.registerUser.firstname = formValues.fname ? formValues.fname : '';
      this.registerUser.lastname = formValues.lname ? formValues.lname : '';
      this.registerUser.email = formValues.email ? formValues.email : '';
      this.registerUser.password = formValues.password ? formValues.password : '';
      this.registerUser.confirmPassword = formValues.cpassword ? formValues.cpassword : '';
      console.log('registerUser', this.registerUser);
      this.userService.saveUser(this.registerUser).subscribe(
        (res: any) => {
          console.log('res', res);
          this.toastrService.showSuccess(
            'Done!',
            'Registration Successfull.'
          );
          this.router.navigate(['login']);
        }, err => {
          this.toastrService.showError(
            'Error!',
           err.error.errors[0].message
          );
        });
      this.showFlag.spinner = false;
    } else {
      this.Error.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.toastrService.showError(
        'Error!',
        'Kindly fill proper data in required field'
      );
      this.showFlag.spinner = false;
    }
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.registration.controls;
  }
  // tslint:disable-next-line:typedef
  cancel(){}
}
