import {useState} from 'react';

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function SiteImage({src, alt, className = '', loading = 'lazy'}: SiteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || 'Imagem do projeto'}
        className={`flex items-center justify-center bg-[#E9F6FD] text-center text-xs font-medium text-neutral-600 p-4 ${className}`}
      >
        <span>{alt || 'Arapongas Tênis de Mesa'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
