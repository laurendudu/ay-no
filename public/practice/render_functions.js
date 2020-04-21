function mcq(q, questions) {
    
    auth.onAuthStateChanged((user) => {
        db.collection("users").doc(user.uid).get().then(doc => {
            var old_level = doc.data().level;
            b.push(old_level - 0.4);
            a.push(2.5);
        });
    });

    quizUI.innerHTML = `
    <form id="question">
    <p>${q.question}</p>
    <p>
    <label>
        <input name="answers" type="radio" id="A" value="${q.choiceA}"/>
        <span>${q.choiceA}</span>
    </label>
    </p>
    <p>
    <label>
        <input name="answers" type="radio" id="B" value="${q.choiceB}"/>
        <span>${q.choiceB}</span>
    </label>
    </p>
    <p>
    <label>
        <input name="answers" type="radio" id="C" value="${q.choiceC}"/>
        <span>${q.choiceC}</span>
    </label>
    </p>
    <button class="btn waves-effect waves-light" id="check-btn">Check
        <i class="material-icons right">check</i>
    </button>
    </form>
    `;
    
    document.getElementById("check-btn").addEventListener("click", function checkAnswer() {

        let answer = document.querySelector('input[name="answers"]:checked').value;
        q_counter++;

        if(answer == q.correct) {
            quizUI.innerHTML += `
            <div class="row">
                <div class="col s12 m12">
                <div class="card green lighten-4">
                    <div class="card-content black-text">
                    <span class="card-title">
                        <i class="material-icons">check</i>
                        Correct :)
                    </span>
                </div>
                </div>
            </div>
            `;
            vector.push(1);
        } else {
            quizUI.innerHTML += `
            <div class="row">
                <div class="col s12 m12">
                <div class="card deep-orange lighten-3">
                    <div class="card-content black-text">
                    <span class="card-title">
                        <i class="material-icons">highlight_off</i>
                        Incorrect
                    </span>
                    
                    <p>The correct answer is ${q.correct}</p>
                </div>
                </div>
            </div>
            `;
            vector.push(0);
        }
        quizUI.innerHTML += `
        <button class="btn waves-effect waves-light" id="next-btn">
            Next
            <i class="material-icons right">chevron_right</i> 
        </button>
        `;

        document.getElementById("next-btn").addEventListener("click", function next() {
        if (i < questions.length) {
            renderQuestion(questions);
        } else {
            quizUI.innerHTML = "you're done";
        };

        if (q_counter == 3) {
            auth.onAuthStateChanged((user) => {
                db.collection("users").doc(user.uid).get().then(doc => {
                    var old_level = doc.data().level;

                    var new_level = new_theta(vector, old_level, b, a)
                    db.collection("users").doc(user.uid).update({
                        level: new_level 
                    });
                });
              });

            q_counter = 0;
        }
    });



    });
}

function fillTheGap(q, questions) {

    auth.onAuthStateChanged((user) => {
        db.collection("users").doc(user.uid).get().then(doc => {
            var old_level = doc.data().level;
            b.push(old_level - 0.4);
            a.push(2.5);
        });
    });


    var sentence = q.question;
    var words = sentence.split(" ");

    var answerIndex = words.indexOf(q.correct.toLowerCase());
    
    quizUI.innerHTML = `
    <form id="question">
    <p>${q.trad}</p>

    <div class="row">
        ${words.slice(0, answerIndex).join(" ")}
            <div class="input-field inline">
                <input id="answer" name="answer" type="text">
                <label for="answer">your answer</label>
            </div>
        ${words.slice(answerIndex + 1, words.length).join(" ")}
    </div>

    <button class="btn waves-effect waves-light" id="check-btn">Check
        <i class="material-icons right">check</i>
    </button>

    </form>
    `;
    
    document.getElementById("check-btn").addEventListener("click", function checkAnswer() {

        let answer = document.querySelector('input[name="answer"]').value;
        q_counter++;

        if(answer.toLowerCase() == q.correct.toLowerCase()) {
            quizUI.innerHTML += `
            <div class="row">
                <div class="col s12 m12">
                <div class="card green lighten-4">
                    <div class="card-content black-text">
                    <span class="card-title">
                        <i class="material-icons">check</i>
                        Correct :)
                    </span>
                </div>
                </div>
            </div>
            `;
            vector.push(1);
        } else {
            quizUI.innerHTML += `
            <div class="row">
                <div class="col s12 m12">
                <div class="card deep-orange lighten-3">
                    <div class="card-content black-text">
                    <span class="card-title">
                        <i class="material-icons">highlight_off</i>
                        Incorrect
                    </span>
                    
                    <p>The correct answer is ${q.correct}</p>
                </div>
                </div>
            </div>
            `;
            vector.push(0);
        }
        quizUI.innerHTML += `
        <button class="btn waves-effect waves-light" id="next-btn">
            Next
            <i class="material-icons right">chevron_right</i> 
        </button>
        `;

        document.getElementById("next-btn").addEventListener("click", function next() {
        if (i < questions.length) {
            renderQuestion(questions);
        } else {
            quizUI.innerHTML = "you're done";
        };

        if (q_counter == 3) {
            auth.onAuthStateChanged((user) => {
                db.collection("users").doc(user.uid).get().then(doc => {
                    var old_level = doc.data().level;

                    var new_level = new_theta(vector, old_level, b, a)
                    db.collection("users").doc(user.uid).update({
                        level: new_level 
                    });
                });
              });

            q_counter = 0;
        }
    });

    });
}

