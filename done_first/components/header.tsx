import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

const Header: NextPage = () => {
  const { user } = useUser();

  return (
    <div className="shadow-slate-400 shadow bg-gradient-to-r from-teal-200 via-cyan-300 to-emerald-300 flex flex-row justify-between font-raleway ">
      <div className="flex gap-20 w-2/3">
        <Link href="/">
          <a className="text-black ml-4 hover:scale-105 text-xl no-underline">
            Done.
          </a>
        </Link>
        <Link href="/home">
          <a className="text-black  hover:scale-105 text-xl no-underline">
            Home
          </a>
        </Link>
      </div>

      <div>
        {user && (
          <Link href="/api/auth/logout">
            <a className="text-black mr-4 hover:scale-125 no-underline">
              Sign Out{" "}
            </a>
          </Link>
        )}
        {!user && (
          <Link href="/api/auth/login ">
            <a className="text-black hover:scale-125 mr-6 no-underline">
              Sign In{" "}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
