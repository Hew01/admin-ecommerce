import { forwardRef, ReactNode, CSSProperties } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

interface ScrollbarProps {
  children: ReactNode;
  sx?: CSSProperties;
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const theme = useTheme();

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        theme={theme}
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

export default Scrollbar;
