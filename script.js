"use strict";
const quote = document.querySelector(".qoute");
let textPosition = 0;
let flag = true;
let index = 0;
const state = {
  result: [],
};
const getData = async function () {
  try {
    const res = await fetch(`https://api.quotable.io/random`);
    if (!res.ok) throw new Error("Could not get the data");
    const data = await res.json();
    state.result[index] = data.content;
  } catch (err) {
    console.log(err.message);
  }
};

const typeWritter = function () {
  if (flag) {
    getData();
    state.result[index] += "";
    flag = false;
  }

  quote.innerHTML = `${state.result[index].substring(0, textPosition)}I`;
  if (textPosition++ !== state.result[index].length) {
    setTimeout(typeWritter, 100);
  } else {
    state.result[index] = "";
    setTimeout(typeWritter, 4000);
    textPosition = 0;
    flag = true;
  }
};

window.addEventListener("load", typeWritter);
