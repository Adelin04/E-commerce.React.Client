export const UseFetch = async (url, methodRequest = "GET", body = null) => {
  let response = null;
  let error = null;

  try {
    const responseFetch = await fetch(url, {
      method: methodRequest,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const JSON_response = await responseFetch.json();

    response = JSON_response;
  } catch (err) {
    const newError = err.toString().split(":")[1];
    error = newError;
  }

  return { response, error };
};
