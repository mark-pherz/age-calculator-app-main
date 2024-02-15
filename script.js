function validateInput(element, maxLength) {
  element.value = element.value.replace(/\D/g, "");
  if (element.value.length > maxLength) {
    element.value = element.value.slice(0, maxLength);
  }
}

const button = document.querySelector(".button");
button.addEventListener("click", () => {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  let isValid = true;

  function removeEverything() {
    function removeErrorMessage(input) {
      let errorMessage = input.parentNode.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    }
    function removeErrorBorder(input) {
      if (input.classList.contains("error-border")) {
        input.classList.remove("error-border");
      }
    }
    removeErrorBorder(day);
    removeErrorMessage(day);

    removeErrorBorder(month);
    removeErrorMessage(month);

    removeErrorBorder(year);
    removeErrorMessage(year);

    document.getElementById("day-label").classList.remove("error-label");
    document.getElementById("month-label").classList.remove("error-label");
    document.getElementById("year-label").classList.remove("error-label");

    document.getElementById("output-years").innerText = "--";
    document.getElementById("output-months").innerText = "--";
    document.getElementById("output-days").innerText = "--";
  }

  function validateInputs() {
    if (!day.value) {
      isValid = false;
      day.classList.add("error-border");
      document.getElementById("day-label").classList.add("error-label");
      const message = document.createElement("div");
      message.innerText = "This field is required";
      message.classList.add("error-message");
      day.insertAdjacentElement("afterend", message);
    }

    if (day.value > 31) {
      isValid = false;
      day.classList.add("error-border");
      document.getElementById("day-label").classList.add("error-label");
      const message = document.createElement("div");
      message.innerText = "Must be a valid day";
      message.classList.add("error-message");
      day.insertAdjacentElement("afterend", message);
    }

    if (!month.value) {
      isValid = false;
      month.classList.add("error-border");
      document.getElementById("month-label").classList.add("error-label");
      const message = document.createElement("div");
      message.innerText = "This field is required";
      message.classList.add("error-message");
      month.insertAdjacentElement("afterend", message);
    }

    if (month.value > 12) {
      isValid = false;
      month.classList.add("error-border");
      document.getElementById("month-label").classList.add("error-label");
      const message = document.createElement("div");
      message.innerText = "Must be a valid month";
      message.classList.add("error-message");
      month.insertAdjacentElement("afterend", message);
    }

    if (!year.value) {
      isValid = false;
      year.classList.add("error-border");
      document.getElementById("year-label").classList.add("error-label");
      const message = document.createElement("div");
      message.innerText = "This field is required";
      message.classList.add("error-message");
      year.insertAdjacentElement("afterend", message);
    }

    const currentYear = new Date().getFullYear();

    if (year.value > currentYear) {
      isValid = false;
      year.classList.add("error-border");
      document.getElementById("year-label").classList.add("error-label");
      const message = document.createElement("div");
      message.innerText = "Must be in the past";
      message.classList.add("error-message");
      year.insertAdjacentElement("afterend", message);
    }

    if (isValid) {
      validateDate(day.value, month.value, year.value);
    }
  }

  function validateDate(day, month, year) {
    year = parseInt(year, 10);
    const currentYear = new Date().getFullYear();

    if (year < 100) {
      let lastTwoDigitsCurrentYear = currentYear % 100;
      year +=
        year <= lastTwoDigitsCurrentYear
          ? currentYear - lastTwoDigitsCurrentYear
          : currentYear - lastTwoDigitsCurrentYear - 100;
    }

    let date = new Date(year, month - 1, day);

    if (
      date.getFullYear() === year &&
      date.getMonth() === parseInt(month, 10) - 1 &&
      date.getDate() === parseInt(day, 10)
    ) {
      return true;
    } else {
      isValid = false;
      invalidDateInput();
      return false;
    }
  }

  function invalidDateInput() {
    document.querySelectorAll(".label-text").forEach((label) => {
      label.classList.add("error-label");
    });
    document.querySelectorAll(".input-field").forEach((field) => {
      field.classList.add("error-border");
    });

    if (!document.querySelector(".error-message")) {
      const message = document.createElement("div");
      message.innerText = "Invalid date!!!";
      message.classList.add("error-message");
      document
        .querySelector(".input-field")
        .insertAdjacentElement("afterend", message);
    }
  }

  function calculateDifference(day, month, year) {
    day = parseInt(day, 10);
    month = parseInt(month, 10) - 1;
    year = parseInt(year, 10);

    const now = new Date();
    const nowDay = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const targetDate = new Date(year, month, day);

    const diffInDays = Math.floor((now - targetDate) / (1000 * 60 * 60 * 24));

    let years = nowYear - year;
    let months = nowMonth - month;
    let days = nowDay - day;

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      const daysInPreviousMonth = new Date(nowYear, nowMonth, 0).getDate();
      days += daysInPreviousMonth;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    return {
      years: years,
      months: months,
      days: days,
      diffInDays: diffInDays,
    };
  }
  removeEverything();
  validateInputs();

  if (isValid) {
    const difference = calculateDifference(day.value, month.value, year.value);
    document.getElementById("output-years").innerText = `${difference.years}`;
    document.getElementById("output-months").innerText = `${difference.months}`;
    document.getElementById("output-days").innerText = `${difference.days}`;
  }
});
