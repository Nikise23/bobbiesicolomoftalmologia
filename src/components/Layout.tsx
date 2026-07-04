import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ScrollToTop } from '@/components/ScrollToTop';

/** Layout común: header sticky, contenido, footer y extras globales. */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-50">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default Layout;
