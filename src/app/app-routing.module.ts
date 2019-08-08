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
import { LogReadComponent } from './log/log-read/log-read.component';
import { BrandReadComponent } from './brand/brand-read/brand-read.component';
import { BrandInsertComponent } from './brand/brand-insert/brand-insert.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { CategoryReadComponent } from './category/category-read/category-read.component';
import { CategoryInsertComponent } from './category/category-insert/category-insert.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: MainNavComponent, children: [
    { path: '', component: HomeComponent },
    
    { path: 'log', component: LogReadComponent },

    { path: 'pagination', component: PaginationComponent },

    { path: 'brand', component: BrandReadComponent },
    { path: 'brand-insert', component: BrandInsertComponent },
    { path: 'brand-edit/:id', component: BrandEditComponent },

    { path: 'category', component: CategoryReadComponent },
    { path: 'category-insert', component: CategoryInsertComponent },
    { path: 'category-edit/:id', component: CategoryEditComponent },

    { path: 'user', component: UserReadComponent },
    { path: 'user-insert', component: UserInsertComponent },
    { path: 'user-edit/:id', component: UserEditComponent },

    { path: 'board', component: BoardComponent },
    { path: 'board/:board/ticket/:ticket', component: BoardDetailComponent },
    
    { path: '**', component: NotFoundComponent }
  ] },
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
