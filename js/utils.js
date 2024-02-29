
function getData( url ) {
    return new Promise( ( resolve, reject ) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open( 'GET', url );
  
      xhr.send();
  
      xhr.onreadystatechange = function () {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            const res = JSON.parse( xhr.response );
            resolve( res )
          } else {
            reject( "Error" )
          }
        }
      }
    } )
}

function getCountry({flags, name, population, continents, capital }){
  return`
      <div class="countries__card">
          <a href="./country.html?name=${name.common}"><img src=${flags.svg} alt="flag-germany"></a>
          <div>
            <p class="countries__card__name">${name.common}</p>
            <p class="countries__card__ppltn">Population: <span>${population}</span></p>
            <p class="countries__card__region">Region: <span>${continents}</span></p>
            <p class="countries__card__capital">Capital: <span>${capital}</span></p>
          </div>
      </div>
  `
}


