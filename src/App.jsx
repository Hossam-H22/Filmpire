
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Movies, MovieInformation, Actors, Profile, NavBar, NotFound, Layout } from './Components/index.js'
import { Helmet } from 'react-helmet';
import NavigationScroll from './utils/NavigationScroll.jsx';

function App() {
  return <>
    <Helmet>
      <title>Filmpire, Home of Movies</title>
    </Helmet>
    <Box sx={{ display: 'flex' }}>
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
