import {useLoaderData} from 'react-router';
import {PageFooter} from '../layout/PageFooter.tsx';
import {useTranslation} from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from '@mui/material';
import {convertEdibility, resolveImagePath} from '../../util/util.ts';
import {NavSeparator} from '../layout/NavSeparator.tsx';
import {NavButton} from '../layout/NavButton.tsx';
import {LangSelector} from '../layout/LangSelector.tsx';
import type {Species, SpeciesAttribute, SupportedLanguage} from '../../../types/apitypes';

import './MushroomPage.scss';

const resolveCurrentLanguage = (lang: string): SupportedLanguage => {
  switch (lang) {
    case 'fi':
    case 'sv':
    case 'en':
      return lang;
    default:
      return 'fi';
  }
};

const AttributeTable = ({edibility, attributes}: { edibility: string, attributes: SpeciesAttribute[] }) => {
  const {t} = useTranslation(['edibility']);
  return (
    <TableContainer className="species__attributes">
      <Table sx={{minWidth: 650}} size="small">
        <TableBody>
          <TableRow>
            <TableCell className="species__edibility"
                       colSpan={2}
            >
              <div>{convertEdibility(edibility)} {t(edibility)}</div>
            </TableCell>
          </TableRow>
          {attributes.map((attribute) => (
            <TableRow
              key={attribute.ordinal}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {attribute.name}
              </TableCell>
              <TableCell className="species__attribute-value">{attribute.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const MushroomPage = () => {
  const {t, i18n} = useTranslation();
  const species = useLoaderData<Species>();
  const currentLang = resolveCurrentLanguage(i18n.language);
  const attributes = species.attributes[currentLang] ?? [];

  return (
    <Grid className="species" container gap={1}>
      <Grid size={{xs: 12, sm: 12, md: 12}} className="species__name">
        <Typography variant="h4" component="h1">{species.name.latin}</Typography>
        <Typography variant="h6" component="h2">{`${species.name.fi} (${species.name.sv})`}</Typography>
      </Grid>

      <Grid className="species__image" size={{xs: 12}} display="flex" justifyContent="center">
        <Box component="img" src={resolveImagePath(species.image)} alt={`${species.name.fi} (${species.name.sv})`}/>
      </Grid>

      <Grid size={{xs: 12}}>
        <NavSeparator>
          <Box display="flex" justifyContent="flex-start" width="100%">
            <NavButton to="/catalog">{t('Sienihakemisto')}</NavButton>
          </Box>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <LangSelector/>
          </Box>
        </NavSeparator>
      </Grid>

      <Grid size={{xs: 12}}>
        <AttributeTable edibility={species.stars} attributes={attributes}/>
      </Grid>

      <Grid size={{xs: 12}}>
        <PageFooter/>
      </Grid>
    </Grid>
  );
};
