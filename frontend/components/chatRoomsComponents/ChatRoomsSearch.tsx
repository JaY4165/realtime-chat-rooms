"use client";

import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { useDebounce } from "@/hooks/Debounce";
import RoomCard from "./RoomCard";

function ChatRoomsSearch({ token }: { token: string | undefined }) {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [rooms, setRooms] = React.useState([]);
  const debouncedValue = useDebounce(searchTerm, 500);

  const search = async () => {
    try {
      const url =
        debouncedValue !== ""
          ? `http://localhost:1337/api/chat-rooms/${debouncedValue}`
          : `http://localhost:1337/api/chat-rooms`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data.data)) setRooms(response.data.data);
      else setRooms([]);
    } catch (err) {
      console.log("Error fetching rooms");
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    search();
  };

  useEffect(() => {
    search();
  }, [debouncedValue]);

  return (
    <section className="">
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for chat rooms with id..."
          className="w-full rounded-lg bg-neutral-200 pl-8"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-flow-row gap-10 pt-10 md:grid-cols-4">
        {!rooms ? (
          <div className="text-center">No rooms found</div>
        ) : (
          rooms.map((room: any) => (
            <RoomCard key={room.id} room={room} token={token} />
          ))
        )}
      </div>
    </section>
  );
}

export default ChatRoomsSearch;
