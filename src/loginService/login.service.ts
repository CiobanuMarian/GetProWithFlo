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


  // createUser(user: User){
  //   console.log("Creating user:" + user.email + user.password);
  //   this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
  //     .then(userCredentials => {
  //       this.newUser = user;

  //       userCredentials.user.updateProfile({
  //         displayName: user.firstName + ' ' + user.lastName
  //       }
  //       )
  //     })
  //     .catch( (err)=> user.error = err.message);

     
  // }

  getUser() {
    return this.afAuth.authState;
  }


  createExercise(exercise) {
    console.log(exercise);
    this.firestore.collection('exercises').add(exercise);
}

}
