import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/loginService/login.service';
import { exerciseTypes } from '../exerciseType';
import { ExerciseService } from '../add-exercise/exercises.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: firebase.User;
  exerciseType = exerciseTypes;
  exerciseList: { exercise: string, checked: boolean }[] = [];
  exercise: any;
  generatedExercises = [];
  displayedExercises = [];


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService,
    private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    // console.log(this.exerciseType);
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })
    this.loadData();

  }

  logOut() {
    firebase.auth().signOut().then(function () {
      this.router.navigateByUrl('');
    }).catch(function (error) {
      // An error happened.
    });
  }

  /*
  load all the exercises and filter them by the user
  */
  loadData() {
    this.exerciseService.getExercises().subscribe(data => {
      this.exercise = data.map(e => {
        return {
          id: e.payload.doc.id,
          description: e.payload.doc.data()['description'],
          type: e.payload.doc.data()['type'],
          user: e.payload.doc.data()['user'],
        };
      })
      console.log(this.exercise);
      var ceva = [];
      this.exercise.forEach(ex => {
        // console.log(ex.user == this.user.displayName);
        if (ex.user == this.user.displayName) {
          ceva.push(ex);
        }
      })
      this.exercise = ceva;
    })
  }


  /*
  Change a value of an exercise type, from the start the list is empty,
  if the selected type does not exist yet it will be added,
  otherwise is searched and its value is changed into true/false
  */
  changeValue(value: boolean, ex: string) {
    var push = true;

    if (this.exerciseList.length == 0) {
      console.log("List is empty, adding first item");
      this.exerciseList.push({
        exercise: ex,
        checked: value
      })
    }
    this.exerciseList.forEach(v => {
      if (v.exercise == ex) {
        v.checked = value;
        push = false;
      }

    })
    if (push) {
      this.exerciseList.push({
        exercise: ex,
        checked: value
      })
    }

  }

  /*
  TODO: write method documentation
  */
  addToTraining(count: number) {
    this.displayedExercises = [];
    this.generatedExercises = [];
    this.exerciseList.forEach(exChecked => {
      var counter = count;
      const allExercisesByType = [];
      this.exercise.forEach(exAvailable => {
        if (exChecked.exercise == exAvailable.type.toString() && exChecked.checked) {
          allExercisesByType.push(exAvailable);
        }
      });
      
      for (let index = 0; index < counter; index++) {
        var min = Math.ceil(0);
        var max = Math.floor(allExercisesByType.length);
        var random = Math.floor(Math.random() * (max - min)) + min; 
        this.generatedExercises.push(allExercisesByType[random]);
      }
    })

    console.log("_______________");
    console.log(this.generatedExercises);
    this.generatedExercises.forEach(el=> {
      console.log(el);
      if(el != undefined){
        this.displayedExercises.push(el);
      }
    })
    // console.log("All exercises generated:");
    // console.log(this.generatedExercises);
  }

}
