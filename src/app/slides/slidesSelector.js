export const selectAllSlides = (state) => state.slides.slides;

export const selectSlidesById = (state, id) =>
  state.slides.slides.find((slides) => slides.id === id);
