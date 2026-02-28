import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/ChatMessage';
import ProgressBar from '../components/ProgressBar';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Bonjour Odon ! Prêt pour ta leçon ?", isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(10);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isAi: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/ask?prompt=${encodeURIComponent(input)}`);
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reponse, isAi: true }]);
      setProgress((prev) => Math.min(prev + 10, 100));
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Le serveur est éteint... 🔌", isAi: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]"> {/* Ajuste la hauteur selon ton header */}
      <ProgressBar progress={progress} />
      
      {/* Zone de défilement des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full max-w-2xl mx-auto flex flex-col">
        {messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg} />
        ))}
        {isTyping && <div className="text-gray-400 font-bold ml-12 animate-pulse">L'IA réfléchit...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Barre d'input */}
      <footer className="p-4 border-t-2 border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input 
            className="flex-1 bg-gray-100 border-2 border-gray-200 rounded-2xl px-4 py-3 font-bold focus:border-blue-400 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Répondre..."
          />
          <button 
            onClick={handleSend}
            className="bg-green-500 text-white font-black px-6 py-3 rounded-2xl border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all uppercase"
          >
            Vérifier
          </button>
        </div>
      </footer>
    </div>
  );
}