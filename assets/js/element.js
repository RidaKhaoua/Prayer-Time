export const currentDate = new Date();

//  date format DD-MM-YYY
export const date =
  currentDate.toLocaleDateString("en-US", { day: "numeric" }) +
  "-" +
  currentDate.toLocaleDateString("en-US", { month: "short" }) +
  "-" +
  currentDate.toLocaleDateString("en-US", { year: "numeric" });

// Elements
export const prayerTime = document.querySelector(".prayer-time");

export const fajrTime = document.querySelector(".box.fajr .time");

export const sunrise = document.querySelector(".header .sunrise span.time");

export const dhuhrTime = document.querySelector(".box.dhuhr .time");

export const asrTime = document.querySelector(".box.asr .time");

export const maghribTime = document.querySelector(".box.maghrib .time");

export const ishaTime = document.querySelector(".box.isha .time");

export const showTime = document.querySelector(".date-time .time");

export const showDate = document.querySelector(".date-time .date");

export const showLocalisation = document.querySelector(".localisation span");

export const inputSearch = document.querySelector(".search input");

export const prayerTimeContent = document.querySelector(".prayer-time");

export const boxs = [...document.querySelectorAll(".prayer-time .box")];

 export let contries= 0;

export const audioAdhan = document.querySelector(".adhan-audio audio");

export const selectIsoContry = document.querySelector("#iso-contry");

export const selectCities = document.querySelector("#cities");

export const quoranBoxs = document.querySelector(".quoran .boxs");

export const quoranBody = document.querySelector(".quoran .body .body-text");

export const buttonNext = document.querySelector(".quoran .display-quoran .bottom .next");

export const buttonPrev = document.querySelector(".quoran .display-quoran .bottom .prev");

export const displayQuoran = document.querySelector(".quoran .display-quoran");

export const nameSurah = [...document.querySelectorAll(".quoran .display-quoran .name-surah span")];

export const closeQuoran = document.querySelector(".quoran .display-quoran .close")

// URL of API
export const base_url = "https://api.aladhan.com/v1/timingsByAddress";

// URL of Contries
export const url_contries = "https://countriesnow.space/api/v0.1/countries";

export const url_surah = "https://api.alquran.cloud/v1/surah";