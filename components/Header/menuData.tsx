import { Menu } from "@/types/menu";
import { instrumentTypeCategories, surgeryTypeCategories } from "@/data/categories";

// Helper function to convert instrument categories to menu items
const getInstrumentTypeMenuItems = (): Menu[] => {
  let idCounter = 1000;
  return instrumentTypeCategories.map((category) => {
    const categoryId = idCounter++;
    return {
      id: categoryId,
      title: category.name,
      path: `/products/by-instrument-type/${category.slug}`,
      newTab: false,
      submenu: category.subcategories?.map((subcat) => {
        const subcatId = idCounter++;
        return {
          id: subcatId,
          title: subcat.name,
          path: `/products/by-instrument-type/${category.slug}/${subcat.slug}`,
          newTab: false,
        };
      }),
    };
  });
};

// Helper function to convert surgery categories to menu items
const getSurgeryTypeMenuItems = (): Menu[] => {
  let idCounter = 2000;
  return surgeryTypeCategories.map((category) => {
    const categoryId = idCounter++;
    return {
      id: categoryId,
      title: category.name,
      path: `/products/by-surgery-type/${category.slug}`,
      newTab: false,
      submenu: category.subcategories?.map((subcat) => {
        const subcatId = idCounter++;
        return {
          id: subcatId,
          title: subcat.name,
          path: `/products/by-surgery-type/${category.slug}`,
          newTab: false,
        };
      }),
    };
  });
};

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
    title: "Browse by Instrument Type",
    newTab: false,
    path: "/products/by-instrument-type",
    submenu: getInstrumentTypeMenuItems(),
  },
  {
    id: 4,
    title: "Browse by Surgery Type",
    newTab: false,
    path: "/products/by-surgery-type",
    submenu: getSurgeryTypeMenuItems(),
  },
  {
    id: 5,
    title: "About Us",
    newTab: false,
    path: "/about",
  },
  {
    id: 6,
    title: "Quality",
    newTab: false,
    path: "/quality-compliance",
  },
  {
    id: 7,
    title: "Services",
    newTab: false,
    path: "/services",
  },
  {
    id: 8,
    title: "Downloads",
    newTab: false,
    path: "/downloads",
  },
  {
    id: 9,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];

export default menuData;
