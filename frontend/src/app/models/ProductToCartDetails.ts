export class ProductToCartDetails{
    public constructor(
        public productId: number,
        public amount: number,
        public price: number,
        public totalPrice: number,
        public cartId: number
    ){}
}