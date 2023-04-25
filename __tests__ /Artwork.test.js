import React from "react";
import { render, screen } from "@testing-library/react-native";

import Artwork from "../src/components/cards/Artwork";

describe("<Artwork />", () => {
  const mockProps = {
    artwork: {
      title: "Test title",
      artist_title: "Test Artist",
      thumbnail: {
        alt_text: "A test image",
      },
    },
    imageEndpoint: "https://www.example.com",
    onPress: jest.fn(),
  };

  it("renders title and artist", () => {
    render(<Artwork {...mockProps} />);
    expect(screen.getByText("Test title")).toBeOnTheScreen();
    expect(screen.getByText("Test Artist")).toBeOnTheScreen();
  });

  it("doesn't render artist if not given", () => {
    const mockProps2 = {
      artwork: {
        ...mockProps.artwork,
        artist_title: null,
      },
    };
    render(<Artwork {...mockProps2} />);
    expect(screen.queryByText("Test Artist")).not.toBeOnTheScreen();
  });
});
