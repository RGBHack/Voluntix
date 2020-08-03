import * as functions from 'firebase-functions';
const NodeGeocoder = require('node-geocoder');


const options = {
  provider: 'mapquest',

  // Optional depending on the providers
  //fetch: customFetchImplementation,
  apiKey: 'N659j7ox3vSpd81adhphLOKmFafYAAmP', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

exports.getLongLat = functions.https.onCall((data, context) => {
  // Message text passed from the client.
  const text = data.text;

  geocoder.geocode(text)
  .then((res: any) => {
    return {
      longitude: res[0].longitude, 
      latitude: res[0].latitude, 
      result: 'success'
    }
  })
  .catch((err: any) => {
    return {
      result: 'fail'
    }
  })

});