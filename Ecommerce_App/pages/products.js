import ProductCard from '../components/ProductCard';

const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 29.99, image: '/images/product1.jpg' },
    // Add more products as needed
];

export default function Products() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}