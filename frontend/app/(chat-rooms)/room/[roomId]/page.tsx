"use client";

import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  KeyboardEvent,
  useRef,
} from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DoorOpenIcon } from "lucide-react";
import socket from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { getUserDetails } from "@/data/services/get-token";
import { cn } from "@/lib/utils";

function Room() {
  const params = useParams();
  const router = useRouter();
  const roomId = Number(params.roomId);
  const [messages, setMessages] = useState<
    | { content: string; senderId: any; roomId: any; userName: string }[]
    | []
    | any
  >([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    getUserDetails().then((res): any => [setUserData({ ...res })]);
  }, []);

  useEffect(() => {
    if (userData) {
      socket.emit("joinRoom", {
        userId: userData?.userId,
        roomId,
        userName: userData?.username,
      });
    }

    socket.on(
      "message",
      (newMessage: {
        content: string;
        senderId: any;
        roomId: any;
        userName: string;
      }) => {
        if (!newMessage.userName) {
          setMessages(
            (
              prevMessages: {
                content: string;
                senderId: any;
                roomId: any;
                userName: string;
              }[],
            ) => [...prevMessages],
          );
        }

        setMessages(
          (
            prevMessages: {
              content: string;
              senderId: any;
              roomId: any;
              userName: string;
            }[],
          ) => [...prevMessages, newMessage],
        );
      },
    );

    socket.on("activeUsers", (users: string[]) => {
      setActiveUsers(users);
    });

    return () => {
      socket.emit("leave", { userId: userData?.userId, roomId });
      socket.off("message");
      socket.off("activeUsers");
    };
  }, [roomId, userData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", {
        roomId,
        content: message,
        senderId: userData?.userId,
        userName: userData?.username,
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (message.trim()) {
        socket.emit("sendMessage", {
          roomId,
          content: message,
          senderId: userData?.userId,
          userName: userData?.username,
        });
        setMessage("");
      }
    }
  };

  const leaveRoom = () => {
    socket.emit("leave", { userId: userData?.userId, roomId });
    router.push("/rooms");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("activeUsers", (users: string[]) => {
      setActiveUsers(users);
    });
  }, [messages, socket]);

  return (
    <div className="grid h-full w-full grid-cols-12 gap-5 p-10">
      <Card className="col-span-4 h-[calc(100vh-80px)] space-y-4 bg-neutral-200 p-5">
        <div>
          <h1 className="text-start text-2xl font-bold">Active Users</h1>
        </div>
        <ScrollArea className="h-full w-full">
          {activeUsers.map((user, index) => (
            <Card key={index} className="mb-4 p-2">
              <div className="relative flex items-center justify-start gap-4">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-black uppercase text-white">
                      {(user as string)?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="right- relative bottom-3 left-7 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-400"></span>
                  </span>
                </div>
                <p className="text-center text-sm">{user}</p>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </Card>
      <Card className="col-span-8 flex h-[calc(100vh-80px)] flex-col bg-neutral-200">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-center text-2xl font-bold">Chat</h1>
          <div className="flex items-center space-x-4">
            <Button size={"sm"} variant={"destructive"} onClick={leaveRoom}>
              Leave
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll px-3">
          <ScrollArea>
            {messages &&
              messages.map((msg: any, index: any) => (
                <div
                  key={index}
                  ref={messagesEndRef}
                  className={cn(
                    `mb-4 flex items-center space-x-4 p-2`,
                    `${
                      msg.senderId === undefined
                        ? `justify-start`
                        : "justify-end"
                    }`,
                  )}
                >
                  <div
                    className={`relative ${
                      msg.senderId !== userData?.userId ? "order-1" : "order-2"
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-black uppercase text-white">
                        {(msg?.userName as string)?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div
                    className={`flex flex-col ${
                      msg.senderId !== userData?.userId ? "order-2" : "order-1"
                    }`}
                  >
                    <h1 className="text-xl font-bold">{msg.userName}</h1>
                    <p
                      className={`text-sm ${
                        msg.senderId !== userData?.userId
                          ? "bg-gray-200"
                          : "bg-blue-200"
                      } rounded-md p-2`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
          </ScrollArea>
        </div>
        <div className="p-5">
          <div className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={handleInputChange}
              className="flex-1 rounded-lg bg-white p-2"
              onKeyDown={handleKeyPress}
            />
            <Button size={"sm"} variant={"default"} onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Room;
