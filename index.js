const app = require("express")();

app.get("/", (request, response) => {
    console.log(request.protocol);
    console.log(request.hostname);
    console.log(request.path);
    console.log(request.originalUrl);
    console.log(request.subdomains);
    console.log();

    var http = require('follow-redirects').http;

    var options = {
        'method': 'GET',
        'hostname': request.hostname,
        'path': request.path,
        'maxRedirects': 20
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            response.send(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();

})

app.listen(5050, () => {
    console.log("Server Proxy Web Online")
})