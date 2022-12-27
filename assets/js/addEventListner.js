selectIsoContry.addEventListener("change", function name(params) {
  selectCities.classList.add("active");
  getCitiesByContries(this.value)
});

selectCities.addEventListener("change", function name(params) {
    fadeIn();
    clearInterval(counter);
    getTimeOfPrayer(currentDate, this.value);
})

