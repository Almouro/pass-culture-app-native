import { Action, CulturalSurveyState } from 'features/culturalSurvey/context/types'

export const initialCulturalSurveyState: CulturalSurveyState = {
  currentStep: null,
  questionsToDisplay: [],
  answers: {},
}

export const culturalSurveyReducer: React.Reducer<CulturalSurveyState, Action> = (
  state,
  action
) => {
  switch (action.type) {
    case 'INIT_QUESTION_KEYS':
      return {
        ...state,
        questionsToDisplay: action.payload.questions,
        answers: action.payload.answers,
      }
    case 'SET_QUESTIONS':
      return { ...state, questionsToDisplay: action.payload }
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_ANSWERS':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answers,
        },
      }
    default:
      return { ...state }
  }
}