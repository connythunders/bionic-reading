// Quiz om Första Världskriget
const quizData = [
    {
        question: "När började första världskriget?",
        options: ["1912", "1914", "1916", "1918"],
        correct: 1
    },
    {
        question: "Vilket år slutade första världskriget?",
        options: ["1917", "1918", "1919", "1920"],
        correct: 1
    },
    {
        question: "Vad hette mordet som utlöste kriget?",
        options: ["Mordet på Napoleon", "Mordet på Franz Ferdinand", "Mordet på Tsar Nikolaj", "Mordet på Kaiser Wilhelm"],
        correct: 1
    },
    {
        question: "I vilken stad mördades ärkehertig Franz Ferdinand?",
        options: ["Wien", "Berlin", "Sarajevo", "Budapest"],
        correct: 2
    },
    {
        question: "Vilka länder tillhörde trippelalliansen?",
        options: ["Storbritannien, Frankrike, Ryssland", "Tyskland, Österrike-Ungern, Italien", "USA, Frankrike, Storbritannien", "Ryssland, Serbien, Rumänien"],
        correct: 1
    },
    {
        question: "Vilka länder tillhörde trippelententen?",
        options: ["Tyskland, Österrike-Ungern, Italien", "Storbritannien, Frankrike, Ryssland", "USA, Japan, Kina", "Bulgarien, Turkiet, Tyskland"],
        correct: 1
    },
    {
        question: "Vilket land förblev neutralt under första världskriget?",
        options: ["Belgien", "Sverige", "Polen", "Serbien"],
        correct: 1
    },
    {
        question: "Vad kallas den typ av krigföring som var vanlig i första världskriget?",
        options: ["Gerillakriget", "Skyttegravskrig", "Blitzkrieg", "Luftkrig"],
        correct: 1
    },
    {
        question: "Vilket nytt vapen användes för första gången i stor skala under första världskriget?",
        options: ["Atombomben", "Giftgas", "Raketer", "Granater"],
        correct: 1
    },
    {
        question: "När gick USA med i första världskriget?",
        options: ["1914", "1915", "1917", "1918"],
        correct: 2
    },
    {
        question: "Vilken händelse bidrog till att USA gick med i kriget?",
        options: ["Mordet på Franz Ferdinand", "Tyskt underrättelsemeddelande till Mexiko (Zimmermanntelegrammet)", "Pearl Harbor-attacken", "D-dagen"],
        correct: 1
    },
    {
        question: "Vad hette fredsfördraget som avslutade kriget?",
        options: ["Wienkongressen", "Versaillesfreden", "Jaltakonferensen", "Westfaliska freden"],
        correct: 1
    },
    {
        question: "Vilket slag var ett av de blodigaste i första världskriget?",
        options: ["Slaget vid Waterloo", "Slaget vid Somme", "Slaget vid Stalingrad", "Slaget vid Gettysburg"],
        correct: 1
    },
    {
        question: "Vad ledde den ryska revolutionen 1917 till?",
        options: ["Ryssland ökade sitt deltagande i kriget", "Ryssland drog sig ur kriget", "Ryssland bytte sida", "Ryssland blev ockuperat"],
        correct: 1
    },
    {
        question: "Cirka hur många människor dog i första världskriget?",
        options: ["5 miljoner", "10 miljoner", "17 miljoner", "25 miljoner"],
        correct: 2
    }
];

class Quiz {
    constructor(data) {
        this.data = data;
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;
        this.init();
    }

    init() {
        this.questionText = document.getElementById('question-text');
        this.answerOptions = document.getElementById('answer-options');
        this.nextBtn = document.getElementById('next-btn');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.progressFill = document.getElementById('progress-fill');
        this.quizContent = document.getElementById('quiz-content');
        this.resultsSection = document.getElementById('results-section');
        this.restartBtn = document.getElementById('restart-btn');

        this.totalQuestionsSpan.textContent = this.data.length;

        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restart());

        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQuestion >= this.data.length) {
            this.showResults();
            return;
        }

        this.answered = false;
        const question = this.data[this.currentQuestion];

        this.questionText.textContent = question.question;
        this.currentQuestionSpan.textContent = this.currentQuestion + 1;

        const progress = ((this.currentQuestion) / this.data.length) * 100;
        this.progressFill.style.width = progress + '%';

        this.answerOptions.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.answerOptions.appendChild(button);
        });

        this.nextBtn.style.display = 'none';
    }

    selectAnswer(selectedIndex) {
        if (this.answered) return;

        this.answered = true;
        const question = this.data[this.currentQuestion];
        const options = this.answerOptions.querySelectorAll('.answer-option');

        options.forEach((option, index) => {
            option.classList.add('disabled');

            if (index === question.correct) {
                option.classList.add('correct');
            }

            if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correct) {
            this.score++;
        }

        this.nextBtn.style.display = 'block';
    }

    nextQuestion() {
        this.currentQuestion++;
        this.loadQuestion();
    }

    showResults() {
        this.quizContent.style.display = 'none';
        this.resultsSection.style.display = 'block';

        const scoreSpan = document.getElementById('score');
        const totalSpan = document.getElementById('total');
        const percentageSpan = document.getElementById('percentage');
        const feedbackDiv = document.getElementById('feedback');

        scoreSpan.textContent = this.score;
        totalSpan.textContent = this.data.length;

        const percentage = Math.round((this.score / this.data.length) * 100);
        percentageSpan.textContent = percentage;

        let feedback = '';
        if (percentage === 100) {
            feedback = 'Perfekt! Du är en expert på första världskriget! 🌟';
        } else if (percentage >= 80) {
            feedback = 'Utmärkt! Du har mycket goda kunskaper om första världskriget! 👏';
        } else if (percentage >= 60) {
            feedback = 'Bra jobbat! Du har goda grundkunskaper! 👍';
        } else if (percentage >= 40) {
            feedback = 'Okej resultat! Läs på lite mer så kommer du bli bättre! 📚';
        } else {
            feedback = 'Du behöver studera mer om första världskriget. Försök igen! 💪';
        }

        feedbackDiv.textContent = feedback;
    }

    restart() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;

        this.quizContent.style.display = 'block';
        this.resultsSection.style.display = 'none';

        this.loadQuestion();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Quiz(quizData);
});
