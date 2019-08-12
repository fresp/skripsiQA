import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { InvitedAlumniInsertComponent } from './invited-alumni/invited-alumni-insert/invited-alumni-insert.component';
import { InvitedAlumniEditComponent } from './invited-alumni/invited-alumni-edit/invited-alumni-edit.component';
import { UnverifiedAlumniEditComponent } from './unverified_alumni/unverified-alumni-edit/unverified-alumni-edit.component';
import { InvitedAlumniReadComponent } from './invited-alumni/invited-alumni-read/invited-alumni-read.component';
import { UnverifiedAlumniReadComponent } from './unverified_alumni/unverified-alumni-read/unverified-alumni-read.component';
import { BoardComponent } from "./board/board.component";
import { BoardDetailComponent } from "./board-detail/board-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'secure', component: MainNavComponent, children: [
    { path: '', component: HomeComponent },

    { path: 'invited-alumni', component: InvitedAlumniReadComponent },
    { path: 'invited-alumni-insert', component: InvitedAlumniInsertComponent },
    { path: 'invited-alumni-edit/:id', component: InvitedAlumniEditComponent },

    { path: 'board', component: BoardComponent },
    { path: 'board/:board/ticket/:ticket', component: BoardDetailComponent },

    { path: 'unverified-alumni', component: UnverifiedAlumniReadComponent },
    { path: 'unverified-alumni-edit/:id', component: UnverifiedAlumniEditComponent },
    
    { path: '**', component: NotFoundComponent }
  ] },
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
