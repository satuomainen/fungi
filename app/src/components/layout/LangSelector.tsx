import Stack from '@mui/material/Stack';
import {NavButton} from './NavButton.tsx';

import i18n from '../../i18n';


export const LangSelector = () => {
  return (
    <Stack direction="row">
      <NavButton onClick={() => i18n.changeLanguage('fi')}>fi</NavButton> |
      <NavButton onClick={() => i18n.changeLanguage('sv')}>sv</NavButton> |
      <NavButton onClick={() => i18n.changeLanguage('en')}>en</NavButton>
    </Stack>
  );
};
