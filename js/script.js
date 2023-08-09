const dropDown = document.querySelector(".dropDownMenu");
const dropOptions = document.querySelector(".drop-options");
const toggle = document.querySelector(".toggle");
const countries = document.querySelector(".countries");
const search = document.querySelector(".search")

fetch("https://restcountries.com/v2/all")
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    data.forEach(api=>{
        showCountry(api)
    })
})


function showCountry(data) {
    const {flag, name, population, region, capital} = data
    const country = document.createElement('a');
    country.classList.add('country');
    country.href = `/country.html?name=${name.toLowerCase()}`
    country.innerHTML = `
    <div class="country-img">
        <img src=${flag} alt="">
    </div>
    <div class="country-details">
        <h3 class="country-name">${name}</h3>
        <p><span>Population:</span>${population.toLocaleString('en-US')}</p>
        <p class="region-name"><span>Region:</span>${region}</p>
        <p><span>Capital: </span>${capital}</p>
    </div>
    `
    countries.append(country);
}

const countryName = document.getElementsByClassName("country-name")

search.addEventListener("input", e =>{
    Array.from(countryName).forEach( country => {
        if(country.innerText.toLowerCase().includes(search.value.toLowerCase())){
            country.parentElement.parentElement.style.display = "grid"
        }else {
            country.parentElement.parentElement.style.display = "none"
        }
    })
})

const regions = document.querySelectorAll(".regions");
const regionName = document.getElementsByClassName("region-name");

regions.forEach(region => {
    region.addEventListener("click", () => {
        Array.from(regionName).forEach(element => {
            if(element.innerText.includes(region.innerText) || region.innerText === "All"){
                element.parentElement.parentElement.style.display = "grid";
            } else {
                element.parentElement.parentElement.style.display = "none";
            }
        });
    });
});

toggle.addEventListener("click", e=>{
    document.body.classList.toggle('dark-mode');
    toggle.classList.toggle("dark-mode");
})

dropDown.addEventListener("click", e=>{
    dropOptions.classList.toggle("show-options");
})
