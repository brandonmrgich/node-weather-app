const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg-1')
const msg2 = document.getElementById('msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Searching for \"' + location + '\"'
    msg2.textContent = ''

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.err) { 
                msg1.textContent = data.err
                msg2.textContent = ''
            }
            else {
                msg1.textContent = data.location
                msg2.textContent = data.description + ', ' + data.temperature
            }
        })
    })
})