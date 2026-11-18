import {useEffect, useState} from 'react';
import {Clock, Instagram, Mail, MapPin, Menu, MessageCircle, X} from 'lucide-react';
import {SITE_IMAGES, SITE_INFO} from '../data/siteData';
import {Link, useRouter} from '../lib/router';
import {SiteImage} from './SiteImage';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {pathname} = useRouter();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.07] bg-white/90 backdrop-blur-md">
        <div className="container-page flex h-14 items-center justify-between gap-3 lg:h-16">
          <Link
            to="/"
            aria-label={`${SITE_INFO.name} — página inicial`}
            className="flex min-w-0 items-center gap-2.5 rounded-lg"
          >
            <SiteImage
              src={SITE_IMAGES.logo}
              alt=""
              loading="eager"
              className="h-9 w-9 shrink-0 rounded-full object-contain sm:h-10 sm:w-10"
            />
            <span className="truncate font-heading text-[0.9rem] font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-[0.95rem]">
              {SITE_INFO.name}
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {SITE_INFO.city} · {SITE_INFO.state}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-black/10 text-ink transition-colors hover:bg-neutral-100"
            aria-label="Abrir menu do projeto"
            aria-expanded={menuOpen}
            aria-controls="menu-projeto"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="menu-projeto"
          role="dialog"
          aria-modal="true"
          aria-label="Informações e contatos do projeto"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[60] flex items-start justify-end bg-black/50 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[90dvh] w-3/4 flex-col overflow-hidden rounded-bl-3xl border-b border-l border-white/10 bg-ink text-white shadow-2xl"
          >
            <div className="flex h-[60px] items-center justify-between border-b border-white/10 px-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-0.5">
                  <SiteImage
                    src={SITE_IMAGES.logo}
                    alt=""
                    loading="eager"
                    className="h-full w-full rounded-full object-contain"
                  />
                </span>
                <span className="truncate font-heading text-[0.9rem] font-extrabold leading-tight">
                  {SITE_INFO.name}
                  <span className="mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/50">
                    {SITE_INFO.city} · {SITE_INFO.state}
                  </span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10"
                aria-label="Fechar menu"
              >
                <X className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
              <div>
                <p className="text-[0.875rem] leading-relaxed text-white/80">
                  Projeto social de tênis de mesa em {SITE_INFO.city} ({SITE_INFO.state}).
                  Esporte, educação e convivência para crianças, adolescentes, jovens e famílias.
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-white/75">
                  <MapPin className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
                  <span>
                    Feito em {SITE_INFO.city}, {SITE_INFO.state}
                  </span>
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h2 className="font-heading text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Onde e quando
                </h2>
                <dl className="mt-3 space-y-2.5 text-[0.84rem] leading-snug text-white/80">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Endereço</dt>
                      <dd>{SITE_INFO.address}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Horários</dt>
                      <dd>{SITE_INFO.schedule}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h2 className="font-heading text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Fale com a gente
                </h2>
                <ul className="mt-3 space-y-2.5">
                  <li>
                    <a
                      href={SITE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/15 px-3.5 text-[0.84rem] font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span>WhatsApp {SITE_INFO.whatsapp}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE_INFO.instagramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/15 px-3.5 text-[0.84rem] font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Instagram className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span>{SITE_INFO.instagram}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/15 px-3.5 text-[0.84rem] font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span className="truncate">{SITE_INFO.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
