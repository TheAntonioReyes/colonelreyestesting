const querystring = require('querystring');

exports.handler = async (event) => {
    let response = {
        statusCode: 200,
        body: "API Testing in progress....."
    };
    
    if(event.httpMethod == "POST") {
        if (event.body !== null && event.body !== undefined) {
            let data = querystring.decode(event.body);
            response.body = JSON.stringify({access_token: data.code});
            response.headers = {"Set-Cookie": "auth_code=" + data.code};
        }
    }
    else if(event.httpMethod == "GET" && event.headers['Cookie']) {
        let cookies = querystring.decode(event.headers['Cookie']);
        response.body = JSON.stringify({
            auth_code: cookies.auth_code
        });
    }
    
    return response;
};
