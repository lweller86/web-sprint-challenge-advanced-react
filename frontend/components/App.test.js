import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import AppClass from './AppClass'
import AppFunctional from './AppFunctional'

test('sanity', () => {
  expect(true).toBe(true)
})

test("renders greeting on AppFunctional page", () => {
  render(<AppFunctional />)

  const header = screen.findAllByText(/welcome to the grid/i)
  const coordinates = screen.findAllByText(/Coordinates/i)
  const steps = screen.findAllByText(/you moved 0 times/i)
  const upButton = screen.findAllByText(/up/i)
  const downButton = screen.findAllByText(/down/i)
  const leftButton = screen.findAllByText(/left/i)
  const rightButton = screen.findAllByText(/right/i)


  expect(coordinates).toBeTruthy()
  expect(steps).toBeTruthy()
  expect(upButton).toBeTruthy()
  expect(downButton).toBeTruthy()
  expect(leftButton).toBeTruthy()
  expect(rightButton).toBeTruthy()
})

test("App Inital active state", () => {
  render(<AppFunctional />)

  const activeSpace = screen.findByText(/Coordinates (2, 2)/i);
  expect(activeSpace).toBeTruthy();

})





test("app movements", () => {
  render(<AppFunctional />)

  const upButton = screen.getByText(/up/i);
  const downButton = screen.getByText(/down/i);
  const leftButton = screen.getByText(/left/i);
  const rightButton = screen.getByText(/right/i);


  const activeSpace = screen.findByText(/Coordinates (2, 2)/i);
  expect(activeSpace).toBeTruthy();

  userEvent.click(upButton);

  const activeSpace2 = screen.findByText(/Coordinates (2,1)/i);
  expect(activeSpace).not.toBeTruthy;
  expect(activeSpace2).toBeTruth;

  userEvent.click(downButton);
  userEvent.click(downButton);

  const activeSpace3 = screen.findByText(/Coordinates (2,3)/i);
  expect(activeSpace).not.toBeTruthy;
  expect(activeSpace3).toBeTruth;

  userEvent.click(leftButton);

  const activeSpace4 = screen.findByText(/Coordinates (1,3)/i);
  expect(activeSpace).not.toBeTruthy;
  expect(activeSpace4).toBeTruth;

  userEvent.click(rightButton);
  userEvent.click(rightButton);

  const activeSpace5 = screen.findByText(/Coordinates (3,3)/i);
  expect(activeSpace).not.toBeTruthy;
  expect(activeSpace5).toBeTruth;

})

test("Reset Button Functionality", () => {
  render(<AppFunctional />)
  const upButton = screen.getByText(/up/i);
  const resetButton = screen.findByText(/reset/i)
  const activeSpace = screen.findByText(/Coordinates (2, 2)/i);

  expect(activeSpace).toBeTruthy();

  userEvent.click(upButton);

  const activeSpace2 = screen.findByText(/Coordinates (2,1)/i);
  expect(activeSpace).not.toBeTruthy;
  expect(activeSpace2).toBeTruth;

  userEvent.click(resetButton);
  expect(activeSpace).toBeTruthy;

})

test("Email input validity", async () => {
  render(<AppFunctional />);


  const inputBox = screen.getByRole('textbox', { id: 'email' })

  expect(inputBox)
    .toBeInTheDocument()
  fireEvent.change(inputBox, { target: { value: 'lweller@gmail.com' } })
  expect(inputBox)
    .toHaveValue('lweller@gmail.com')

})

