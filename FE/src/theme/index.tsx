import { useMemo, ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions, PaletteOptions, Components } from '@mui/material/styles';
import { TypographyOptions } from "@mui/material/styles/createTypography";

// Assuming these are correctly typed
import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './customShadows';

interface ThemeProviderProps {
  children: ReactNode;
}

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const memoizedValue = useMemo<ThemeOptions>(
    () => ({
      palette: palette() as PaletteOptions,
      typography: typography as TypographyOptions,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme) as Components;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
