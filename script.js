document.addEventListener('DOMContentLoaded', function () {
    const monthYearElement = document.getElementById('month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevYearButton = document.getElementById('prev-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const nextYearButton = document.getElementById('next-year');

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth(); // 0-indexed (0 for January, 11 for December)

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // --- Poya Day Logic ---
    const poyaDays = {
        2020: {
            0: [10],    // Jan
            1: [8],     // Feb
            2: [9],     // Mar
            3: [7],     // Apr
            4: [7],     // May
            5: [5],     // Jun
            6: [4],     // Jul
            7: [3],     // Aug
            8: [1],     // Sep
            9: [1, 30], // Oct (Adhi Vap, Vap)
            10: [29],   // Nov
            11: [29]    // Dec
        },
        2021: {
            0: [28],    // Jan
            1: [26],    // Feb
            2: [28],    // Mar
            3: [26],    // Apr
            4: [26],    // May
            5: [24],    // Jun
            6: [23],    // Jul
            7: [22],    // Aug
            8: [20],    // Sep
            9: [20],    // Oct
            10: [18],   // Nov
            11: [18]    // Dec
        },
        2022: {
            0: [17],    // Jan
            1: [16],    // Feb
            2: [17],    // Mar
            3: [16],    // Apr
            4: [15],    // May
            5: [14],    // Jun
            6: [13],    // Jul
            7: [11],    // Aug
            8: [10],    // Sep
            9: [9],     // Oct
            10: [7],    // Nov
            11: [7]     // Dec
        },
        2023: {
            0: [6],     // Jan
            1: [5],     // Feb
            2: [6],     // Mar
            3: [5],     // Apr
            4: [5],     // May
            5: [3],     // Jun
            6: [3],     // Jul (Adhi Esala)
            7: [1, 30], // Aug (Esala, Nikini)
            8: [29],    // Sep
            9: [28],    // Oct
            10: [26],   // Nov
            11: [26]    // Dec
        },
        2024: { // Data previously added, verified with current collection
            0: [25],    // Jan
            1: [23],    // Feb
            2: [24],    // Mar
            3: [23],    // Apr
            4: [23],    // May
            5: [21],    // Jun
            6: [20],    // Jul
            7: [19],    // Aug
            8: [17],    // Sep
            9: [17],    // Oct
            10: [15],   // Nov
            11: [14]    // Dec
        },
        2025: {
            0: [13],    // Jan
            1: [12],    // Feb
            2: [13],    // Mar
            3: [12],    // Apr
            4: [12],    // May
            5: [10],    // Jun
            6: [10],    // Jul
            7: [8],     // Aug
            8: [7],     // Sep
            9: [6],     // Oct
            10: [5],    // Nov
            11: [4]     // Dec
        }
        // Data for 2026-2030 is not yet available from the source.
    };

    function isPoyaDay(day, month, year) {
        if (poyaDays[year] && poyaDays[year][month] && poyaDays[year][month].includes(day)) {
            return true;
        }
        return false;
    }

    function renderCalendar(year, month) {
        // Start fade-out animation
        calendarGrid.classList.remove('fade-in'); // Remove fade-in if present
        calendarGrid.classList.add('fade-out');

        // Use a timeout to allow the fade-out animation to complete
        // before clearing and re-rendering the grid.
        setTimeout(() => {
            monthYearElement.textContent = `${monthNames[month]} ${year}`;
            calendarGrid.innerHTML = ''; // Clear previous grid

            // Add day names header
        daysOfWeek.forEach(dayName => {
            const dayNameCell = document.createElement('div');
            dayNameCell.classList.add('day-name');
            dayNameCell.textContent = dayName;
            calendarGrid.appendChild(dayNameCell);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('empty-day');
            calendarGrid.appendChild(emptyCell);
        }

        // Add day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.classList.add('day-cell'); // Add a general class for day cells

            const dayOfWeek = new Date(year, month, day).getDay();

            if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 is Sunday, 6 is Saturday
                dayCell.classList.add(dayOfWeek === 0 ? 'sunday' : 'saturday');
            }

            if (isPoyaDay(day, month, year)) {
                dayCell.classList.add('poya-day');
            }
            calendarGrid.appendChild(dayCell);
        }

        // Start fade-in animation for the new grid
        calendarGrid.classList.remove('fade-out'); // Remove fade-out
        calendarGrid.classList.add('fade-in');

    }, 150); // This timeout duration should match the fade-out transition time (0.15s)
}

    // --- Event Listeners ---
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    prevYearButton.addEventListener('click', () => {
        currentYear--;
        renderCalendar(currentYear, currentMonth);
    });

    nextYearButton.addEventListener('click', () => {
        currentYear++;
        renderCalendar(currentYear, currentMonth);
    });

    // Initial render
    renderCalendar(currentYear, currentMonth);
});
