// import { Mic } from "lucide-react";
import Microphone from "./components/Microphone";
import ChatContainer from "./components/ChatContainer";

export default function AiListener() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex">
      {/* Left or Center area (Avatar / Animation) */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Avatar or animation placeholder */}
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 shadow-lg flex items-center justify-center text-white text-xl font-semibold">
          AI Friend
        </div>

        {/* Microphone button */}
        <div className="absolute bottom-9">
          <Microphone />
        </div>
        {/* <button className="absolute bottom-6 bg-white p-4 rounded-full shadow-xl hover:scale-110 transition">
          <Mic className="text-gray-700" />
        </button> */}
      </div>

      {/* Chatbox Panel */}
      <ChatContainer></ChatContainer>
    </div>
  );
}
