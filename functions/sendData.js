import { sendEmail } from '../utlis/sendEmail';

export async function onRequest(context) {
  const { request, env } = context;

  const body = await request.json();

  const response = await sendEmail(body, env);

  return new Response(null, {
    status: response.status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      // CORS
      'Access-Control-Allow-Origin': '*',
      // caching
      Vary: 'Origin',
    },
  });
}
