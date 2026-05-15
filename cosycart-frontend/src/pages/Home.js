import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { addToCart } = useCart();
    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:8080/api/products/all')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');

        if (category && products.length > 0) {
            // Fix: Dono side ko lowercase kar diya taaki match pakka ho
            const filtered = products.filter(p => 
                p.category && p.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [location.search, products]);

    const handleAddToCart = (item) => {
        addToCart(item);
        alert(item.name + " added to cart!");
    };

    return (
        <div className="bg-light pb-5">
            <div id="cosySlider" className="carousel slide shadow-sm mb-5" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#cosySlider" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#cosySlider" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#cosySlider" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner" style={{ maxHeight: '450px' }}>
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1350" className="d-block w-100" alt="S1" style={{objectFit:'cover', height:'450px'}} />
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                            <h1 className="fw-bold">COSYCART 2026</h1>
                            <p>Fresh Styles, Better Prices.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1350" className="d-block w-100" alt="S2" style={{objectFit:'cover', height:'450px'}} />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1350" className="d-block w-100" alt="S3" style={{objectFit:'cover', height:'450px'}} />
                    </div>
                </div>
            </div>

            <div className="container">
                <h3 className="fw-bold mb-4 border-start border-warning border-4 ps-3">
                    {new URLSearchParams(location.search).get('category') || 'TRENDING NOW'}
                </h3>
                <div className="row">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={p.id}>
                                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                                    <img src={p.image_url} className="card-img-top" alt={p.name} style={{ height: '300px', objectFit: 'cover', borderTopLeftRadius:'15px', borderTopRightRadius:'15px' }} />
                                    <div className="card-body text-center">
                                        <h5 className="fw-bold">{p.name}</h5>
                                        <h4 className="text-primary">₹{p.price}</h4>
                                        <div className="d-flex gap-2 mt-3">
                                            <Link to={`/product/${p.id}`} className="btn btn-outline-dark rounded-pill w-50">Details</Link>
                                            <button className="btn btn-dark rounded-pill w-50" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <h4>No products found for this category.</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;