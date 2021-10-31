const END_POINT = 'https://olegk.site';

export function* doFetch({method = 'GET', url, data}) {
  const fullPath = END_POINT + url;
  try {
    let response = yield fetch(fullPath, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    response = yield response.json();
    return {data: response};
  } catch (error) {
    return error;
  }
}
