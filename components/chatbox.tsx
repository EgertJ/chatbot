"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useChat } from "ai/react";

import { SendIcon, SpeakerIcon } from "./icons";
const ChatBox: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  //Speak bot message
  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  //Scroll to bottom after new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //Message list
  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <article key={index} className="flex flex-col space-y-2">
        <div
          className={`text-sm text-gray-500 flex items-center ${
            message.role === "user" ? "justify-end" : "justify-start"
          } `}
        >
          {message.role === "user" ? null : (
            <Avatar
              aria-label="Juturoboti pilt"
              className="mr-2"
              size="sm"
              src="/bot-image.jpg"
            />
          )}

          <span className="font-semibold">
            {message.role === "user" ? "Mina" : "Juturobot"}
          </span>
          <span className="mx-1">•</span>
          <span>{message.createdAt?.toLocaleTimeString()}</span>
        </div>
        <div
          aria-live="polite"
          className={`p-3 rounded-lg ${
            message.role === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-gray-900 self-start"
          } max-w-[75%] break-words`}
        >
          {message.content}
        </div>
        {message.role === "assistant" && (
          <div className="self-start mt-1">
            <Button
              isIconOnly
              aria-label="Kuula teksti"
              className="bg-white rounded"
              size="sm"
              onClick={() => speakMessage(message.content)}
            >
              <SpeakerIcon />
            </Button>
          </div>
        )}
      </article>
    ));
  }, [messages]);

  return (
    <div className="relative flex flex-col flex-grow">
      <ScrollShadow
        ref={chatContainerRef}
        aria-label="Suhtlusaken"
        className="flex-grow p-4 bg-white pt-10 pb-10 h-[200px]"
        role="region"
        size={12}
      >
        <div className="flex flex-col space-y-4">{renderedMessages}</div>
        {error && (
          <div className="text-red-500">
            {" "}
            Tekkis viga, proovige uuesti:
            {error.message}
          </div>
        )}
      </ScrollShadow>
      <form
        className="p-4  border-gray-200 flex items-center gap-6"
        onSubmit={handleSubmit}
      >
        <Textarea
          fullWidth
          isRequired
          color="default"
          label="Sõnum"
          minRows={1}
          placeholder="Sisesta sõnum..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <Button
          isIconOnly
          aria-label="Saada sõnum"
          className="bg-white"
          size="lg"
          type="submit"
          disabled={isLoading}
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  );
};

ChatBox.displayName = "ChatBox";

export default ChatBox;
