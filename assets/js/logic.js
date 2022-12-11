
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
        nextPrayer(timings);
    })
    .catch((error) =>  {
        hideElement("prayer-time", false);
        showAlert("Data not found","alert-danger");
        return "data not found";
    });
}

/**
 * 
 * @param {string} city name of Client
 */

function showMyLocalisation(city) {
        showLocalisation.textContent =
            city.toLowerCase() === "el jadid" ? city + "a" : city;
}


// show Prayer time by localisation
function displayTimeByLocalisation() {
    // get my adress by ipinfo
    const url = "https://ipinfo.io/json?token=9bf8b3ccdfc63e";
    axios
        .get(url)
        .then((response) => {
        const { city } = response.data;
        getTimeOfPrayer(date, city);
        showMyLocalisation(city);
        })
        .catch((error) => {
            showAlert("data not found", "alert-danger");
            throw "data not found";
        });
}

/**
 * 
 * @param {object} data is an object of Prayer timings
 */

function displayTimeOfPrayer(data) {
    const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data;
    fajrTime.textContent = Fajr + " AM";
    dhuhrTime.textContent = Dhuhr + " PM";
    asrTime.textContent = Asr + " PM";
    maghribTime.textContent = Maghrib + " PM";
    ishaTime.textContent = Isha + " PM";
}


/**
 * 
 * @param {object} timings of the prayer 
 */

function nextPrayer(timings) {
    const {Fajr, Dhuhr, Asr, Maghrib, Isha} = timings;
    let time = [Fajr, Dhuhr, Asr, Maghrib, Isha];
    let getIndexOfPrayer = getNextPrayer(time);
    countDown(time[getIndexOfPrayer]);
    removeAndAddClassActive(getIndexOfPrayer, time);
}
/**
 * 
 * @param {array} time is an array content time 
 */

function countDown(time) {
    let splitTime = time.split(":");
    let timePrayer = new Date().setHours(splitTime[0], splitTime[1], 59);
    let counter = setInterval(() => {
    let timeNow = new Date().getTime();
        let difDate = timePrayer - timeNow;
        let hours = Math.floor(
        (difDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let min = Math.floor((difDate % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((difDate % (1000 * 60 )) / 1000 );
        displayCountDown(time, hours, min, sec)
        if(difDate < 0) {
            clearInterval(counter);
        }
    }, 1000);
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

async function removeAndAddClassActive (index, time) {
    const resolve_1 = await new Promise((resolve, reject) => {
        setTimeout(() => {
            removeClassActive();
        }, 500);
        resolve();
    });
    setTimeout(() => {
        addClassActive(index, time);
    }, 500);
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


function addClassActive(index, time) {
    for (let box of boxs) {
        if (
            box.lastElementChild.textContent.split(" ")[0] === time[index]
        ) {
            box.classList.add("active");
        }
    }
}

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



/**
 * 
 * @param {array} timings is array of timing
 * @returns 
 */

const getNextPrayer = (timings) => {
    //get current datetime in milliseconds
    const now = new Date().getTime();
    //Those variables will store the next prayer and its index
    var next;
    var nextIndex;
    //Loop through prayer array
    timings.map((e, i) => {
        let splitTime = e.split(":");
        //Convert prayer time to milliseconds
        var prayerTimeMilliseconds = new Date().setHours(splitTime[0], splitTime[1]);
        
        var diff = prayerTimeMilliseconds - now;
        //check if prayer time is not past
        if ( diff >= 1) {
        //get index of the smallest prayer time integer
        if (!next || diff < next) {
            next = diff ;
            nextIndex = i;
        }
        } else {
            nextIndex = 0;
        }
    });
    return nextIndex;
};
