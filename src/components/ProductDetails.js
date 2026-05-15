import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '80vh'}}>
            <div className="spinner-border text-dark" role="status"></div>
            <span className="mt-3 fw-bold">Connecting to CosyCart...</span>
        </div>
    );

    if (!product) return (
        <div className="container mt-5 text-center">
            <h3 className="text-danger">Product Not Found!</h3>
            <p>Check if Spring Boot is running and ID {id} exists.</p>
            <Link to="/" className="btn btn-dark rounded-pill px-4">Back to Shop</Link>
        </div>
    );

    return (
        <div className="container mt-5 mb-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">HOME</Link></li>
                    <li className="breadcrumb-item active text-uppercase">{product.category || 'Collection'}</li>
                </ol>
            </nav>

            <div className="row g-5">
                <div className="col-md-7">
                    <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '20px' }}>
                        <img src={product.image_url} className="img-fluid" alt={product.name} style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="ps-lg-4">
                        <h1 className="fw-bold display-6 mb-2">{product.name}</h1>
                        <h2 className="text-primary fw-bold mb-4">₹{product.price}</h2>
                        <p className="text-muted mb-4">{product.description || "Premium quality material designed for comfort."}</p>

                        <div className="mb-4">
                            <h6 className="fw-bold mb-3 text-uppercase">Select Size:</h6>
                            <div className="d-flex gap-2">
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`btn rounded-pill px-4 ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}>{size}</button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold mb-3 text-uppercase">Quantity:</h6>
                            <div className="input-group mb-3 shadow-sm rounded-pill overflow-hidden" style={{ width: '140px' }}>
                                <button className="btn btn-outline-dark border-0" onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}>-</button>
                                <input type="text" className="form-control text-center border-0 fw-bold" value={quantity} readOnly />
                                <button className="btn btn-outline-dark border-0" onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                        </div>

                        <button 
                            className="btn btn-dark btn-lg w-100 rounded-pill py-3 mt-4 fw-bold shadow"
                            onClick={() => {
                                addToCart({...product, quantity, size: selectedSize});
                                alert(`${product.name} added to your Cosy Bag!`);
                            }}
                        >
                            ADD TO CART - ₹{(product.price * quantity).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;