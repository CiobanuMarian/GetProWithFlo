import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  exercises: Exercise[] = [
    {value: 'legs-0', viewValue: 'Legs'},
    {value: 'chest-1', viewValue: 'Chest'},
    {value: 'back-1', viewValue: 'Back'}
  ];
}