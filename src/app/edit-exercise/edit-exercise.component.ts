import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ExerciseService } from '../add-exercise/exercises.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginService } from 'src/loginService/login.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  user: firebase.User;
  exercise:any;

  constructor(
    public dialog: MatDialog,
    private exerciseService: ExerciseService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })

    this.loadData();
  }

  loadData(){
    this.exerciseService.getExercises().subscribe(data => {
      this.exercise = data.map(e => {
        return {
          id:e.payload.doc.id,
          description:e.payload.doc.data()['description'],
          type:e.payload.doc.data()['type'],
          user:e.payload.doc.data()['user'],
          delete: false
        };
      })
    })
  }

  saveAll() {

  }

  logOut() {
    firebase.auth().signOut().then(function () {
      this.router.navigateByUrl('');
    }).catch(function (error) {
      // An error happened.
    });
  }

  openEditDialog(exercise){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { description: exercise.description, type: exercise.type, user: exercise.user },
      width: "260px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
