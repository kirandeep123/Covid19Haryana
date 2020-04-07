import React from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'

import './App.css';

function App() {
  const theme = createMuiTheme({
    overrides:{
      MuiTable:{
      },
        MuiTableRow: {
            root: { //for the body
                maxHeight: "10px",
              },
            head: { //for the head
                MaxHeight: "10px"
            }
        }
    }
})
  return (
    <MuiThemeProvider theme={theme}>

    <div className="App">
      <Header/>
     <Dashboard/>
     <Footer/>
    </div>
    </MuiThemeProvider>

  );
}

export default App;
