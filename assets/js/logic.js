
import * as all from "./element.js"

// variables 
let indexAyah;

function getContries() {
    axios.get(`${all.url_contries}/flag/unicode`)
        .then(response => {
            const data = response.data.data;
            displayIsoContries(data);
        })
        .catch(error => console.error(error))
}

/**
 * 
 * @param {object} data contain data of contries  
 * @returns 
 */

function displayIsoContries(data){
    return data.map(item => {
        const option = document.createElement("option");
        option.value = item.iso2;
        const flage = document.createElement("span");
        flage.textContent = item.unicodeFlag;
        option.appendChild(flage);
        const nameContry = document.createElement("span");
        nameContry.textContent = item.name;
        option.appendChild(nameContry)
        all.selectIsoContry.appendChild(option);
    })
}

/**
 * 
 * @param {string} nameContry 
 */

function getCitiesByContries(nameContry) {
    let res;
    all.selectCities.textContent = "";
    axios.get(all.url_contries)
    .then(response =>{
        const {data} = response.data;
        console.log(data);
        for(let item of data) {
            if(item.iso2 === nameContry) {
                res = item.cities; // store array of cities
            }
        }
        
        res.map(item => {
            const option = document.createElement("option");
            option.textContent = item;
            all.selectCities.appendChild(option);
        })
    });

}


/**
 * 
 * @param {string} date the current Date Of the system
 * @param {city} city the city name
 */

function getTimeOfPrayer(date, city) {
    const query = `${date}?address=${city}&method=04`;
    axios
    .get(`${all.base_url}/${query}`)
    .then((response) => {
        const timings = response.data.data.timings;
        hideElement("prayer-time", false);
        showBox();
        displayTimeOfPrayer(timings);
        getNextPrayer(timings);

    })
    .catch((error) =>  {
        hideElement("prayer-time", true);
        showAlert("Data not found","alert-danger");
        console.error(error);
        return "data not found";
    });
}

/**
 * 
 * @param {object} data is an object of Prayer timings
 */

function displayTimeOfPrayer(data) {
    const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data;
    all.fajrTime.textContent = Fajr + " AM";
    all.dhuhrTime.textContent = Dhuhr + " PM";
    all.asrTime.textContent = Asr + " PM";
    all.maghribTime.textContent = Maghrib + " PM";
    all.ishaTime.textContent = Isha + " PM";
    all.sunrise.textContent = Sunrise + "AM";
}

/**
 * 
 * @param {object} objectTiming desructing data from object 
 */
export let objVariables = {
   counter: 0,
 };
const getNextPrayer = ({Fajr, Dhuhr, Asr, Maghrib, Isha}) => {
    let arrayOfPrayerTime = [Fajr, Dhuhr, Asr, Maghrib, Isha];
    objVariables.counter = setInterval(() => {
            let currentTime = new Date();
            let next = 0;
            let nextIndex = 0;
            arrayOfPrayerTime.map((item, index) => {
            let splitTime = item.split(":");
            let prayerTime = new Date();
            prayerTime.setHours(splitTime[0], splitTime[1],0);
            let diff = prayerTime.getTime() - currentTime.getTime();
            if (diff >= 1) {
                if (!next || diff < next) {
                next = diff;
                    removeClassActive(item)
                    addClassActive(item);
                    nextIndex = index;
                } 
            } else {
                let dateTomorrow = new Date();
                dateTomorrow.setDate(new Date().getDate() + 1);
                dateTomorrow.setHours(Fajr.split(":")[0], Fajr.split(":")[1], 0);
                diff = dateTomorrow.getTime() - currentTime.getTime();
                removeClassActive(item)
                addClassActive(Fajr);
            }
                CountDown(item, diff, index);
            });
    }, 1000);
};

/**
 * 
 * @param {*} time is the time of prayer
 * @param {*} diffBetwenDate is the diff between time of prayer and the current time
 * @param {*} index is the index of current prayer

*/

function CountDown(time,diffBetwenDate, index) {
    const DaysByHours = 24;
    const hourByMinute = 60;
    const minute = 60;
    const milleSeconde = 1000;

    let hour = Math.floor(
              (diffBetwenDate % (milleSeconde * minute * hourByMinute * DaysByHours) /  (milleSeconde * minute * hourByMinute)) 
            );
    let min = Math.floor((diffBetwenDate % (milleSeconde * minute * hourByMinute) / (milleSeconde * minute)));
    let sec = Math.floor((diffBetwenDate % (milleSeconde * minute) / milleSeconde));
    if(hour == 0 && min === 0 && sec === 0) {
        showNotification(index);
    }
    displayCountDown(time, hour, min, sec);
}


