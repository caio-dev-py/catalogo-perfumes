'use client';

import { ReactNode } from 'react';

export function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen sm:min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-20 sm:pt-24 md:pt-0">
      
      {/* Background Layer: Gradiente Profundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-[#120d07] to-black">
        
        {/* Grão de Filme (Texture Overlay) - O toque de luxo */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        {/* Blobs Amaciados e Lentos - Responsivos */}
        <div className="absolute -top-20 sm:-top-24 -left-20 sm:-left-24 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-700/20 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 sm:-right-24 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-yellow-600/10 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[100px] animate-blob transition-all duration-1000"></div>
        
        {/* Glow Central Atrás do Conteúdo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-amber-900/10 to-transparent opacity-50"></div>
      </div>

      {/* Overlay de Vinheta para focar o olhar no centro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

      {/* Linhas Elegantes Estáticas (menos movimento = mais classe) */}
      <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-amber-200 to-transparent"></div>
        <div className="hidden sm:block w-[1px] h-full bg-gradient-to-b from-transparent via-amber-200 to-transparent"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-amber-200 to-transparent"></div>
      </div>

      {/* Conteúdo com Animação de Entrada Suave */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          {children}
        </div>
      </div>

      {/* Indicador de Scroll - Oculto em mobile */}
      <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-200 font-light">Descubra</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-200 to-transparent"></div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}