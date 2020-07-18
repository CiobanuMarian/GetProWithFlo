import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { env } from 'process';
import { User } from '../login/user';
import { Observable } from 'rxjs';
import { LoginService } from 'src/loginService/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: firebase.User;
  constructor(private afAuth: AngularFireAuth, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })

  }

  check(): Observable<User> {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    const userDetails = new Observable<User>();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.userName = user.displayName;
        this.email = user.email;
      } else {
        this.router.navigateByUrl('');
      }
    });
    return userDetails;
  }



}
