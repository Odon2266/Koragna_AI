export default function ChatMessage({ msg }) {
  if (!msg) return null; // Sécurité si msg est vide

  return (
    <div className={`flex items-end gap-3 w-full ${msg.isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      {msg.isAi && (
        <div className="w-10 h-10 bg-green-400 rounded-xl border-2 border-green-500 flex items-center justify-center flex-shrink-0">
           <span className="text-xl">🦉</span>
        </div>
      )}
      <div className={`p-4 rounded-2xl text-lg font-bold border-2 max-w-[80%] min-w-[50px] shadow-sm break-words
        ${msg.isAi 
          ? 'bg-white border-gray-200 rounded-bl-none text-gray-600' 
          : 'bg-blue-500 border-blue-600 text-white rounded-br-none'}`}>
        {msg.text}
      </div>
    </div>
  );
}