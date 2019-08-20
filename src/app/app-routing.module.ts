import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { InvitedAlumniInsertComponent } from './invited-alumni/invited-alumni-insert/invited-alumni-insert.component';
import { InvitedAlumniEditComponent } from './invited-alumni/invited-alumni-edit/invited-alumni-edit.component';
import { InvitedAlumniReadComponent } from './invited-alumni/invited-alumni-read/invited-alumni-read.component';
import { UnverifiedAlumniEditComponent } from './unverified_alumni/unverified-alumni-edit/unverified-alumni-edit.component';
import { UnverifiedAlumniReadComponent } from './unverified_alumni/unverified-alumni-read/unverified-alumni-read.component';

import { UserPmInsertComponent } from './user-pm/user-pm-insert/user-pm-insert.component';
import { UserPmEditComponent } from './user-pm/user-pm-edit/user-pm-edit.component';
import { UserPmReadComponent } from './user-pm/user-pm-read/user-pm-read.component';

import { UserQaInsertComponent } from './user-qa/user-qa-insert/user-qa-insert.component';
import { UserQaEditComponent } from './user-qa/user-qa-edit/user-qa-edit.component';
import { UserQaReadComponent } from './user-qa/user-qa-read/user-qa-read.component';

import { UserDeveloperInsertComponent } from './user-developer/user-developer-insert/user-developer-insert.component';
import { UserDeveloperEditComponent } from './user-developer/user-developer-edit/user-developer-edit.component';
import { UserDeveloperReadComponent } from './user-developer/user-developer-read/user-developer-read.component';

import { BoardInsertComponent } from './board/board-insert/board-insert.component';
import { BoardEditComponent } from './board/board-edit/board-edit.component';
import { BoardReadComponent } from './board/board-read/board.component';

// import { BoardComponent } from "./board/board.component";
import { BoardDetailComponent } from "./board/board-detail/board-detail.component";

import { TicketInsertComponent } from './ticket/ticket-insert/ticket-insert.component';
import { TicketEditComponent } from './ticket/ticket-edit/ticket-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'secure', component: MainNavComponent, children: [
    { path: '', component: HomeComponent },

    { path: 'invited-alumni', component: InvitedAlumniReadComponent },
    { path: 'invited-alumni-insert', component: InvitedAlumniInsertComponent },
    { path: 'invited-alumni-edit/:id', component: InvitedAlumniEditComponent },

    { path: 'unverified-alumni', component: UnverifiedAlumniReadComponent },
    { path: 'unverified-alumni-edit/:id', component: UnverifiedAlumniEditComponent },

    
    { path: 'projectManager', component: UserPmReadComponent },
    { path: 'projectManager-insert', component: UserPmInsertComponent },
    { path: 'projectManager-edit/:id', component: UserPmEditComponent },
    
    { path: 'staffQA', component: UserQaReadComponent },
    { path: 'staffQA-insert', component: UserQaInsertComponent },
    { path: 'staffQA-edit/:id', component: UserQaEditComponent },
    
    { path: 'staffDeveloper', component: UserDeveloperReadComponent },
    { path: 'staffDeveloper-insert', component: UserDeveloperInsertComponent },
    { path: 'staffDeveloper-edit/:id', component: UserDeveloperEditComponent },
    
    { path: 'board', component: BoardReadComponent },
    { path: 'board-insert', component: BoardInsertComponent },
    { path: 'board-edit/:id', component: BoardEditComponent },
    { path: 'board/:id', component: BoardDetailComponent },
    { path: 'board/:id/ticket/:ticket', component: TicketEditComponent },
    { path: 'board/:id/ticket', component: TicketInsertComponent },
    
    
    { path: '**', component: NotFoundComponent }
  ] },
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
