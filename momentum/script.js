const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  day = document.querySelector('.day'),
  focus = document.querySelector('.focus');
const btnBack = document.querySelector('.btnBack');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btnQuote');
const base = 'assets/images/';
const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const dayTimesArr = ['morning', 'day', 'evening', 'night'];
const showAmPm = true;
let quoteNum = 0;
let dayName = '';
let monthName = '';
let dayTimesNum = '';

function nameDayWeek(dayNumber) {
  switch (dayNumber) {
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
    case 7:
      dayName = 'Sunday';
      break;
    default:
      alert('Error');
  }
  return dayName;
}

function nameMonth(monthNumber) {
  switch (monthNumber) {
    case 0:
      monthName = 'January';
      break;
    case 1:
      monthName = 'February';
      break;
    case 2:
      monthName = 'March';
      break;
    case 3:
      monthName = 'April';
      break;
    case 4:
      monthName = 'May';
      break;
    case 5:
      monthName = 'June';
      break;
    case 6:
      monthName = 'July';
      break;
    case 7:
      monthName = 'August';
      break;
    case 8:
      monthName = 'September';
      break;
    case 9:
      monthName = 'October';
      break;
    case 10:
      monthName = 'November';
      break;
    case 11:
      monthName = 'December';
      break;
    default:
      alert('Error');
  }
  return monthName;
}

function showTime() {
  let today = new Date(),
    date = today.getDate(),
    month = today.getMonth(),
    day = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  
  nameDayWeek(day);
  nameMonth(month);

  time.innerHTML = `${dayName}<span>, </span>${date}<span> </span>${monthName}<br>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  if (min === 0 && sec === 0) {
    document.body.style.backgroundImage =
      `url(assets/images/${dayTimesArr[dayTimesNum]}/${getRandomIntInclusive(1, 20)}.jpg)`;
  }
  
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    min = today.getMinutes(),
    sec = today.getSeconds();

    console.log(typeof min);
    console.log(sec);

  if (hour > 6 && hour < 12) {
    dayTimesNum = 0;
    if (min == 0 && sec == 0) {
      document.body.style.backgroundImage =
      `url(assets/images/morning/${getRandomIntInclusive(1, 20)}.jpg)`;
    }
    document.body.style.backgroundImage =
      `url(assets/images/morning/0${getRandomIntInclusive(1, 20)}.jpg)`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour < 18) {
    dayTimesNum = 1;
    document.body.style.backgroundImage =
      `url('assets/images/day/${getRandomIntInclusive(1, 20)}.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour < 24) {
    dayTimesNum = 2;
    document.body.style.backgroundImage =
    `url(assets/images/evening/${getRandomIntInclusive(1, 20)}.jpg)`;
    greeting.textContent = 'Good Evening, ';
  } else {
    dayTimesNum = 3;
    document.body.style.backgroundImage =
    `url(assets/images/night/${getRandomIntInclusive(1, 20)}.jpg)`;
    greeting.textContent = 'Good night, ';
  }
}

function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (!e.target.innerText.trim()) {
        name.textContent = localStorage.getItem('name');
        name.blur();
      } else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (!e.target.innerText.trim()) {
        focus.textContent = localStorage.getItem('focus');
        focus.blur();
      } else {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

name.addEventListener('click', () => {
  console.log(name.textContent);
  name.textContent = '';
  name.addEventListener('keypress', setName);
})

focus.addEventListener('click', () => {
  console.log(focus.textContent);
  focus.textContent = '';
  focus.addEventListener('keypress', setFocus);
})

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
setBgGreet();
getName();
getFocus();

async function getWeather() {
  console.log('getWeather');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&APPID=89e63bd269afc9bce0df9ce74c3ef12c&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  if (data.cod === '404') {
    alert('Sorry, there is no city with this name, check the correctness of the request.');
    temperature.textContent = ``;
    humidity.textContent = ``;
    wind.textContent = ``;
    weatherDescription.textContent = ``;
  }
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  weatherDescription.textContent = data.weather[0].description;
}


function Weather() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
    city.textContent = 'Minsk';
  } else {
    city.textContent = localStorage.getItem('city');
  }
  getWeather();
}

function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      console.log('keypress');
      if (!e.target.innerText.trim()) {
        city.textContent = localStorage.getItem('city');
        Weather();
        city.blur();
      } else {
        localStorage.setItem('city', e.target.innerText);
        Weather();
        city.blur();
      }
    }
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

city.addEventListener('click', () => {
  city.textContent = '';
  city.addEventListener('keypress', setCity);
})

document.addEventListener('DOMContentLoaded', Weather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

async function getQuote() {  
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  const data = await res.json(); 
  quoteNum = getRandomIntInclusive(0, 1643);
  blockquote.textContent = data[quoteNum].text;
  figcaption.textContent = data[quoteNum].author;
}
document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  const index = i % images.length;
  const imageSrc = base + dayTimesArr[dayTimesNum] + '/' + images[index];
  viewBgImage(imageSrc);
  i++;
  console.log(imageSrc);
  if (i === 19) {
    dayTimesNum = dayTimesNum + 1;
    i = 0;
    console.log(dayTimesNum);
    if (dayTimesNum === 4) {
      dayTimesNum = 0;
      getImage();
    }
    
  }
  btnBack.disabled = true;
  setTimeout(function() { btnBack.disabled = false }, 1000);
} 

btnBack.addEventListener('click', getImage);

btnQuote.onclick = function() {
  this.classList.toggle('rotate');
}

btnBack.onclick = function() {
  this.classList.toggle('rotate');
}
