import { Avatar } from "@nextui-org/avatar";
import { Suspense } from "react";

import ChatBox from "@/components/chatbox";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen max-h-10 p-10 rounded-lg ">
      <div className="flex flex-col flex-grow bg-primary rounded-lg shadow-md">
        <div className="flex items-center gap-3 p-4  border-gray-200">
          <Avatar src="/bot-image.jpg" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-white">Juturobot</p>
            <p className="text-xs text-white">Sinu personaalne assistent</p>
          </div>
        </div>
        <Suspense fallback={<div>Laen jutukasti...</div>}>
          <ChatBox />
        </Suspense>
      </div>
    </section>
  );
}
