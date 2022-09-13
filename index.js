const app = require("express")();

app.get("/", (request, response) => {
    console.log(request.protocol);
    console.log(request.hostname);
    console.log(request.path);
    console.log(request.originalUrl);
    console.log(request.subdomains);

    //response.send("Você caiu no proxy do lasanha de frango com catupiry");
    //return

    var http = require('follow-redirects').http;

    var options = {
        'method': 'GET',
        'port': 80,
        'hostname': request.hostname,
        'path': request.path,
        'headers': request.headers,
    };

    var req = http.request(options, function (res) {
        var body;

        res.on("data", function (chunk) {
            body += chunk;
        });

        res.on("end", function (chunk) {
            console.log(body.toString());
            response.writeHead(res.statusCode, res.headers).end(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();

})

app.listen(5050, () => {
    console.log("Port: 5050")
    console.log("Server Proxy Web Online")
})