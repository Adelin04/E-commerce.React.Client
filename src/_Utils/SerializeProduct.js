export const SerializeProduct = (product ) => {
    let newProduct = {
        category: product.categoryProduct,
        color: product.color,
        createdAt: product.createdAt,
        currency: product.currency,
        description: product.description,
        id: product.id,
        name: product.name,
        price: Number(product.price),
        productImages: product.productImages,
        stock: product.stock,
        updatedAt: product.updatedAt
    }
    return newProduct;
}
