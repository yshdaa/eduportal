document.addEventListener('DOMContentLoaded', function () {
    const role = localStorage.getItem('role');

    if (!role) {
        alert('You are not logged in!');
        window.location.href = 'index.html';
        return;
    }

    let studentData = JSON.parse(localStorage.getItem('studentData')) || {
        rollNumber: 'A123456',
        name: 'John Doe',
        division: 'A',
        mobileNumber: '+1234567890',
        subjects: [
            { subject: 'Mathematics', progress: '80%', grade: 'A', score: '92/100', percentage: '92%' },
            { subject: 'Physics', progress: '85%', grade: 'B', score: '82/100', percentage: '82%' },
            { subject: 'Computer Science', progress: '90%', grade: 'A', score: '95/100', percentage: '95%' },
        ]
    };

    document.getElementById('roll-number').value = studentData.rollNumber;
    document.getElementById('student-name').value = studentData.name;
    document.getElementById('division').value = studentData.division;
    document.getElementById('mobile-number').value = studentData.mobileNumber;

    const subjectRows = document.querySelectorAll('tbody tr');
    studentData.subjects.forEach((subject, index) => {
        const cells = subjectRows[index].children;
        cells[1].children[0].value = subject.grade;
        cells[2].children[0].value = subject.score;
        cells[3].children[0].value = subject.percentage;
    });

    const editButtons = document.querySelectorAll('.edit-button');
    const resultEditButtons = document.querySelectorAll('.result-edit-button');
    const inputFields = document.querySelectorAll('.editable-field');

    if (role === 'teacher') {
        editButtons.forEach(button => {
            button.style.display = 'inline-block';
            button.addEventListener('click', function () {
                const input = this.previousElementSibling;
                if (input.hasAttribute('readonly')) {
                    input.removeAttribute('readonly');
                    this.textContent = 'Save';
                } else {
                    input.setAttribute('readonly', true);
                    this.textContent = 'Edit';
                    saveData();
                }
            });
        });

        resultEditButtons.forEach(button => {
            button.style.display = 'inline-block';
            button.addEventListener('click', function () {
                const row = this.closest('tr');
                const inputs = row.querySelectorAll('input');
                let isEditable = false;

                inputs.forEach(input => {
                    if (input.hasAttribute('readonly')) {
                        input.removeAttribute('readonly');
                        isEditable = true;
                    } else {
                        input.setAttribute('readonly', true);
                    }
                });

                this.textContent = isEditable ? 'Save' : 'Edit';
                if (!isEditable) saveData();
            });
        });
    } else if (role === 'student') {
        editButtons.forEach(button => button.style.display = 'none');
        resultEditButtons.forEach(button => button.style.display = 'none');
        inputFields.forEach(field => field.setAttribute('readonly', true));
    } else {
        alert('Unauthorized access. Please log in.');
        window.location.href = 'index.html';
    }

    function saveData() {
        studentData.rollNumber = document.getElementById('roll-number').value;
        studentData.name = document.getElementById('student-name').value;
        studentData.division = document.getElementById('division').value;
        studentData.mobileNumber = document.getElementById('mobile-number').value;

        const rows = document.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            const inputs = row.querySelectorAll('input');
            studentData.subjects[index].grade = inputs[0].value;
            studentData.subjects[index].score = inputs[1].value;
            studentData.subjects[index].percentage = inputs[2].value;
        });

        localStorage.setItem('studentData', JSON.stringify(studentData));
        alert('Data saved successfully!');
    }
});

function logout() {
    window.location.href = 'index.html';
}
