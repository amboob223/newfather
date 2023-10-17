
const cryptoName = document.getElementById("cryptoName");
const cryptoPrice = document.getElementById("cryptoPrice");
const stockName = document.getElementById("stockName");
const stockPrice = document.getElementById("stockPrice");

const button = document.getElementById("wbtn");



button.addEventListener("click", async (event) => {

    try {
        event.preventDefault()
        //if we had diffrent types of files we would use the formData

        const body = {
            cryptoName: cryptoName.value,
            cryptoPrice: cryptoPrice.value,
            stockName: stockName.value,
            stockPrice: stockPrice.value
        }

        const response = await fetch("http://localhost:5000/wealth",
            {
                method: "POST",
                headers: { "Content-type": "Application/json" },
                body: JSON.stringify(body)
            });
        console.log("naa")
    } catch (error) {
        console.log("error")
    }
})


const wealth = document.getElementById("getw")

wealth.addEventListener("click", async (event) => {
    event.preventDefault()
    try {
        const data = await fetch("http://localhost:5000/wealth");

        const json = await data.json()
        console.log(json)



        const wealthname = document.createElement("h1");
        const wealthprice = document.createElement("h1");
        const stockPrice = document.createElement("h1");
        const stockname = document.createElement("h1");
        json.map(element => {


            const tide = document.getElementById("tide")
            wealthname.innerHTML = `${element.cryptoname}`
            wealthprice.innerHTML = `${element.cryptoprice}`
            stockPrice.innerHTML = `${element.stockprice}`
            stockname.innerHTML = `${element.stockname}`

            tide.appendChild(wealthname)
            tide.appendChild(wealthprice)
            tide.appendChild(stockname)
            tide.appendChild(stockPrice)
            console.log(element.cryptoname)
        })

    } catch (error) {
        console.log(error)
    }
})