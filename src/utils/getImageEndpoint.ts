export const getImageEndpoint = (iiifUrl: string, imageID: string) => {
  return `${iiifUrl}/${imageID}/full/400,/0/default.jpg`;
};
