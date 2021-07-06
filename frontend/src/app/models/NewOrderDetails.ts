export class NewOrderDetails{
    public constructor(
        public city: string,
        public street: string,
        public deliveryDate: Date,
        public creditCardNumber: number,
        public totalPrice: number,
        public cartId: number
    ){}
}