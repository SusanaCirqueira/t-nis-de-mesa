import {useEffect} from 'react';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {RouterProvider, useRouter} from './lib/router';
import {ComoFuncionaPage} from './pages/ComoFuncionaPage';
import {ContatoPage} from './pages/ContatoPage';
import {HomePage} from './pages/HomePage';
import {SobrePage} from './pages/SobrePage';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Arapongas Tênis de Mesa | Tênis de mesa que transforma vidas em Arapongas (PR)',
  '/impacto': 'Arapongas Tênis de Mesa | Nosso impacto',
  '/sobre': 'Sobre o projeto | Arapongas Tênis de Mesa',
  '/como-funciona': 'Como funciona e como participar | Arapongas Tênis de Mesa',
  '/participar': 'Como participar e apoiar | Arapongas Tênis de Mesa',
  '/contato': 'Contato e localização | Tênis de mesa em Arapongas (PR)',
};

const ROUTE_ANCHORS: Record<string, string> = {
  '/impacto': 'impacto',
  '/participar': 'participar',
};

function AppShell() {
  const {pathname} = useRouter();

  useEffect(() => {
    document.title = ROUTE_TITLES[pathname] || ROUTE_TITLES['/'];

    const anchorId = ROUTE_ANCHORS[pathname];
    if (anchorId) {
      const target = document.getElementById(anchorId);
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }, [pathname]);

  const renderPage = () => {
    switch (pathname) {
      case '/sobre':
      case '/galeria':
        return <SobrePage />;
      case '/como-funciona':
      case '/participar':
        return <ComoFuncionaPage />;
      case '/contato':
        return <ContatoPage />;
      case '/':
      case '/impacto':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 pt-14 pb-20 lg:pt-16">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