// remove class from box
function removeClassActive() {
    for (let box of all.boxs) {
        box.classList.remove("active");
        box.firstElementChild.classList.remove("active");
    }
}

/**
 * 
 * @param {*} time is the time of prayer
 */

function addClassActive(time) {
    for (let box of all.boxs) {
        if (
            box.lastElementChild.textContent.split(" ")[0] === time
        ) {
            box.classList.add("active");
        }
    }
}



/**
 * 
 * @param {array} time is an array content time 
 * @param {number} hours 
 * @param {number} min 
 * @param {number} sec 
 */

function  displayCountDown(time,hours, min, sec) {
        for (let box of all.boxs) {
            if (box.lastElementChild.textContent.split(" ")[0] === time ) {
                    box.children[2].textContent = formatTime(hours, min, sec);
            }
        }
}



/**
 * 
 * @param {string} city name of Client
 */

function showMyLocalisation(city, country) {
        all.showLocalisation.textContent =
            city.toLowerCase() === "el jadid" ? `${city}a, ${country}` : `${city}, ${country}`;
}


// show Prayer time by localisation
function displayTimeByLocalisation() {
    // get my adress by ipinfo
    const url = "https://ipinfo.io/json?token=9bf8b3ccdfc63e";
    axios
        .get(url)
        .then((response) => {
        const { city, country } = response.data;
        getTimeOfPrayer(all.date, city);
        showMyLocalisation(city, country);
        })
        .catch((error) => {
            showAlert("data not found", "alert-danger");
            console.log(error)
            throw "data not found";
        });
}


/**
 * 
 * @param {number} h is hours 
 * @param {number} m is min
 * @param {number} s is sec
 * @returns 
 */

function formatTime(h, m, s) {
    let hours = h < 10 ? "0" + h : h;
    let min = m < 10 ? "0" + m : m;
    let sec = s < 10 ? "0" + s : s

    return `${hours} : ${min} : ${sec}`;
}

/**
 * 
 * @param {number} index is the place of the next Prayer in the array  
 * @param {array} time is array of timings
 */




// show time 
function displayTime() {
    setInterval(() => {
        const currentDate = new Date();
        all.showTime.textContent = `${currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours() }
        :${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()}`;
    }, 1000);
}

function displayDate() {
    all.showDate.textContent = all.currentDate.toDateString();
}


/**
 * 
 * @param {string} msg   
 * @param {string} colorOfAlert 
 */

function showAlert(msg, colorOfAlert) {
    const alertCard = document.querySelector(".card-alert");
    alertCard.classList.add(`${colorOfAlert}`);
    alertCard.textContent = msg;
    alertCard.classList.add("show");
    setTimeout(() => {
        alertCard.classList.remove("show");
    }, 2500);
}

/**
 * 
 * @param {*} nameElement name of specific element 
 * @param {boolean} isShow show element by true or false 
 * @returns 
 */

function hideElement(nameElement, isShow) {
    const elemnt = document.querySelector(`.${nameElement}`);
    if(isShow) {
        elemnt.classList.add("hidden");
        return;
    }
    elemnt.classList.remove("hidden");
}

// create this function because all the box is hidden by default and show it if response has successfully
function showBox() {
    for(let box of all.boxs) {
        box.classList.add("show");
    }
}

// validate input
function validateInput () {
    if(inputSearch.value === "" && inputSearch.value.length >=2) {
        showAlert("the field can not be empty", "alert-danger")
        return false;
    } else {
        hideElement("prayer-time", true)
    }
    return true;
}

// hide and show boxs
function fadeIn() {
    new Promise(function (resolve, reject) {
        for (let box of all.boxs) {
            box.classList.add("hiden");
        }
        resolve();
    }).then((response) => {
        setTimeout(() => {
            for (let box of all.boxs) {
                box.classList.remove("hiden");
            }
        }, 1000);
    });
}

/**
 * 
 * @param {number} index of current prayer 
*/

