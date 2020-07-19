import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from 'src/loginService/login.service';
import { User } from '../login/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
  user = new User();
  error : any;
  constructor( 
    public dialogRef: MatDialogRef<RegisterComponent>,
    private loginService : LoginService,
    private afAuth: AngularFireAuth,
    ) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close();
  }
  
  createAccount(){
    this.error = null;
    //check fields
    if(this.user.email == undefined || this.user.firstName == undefined || this.user.lastName == undefined || this.user.password == undefined) {
      this.error = "All fields must be completed";
      console.log(this.error);
      return;
    }
    //check email
    if(!this.user.email.match(this.emailRegex)){
      this.error = "Enter a correct email address";
      console.log(this.error);
      return;
    }

    //check password
    if(this.user.password.length<6){
      this.error = "Password must have at least 6 characters";
      return;
    }
    
    //try to create the account, the only error possbile would be that the email already has an acount created.
    this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(userCredentials => {
      userCredentials.user.updateProfile({
        displayName: this.user.firstName + ' ' + this.user.lastName
      }
      )
    })
    .catch( (err)=> {
      this.error = "An account already exists with this Email address";
    });
    this.dialogRef.close();
    alert("Account creted succesfully");
  }

}
