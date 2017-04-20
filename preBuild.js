var fs = require('fs');

console.log('Pre Build started @ ' + new Date().getTime());

var text = fs.readFileSync('src/app/config/profileLayout.json', "utf8");
var profile = JSON.parse(text);
var routes = [];
var routesString = 'export const routes: Routes = [\n';

var getComponent = function (id) {
	var component;
	switch (id) {
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
		case 'time-and-sales':
			component = 'TimeAndSalesComponent';
			break;
		case 'primary-layout-one':
			component = 'PrimaryLayoutOneComponent';
			break;
		default:
			console.log('An error occurred');
	}
	return component;
}

var createRoute = function (profile, tabs) {

	var tabString = '\t', shortTabString = '';
	for (var p = 0; p < tabs; p++) {
		tabString = tabString + '\t'
		shortTabString = shortTabString + '\t'
	}
	var path = profile.path;
	var route = shortTabString + "{ path: '" + path + "', component: " + getComponent(path);
	if (profile.outlet) {
		route = route + ", outlet: '" + profile.outlet + "'"
	}
	routesString = routesString + route + ',';

	if (profile.model) {
		routesString = routesString + '\n' + tabString + 'children: [\n';
		for (var i = 0; i < profile.model.length; i++) {
			if (profile.model[i].path) {
				createRoute(profile.model[i], tabs + 2);
			}
			else {
				var model = profile.model[i].model;
				for (var j = 0; j < model.length; j++) {
					createRoute(model[j], tabs + 2);
				}
			}
		}
		routesString = routesString + tabString + '],\n' + shortTabString;
	}

	if (routesString.endsWith(',')) {
		routesString = routesString.slice(0, -1);
		routesString = routesString + ' ';
	}

	routesString = routesString + '},\n';
}

createRoute(profile, 1);
routesString = routesString + '];\n';

var imports = fs.readFileSync('src/app/app-routing/app-routes.ts', "utf8").split('// endOfImports //')[0];
var out = fs.createWriteStream('src/app/app-routing/app-routes.ts', { encoding: "utf8" });
out.write(imports + '// endOfImports //\n' + routesString);
out.end();
console.log('routes:\n ' + routesString);
console.log('\nPre Build finished @ ' + new Date().getTime());

