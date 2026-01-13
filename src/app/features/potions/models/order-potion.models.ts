export interface OrderPotionModel {
  id: number;
  name: string;
  orderDate: Date;
  readyDate: Date;
  deliveryAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
}