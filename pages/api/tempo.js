function tempo(request, response) {

    const apiSecret = process.env.VT_API_KEY
    

  
    const dynamicData = new Date();

    response.json({
        date: dynamicData.toGMTString(),
    })
}



export default tempo;