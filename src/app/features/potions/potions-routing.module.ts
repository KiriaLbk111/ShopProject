import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotionsComponent } from './potions/potions.component';

const routes: Routes = [
  { path: '', component: PotionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotionsRoutingModule { }