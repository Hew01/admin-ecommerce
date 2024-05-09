import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/useResponsive';

import Iconify from 'src/components/iconify';

import Searchbar from './common/searchbar';
import AccountPopover from './common/accountPopOver';
import LanguagePopover from './common/languagePopOver';
import NotificationsPopover from './common/notificationsPopOver';
import { StyledAppBar } from './styled/StyledAppBar';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <StyledAppBar
      sx={{
      backgroundColor: theme.palette.background.default,
    }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </StyledAppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
