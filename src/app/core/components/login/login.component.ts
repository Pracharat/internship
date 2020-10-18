import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app-services/auth/auth.service';
import { Router } from '@angular/router';
import { startNum } from 'src/app/validators/username.validator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  errMsg: string;
  rememberUsername = '';


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public router: Router,

  ) { }

  ngOnInit() {
    //ทำแบบ form ก่อน
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6), startNum]],
      password: ['', Validators.required],
      rememberMe: [''],
      // clear login laew
    });
    localStorage.removeItem('menulistitem');
    localStorage.removeItem('login'); //การลบข้อมูลที่ key เก็บไว้
    sessionStorage.clear();
    console.log('1');

    this.checkRemember();
  }

//ใช้เช็คค่า เมื่อค่าไม่ถูกต้อง จะส่งค่ากลับออกไป

  login() {
    if (this.loginForm.invalid) {
       alert('please fill in your information')
    }

//ยิงเซอวิส  login มาเก็บไว้ในauth
    this.auth.login(this.loginForm.value).pipe(
      map(res => res.resultData),//mapค่า res data ออกมา
    ).subscribe(user => {
      // เมื่อ login สำเร็จ ได้ค่า userมาเกบไว้ในตัวแปร user
      localStorage.setItem('login', JSON.stringify(user)); //แปลงเป้นสตริง เก็บไว้ใน localstorage ที่ชื่อ login
      localStorage.setItem('menulistitem', JSON.stringify(user.menuList));

      this.setRemember();//เรียก function
      this.router.navigate(['/home']);
    }, err => {
      this.errMsg = err.error.error.moreInfo;
    });
  }

  setRemember() {
    if (this.rememberMe.value) {
      localStorage.setItem('username', this.username.value); //การเก็บข้อมูลลงใน Local Storageเมื่อคลิ้ก
    } else {
      localStorage.setItem('username', ''); //ถ้าไม่มีก็เป็นค่าว่าง
    }
  }

  checkRemember() {
    this.rememberUsername = localStorage.getItem('username'); //การเรียกใช้ข้อมูล key ของ Local Storage

    if (this.rememberUsername !== '') {
      this.username.patchValue(this.rememberUsername);
      this.rememberMe.patchValue(true);
    }
  }
}
