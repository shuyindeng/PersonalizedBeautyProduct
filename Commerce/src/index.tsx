import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductView from './App';
import { getProducts } from './products';
import reportWebVitals from './reportWebVitals';

async function main() {
  const products = await getProducts();

  console.log(products);
  ReactDOM.render(
    <React.StrictMode>
      <ProductView products={products} />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
main();
