import { Component, PropTypes } from 'react';
const { func, string } = PropTypes;

class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: false,
      error: null,
      results: null
    };

    this.receiveXHR = this.receiveXHR.bind(this);
    this.requestDataRefresh = this.requestDataRefresh.bind(this);
  }

  componentWillMount() {
    // Apps should be able to provide url and clientFetch by importing them
    // from the Card package (defaults) or by overriding them if they know
    // where better to get these from
    if (this.props.url && this.props.clientFetch) {
      this.setState({ fetchingData: true });

      // this should be any API params like languages, countries, movieId, etc
      // for this example I'm just passing all the data props we have and modifying
      // then returning them after a timeout
      const params = this.props.data;
      this.props.clientFetch(this.props.url, params, this.receiveXHR);
    }
  }

  receiveXHR(error, results) {
    this.setState({ error, results, fetchingData: false });
  }

  requestDataRefresh() {
    this.setState({ fetchingData: true }, () => {
      this.props.clientFetch(this.props.url, this.props.data, this.receiveXHR);
    })
  }

  render() {
    const { error, results, fetchingData } = this.state;
    return this.props.children(error, results, fetchingData, this.requestDataRefresh);
  }
};

Fetch.displyName = 'Fetch';
Fetch.propTypes = {
  children: func.isRequired,
  clientFetch: func.isRequired,
  url: string.isRequired
};

export default Fetch;
