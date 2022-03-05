const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  // get request body
  const body = await request.json();

  mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'youkousai@gmail.com',
          Name: 'hello',
        },
        To: [
          {
            Email: 'youkousai@gmail.com',
            Name: 'hello world',
          },
        ],
        Subject: '来自片Test网站的信息',
        HTMLPart: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <link rel="stylesheet" href="css/styles.css?v=1.0">
          </head>
  
          <body>
            <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
                  </div>
                  <div class="container" style="margin-left: 20px;margin-right: 20px;">
                  <h2>${body.name}から新しいメールが届いています。</h2>
                  <div style="font-size: 16px;">
                  <p>お客さんのお名前:</p>
                  <p style="font-size:20px; font-weight:bold;">${body.name}</p>
                  <p>お客さんのメール:</p>
                  <p style="font-size:20px; font-weight:bold;">${body.email}</p>
                  <p>お客さんの電話番号:</p>
                  <p style="font-size:20px; font-weight:bold;">${body.phone}</p>
                  <p>お客さんの住所:</p>
                  <p style="font-size:20px; font-weight:bold;">${body.address}</p>
                  <p>お客さんのご用件:</p>
                  <p style="font-size:20px; font-weight:bold;">${body.message}</p>
                  <br>
                  </div>
                  </div>
          </body>
          </html>`,
      },
    ],
  });

  return new Response(null, { status: 200 });
}
