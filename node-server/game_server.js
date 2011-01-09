var app         = require('express').createServer(),
    io          = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io')
    sys         = require('sys'),
    express     = require('express');
    scubyWars = require('./lib/scuby_wars');

var game = scubyWars.getGame();
var socket = io.listen(app);
var knownClients = [];

var port;
var host;
if (process.argv[2] && process.argv[3]) { 
  host = process.argv[2];
  port = process.argv[3];
} else if (process.argv[2] && !process.argv[3]) {
  host = "0.0.0.0";
  port = process.argv[2];
} else {
  host = "0.0.0.0";
  port = 3000;
};

sys.puts("** Starting the ScubyWars game server ...")
sys.puts("** Listening on " + host + ":" + port + " ...")
sys.puts("** Everything seems up and running so far. Enjoy!")

app.configure(function() {
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
  app.set("views", __dirname + "/views");
  app.set('view engine', 'ejs');
});

app.get("/", function(req, res) {
  res.render("index", { "layout" : false });
});

app.get("/world", function(req, res) {
  res.writeHead(200, { "Content-Type" : "application/json"});
  console.log("Registered client to consume world data.");
  knownClients.push(res);
});

app.post("/players/:name", function(req, res) {
  try {
    var player = game.addPlayer({ip: req.headers.ip, name: req.params.name})
    console.log("Added player: " + player.name);
    res.writeHead(200, { "Content-Type" : "application/json"});
    res.write(JSON.stringify({ "ok" : true }));
  } catch(m) {
    console.log(m);
    res.writeHead(409, { "Content-Type" : "application/json"});
    res.write(JSON.stringify({ "error" : m }));
  }
  res.end();
});

app.put("/players/:name", function(req, res) {
  var player = game.findPlayer(req.params.name);

  if (player) { 
    var body = "";
    req.on("data", function(data) {
      body += data;
    });

    req.on("end", function() {
      actions = JSON.parse(body).actions;
      player.newActions(actions);
      res.writeHead(200, { "Content-Type" : "application/json"});
      res.write(JSON.stringify({ "ok" : true }));
      res.end();
    });
  } else {
    console.log("Player with name '" + req.params.name + "' couldn't be found.");
    res.writeHead(404, { "Content-Type" : "application/json"});
    res.write(JSON.stringify({ "error" : "player not found: " + req.params.name }));
    res.end();
  };
});

app.post("/reset", function(req, res) {
  game = scubyWars.resetGame();
  res.writeHead(200, { "Content-Type" : "application/json" });
  res.write(JSON.stringify({ "ok" : true }));
  res.end();
});

app.listen(3000);

socket.on('connection', function(client) { 
  console.log("A new spectator just connected. Welcome it!")

  client.on('message', function(message) {});
  client.on('disconnect', function() {});
});

setInterval(function() {
  game.turn();
  socket.broadcast(game.world);
  knownClients.forEach(function(res) {
    res.write(game.jsonWorld());
  });
}, scubyWars.WorldDefs.serverTick);
