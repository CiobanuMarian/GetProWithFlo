import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/loginService/login.service';
import { HttpClientModule} from '@angular/common/http';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.email, this.password);
  }
  register() {
    const registerUser = new User();
    registerUser.firstName = 'test'
    registerUser.lastName = 'test'
    registerUser.email = 'test@ceva.com'
    registerUser.password = 'testParola'
    this.loginService.createUser(registerUser);
  }

}
