const express = require('express');
const moment = require('moment');
const debounce = require('debounce');
let webSocketServer = require('websocket').server;
let http = require('http');
const router = express.Router();

//Set Up Kafka connection, producer and consumer
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'realtime-editor-api',
    brokers: ['37.120.175.2:29092']
})
const producer = kafka.producer({
    allowAutoTopicCreation: true
});
console.log('\n**************************************\n');
producer.connect().then(console.log('producer connected'));

let timeOfLastSend = moment();

let setUpConsumer = async () => {
    const consumer = kafka.consumer({groupId: 'test3'})
    await consumer.connect()
    await consumer.subscribe({topics: ['positionChange','textChange'], fromBeginning: false});

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('sending message: ' + String(message.value) + '\nto live Clients.');

            liveConnections.forEach(connection => {
                connection.sendUTF(String(message.value));
            })
        },
    })
}

setUpConsumer();

/*
consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            value: message.value.toString(),
        })
    },
})
*/

//Set up WebSocket Server
let server = http.createServer((req, res) => {
    console.log('Request recieved : ' + req.url);
    res.writeHead(404);
    res.end();
})
server.listen(8888, () => {
    console.log('HTTP-Server listening on Port: 8888')
})

let liveConnections = [];

webSocketServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

let isOriginAllowed = (origin) => {
    return true
}

webSocketServer.on('request', async (request) => {
    if (!isOriginAllowed(request.origin)) {
        request.reject();
        console.log('Connection from ' + request.origin + ' rejected.');
        return;
    }

    let connection = request.accept('echo-protocol', request.origin);
    console.log('Connection accepted : ' + request.origin);
    liveConnections.push(connection);
    connection.on('message', (message) => {
        console.log('Received Message: ' + JSON.stringify(message.utf8Data));

        if(JSON.parse(message.utf8Data).topic === 'positionChange'){
            producer.send({
                topic: 'positionChange',
                messages: [
                    {value: JSON.stringify(message.utf8Data)}
                ]
            })
        } else if (JSON.parse(message.utf8Data).topic === 'textChange'){
            if(moment().diff(timeOfLastSend, 'milliseconds') > 2) {
                producer.send({
                    topic: 'textChange',
                    messages: [
                        {value: JSON.stringify(message.utf8Data)}
                    ]
                })
                timeOfLastSend = moment();
            }
        }
    });

    connection.on('close', (reasonCode, description) => {
        liveConnections = liveConnections.filter((entity => {return entity.remoteAddress !== connection.remoteAddress }));
        console.log('Connection ' + connection.remoteAddress + ' disconnected.');
    });
});



router.get('/test', (req, res, next) => {
    if(true){
        return res.status(201).send({
            msg: true
        });
    } else {
        return res.status(500).send({
            msg: false
        });
    }
});

router.post('/positionChange', (req, res, next) => {
    //console.log(req.body);

    return res.status(201).send({
        msg: producer.send({
            topic: 'positionChange',
            messages: [
                { value: req.body.toString() }
            ]
        })
    });
});


module.exports = router;