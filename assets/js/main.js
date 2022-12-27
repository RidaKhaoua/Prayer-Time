const currentDate = new Date();

//  date format DD-MM-YYY
const date =
  currentDate.toLocaleDateString("en-US", { day: "numeric" }) +
  "-" +
  currentDate.toLocaleDateString("en-US", { month: "short" }) +
  "-" +
  currentDate.toLocaleDateString("en-US", { year: "numeric" });

// Elements
const prayerTime = document.querySelector(".prayer-time");

const fajrTime = document.querySelector(".box.fajr .time");

const sunrise = document.querySelector(".header .sunrise span.time");

const dhuhrTime = document.querySelector(".box.dhuhr .time");

const asrTime = document.querySelector(".box.asr .time");

const maghribTime = document.querySelector(".box.maghrib .time");

const ishaTime = document.querySelector(".box.isha .time");

const showTime = document.querySelector(".date-time .time");

const showDate = document.querySelector(".date-time .date");

const showLocalisation = document.querySelector(".localisation span");

const inputSearch = document.querySelector(".search input")

const prayerTimeContent = document.querySelector(".prayer-time");

const boxs = [...document.querySelectorAll(".prayer-time .box")];

let counter = 0;

const audioAdhan = document.querySelector(".adhan-audio audio");

const selectIsoContry = document.querySelector("#iso-contry");

const selectCities = document.querySelector("#cities");

let contries;

// URL of API

const base_url = "https://api.aladhan.com/v1/timingsByAddress";

// URL of Contries 
const url_contries = "https://countriesnow.space/api/v0.1/countries";


// triger function 
  getContries();
  displayTimeByLocalisation();

  displayTime();

  displayDate();



window.addEventListener("load", function (params) {
  setTimeout(() => {
    this.document.querySelector(".loader").classList.add("hidden");
  }, 1500);
});



