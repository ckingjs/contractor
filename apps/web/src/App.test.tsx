import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the stage 2 heading", () => {
    render(<App />);
    expect(screen.getByText(/Authenticated clock in\/out workflow/i)).toBeInTheDocument();
  });
});
