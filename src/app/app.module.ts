import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { MatTableModule, MatButtonModule, MatFormField, MatGridListModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatIconModule, MatPaginatorModule, MatMenuModule, MatSortModule, MatListModule, MatToolbarModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import {MatCardModule, MatCard} from '@angular/material/card';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RegisterComponent } from './register/register.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'add', component: AddExerciseComponent},
  { path: 'delete', component: DeleteExerciseComponent},
  { path: 'deleteC', component: ConfirmDialogComponent},
  { path: 'edit', component: EditExerciseComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AddExerciseComponent,
    DeleteExerciseComponent,
    ConfirmDialogComponent,
    EditExerciseComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forRoot(
      routes)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
