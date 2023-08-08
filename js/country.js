const countryName = new URLSearchParams(location.search).get('name');
const countryImg = document.querySelector(".left-model img");
const countryNameH1 = document.querySelector(".right-model h1");
const nativeName1 = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const languages = document.querySelector(".languages");
const currencies = document.querySelector(".currencies");
const borderCountries = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then(res => res.json())
.then(([country]) =>{
    console.log(country)
    countryImg.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-US')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld

    if(country.name.nativeName){
       nativeName1.innerText = Object.values(country.name.nativeName)[0].common
    }else {
        nativeName1.innerText = country.name.common
    }
    if(country.subregion) {
        subRegion.innerText = country.subregion
    }
    if(country.capital) {
        capital.innerText = country.capital?.[0]
    }
    if(country.currencies) {
        currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
    }
    if(country.languages) {
        languages.innerText = Object.values(country.languages).join(', ')
    }

    if(country.borders) {
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(res=>res.json())
            .then(([borderCountry])=>{
                const borderCountryTag = document.createElement('a')
                borderCountryTag.href = `/country.html?name=${borderCountry.name.common}`
                borderCountryTag.innerText = borderCountry.name.common
                console.log(borderCountryTag)
                borderCountries.append(borderCountryTag)
            })
        })
    }
})

const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", e=>{
    document.body.classList.toggle('dark-mode');
    toggle.classList.toggle("dark-mode");
})
