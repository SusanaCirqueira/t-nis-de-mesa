import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

interface RouterState {
  pathname: string;
  search: string;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: {search?: Record<string, string>}) => void;
}

const RouterContext = createContext<RouterState | null>(null);

function normalizePath(path: string): string {
  if (!path) {
    return '/';
  }
  const [clean] = path.split('?');
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean || '/';
}

export function RouterProvider({children}: {children: React.ReactNode}) {
  const [locationState, setLocationState] = useState(() => ({
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
  }));

  useEffect(() => {
    const onPopState = () => {
      setLocationState({
        pathname: normalizePath(window.location.pathname),
        search: window.location.search,
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string, options?: {search?: Record<string, string>}) => {
    const url = new URL(to, window.location.origin);
    if (options?.search) {
      for (const [k, v] of Object.entries(options.search)) {
        if (v) {
          url.searchParams.set(k, v);
        }
      }
    }
    const nextPath = normalizePath(url.pathname);
    const nextSearch = url.search;
    const fullUrl = `${nextPath}${nextSearch}`;

    if (window.location.pathname + window.location.search !== fullUrl) {
      window.history.pushState({}, '', fullUrl);
    }
    setLocationState({pathname: nextPath, search: nextSearch});
    window.scrollTo({top: 0, behavior: 'auto'});
  }, []);

  const searchParams = useMemo(() => new URLSearchParams(locationState.search), [locationState.search]);

  const value = useMemo<RouterState>(
    () => ({
      pathname: locationState.pathname,
      search: locationState.search,
      searchParams,
      navigate,
    }),
    [locationState.pathname, locationState.search, searchParams, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterState {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  search?: Record<string, string>;
}

export function Link({to, search, onClick, children, ...rest}: LinkProps) {
  const {navigate} = useRouter();
  const href = useMemo(() => {
    if (!search || Object.keys(search).length === 0) {
      return to;
    }
    const params = new URLSearchParams(search);
    return `${to}?${params.toString()}`;
  }, [to, search]);

  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          rest.target === '_blank'
        ) {
          return;
        }
        e.preventDefault();
        navigate(to, {search});
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
