export const SerializeProduct = (product ) => {
    let newProduct = {
        category: product.category,
        color: product.color,
        createdAt: product.createdAt,
        currency: product.currency,
        description: product.description,
        id: product.id,
        name: product.name,
        price: product.price,
        picturePath: product.picturePath,
        stock: product.stock,
        updatedAt: product.updatedAt
    }
    return newProduct;
}
