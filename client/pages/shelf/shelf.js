const namee = document.getElementById("name");
const birthdate = document.getElementById("birthdate");
const pics = document.getElementById("pics");
const pic = document.getElementById("pic");
const sbtn = document.getElementById("sbtn");

sbtn.addEventListener("click", async () => {

    try {
        const body = new FormData();
        body.append("namee", namee.value);
        body.append("birthdate", birthdate.value);
        body.append("pics", pics.files[0]); // Use 'pics.files' instead of 'pics.file'

        const response = await fetch("http://localhost:5000/shelf", {
            method: "POST",
            body: body
        });
        console.log("yo");
    } catch (error) {
        console.log("cry");
    }
});

const getShelf = document.getElementById("getS");
const shelfname = document.getElementById("sname");
const sBirth = document.getElementById("sbd");

getShelf.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        if (pic.style.display == "none") {
            pic.style.display = "block";
        }
        const response = await fetch("http://localhost:5000/shelf");
        const contentType = response.headers.get("content-type");
        console.log(response);
        console.log(contentType);
        if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json();
            console.log(jsonData);

            jsonData.forEach(element => {
                console.log(pic);
                console.log(element.pic);
                shelfname.innerHTML = `${element.name}`;
                sBirth.innerHTML = `${element.birthdate}`;

                pic.src = `../../images/${element.pic.filename}`;
            });
        } else {
            const textData = await response.text();
            console.log(textData);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
