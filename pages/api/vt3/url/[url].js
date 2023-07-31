import axios from 'axios';


export default function main(request,response) {

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
      
      
    
    
    if(Array.isArray(rpsn.data.data.attributes.threat_names) && rpsn.data.data.attributes.threat_names.length > 0) {
      
      response.json({
        type: rpsn.data.data.attributes.threat_names

    })
    } else {
      response.json({
        noMalware: "No bad result found"
      })
    }

    
  }
})
  .catch(function (error) {
    console.error("a error ocurred" + error);
    response.json({
      erro: error
    })
  });
    
  


}
