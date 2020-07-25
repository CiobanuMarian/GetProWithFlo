import { ExerciseService } from './exercises.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/loginService/login.service';
import { Router } from '@angular/router';
import { User } from '../login/user';
import * as firebase from 'firebase';

interface Exercises {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {
  user: firebase.User;

  description: string;
  selectedType = "WIP"

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

  logOut(){
    firebase.auth().signOut().then(function() {
      this.router.navigateByUrl('');
    }).catch(function(error) {
      // An error happened.
    });
  }

  addExercise() {

    let exercise = {};
    exercise['type'] = this.selectedType;
    exercise['description'] = this.description;
    exercise['user'] = this.user.displayName;

    this.loginService.createExercise(exercise);
  }

  cancel() {
    this.description = "";
  }

  exercises: Exercises[] = [
    { value: 'legs-0', viewValue: 'Legs' },
    { value: 'chest-1', viewValue: 'Chest' },
    { value: 'back-1', viewValue: 'Back' }
  ];
}