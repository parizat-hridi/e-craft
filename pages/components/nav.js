import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';

const Nav = () => {
  const [user, setUser] = useState(supabase.auth.user());
  const router = useRouter();

  const handleLogOut = async e => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/signin');
      setUser(null);
    }
  };
  useEffect(() => {
    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);
      } else {
        router.push('/signin');
      }
    };

    getProfile();
  }, []);

  return (
    <>
      <nav className="flex py-4 px-6 bg-gray-800 text-white font-semibold text-xl">
        <Link href="/">
          <a>Home</a>
        </Link>
        {!!user && (
          <>
            <Link href="/createProduct">
              <a className="ml-5">Create Product</a>
            </Link>
            <Link href="/myProducts">
              <a className="ml-5">My Products</a>
            </Link>
          </>
        )}

        <div className="ml-auto">
          {!user ? (
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          ) : (
            <>
              <button className="" onClick={handleLogOut}>
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
