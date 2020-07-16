import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'getProWithFlo';
  // constructor(db: AngularFireDatabase){
  //   db.list('/Users').subscribe(user=> {
      
  //   })
  // }
}
