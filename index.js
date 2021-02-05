const axios = require('axios');

// This method will return the promises of the get request server.
const getAllPromises = (arr) => {
    return new Promise(async (resolve, reject) => {
        var data = {};
        axios.get(arr.url, { timeout: 5000 }).then((response) => {
            data.statusCode = response.status;
            data.body = JSON.stringify(arr);
            resolve(data);
        }).catch((error) => {
            data.statusCode = '504';
            data.body = 'Timeout';
            reject(data);
        })
    })
}

//Comparison function to compare the priorities of the available server.
function compare(a, b) {
    let comparison = 0;
    var ObjA = JSON.parse(a);
    var ObjB = JSON.parse(b);
    if (ObjA.priority > ObjB.priority) {
        comparison = 1;
    } else if (ObjA.priority < ObjB.priority) {
        comparison = -1;
    }
    return comparison;
}

// Node Module findServer() which resolves if atleast one server is available
exports.findServer = function (serverArray) {
    return new Promise(async (resolve, reject) => {
        if(!serverArray || serverArray.length <= 0){
            reject("Please provide Server Array");
        }
        Promise.allSettled(
            serverArray.map(d => getAllPromises(d))
        ).then((response) => {
            var resultArray = [];
            response.forEach(element => {
                if (element.status == 'fulfilled' && element.value.statusCode >= 200 && element.value.statusCode <= 299) {
                    resultArray.push(element.value.body);
                }
            });
            if (resultArray.length <= 0) {
                reject("No server is available.");
            }
            responseArray = resultArray.sort(compare);
            resolve(responseArray[0]);
        })
    })
}

