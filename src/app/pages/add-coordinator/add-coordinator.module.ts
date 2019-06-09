import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddCoordinatorPage } from './add-coordinator.page';

const routes: Routes = [
  {
    path: '',
    component: AddCoordinatorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddCoordinatorPage]
})
export class AddCoordinatorPageModule {}
