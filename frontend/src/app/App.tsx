import { Header } from "../shared/ui/Header"
import { AppProviders } from './providers';
import { AppRouter } from './router';

export function App() {
  return (
    <AppProviders>
      <Header />
      <AppRouter />
    </AppProviders>
  );
}