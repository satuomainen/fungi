import {NavSeparator} from './NavSeparator.tsx';
import {NavButton} from './NavButton.tsx';
import {useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';

export const PageFooter = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <NavSeparator>
      <NavButton onClick={() => navigate('/')}>{t('Alkuun')}</NavButton> |
      <NavButton onClick={() => navigate('/identification')}>{t('Tunnistamisohjeet')}</NavButton>
    </NavSeparator>
  );
};
