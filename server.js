const http = require('http');
const App = require('./app');
const Server = http.createServer(App);
const Enviroment = require('./ENV')
const PORT = process.env.PORT || 3000



console.log(Enviroment.env)

Server.listen(Enviroment.port, () => {
    console.log(`server has started on PORT ${Enviroment.port} in ${Enviroment.env} Mode...`)
})