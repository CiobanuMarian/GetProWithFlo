import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from 'src/loginService/login.service';
import { User } from '../login/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  constructor( 
    public dialogRef: MatDialogRef<RegisterComponent>,
    private loginService : LoginService) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close();
  }
  
  createAccount(){
    this.loginService.createUser(this.user);
    this.dialogRef.close();
  }

}
