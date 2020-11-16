document.addEventListener("DOMContentLoaded", () =>{
    const WeekDays = document.querySelector(".months");
    const Days = document.querySelector(".days");
    const Hour = document.querySelector(".hour");
    const Year = document.querySelector(".year");
    const IncreaseDate = document.querySelector(".triangle-right");
    const DecreaseDate = document.querySelector(".triangle-left");
    const TodayData = document.querySelector(".Today");
    const YearSelectedValue = document.querySelector(".YearSelector");
    
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    let now = new Date();
    let day = now.getDay();
    let month = now.getMonth();
    let year = now.getFullYear();
    
    const ControlButtons = () =>{
        let { indexMonth, indexYear } = GlobalActualDate(month, year);
        TodayData.addEventListener("click", () =>
        {
            month = indexMonth;
            year = indexYear;
            DisplayDays(indexMonth, indexYear);
            DisplayCurrentDay(indexMonth, indexYear);
        });
        YearSelectedValue.addEventListener("change", e =>{
            currentYear = parseInt(e.target.value);
            month = indexMonth;
            year = currentYear;
            indexYear = currentYear;
            DisplayDays(indexMonth, indexYear);
            DisplayCurrentDay(indexMonth, indexYear);
        });
        
        DecreaseDate.addEventListener("click", () =>{
            month--
            if (month <= 0) {
                month = 12
                year--
            };
            DisplayDays(month, year);
            DisplayCurrentDay(month, year);
        });
        
        IncreaseDate.addEventListener("click", () =>{
            month++
            if (month > 12) {
                year++;
                month = 1;
            }
            DisplayDays(month, year);
            DisplayCurrentDay( month, year);
        });
        DisplayCurrentDay(month, year);
    };

    const DisplayCurrentDay = (month, year) =>{
        Year.innerText = `${ month }  ${ year } `;
    }

    const DisplayDays = (month, year) =>{
        let { firstDay, date, daysInMonth } = ClearAndCreateNewDate(year, month, Days);
        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");
            row.classList.add("Head")
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {[]}
                else if (date > daysInMonth) break;
                else {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode(date);
                    if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth())
                        cell.classList.add("first-day");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }
            Days.appendChild(row);
        }
        AddTask();
    };

    const AddTask = () => {
        const All = document.querySelectorAll(".first-week");
        All.forEach(a =>{
            a.addEventListener("click", () =>{
                a.classList.add("toggle");
            });
        });
    };

    const  DaysContext = () => {
        for (let i = 0; i < daylist.length; i++) {
            const Li = document.createElement("span");
            Li.innerText = daylist[i];
            Li.classList.add(`month-hover`);
            Li.setAttribute("id", daylist[i]);
            WeekDays.appendChild(Li);
        };
        document.getElementById(daylist[day]).className = 'bold';
    };

    const Hours = () =>{
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        let prepand = (hour >= 12) ? " PM " : " AM ";
        hour = (hour >= 12) ? hour - 12 : hour;
        if (hour === 0 && prepand === ' PM ') {
            if (minute === 0 && second === 0) {
                hour = 12;
                prepand = ' Noon';
            } else {
                hour = 12;
                prepand = ' PM';
            };
        };
        if (hour === 0 && prepand === ' AM ') {
            if (minute === 0 && second === 0) {
                hour = 12;
                prepand = ' Midnight';
            } else {
                hour = 12;
                prepand = ' AM';
            };
        };
        Hour.textContent = ` Current Time ${ hour }  ${ minute }  ${ prepand }`;
    };

    const FilterByYear = () =>{
        let { indexMonth, indexYear } = GlobalActualDate(month, year);
        const selectYear = [
            2010, 2011, 2012, 2013,
            2014, 2015, 2016, 2017,
            2018, 2019, 2020, 2021,
            2022, 2023, 2024, 2025,
            2026, 2027, 2028, 2029,
            2030, 2031, 2032, 2033
        ];

        for (let i = 0; i < selectYear.length; i++) {
            const option = document.createElement("option");
            option.textContent = selectYear[i];
            option.classList.add("SelectYear");
            option.value = selectYear[i];
            YearSelectedValue.appendChild(option);
        }

    };
    
    const GlobalActualDate = (month, year) =>
    {
        let indexMonth = month;
        let indexYear = year;
        return { indexMonth, indexYear };
    };
    
    const ClearAndCreateNewDate = (year, month, Days) =>{
        let firstDay = new Date(year, month, 0).getDay();
        let daysInMonth = DaysInMonth(month, year);
        Days.innerHTML = "";
        let date = 1;
        return { firstDay, date, daysInMonth };
    };
    
    const DaysInMonth = (month, year) =>{
        return new Date(year, month, 0).getDate();
    };
    
    FilterByYear();
    DaysContext();
    ControlButtons();
    Hours();
    DisplayDays(month, year);
});