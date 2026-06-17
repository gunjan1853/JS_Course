
document.addEventListener("DOMContentLoaded", function () {


    var dobInput        = document.getElementById("dobInput");
    var errorMessage    = document.getElementById("errorMessage");
    var resultCard      = document.getElementById("resultCard");
    var dateValue       = document.getElementById("dateValue");

    var yearsDisplay    = document.getElementById("yearsDisplay");
    var monthsDisplay   = document.getElementById("monthsDisplay");
    var daysDisplay     = document.getElementById("daysDisplay");

    var daysLived       = document.getElementById("daysLived");
    var nextBirthday    = document.getElementById("nextBirthday");
    var ageCategory     = document.getElementById("ageCategory");
    var birthdayWish    = document.getElementById("birthdayWish");

    var calcBtn         = document.getElementById("calcBtn");
    var resetBtn        = document.getElementById("resetBtn");
    var themeToggle     = document.getElementById("themeToggle");


    function updateTodayDate() {

        var currentDate = new Date();

  
        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var day   = currentDate.getDate();
        var month = monthNames[currentDate.getMonth()];
        var year  = currentDate.getFullYear();

  
        dateValue.textContent = day + " " + month + " " + year;
    }


    updateTodayDate();


    function setMaxDate() {
        var today = new Date();
        var yyyy  = today.getFullYear();
        var mm    = String(today.getMonth() + 1).padStart(2, "0");
        var dd    = String(today.getDate()).padStart(2, "0");
        dobInput.setAttribute("max", yyyy + "-" + mm + "-" + dd);
    }

    setMaxDate();

    function calculateAge(birthDate) {

        var currentDate = new Date();

    
        var birthYear  = birthDate.getFullYear();
        var birthMonth = birthDate.getMonth();
        var birthDay   = birthDate.getDate();

        var currentYear  = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var currentDay   = currentDate.getDate();

      
        var ageYear = currentYear - birthYear;


        var ageMonth = currentMonth - birthMonth;

        if (currentMonth < birthMonth) {
            ageYear  = ageYear - 1;
            ageMonth = currentMonth + 12 - birthMonth;
        }


        var ageDay = currentDay - birthDay;

        if (currentDay < birthDay) {


            var prevMonth = currentMonth - 1;


            if (prevMonth < 0) {
                prevMonth = 11;
            }

            var daysInPrevMonth = new Date(currentYear, prevMonth + 1, 0).getDate();

            ageDay   = currentDay + daysInPrevMonth - birthDay;
            ageMonth = ageMonth - 1;

            if (ageMonth < 0) {
                ageMonth = ageMonth + 12;
                ageYear  = ageYear - 1;
            }
        }

        return {
            years:  ageYear,
            months: ageMonth,
            days:   ageDay
        };
    }



    function getDaysLivedCount(birthDate) {

        var currentDate = new Date();

        var diffInMs = currentDate - birthDate;

        var days = Math.floor(diffInMs / 86400000);

        return days;
    }


    function getNextBirthdayCount(birthDate) {

        var currentDate = new Date();

        var nextBirthdayDate = new Date(
            currentDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


        if (currentDate > nextBirthdayDate) {
            nextBirthdayDate.setFullYear(currentDate.getFullYear() + 1);
        }


        var diffInMs = nextBirthdayDate - currentDate;

        var days = Math.ceil(diffInMs / 86400000);

        return days;
    }

    function isBirthdayToday(birthDate) {

        var currentDate = new Date();

        return (
            currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate()  === birthDate.getDate()
        );
    }

    function getAgeCategoryText(ageYears) {

        if (ageYears < 0) {
            return "Not Born";
        } else if (ageYears <= 12) {
            return "Child";
        } else if (ageYears <= 19) {
            return "Teen";
        } else if (ageYears <= 59) {
            return "Adult";
        } else {
            return "Senior";
        }
    }


    function handleCalculate() {

        var dobValue = dobInput.value;

        errorMessage.textContent = "";

        if (dobValue === "") {
            errorMessage.textContent = "Please select your Date of Birth.";
            resultCard.classList.add("hidden");
            return;
        }


        var birthDate = new Date(dobValue + "T00:00:00");

        if (isNaN(birthDate.getTime())) {
            errorMessage.textContent = "Please enter a valid date.";
            resultCard.classList.add("hidden");
            return;
        }

        var currentDate = new Date();
        if (birthDate > currentDate) {
            errorMessage.textContent = "Invalid Date of Birth.";
            resultCard.classList.add("hidden");
            return;
        }

        var ageDetails = calculateAge(birthDate);

        yearsDisplay.textContent  = ageDetails.years;
        monthsDisplay.textContent = ageDetails.months;
        daysDisplay.textContent   = ageDetails.days;

        resultCard.classList.remove("hidden");


        // Total days lived
        var totalDays = getDaysLivedCount(birthDate);
        daysLived.textContent = totalDays.toLocaleString() + " days";

        var daysUntilBirthday = getNextBirthdayCount(birthDate);
        if (daysUntilBirthday === 0) {
            nextBirthday.textContent = "Today!";
        } else if (daysUntilBirthday === 1) {
            nextBirthday.textContent = "Tomorrow!";
        } else {
            nextBirthday.textContent = daysUntilBirthday + " days";
        }

        ageCategory.textContent = getAgeCategoryText(ageDetails.years);

        if (isBirthdayToday(birthDate)) {
            birthdayWish.textContent = "🎉 Happy Birthday! 🎂";
        } else {
            birthdayWish.textContent = "Not today";
        }
    }

    function handleReset() {

        dobInput.value = "";

        errorMessage.textContent = "";

        resultCard.classList.add("hidden");

        yearsDisplay.textContent  = "0";
        monthsDisplay.textContent = "0";
        daysDisplay.textContent   = "0";
        daysLived.textContent    = "--";
        nextBirthday.textContent = "--";
        ageCategory.textContent  = "--";
        birthdayWish.textContent = "--";
    }

    function applyTheme(theme) {

        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            document.body.classList.remove("dark-mode");
            themeToggle.textContent = "🌙 Dark Mode";
        }

        localStorage.setItem("ageCalculatorTheme", theme);
    }

    function loadSavedTheme() {

        var savedTheme = localStorage.getItem("ageCalculatorTheme");

        if (savedTheme === null) {
            applyTheme("light");
        } else {
            applyTheme(savedTheme);
        }
    }

    function toggleTheme() {

        if (document.body.classList.contains("dark-mode")) {
            applyTheme("light");
        } else {
            applyTheme("dark");
        }
    }

    loadSavedTheme();


   

    calcBtn.addEventListener("click", handleCalculate);

    resetBtn.addEventListener("click", handleReset);

    themeToggle.addEventListener("click", toggleTheme);

    dobInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleCalculate();
        }
    });

}); 
