import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals'
import userEvent from '@testing-library/user-event'
import Login from '@/app/component/authentication/login';

describe('Login Component', () => {
  it('The text boxes should be empty when the page is loaded', () => {
    render(<Login />)

    // get the input elements
    const inputEmail: HTMLInputElement = screen.getByLabelText(/email/i)
    const inputPassword: HTMLInputElement = screen.getByLabelText(/password/i)

    // check the input elements if those is empty
    expect(inputEmail.value).toBe("")
    expect(inputPassword.value).toBe("")
  })

  it('You should see the message for wrong email or password', () => {
    render(<Login />)
    const user = userEvent.setup()
    let messageAfterLogin = null

    // get the input elements and the login button
    const inputEmail: HTMLInputElement = screen.getByLabelText(/email/i)
    const inputPassword: HTMLInputElement = screen.getByLabelText(/password/i)
    const loginButton = screen.getByText(/login/i, { selector: 'button' });

    // simulate the wrong user inputs
    user.type(inputEmail, "adelin.marin04@yahoo.com")
    user.type(inputPassword, "wrongPass")

    // click the login button
    user.click(loginButton)

    // check if the wrong credentials message was displayed
    waitFor(
      () => {
        messageAfterLogin = screen.getByRole('alert')
        expect(messageAfterLogin).toBeInTheDocument()
      })

  })
})

