import tshirt from './assets/Tshirt.jpg';
import watch from './assets/Watch.jpg';
import speakers from './assets/Speakers.jpg';
import smartphone from './assets/Smartphone.jpg';
import sneakers from './assets/Sneakers.jpg';
import backpack from './assets/Backpack.jpg';

const products = [
  {
    id: 1,
    title: "Stylish T-Shirt",
    price: 499,
    image: tshirt,
    category: "Clothing",
    description: "Comfortable cotton t-shirt for daily wear.",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 2999,
    image: watch,
    category: "Accessories",
    description: "Stylish wristwatch with leather strap.",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: 1499,
    image: speakers,
    category: "Electronics",
    description: "Wireless speaker with rich sound quality.",
  },
  {
    id: 4,
    title: "Smartphone",
    price: 29999,
    image: smartphone,
    category: "Electronics",
    description: "High-performance smartphone with excellent features.",
  },
  {
    id: 5,
    title: "Sneakers",
    price: 2500,
    image: sneakers,
    category: "Footwear",
    description: "Trendy sneakers perfect for running and casual wear.",
  },
  {
    id: 6,
    title: "Backpack",
    price: 1500,
    image: backpack,
    category: "Accessories",
    description: "Spacious backpack ideal for school or travel.",
  },
];

export default products;
