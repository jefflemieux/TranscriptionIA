'use client'

import { MicIcon, PencilLineIcon } from 'lucide-react';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stepper } from './components/utils/stepper';
import { Enregistrement } from './components/enregistrement';
import TranscriptionComponent from './components/transcription';
import { Transcription } from '@/lib/types';

export default function NouvelleConsultationPage() {
	const [activeStep, setActiveStep] = React.useState(0);

	const [new_transcription, setNewTranscription] = useState<Transcription>({
		_id: '',
		createdAt: new Date(),
		enregistrement: null,
		transcription: null,
	});

	const steps = [
		{ label: 'Enregistrement', icon: <MicIcon /> },
		{ label: 'Transcription', icon: <PencilLineIcon /> },
	];

	return (
		<div className="flex flex-col items-center w-full">
			<h1 className="text-2xl font-bold mb-4">Nouvelle Trancription</h1>
			<div className='w-full'>
				<Stepper activeStep={activeStep}>
					{steps.map((step, index) => (
						<div key={index} className={`flex items-center ${index === activeStep ? '' : 'text-black'}`}>
							{step.icon}
						</div>
					))}
				</Stepper>
			</div>
			<div className='w-full max-w-[600px] mt-5'>
				{activeStep === 0 && <Enregistrement new_transcription={new_transcription} setNewTranscription={setNewTranscription} />}
				{activeStep === 1 && <TranscriptionComponent new_transcription={new_transcription} setNewTranscription={setNewTranscription} />}
			</div>
			<div className='flex w-full max-w-72 justify-between mt-4'>
				<div className=''>
					<Button disabled={activeStep === 0} onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}>Précédent</Button>
				</div>
				<div className=''>
					<Button disabled={activeStep === 1} onClick={() => setActiveStep((prev) => Math.min(prev + 1, 4))}>Suivant</Button>
				</div>
			</div>
		</div>
	);
}