function tempo(request, response) {
    const dynamicData = new Date();

    response.json({
        date: dynamicData.toGMTString()
    })
}



export default tempo;