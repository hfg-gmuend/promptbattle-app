import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY, OPENAI_ORG_ID } from '$env/static/private';

const configuration = new Configuration({
	organization: OPENAI_ORG_ID,
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function createImage(prompt) {
	if (!OPENAI_API_KEY) throw Error('OPENAI_API_KEY missing!');
	if (!prompt) throw Error('Prompt is missing'); //Fix how to do error-stuff in Sveltekit?
	console.log('...Calling Dalle API...');
	const response = await openai.createImage({
		prompt: prompt,
		n: 2,
		size: '1024x1024'
	});
	const imageUrlPublic = response.data.data[0].url;
	return { url: imageUrlPublic };
}
