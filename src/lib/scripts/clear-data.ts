// Script to clear all survey responses from Firestore
// Run with: npx tsx src/lib/scripts/clear-data.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD81k37nCJMHthLCCD-Ho62bSfNkC2G5sM',
	authDomain: 'angket-5b31b.firebaseapp.com',
	projectId: 'angket-5b31b',
	storageBucket: 'angket-5b31b.firebasestorage.app',
	messagingSenderId: '1017259840410',
	appId: '1:1017259840410:web:010c4f0b70bd82fba0a023'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearCollection(collectionName: string) {
	console.log(`🗑️  Deleting all documents from '${collectionName}'...`);
	
	const snapshot = await getDocs(collection(db, collectionName));
	const total = snapshot.size;
	
	if (total === 0) {
		console.log(`   No documents found in '${collectionName}'`);
		return 0;
	}
	
	let deleted = 0;
	for (const docSnap of snapshot.docs) {
		await deleteDoc(doc(db, collectionName, docSnap.id));
		deleted++;
		process.stdout.write(`   Deleted ${deleted}/${total}\r`);
	}
	
	console.log(`\n   ✅ Deleted ${deleted} documents from '${collectionName}'`);
	return deleted;
}

async function clearAllData() {
	console.log('🧹 Starting data cleanup...\n');
	
	// Clear responses collection
	const responsesDeleted = await clearCollection('responses');
	
	// Clear beta_testers collection
	const betaTestersDeleted = await clearCollection('beta_testers');
	
	console.log('\n🎉 Cleanup completed!');
	console.log(`   Total deleted: ${responsesDeleted + betaTestersDeleted} documents`);
	console.log('   - responses:', responsesDeleted);
	console.log('   - beta_testers:', betaTestersDeleted);
	
	process.exit(0);
}

// Run the cleanup
clearAllData().catch((error) => {
	console.error('❌ Cleanup failed:', error);
	process.exit(1);
});
