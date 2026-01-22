import {
	collection,
	addDoc,
	getDocs,
	getDoc,
	doc,
	query,
	where,
	orderBy,
	Timestamp,
	getCountFromServer,
	deleteDoc
} from 'firebase/firestore';
import { getDb } from './config';
import type { SurveyResponse, BetaTester, SurveyStats } from '$lib/types/survey';

const RESPONSES_COLLECTION = 'responses';
const BETA_TESTERS_COLLECTION = 'beta_testers';

// Delete a survey response
export async function deleteResponse(id: string): Promise<void> {
	const db = getDb();
	await deleteDoc(doc(db, RESPONSES_COLLECTION, id));
}

// Submit a survey response
export async function submitSurveyResponse(
	response: Omit<SurveyResponse, 'id' | 'createdAt'>
): Promise<string> {
	const db = getDb();
	const docRef = await addDoc(collection(db, RESPONSES_COLLECTION), {
		...response,
		createdAt: Timestamp.now()
	});
	return docRef.id;
}

// Add beta tester email
export async function addBetaTester(
	email: string,
	respondentType: 'mahasiswa' | 'dosen'
): Promise<string> {
	const db = getDb();
	const docRef = await addDoc(collection(db, BETA_TESTERS_COLLECTION), {
		email,
		respondentType,
		createdAt: Timestamp.now()
	});
	return docRef.id;
}

// Check if email has already submitted a response
export async function checkEmailExists(email: string): Promise<boolean> {
	if (!email || email.trim() === '') {
		return false; // Empty email is allowed (optional field)
	}
	
	const db = getDb();
	const q = query(
		collection(db, RESPONSES_COLLECTION),
		where('answers.email', '==', email.toLowerCase().trim())
	);
	const snapshot = await getDocs(q);
	return !snapshot.empty;
}

// Check if email is valid format
export function isValidEmail(email: string): boolean {
	if (!email || email.trim() === '') {
		return true; // Empty is valid (optional field)
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Get all responses
export async function getAllResponses(): Promise<SurveyResponse[]> {
	const db = getDb();
	const q = query(collection(db, RESPONSES_COLLECTION), orderBy('createdAt', 'desc'));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
		createdAt: doc.data().createdAt?.toDate()
	})) as SurveyResponse[];
}

// Get responses by type
export async function getResponsesByType(
	type: 'mahasiswa' | 'dosen'
): Promise<SurveyResponse[]> {
	const db = getDb();
	const q = query(
		collection(db, RESPONSES_COLLECTION),
		where('respondentType', '==', type),
		orderBy('createdAt', 'desc')
	);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
		createdAt: doc.data().createdAt?.toDate()
	})) as SurveyResponse[];
}

// Get response count
export async function getResponseCount(): Promise<{
	total: number;
	mahasiswa: number;
	dosen: number;
}> {
	const db = getDb();

	const totalSnapshot = await getCountFromServer(collection(db, RESPONSES_COLLECTION));
	const total = totalSnapshot.data().count;

	const mahasiswaQuery = query(
		collection(db, RESPONSES_COLLECTION),
		where('respondentType', '==', 'mahasiswa')
	);
	const mahasiswaSnapshot = await getCountFromServer(mahasiswaQuery);
	const mahasiswa = mahasiswaSnapshot.data().count;

	const dosenQuery = query(
		collection(db, RESPONSES_COLLECTION),
		where('respondentType', '==', 'dosen')
	);
	const dosenSnapshot = await getCountFromServer(dosenQuery);
	const dosen = dosenSnapshot.data().count;

	return { total, mahasiswa, dosen };
}

// Get statistics for dashboard
export async function getSurveyStats(): Promise<SurveyStats> {
	const responses = await getAllResponses();
	const counts = await getResponseCount();

	const mahasiswaResponses = responses.filter((r) => r.respondentType === 'mahasiswa');
	const dosenResponses = responses.filter((r) => r.respondentType === 'dosen');

	// Calculate statistics
	const stats: SurveyStats = {
		totalResponses: counts.total,
		mahasiswaCount: counts.mahasiswa,
		dosenCount: counts.dosen,

		// Pain point stats (from mahasiswa)
		pdfDifficultyStats: calculateDistribution(mahasiswaResponses, 'kesulitan_pdf'),
		aiUsageStats: calculateDistribution(mahasiswaResponses, 'penggunaan_ai'),
		hallucinationStats: calculateDistribution(mahasiswaResponses, 'halusinasi_ai'),

		// Solution validation stats
		mahasiswaNeedStats: calculateDistribution(mahasiswaResponses, 'kebutuhan_asisten'),
		dosenSupportStats: calculateDistribution(dosenResponses, 'dukungan_sistem'),

		// Demographics
		prodiDistribution: calculateDistribution(responses, 'prodi'),
		semesterDistribution: calculateDistribution(mahasiswaResponses, 'semester')
	};

	return stats;
}

// Helper function to calculate distribution
function calculateDistribution(
	responses: SurveyResponse[],
	questionId: string
): Record<string, number> {
	const distribution: Record<string, number> = {};

	responses.forEach((response) => {
		const answer = response.answers[questionId];
		if (answer) {
			if (Array.isArray(answer)) {
				answer.forEach((a) => {
					distribution[a] = (distribution[a] || 0) + 1;
				});
			} else {
				distribution[answer] = (distribution[answer] || 0) + 1;
			}
		}
	});

	return distribution;
}

// Get all beta testers
export async function getAllBetaTesters(): Promise<BetaTester[]> {
	const db = getDb();
	const q = query(collection(db, BETA_TESTERS_COLLECTION), orderBy('createdAt', 'desc'));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
		createdAt: doc.data().createdAt?.toDate()
	})) as BetaTester[];
}
