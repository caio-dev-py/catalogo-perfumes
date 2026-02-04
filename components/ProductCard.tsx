'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume_ml: number;
  short_description: string;
  image_url?: string;
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  volume_ml,
  short_description,
  image_url,
}: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55';
  const message = `Olá! Tenho interesse no perfume ${name} (${volume_ml}ml) da marca ${brand} — preço: R$ ${price.toFixed(2)}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      
      {/* Área da Imagem - Agora clicável para detalhes */}
      <Link href={`/catalogo/${id}`} className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50/30 block" aria-label={`Ver detalhes de ${name}`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10" />
        
        {image_url ? (
          <Image
            src={image_url}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl block mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-500">🧴</span>
              <p className="text-xs font-medium text-amber-900/40 uppercase tracking-tighter">Imagem não disponível</p>
            </div>
          </div>
        )}
      </Link>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand & Badge Row */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">
            {brand}
          </span>
        </div>

        {/* Title */}
        <Link href={`/catalogo/${id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
            {name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {short_description}
        </p>

        {/* Info Box */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100/50">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Volume</p>
            <p className="text-sm font-bold text-gray-700">{volume_ml}ml</p>
          </div>
          <div className="h-8 w-[1px] bg-gray-200" />
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Preço</p>
            <p className="text-lg font-black text-amber-900">
              R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Botões - Fixos no rodapé do card */}
        <div className="grid gap-2 mt-auto">
          <Link href={`/catalogo/${id}`} className="w-full">
            <button className="w-full text-gray-600 text-sm font-bold py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95">
              DETALHES
            </button>
          </Link>
          
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Comprar pelo WhatsApp"
            className="w-full"
          >
            <button className="w-full bg-amber-900 text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-amber-900/20 hover:bg-amber-800 hover:shadow-amber-900/40 transition-all active:scale-95 flex items-center justify-center gap-2">
              COMPRAR AGORA
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}