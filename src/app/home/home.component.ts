import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/loginService/login.service';
import { exerciseTypes } from '../exerciseType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: firebase.User;
  exerciseTypes = exerciseTypes;
  
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

  logOut(){
    firebase.auth().signOut().then(function() {
      this.router.navigateByUrl('');
    }).catch(function(error) {
      // An error happened.
    });
  }

}
