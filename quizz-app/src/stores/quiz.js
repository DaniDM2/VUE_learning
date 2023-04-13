import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', () => {
    const questions = [
      {
         id: 1,
         body: 'Cuando fue 1+1?',
         answers: [
               {id:1, body: 'El fantastico ralph'},
               {id:2, body: '2'},
               {id:3, body: '3'},
               {id:4, body: '4'}
         ],
         rightAnswerId: 1
      },
      {
      id: 2,
      body: 'Que cancion es de Chayanne',
      answers: [
            {id:1, body: 'La bomba'},
            {id:2, body: 'Amtsetan'},
            {id:3, body: 'Deajria todo'},
            {id:4, body: 'Colgando en tus manos'}
      ],
      rightAnswerId: 3
     },
     {
      id: 3,
      body: 'Cual es el diametro de la tierra',
      answers: [
          {id:1, body: '23 km'},
          {id:2, body: '12.742 km'},
          {id:3, body: '34 km'},
          {id:4, body: '3 m'}
      ],
      rightAnswerId: 2
      },
      {
         id: 4,
         body: 'A que universo pertenece the mandalorian?',
         answers: [
            {id:1, body: 'Star Wars'},
            {id:2, body: 'El rey leon'},
            {id:3, body: 'Batman'},
            {id:4, body: 'Los simpsons'}
         ],
         rightAnswerId: 1
      }     
    ];

    const currentQuestionIndex = ref(0);
    const currentQuestionId = ref(null);
    const quizFinished = ref(false);
    const version = ref(1);
    const result = ref([]);
    const score = ref(0);

    const quiz = computed(() => {
        const max = questions.length - 1;
        const min = 0;
        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < 5) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            uniqueNumbers.add(randomNumber);
        }

        const questionsCollection = [...uniqueNumbers].map(index => questions[index]);

        return {
            version: version.value,
            items: questionsCollection
        };
    });

    const updateProgress = (question, answerId) => {

        const answerisRight = question.rightAnswerId === answerId;

        if(answerisRight) score.value += 1;

        result.value = [...result.value, {
            ...question,
            userAnswer: question.answers.filter((choice) => answerId === choice.id)[0] ?? {body:'no answer'},
            answerisRight,
            rightAnswer: question.answers.filter((choice) => question.rightAnswerId === choice.id)[0]
        }];
    };

    const paginate = () => {
        if(currentQuestionIndex.value === quiz.value.items.length) return quizFinished.value = true;
        currentQuestionId.value = quiz.value.items[currentQuestionIndex.value].id;
        currentQuestionIndex.value += 1;
    };

    const restartQuiz = () => {
        currentQuestionIndex.value = 0;
        currentQuestionId.value = null;
        quizFinished.value = false;
        result.value = [];
        score.value = 0;

        version.value += 1;

        paginate();
    };

    return { 
        questions,  
        quizFinished, 
        quiz, 
        currentQuestionId, 
        paginate, 
        restartQuiz, 
        updateProgress, 
        result,  
        score
    };
});