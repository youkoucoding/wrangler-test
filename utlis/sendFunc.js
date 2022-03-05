const endpoint_dev = '/send';
const endpoint_prod = '/send';

const production = process.env.NODE_ENV === 'production';

const sendFunc = (formData) => {
  let endpoint = production ? endpoint_prod : endpoint_dev;

  return fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: formData.message,
    }),
  });
};

export default sendFunc;
