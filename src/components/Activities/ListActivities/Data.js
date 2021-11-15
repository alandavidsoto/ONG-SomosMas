function createData(name, createdAt, image, id) {
  return { name, createdAt, image, id };
}
const ArrayData = () => {
  return [
    createData("Educación", "20/2/1992", "https://picsum.photos/200", 2),
    createData("Alimentos", "20/2/1992", "https://picsum.photos/200", 3),
    createData("Deporte", "20/2/1992", "https://picsum.photos/200", 4),
    createData("Donaciones", "20/2/1992", "https://picsum.photos/200", 5),
    createData("Vestimenta", "20/2/1992", "https://picsum.photos/200", 6),
    createData("Voluntariado", "20/2/1992", "https://picsum.photos/200", 7),
    createData("Voluntariado v1", "20/2/1992", "https://picsum.photos/200", 8),
  ].sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
};

export default ArrayData;
