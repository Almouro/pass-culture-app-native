import {
  CulturalSurveyQuestionEnum,
  CulturalSurveyAnswerEnum,
  CulturalSurveyUserAnswer,
} from 'api/gen'

export interface CulturalSurveyState {
  questionsToDisplay: CulturalSurveyQuestionEnum[]
  answers: CulturalSurveyUserAnswer[]
}

export type Action =
  | {
      type: 'INIT_QUESTION_KEYS'
      payload: {
        questions: CulturalSurveyState['questionsToDisplay']
        answers: CulturalSurveyState['answers']
      }
    }
  | { type: 'SET_QUESTIONS'; payload: CulturalSurveyQuestionEnum[] }
  | {
      type: 'SET_ANSWERS'
      payload: {
        questionId: CulturalSurveyQuestionEnum
        answers: CulturalSurveyAnswerEnum[]
      }
    }
