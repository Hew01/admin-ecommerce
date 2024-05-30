import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/system';

// ----------------------------------------------------------------------

export function useResponsive(query: string, start: Breakpoint, end: Breakpoint): boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth(): Breakpoint | 'xs' {
  const theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  const matches: Record<Breakpoint, boolean> = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  };

  keys.forEach((key: Breakpoint) => {
    matches[key] = useMediaQuery(theme.breakpoints.up(key));
  });

  const output = keys.find((key: Breakpoint) => matches[key]);

  return output || 'xs';
}

