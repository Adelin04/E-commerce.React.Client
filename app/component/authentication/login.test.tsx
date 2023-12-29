import '@testing-library/jest-dom'
import {  render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals'
import userEvent from '@testing-library/user-event'
import Login from '@/app/component/authentication/login';

describe('Login Component', () => {
  it('The text boxes should be empty when the page is loaded', () => {
    render(<Login />)

    const inputEmail: HTMLInputElement = screen.getByLabelText(/email/i)
    const inputPassword: HTMLInputElement = screen.getByLabelText(/password/i)

    expect(inputEmail.value).toBe("")
    expect(inputPassword.value).toBe("")
  })
})

describe('Login Component', () => {
  it('You should see the message for wrong email or password', () => {
    render(<Login />)
    const user = userEvent.setup()
    let messageAfterLogin = null

    const inputEmail: HTMLInputElement = screen.getByLabelText(/email/i)
    const inputPassword: HTMLInputElement = screen.getByLabelText(/password/i)
    const loginButton = screen.getByText(/login/i, { selector: 'button' });
    
    user.type(inputEmail, "adelin.marin04@yahoo.com")
    user.type(inputPassword, "wrongPass")
    
    user.click(loginButton)
    
    
    waitFor(
      () => {
        messageAfterLogin = screen.getByRole('alert')
        expect(messageAfterLogin).toBeInTheDocument()
      }
      )
      
    })
  })
  