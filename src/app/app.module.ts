import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

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

} from "@angular/material";
import { MatFileUploadModule } from "angular-material-fileupload";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { LogReadComponent } from './log/log-read/log-read.component';
import { BrandReadComponent } from './brand/brand-read/brand-read.component';
import { BrandInsertComponent } from './brand/brand-insert/brand-insert.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryReadComponent } from './category/category-read/category-read.component';
import { CategoryInsertComponent } from './category/category-insert/category-insert.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EditorModule } from '@tinymce/tinymce-angular';

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
    ModalDeleteComponent,
    SnackbarComponent,
    LogReadComponent,
    BrandReadComponent,
    BrandInsertComponent,
    BrandEditComponent,
    CategoryReadComponent,
    CategoryInsertComponent,
    CategoryEditComponent,
    PaginationComponent,
    BoardComponent,
    BoardDetailComponent
  ],
  entryComponents: [
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    EditorModule,

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
    NgxPaginationModule,

    // Lib Module
    MaterialFileInputModule,
    MatFileUploadModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
