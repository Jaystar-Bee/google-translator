//Variables
let availableLangages = []
let actionValue
getLanguages()

async function getLanguages() {
    try {
        console.log("getting Languages")
        const languageOptions = {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                'X-RapidAPI-Key': '03b98de00emshe818d1c9f03b075p153651jsnd9fe0b924ed5'
            }
        };
        let newHtml
        html = `<option value="%value%">%option%</option>`

        const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', languageOptions)

        const responseData = await response.json()
        const languages = responseData.data.languages
        for (lang in languages) {
            const newLangauge = languages[lang].language
            availableLangages.push(newLangauge)

            newHtml = html.replace('%value%', newLangauge);
            newHtml = newHtml.replace('%option%', newLangauge);

            document.querySelector('#fromSelect').insertAdjacentHTML('beforeend', newHtml);
            document.querySelector('#toSelect').insertAdjacentHTML('beforeend', newHtml);
        }
        console.log(availableLangages)

    } catch (error) {
        console.log(error)
    }
}



document.querySelector('form').addEventListener('submit', submitForm);

// select.addEventListener('change', e => { actionValue = e.target.value })

function submitForm(event) {
    event.preventDefault();
    const actionValue = document.querySelector('#action').value
    console.log(actionValue)
    if (actionValue == 'detect') {
        //Detect the Language
        detect()
    } else if (actionValue == 'translate') {
        //Translate the language
        translate()
    } else {
        //Kill the process
        alert("Please select the action you wan't perform 'Detect/Translate'?" + userInput)
    }
}


async function detect() {
    try {
        const userInput = document.getElementById("userInput").value;
        const resultField = document.querySelector('.result')

        const encodedParams = new URLSearchParams();
        encodedParams.append("q", userInput);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                'X-RapidAPI-Key': '03b98de00emshe818d1c9f03b075p153651jsnd9fe0b924ed5'
            },
            body: encodedParams
        };

        const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options)

        const responseData = await response.json()
        const data = responseData.data.detections[0][0].language
        const html = `<p >The lanuage of the text above is <strong class>${data}</strong></p>
        <p>`
        resultField.insertAdjacentHTML('beforeend', html)

    } catch (error) {
        console.log(error)
        alert('something went wrong')
    }
}

async function translate() {
    try {
        const userInput = document.getElementById("userInput").value;
        const from = document.querySelector('#fromSelect').value
        const to = document.querySelector('#toSelect').value
        console.log(from, to)
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", userInput);
        encodedParams.append("target", to);
        encodedParams.append("source", from);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                'X-RapidAPI-Key': '03b98de00emshe818d1c9f03b075p153651jsnd9fe0b924ed5'
            },
            body: encodedParams
        };

        const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        const responseData = response.json()
        const data = responseData.data.translations[0][0].language
        const html = `<p>${data}</p>`

        resultField.insertAdjacentHTML('beforeend', html)

    } catch (error) {
        console.log(error)
        alert('something went wrong')
    }
}
