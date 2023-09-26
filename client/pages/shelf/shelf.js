const namee = document.getElementById("name");
const birthdate = document.getElementById("birthdate");
const pics = document.getElementById("pics");

const sbtn = document.getElementById("sbtn");

sbtn.addEventListener("click", async () => {
    try {


        //we got to use the form data object becuase doiffrent type of filkes 
        const body = new FormData();

        body.append("namee", namee.value);
        body.append("birthdate", birthdate.value)
        body.append("pics", pics.files[0])


        const response = await fetch("http://localhost:5000/shelf",
            {
                method: "POST",
                body: body
            })
        console.log("fly")
    } catch (error) {
        console.log("cry")
    }
});