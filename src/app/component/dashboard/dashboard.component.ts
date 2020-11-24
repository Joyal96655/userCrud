import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { register } from 'src/app/models/register.model';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showFlag =  {
    profile: true,
    isClickedOnSubmit: false,
    isEdit: false,
    spinner: false
   };
   userDetails: any = [];
   // tslint:disable-next-line:no-inferrable-types
   isEdit: boolean = false;
   editUserDetails = new FormGroup({});
   registerUser = new register();
   @ViewChild('onError') Error: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: ToasterService,
    private activatedRoute: ActivatedRoute) {
      this.editUserDetails = this.formBuilder.group({
                    fname: [null, Validators.required],
                    lname: [null, Validators.required],
    });
  }
// tslint:disable-next-line:typedef
ngOnInit(){
  this.activatedRoute.queryParams.subscribe((params) => {
    console.log('params', params);
    if (Object.keys(params).length !== 0) {
      this.getUserInfo(params);
    }else{
      this.getUserInfo();
    }
  });

}
// tslint:disable-next-line:typedef
getUserInfo(id?){
  console.log('getUserInfo', id);
  this.userService.getUser(id).subscribe(
    (res: any) => {
      console.log('res', res);
    }, err => {});
}
  // tslint:disable-next-line:typedef
onEdit(){
    this.showFlag.isEdit = !this.showFlag.isEdit;
  }
// tslint:disable-next-line:typedef
onSubmit() {
    this.showFlag.isClickedOnSubmit = true;
    this.showFlag.spinner = true;
    console.log('registration', this.editUserDetails);
    if (this.editUserDetails.valid) {
      this.showFlag.isClickedOnSubmit = true;
      this.showFlag.spinner = true;
      // tslint:disable-next-line:prefer-const
      let formValues = this.editUserDetails.value;
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
}
