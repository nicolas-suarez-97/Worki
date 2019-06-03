import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'qr-code', loadChildren: './qr-code/qr-code.module#QrCodePageModule' },
  { path: 'details/:id', loadChildren: './todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details', loadChildren: './todo-details/todo-details.module#TodoDetailsPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
