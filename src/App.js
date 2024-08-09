
import './App.css';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Movies, MovieInformation, Actors, Profile, NavBar, NotFound } from './Components/index.js'
import useStyles from './App.styles.js'
import useAlan from './Components/Alan.jsx';
import { useRef } from 'react';
import { Helmet } from 'react-helmet';

function App() {

  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return <>
    <Helmet>
      <title>Filmpire</title>
    </Helmet>
    <div className={classes.root} >
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='/actor/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  </>;
}

export default App;
