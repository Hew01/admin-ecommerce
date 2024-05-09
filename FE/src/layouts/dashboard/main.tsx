import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/useResponsive';

import { NAV, HEADER } from './configLayout';


interface MainProps {
  children: React.ReactNode;
  sx?: object;
}
// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: MainProps) {
  const lgUp = useResponsive('up', 'lg', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

