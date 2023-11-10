let linksMenu: any[] = [
    {
        to: "/Clothing",
        name: "Clothing",
        subLinks: [
            { to: "/Clothing/Dresses", name: "Dresses" },
            { to: "/Clothing/Sweatshirts", name: "Blouses" },
            { to: "/Clothing/Pants", name: "Pants" },
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

export default linksMenu;