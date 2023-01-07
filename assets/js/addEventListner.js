
import * as elm from "./element.js";
import * as fn from "./logic.js";

elm.selectIsoContry.addEventListener("change", function name(params) {
  elm.selectCities.classList.add("active");
  console.log(this.value)
  fn.getCitiesByContries(this.value)
});

elm.selectCities.addEventListener("change", function name(params) {
    fn.fadeIn();
    clearInterval(fn.objVariables.counter);
    fn.getTimeOfPrayer(elm.date, this.value);
})


