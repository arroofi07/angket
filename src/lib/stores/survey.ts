import { writable, get } from 'svelte/store';
import type { Question, SurveyStep } from '$lib/types/survey';
import { browser } from '$app/environment';

const STORAGE_KEY_PREFIX = 'survey_';

// Current step in the survey
function createStepStore(surveyType: string) {
	const storageKey = `${STORAGE_KEY_PREFIX}${surveyType}_step`;
	const initialValue = browser ? parseInt(localStorage.getItem(storageKey) || '0', 10) : 0;
	
	const { subscribe, set, update } = writable(initialValue);
	
	return {
		subscribe,
		set: (value: number) => {
			set(value);
			if (browser) {
				localStorage.setItem(storageKey, value.toString());
			}
		},
		update
	};
}

// Survey answers store with localStorage persistence
function createAnswersStore(surveyType: string) {
	const storageKey = `${STORAGE_KEY_PREFIX}${surveyType}_answers`;
	const initialValue = browser ? JSON.parse(localStorage.getItem(storageKey) || '{}') : {};
	
	const { subscribe, set, update } = writable<Record<string, string | string[]>>(initialValue);
	
	return {
		subscribe,
		set: (value: Record<string, string | string[]>) => {
			set(value);
			if (browser) {
				localStorage.setItem(storageKey, JSON.stringify(value));
			}
		},
		update: (fn: (value: Record<string, string | string[]>) => Record<string, string | string[]>) => {
			update((current) => {
				const newValue = fn(current);
				if (browser) {
					localStorage.setItem(storageKey, JSON.stringify(newValue));
				}
				return newValue;
			});
		}
	};
}

// Default stores (will be overridden per survey type)
export const currentStep = writable(0);
export const surveyAnswers = writable<Record<string, string | string[]>>({});

// Survey-specific stores
let mahasiswaStep = browser ? createStepStore('mahasiswa') : writable(0);
let mahasiswaAnswers = browser ? createAnswersStore('mahasiswa') : writable({});
let dosenStep = browser ? createStepStore('dosen') : writable(0);
let dosenAnswers = browser ? createAnswersStore('dosen') : writable({});

// Initialize survey for a specific type
export function initSurvey(type: 'mahasiswa' | 'dosen') {
	if (type === 'mahasiswa') {
		currentStep.set(get(mahasiswaStep));
		surveyAnswers.set(get(mahasiswaAnswers));
		
		// Sync changes back to type-specific stores
		currentStep.subscribe((v) => mahasiswaStep.set(v));
		surveyAnswers.subscribe((v) => mahasiswaAnswers.set(v));
	} else {
		currentStep.set(get(dosenStep));
		surveyAnswers.set(get(dosenAnswers));
		
		currentStep.subscribe((v) => dosenStep.set(v));
		surveyAnswers.subscribe((v) => dosenAnswers.set(v));
	}
}

// Reset survey (clears localStorage too)
export function resetSurvey(type?: 'mahasiswa' | 'dosen') {
	currentStep.set(0);
	surveyAnswers.set({});
	
	if (browser) {
		if (type) {
			localStorage.removeItem(`${STORAGE_KEY_PREFIX}${type}_step`);
			localStorage.removeItem(`${STORAGE_KEY_PREFIX}${type}_answers`);
		} else {
			// Clear all survey data
			localStorage.removeItem(`${STORAGE_KEY_PREFIX}mahasiswa_step`);
			localStorage.removeItem(`${STORAGE_KEY_PREFIX}mahasiswa_answers`);
			localStorage.removeItem(`${STORAGE_KEY_PREFIX}dosen_step`);
			localStorage.removeItem(`${STORAGE_KEY_PREFIX}dosen_answers`);
		}
	}
}

// Update answer
export function updateAnswer(questionId: string, value: string | string[]) {
	surveyAnswers.update((answers) => ({
		...answers,
		[questionId]: value
	}));
}

// Toggle checkbox answer
export function toggleCheckboxAnswer(questionId: string, value: string) {
	surveyAnswers.update((answers) => {
		const current = answers[questionId] as string[] | undefined;
		if (!current) {
			return { ...answers, [questionId]: [value] };
		}
		if (current.includes(value)) {
			return { ...answers, [questionId]: current.filter((v) => v !== value) };
		}
		return { ...answers, [questionId]: [...current, value] };
	});
}

// Next step
export function nextStep() {
	currentStep.update((n) => n + 1);
}

// Previous step
export function prevStep() {
	currentStep.update((n) => Math.max(0, n - 1));
}

// Go to specific step
export function goToStep(step: number) {
	currentStep.set(step);
}

// Check if current step is valid
export function validateStep(step: SurveyStep, answers: Record<string, string | string[]>): boolean {
	for (const question of step.questions) {
		if (question.required) {
			const answer = answers[question.id];
			if (!answer || (Array.isArray(answer) && answer.length === 0)) {
				return false;
			}
		}
	}
	return true;
}

// Get unanswered required questions in a step
export function getUnansweredQuestions(
	step: SurveyStep,
	answers: Record<string, string | string[]>
): Question[] {
	return step.questions.filter((q) => {
		if (!q.required) return false;
		const answer = answers[q.id];
		return !answer || (Array.isArray(answer) && answer.length === 0);
	});
}
