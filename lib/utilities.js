import Router from 'next/router';

export function redirect(context, target) {
	if (context.res) {
		// server
		// 303: "See other"
		context.res.writeHead(303, { Location: target });
		context.res.end();
	} else {
		// In the browser, we just pretend like this never even happened ;)
		Router.replace(target);
	}
}

export function kTof(temp) {
	return `${Math.round((temp - 273.15) * (9 / 5) + 32)}º F`;
}

export function tsToDate(date) {
	const formatted = new Date(date);
	return `${formatted.toLocaleDateString('en-US')} at ${formatted.toLocaleTimeString('en-US')}`;
}
