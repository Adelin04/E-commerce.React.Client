import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals'
import userEvent from '@testing-library/user-event'
import Page from '../basket/page';
import ProductsList from '@/app/component/productsList';
import { IProduct } from '@/interfaces/interfaces';
import { SerializeProduct } from '@/app/component/serializeProduct';
import { useStore } from 'zustand';
import { useBasketStore } from '@/zustandStore/basketStore';


jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
    }),
}));

const originalState = useBasketStore.getState()
beforeEach(() => {
    useBasketStore.setState(originalState)
})

const mockProduct: IProduct | any = [
    {
        brand: "Brand",
        categoryProduct: { id: 1, name: 'BLOUSES' },
        categoryProductId: 1,
        color: "Blcack",
        createdAt: "0001-01-01T00:00:00",
        currency: "€",
        description: "Black Blouse",
        id: 3,
        name: "Blouse",
        price: 54,
        productCode: "",
        productImages: [
            { id: 9, fK_ProductId: 3, path: ' https://e-commerce-photos.s3.amazonaws.com/Bluza3.1.png' },
            { id: 10, fK_ProductId: 3, path: ' https://e-commerce-photos.s3.amazonaws.com/Bluza3.2.png' },
            { id: 11, fK_ProductId: 3, path: ' https://e-commerce-photos.s3.amazonaws.com/Bluza3.3.png' },
            { id: 12, fK_ProductId: 3, path: ' https://e-commerce-photos.s3.amazonaws.com/Bluza3.4.png' }
        ],
        quantityPerSize: [{ quantity: 1, size: 'XS' }],
        sizeStocks: [{ id: 11, fK_ProductId: 3, fK_SizeId: 2, stock: 2 }],
        stock: 10,
        superCategoryProduct: { id: 1, name: 'CLOTHES' },
        updatedAt: "0001-01-01T00:00:00"
    }
];
const quantity = 1;
const size = 'S';

describe('', () => {
    it('should show the products', async () => {
        const { addProductToBasket } = originalState;
        render(<ProductsList products={mockProduct} />)

        addProductToBasket(SerializeProduct(mockProduct), quantity, size);
        render(<Page />)
    })
})

