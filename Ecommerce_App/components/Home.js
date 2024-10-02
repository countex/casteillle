import ProductCard from './ProductCard';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { animateElement } from '../utils/gsapAnimations';

const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 29.99, image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 39.99, image: '/images/product2.jpg' },
    // Add more products as needed
];

export default function Home() {
    useEffect(() => {
        animateElement('.product-card', { duration: 1, y: -50, opacity: 0, stagger: 0.2 });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <div className="product-card" key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}