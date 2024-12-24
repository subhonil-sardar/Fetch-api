import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { createProduct, updateProduct } from '../features/products/productSlice';
const ProductForm = ({productToEdit ={}, isEdit=false}) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        title :  "",
        description :  "",
        price : "",
        category :  "",
    });
    
    useEffect(() => {
        if(productToEdit){
            setProduct(
                {
                    title :  productToEdit.title ?? '',
                    description : productToEdit.description ?? '',
                    price : productToEdit.price ?? '',
                    category : productToEdit.category ?? '',
                }
            )
        }
    }, [productToEdit]);

    const handleChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
    });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(isEdit){
            dispatch(updateProduct({id : productToEdit.id, product: product}));
        }else{
            dispatch(createProduct({...product, id: nanoid()}));
        }
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
                    {isEdit ? "Update Product" : "Add Product"}
                </button>
            </div>
        </form>
    </div>
  )
}

export default ProductForm