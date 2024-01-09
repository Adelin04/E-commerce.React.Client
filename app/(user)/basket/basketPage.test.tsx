import { getByText, render, renderHook, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import userEvent from '@testing-library/user-event'

import Page from './page'
import { useBasketStore } from '@/zustandStore/basketStore'
import { SerializeProduct } from '@/app/component/serializeProduct'
import { IProduct } from '@/interfaces/interfaces'


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


const mockProducts: IProduct =
{
    id: 1,
    name: "Blouse",
    brand: "Brand",
    color: "White",
    description: "White blouse",
    price: 50,
    stock: 10,
    currency: "€",
    productCode: "123",
    createdAt: "0001-01-01T00:00:00",
    updatedAt: "0001-01-01T00:00:00",
    categoryProductId: 1,
    categoryProduct: [{ "id": 1, "name": "BLOUSES" }],
    superCategoryProductId: 1,
    superCategoryProduct: [{ "id": 1, "name": "CLOTHES" }],
    sizeStocks: [{
        id: 1, fK_ProductId: 1, fK_SizeId: 2, stock: 2,
        size: {
            fK_ProductId: 1,
            fK_SizeId: 2,
            id: 1,
            size: { id: 2, name: 'XS' },
            stock: 2
        }
    }],
    productImages: [
        { id: 1, fK_ProductId: 1, path: 'https://e-commerce-photos.s3.amazonaws.com/bluza1.0.png' },
        { id: 2, fK_ProductId: 1, path: 'https://e-commerce-photos.s3.amazonaws.com/bluza1.1.png' },
        { id: 3, fK_ProductId: 1, path: 'https://e-commerce-photos.s3.amazonaws.com/bluza1.2.png' },
        { id: 4, fK_ProductId: 1, path: 'https://e-commerce-photos.s3.amazonaws.com/bluza1.3.png' }],
}

const quantity = 1;

const originalState = useBasketStore.getState();

beforeEach(async () => {
    useBasketStore.setState(originalState)

})

describe('Basket Page - Rendering', () => {
    it('Should exist product on page after it is added', async () => {

        render(<Page />)
        const { addProductToBasket } = originalState
        await waitFor(() => {
            addProductToBasket(SerializeProduct(mockProducts), quantity, mockProducts.sizeStocks[0].size.size.name)
        })

        const productName = render(<Page />).container.querySelector('h4')

        expect(productName).toBeInTheDocument()
    })

    it('Should increase with 1 nr of total items from basket page', async () => {

        const { addProductToBasket } = originalState
        await waitFor(() => {
            addProductToBasket(SerializeProduct(mockProducts), quantity, mockProducts.sizeStocks[0].size.size.name)
            render(<Page />)
        })

        //check if the counter has increased
        const totalItems = screen.getByText(/Total Items : 1/)
        expect(totalItems).toBeInTheDocument()
    })

    it('Should update the price with item price added', async () => {

        const { addProductToBasket } = originalState
        await waitFor(() => {
            addProductToBasket(SerializeProduct(mockProducts), quantity, mockProducts.sizeStocks[0].size.size.name)
            render(<Page />)
        })

        //check if the total price has updated after adding a new product to the cart
        const totalPrice = screen.getByText(/Total: 50.00/)
        expect(totalPrice).toBeInTheDocument()
    })

    it('The button should be hidden if the basket will be empty', () => {
        render(<Page />)
        const user = userEvent.setup()

        const totalItems = screen.getByText(/Total Items : 0/)
        const buttonNextStep = screen.getByText(/Next Step/, { selector: 'a' });

        //check if the counter items is 0 
        expect(totalItems).toBeInTheDocument()

        //click the button to check if the page has changed
        user.click(buttonNextStep)
        expect(buttonNextStep).toHaveAttribute("href", "/basket");
    })

    it('Should send the user to the address page when he clicked the next step button and there are products in the cart', async () => {
        const { addProductToBasket } = originalState
        await waitFor(() => {
            addProductToBasket(SerializeProduct(mockProducts), quantity, mockProducts.sizeStocks[0].size.size.name)
            render(<Page />)
        })
        const user = userEvent.setup()

        const totalItems = screen.getByText(/Total Items : 1/)
        const buttonNextStep = screen.getByText(/Next Step/, { selector: 'a' });

       //check if the counter is incremented by 1
        expect(totalItems).toBeInTheDocument()

        //click the button to check if the page has changed
        user.click(buttonNextStep)
        expect(buttonNextStep).toHaveAttribute("href", "/address");
    })


})