'use client'
import { signIn, signOut, useSession } from "next-auth/react";

const Appbar = () => {

    const session = useSession();
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-xl font-bold ">Blog</h1>
      </div>
      <div className="space-x-2">
        <button className="bg-blue-500 p-4">Create post</button>
        {session.data?.user ? (
          <button onClick={() => signOut()} className="bg-red-500 p-4">
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn()} className="bg-blue-500 p-4">
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default Appbar
