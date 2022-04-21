import Link from 'next/link';
import { supabase } from '../../utils/supabase';

const Nav = () => {
  const user = supabase.auth.user();

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
          <Link href="/signin">
            <a>Logout</a>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
