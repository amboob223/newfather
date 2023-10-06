const namee = document.getElementById("name");
const birthdate = document.getElementById("birthdate");
const pics = document.getElementById("pics");

const sbtn = document.getElementById("sbtn");

sbtn.addEventListener("click", async () => {
    try {
        const body = new FormData();
        body.append("namee", namee.value);
        body.append("birthdate", birthdate.value)
        body.append("pics", pics.files[0])

        const response = await fetch("http://localhost:5000/shelf", {
            method: "POST",
            body: body
        });
        console.log("yo")
    } catch (error) {
        console.log("cry")
    }
});

const getShelf = document.getElementById("getS");



getShelf.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/shelf");
        const contentType = response.headers.get("content-type");
        console.log(response);

        if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json();
            console.log(jsonData)

            jsonData.forEach(element => {
                const pic = document.getElementById("pic");
                console.log(pic)
                console.log(element.pic)
                pic.src = `/Users/playabook/Desktop/sept/pop/server/images/${element.pic.filename}`

            });
        } else {
            const textData = await response.text();
            console.log(textData);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
