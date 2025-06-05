import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useHref} from 'react-router';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useTranslation} from 'react-i18next';
import {Typography} from '@mui/material';

import './ErrorPage.scss';
import {resolveImagePath} from '../../util/util.ts';

export const ErrorPage = () => {
  const {t} = useTranslation();
  const startPageUrl = useHref('/');

  return (
    <Container
      className="error"
      maxWidth="lg"
      sx={{
        height: '100vh',
        marginTop: 4,
        marginBottom: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container gap={4}>
        <Grid className="error__image" size={{xs: 12}} display="flex" justifyContent="center">
          <Box component="img" src={resolveImagePath('error.jpg')}/>
        </Grid>
        <Grid size={{xs: 12}} display="flex" justifyContent="center">
          <Box component="div">
            <Typography variant="h3" component="h4">
              {t('Nyt meni jotain mönkään...')}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{xs: 12}} display="flex" justifyContent="center">
          <Button variant="contained" href={startPageUrl}>{t('Palaa alkuun')}</Button>
        </Grid>
      </Grid>


    </Container>
  );
};
