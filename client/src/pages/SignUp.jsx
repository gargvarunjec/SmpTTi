import React from "react";
import {Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Signup</h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="username"
          className="border rounded-lg p-3"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border rounded-lg p-3"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-3"
          id="password"
        />
        <button className="bg-slate-700 rounded-lg p-3 border text-white uppercase hover:opacity-95 disabled:opacity-80">
          signup
        </button>
      </form>
      <div className="mt-3">
        Have an account?
        <Link to={"/sign-in"}>
        <span className="text-blue-700"> Sign in </span>
        </Link>
      </div>
    </div>
  );
}
