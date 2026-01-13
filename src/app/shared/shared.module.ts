import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { CustomTextInputComponent } from "./custom-text-input/custom-text-input.component";
import { CustomSelectComponent } from "./custom-select/custom-select.component";
import { CustomDatepickerComponent } from "./custom-datepicker/custom-datepicker.component";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    CustomTableComponent,
    CustomTextInputComponent,
    CustomSelectComponent,
    CustomDatepickerComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [],
  exports: [
    CustomTableComponent,
    CustomTextInputComponent,
    CustomSelectComponent,
    CustomDatepickerComponent
  ]
})
export class SharedModule { }
