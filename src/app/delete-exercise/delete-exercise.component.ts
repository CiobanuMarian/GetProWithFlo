import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../add-exercise/exercises.service';
import { LoginService } from 'src/loginService/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.scss']
})
export class DeleteExerciseComponent implements OnInit {

  user: firebase.User;
  exercise:any;
  constructor(
    public dialog: MatDialog,
    private exerciseService: ExerciseService,
    private router: Router, private loginService: LoginService) {}

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

  //Change the value if we checkbox an item
  changeValue(value:Boolean, id:string){
    this.exercise.forEach(t => {
      if(t.id == id){
        t.delete = value;
      }
    });
  }


  //for debug purpose only
  logAllData(){
    console.log("ALL DATA:");
    this.exercise.forEach(t => {
      console.log(t.id + ":" + t.delete);
    });
  }

  deleteSelectedExercises(){
    this.exercise.forEach(t => {
      // console.log("[Debug] Checking " + t.id + " status (" + t.delete + ")");
      if(t.delete == true){
        // console.log("Deleting exercise with id: " + t.id);
        this.exerciseService.deleteExercise(t.id);
      }
    });
    this.loadData();

  }

  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: "Are you sure?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       this.deleteSelectedExercises();
      } else {
        this.loadData();
      }
    });
  }


  logOut(){
    firebase.auth().signOut().then(function() {
      this.router.navigateByUrl('');
    }).catch(function(error) {
      // An error happened.
    });
  }

}
