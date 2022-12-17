
/**
 * 
 * @param {string} date the current Date Of the system
 * @param {city} city the city name
 */

function getTimeOfPrayer(date, city) {
    const query = `${date}?address=${city}&method=04`;
    axios
    .get(`${base_url}/${query}`)
    .then((response) => {
        const timings = response.data.data.timings;
        showBox();
        displayTimeOfPrayer(timings);
        getNextPrayer(timings);
    })
    .catch((error) =>  {
        hideElement("prayer-time", false);
        showAlert("Data not found","alert-danger");
        console.log(error);
        return "data not found";
    });
}

/**
 * 
 * @param {object} data is an object of Prayer timings
 */

function displayTimeOfPrayer(data) {
    const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data;
    fajrTime.textContent = Fajr + " AM";
    dhuhrTime.textContent = Dhuhr + " PM";
    asrTime.textContent = Asr + " PM";
    maghribTime.textContent = Maghrib + " PM";
    ishaTime.textContent = Isha + " PM";
    sunrise.textContent = Sunrise + "AM";
}

/**
 * 
 * @param {object} objectTiming desructing data from object 
 */

const getNextPrayer = ({Fajr, Dhuhr, Asr, Maghrib, Isha}) => {
    let arrayOfPrayerTime = [Fajr, Dhuhr, Asr, Maghrib, Isha];
    counter = setInterval(() => {
            let currentTime = new Date();
            let next = 0;
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
                } 
            } else {
                let dateTomorrow = new Date();
                dateTomorrow.setDate(new Date().getDate() + 1);
                dateTomorrow.setHours(Fajr.split(":")[0], Fajr.split(":")[1], 0);
                diff = dateTomorrow.getTime() - currentTime.getTime();
                removeClassActive(item)
                addClassActive(Fajr);
            }
                CountDown(item, diff);
            });
    }, 1000);
};

/**
 * 
 * @param {*} time is the time of prayer
 * @param {*} diffBetwenDate is the diff between time of prayer and the current time
 */
function CountDown(time,diffBetwenDate) {
    const DaysByHours = 24;
    const hourByMinute = 60;
    const minute = 60;
    const milleSeconde = 1000;

    let hour = Math.floor(
              (diffBetwenDate % (milleSeconde * minute * hourByMinute * DaysByHours) /  (milleSeconde * minute * hourByMinute)) 
            );
    let min = Math.floor((diffBetwenDate % (milleSeconde * minute * hourByMinute) / (milleSeconde * minute)));
    let sec = Math.floor((diffBetwenDate % (milleSeconde * minute) / milleSeconde));
    displayCountDown(time, hour, min, sec);
}


// remove class from box
function removeClassActive() {
    for (let box of boxs) {
        box.classList.remove("active");
        box.firstElementChild.classList.remove("active");
    }
}

/**
 * 
 * @param {number} index is the place of the next Prayer in the array  
 * @param {array} time is array of timings
 */


function addClassActive(time) {
    for (let box of boxs) {
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
        for (let box of boxs) {
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
        showLocalisation.textContent =
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
        getTimeOfPrayer(date, city);
        showMyLocalisation(city, country);
        })
        .catch((error) => {
            showAlert("data not found", "alert-danger");
            throw "data not found";
        });
}


function calculetTimeBetweenIshaAndFajr(timeIsha, timeFajr) {
    let getTimeIsha = new Date();
    getTimeIsha.setHours(timeIsha.split(":")[0], timeIsha.split(":")[1]);
    
    let getTimeFajr = new Date();
    getTimeFajr.setHours(timeFajr.split(":")[0], timeFajr.split(":")[1]);

    let diffBetweenPrayers = getTimeIsha.getTime() - getTimeFajr.getTime();
    let hour = diffBetweenPrayers / 1000 / 60 / 60;
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
        showTime.textContent = `${currentDate.getHours()}:${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()}`;
    }, 1000);
}

function displayDate() {
    showDate.textContent = currentDate.toDateString();
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
        elemnt.classList.remove("hidden");
        return;
    }
    elemnt.classList.add("hidden");
}

// create this function because all the box is hidden by default and show it if response has successfully
function showBox() {
    for(let box of boxs) {
        box.classList.add("show");
    }
}

// validate input
function validateInput () {
    console.log(inputSearch.value)
    if(inputSearch.value === "") {
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
        for (let box of boxs) {
            box.classList.add("hiden");
        }
        resolve();
    }).then((response) => {
        setTimeout(() => {
            for (let box of boxs) {
                box.classList.remove("hiden");
            }
        }, 1000);
    });
}