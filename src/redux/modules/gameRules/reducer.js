import types from './types';

const initialState = {
  mistakes: 3,
  userOfErrors: 0,
  timeInMinutes: 5,
  currentQuestion: -1,
};

const gameRules = (state = initialState, action) => {

  switch (action.type) {
    case types.STEP_NEXT :
      console.log(action);
      console.log('action');
      const {
        currentQuestion,
      } = state;

      return {
        ...state,
        currentQuestion: currentQuestion + 1,
      }

    case types.GENGE_USER_ANSWER:
      const {
        payload: {
          userAnaswer,
          rightAnswer,
          answers
        }
      } = action;

      const countRightAnswer = answers.reduce((acc, el) => (
        el.genre === rightAnswer ? acc + 1 : acc
      ), 0);

      const mapRightAnswer = userAnaswer.map((el) => {
        if (answers[el].genre === rightAnswer) {
          return true;
        }
        return false;
      });

      const isEveryRight = mapRightAnswer.every(el => el);

      const notError = isEveryRight && mapRightAnswer.length === countRightAnswer;
      const userOfErrors = notError ? state.userOfErrors :  state.userOfErrors + 1

      return {
        ...state,
        userOfErrors,
      }

    case types.QUESTIONS_RESET :
      return {
        ...state,
        currentQuestion: action.payload
      }


    default:
      return state

  }
}

export default gameRules;