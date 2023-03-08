// Объект с курсами трех валют.
const rates = {};
// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
// Элементы формы, ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();

// Обновление страницы(курса валют)
setInterval(getCurrencies, 10000);

// Функция получения курса валют и отображения их на странице
async function getCurrencies () {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = await response.json();
    
    for (let i = 0; i < data.length; i++) {
        const currency = data[i];
        if (currency.cc === 'USD' || currency.cc === 'EUR' || currency.cc === 'GBP') {
            rates[currency.cc] = {
                rate: currency.rate,
                name: currency.txt
            };
        }
    }
    
    console.log(rates);

    elementUSD.textContent = rates.USD.rate.toFixed(2);
    elementEUR.textContent = rates.EUR.rate.toFixed(2);
    elementGBP.textContent = rates.GBP.rate.toFixed(2);

    // Цвет для информера USD
    if (rates.USD.rate > rates.USD.prev) {
        elementUSD.classList.add('top'); 
    } else {
        elementUSD.classList.add('bottom');
    }

    // ЦВет для информера EUR
    if (rates.EUR.rate > rates.EUR.prev) {
        elementEUR.classList.add('top'); 
    } else {
        elementEUR.classList.add('bottom');
    }

    // ЦВет для информера GBP
    if (rates.GBP.rate > rates.GBP.prev) {
        elementGBP.classList.add('top'); 
    } else {
        elementGBP.classList.add('bottom');
    }
}

// Слушаем изменения в текстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;

// Функция конвертации
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].rate).toFixed(2);
}