function syntax(q, questions) {

    auth.onAuthStateChanged((user) => {
        db.collection("users").doc(user.uid).get().then(doc => {
            var old_level = doc.data().level;
            b.push(old_level - 0.4);
            a.push(2.5);
        });
    });


    var sentence = q.question;
    var words = sentence.split(" ");
    const len = words.length;

    quizUI.innerHTML = `
        <div class=sentence></div>
        <p>${q.trad}</p>
        <button class="btn waves-effect waves-light" id="check-btn">Check
        <i class="material-icons right">check</i>
        </button>
    `;

    for (var j = 0; j < len; j++) {
        var rdIndex = Math.floor(Math.random() * words.length);

        var chip = document.createElement("div");
        chip.className = "chip"
        chip.innerHTML = words[rdIndex].toLowerCase();

        document.querySelector('.sentence').appendChild(chip);
        words.splice(rdIndex, 1);
    };


    $( function() {
        $( ".sentence" ).sortable();
    });
    
    document.getElementById("check-btn").addEventListener("click", function checkAnswer() {

        var answerArray = [];

        for (var k = 0; k < len; k++) {
            answerArray.push(document.querySelector('.sentence').children[k].innerHTML);
        }

        let answer = answerArray.join(' ');
        q_counter++;

        if(answer.toLowerCase() == q.question.toLowerCase()) {
            quizUI.innerHTML += `
            <div class="row">
                <div class="col s12 m12">
                <div class="card green lighten-4">
                    <div class="card-content black-text">
                    <span class="card-title">
                        <i class="material-icons">check</i>
                        Correct :)
                    </span>
                </div>
                </div>
            </div>
            `;
            vector.push(1);
        } else {
            quizUI.innerHTML += `
            <div class="row">
                <div class="col s12 m12">
                <div class="card deep-orange lighten-3">
                    <div class="card-content black-text">
                    <span class="card-title">
                        <i class="material-icons">highlight_off</i>
                        Incorrect
                    </span>
                    
                    <p>The correct answer is \"${q.question}\".</p>
                </div>
                </div>
            </div>
            `;
            vector.push(0);
        }

        quizUI.innerHTML += `
        <button class="btn waves-effect waves-light" id="next-btn">
            Next
            <i class="material-icons right">chevron_right</i> 
        </button>
        `;

        document.getElementById("next-btn").addEventListener("click", function next() {
        if (i < questions.length) {
            renderQuestion(questions);
        } else {
            quizUI.innerHTML = "you're done";
        };

        if (q_counter == 3) {
            auth.onAuthStateChanged((user) => {
                db.collection("users").doc(user.uid).get().then(doc => {
                    var old_level = doc.data().level;
    
                    var new_level = new_theta(vector, old_level, b, a)
                    db.collection("users").doc(user.uid).update({
                        level: new_level 
                    });
                });
              });
    
            q_counter = 0;
        };
    });

    

    });
}