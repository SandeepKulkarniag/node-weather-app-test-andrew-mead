console.log("client side javascript file loaded.")



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    const location = search.value
    console.log(location)
       fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        //console.log(response.json())
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ""
                console.log(data.error)
            } else {
                messageOne.textContent = data.latitude
                messageTwo.textContent = data.longitude
                console.log(data)
            }

        })

    })
})