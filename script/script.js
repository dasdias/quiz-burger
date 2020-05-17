document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');    
    const sendButton = document.querySelector('#send');
    
    
    const questions = [{
            question: "Какого цвета бургер?",
            answers: [{
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [{
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [{
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [{
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    btnOpenModal.addEventListener('click', function() {
        modalBlock.classList.add('d-block');
        playtest();
    });
    closeModal.addEventListener('click', function(){
        modalBlock.classList.remove('d-block');
    });
    const playtest = () => {
        let numberQustion = 0;
        let finalAnswers = [];

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
            <label for = "${answer.title}" class = "d-flex flex-column justify-content-between" >
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
            </label>
        `;
                formAnswers.appendChild(answerItem);
            });
        };

        const renderQuestion = (indexQuestion) => {
            formAnswers.innerHTML = '';

            // switch (true) {
            //     case (numberQustion >= 0 && numberQustion <= questions.length - 1):
            //          questionTitle.textContent = `${questions[indexQuestion].question}`;
            //          renderAnswers(indexQuestion);
            //          nextButton.classList.remove('d-none');
            //          prevButton.classList.remove('d-none');
            //          sendButton.classList.add('d-none');
            //         // break;
            //     case (numberQustion === 0):
            //         prevButton.classList.add('d-none');
            //         break;
            
            //     case (numberQustion === questions.length):
            //         nextButton.classList.add('d-none');
            //         prevButton.classList.add('d-none');
            //         sendButton.classList.remove('d-none');
            //         formAnswers.textContent = "Спасибо";

            //         formAnswers.innerHTML = `
            //             <div class="form-group">
            //                 <label for="numberPhone">Enter ypur number</label>
            //                 <input type="phone" class="form-control" id="numberPhone">
            //             </div>
            //         `;
            //         break;
            //     case (numberQustion === questions.length + 1):
            //        formAnswers.textContent = 'Спасибо за пройденный тест';
            //        setTimeout(() => {
            //            modalBlock.classList.remove('d-block');
            //        }, 2000);
            //         break;
            
            //     default:
            //         break;
            // }

            if (numberQustion >= 0 && numberQustion <= questions.length - 1) {
                 questionTitle.textContent = `${questions[indexQuestion].question}`;
                 renderAnswers(indexQuestion);
                 nextButton.classList.remove('d-none');
                 prevButton.classList.remove('d-none');
                 sendButton.classList.add('d-none');
            }
            if (numberQustion === 0) {
                prevButton.classList.add('d-none'); 
            }                    
            if (numberQustion === questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswers.textContent = "Спасибо";

                formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Enter ypur number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `;
            }     

            if (numberQustion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест';
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
            
        }
        renderQuestion(numberQustion);

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            inputs.forEach((input, index) => {
                if (numberQustion >= 0 && numberQustion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQustion].question}`] = input.value;
                }
                if (numberQustion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            });
            console.log(obj);
           finalAnswers.push(obj);
           console.log(finalAnswers);
        }

        nextButton.onclick = () => {
            checkAnswer();
            numberQustion++;           
            renderQuestion(numberQustion);

        };
        prevButton.onclick = () => {                
            numberQustion--;
            renderQuestion(numberQustion);
        };
        sendButton.onclick = () => {
            numberQustion++;
            checkAnswer();
            renderQuestion(numberQustion);
        }
      
    }
});
