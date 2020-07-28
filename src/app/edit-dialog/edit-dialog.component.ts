import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from 'src/loginService/login.service';
import { Router } from '@angular/router';
import { exerciseTypes } from '../exerciseType';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExerciseService } from '../add-exercise/exercises.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  user: firebase.User;
  exercises = exerciseTypes;
  description: string;
  type: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private loginService: LoginService,
    private router: Router,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })
    this.description = this.data.description,
    this.type = this.data.type,
    console.log(this.description, this.type)
  }

  cancel(){
    this.dialogRef.close();
  }

  editExercise(){
    let exercise = {};
    exercise['type'] = this.type;
    exercise['description'] = this.description;
    exercise['user'] = this.user.displayName;

    this.exerciseService.updateExercise(exercise);
  }

}