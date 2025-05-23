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

    // --- Poya Day Logic (Placeholder) ---
    // For demonstration, let's assume a few Poya days for 2024.
    // In a real application, this would be more dynamic or use a reliable source.
    const poyaDays2024 = {
        0: [25], // January 25th
        1: [23], // February 23rd
        2: [24], // March 24th
        3: [23], // April 23rd
        4: [23], // May 23rd
        5: [21], // June 21st
        6: [20], // July 20th
        7: [19], // August 19th
        8: [17], // September 17th
        9: [17], // October 17th
        10: [15], // November 15th
        11: [14]  // December 14th
    };
    // Add more years or a more sophisticated way to get Poya days if needed.
    // For this example, we'll just use 2024 data. If the year is not 2024, no Poya days will be marked.

    function isPoyaDay(day, month, year) {
        if (year === 2024 && poyaDays2024[month] && poyaDays2024[month].includes(day)) {
            return true;
        }
        // Add more Poya day checks here if necessary for other years or a more complex logic
        return false;
    }

    function renderCalendar(year, month) {
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
