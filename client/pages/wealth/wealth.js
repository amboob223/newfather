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