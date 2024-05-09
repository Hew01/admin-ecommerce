import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { NAV, HEADER } from '../configLayout';
import { useResponsive } from '@/hooks/useResponsive';

interface BgBlurProps {
  color?: string;
  blur?: number;
  opacity?: number;
  imgUrl?: string;
}

const lgUp = useResponsive('up', 'lg', 'lg');

export const StyledAppBar = styled(AppBar)<BgBlurProps>(({ theme, color = '#000000', blur = 6, opacity = 0.8, imgUrl }) => ({
  boxShadow: 'none',
  height: HEADER.H_MOBILE,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['height'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(lgUp && {
    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
    height: HEADER.H_DESKTOP,
  }),
  ...(imgUrl && {
    position: 'relative',
    backgroundImage: `url(${imgUrl})`,
    '&::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 9,
      content: '""',
      width: '100%',
      height: '100%',
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      backgroundColor: alpha(color, opacity),
    },
  }),
  ...(!imgUrl && {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  }),
}));