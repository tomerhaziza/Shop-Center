import { CartItem } from "./CartItem";

export class Cart{
    public constructor(
        public id: number,
        public cartItems: CartItem[],
        public totalPrice: number
    ){}
}