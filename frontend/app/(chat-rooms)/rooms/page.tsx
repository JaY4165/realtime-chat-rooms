import ChatRoomsSearch from "@/components/chatRoomsComponents/ChatRoomsSearch";
import RoomCreationButton from "@/components/chatRoomsComponents/RoomCreationButton";
import { getAuthToken } from "@/data/services/get-token";

import React from "react";

async function ChatRooms() {
  const token: string | undefined = await getAuthToken();


  
  return (
    <div className="mt-10 px-10">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-center text-xl font-bold">Search Chat Rooms</h1>
        <RoomCreationButton token={token} />
      </div>
      <ChatRoomsSearch token={token} />
    </div>
  );
}

export default ChatRooms;
