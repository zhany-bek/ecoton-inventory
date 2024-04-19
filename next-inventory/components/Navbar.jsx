"use client"

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { signOut } from "firebase/auth";
import { sign } from "crypto";

const Navbar = () => {
  // Define user auth state:
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className="flex gap-2">
        <Image
          src="/assets/images/Ecoton-logo.svg"
          width={100}
          height={100}
          alt="Ecoton Logo"
          className="object-contain"
        />
      </Link>

      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/products" className="black_btn">
              View Products
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut(auth);
                sessionStorage.removeItem("user");
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <Link href="/sign-in" className="outline_btn">
              Sign in
            </Link>
          </div>
        )}
      </div>

    </nav>
  )
}

export default Navbar
