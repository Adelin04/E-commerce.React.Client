export const SerializeProduct = (product ) => {
    let newProduct = {
        category: product.category,
        color: product.color,
        createdAt: product.createdAt,
        currency: product.currency,
        description: product.description,
        id: product._id,
        name: product.name,
        price: product.price,
        productImagePath: product.productImagePath,
        stock: product.stock,
        updatedAt: product.updatedAt
    }
    return newProduct;
}
