import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/loginService/login.service';
import { Router } from '@angular/router';
import { User } from '../login/user';

interface Exercise{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {
  user:firebase.User;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.getUser().subscribe(user => {
      if (user == null) {
        this.router.navigateByUrl('');
      } else {
        this.user = user;
      }
    })
  }

  exercises: Exercise[] = [
    {value: 'legs-0', viewValue: 'Legs'},
    {value: 'chest-1', viewValue: 'Chest'},
    {value: 'back-1', viewValue: 'Back'}
  ];
}