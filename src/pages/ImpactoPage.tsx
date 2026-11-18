import {Clock, School, Users, UsersRound} from 'lucide-react';
import {SectionHeading} from '../components/SectionHeading';
import {SITE_INFO} from '../data/siteData';

const METRICS = [
  {icon: Users, value: SITE_INFO.participants, label: 'Participantes atendidos'},
  {icon: School, value: SITE_INFO.schools, label: 'Escolas e parceiros locais'},
  {icon: Clock, value: SITE_INFO.weeklyHours, label: 'Horas de atividade por semana'},
  {icon: UsersRound, value: SITE_INFO.volunteers, label: 'Voluntários envolvidos'},
];

const PILLARS = [
  {
    title: 'Social',
    text: 'Acolhimento, inclusão e novas amizades para todos ao redor da mesa. Cada encontro aproxima crianças, jovens e famílias em um ambiente seguro, gratuito e aberto à comunidade.',
  },
  {
    title: 'Educacional',
    text: 'Disciplina, foco, trabalho em equipe e respeito que vão além dos treinos. O esporte caminha junto com a rotina escolar para fortalecer a concentração, a autonomia e a convivência no dia a dia.',
  },
  {
    title: 'Esportivo',
    text: 'Aprendizado dos fundamentos, evolução técnica constante e vivência em partidas e torneios. Quem começa do zero ganha confiança passo a passo, com orientação de perto dos voluntários.',
  },
];

export function ImpactoPage() {
  return (
    <section
      id="impacto"
      aria-labelledby="impacto-title"
      className="border-t border-black/[0.06] bg-white pt-[clamp(2.75rem,5vw,4.75rem)] pb-6 sm:pb-8"
    >
      <div className="container-page">
        <SectionHeading
          id="impacto-title"
          tone="light"
          align="center"
          title="Nossos impactos que sustentam cada treino"
          lead="Acompanhe os resultados da temporada atual em Arapongas e os três pilares que guiam nossos encontros semanais."
        />

        <div className="mt-7 sm:mt-8">
          <h3 className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span className="h-px w-6 bg-ink" aria-hidden="true" />
            Números
          </h3>
          <dl className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {METRICS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex h-full flex-col rounded-2xl border border-black/10 bg-[#FAFCFE] p-4 transition-colors hover:border-brand-deep/40 sm:p-5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E9F6FD] text-brand-deep sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <dd className="mt-4 whitespace-nowrap font-heading text-[clamp(1rem,0.8rem+1.1vw,2rem)] font-extrabold leading-none tracking-[-0.02em] text-ink tabular-nums sm:mt-5">
                    {item.value}
                  </dd>
                  <dt className="mt-2 text-[0.8rem] leading-snug text-neutral-600 sm:mt-2.5 sm:text-[0.85rem]">
                    {item.label}
                  </dt>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="mt-7 border-t border-black/[0.08] pt-7 sm:mt-8 sm:pt-8">
          <h3 className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span className="h-px w-6 bg-ink" aria-hidden="true" />
            Pilares
          </h3>
          <div className="mt-4 flex max-w-[62ch] flex-col gap-4.5">
            {PILLARS.map((pillar) => (
              <div key={pillar.title}>
                <h4 className="font-heading text-[1.15rem] font-extrabold leading-snug tracking-[-0.01em] text-ink sm:text-xl">
                  {pillar.title}
                </h4>
                <p className="mt-1 text-[1rem] leading-relaxed text-[#3f3f3f] sm:text-[1.05rem]">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
