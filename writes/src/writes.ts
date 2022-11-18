const Aerospike = require('aerospike');
// import { group } from 'k6';
import { Options } from 'k6/options';
// import { Counter } from 'k6/metrics';


const asOptions = {
    writeProps: {key: 'SEND'},
    namespace: 'test',
    set: 'demo',
    hostsList: ['10.211.55.200:3000','10.211.55.201:3000'],
};



export let options: Partial<Options> = {
    iterations: 5,
};




export function setup() {

}

export default () => {
// Create a new write policy
    let writePolicy = new Aerospike.WritePolicy(asOptions.writeProps);

    let config = {hosts: asOptions.hostsList};
    // var asClient = Aerospike.connect(config);
    // clientCount.add(1);

// Create the record key
    let userKey = crypto.randomUUID();
    let key = new Aerospike.Key(asOptions.namespace, asOptions.set, userKey);


    // Create the report map
    let reportMap = {
        city: 'Ann Arbor',
        state: 'Michigan',
        shape: ['circle', 'flash', 'disc'],
        duration: '5 minutes',
        summary: "Large flying disc flashed in the sky above the student union. Craziest thing I've ever seen!"
    };

    let bins = {
        occurred: 20220531,
        reported: 20220601,
        posted: 20220601,
        // reportMap defined in the section above
        report: reportMap,
    };

    //Write the record to Aerospike
        // Establishes a connection to the server
        let client = Aerospike.connect(config);
        // clientCount.add(1);
        client.put(key, bins, [], writePolicy);

        // Close the connection to the server
        client.close();

}

