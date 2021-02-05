const test = require('../index');
serverArray =[
    {
        "url":"http://google.com",
        "priotity":2
    }
]
test.findServer(serverArray).then((response)=>{
    console.log('The available server is: '+response);
}).catch((err)=>{
    console.log(err);
});