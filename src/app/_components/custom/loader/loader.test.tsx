import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Loader } from "./loader";

it("renders loader component", async () => {
  const { findByTestId } = render(<Loader />);

  findByTestId("loader").then((element) => {
    expect(element).exist;

    expect(element.className).toBe("flex justify-center items-center h-screen");
  });
});
