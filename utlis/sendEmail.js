export async function sendEmail(body, env) {
  const data = {
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
  };

  return fetch(`https://api.mailjet.com/v3.1/send`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${env.MJ_APIKEY_PUBLIC}:${env.MJ_APIKEY_PRIVATE}`),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
