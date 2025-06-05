import {CatalogTable} from './CatalogTable.tsx';
import {useTranslation} from 'react-i18next';
import {PageHeading} from '../layout/PageHeading.tsx';
import {PageFooter} from '../layout/PageFooter.tsx';
import {useLoaderData} from 'react-router';
import {convertEdibility} from '../../util/util.ts';
import Tooltip from '@mui/material/Tooltip';
import type {CatalogTableColumn} from './CatalogTable.tsx';
import type {CatalogItem} from '../../../types/apitypes';

import './CatalogPage.scss';

export const CatalogPage = () => {
  const {t} = useTranslation();
  const catalog = useLoaderData() as CatalogItem[];

  const columns: CatalogTableColumn[] = [
    {field: 'descriptionSizes', label: <Tooltip title={t('Lisätietoja kuvauksessa')}><span>🛈</span></Tooltip>},
    {field: 'fi', label: t('Suomeksi')},
    {field: 'sv', label: t('Ruotsiksi')},
    {field: 'en', label: t('Englanniksi')},
    {field: 'latin', label: t('Tieteellinen nimi')},
    {field: 'edibility', label: t('Syötävyys')},
  ];

  const rows = catalog.map(i => ({
    id: i.id,
    latin: i.name.latin ?? `no latin name for id=${i.id}`,
    fi: i.name.fi,
    sv: i.name.sv,
    en: i.name.en,
    edibility: convertEdibility(i.stars),
    descriptionSizes: i.descriptionSizes,
  }));

  return (
    <>
      <PageHeading mainTitle={t('Sieniä Suomessa ja Ruotsissa')} subTitle={t('Hakemisto')}/>
      <CatalogTable rows={rows} columns={columns}/>
      <PageFooter/>
    </>
  );
};
