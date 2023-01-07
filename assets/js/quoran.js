import * as fn from './logic.js';
import * as elm from "./element.js"

fn.getAllSurah();

fn.loader();




elm.buttonNext.addEventListener("click", function name(params) {
   fn.getNextAyah();
   this.classList.add("block");
});

elm.buttonPrev.addEventListener("click", function name(params) {
   fn.getPrevAyah();
   this.classList.add("block");
})

elm.closeQuoran.addEventListener("click", function name(params) {
   fn.closeQuoran();
})
