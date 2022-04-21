import { supabase } from '../utils/supabase';
import Nav from './components/nav';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MyProducts = () => {
  const user = supabase.auth.user();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    let { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id);
    setProducts(products);
  };

  return (
    <>
      <Nav />
      {!!products.length > 0 ? (
        <>
          <div className="h-screen text-white bg-gray-800 grid grid-cols-4 gap-4 pt-8 ">
            {products.map(product => (
              <>
                <div className="mb-5 ml-5">
                  <Image
                    src={product.image}
                    width={250}
                    height={250}
                    alt="picture"
                  />
                  <h1 key={product.id}>Product: {product.name}</h1>
                  <p>Price: ${product.price}</p>
                  <p>Seller Email: {product.seller_email}</p>
                </div>
              </>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="h-screen flex flex-col items-center justify-center bg-gray-800">
            <h1 className="text-white text-3xl">
              Sorry, No product found! Please create your product
            </h1>
            <br />
            <div
              className="
              mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            >
              <Link href="/createProduct">
                <a>Create Product </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyProducts;
