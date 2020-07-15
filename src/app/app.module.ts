import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@Angular/fire/database';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { MatTableModule, MatButtonModule, MatFormField, MatGridListModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatIconModule, MatPaginatorModule, MatMenuModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import {MatCardModule, MatCard} from '@angular/material/card';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
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
    RouterModule.forRoot(
      routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
