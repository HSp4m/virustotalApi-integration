import axios from 'axios';

export default function main(request,response) {
    const url = request.query.url.replace("/", "%2F");

    const apiSecret = process.env.VT_API_KEY
    const urlBase64 = btoa(request.query.url).replace("==", "");
    
    const options = {
        method: 'GET',
        url: `https://www.virustotal.com/api/v3/urls/${urlBase64}`,
        headers: {
          accept: 'application/json',
          'x-apikey': `${apiSecret}`
        }
      };
  
    const dynamicData = new Date();
    axios
  .request(options)
  .then(function (rpsn) {
    if (typeof rpsn.data === 'object' && rpsn.data !== null) {
      
      
    
     

    response.json({
        date: dynamicData.toGMTString(),
        type: rpsn.data.data.attributes.threat_names

    })
  }
})
  .catch(function (error) {
    console.error("a error ocurred" + error);
    response.json({
      erro: error
    })
  });
    
  


}
