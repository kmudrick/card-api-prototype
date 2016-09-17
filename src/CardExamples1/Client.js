// this is where a node.js app "proxy" expects the backend Java API resource
// to live. Card authors should know the rest endpoint for their intended backend
export const JAVA_URI = '/JAVA/BACKEND/API/PATH/MIRROR';

// this is where a card will expect a node app "proxy" resource to exist
// you can use this by default if you mount your route at this path for
// your node app as well
export const UI_BASE_URI = `/api${JAVA_URI}`;

// Other things we'll need to consider is potentially how to identify a given
// backend rest api with a prana client. Should cards expose this as well?
export const PRANA_NAMED_CLIENT = 'BEEHIVE_COLLETE';


// This method is intended for the host React application to leverage
// when retrieving data from the node.js layer. A card should know how
// best to make this round trip, and performing any serializing
export const fetchCardData = (url = UI_BASE_URI, params = {}, cb) => {
  // the `params` object should likely only support the application context
  // properties (countries, languages, movieIds). Anything the card can
  // infer on its own beyond those should be kept to a minimum.

  console.log(`client fetch invoked for url: ${url}`);
  setTimeout(() => {
    // after the clientFetch method (supplied by card module) is done, it should invoke
    // the provided callback by Fetch
    cb(null, params);
  }, 2000);
};

export const fetchCardDataOnNodeLayer = (url = JAVA_URI, params = {}, cb) => {
  // i'm cheating here and assuming the same requestor can be used on the node
  // layer just with a different URI, however that may not be the case. This
  // requestor method is intended to be used in side of a route handler/processor
  return fetchCardData(url, params, cb);
};
