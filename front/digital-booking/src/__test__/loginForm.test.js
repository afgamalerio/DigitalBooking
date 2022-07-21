import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import LoginForm from "../components/LoginForm";


test("render content", () => {
    const componentForm = render (<LoginForm />);
    //console.log(component);
})

describe ("email tests", () => {
    const component = render(<LoginForm />);
    //console.log(component);

    test('correct email', () => {
        expect("email@algo.com").toEqual(expect.stringMatching(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i));
    });

    test('wrong email', () => {
        expect("cualquier otra cosa").toEqual(expect.not.stringMatching(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i));
    });

})

test('rendering and submitting form', async () => {
  const handleSubmit = jest.fn()
  render(<LoginForm onSubmit={handleSubmit} />)

  userEvent.type(screen.getByTestId(/username/i), 'email@algo.com')
  userEvent.type(screen.getByLabelText(/password/i), 'contraseña')

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "email@algo.com",
      password: 'contraseña',
    }),
  )
})