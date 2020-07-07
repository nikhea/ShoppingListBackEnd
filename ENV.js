const environment = {};

environment.statging = {
	port: process.env.PORT || 3000,
	env: 'statging'
};

environment.production = {
	port:process.env.PORT || 5000,
	env: 'production'
};

const currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toUpperCase() : '';

const environmentToExport =
	typeof environment[currentEnvironment] == 'string' ? environment[currentEnvironment] : environment.statging;

module.exports = 
	environmentToExport

