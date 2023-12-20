import { FilterOption } from '../types/FilterTypes';

export const COURSE_LEVELS = {
  ALL: 'ALL',
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  EXTREME: 'EXTREME'
};

export const LANGUAGES = {
  ALL: 'ALL',
  ENGLISH: 'ENGLISH',
  SPANISH: 'SPANISH'
}

export const AUTH_OPERATIONS = {
  LOGIN: 'LOGIN',
  CREATE: 'CREATE'
}

export const LEVEL_OPTIONS: FilterOption[] = [
  {
    name: 'All',
    value: COURSE_LEVELS.ALL
  },
  {
    name: 'Easy',
    value: COURSE_LEVELS.EASY
  },
  {
    name: 'Medium',
    value: COURSE_LEVELS.MEDIUM
  },
  {
    name: 'Hard',
    value: COURSE_LEVELS.HARD
  },
  {
    name: 'Extreme',
    value: COURSE_LEVELS.EXTREME
  }
];

export const LANGUAGE_OPTIONS: FilterOption[] = [
  {
    name: 'All',
    value: LANGUAGES.ALL
  },
  {
    name: 'English',
    value: LANGUAGES.ENGLISH
  },
  {
    name: 'Spanish',
    value: LANGUAGES.SPANISH
  }
];