const fetch = require("node-fetch") // axios, https, etc... (node-fetch@2.1.0)
let webhookId = 'b7938fcc-be70-48cd-b54e-5c76cddcc17b'
let a;

async function reply(sessionId, msg) {
    a = await fetch("https://dialogflow.cloud.google.com/v1/integrations/messenger/webhook/" + webhookId + "/sessions/" + sessionId +"?platform=webdemo", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
    
        "referrerPolicy": "no-referrer",
        "body": "{\"queryInput\":{\"text\":{\"text\":\"" + msg + "\",\"languageCode\":\"en\"}}}",
        "method": "POST",
        "mode": "cors"
    
        })
        
        .then(a => {
            // If you're using axios put this line =>>> a = a.data
            return a.text();
        });
        a = JSON.parse(a.slice(5)).queryResult.fulfillmentText;
        if (!a) a = "No Response";

        // take an action
        return a
}

module.exports = reply