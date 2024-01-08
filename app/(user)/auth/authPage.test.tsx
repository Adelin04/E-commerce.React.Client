import { getByText, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// import '@testing-library/jest-dom/jest-globals'
// import userEvent from '@testing-library/user-event'

import Page from '../auth/page'

/* describe('Auth Page', () => {
    it('Should render the Register component when click the register button', async () => {
        render(<Page />)
        const user = userEvent.setup()

        //click register button to renderer Register component 
        const registerButton = screen.getByText(/Register/, { selector: 'button' });
        await user.click(registerButton)


        //if the text exists, it means the component has been changed
        const textForLoginComponent = screen.getByText("Do you have an account?")
        expect(textForLoginComponent).toBeInTheDocument();
    })

    it('Should render the Login component when click the login button', async () => {
        render(<Page />)
        const user = userEvent.setup()

        //click register button to renderer Register component 
        const registerButton = screen.getByText(/Register/, { selector: 'button' });
        await user.click(registerButton)


        //click login button to renderer Login component 
        const loginButton = screen.getByText(/Login/, { selector: 'button' });
        await user.click(loginButton)

        //if the text exists, it means the component has been changed
        const textForRegisterComponent = screen.getByText("Don't you have an account?")
        expect(textForRegisterComponent).toBeInTheDocument();

    })
}) */

describe('...', () => {
    it('Should...', async () => {
        render(<Page />)


    })
})