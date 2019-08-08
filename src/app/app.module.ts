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
} from "@angular/material";
import { MatFileUploadModule } from "angular-material-fileupload";
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserReadComponent } from './user/user-read/user-read.component';
import { HomeComponent } from './home/home.component';
import { UserInsertComponent } from './user/user-insert/user-insert.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { BoardComponent } from './board/board.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    MainNavComponent,
    UserReadComponent,
    HomeComponent,
    UserInsertComponent,
    UserEditComponent,
    BoardComponent,
    BoardDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatFileUploadModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
