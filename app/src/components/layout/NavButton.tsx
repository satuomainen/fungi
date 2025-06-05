import Button from '@mui/material/Button';
import type {ReactNode} from 'react';

import './NavButton.scss';

interface NavButtonProps {
  children: string | ReactNode;
  onClick: () => void;
}

export const NavButton = ({children, onClick}: NavButtonProps) => (
  <Button className="nav-button" variant="text" onClick={onClick}>
    {children}
  </Button>
);
