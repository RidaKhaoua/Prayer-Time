inputSearch.addEventListener("change", function name(params) {
  if(validateInput()) {
      fadeIn();

      clearInterval(counter)
      
      getTimeOfPrayer(currentDate, this.value);
  }
});
