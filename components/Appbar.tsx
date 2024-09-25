'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const Appbar = () => {

    const session = useSession();
  return (
    <div className="flex w-full border-b border-gray-900 justify-between items-center p-4">
      <div>
        <Link href="/" className="text-4xl font-bold">
          Blog
        </Link>
      </div>
      <div className="space-x-2 text-lg ">
        <Link href="/create">
          <Button
            variant={"default"}
            className=" font-semibold rounded-lg  p-4 "
          >
            Create post
          </Button>
        </Link>
        {session.data?.user ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </div>
    </div>
  );
}

export default Appbar
