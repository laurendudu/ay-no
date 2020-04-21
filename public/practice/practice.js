const quizUI = document.querySelector('.quiz');
var i = 0;
var q_counter = 0;
var vector = [];
var b = [];
var a = [];

const setupQuiz = (data) => {

    if (data.length) {
    let questions = [];
    data.forEach(doc => {
        const q = doc.data();
        questions.push(q);
        
    });

    renderQuestion(questions);
        


} else {
    quizUI.innerHTML = '<h4 style = "text-align:center">Login to access Ay no</h4>';
    };
};

function renderQuestion(questions) {

    i = Math.floor((Math.random()*3000))
    q = questions[i];

    if (q.choiceA == undefined) {
        
        nb = Math.random();
        if (nb > 0.5) {
        fillTheGap(q, questions);
        } else {
            syntax(q, questions);
        }

        } else {
            mcq(q, questions);
        }; 
            i++;     
};
