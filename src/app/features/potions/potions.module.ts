import { NgModule } from "@angular/core";
import { PotionsService } from "./services/potions.service";
import { PotionsListComponent } from "./potions-list/potions-list.component";
import { PotionsRoutingModule } from "./potions-routing.module";
import { PotionsComponent } from "./potions/potions.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule, DatePipe } from "@angular/common";
import { OrderPotionComponent } from "./order-potion/order-potion.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PotionsListComponent,
    PotionsComponent,
    OrderPotionComponent
  ],
  imports: [
    CommonModule,
    PotionsRoutingModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    PotionsService
  ]
})
export class PotionsModule { }