import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  fb: any;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  // intitializeForm() {
  //   this.registerForm = this.fb.group({
  //     gender: ['male'],
  //     username: ['', Validators.required],
  //     knownAs: ['', Validators.required],
  //     dateOfBirth: ['', Validators.required],
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //     password: ['', [Validators.required, 
  //       Validators.minLength(4), Validators.maxLength(8)]],
  //     confirmPassword: ['', [Validators.required, this.matchValues('password')]]
  //   })
  // }

  // matchValues(matchTo: string): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     return control?.value === control?.parent?.controls[matchTo].value 
  //       ? null : {isMatching: true}
  //   }
  // }                                                                      

  register() {                                                                                                                                              
    this.accountService.register(this.registerForm.value).subscribe(response => {                                                                      
      this.router.navigateByUrl('/members');                                                                      
    }, error => {
      this.validationErrors = error;
      this.toastr.error(error.error);

    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

} 