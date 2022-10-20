import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpwdPanel = false;


  forgotForm: FormGroup;
  txtOtp = false;
  showOtp = false;

  constructor(private accountServices: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotForm = this.fb.group({
      username: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      otp: [''],
    });
  }

  sendOtp() {
    const mobile = this.forgotForm.get('mobile').value;
    this.txtOtp = true;
    if (this.forgotForm.valid && this.forgotForm.get('otp').value != '') {
      this.accountServices.VerifyForgotPwd(this.forgotForm.value).subscribe({
        next: next => {
          this.showOtp = true;
          this.forgotpwdPanel = true;
          
         // console.log(next);

        }
      });
    } else {
      this.accountServices.sendOtp(mobile).subscribe({
        next: resp => {
        // console.log(resp);

        },
        error: err => {
          console.log(err);
        }
      })

    }

  }

}
