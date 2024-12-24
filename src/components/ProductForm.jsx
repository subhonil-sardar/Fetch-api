import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import {useDispatch} from 'react-redux'
import { createProduct } from '../features/products/productSlice';
const ProductForm = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        title : "",
        description : "",
        price : "",
        category : "",
    });
    const handleChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
    });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(createProduct({...product, id: nanoid()}))
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" name='title' value={product.title} onChange={handleChange} />
            </div>
            <div>
                <label>Price</label>
                <input type="number" name='price' value={product.price} onChange={handleChange} />
            </div>
            <div>
                <label>Description</label>
                <textarea  name='description' value={product.description} onChange={handleChange} />
            </div>
            <div>
                <label>Category</label>
                <input type="text" name='category' value={product.category} onChange={handleChange} />
            </div>
            <div>
                <button type='submit'>
                    Add Product
                </button>
            </div>
        </form>
    </div>
  )
}

export default ProductForm