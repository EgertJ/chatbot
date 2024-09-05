"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useChat } from "ai/react";

import { SendIcon, SpeakerIcon } from "./icons";
const ChatBox: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const speakMessage = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <div key={index} className="flex flex-col space-y-2">
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
      </div>
    ));
  }, [messages]);

  return (
    <div className="relative flex flex-col flex-grow">
      <ScrollShadow
        ref={chatContainerRef}
        aria-label="Suhtlusaken"
        aria-live="polite"
        className="flex-grow p-4 bg-white pt-10 pb-10 h-[200px]"
        role="region"
        size={12}
      >
        <div className="flex flex-col space-y-4">{renderedMessages}</div>
      </ScrollShadow>
      <form
        className="p-4 border-t border-gray-200 flex items-center gap-6"
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
        />
        <Button
          isIconOnly
          aria-label="Send message"
          className="bg-white"
          size="lg"
          type="submit"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  );
};

ChatBox.displayName = "ChatBox";

export default ChatBox;
