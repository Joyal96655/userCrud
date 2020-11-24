import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToasterService {
  private toastConfig: any = {
    closeButton: true,
    timeOut: 4500,
    progressBar: true,
    progressAnimation: 'increasing',
    positionClass: 'toast-top-right',
  };

  constructor(private toastr: ToastrService) { }
  // tslint:disable-next-line:typedef
  showSuccess(title: string, msg: string){
    this.toastr.success(msg, title, this.toastConfig);
  }

  // tslint:disable-next-line:typedef
  showError(title: string, msg: string){
    this.toastr.error(msg, title, this.toastConfig);
  }

  // tslint:disable-next-line:typedef
  showInfo(title: string, msg: string){
    this.toastr.info(msg, title, this.toastConfig);
  }

  // tslint:disable-next-line:typedef
  showWarning(title: string, msg: string){
    this.toastr.warning(msg, title, this.toastConfig);
  }
}
