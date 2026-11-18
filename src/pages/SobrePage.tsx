import {Clock, HeartHandshake, MapPin, Users} from 'lucide-react';
import {SectionHeading} from '../components/SectionHeading';
import {SiteImage} from '../components/SiteImage';
import {SITE_INFO, TESTIMONIALS} from '../data/siteData';

const ABOUT_FACTS = [
  {
    icon: MapPin,
    label: 'Onde acontece',
    value: `${SITE_INFO.partnerSpace}, em ${SITE_INFO.city} (${SITE_INFO.state})`,
  },
  {
    icon: Clock,
    label: 'Quando',
    value: SITE_INFO.schedule,
  },
  {
    icon: Users,
    label: 'Para quem',
    value: 'Crianças, adolescentes, jovens e famílias',
  },
  {
    icon: HeartHandshake,
    label: 'Como se mantém',
    value: 'Projeto social sem fins lucrativos',
  },
];

export function SobrePage() {
  return (
    <>
      <section
        id="sobre"
        aria-labelledby="sobre-title"
        className="border-t border-black/[0.06] pt-7 pb-[clamp(3.5rem,6vw,7rem)] sm:pt-10 lg:pt-12"
      >
        <div className="container-page">
          <div className="mx-auto max-w-[780px] text-center">
            <SectionHeading
              id="sobre-title"
              align="center"
              eyebrow="Sobre o projeto"
              title="Uma mesa aberta para toda a comunidade"
              lead={`O ${SITE_INFO.name} é uma iniciativa social sem fins lucrativos que usa o tênis de mesa como ferramenta de inclusão, disciplina e convivência em ${SITE_INFO.city} (${SITE_INFO.state}).`}
            />
            <p className="mx-auto mt-4 max-w-[62ch] text-[clamp(0.95rem,0.92rem+0.2vw,1.05rem)] leading-[1.65] text-[#3f3f3f]">
              Nosso ponto de partida é simples: uma mesa, uma raquete e alguém disposto a ensinar. A
              partir disso, crianças, adolescentes, jovens e famílias encontram um lugar seguro para
              praticar esporte, fazer amigos e descobrir do que são capazes — com ou sem experiência
              prévia.
            </p>
            <p className="mx-auto mt-3 max-w-[62ch] text-[clamp(0.95rem,0.92rem+0.2vw,1.05rem)] leading-[1.65] text-[#3f3f3f]">
              O projeto existe porque acredita que esporte é educação. Cada treino trabalha foco,
              respeito às regras, cuidado com o próximo e a alegria de jogar junto. Quem começa por
              curiosidade costuma ficar pela convivência.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {ABOUT_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="flex h-full flex-col rounded-2xl border border-black/10 bg-[#FAFCFE] p-4 transition-colors hover:border-brand-deep/40 sm:p-5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E9F6FD] text-brand-deep sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <dt className="mt-3.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-neutral-500 sm:mt-4 sm:text-[11px]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-heading text-[0.83rem] font-bold leading-snug text-ink sm:text-[0.95rem]">
                    {fact.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section
        id="depoimentos"
        aria-labelledby="depoimentos-title"
        className="border-t border-black/[0.06] pt-[clamp(3.5rem,6vw,7rem)] pb-5 sm:pb-7"
      >
        <div className="container-page">
          <SectionHeading
            id="depoimentos-title"
            align="center"
            eyebrow="Depoimentos"
            title="Histórias de quem vive a mesa"
            lead="Relatos de famílias, participantes e voluntários que constroem o projeto todos os dias."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure key={item.name} className="card-soft flex h-full flex-col p-6">
                {item.actionPhoto ? (
                  <div className="mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-[#E9F6FD]">
                    <SiteImage
                      src={item.actionPhoto}
                      alt={item.actionAlt || `${item.name} jogando tênis de mesa`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : null}
                <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-neutral-700">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5 border-t border-black/[0.08] pt-3.5">
                  <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                    <SiteImage
                      src={item.photo}
                      alt={`Retrato de ${item.name}`}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-heading text-[0.84rem] font-bold leading-tight text-ink">
                      {item.name}
                    </span>
                    <span className="block text-[0.72rem] leading-snug text-neutral-500">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
