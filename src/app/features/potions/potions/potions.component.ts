import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { PotionModel } from "../models/potion.model";
import { PotionsService } from "../services/potions.service";
import { OrderPotionComponent } from "../order-potion/order-potion.component";
import { OrderPotionModel } from "../models/order-potion.models";

@Component({
    selector: 'app-potions',
    templateUrl: './potions.component.html',
    styleUrls: ['./potions.component.scss']
})
export class PotionsComponent implements OnInit {
    availablePotions: PotionModel[] = [];
    orders: OrderPotionModel[] = [];
    isShowOrderedPotions: boolean = false;
    ordersColumn: string[] = ['name', 'orderDate', 'readyDate', 'deliveryAddress', 'deliveryMethod', 'paymentMethod'];
    potionRef: ComponentRef<OrderPotionComponent> | null = null;

    @ViewChild('dynamicContainer', { read: ViewContainerRef })
    dynamicContainer!: ViewContainerRef;

    constructor(private potionsService: PotionsService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.availablePotions = this.potionsService.getPotions();
        this.orders = this.potionsService.getOrderedPotions();
    }

    showOrNotShowOrders() {
        this.isShowOrderedPotions = !this.isShowOrderedPotions; 
        this.cdr.detectChanges();
    }

    order() {
        this.closeModal();

        this.potionRef = this.dynamicContainer.createComponent(OrderPotionComponent);

        this.potionRef.instance.close.subscribe(() => {
            this.closeModal();
            this.orders = [...this.potionsService.getOrderedPotions()];
        });
    }

    private closeModal(): void {
        if (this.potionRef) {
            this.potionRef.destroy();
            this.potionRef = null;
        }
    }
}