import { supabase } from '../utils/supabase';
import Nav from './components/nav';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data: products } = await supabase.from('products').select('*');
    setProducts(products);
  };

  return (
    <>
      <Nav />
      <div className="h-screen bg-gray-800">
        <div className="h-auto text-white bg-gray-800 flex pt-8 grid grid-cols-4 gap-4">
          {products.map(product => (
            <>
              <div className="mb-5 ml-5" key={product.id}>
                <Image
                  src={product.image}
                  width={250}
                  height={250}
                  alt="picture"
                />
                <h1>Product: {product.name}</h1>
                <p>Price: ${product.price}</p>
                <p>Seller Email: {product.seller_email}</p>
                <button className="mt-2 text-lg text-white font-semibold bg-green-500 py-2 px-2 rounded-md focus:outline-none focus:ring-2">
                  Buy Now
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
