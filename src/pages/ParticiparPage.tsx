import {ArrowRight, HandHeart, Handshake, Megaphone, Package, Trophy} from 'lucide-react';
import {SectionHeading} from '../components/SectionHeading';
import {useRouter} from '../lib/router';

const WAYS_TO_PARTICIPATE = [
  {
    interest: 'Participar',
    icon: Trophy,
    title: 'Quero participar',
    text: 'Para crianças, adolescentes, jovens e famílias que querem começar a jogar. Não precisa de experiência nem de material.',
    action: 'Quero jogar',
  },
  {
    interest: 'Voluntariado',
    icon: Handshake,
    title: 'Quero ser voluntário',
    text: 'Treinadores, monitores, apoio pedagógico e ajuda na organização dos encontros e campeonatos.',
    action: 'Ser voluntário',
  },
  {
    interest: 'Doar materiais',
    icon: Package,
    title: 'Quero doar materiais',
    text: 'Raquetes, bolas, redes, uniformes e outros itens que ajudam a manter as mesas cheias de gente.',
    action: 'Doar materiais',
  },
  {
    interest: 'Patrocínio',
    icon: Megaphone,
    title: 'Quero patrocinar',
    text: 'Empresas e comércios locais podem apoiar o projeto com recursos, estrutura ou contrapartidas.',
    action: 'Falar sobre patrocínio',
  },
  {
    interest: 'Apoiar o projeto',
    icon: HandHeart,
    title: 'Quero apoiar',
    text: 'Divulgação, parceria com escolas, cessão de espaço ou qualquer outro tipo de apoio à iniciativa.',
    action: 'Apoiar',
  },
];

export function ParticiparPage() {
  const {navigate} = useRouter();

  return (
    <section
      id="participar"
      aria-labelledby="participar-title"
      className="border-t border-black/[0.06] pt-8 pb-5 sm:pt-12 sm:pb-7"
    >
      <div className="container-page">
        <SectionHeading
          id="participar-title"
          align="center"
          eyebrow="Como ajudar"
          title="Tem um jeito de participar para cada pessoa"
          lead="O projeto cresce com a comunidade. Escolha por onde quer começar e conte para a gente como você pode ajudar."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS_TO_PARTICIPATE.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.interest}
                className="card-soft flex flex-col border-t-2 border-t-brand p-5 transition-shadow hover:shadow-[0_18px_40px_-30px_rgba(11,11,11,0.45)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F1F9FF] text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 font-heading text-[1.05rem] font-extrabold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-neutral-700">
                  {item.text}
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/contato', {search: {interesse: item.interest}})}
                  className="mt-5 inline-flex min-h-[48px] cursor-pointer items-center justify-between gap-2 rounded-xl bg-brand px-4 font-heading text-[0.9rem] font-bold text-ink transition-colors hover:bg-brand-hover"
                >
                  <span>{item.action}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
