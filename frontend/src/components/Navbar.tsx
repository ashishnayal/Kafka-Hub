"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Server, BookOpen, MessageSquare, Terminal, List } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: <Server className="w-4 h-4 mr-2" /> },
    { name: 'Learn Kafka', href: '/learn', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { name: 'Interview Prep', href: '/interview-prep', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { name: 'Workflow', href: '/workflow', icon: <List className="w-4 h-4 mr-2" /> },
    { name: 'Terminal', href: '/terminal', icon: <Terminal className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Server className="h-8 w-8 text-orange-500" />
              <span className="font-bold text-xl tracking-tight text-white">Kafka<span className="text-orange-500">Hub</span></span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-orange-500/10 text-orange-500'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
