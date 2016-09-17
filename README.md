# Card API Proposal

Hello, this repo contains a prototype of 3 things:
1. How an `App` may use utility components and cards to render data
2. What API a component `Card` might look like (and exports a module should have)
3. What API a utility component such as `Fetch` might look like

You can see a built example of the app running [here](https://card-prototype1-qloexiyxgf.now.sh).

## Cards
Cards should publish an npm module with the following items to help an application
wire them up:

### Renderable React Component
This is ideally something that has documentation around specific API properties
that will be common for **all** cards. It should be simple enough that it can be
hydrated with data, and manage its _own_ internal state and children composition.


### UI Client Default Fetch
To assist an application with fetching data (without fetching the data on its own,
so that apps can help orchestrate this or provide a custom method), a client side
fetch method should be exported. This should have a default URL that it expects a
proxy API to exist at, and should know how to talk to the node layer with any of
the application context (movie ID, languages, countries, etc) that is provided.

### Node Router Default Requestor
To assist an application with fetching data from a **Java Backend** a utility method
should be provided to use by default. This should include a serializer if necessary
for your intended end point. Both this function and the UI function can be defaults,
and should be able to be plugged in to any app - without knowledge of that
application.

In short, a UI engineer should be able to work with a backend engineer to build
these elements with no knowledge of the host application.

## Known Unknowns
I am not sure how best to handle localization at this stage. Open to suggestions
as there are caveats and complexities that may be involved here when used between
multiple apps.

## Unknown Unknowns
Like what would I even write here rn.
