import { ExerciseService } from './exercises.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/loginService/login.service';
import { Router } from '@angular/router';
import { User } from '../login/user';
import * as firebase from 'firebase';
import { exerciseTypes } from '../exerciseType';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {
  user: firebase.User;

  description: string;
  exercises = exerciseTypes;
  selectedType = exerciseTypes[1];
  showSuccesMsg = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })
  }

  logOut() {
    firebase.auth().signOut().then(function () {
      this.router.navigateByUrl('');
    }).catch(function (error) {
      // An error happened.
    });
  }

  addExercise() {

    let exercise = {};
    if(this.selectedType == undefined || this.description == undefined || this.user.displayName == undefined){
      return;
    }
    exercise['type'] = this.selectedType;
    exercise['description'] = this.description;
    exercise['user'] = this.user.displayName;

    
    this.loginService.createExercise(exercise);
    this.showSuccesMsg = true;
    setTimeout(() => {
      this.showSuccesMsg = false;
    }, 1500);
  }

  cancel() {
    this.description = "";
  }
}