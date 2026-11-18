import type {ComponentType} from 'react';
import {CalendarDays, Home, Info, MessageCircle} from 'lucide-react';
import {NAV_ITEMS} from '../data/siteData';
import {Link, useRouter} from '../lib/router';

const ROUTE_ICONS: Record<string, ComponentType<{className?: string; 'aria-hidden'?: boolean}>> = {
  '/': Home,
  '/sobre': Info,
  '/como-funciona': CalendarDays,
  '/contato': MessageCircle,
};

function resolveActiveTab(pathname: string): string {
  if (pathname === '/impacto') return '/';
  if (pathname === '/galeria') return '/sobre';
  if (pathname === '/participar') return '/como-funciona';
  return pathname;
}

export function Footer() {
  const {pathname} = useRouter();
  const activeTab = resolveActiveTab(pathname);

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <nav
        aria-label="Navegação entre páginas"
        className="mx-auto grid h-16 max-w-2xl grid-cols-4 items-center gap-1 px-2 sm:px-4"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = ROUTE_ICONS[item.to] || Home;
          const active = activeTab === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition-colors ${
                active ? 'text-ink' : 'text-neutral-500 hover:text-ink'
              }`}
            >
              <span
                className={`grid h-7 w-11 place-items-center rounded-full transition-colors ${
                  active ? 'bg-brand text-ink' : 'bg-transparent'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden={true} />
              </span>
              <span
                className={`whitespace-nowrap text-[11px] leading-tight tracking-tight ${
                  active ? 'font-bold text-ink' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
