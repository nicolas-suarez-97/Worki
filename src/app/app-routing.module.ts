import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'qr-code', loadChildren: './pages/qr-code/qr-code.module#QrCodePageModule' },  
  //{ path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule'},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registry', loadChildren: './pages/registry/registry.module#RegistryPageModule' },  
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'coordinator', loadChildren: './pages/coordinator/coordinator.module#CoordinatorPageModule' },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'add-event', loadChildren: './pages/add-event/add-event.module#AddEventPageModule' },
  { path: 'edit-event', loadChildren: './pages/edit-event/edit-event.module#EditEventPageModule' },
  { path: 'main-event-page', loadChildren: './pages/main-event-page/main-event-page.module#MainEventPagePageModule' },
  { path: 'add-coordinator', loadChildren: './pages/add-coordinator/add-coordinator.module#AddCoordinatorPageModule' }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
