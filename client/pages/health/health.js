//the health
//we got to have a breast feeding alarm 
// all the doctors  numbers and shot records
// next appointment alarm 



const doctorName = document.getElementById("doctorName");
const doctorNum = document.getElementById("doctorNum");
const appointments = document.getElementById("appointments");
const feedtimes = document.getElementById("feedtimes");
const diaperCount = document.getElementById("diaperCount");

//button 
const hbtn = document.getElementById("hbtn");

hbtn.addEventListener("click", async (event) => {

    try {
        event.preventDefault()
        // we got to make an array tuype for the sql data
        const apar = [appointments.value]
        const fear = [feedtimes.value]


        const body = {
            doctorName: doctorName.value,
            doctorNum: doctorNum.value,
            appointments: apar,
            feedtimes: fear,
            diaperCount: diaperCount.value
        }

        const response = await fetch("http://localhost:5000/health", {
            method: "POST",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify(body)
        })

        console.log("good")
    } catch (error) {
        console.log(error)
    }
});


const getFeed = document.querySelector(".getfeed")  // this will be one initial times an dwe increase by three hours for the day 
getFeed.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const dname = document.getElementById("dName");
        const dNum = document.getElementById("dNumber");
        const feed = document.getElementById("feed");
        const table = document.getElementById("table");
        const rows = document.getElementById("row");



        const data = await fetch("http://localhost:5000/health")
        const json = await data.json()

        json.map(item => {
            console.log(item)
            rows.innerHTML = ""

            const num = item.feedtimes // this is an array but we treating this as a number 


            num.map(element => {

                const nn = parseInt(element) // this is the shit in the array

                const times = adder(nn)//we need this method to return an array 

                for (let i = 0; i < times.length; i++) {


                    const data = document.createElement("td");

                    data.innerHTML = times[i]

                    rows.appendChild(data)
                    table.appendChild(rows)

                }



            })

        });



    } catch (error) {
        console.log(error)
    }
});

function adder(num) {
    let result = num; // Start with the initial value
    let keep = [];

    for (let i = 0; i < 12; i++) {
        result += 2;
        result %= 24; // Use modulo to keep the result within the range 0-23
        keep.push(result);
    }

    return keep;
}




//053