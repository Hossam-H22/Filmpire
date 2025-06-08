import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useStyles from './App.styles.js';
import { NavBar } from './Components/index.js';
import { Actors, Layout, MovieInformation, Movies, NotFound, Profile } from './Pages/index.js';
import NavigationScroll from './utils/NavigationScroll.jsx';

function App() {
  const classes = useStyles();

  return <>
    <Helmet>
      <title>Filmpire, Home of Movies</title>
    </Helmet>
    <Box className={classes.root}>
      <NavBar />
      <NavigationScroll>
        <Layout>
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='/movie/:id' element={<MovieInformation />} />
            <Route path='/actor/:id' element={<Actors />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </NavigationScroll>
    </Box>
  </>;
}

export default App;
