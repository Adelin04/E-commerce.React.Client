export interface Data {
    success: string,
    products: any[]
}

export interface IProduct {
    id: number,
    name: string,
    brand: string,
    color: string,
    description: string,
    price: number,
    stock: number,
    currency: string,
    createdAt: string,
    updatedAt: string,
    productCode: string,
    categoryProductId: number | null,
    categoryProduct: [any],
    superCategoryProductId: number | null,
    superCategoryProduct: [any],
    sizeStocks: [any],
    productImages: Array<any>
}

export interface ResponseProductEntity {
    success: string,
    products: IProduct[],
}

export interface IListProducts {
    products: IProduct;
}

/* export interface UserState {
    isAuth: boolean,
    isAdmin: boolean,
    user: IUser,
    token: string
} */

export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    role: Array<any>,
    timeExpirationsToken: string
}

export interface Data {
    success: string,
    products: any[]
}

export interface CarouselInterface {
    pathImages: any[];
}
