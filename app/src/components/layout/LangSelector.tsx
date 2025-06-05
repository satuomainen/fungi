import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import i18n from '../../i18n';

export const LangSelector = () => {
  return (
    <Stack direction="row">
      <Button className="nav-button" onClick={() => i18n.changeLanguage('fi')}>fi</Button> |
      <Button className="nav-button" onClick={() => i18n.changeLanguage('sv')}>sv</Button> |
      <Button className="nav-button" onClick={() => i18n.changeLanguage('en')}>en</Button>
    </Stack>
  );
};
