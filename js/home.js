const countriesRow = document.querySelector('.countries__row');
const countriesQuantity = document.querySelector('.country-quantity');
const searchInput = document.querySelector('#search');
const pagination = document.querySelector('.pagination');

let query = new URLSearchParams(location.search);
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

let search = query.get('search') || '';
let activePage = +query.get('page') || 1;


async function getCountries() {
    countriesRow.innerHTML = "";
    let countriesData, countriesTotal;

    if (search) {
        const { data, total } = await getData(`${ENDPOINT}name/${search}?page=${activePage}&limit=${LIMIT}`);
        countriesData = data;
        countriesTotal = total;

        data.forEach(element => {
            countriesRow.innerHTML += getCountry(element)
        });
    } else {
        const { data, total } = await getData(`${ENDPOINT}all?page=${activePage}&limit=${LIMIT}`);
        countriesData = data;
        countriesTotal = total;
        data.forEach(element => {
            countriesRow.innerHTML += getCountry(element)
        });
    }

    let pages = Math.ceil(countriesTotal / LIMIT);

    pagination.innerHTML = `<button onclick="getPage('-')" ${activePage === 1 ? "disabled" : ""} class="pagination-btn">Prew</button>`

    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<button onclick="getPage(${i})" class=" ${i === activePage ? 'pagination-btn-active' : ''} pagination-btn">${i}</button>`
    }

    pagination.innerHTML += `<button onclick="getPage('+')" ${activePage === pages ? "disabled" : ""} class="pagination-btn">Next</button>`

    loader.innerHTML = ''
}

getCountries();

searchInput.addEventListener('keyup', function () {
    search = this.value
    getCountries();
    activePage = 1;
    history.pushState({}, "", `?search=${search}&page=${activePage}&limit=${LIMIT}`)
})

function getPage(i) {
    if (i === '-') {
        activePage--
    } else if (i === '+') {
        activePage++
    } else {
        activePage = i;
    }
    console.log(i);
    getCountries();
    history.pushState({}, "", `?search=${search}&page=${activePage}&limit=${LIMIT}`)
}