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
export class ExerciseService {

    newUser: User;
    usersList: AngularFireList<any>;

    constructor(
        private firestore: AngularFirestore) {
    }

    createExercise(exercise) {
        this.firestore.collection('exercises').add(exercise);
    }

    getExercises() {
        return this.firestore.collection('exercises').snapshotChanges();
    }

    updateExercise(exercise) {
        delete exercise.id;
        this.firestore.doc('exercises/' + exercise.id).update(exercise);
    }

    deleteExercise(exerciseId) {
        this.firestore.doc('exercises/' + exerciseId).delete();
    }



}
