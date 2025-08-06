import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react"; // Optional icon

export default function Microphone() {
  const [listening, setListening] = useState(false);
  const [scale, setScale] = useState(1);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      audioContextRef.current?.close();
    };
  }, []);

  const startListening = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 32;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const volume = Math.max(...dataArray) / 255;

      // Set scale between 1 (quiet) and 2 (loud)
      const newScale = 1 + volume * 1;
      setScale(newScale);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setListening(true);
  };

  const stopListening = () => {
    audioContextRef.current?.close();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setListening(false);
    setScale(1);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <button
        onClick={listening ? stopListening : startListening}
        className="relative w-20 h-20 flex items-center justify-center rounded-full  text-white focus:outline-none"
      >
        {/* Blinking circle around mic */}
        {listening && (
          <div
            className="absolute rounded-full bg-[#948dd4] opacity-50 transition-transform duration-100"
            style={{
              width: "80%",
              height: "80%",
              transform: `scale(${scale})`,
            }}
          ></div>
        )}
        {/* Mic icon (You can replace with actual icon/image) */}
        <button className=" bg-white p-4 rounded-full shadow-xl hover:scale-110 transition z-10">
          <Mic className="text-gray-700 " />
        </button>
      </button>
      <p className="mt-3 text-gray-600 z-10">
        {listening ? "Listening..." : "Tap to talk"}
      </p>
    </div>
  );
}
