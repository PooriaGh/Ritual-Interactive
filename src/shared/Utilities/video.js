export const generateTrailerLink = (trailerUrl) => {
  return trailerUrl ? trailerUrl.replace('watch?v=', 'embed/') : '';
};
