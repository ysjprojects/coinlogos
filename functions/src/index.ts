import * as functions from "firebase-functions";
import * as express from "express";
import { db } from "./config/firebase";
import * as helper from "./config/helper";


import { addressType, resdocType } from "./type";

import rateLimit from "express-rate-limit";

import * as cors from "cors"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const logosRef = db.collection("logos");
const logosMetaRef = db.collection("logosmeta");
const logosImgBaseUrl = helper.ENDPOINT + "assets/logos/";

const server = express();



const globalLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message:
        "API limit reached, please try again in an hour",
    standardHeaders: true,
    legacyHeaders: false
})

server.use(cors());
server.use(globalLimiter);

/*const getAllLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 1,
    message:
        "API limit reached, please try again in a day",
    standardHeaders: true,
    legacyHeaders: false

})*/

const sched = async () => {
    let logos: resdocType[] = []
    let listOfIds: string[] = []
    let listOfNetworks: string[] = []
    const snapshot = await logosRef.get()
    snapshot.forEach((doc) => {
        logos.push({
            data: {
                id: doc.id,
                ticker: doc.data().ticker,
                addresses: doc.data().addresses
            },
            imgurl: logosImgBaseUrl + doc.id + ".png"
        })
        listOfIds.push(doc.id)
        doc.data().addresses.forEach((address: addressType) => {
            if (!listOfNetworks.includes(address.network)) {
                listOfNetworks.push(address.network)
            }
        })


    })

    logosMetaRef.doc("networks").set({
        networks: listOfNetworks
    })

    logosMetaRef.doc("ids").set({
        ids: listOfIds
    })
    logosMetaRef.doc("cached").set({
        result: logos,
        metadata: {
            ids: listOfIds,
            networks: listOfNetworks
        }
    })


}

server.get("/api/logos", async (req, res) => {
    const logosSnap = await logosMetaRef.doc("cached").get();
    if (logosSnap.exists) {
        res.send(logosSnap.data())
    }
    else {
        res.send({
            result: "Cache does not exist"
        })
    }
})

server.get("/api/logos/metadata", async (req, res) => {
    const idsSnap = await logosMetaRef.doc("ids").get();
    const networksSnap = await logosMetaRef.doc("networks").get()

    if (idsSnap.exists && networksSnap.exists) {
        res.send({
            result: {
                ids: idsSnap.data()!.ids,
                networks: networksSnap.data()!.networks
            }
        })
    }
    else {
        res.send({
            result: "No metadata available"
        })
    }
})


server.get("/api/logos/id/:id", async (req, res) => {
    let id = req.params.id
    const docSnap = await logosRef.doc(id).get()
    if (docSnap.exists) {

        res.send({
            result: {
                data: {
                    id: docSnap.id,
                    ticker: docSnap.data()!.ticker,
                    addresses: docSnap.data()!.addresses
                },
                imgurl: logosImgBaseUrl + docSnap.id + ".png"
            }
        })
    } else {
        res.send({
            result: "Logo does not exist!"
        })
    }
})


server.get("/api/logos/ticker/:ticker", async (req, res) => {
    let logos: resdocType[] = []

    let ticker = req.params.ticker
    let firstres = req.query.firstres
    const querySnap = await logosRef.where("ticker", "==", ticker).get()
    if (querySnap.empty) {
        res.send({
            result: "Logo does not exist!"
        })
    }
    else {
        querySnap.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            logos.push({
                data: {
                    id: doc.id,
                    ticker: doc.data().ticker,
                    addresses: doc.data().addresses
                },
                imgurl: logosImgBaseUrl + doc.id + ".png"
            })
        });
        if (firstres == "1") {
            res.send({
                result: logos[0]
            })
        } else {
            res.send({
                result: logos
            })
        }
    }


})


server.get("/api/logos/address/:network/:address", async (req, res) => {
    let network = req.params.network
    let address = req.params.address
    const querySnap = await logosRef.where("addresses", "array-contains", { network: network, address: address }).get()
    if (querySnap.empty) {
        res.send({
            result: "Logo does not exist!"
        })
    }

    else {
        let doc = querySnap.docs[0]
        res.send({
            result: {
                data: {
                    id: doc.id,
                    ticker: doc.data().ticker,
                    addresses: doc.data().addresses
                },
                imgurl: logosImgBaseUrl + doc.id + ".png"
            }

        })
    }

})


exports.scheduledFunctionCrontab = functions.pubsub.schedule('5 11 * * *')
    .timeZone('America/New_York')
    .onRun((context) => {
        console.log('This will be run every day at 11:05 AM Eastern!');
        return sched();
    });


exports.api = functions.https.onRequest(server);