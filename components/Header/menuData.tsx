import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Products",
    newTab: false,
    path: "/products",
  },
  {
    id: 3,
    title: "Browse By",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Instrument Type",
        newTab: false,
        path: "/products/by-instrument-type",
      },
      {
        id: 32,
        title: "Surgery Type",
        newTab: false,
        path: "/products/by-surgery-type",
      },
    ],
  },
  {
    id: 4,
    title: "About Us",
    newTab: false,
    path: "/about",
  },
  {
    id: 5,
    title: "Quality",
    newTab: false,
    path: "/quality-compliance",
  },
  {
    id: 6,
    title: "Services",
    newTab: false,
    path: "/services",
  },
  {
    id: 7,
    title: "Downloads",
    newTab: false,
    path: "/downloads",
  },
  {
    id: 8,
    title: "Blog",
    newTab: false,
    path: "/blog",
  },
  {
    id: 9,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];

export default menuData;
