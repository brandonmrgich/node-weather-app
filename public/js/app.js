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
                msg1.textContent = ( 'It is currently ' + data.localTime + ' in: ' + location 
                    + ', ' + data.location + '.' )
                msg2.textContent = ( 'According to the data collected at ' + data.forecastTime 
                    + ' it is ' + data.description + ' at ' + data.temperature + 'f '
                    + ' with a humidity level of ' + data.humidity + '%, and feels like ' 
                    + data.feelsLike + 'f.' )
            }
        })
    })
})           
