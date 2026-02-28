import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';

// Petit composant pour l'accueil
const Home = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
    <div className="w-32 h-32 bg-yellow-400 rounded-full mb-6 flex items-center justify-center text-6xl shadow-lg border-4 border-white">🐥</div>
    <h2 className="text-3xl font-black text-gray-800 mb-2">Prêt pour ton défi ?</h2>
    <p className="text-gray-500 font-bold mb-8">Chaque message te rapproche de ton objectif.</p>
    <a href="/chat" className="bg-blue-500 text-white font-black px-12 py-4 rounded-2xl border-b-4 border-blue-700 hover:bg-blue-400 transition-all uppercase tracking-widest">
      C'est parti !
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header streak={5} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;