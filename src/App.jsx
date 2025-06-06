
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Profile, NavBar, NotFound, Layout } from './Components/index.js'
import { Helmet } from 'react-helmet';
import NavigationScroll from './utils/NavigationScroll.jsx';
import useStyles from './App.styles.js';
import { Movies, MovieInformation, Actors } from './Pages/index.js';

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
