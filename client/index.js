const quotes = ["I nor go hold leaf I take me hand for was caca",
    "to much ajor na witch",
    "play to win",
    "if you gon do it do it big",
    "as above so below, as within so without",
    "dont be too attached",
    "loyalty over everything",
    "guemel sa bopp",
    "you nor go hate me waise and lek me pieces"]

const activities = ["Go to the Zoo",
    "go to the park",
    "go to the fair",
    "go to the mall",
    "go to library",
    "go for a hike",
    "go ride a bike",
    "go on a trip",
    "go to the beach",
    "go for ice cream",
    "go to the movies",
    "go do some Art"]

const gq = document.getElementById("getQuote");
const quo = document.getElementById("quote");


const ga = document.getElementById("getSug");
const sug = document.getElementById("suggestion");



gq.addEventListener("click", async (event) => {
    const randomNum = Math.floor(Math.random(quotes.length - 1) * 10)
    const randomAc = Math.floor(Math.random(activities.length - 1) * 10)
    const word = quotes[randomNum]
    const act = activities[randomAc]

    if (randomNum < quotes.length) {
        quo.innerHTML = `${word}`
    }




})

ga.addEventListener("click", async (event) => {
    const randomNum = Math.floor(Math.random(quotes.length - 1) * 10)
    const randomAc = Math.floor(Math.random(activities.length - 1) * 10)
    const word = quotes[randomNum]
    const act = activities[randomAc]

    if (randomAc < activities.length) {
        sug.innerHTML = `${act}`

    }



})


