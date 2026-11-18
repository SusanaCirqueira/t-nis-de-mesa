import {Clock, Users} from 'lucide-react';
import {SectionHeading} from '../components/SectionHeading';
import {ParticiparPage} from './ParticiparPage';

const TURMAS = [
  {
    title: 'Turma de iniciação',
    age: '7 a 11 anos',
    text: 'Primeiros contatos com a raquete: coordenação, regras básicas e muita troca de bola.',
    schedule: 'Terças e Quintas · 18h30 às 19h30',
  },
  {
    title: 'Turma de aperfeiçoamento',
    age: '11 a 15 anos',
    text: 'Treino técnico, leitura de jogo e preparação para os campeonatos internos do projeto.',
    schedule: 'Terças e Quintas · 19h30 às 20h30',
  },
  {
    title: 'Turma juvenil',
    age: '14 a 18 anos',
    text: 'Rotina de treino com acompanhamento, autonomia e metas construídas junto com cada participante.',
    schedule: 'Sábados · 9h às 10h30',
  },
  {
    title: 'Turma aberta para famílias',
    age: 'Todas as idades',
    text: 'Pais, mães e responsáveis jogando junto com os participantes. A mesa é de todos.',
    schedule: 'Sábados · 10h30 às 11h30',
  },
];

export function ComoFuncionaPage() {
  return (
    <>
      <section
        id="como-funciona"
        aria-labelledby="como-funciona-title"
        className="border-t border-black/[0.06] pt-7 pb-8 sm:pt-10 sm:pb-12 lg:pt-12"
      >
        <div className="container-page">
          <SectionHeading
            id="como-funciona-title"
            align="center"
            eyebrow="Como funciona"
            title="Atividades organizadas por turma e por idade"
            lead="Cada encontro combina aquecimento, treino técnico e jogo livre. As turmas são divididas por faixa etária e nível de experiência para que ninguém fique para trás."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TURMAS.map((turma, index) => (
              <article
                key={turma.title}
                className="card-soft flex flex-col p-5 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(11,11,11,0.45)]"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-brand px-2.5 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                  Turma {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-heading text-[1.05rem] font-extrabold leading-snug text-ink">
                  {turma.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] font-medium text-neutral-500">
                  <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{turma.age}</span>
                </p>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-neutral-700">
                  {turma.text}
                </p>
                <p className="mt-4 flex items-center gap-1.5 border-t border-black/[0.08] pt-3 text-[0.8rem] font-semibold text-ink">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{turma.schedule}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ParticiparPage />
    </>
  );
}
