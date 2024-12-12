let btn = document.getElementById('btn');
let inputCountry = document.getElementById('inputCountry');

btn.addEventListener('click', () => {
    let countryName = inputCountry.value.trim();
    let countryInfo = document.getElementById('countryInfo');

    if (!countryName) {
        countryInfo.innerHTML = `<p class="text">The input field cannot be empty</p>`;
        return;
    }

    let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(URL);

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            
            if (data && data.length > 0) {
                countryInfo.innerHTML = `
                    <div class="info-inner">
                        <div class="flag-center"><img src="${data[0].flags.svg}" alt="Flag"></div>
                        <h3 class="title title-center">${data[0].name.common}</h3>
                        <h3 class="title">Capital: <span class="span-title">${data[0].capital ? data[0].capital[0] : 'N/A'}</span></h3>
                        <h3 class="title">Language: <span class="span-title">${Object.values(data[0].languages).toString().split(",").join(", ")}</span></h3>
                        <h3 class="title">Continents: <span class="span-title">${data[0].continents[0]}</span></h3>
                        <h3 class="title">Currencies: <span class="span-title">${data[0].currencies ? data[0].currencies[Object.keys(data[0].currencies)[0]].name : 'N/A'}</span></h3>
                        <h3 class="title">Population: <span class="span-title">${data[0].population}</span></h3>
                        <h3 class="title">Timezones: <span class="span-title">${data[0].timezones}</span></h3>
                    </div>
                `;
            } else {
                countryInfo.innerHTML = `<p class="text">Country not found. Please check the name.</p>`;
            }
        })
        .catch((error) => {
            console.error('Error fetching country data:', error);
            countryInfo.innerHTML = `<p class="text">There was an error fetching the data. Please try again later.</p>`;
        });

    inputCountry.value = '';
});

inputCountry.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});
