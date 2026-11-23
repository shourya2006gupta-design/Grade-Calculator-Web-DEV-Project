
const form = document.getElementById("gradeForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get student details
    let name = document.getElementById("name").value;
    let rollNo = document.getElementById("rollNo").value;

    // Get subject names
    let subjects = [
        document.getElementById("subject1").value,
        document.getElementById("subject2").value,
        document.getElementById("subject3").value,
        document.getElementById("subject4").value,
        document.getElementById("subject5").value
    ];

    // Get marks
    let marks = [
        Number(document.getElementById("grade1").value),
        Number(document.getElementById("grade2").value),
        Number(document.getElementById("grade3").value),
        Number(document.getElementById("grade4").value),
        Number(document.getElementById("grade5").value)
    ];

    // Validate marks
    for (let i = 0; i < marks.length; i++) {

        if (marks[i] < 0 || marks[i] > 100 || isNaN(marks[i])) {
            result.innerHTML = "Invalid marks! Enter marks between 0 and 100.";
            return;
        }
    }

    // Calculate total and percentage
    let total = 0;

    for (let i = 0; i < marks.length; i++) {
        total = total + marks[i];
    }

    let percentage = total / 5;
    let average = total / 5;

    // Calculate grade
    let grade;

    if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 80) {
        grade = "A";
    }
    else if (percentage >= 70) {
        grade = "B";
    }
    else if (percentage >= 60) {
        grade = "C";
    }
    else if (percentage >= 40) {
        grade = "D";
    }
    else {
        grade = "F";
    }

    // Check pass or fail
    let status = "Pass";

    for (let i = 0; i < marks.length; i++) {

        if (marks[i] < 35) {
            status = "Fail";
            break;
        }
    }

    // Subject-wise table
    let table = `
        <h3>Subject-wise Performance</h3>

        <div class="table-container">
        <table class="result-table">

            <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Status</th>
            </tr>
    `;

    for (let i = 0; i < marks.length; i++) {

        let subjectStatus = marks[i] >= 35 ? "Pass" : "Fail";

        table += `
            <tr>
                <td>${subjects[i]}</td>
                <td>${marks[i]}</td>
                <td>${marks[i].toFixed(2)}%</td>
                <td class="${subjectStatus.toLowerCase()}">${subjectStatus}</td>
            </tr>
        `;
    }

    table += `</table></div>`;

    // Generate pie chart
    let colors = [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#9333ea",
        "#ef4444"
    ];

    let chartValues = [];
    let currentAngle = 0;

    for (let i = 0; i < marks.length; i++) {

        let angle = total === 0 ? 0 : (marks[i] / total) * 360;

        let nextAngle = currentAngle + angle;

        chartValues.push(
            `${colors[i]} ${currentAngle}deg ${nextAngle}deg`
        );

        currentAngle = nextAngle;
    }

    let chartBackground = total === 0
        ? "#e2e8f0"
        : `conic-gradient(${chartValues.join(", ")})`;

    // Create chart legend
    let legend = "";

    for (let i = 0; i < subjects.length; i++) {

        legend += `
            <div class="legend-item">
                <span style="background-color:${colors[i]}"></span>
                ${subjects[i]} (${total === 0 ? "0" : ((marks[i] / total) * 100).toFixed(1)}%)
            </div>
        `;
    }

    // Display final result
    result.innerHTML = `
        <h3>Result for ${name}</h3>

        <div class="summary">
            <p><strong>Roll Number:</strong> ${rollNo}</p>
            <p><strong>Total Marks:</strong> ${total} / 500</p>
            <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
            <p><strong>Average:</strong> ${average.toFixed(2)}</p>
            <p><strong>Grade:</strong> ${grade}</p>
            <p><strong>Result:</strong> ${status}</p>
        </div>

        ${table}

        <h3 class="chart-heading">Subject-wise Marks Distribution</h3>

        <div class="chart-container">

            <div class="pie-chart"
                style="background: ${chartBackground}">
            </div>

            <div class="chart-legend">
                ${legend}
            </div>

        </div>
    `;

});

// Reset result when form is reset
form.addEventListener("reset", function() {

    result.innerHTML = "Your result will appear here after calculation.";

});
