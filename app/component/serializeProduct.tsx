import { IProduct } from "@/interfaces/interfaces";

export const SerializeProduct = (product: IProduct) => {
    let newProduct = {
        id: product?.id,
        name: product?.name,
        brand: product?.brand,
        color: product?.color,
        categoryProduct: product?.categoryProduct,
        categoryProductId: product?.categoryProductId,
        superCategoryProductId: product?.superCategoryProductId,
        description: product?.description,
        price: Number(product?.price),
        stock: product?.stock,
        sizeStocks: product?.sizeStocks,
        productImages: product?.productImages,
        currency: product?.currency,
        productCode: product?.productCode,
        superCategoryProduct: product?.superCategoryProduct,
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt
    }
    return newProduct;
}