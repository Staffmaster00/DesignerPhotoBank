"use strict"
//OAuth2 from google doesn't seem to be working but they didn't link any libraries etc to go along with.
// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
let apiKey = null; //need from company/google
// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
let discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"]; //this is the version of their rest API methods I think google isn't very intuitive with this... =<
// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
let clientId = '35971205940-4aivmmcfhipt4hg3tt2trnc6q85bsto6.apps.googleusercontent.com';
// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
let scopes = 'metadata'; //list of scopes can be found at https://developers.google.com/drive/api/v3/about-auth
let authorizeButton = document.getElementById('authorize-button');
let signoutButton = document.getElementById('signout-button');
let handleClientLoad = () => {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}
let initClient = () => {
  gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: discoveryDocs,
    clientId: clientId,
    scope: scopes
  }).then(() => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}
let updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    makeApiCall();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}
let handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn();
}
let handleSignoutClick = (event) => {
  gapi.auth2.getAuthInstance().signOut();
}