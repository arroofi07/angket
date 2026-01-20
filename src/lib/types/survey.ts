export type RespondentType = 'mahasiswa' | 'dosen';

export interface SurveyResponse {
	id: string;
	respondentType: RespondentType;
	createdAt: Date;

	// Answers stored by question ID
	answers: Record<string, string | string[]>;

	// Optional fields
	email?: string;
	suggestions?: string;
}

export interface BetaTester {
	id?: string;
	email: string;
	respondentType: RespondentType;
	createdAt: Date;
}

export interface SurveyStats {
	totalResponses: number;
	mahasiswaCount: number;
	dosenCount: number;

	// Pain point statistics
	pdfDifficultyStats: Record<string, number>;
	aiUsageStats: Record<string, number>;
	hallucinationStats: Record<string, number>;

	// Solution validation
	mahasiswaNeedStats: Record<string, number>;
	dosenSupportStats: Record<string, number>;

	// Demographics
	prodiDistribution: Record<string, number>;
	semesterDistribution: Record<string, number>;
}

export interface Question {
	id: string;
	text: string;
	type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'email' | 'dropdown';
	options?: string[];
	required?: boolean;
	placeholder?: string;
	useDropdown?: boolean; // Use searchable dropdown for long option lists
}

export interface SurveyStep {
	title: string;
	description?: string;
	questions: Question[];
}

export interface SurveyConfig {
	type: RespondentType;
	title: string;
	description: string;
	steps: SurveyStep[];
}
