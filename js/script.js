"use strict";

const form = document.querySelector(".calculator-form");
const inputAmount = document.querySelector("#bill");
const inputPeople = document.querySelector("#people");
const inputPerc = document.querySelector(".perc-input");
const tipBox = document.querySelector(".tip-box-container");
const tipBoxButtons = document.querySelectorAll(".tip-box-button");
const amountFields = document.querySelectorAll(".amount");
const resetBtn = document.querySelector(".btn-reset");

let percentage = 0;

// getting tip from options
tipBox.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("tip-box-button")) {
    inputPerc.value = "";
    tipBoxButtons.forEach((el) =>
      el !== e.target ? el.classList.remove("active") : null
    );
    e.target.classList.toggle("active");
    percentage = +e.target.innerText.replace("%", "");
    console.log(percentage);
  }
});

//
inputPerc.addEventListener("focusin", (e) => {
  tipBoxButtons.forEach((el) => el.classList.remove("active"));
});

// upddting the dom
const showCalcedResult = ([amount, personCount]) => {
  const tipAmount = amount * (percentage / 100);
  const totalAmount = tipAmount * personCount;

  const [showTipEl, showTotalEl] = amountFields;

  showTipEl.innerText = tipAmount % 1 !== 0 ? tipAmount.toFixed(2) : tipAmount;
  showTotalEl.innerText =
    totalAmount % 1 !== 0 ? totalAmount.toFixed(2) : totalAmount;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (resetBtn.classList.contains("disabled"))
    resetBtn.classList.remove("disabled");
  if (inputPerc.value) {
    percentage = inputPerc.value;
  }
  if (!percentage && !inputPerc.value) {
    alert("please select or add a percentage value");
  }
  const amount = +inputAmount.value;
  const personCount = +inputPeople.value;

  showCalcedResult([amount, personCount]);
});

resetBtn.addEventListener("click", (e) => {
  if (!resetBtn.classList.contains("disabled")) {
    inputAmount.value = "";
    inputPeople.value = "";
    inputPerc.value = "";
    document.querySelector(".active")?.classList.remove("active");
    amountFields.forEach((el) => (el.innerText = "0.00"));
  }
});
