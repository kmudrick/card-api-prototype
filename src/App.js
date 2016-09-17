import React, { Component, PropTypes } from 'react';
import CoreMetaData from './CardExamples1/CoreMetaData';
import { fetchCardData, UI_BASE_URI } from './CardExamples1/Client';


import Fetch from './UtilityIdeas/Fetch';
const { array, func, number } = PropTypes;
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // applications will be responsible for managing how the data flows from node.js APIs
    // in to the Cards via props (this is transparent to building cards)
    this.state = {
      coreMetadata: {
        dateCreated: '01/24/2004',
        internalTitle: 'Chapter One: The Vanishing of Will Byers',
        internalTitleConcat: 'Stranger Things: Season 1: Chapter One: The Vanishing of Will Byers',
        originalRunTime: '42 Minutes',
        lastUpdated: '1'
      },
      appContext: {
        countries: ['us'],
        languages: ['en'],
        localize(){},
        movieId: 1234
      }
    }

    this.changeAppContext = this.changeAppContext.bind(this);
  }

  changeAppContext() {
    // This can largely be ignored as it it "Application" logic and data storage/updates
    // I am leveraging this to trigger updates in the UI and reflect them in the cards
    // for the example APIs

    const { coreMetadata, appContext } = this.state;
    this.setState({
      appContext: { ...appContext, movieId: parseInt(Math.random() * 10000, 10), languages: [...appContext.languages, '1'] },
      coreMetadata: { ...coreMetadata, lastUpdated: parseInt(coreMetadata.lastUpdated, 10) + 1 + '' }
    });
  }

  getChildContext() {
    return this.state.appContext;
  }

  render() {
    const { coreMetadata, appContext } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>House of Cards</h2>
        </div>
        <p>App Context MovieId: {appContext.movieId} <button onClick={this.changeAppContext}>Change App Context</button></p>
        <div className="App-intro">
          {/* <CoreMetaData {...coreMetadata} /> */}
          <Fetch url={UI_BASE_URI} clientFetch={fetchCardData} data={coreMetadata}>
            {(error, results, fetchingData, requestDataRefresh) => {
              // this is invoked every render() from Fetch, and will contain the current
              // state of affairs for fetching / receiving the data
              return <CoreMetaData
                data={results}
                fetchingData={fetchingData}
                error={error}
                requestDataRefresh={requestDataRefresh}
              />;
            }}
          </Fetch>
        </div>
        <p>
          Note, the dashed line indicates an app 'container',
          while the solid belongs to our Cards. The green area is
          <em>padding</em> in our app container.
        </p>
      </div>
    );
  }
}

App.childContextTypes = {
  countries: array,
  languages: array,
  localize: func,
  movieId: number,
  requestDataRefresh: func,
};

export default App;
