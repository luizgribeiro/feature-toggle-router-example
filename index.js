const { OpenFeature } = require('@openfeature/js-sdk');
const { InMemoryProvider } = require('@openfeature/in-memory-provider');
const { createFeatureFlagRouter } = require('feature-toggle-router');

const FLAG_CONFIGURATION = {
	"sendEmail": false
}

const client = OpenFeature.getClient();

OpenFeature.setProvider(new InMemoryProvider(FLAG_CONFIGURATION));


(async ()=> {

	const sendEmailFFRouter = createFeatureFlagRouter(client, "sendEmail", false)

	await sendEmailFFRouter([
		{flagValue: true, flow: ()=> console.log("Sending email! (it's enabled)")},
		{flagValue: false, flow: ()=> console.log("Email won't be sent :( (feature disabled)")}
	]);

	OpenFeature.close();	
})()
