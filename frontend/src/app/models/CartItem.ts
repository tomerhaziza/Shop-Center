export class CartItem{
    public constructor(
        public id: number,
        public name: string,
        public price: number,
        public amount: number,
        public totalPrice: number,
        public imageUrl: string
    ){}
}