export default async function axiosRetry(
  url: string,
  responseStatus: boolean,
  delay: number,
  nbRetry: number
) {
  var response = await axios.get(url);
  nbRetry--;
  if (nbRetry > 0) {
    if (response && (responseStatus === response.data.success)) {
      return response;
    }
    else {
      setTimeout(async () => {
        await axiosRetry(url, responseStatus, delay, nbRetry);
      }, delay);
    }
  }
  else throw 'Fetch retry limit reached';
}