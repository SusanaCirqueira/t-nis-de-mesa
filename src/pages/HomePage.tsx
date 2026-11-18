import type {CSSProperties} from 'react';
import {SITE_IMAGES, SITE_INFO} from '../data/siteData';
import {SiteImage} from '../components/SiteImage';
import {ImpactoPage} from './ImpactoPage';

const HERO_HEADLINE = 'Tênis de mesa que transforma vidas em Arapongas';

let letterCounter = 0;
const HERO_CHARS = Array.from(HERO_HEADLINE).map((char) =>
  char === ' ' ? {char, index: null} : {char, index: letterCounter++}
);

const HERO_PHOTOS = [
  {
    src: SITE_IMAGES.heroPaddle,
    alt: 'Raquete e bola sobre a mesa azul de tênis de mesa',
    modifier: 'hero-photo--1',
  },
];


const SPORTS_ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: SITE_INFO.name,
  description:
    'Projeto social de tênis de mesa em Arapongas (PR): inclusão, disciplina e convivência para crianças, adolescentes, jovens e famílias.',
  sport: 'Tênis de mesa',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_INFO.address,
    addressLocality: SITE_INFO.city,
    addressRegion: SITE_INFO.state,
    addressCountry: 'BR',
  },
  areaServed: {
    '@type': 'City',
    name: SITE_INFO.city,
  },
  nonprofitStatus: 'Nonprofit',
};

export function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(SPORTS_ORG_JSON_LD)}}
      />
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-head">
            <h1 id="hero-title" className="hero-title">
              {HERO_CHARS.map((item, idx) =>
                item.index === null ? (
                  <span key={idx}> </span>
                ) : (
                  <span
                    key={idx}
                    className="hero-letter"
                    style={{'--hero-i': item.index} as CSSProperties}
                  >
                    {item.char}
                  </span>
                )
              )}
            </h1>
            <p className="hero-sub">
              Projeto social de tênis de mesa para crianças, adolescentes, jovens e famílias de
              Arapongas (PR). Aqui cada treino é também um encontro: disciplina, amizade e futuro
              na mesma mesa.
            </p>
          </div>

          <div className="hero-gallery">
            {HERO_PHOTOS.map((photo) => (
              <div key={photo.src} className={`hero-photo ${photo.modifier}`}>
                <figure className="hero-frame">
                  <SiteImage
                    src={photo.src}
                    alt={photo.alt}
                    loading="eager"
                    className="hero-img"
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactoPage />
    </>
  );
}
