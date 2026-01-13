import { Component, Input, OnInit } from "@angular/core";
import { PotionsService } from "../services/potions.service";
import { PotionModel } from "../models/potion.model";

@Component({
    selector: 'app-potions-list',
    templateUrl: './potions-list.component.html',
    styleUrls: ['./potions-list.component.scss']
})
export class PotionsListComponent implements OnInit {
    @Input() data: PotionModel[] = [];
    @Input() columns: string[] = ['id', 'name', 'price', 'ingredients'];

    constructor() {

    }

    ngOnInit(): void {
    }
}