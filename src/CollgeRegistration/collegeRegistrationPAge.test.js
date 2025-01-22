import { fireEvent, render, screen } from "@testing-library/react";
import CollageRegistrationPAge from "./CollageRegistrationPAge";
import { describe, expect, test } from "vitest";
import { serverTimestamp } from "firebase/database";
import { executeMutation } from "firebase/data-connect";

describe("check the element", () => {
  test("should ", () => {
    <CollageRegistrationPAge />;
    expect(screen.getByText("college Tegistration Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Enter College Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter College Name")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Enter Established Year")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Established Year")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Enter Affiliation year")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Affiliation year")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Type of College")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Enter College Phone Number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter college phone number")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Submit",
      })
    ).toBeInTheDocument();
  });
  test("should check the input element render correctly", () => {
    render(<CollageRegistrationPAge />);
    fireEvent.change(screen.getByPlaceholderText("Enter College Name"), {
      target: {
        value: "Sunny",
      },
    });
    expect(screen.getByPlaceholderText("Enter College Name").value).toBe(
      "Sunny"
    );
    fireEvent.change(screen.getByPlaceholderText("Enter Established Year"), {
      target: {
        value: 2008,
      },
    });
    expect(screen.getByPlaceholderText("Enter Established Year").value).toBe(
      2008
    );
    fireEvent.change(screen.getByPlaceholderText("Enter Affiliation year"), {
      target: {
        value: 2009,
      },
    });
    expect(screen.getByPlaceholderText("Enter Affiliation year").value).toBe(
      2009
    );
    expect(screen.getByRole("combobox").value).toBe("");
    expect(screen.getByRole("combobox").value).toBe("government");
    expect(screen.getByRole("combobox").value).toBe("private");
    expect(screen.getByRole("combobox").value).toBe("autonomous");
    fireEvent(screen.getByPlaceholderText("Enter email"), {
      target: {
        value: "sunnyrajbodhgaya13@gmail.com",
      },
    });
    expect(screen.getByPlaceholderText("Enter email").value).toBe(
      "sunnyrajbodhgaya13@gmail.com"
    );
    fireEvent(screen.getByPlaceholderText("Enter college phone number"), {
      target: {
        value: 6299137889,
      },
    });
    expect(
      screen.getByPlaceholderText("Enter college phone number").value
    ).toBe(629137889);
  });
});
