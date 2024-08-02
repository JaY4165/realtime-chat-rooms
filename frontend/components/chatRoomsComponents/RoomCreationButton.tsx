"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";

function RoomCreationButton({ token }: { token: string | undefined }) {
  const inpRef = useRef<HTMLInputElement>(null);

  const handleCreate = async () => {
    try {
      const inp = inpRef.current?.value;
      await axios
        .post(
          "http://localhost:1337/api/chat-rooms",
          {
            data: {
              name: inp,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          toast("Room created");
        })
        .catch((err) => {
          toast("Error while creating room");
        })
        .finally(() => {
          inpRef.current!.value = "";
        });
    } catch (error) {
      console.error(error);
      toast("Error while creating room");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"default"}>
          <Plus className="mr-2 h-5 w-5" /> Create Room
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="pb-5">Create new room</SheetTitle>
          <SheetDescription>
            <Input
              type="text"
              placeholder="Enter room name"
              className="bg-neutral-200"
              ref={inpRef}
            />
            <Button className="mt-5 w-full" onClick={handleCreate}>
              Create
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default RoomCreationButton;
