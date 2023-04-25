export const getHomeArtwork = async (page: number) => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=8&fields=id,title,artist_title,image_id,thumbnail`
  );
  return await response.json();
};

export const getArtworkDetails = async (id: string) => {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
  const results = await response.json();

  return {
    data: results.data,
    config: results.config,
  };
};