function showNotification(index) {
    const salateNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    // check permission of user if the autrosation is granted
    Notification.requestPermission().then(perm => {
        if(perm === "granted") {
            const notification = new Notification("Prayer Time", {
                body: `Prayer Now is: ${salateNames[index]}`,
                icon: "../../assets/images/icon-adhan.png",
                tag: "start adhan",
                requireInteraction: true,
            });
            startAdhan();
            
            notification.addEventListener("close", (e) => {
                pauseAdhan();
            })
        }
    })
}


function startAdhan() {
    audioAdhan.play();
}

function pauseAdhan() {
    audioAdhan.pause();
}


// function get All surah
function getAllSurah() {
    axios.get(all.url_surah)
        .then(response => displaySurah(response.data.data))
        .catch(error => console.log(error))
}

/**
 * 
 * @param {object} data is array of surahs  
 * @returns 
 */

function displaySurah(data) {
    try {
        return data.map((item) => {
            const { number, englishName, englishNameTranslation } = item;
            const box = document.createElement("div");
            box.className = "box";
            box.dataset.number = number;
            const boxTop = document.createElement("div");
            boxTop.className = "box-top";
            const numberSurah = document.createElement("div");
            numberSurah.className = "number-surah";
            numberSurah.textContent = number;
            boxTop.appendChild(numberSurah);
            const favSurah = document.createElement("div");
            favSurah.className = "fav-surah";
            const iconFav = document.createElement("i");
            iconFav.className ="fa-regular fa-heart";
            favSurah.appendChild(iconFav);
            boxTop.appendChild(favSurah);
            box.appendChild(boxTop)
            const boxBottom = document.createElement("div");
            boxBottom.className = "box-bottom";
            const nameSurah = document.createElement("p");
            nameSurah.className = "name-surah";
            nameSurah.textContent = englishName;
            boxBottom.appendChild(nameSurah);
            const nameSurahTranslate = document.createElement("p");
            nameSurahTranslate.textContent = englishNameTranslation;
            boxBottom.appendChild(nameSurahTranslate);
            box.appendChild(boxBottom);
            box.addEventListener("click", function name(params) {
                getSurah(this.dataset.number);
                all.displayQuoran.classList.add("active");
                indexAyah = +this.dataset.number;
            })
            all.quoranBoxs.appendChild(box);
        });
    } catch (error) {
        console.log(error);
    }

}

/**
 * 
 * @param {int} number get surah by number 
 */
function getSurah(number) {
    
    const url = `http://api.alquran.cloud/v1/surah/${number}/ar.alafasy`;
    axios.get(url)
        .then(response => {
            displaySpesifiqueSurah(response.data.data.ayahs);
            dispplayNameOfSorah(response.data.data);
            setTimeout(() => {
                all.buttonNext.classList.remove("block");
                all.buttonPrev.classList.remove("block");
            }, 1000);
        })
        .catch(error => console.log(error));
}

/**
 * 
 * @param {object} data get text of surah
 */

function displaySpesifiqueSurah(data) {
    all.quoranBody.textContent = "";
    try {
        data.map((item) => (all.quoranBody.textContent += item.text + " "));
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} data get name of surah
 */

function dispplayNameOfSorah(data) {
    try {
        all.nameSurah.map(item => {
            item.textContent = "";
            item.textContent = data.name
        })
    } catch (error) {
        console.log(error);
    }
}

function  showQuoran() {
    all.displayQuoran.classList.remove("active");
}

function closeQuoran() {
    all.displayQuoran.classList.remove("active");
}

function getNextAyah() {
    const numberOfAyah = 604;
    indexAyah +=1;
    if (indexAyah <= numberOfAyah) {
        getSurah(indexAyah);
    }
}

function getPrevAyah() {
    if(indexAyah > 1) {
        indexAyah -=1;
        getSurah(indexAyah);
    }
}

function loader() {
    window.addEventListener("load", function (params) {
        setTimeout(() => {
            this.document.querySelector(".loader").classList.add("hidden");
        }, 1500);
    });
}

export {
    getContries,
    displayTimeByLocalisation,
    displayTime,
    displayDate,
    getAllSurah,
    getCitiesByContries, 
    fadeIn,
    getTimeOfPrayer,
    loader,
    getSurah,
    closeQuoran,
    getNextAyah,
    getPrevAyah
}