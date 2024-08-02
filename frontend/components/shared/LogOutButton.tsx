"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logoutAction } from "@/data/actions/auth-actions";

function LogOutButton() {
  const handleLogOut = async () => {
    await logoutAction();
  };

  return <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>;
}

export default LogOutButton;
