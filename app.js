const express = require('express')
const data = require("./data.json")
const app = express();
const PORT = 5050

app.use(express.json())

app.get("/records", async (req, res, next) => {
    let { page, size } = req.query;
    page = parseInt(page)
    size = parseInt(size)
    if(!page){
        page=1
    }

    if(!size){
        size=10
    }

    const start = (page - 1) * size
    const end = page * size
    let result = data.slice(start, end)
    const ids = result.map((item) => item.id)
    const Open = result.filter((item) => item.disposition == "open")
    let close = []
    result.forEach((item) => {
        
        if(item.disposition == "closed"){
            let obj = {}
            obj.disposition = item.disposition,
            obj.color = item.color
            close.push(obj)
            console.log(close)
        }
    })

    const nextPage = {
        page: page <= data.length ?  page + 1 : null,
        size
    }
    const previousPage = {
        page: page === 1 ? null : page - 1,
        size
    }

    res.status(200).json({result, ids, Open,close,  nextPage, previousPage})
})







app.listen(PORT,  () => {
    console.log(`Server Started on Port ${PORT}`);
});