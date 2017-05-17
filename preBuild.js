var fs = require('fs');

console.log('Pre Build started @ ' + new Date().getTime());

var text = fs.readFileSync('src/config/app-layout.json', "utf8");
var profile = JSON.parse(text);
var routes = [];
var routesString = 'export const routes: Routes = [\n';

var getComponent = function (id) {
	var component;
	switch (id) {
		case 'login':
			component = 'LoginComponent'
			break;
		case 'order-ticket':
			component = 'OrderTicketComponent';
			break;
		case 'detail-quote':
			component = 'DetailQuoteComponent';
			break;
		case 'watch-list':
			component = 'WatchListComponent';
			break;
		case 'chart':
			component = 'ChartComponent';
			break;
		case 'side-bar':
			component = 'SideBarComponent';
			break;
		case 'secondary-layout-one':
			component = 'SecondaryLayoutOneComponent';
			break;
		case 'secondary-layout-two':
			component = 'SecondaryLayoutTwoComponent';
			break;
		case 'secondary-layout-three':
			component = 'SecondaryLayoutThreeComponent';
			break;
		case 'time-and-sales':
			component = 'TimeAndSalesComponent';
			break;
		case 'primary-layout-one':
			component = 'PrimaryLayoutOneComponent';
			break;
		case 'order-book':
			component = 'OrderBookComponent';
			break;
		default:
			console.log('An error occurred');
	}
	return component;
}

var getDataString = function (data) {
	var output = '';

	if (data instanceof Array) {
		output += '[';
		for (var property in data) {
			output = output + getDataString(data[property]);
		}
		output = output.slice(0,output.length-2) + ']';

	}else if (data instanceof Object) {
		output += '{ ';
		for (var property in data) {
			output = output +  property + ': ' + getDataString(data[property]);
		}
		output = output.slice(0,output.length-2) + ' }';
	}else {
		if (typeof data === 'string') {
			output += "'" + data + "'";
		}else {
			output += data;
		}
	}
	output += ', ';

	return output;
}

var createRoute = function (profile, tabs) {

	var tabString = '\t', shortTabString = '';
	for (var p = 0; p < tabs; p++) {
		tabString = tabString + '\t'
		shortTabString = shortTabString + '\t'
	}
	var path = profile.path;
	var route = shortTabString;
	
	if (path) {
		route += "{ path: '" + path + "', component: " + getComponent(path);
	} else {
		route += "{ path: '', pathMatch: 'full', redirectTo: '" + profile.redirectTo + "'";
	}
	
	if (profile.needsAuthentication) {
		route += ", canActivate: [AuthGuardService]"
	}

	if (profile.outlet) {
		route += ", outlet: '" + profile.outlet + "'"
	}

	if(profile.args) {
		route += ", data: " + getDataString(profile.args);
		route = route.slice(0, route.length-2);
	}

	routesString = routesString + route + ',';

	if (profile.model) {
		routesString = routesString + '\n' + tabString + 'children: [\n';
		for (var i = 0; i < profile.model.length; i++) {
			if (profile.model[i].path) {
				createRoute(profile.model[i], tabs + 2);
			} else {
				var model = profile.model[i].model;
				for (var j = 0; j < model.length; j++) {
					createRoute(model[j], tabs + 2);
				}
			}
		}

		routesString += tabString + '],\n' + shortTabString;
	}

	if (routesString.endsWith(',')) {
		routesString = routesString.slice(0, -1);
		routesString += ' ';
	}

	routesString = routesString + '},\n';
}

for (var i = 0; i < profile.routes.length; i++) {
	createRoute(profile.routes[i], 1);
}

routesString += '];\n';

var imports = fs.readFileSync('src/app/app-routing/app-routes.ts', "utf8").split('// endOfImports //')[0];
var out = fs.createWriteStream('src/app/app-routing/app-routes.ts', { encoding: "utf8" });
out.write(imports + '// endOfImports //\n' + routesString);
out.end();
console.log('routes:\n ' + routesString);
console.log('\nPre Build finished @ ' + new Date().getTime());

