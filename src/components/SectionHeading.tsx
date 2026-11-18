interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) {
  const isDark = tone === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'text-center' : ''}>
      {eyebrow ? (
        <p
          className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${
            isDark ? 'text-brand' : 'text-neutral-500'
          } ${isCenter ? 'justify-center' : ''}`}
        >
          <span
            className={`h-px w-6 ${isDark ? 'bg-brand' : 'bg-ink'}`}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`section-title ${eyebrow ? 'mt-3' : ''} ${isDark ? 'section-title-dark' : ''}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`section-lead ${isDark ? 'section-lead-dark' : ''} ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
