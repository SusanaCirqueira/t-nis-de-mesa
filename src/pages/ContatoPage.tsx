import React, {useEffect, useRef, useState} from 'react';
import {
  LoaderCircle,
  Send,
} from 'lucide-react';
import {SectionHeading} from '../components/SectionHeading';
import {INTERESSES_LIST, SITE_INFO} from '../data/siteData';
import {useRouter} from '../lib/router';

const INPUT_CLASS =
  'min-h-[48px] w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-neutral-400 transition-colors focus-visible:border-ink focus-visible:outline-none';
const LABEL_CLASS =
  'mb-1.5 block font-heading text-[0.8rem] font-bold uppercase tracking-[0.1em] text-neutral-600';

export function ContatoPage() {
  const {searchParams} = useRouter();
  const initialInteresseParam = searchParams.get('interesse') || '';
  const validInitial = INTERESSES_LIST.includes(
    initialInteresseParam as (typeof INTERESSES_LIST)[number]
  )
    ? initialInteresseParam
    : 'Participar';

  const [interesse, setInteresse] = useState<string>(validInitial);
  const [formData, setFormData] = useState({
    nome: '',
    mensagem: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const whatsappAutoLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (
      initialInteresseParam &&
      INTERESSES_LIST.includes(initialInteresseParam as (typeof INTERESSES_LIST)[number])
    ) {
      setInteresse(initialInteresseParam);
    }
  }, [initialInteresseParam]);

  const handleFieldChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({...prev, [field]: e.target.value}));
    };

  const buildWhatsappUrl = (data: {
    nome: string;
    interesse: string;
    mensagem: string;
  }) => {
    const lines = [
      `Olá! Vim pelo site ${SITE_INFO.name}.`,
      '',
      `Nome: ${data.nome}`,
      `Interesse: ${data.interesse}`,
    ];
    if (data.mensagem) {
      lines.push(`Mensagem: ${data.mensagem}`);
    }
    return `${SITE_INFO.whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nome = formData.nome.trim();
    const mensagem = formData.mensagem.trim();

    if (nome.length < 2) {
      setStatus('error');
      setErrorMessage('Informe seu nome completo.');
      return;
    }

    const waUrl = buildWhatsappUrl({nome, interesse, mensagem});
    if (whatsappAutoLinkRef.current) {
      whatsappAutoLinkRef.current.href = waUrl;
      whatsappAutoLinkRef.current.click();
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contatos', {
        method: 'POST',
        keepalive: true,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome,
          interesse,
          mensagem,
        }),
      });

      if (response.ok) {
        setFormData({nome: '', mensagem: ''});
      }
      setStatus('idle');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="border-t border-black/[0.06] bg-[#FAFCFE] pt-8 pb-5 sm:pt-10 sm:pb-7 lg:pt-12"
    >
      <div className="container-page">
        <SectionHeading
          id="contato-title"
          align="center"
          eyebrow="Localização e contato"
          title="Venha conhecer, jogar ou ajudar"
          lead={`Estamos em ${SITE_INFO.city} (${SITE_INFO.state}). Chame no WhatsApp, mande uma mensagem pelo formulário ou apareça em um dos nossos encontros.`}
        />

        <div className="mt-9 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
              <iframe
                title={`Mapa de ${SITE_INFO.city} (${SITE_INFO.state})`}
                src="https://www.google.com/maps?q=Arapongas,+Paran%C3%A1,+Brasil&output=embed&hl=pt-BR"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[260px] w-full border-0 sm:h-[300px]"
              />
              <p className="px-4 py-3 text-[0.75rem] leading-relaxed text-neutral-500">
                Localização em Arapongas (PR) — Ginásio Municipal Luiz Augusto Zin.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[26px] border border-black/10 bg-white p-6 pb-5 sm:p-8 sm:pb-7"
          >
            <h3 className="font-heading text-lg font-extrabold text-ink">Fale com o projeto</h3>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-neutral-600">
              Preencha os campos abaixo e envie sua mensagem direto pelo WhatsApp.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="nome" className={LABEL_CLASS}>
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={120}
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleFieldChange('nome')}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="interesse" className={LABEL_CLASS}>
                  Interesse
                </label>
                <select
                  id="interesse"
                  name="interesse"
                  required
                  value={interesse}
                  onChange={(e) => setInteresse(e.target.value)}
                  className={INPUT_CLASS}
                >
                  {INTERESSES_LIST.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className={LABEL_CLASS}>
                  Mensagem{' '}
                  <span className="font-body font-normal normal-case tracking-normal text-neutral-400">
                    (opcional)
                  </span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  maxLength={1000}
                  placeholder="Conte um pouco sobre você, seu filho ou sua proposta."
                  value={formData.mensagem}
                  onChange={handleFieldChange('mensagem')}
                  className={`${INPUT_CLASS} resize-y`}
                />
              </div>
            </div>

            {status === 'error' ? (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[0.875rem] text-red-800"
              >
                {errorMessage ||
                  'Não foi possível enviar agora. Tente novamente ou fale com o projeto pelo WhatsApp.'}
              </p>
            ) : null}

            <a
              ref={whatsappAutoLinkRef}
              href={SITE_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary mt-6 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Enviando</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar mensagem</span>
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[0.75rem] leading-relaxed text-neutral-500">
              Seus dados são usados apenas para responder este contato.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
