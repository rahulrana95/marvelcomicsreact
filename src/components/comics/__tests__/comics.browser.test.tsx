import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Comics from "../comics";
import comicsJson from "../../../mock-data/comics.json";

// Mock props for testing
const mockProps = {
  comics: comicsJson,
  totalPages: 5,
  currentPage: 2,
  onClickNext: jest.fn(),
  onClickPrev: jest.fn(),
  onClickPage: jest.fn(),
};

describe("Comics component", () => {
  it("renders comics with pagination buttons", () => {
    // @ts-expect-error s
    const { getByText, getAllByRole } = render(<Comics {...mockProps} />);

    // Check if all comic titles are rendered
    expect(getByText("X-Men: Fall Of The Mutants (2010)")).toBeInTheDocument();
    expect(
      getByText("The Stand: American Nightmares HC (Hardcover)")
    ).toBeInTheDocument();
    // Add more expectations for other comics as needed

    // Check if pagination buttons are rendered
    const paginationButtons = getAllByRole("button");
    expect(paginationButtons).toHaveLength(7); // Previous, page buttons, next button
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("<")).toBeInTheDocument();
    expect(getByText(">")).toBeInTheDocument();
  });

  it("calls onClickNext when next button is clicked", () => {
    // @ts-expect-error s
    const { getByText } = render(<Comics {...mockProps} />);
    const nextButton = getByText(">");
    fireEvent.click(nextButton);
    expect(mockProps.onClickNext).toHaveBeenCalled();
  });

  it("calls onClickPrev when previous button is clicked", () => {
    // @ts-expect-error s
    const { getByText } = render(<Comics {...mockProps} />);
    const prevButton = getByText("<");
    fireEvent.click(prevButton);
    expect(mockProps.onClickPrev).toHaveBeenCalled();
  });

  it("calls onClickPage with correct page number when a pagination button is clicked", () => {
    // @ts-expect-error s
    const { getByText } = render(<Comics {...mockProps} />);
    const pageButton = getByText("3");
    fireEvent.click(pageButton);
    expect(mockProps.onClickPage).toHaveBeenCalledWith(2); // Index of page 3 is 2
  });
});
