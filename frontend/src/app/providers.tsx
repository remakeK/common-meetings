import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  background: {
    default: '#0F172A',
    paper: '#2A3A52',
  },
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
    },
    primary: {
      main: '#3B82F6',
    },
    divider: 'rgba(148, 163, 184, 0.2)',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
}