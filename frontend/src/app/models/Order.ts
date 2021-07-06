export class Order {
    public constructor(
        public id: number,
        public cartId: number,
        public totalPrice: number,
        public city: string,
        public street: string,
        public deliveryDate: Date,
        public orderDate: Date,
        public creditCardNumber: number
    ) { }
}