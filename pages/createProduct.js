import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import Nav from './components/nav';

const CreateProduct = () => {
  const router = useRouter();
  const user = supabase.auth.user();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleCreate = async e => {
    e.preventDefault();

    const { error } = await supabase.from('products').insert({
      name: name,
      price: price,
      image: image,
      seller_email: user.email,
      user_id: user.id,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <Nav />
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold text-center text-white">
            Create your product
          </h1>

          <form className="flex flex-col" onSubmit={handleCreate}>
            <label className="text-gray-200">Name</label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <label className="mt-6 text-gray-200">Price</label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="text"
              id="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <label className="mt-6 text-gray-200">Image URL</label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="text"
              id="text"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <button
              className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
