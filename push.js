const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGJ_8wjDR8YjBR_3UnuNJP_uQypVSf5zdNys_HZkw4MzsacH-uR-xc1LGxlgSgk0KH_SnzOcwIfnsQ-Pm7DB2q8",
    "privateKey": "o-haucpcDnNi5KAlTBRx5DZE-RIMfg_Q3yMcraxoJt0"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d8EecAHkixk:APA91bFc65WfhXv6Qqs66e_DvtY8JAsuhiDIFiNQx2w8adveilN0F-iCY0kvrMZkaY68xtF23vBV1yfTxE8WlNaPwBEHcZRWR_Q5WDrPO-WKh6MLXJG6dVPwwS5_jbC9xm_Kp5Z2Q-y0",
    "keys": {
        "p256dh": "BFRzi7dOmSqjodIJP2ZZkU+YT33VqmqRH50WqnJBGvFB+REM41jw0EKmjBmqhvk4uRhJDhqEriqC/R/aFDR+82E=",
        "auth": "54/Pffxf+RumG081SxnJcA=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '190818367189',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);