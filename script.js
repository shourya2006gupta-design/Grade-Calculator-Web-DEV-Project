
const form = document.getElementById("gradeForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get student details
    let name = document.getElementById("name").value;
    let rollNo = document.getElementById("rollNo").value;

    // Get marks of five subjects
    let m1 = Number(document.getElementById("grade1").value);
    let m2 = Number(document.getElementById("grade2").value);
    let m3 = Number(document.getElementById("grade3").value);
    let m4 = Number(document.getElementById("grade4").value);
    let m5 = Number(document.getElementById("grade5").value);

    // Store marks in an array
    let marks = [m1, m2, m3, m4, m5];

    // Validate marks
    for (let i = 0; i < marks.length; i++) {

        if (marks[i] < 0 || marks[i] > 100 || isNaN(marks[i])) {
            result.innerHTML = "Invalid marks! Enter marks between 0 and 100.";
            return;
        }
    }

    // Calculate total, percentage and average
    let total = m1 + m2 + m3 + m4 + m5;

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

    // Display result
    result.innerHTML = `
        <h3>Result for ${name}</h3>
        <p>Roll Number: ${rollNo}</p>
        <p>Total Marks: ${total} / 500</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <p>Average: ${average.toFixed(2)}</p>
        <p>Grade: ${grade}</p>
        <p>Status: ${status}</p>
    `;

});
