import { Theme } from '@mui/material/styles';
import { Shadows } from './customShadows'; // Assuming Shadows is the type for your custom shadows

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: Shadows;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: Shadows;
  }
}
