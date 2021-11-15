const routes = [
  {
    name: "Novedades",
    link: "/backoffice/news",
  },
  {
    name: "Usuarios",
    link: "/backoffice/users",
  },
  {
    name: "Actividades",
    link: "/backoffice/activities",
  },
  {
    name: "Categorias",
    link: "/backoffice/categories",
  },
  {
    name: "Slides",
    link: "/backoffice/slides",
  },
  {
    name: "Miembros",
    link: "/backoffice/members",
  },
];

let orderRoutes = routes.sort((a, b) => (a.name > b.name ? 1 : -1));
orderRoutes.unshift({
  name: "Inicio",
  link: "/backoffice",
});
orderRoutes.push({
  name: "Organización",
  link: "/backoffice/organization",
});
export const LinksBackOffice = orderRoutes;
