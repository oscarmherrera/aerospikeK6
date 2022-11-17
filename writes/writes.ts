const Aerospike = require('./node_modules/aerospike/lib/aerospike.js')
const GeoJSON = Aerospike.GeoJSON;

import http from 'k6/http';

// @ts-ignore
import { Counter } from 'k6/metrics';
// import mocker from 'mocker-data-generator'; // (ES6 or Typescript way)
const mocker = require('mocker-data-generator');

export const asOptions = {
    writeProps: {key: 'SEND'},
    namespace: 'test',
    set: 'demo',
    hostsList: ['localhost:3000'],
}

    // const clientCount = new Counter('client_count');

export function setup() {

}

export default (data) => {
// Create a new write policy
    var writePolicy = new Aerospike.WritePolicy(asOptions.writeProps);

    var config = {hosts: asOptions.hostsList};
    // var asClient = Aerospike.connect(config);
    // clientCount.add(1);

// Create the record key
  //  var userKey = crypto.randomUUID();
  //  let key = new Aerospike.Key(asOptions.namespace, asOptions.set, userKey);


    // Create the report map
    let reportMap = {
        city: 'Ann Arbor',
        state: 'Michigan',
        shape: ['circle', 'flash', 'disc'],
        duration: '5 minutes',
        summary: "Large flying disc flashed in the sky above the student union. Craziest thing I've ever seen!"
    };

// Format coordinates as a GeoJSON string
    let geoLoc = new GeoJSON({type: 'Point', coordinates: [42.2808,83.7430]});

    let bins = {
        occurred: 20220531,
        reported: 20220601,
        posted: 20220601,
        // reportMap defined in the section above
        report: reportMap,
        // geoLoc defined in the section above
        location: geoLoc,
    };

    //Write the record to Aerospike
        // Establishes a connection to the server
        let client = Aerospike.connect(config);
        // clientCount.add(1);
        client.put(key, bins, [], writePolicy);

        // Close the connection to the server
        client.close();

}

export function teardown(data) {

}
