import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule, 
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from "@angular/material";

import { MatFileUploadModule } from "angular-material-fileupload";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { InvitedAlumniReadComponent } from './invited-alumni/invited-alumni-read/invited-alumni-read.component';
import { InvitedAlumniInsertComponent } from './invited-alumni/invited-alumni-insert/invited-alumni-insert.component';
import { InvitedAlumniEditComponent } from './invited-alumni/invited-alumni-edit/invited-alumni-edit.component';
import { UnverifiedAlumniReadComponent } from './unverified_alumni/unverified-alumni-read/unverified-alumni-read.component';
import { UnverifiedAlumniEditComponent } from './unverified_alumni/unverified-alumni-edit/unverified-alumni-edit.component';
import { VerifiedAlumniReadComponent } from './verified-alumni-read/verified-alumni-read.component';
import { VerifiedAlumniEditComponent } from './verified-alumni-edit/verified-alumni-edit.component';


import { BoardComponent } from './board/board.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    NotFoundComponent,
    MainNavComponent,
    HomeComponent,
    InvitedAlumniReadComponent,
    InvitedAlumniInsertComponent,
    InvitedAlumniEditComponent,
    UnverifiedAlumniReadComponent,
    UnverifiedAlumniEditComponent,
    VerifiedAlumniReadComponent,
    VerifiedAlumniEditComponent,

    BoardComponent,
    BoardDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    //Material Module
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    LayoutModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // Lib Module
    MaterialFileInputModule,
    MatFileUploadModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
