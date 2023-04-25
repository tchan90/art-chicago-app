import React from "react";

export type RootStackParamList = {
  Home: undefined;
  Details: { artworkName: string; imageEndpoint: string };
};

export interface ArtWorkType {
  id: string;
  title: string;
  image_id: string;
  artist_title: string;
  date_display: string;
  thumbnail: {
    lqip: string;
    url: string;
    alt_text: string;
  };
}

export interface ArtWorkCardType {
  artwork: ArtWorkType;
  imageEndpoint: string;
  onPress: () => void;
}

export enum PillColourEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export interface PillType {
  title: string;
  colour: PillColourEnum;
}

export interface DetailsSectionType {
  title: string;
  children: React.ReactNode;
}
