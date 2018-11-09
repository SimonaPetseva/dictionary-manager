import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlipMove from "react-flip-move";

import './App.css';
import TableContainer from './components/TableContainer';
import TableForm from './components/TableForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tables: [],
        }
    }

    render() {
    return (
        <MuiThemeProvider>
          <div className="App">

              {/* NEW TABLE FORM */}
              <TableForm onSubmit={submission => {
                  this.setState({
                      tables: [...this.state.tables, submission]
                  })}} />

              <FlipMove duration={250} easing="cubic-bezier(1, 0, 0, 1)">
                  {/* RENDER THE LIST OF TABLES */}
                  {this.state.tables.map((table, i) => (
                      <TableContainer
                          key={i}
                          title={table.title}
                      />
                  ))}
              </FlipMove>
          </div>
        </MuiThemeProvider>
    );
    }
}

export default App;
