document.addEventListener('DOMContentLoaded', () => {
    const testContainer = document.getElementById('test-container');
    const questionContainer = document.getElementById('question-container');
    const selectAnswer = document.getElementById('select-answer');
    const nextBtn = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const retryBtn = document.getElementById('retry-btn');

    const questions = ['En una escala del 1 al 3, ¿cuánta experiencia tienes en lenguajes de programación?',
        '¿Qué nivel de interés tienes en aprender sobre diferentes áreas de la tecnología, siendo 1 bajo interés y 3 alto interés?',
        '¿Cuántos proyectos tecnológicos has llevado a cabo, ya sea de forma individual o en equipo?',
        '¿Cómo te sientes al enfrentarte a problemas complejos de programación, siendo 1 poco seguro y 3 muy seguro?',
        'En una escala del 1 al 3, ¿qué tan hábil te consideras en el uso de herramientas de desarrollo como IDEs, control de versiones y sistemas operativos?',
        '¿Cuánto te gustaría explorar áreas específicas de la informática, siendo 1 poco interesado y 3 muy interesado?',
        'En una escala del 1 al 3, ¿qué nivel de experiencia tienes con conceptos de desarrollo de software como algoritmos, estructuras de datos y paradigmas de programación?',
        '¿Qué tanto te atraen la gestión de proyectos tecnológicos, la investigación en informática y el desarrollo de software, siendo 1 poco atraído y 3 muy atraído?',
        '¿En qué medida te mantienes al tanto de las tendencias y avances en tecnología y programación, siendo 1 poco informado y 3 muy informado?'
    ];

    let currentQuestionIndex = 0;
    let answers = [];
    let selectedStudent = '';

    function loadQuestion(index) {
        questionContainer.innerHTML = `<p>${questions[index]}</p>`;
        selectAnswer.innerHTML = `
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        `;
    }

    function showResult() {
        resultContainer.classList.remove('hidden');
        testContainer.classList.add('hidden');
        resultText.textContent = `Tus respuestas: ${answers.join(', ')}`;
    }

    nextBtn.addEventListener('click', () => {
        const answer = selectAnswer.value;
        if (answer) {
            answers.push(answer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                if (selectedStudent) {
                    const studentResults = JSON.parse(localStorage.getItem('studentResults')) || {};
                    studentResults[selectedStudent] = answers;
                    localStorage.setItem('studentResults', JSON.stringify(studentResults));
                    showResult();
                } else {
                    alert('Por favor, selecciona un alumno.');
                }
            }
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    });

    retryBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        answers = [];
        loadQuestion(currentQuestionIndex);
        resultContainer.classList.add('hidden');
        testContainer.classList.remove('hidden');
    });

    // Initialize the student selection
    const studentSelect = document.createElement('select');
    studentSelect.id = 'student-select';
    studentSelect.innerHTML = `
        <option value="">Selecciona un alumno</option>
        <option value="Ana López">Ana López</option>
        <option value="Carlos Pérez">Carlos Pérez</option>
        <option value="María Rodríguez">María Rodríguez</option>
        <option value="Luis García">Luis García</option>
        <option value="Elena Fernández">Elena Fernández</option>
        <option value="Jorge Martínez">Jorge Martínez</option>
        <option value="Sofía Sánchez">Sofía Sánchez</option>
        <option value="Miguel Gómez">Miguel Gómez</option>
        <option value="Laura Díaz">Laura Díaz</option>
        <option value="Raúl Torres">Raúl Torres</option>
    `;
    testContainer.prepend(studentSelect);

    studentSelect.addEventListener('change', () => {
        selectedStudent = studentSelect.value;
    });

    // Initialize the first question
    loadQuestion(currentQuestionIndex);
});
