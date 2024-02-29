const countryFlag = document.querySelector('.country-img')
const countryName = document.querySelector('.country-name')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.country__inner')

let query = new URLSearchParams(location.search)

let countryNameQuery = query.get('name');
const loader = document.querySelector('.loaderr');
loader.innerHTML = `
    <div class="showbox">
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
            <p>Loading...</p>
        </div>
    </div>
`

async function getCountryInfo(){
    let {data , total} = await getData(`${ENDPOINT}name/${countryNameQuery}`)
    data.forEach(el =>{
        countryFlag.src = el.flags.png;
        countryName.textContent = el.name.common;
        nativeName.textContent = el.name.official;
        population.textContent = el.population;
        region.textContent = el.region;
        subRegion.textContent = el.subregion;
        capital.textContent = el.capital;
        domain.textContent = el.tld[0];
        let currs;
        for (const key in el.currencies) {
          currs = key;
        }
        currencies.textContent = el.currencies[currs].name;
        let lang
        for (let key in el.languages) {
            lang = key
            console.log(lang);
        }
        languages.textContent = el.languages.lang;
        for(let i = 0; i < el.borders.length; i++){
            borderCountries.innerHTML += `<button>${el.borders[i]}</button>`
        }
    })
    loader.innerHTML = '';
}

getCountryInfo();