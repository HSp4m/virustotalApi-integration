import axios from 'axios'


export default function main(request,response) {
    const apiSecret = process.env.VT_API_KEY
    const options = {
        method: 'GET',
        url: `https://www.virustotal.com/api/v3/files/${request.query.hash}`,
        headers: {
          accept: 'application/json',
          'x-apikey': `${apiSecret}`
        }
      };
      
      axios
        .request(options)
        .then(function (rpsn) {
            console.log(rpsn.data.data.attributes.popular_threat_classification.suggested_threat_label);
            if(rpsn.data.data.attributes.popular_threat_classification.suggested_threat_label.length > 0) {
                response.json({
                    suggested_threat_label: rpsn.data.data.attributes.popular_threat_classification.suggested_threat_label,
                    fileNames: rpsn.data.data.attributes.names
                })
            }
            else {
                response.json({
                    noThreat: "No threat found",
                    fileNames: rpsn.data.data.attributes.names

                })
            }
          
        })
        .catch(function (error) {
            response.json({
                error: error
            })
            console.log(error);
          
        });
}