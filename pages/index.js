import { supabase } from '../utils/supabase';
import Nav from './components/nav';
import Image from 'next/image';

export default function Home({ products }) {
  console.log({ products });

  return (
    <>
      <Nav />
      <div className="h-auto text-white bg-gray-800 flex pt-8 grid grid-cols-4 gap-4">
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
              <button className="mt-2 text-lg text-white font-semibold bg-green-500 py-2 px-2 rounded-md focus:outline-none focus:ring-2">
                Buy Now
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const { data: products } = await supabase.from('products').select('*');

  return {
    props: {
      products,
    },
  };
};
