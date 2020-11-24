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
    this.showFlag.spinner = true;
    this.userService.getUser(id).subscribe(
      (res: any) => {
        console.log('res', res);
        this.userDetails.firstname = res.firstname;
        this.userDetails.lastname = res.lastname;
        this.userDetails.email = res.email;
        this.showFlag.spinner = false;
      }, err => {
        this.showFlag.spinner = false;
        this.toastrService.showError(
          'Error!',
        err.error.errors[0].message
        );
      });
  }
  // tslint:disable-next-line:typedef
  onEdit(){
    this.showFlag.isEdit = !this.showFlag.isEdit;
    this.showFlag.spinner = true;
    this.editUserDetails.patchValue({
      fname: this.userDetails.firstname,
      lname:  this.userDetails.lastname
    });
    this.showFlag.spinner = false;
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.editUserDetails.controls;
  }
// tslint:disable-next-line:typedef
  onSubmit() {
    this.showFlag.isClickedOnSubmit = true;
    if (this.editUserDetails.valid) {
      this.showFlag.isClickedOnSubmit = true;
      this.showFlag.spinner = true;
      // tslint:disable-next-line:prefer-const
      let formValues = this.editUserDetails.value;
      this.registerUser.firstname = formValues.fname ? formValues.fname : '';
      this.registerUser.lastname = formValues.lname ? formValues.lname : '';
      this.userService.saveProfile(this.registerUser).subscribe(
        (res: any) => {
          console.log('res', res);
          this.showFlag.isEdit = false;
          this.toastrService.showSuccess(
            'Done!',
            'Profile Updated Successfully.'
          );
          this.router.navigate(['profile']);
          this.showFlag.spinner = false;
        }, err => {
          this.toastrService.showError(
            'Error!',
           err.error.errors[0].message
          );
          this.showFlag.spinner = false;
        });
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
