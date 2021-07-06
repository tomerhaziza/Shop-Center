export class NewProductDetails{
    public constructor(
        public name: string,
        public price: number,
        public imageUrl: string,
        public categoryId: number
    ){}
}