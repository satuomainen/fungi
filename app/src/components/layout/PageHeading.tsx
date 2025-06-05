import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import type {ReactNode} from 'react';
import Box from '@mui/material/Box';
import {LangSelector} from './LangSelector.tsx';
import {NavSeparator} from './NavSeparator.tsx';
import {NavButton} from './NavButton.tsx';
import {useTranslation} from 'react-i18next';

interface PageHeadingProps {
  mainTitle: string;
  subTitle?: string | ReactNode;
}

export const PageHeading = ({mainTitle, subTitle}: PageHeadingProps) => {
  const {t} = useTranslation();
  return (
    <Grid container gap={1}>
      <Grid size={{xs: 12, sm: 4, md: 2}}>
        <Box component="img" src="images/pick_s.jpg"/>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 9}} display="flex" alignItems="center" flexDirection="column"
            justifyContent="center">
        <Typography variant="h4" component="h1">{mainTitle}</Typography>
        <Typography variant="h6" component="h2">{subTitle}</Typography>
      </Grid>
      <Grid size={{xs: 12}}>
        <NavSeparator>
          <Box display="flex" justifyContent="flex-start" width="100%">
            <NavButton to="/">{t('Alkuun')}</NavButton> |
            <NavButton to="/catalog">{t('Sienihakemisto')}</NavButton> |
            <NavButton to="/identification">{t('Tunnistamisohjeet')}</NavButton>
          </Box>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <LangSelector/>
          </Box>
        </NavSeparator>
      </Grid>
    </Grid>
  );
};