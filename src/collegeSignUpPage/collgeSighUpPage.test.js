import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CollegeSignUpPage from "./CollegeSignUpPAge";

describe("sign up page of collge sign up page", () => {
  test("should check the hii word", () => {
    render(<CollegeSignUpPage />);
    expect(screen.getByLabelText("College ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
  test("shold check the input field", () => {
    render(<CollegeSignUpPage />);
    expect(screen.getByPlaceholderText("Enter Collage ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });
  test("should check the button", () => {
    render(<CollegeSignUpPage />);
    expect(
      screen.getByRole("button", {
        name: "Submit",
      })
    ).toBeInTheDocument();
  });
  test('should check the button render collrectly', () => {
    render(<CollegeSignUpPage />)
    fireEvent.change(screen.getByPlaceholderText('Enter Collage ID'),{
        target:{
            value:'Sunny'
        }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter password',{
        target:{
            value:'ABC'
        }
    }))
    expect(screen.getByPlaceholderText('Enter College ID').value).toBe('Sunny')
    expect(screen.getByPlaceholderText('Enter password').value).toBe('ABC')
    fireEvent.click(screen.getByRole('button',{
        name:'Submit'
    }))
    
  })
  
});
