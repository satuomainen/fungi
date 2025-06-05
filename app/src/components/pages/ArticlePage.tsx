import {PageHeading} from '../layout/PageHeading.tsx';
import {NavSeparator} from '../layout/NavSeparator.tsx';
import {useNavigate, useRouteLoaderData} from 'react-router';
import Box from '@mui/material/Box';
import type {Article} from '../../../types/apitypes';
import {NavButton} from '../layout/NavButton.tsx';
import {useTranslation} from 'react-i18next';
import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';

import './ArticlePage.scss';

const emptyArticle: Article = {
  id: '',
  language: 'en',
  mainHeading: 'Article not found',
  body: 'No content',
}

const bbPlugins = [presetReact()];

interface ArticleProps {
  articleId: string;
}

export const ArticlePage = ({ articleId }: ArticleProps) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const articles = useRouteLoaderData('articles') as Article[];
  const article = articles.find(a => a.id === articleId && a.language === i18n.language) ?? emptyArticle;

  return (
    <>
      <PageHeading mainTitle={article.main_heading}/>
      <Box className="article-content" width="100%">
        <BBCode plugins={bbPlugins}>
          {article.body}
        </BBCode>
      </Box>
      <NavSeparator>
        <NavButton onClick={() => navigate('/')}>{t('Alkuun')}</NavButton> |
        <NavButton onClick={() => navigate('/identification')}>{t('Tunnistamisohjeet')}</NavButton>
      </NavSeparator>
    </>
  );
};
