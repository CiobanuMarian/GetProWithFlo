import { Injectable } from '@angular/core';
import { User } from 'src/app/login/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  newUser: User;
  usersList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore) {
  }


  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }

  getUser() {
    return this.afAuth.authState;
  }


  createExercise(exercise) {
    this.firestore.collection('exercises').add(exercise);
  }

}
