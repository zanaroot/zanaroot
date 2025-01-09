import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Loader } from "./loader";

it("renders loader component", async () => {
  const { findByTestId } = render(<Loader />);

  findByTestId("loader").then((element) => {
    void expect(element).exist;

    void expect(element.className).toBe(
      "flex justify-center items-center h-screen",
    );
  });
});
