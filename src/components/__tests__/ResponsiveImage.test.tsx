import { RESPONSIVE_SIZES } from "@constants/responsiveSizes";
import { ImageUrls } from "@customTypes/imageTypes";
import { render, screen } from "@testing-library/react";
import { getImageUrls } from "@utils/getImageUrls";
import { testPhoto } from "@utils/testData";
import { vi } from "vitest";
import { ResponsiveImage } from "../index";

vi.mock("../../utils/getImageUrls", () => ({
  getImageUrls: vi.fn(),
}));

const mockGetImageUrls = vi.mocked(getImageUrls, true);

const mockUrls: ImageUrls = {
  small: "http://example.com/small.jpg",
  medium: "http://example.com/medium.jpg",
  large: "http://example.com/large.jpg",
};

describe("ResponsiveImage", () => {
  beforeEach(() => {
    vi.resetModules();
    mockGetImageUrls.mockReset();
  });

  it("should render an image with correct attributes", () => {
    mockGetImageUrls.mockReturnValue(mockUrls);

    render(<ResponsiveImage photo={testPhoto} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", mockUrls.medium);
    expect(image).toHaveAttribute(
      "srcSet",
      `${mockUrls.small} 480w, ${mockUrls.medium} 800w, ${mockUrls.large} 1200w`
    );
    expect(image).toHaveAttribute("sizes", RESPONSIVE_SIZES);
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("alt", testPhoto.title || "Unknown");
  });

  it("should call getImageUrls with the correct photo", () => {
    render(<ResponsiveImage photo={testPhoto} />);

    expect(mockGetImageUrls).toHaveBeenCalledWith(testPhoto);
  });
});
