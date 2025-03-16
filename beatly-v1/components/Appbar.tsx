"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; // Client-side session hook

export default function Appbar() {
    const { data: session } = useSession(); // Get session client-side

    return (
        <div className="flex justify-between items-center p-2 text-bold bg-amber-400">
            <div className="text-green-800 text-3xl font-extrabold">Beatly</div>
            <div>
                {session ? (
                    <button
                        className="m-2 px-4 py-2 bg-green-500 hover:cursor-pointer rounded-md"
                        onClick={() => signOut()} // ✅ Function is now invoked
                    >
                        Sign Out
                    </button>
                ) : (
                    <button
                        className="m-2 px-4 py-2 bg-green-500 hover:cursor-pointer rounded-md"
                        onClick={() => signIn()} // ✅ Function is now invoked
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
}
