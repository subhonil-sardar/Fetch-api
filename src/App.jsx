import React, { useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'


const App = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const handleSetProductToEdit = (product) => {
    setProductToEdit(product);
    setIsEdit(true);
  }
  return (
    <div>
      <ProductForm productToEdit={productToEdit} isEdit={isEdit}/>
      <ProductList onHandleSetProductToEdit={handleSetProductToEdit} />
    </div>
  )
}

export default App