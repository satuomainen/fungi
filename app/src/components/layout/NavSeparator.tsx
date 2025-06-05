import Box from '@mui/material/Box';
import type {ReactNode} from 'react';

import './NavSeparator.scss';

interface NavSeparatorProps {
  children?: ReactNode;
}

export const NavSeparator = ({children}: NavSeparatorProps) => {
  return (
    <Box className="nav-separator">
      {children}
    </Box>
  );
};
