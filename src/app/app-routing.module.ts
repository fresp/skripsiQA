import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UserReadComponent } from './user/user-read/user-read.component';
import { HomeComponent } from './home/home.component';
import { UserInsertComponent } from './user/user-insert/user-insert.component';
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { BoardComponent } from "./board/board.component";
import { BoardDetailComponent } from "./board-detail/board-detail.component";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'secure', component: MainNavComponent, children: [
          { path: '', component: HomeComponent },
          { path: 'user', component: UserReadComponent },
          { path: 'user-insert', component: UserInsertComponent },
          { path: 'user-edit', component: UserEditComponent },
          { path: 'board', component: BoardComponent },
          { path: 'board/:board/ticket/:ticket', component: BoardDetailComponent },
          
          { path: '**', component: NotFoundComponent },
        ] },
        { path: "**", component: NotFoundComponent }
      ],
      { useHash: true },
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
