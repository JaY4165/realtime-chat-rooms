"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { getUserDetails } from "@/data/services/get-token";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = { room: any; token: string | undefined };

function RoomCard({ room, token }: Props) {
  const router = useRouter();
  const joinRoom = async () => {
    try {
      const user = await getUserDetails();
      const userData = {
        data: {
          users: {
            connect: [
              {
                id: user?.userId,
                position: {
                  end: true,
                },
              },
            ],
          },
        },
      };
      await axios
        .put(
          `http://localhost:1337/api/chat-rooms/${room.id}`,
          {
            ...userData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          toast("Joined into room successfully");
          const roomId = Number(room.id);
          router.push(`/room/${roomId}`);
        })
        .catch(() => {
          toast("Error while joining room");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="bg-neutral-100">
      <CardHeader>
        <CardTitle className="text-center">{room.attributes.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="pb-3">Room Id : {room.id}</p>
        <Button variant={"outline"} onClick={joinRoom}>
          Join
        </Button>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
