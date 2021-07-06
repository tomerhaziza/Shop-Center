export class Product{
    public constructor(
        public id: number,
        public name: string,
        public price: number,
        public imageUrl: string,
        public categoryId: number,
    ){}
}