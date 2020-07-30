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
  hide = true;
  constructor(private loginService : LoginService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.email, this.password);
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: "240px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
