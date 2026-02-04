'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Elementos Decorativos Sutis */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand - Ocupa 5 colunas no desk */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-500">🧴</span>
              <span className="font-bold text-xl tracking-[0.2em] text-white">
                PERFUMES <span className="font-light text-amber-500">PREMIUM</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm text-sm">
              Curadoria exclusiva das fragrâncias mais sofisticadas do mundo. 
              Elevando sua presença através do aroma desde 2020.
            </p>
          </div>

          {/* Links - Ocupa 3 colunas */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-amber-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social - Ocupa 4 colunas */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Contato & Redes</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="hover:text-amber-500 transition-colors cursor-pointer">contato@perfumespremium.com.br</p>
              <p>São Paulo, SP — Brasil</p>
            </div>
            
            <div className="flex space-x-4 pt-2">
              {['Instagram', 'WhatsApp', 'Facebook'].map((social) => (
                <button
                  key={social}
                  className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-gray-600 uppercase tracking-widest">
            © {currentYear} Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-8">
            <Link href="#" className="text-[11px] text-gray-600 uppercase tracking-widest hover:text-amber-500 transition-colors">
              Privacidade
            </Link>
            <Link href="#" className="text-[11px] text-gray-600 uppercase tracking-widest hover:text-amber-500 transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}