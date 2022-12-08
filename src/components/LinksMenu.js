// Links used for the NavBar component
export const pathLinks = [
  {
    to: "/Clothes",
    name: "Clothes",
    subLinks: [
      { to: "/Clothes/Dresses", name: "Dresses" },
      { to: "/Clothes/Sweatshirts", name: "Blouses" },
      { to: "/Clothes/Pants", name: "Pants" },
    ],
    img: [{ path: "./slides/img_subLink_Jewellery.jpg" }],
  },
    {
      to: "/Accessory",
      name: "Accessory",
      subLinks: [
        { to: "/Accessory/Brooches", name: "Brooches" },
        { to: "/Accessory/Bags", name: "Bags" },
      ],
      img: [{ path: "./slides/img_subLink_Jewellery.jpg" }],
    },
  {
    to: "/Collections",
    name: "Collections",
    subLinks: [
      { to: "/Collections/Exclusive", name: "Exclusive" },
      { to: "/Collections/Luxury", name: "Luxury" },
    ],
    img: [{ path: "./slides/img_subLink_Jewellery.jpg" }],
  },
];
