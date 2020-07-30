import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from 'src/loginService/login.service';
import { Router } from '@angular/router';
import { exerciseTypes } from '../exerciseType';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ExerciseService } from '../add-exercise/exercises.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  id: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private loginService: LoginService,
    private router: Router,
    private exerciseService: ExerciseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })
    this.description = this.data.description;
    this.type = this.data.type;
    this.id = this.data.id;

  }

  cancel() {
    this.dialogRef.close();
  }

  openSaveEditConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: "Are you sure?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editExercise();
        this.cancel();
      } else {
        //Do nothing
      }
    });
  }

  editExercise() {
    let exercise = {};
    exercise['type'] = this.type;
    exercise['description'] = this.description;
    exercise['user'] = this.user.displayName;
    exercise['id'] = this.id;

    this.exerciseService.updateExercise(exercise);
  }

}