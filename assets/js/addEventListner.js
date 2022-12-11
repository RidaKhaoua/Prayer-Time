inputSearch.addEventListener("change", function name(params) {
  if(validateInput()) {
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
      getTimeOfPrayer(currentDate, this.value);
  }
});
