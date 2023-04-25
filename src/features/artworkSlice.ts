import { createSlice } from "@reduxjs/toolkit";
import { ArtWorkType } from "../types/types";

interface ArtworksState {
  artwork: ArtWorkType | {};
}

const initialState: ArtworksState = {
  artwork: {},
};

export const artworkSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {
    setArtwork: (state, action) => {
      state.artwork = action.payload;
    },
  },
});

export const { setArtwork } = artworkSlice.actions;

export const selectArtwork = (state) => {
  return state.artwork.artwork;
};

export default artworkSlice.reducer;
