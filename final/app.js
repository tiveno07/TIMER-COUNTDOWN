const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDay = new Date(2024, 9, 13, 12, 0, 30); // year, month,date, hour,minute,second,milliseconds
const futureDay = new Date(tempYear, tempMonth, tempDay + 30, 12, 0, 30); // adding to tempDay help to know the particular day
const year = futureDay.getFullYear();
const hours = futureDay.getHours();
const minutes = futureDay.getMinutes();
let month = futureDay.getMonth();
let date = futureDay.getDate();
let weekday = weekdays[futureDay.getDay()];
month = months[month];

giveaway.textContent = `giveaway will end on  the ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in ms
const futureTime = futureDay.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hrs = 60mins
  // 1d = 24hrs

  // values im ms
  const oneday = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  //calculate all values
  let days = t / oneday;
  days = Math.floor(days);
  let hours = Math.floor((t % oneday) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
  }
}

//countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
