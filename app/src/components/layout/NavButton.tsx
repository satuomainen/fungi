import Button from '@mui/material/Button';
import type {ReactNode} from 'react';

import './NavButton.scss';
import { Link } from 'react-router';

interface NavButtonProps {
  children: string | ReactNode;
  to: string;
}

export const NavButton = ({children, to}: NavButtonProps) => (
  <Button component={Link} to={to} className="nav-button" variant="text">
    {children}
  </Button>
);
