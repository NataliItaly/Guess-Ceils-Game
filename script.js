/*-----create table------ */

let ceilsTable = document.querySelector(".ceil-table");
let header = document.querySelector("header");
let ceils = document.querySelectorAll(".ceil");
let widthInput = document.querySelector(".width-choice");
let heightInput = document.querySelector(".height-choice");
let message = document.querySelector(".message");
let randomCeils = [];
let restartBtn = document.querySelector(".restart-btn");

function createTable() {
  let width = Number(widthInput.value);
  let height = Number(heightInput.value);
  for (let i = 0; i < height; i++) {
    let tr = document.createElement("tr");
    ceilsTable.appendChild(tr);
    for (let j = 0; j < width; j++) {
      let td = document.createElement("td");
      td.classList.add("ceil");
      tr.appendChild(td);
    }
  }
  for (let k = 0; k < ceils.length; k++) {
    console.log(k);
    ceils[k].textContent = k + 1;
  }
}

/*------------generate random ceils-------- */

function generateRandomCeils(min, max, num) {
  while (randomCeils.length < num) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomCeils.includes(number)) {
      randomCeils.push(number);
    }
  }

  console.log(randomCeils, randomCeils.length);
  return randomCeils;
}

/*------------set message----------- */

function messageIsVisible() {
  message.classList.add("visible");
  message.textContent = "Bы угадали одну ячейку!";
}

/*-----event on start button-------- */

let chooseCeilsBtn = document.querySelector(".choose-ceils-btn");

chooseCeilsBtn.addEventListener("click", function () {
  if (widthInput.value === "" || heightInput.value === "") {
    alert("Пожалуйста введите размеры таблицы");
  } else {
    header.classList.add("hidden");
    restartBtn.textContent = "Вернуться назад";
    createTable();
    let ceils = document.querySelectorAll(".ceil");
    console.log(ceils);
    for (let i = 0; i < ceils.length; i++) {
      ceils[i].textContent = i + 1;
    }

    let min = 1;
    let max = ceils.length;

    let numberOfRandoms = Math.ceil((ceils.length / 10) * 2);
    console.log(numberOfRandoms);
    generateRandomCeils(min, max, numberOfRandoms);

    let allCeilsGuessed = false;

    for (let j = 0; j < ceils.length; j++) {
      ceils[j].addEventListener("click", function guessCeils(event) {
        console.log(event.target.textContent);
        let index = randomCeils.indexOf(Number(event.target.textContent));
        console.log(index);
        //let timeMessage = setInterval(messageIsVisible, 100);
        if (index !== -1 && randomCeils.length > 1) {
          event.target.classList.add("guessed-ceil");
          randomCeils.splice(index, 1);
          event.target.removeEventListener("click", guessCeils);
          message.textContent = "Bы угадали одну ячейку!";
          alert("Bы угадали одну ячейку!");
          //clearInterval(timeMessage, 1000);
        } else if (index !== -1 && randomCeils.length <= 1) {
          event.target.classList.add("guessed-ceil");
          alert("Bы угадали все ячейки!");
          randomCeils.splice(index, 1);
          allCeilsGuessed = true;
          ceilsTable.style.zIndex = "-1";
          restartBtn.textContent = "играть еще";
          return;
        } else {
          event.target.classList.add("clicked-ceil");
          alert("попробуйте еще раз!");
          event.target.removeEventListener("click", guessCeils);
        }
        if (allCeilsGuessed === true) {
        }
        console.log(randomCeils, randomCeils.length);
      });
    }
  }
});

restartBtn.addEventListener("click", function () {
  header.classList.remove("hidden");
  widthInput.value = "";
  heightInput.value = "";
  let ceils = document.querySelectorAll(".ceil");
  console.log(ceils);
  //ceilsTable.removeChild(ceils);
  for (let ceil of ceils) {
    ceil.remove();
  }
  ceilsTable.style.zIndex = "1";
});
