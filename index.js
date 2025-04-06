const axios = require('axios');
const combinedDataArray = [
  { b: "7405020910170004", a: "3301096402090004" },





]
const submitPukRegistration = async (nik, kk) => {
  try {
    const url = 'https://jupiter-ms-webprereg.xlaxiata.id/submit-registration-puk-non-biometric';

    const headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7',
      'authorization': 'Bearer Ln9YN5trk3UUGHnHXoV8644+QEDWRf8qpLJ0tovzrhQVRjJKzRulyHxNIa8eos0pH7iNIePuPNOxNmY4sRnHZIPEPD7iKAX2Z8Z2qOucrAQ+h6Z98l7GQEoIrDwRTXAD7nLAyRnH9dVwzmidCPSH9dwWBE31I739FGTNKJdqB47NLlbT2AfI80MdaOZO0M0OGbySdPj3xcVsdarJTj159EezE2Buics5OtqdiTDrXBMxMMzpmpTKHobeEypIcXkRZYvyGM6DV/h0WAxBNcoB0eHW7B/qfNNezs9eLThuPF8PcDDDohUUPK0WJl2/UmHkC8sD/lJZViIR+6OO8OAQ+w==',
      'content-type': 'application/json',
      'origin': 'https://www.xlaxiata.co.id',
      'priority': 'u=1, i',
      'referer': 'https://www.xlaxiata.co.id/',
      'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    };

    const data = {
      "msisdn": "6287714452280",
      "nik": nik,
      "kk": kk,
      "puk": "20913407",
      "subscriberID": ""
    };

    const response = await axios.post(url, data, { headers });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting PUK registration:', error);
    throw error;
  }
};


combinedDataArray.map(e => {
  submitPukRegistration(e.a, e.b)
})