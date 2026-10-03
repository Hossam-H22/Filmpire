import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import useStyles from './App.styles.js';
import { Footer, NavBar } from './Components/index.js';
import { setMediaType } from './features/currentGenreOrCategory.js';
import { Actors, Layout, MovieInformation, Movies, NotFound, Profile } from './Pages/index.js';
import NavigationScroll from './utils/NavigationScroll.jsx';

// Movie and TV pages set which kind of title the navbar browses; other pages keep the last one
function getRouteMediaType(pathname) {
  if (pathname === '/tv' || pathname.startsWith('/tv/')) return 'tv';
  if (pathname === '/' || pathname.startsWith('/movie/')) return 'movie';
  return null;
}

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const routeMediaType = getRouteMediaType(pathname);

  useEffect(() => {
    if (routeMediaType) dispatch(setMediaType(routeMediaType));
  }, [dispatch, routeMediaType]);

  return <>
    <Helmet>
      <title>Filmpire, Home of Movies and TV Shows</title>
    </Helmet>
    <Box className={classes.root}>
      <NavBar />
      <NavigationScroll>
        <Layout>
          <Routes>
            <Route path='/' element={<Movies mediaType='movie' />} />
            <Route path='/tv' element={<Movies mediaType='tv' />} />
            <Route path='/movie/:id' element={<MovieInformation />} />
            <Route path='/actor/:id' element={<Actors />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </NavigationScroll>
      <Footer />
    </Box>
  </>;
}

export default App;
