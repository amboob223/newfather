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
