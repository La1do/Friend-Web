import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
type Message = {
  role: "user" | "ai";
  content: string;
};
export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll xuống cuối khi messages thay đổi
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // TODO: call AI API here and update messages with AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Mình đang lắng nghe bạn nè..." },
      ]);
    }, 800);
  };

  return (
    <div className="w-full sm:w-[400px] bg-white border-l border-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b text-lg font-semibold">Tâm sự cùng AI</div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-100 self-end ml-auto"
                : "bg-gray-100 self-start"
            }`}
          >
            {msg.content}
            <div ref={bottomRef} />
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none"
          placeholder="Nói gì đó với AI..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
