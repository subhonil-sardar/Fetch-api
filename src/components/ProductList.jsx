import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { deleteProduct, fetchProducts } from '../features/products/productSlice';
import './style.css'

const ProductList = ({onHandleSetProductToEdit}) => {
    const {products, isLoading, error} = useSelector(state =>state.productR);
    console.log(products)
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(fetchProducts());
    },[dispatch]);

    const handleEdit = (product) =>{
        onHandleSetProductToEdit(product);
    }

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && products && products.length> 0 && 
        <section className='products'>
            {
                     products.map((product) =>{
                        return <div key={product.id} className='product'>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <strong>Category :{product.category}</strong> <br /> <br />
                            <strong>Price :{product.price}</strong> <br /> <br />
                            <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
                            <button onClick={() => handleEdit(product)}>Edit</button>
                        </div>
                    })
            }
        </section>
        }
    </div>
  )
}

export default ProductList

//npx json-server -p 3003 -w database/db.json