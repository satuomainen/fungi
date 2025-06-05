import {CssBaseline, ThemeProvider} from '@mui/material';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createHashRouter, RouterProvider} from 'react-router';
import {appTheme} from './theme.js';
import {ArticlePage} from './components/pages/ArticlePage.tsx';
import {BaseLayout} from './components/layout/BaseLayout.tsx';
import {CatalogPage} from './components/pages/CatalogPage.tsx';
import {ErrorPage} from './components/pages/ErrorPage.tsx';
import {FullPageSpinner} from './components/layout/FullPageSpinner.tsx';
import {MushroomPage} from './components/pages/MushroomPage.tsx';

const resolveBackendUrl = (uri: string) => {
  console.log(`import.meta.env.MODE=${import.meta.env.MODE}`);
  console.log(`import.meta.env.BASE_URL=${import.meta.env.BASE_URL}`);
  if (import.meta.env.MODE === 'production') {
    return `${import.meta.env.BASE_URL}/api${uri}`;
  }

  // Served locally from the docker container that exposes a different port
  return `http://localhost:8080/fungi/api${uri}`
};

const router = createHashRouter([
  {
    path: '/',
    element: <BaseLayout/>,
    errorElement: <ErrorPage />,
    id: 'articles',
    loader: () => fetch(resolveBackendUrl('/articles')).then(res => res.json()),
    children: [
      {
        index: true,
        element: <ArticlePage articleId="about"/>,
      },
      {
        path: '/identification',
        element: <ArticlePage articleId="identification"/>,
      },
      {
        path: '/catalog',
        loader: () => fetch(resolveBackendUrl('/species')).then(res => res.json()),
        element: <CatalogPage/>,
      },
      {
        path: '/species/:id',
        loader: ({ params }) => fetch(resolveBackendUrl(`/species/${params.id}`)).then(res => res.json()),
        element: <MushroomPage/>,
      },
    ],
    hydrateFallbackElement: <FullPageSpinner/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
);
