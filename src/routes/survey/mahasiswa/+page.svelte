<script lang="ts">
	import { goto } from '$app/navigation';
	import { Card, ProgressBar, QuestionCard, StepNavigation } from '$lib/components';
	import { mahasiswaSurvey } from '$lib/data/questions-mahasiswa';
	import {
		surveyAnswers,
		currentStep,
		updateAnswer,
		toggleCheckboxAnswer,
		nextStep,
		prevStep,
		validateStep,
		resetSurvey,
		initSurvey
	} from '$lib/stores/survey';
	import {
		submitSurveyResponse,
		addBetaTester,
		checkEmailExists,
		isValidEmail
	} from '$lib/firebase/firestore';
	import { onMount } from 'svelte';

	let answers = $state<Record<string, string | string[]>>({});
	let step = $state(0);
	let isSubmitting = $state(false);
	let showErrors = $state(false);
	let emailError = $state('');

	// Subscribe to stores
	$effect(() => {
		const unsubAnswers = surveyAnswers.subscribe((v) => (answers = v));
		const unsubStep = currentStep.subscribe((v) => (step = v));
		return () => {
			unsubAnswers();
			unsubStep();
		};
	});

	onMount(() => {
		// Initialize survey with localStorage persistence
		initSurvey('mahasiswa');
	});

	const survey = mahasiswaSurvey;
	const currentStepData = $derived(survey.steps[step]);
	const stepTitles = survey.steps.map((s) => s.title);
	const isStepValid = $derived(validateStep(currentStepData, answers));

	function handleNext() {
		if (isStepValid) {
			showErrors = false;
			nextStep();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			showErrors = true;
		}
	}

	function handlePrev() {
		showErrors = false;
		prevStep();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function handleSubmit() {
		if (!isStepValid) {
			showErrors = true;
			return;
		}

		const email = (answers['email'] as string || '').toLowerCase().trim();

		// Validate email format
		if (email && !isValidEmail(email)) {
			emailError = 'Format email tidak valid';
			return;
		}

		isSubmitting = true;
		emailError = '';

		try {
			// Check if email already submitted
			if (email) {
				const emailExists = await checkEmailExists(email);
				if (emailExists) {
					emailError =
						'Email ini sudah pernah mengisi survei. Satu email hanya bisa digunakan sekali.';
					isSubmitting = false;
					return;
				}
			}

			// Normalize answers
			const normalizedAnswers = { ...answers };
			if (email) {
				normalizedAnswers['email'] = email;
			}

			// Prepare submission data
			const submissionData: any = {
				respondentType: 'mahasiswa',
				answers: normalizedAnswers
			};

			if (email) {
				submissionData.email = email;
			}

			// Submit survey response
			await submitSurveyResponse(submissionData);

			// Add beta tester if email provided
			if (email) {
				await addBetaTester(email, 'mahasiswa');
			}

			// Clear localStorage and redirect to thank you page
			resetSurvey('mahasiswa');
			goto('/thank-you?type=mahasiswa');
		} catch (error) {
			console.error('Error submitting survey:', error);
			alert('Terjadi kesalahan saat mengirim survei. Silakan coba lagi.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Survei Mahasiswa | Pra-Penelitian</title>
</svelte:head>

<div class="min-h-screen px-4 py-8">
	<div class="mx-auto max-w-2xl">
		<!-- Header -->
		<div class="animate-fade-in mb-8 text-center">
			<a
				href="/survey"
				class="mb-4 inline-flex items-center text-gray-400 transition-colors hover:text-indigo-400"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Kembali
			</a>
			<h1 class="mb-2 text-2xl font-bold text-white md:text-3xl">{survey.title}</h1>
			<p class="text-gray-400">{survey.description}</p>
		</div>

		<!-- Progress Bar -->
		<div class="animate-fade-in mb-8">
			<ProgressBar currentStep={step} totalSteps={survey.steps.length} {stepTitles} />
		</div>

		<!-- Form Card -->
		<Card variant="glass" padding="lg" class="animate-slide-up">
			<!-- Step Header -->
			<div class="mb-8">
				<h2 class="mb-2 text-xl font-semibold text-white">
					{currentStepData.title}
				</h2>
				{#if currentStepData.description}
					<p class="text-sm text-gray-400">{currentStepData.description}</p>
				{/if}
			</div>

			<!-- Questions -->
			<div class="space-y-6">
				{#each currentStepData.questions as question (question.id)}
					<QuestionCard
						{question}
						value={answers[question.id]}
						onchange={updateAnswer}
						ontoggle={toggleCheckboxAnswer}
						showError={showErrors}
					/>
				{/each}
			</div>

			<!-- Email Error Message -->
			{#if emailError}
				<div class="mt-4 rounded-xl border border-red-500/50 bg-red-500/20 p-4 text-red-400">
					<div class="flex items-center gap-2">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>{emailError}</span>
					</div>
				</div>
			{/if}

			<!-- Navigation -->
			<StepNavigation
				currentStep={step}
				totalSteps={survey.steps.length}
				canGoNext={isStepValid || !showErrors}
				{isSubmitting}
				onPrev={handlePrev}
				onNext={handleNext}
				onSubmit={handleSubmit}
			/>
		</Card>

		<!-- Step Info & Auto-save notice -->
		<div class="mt-6 text-center text-sm text-gray-500">
			<p>Langkah {step + 1} dari {survey.steps.length}</p>
			<p class="mt-1 text-xs text-gray-600">💾 Jawaban Anda tersimpan otomatis</p>
		</div>
	</div>
</div>
