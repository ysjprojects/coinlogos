import * as admin from "firebase-admin";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "coinlogos-a3da2.firebaseapp.com",
    projectId: "coinlogos-a3da2",
    storageBucket: "coinlogos-a3da2.appspot.com",
    appId: process.env.APPID,
};
admin.initializeApp(firebaseConfig);
const db = admin.firestore();
export { admin, db }
