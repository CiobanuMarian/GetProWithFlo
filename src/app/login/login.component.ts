import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/loginService/login.service';
import { HttpClientModule} from '@angular/common/http';
import { User } from './user';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private loginService : LoginService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.email, this.password);
  }

  register() {
    const registerUser = new User();
    registerUser.firstName = 'Marian'
    registerUser.lastName = 'Ciobanu'
    registerUser.email = 'MarianCiobanu@ceva.com'
    registerUser.password = 'parolaMarian'
    this.loginService.createUser(registerUser);
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
