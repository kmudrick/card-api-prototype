import React, { Component, PropTypes } from 'react';
import './CoreMetaData.css';
const { func, arrayOf, string, number, shape } = PropTypes;

// We do not have to enforce class vs createClass, just picked one
class CoreMetaData extends Component {
  componentWillReceiveProps(nextProps, nextContext) {
    // this method can obviously be used for updating state if props are updated
    // (most cases if they change then they should update)

    // additionally, a component could determine if the page context changes
    // are meaningful for this Card or not.

    // In the future, they could also indicate to other utility methods/components
    // provided that new data should be fetched from the server or not

    if (nextContext.languages.length !== this.context.languages.length) {
      this.props.requestDataRefresh();
    }
  }

  render() {
    const { data, fetchingData } = this.props;

    // console.info('cards should always know what business context they are ran in');
    // console.log(context);
    //
    // console.info('cards will always have their model as first-class props');
    // console.log(props);

    if (fetchingData) {
      return <div>Spinner</div>;
    }

    return <div className='coremetadata'>
      {/* Cards can pull in or render their own smaller components here! */}
      <div className='coremetadata-header'>
        <h3 className='coremetadata-title'>Core Metadata</h3>
        <h4 className='coremetadata-updated-by'>Last Updated {data.lastUpdated}</h4>
      </div>

      {/* this particular card is pretty much prop input -> layout output */}
      <div className='coremetadata-content'>

        {/* for super-common UI elements, we should be able to reuse an OSS item
            (like react-toolbox) or create our own simple ones (or even css rules)
            that can be used as well. */}
        <p className='coremetadata-row'>
          <span className='coremetadata-row-label'>Internal Title:</span>
          {data.internalTitle}
        </p>
        <p className='coremetadata-row'>
          <span className='coremetadata-row-label'>Internal Concatenated Title:</span>
          {data.internalTitleConcat}
        </p>
        <p className='coremetadata-row'>
          <span className='coremetadata-row-label'>Original Run Time:</span>
          {data.originalRunTime}
        </p>
      </div>

      <div onClick={this.props.requestDataRefresh}>
        <button>Refresh Invoked from Card</button>
      </div>
    </div>;
  }
}

CoreMetaData.propTypes = {
  // Model/DTO properties should be top level props
  // e.g.
  data: shape({
    dateCreated: string,
    internalTitle: string,
    internalTitleConcat: string,
    lastUpdated: string,
    lastUpdatedBy: string,
    metaDateReleaseDays: number,
    originalRunTime: string,
    originalTitle: string,
    originalTitleConcat: string
  }),
};

CoreMetaData.defaultProps = {
  lastUpdated: '--:--'
};

// this has been suggested to _not_ provide via React context, and move iin to
// props, so that apps do not have to use context if they don't want to
// apps that do want to store this on context could still do this and then hoist
// them to props in the Fetch() render callback, or simply when they render
CoreMetaData.contextTypes = {
  // These should be normalized for all cards, however
  // cards can mark `.isRequired` or not indicating they
  // may or may not use these.
  countries: arrayOf(string),
  languages: arrayOf(string),

  // this may come in as a prop as well, depending on the API data
  // returned - but it should likely be noted the intended movie Id
  // that an app like Title 360 is rendering this card in context of
  movieId: number,

  // These should be standardized for specific API methods
  // that an App can utilize to interact with cards (i/o)
  localize: func
};

export default CoreMetaData;
