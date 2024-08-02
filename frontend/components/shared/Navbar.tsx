import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthToken } from "@/data/services/get-token";

async function Navbar() {
  const user = await getAuthToken();

  return (
    <header className="h-12">
      <nav className="flex items-center justify-between px-10 py-5">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">ChatMaster</h1>
          </Link>
        </div>
        {user === undefined ? (
          <ul className="flex items-center justify-center space-x-7">
            <li>
              <Link href="/sign-in">Login</Link>
            </li>
            <li>
              <Link href="/sign-up">Register</Link>
            </li>
          </ul>
        ) : (
          <>
            <ul className="flex items-center justify-center space-x-7 max-md:hidden">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/rooms">Search Rooms</Link>
              </li>
            </ul>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-black text-white">
                      JA
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Logged in as jay</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/rooms">Search Rooms</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
