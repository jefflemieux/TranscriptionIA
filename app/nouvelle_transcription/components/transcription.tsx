"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Transcription } from "@/lib/types";
import { useEffect, useState } from "react";

export default function TranscriptionComponent({ new_transcription, setNewTranscription }: {
	new_transcription: Transcription;
	setNewTranscription: React.Dispatch<React.SetStateAction<Transcription>>;
}) {
	const [transcription, setTranscription] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (new_transcription.transcription) {
			setTranscription(new_transcription.transcription);
		} else {
			const formData = new FormData();
			const audioBlob = new Blob([new_transcription.enregistrement!], { type: 'audio/webm' });
			formData.append('file', audioBlob, 'audio.webm'); // or .mp3

			fetch('/api/transcribe', {
				method: 'POST',
				body: formData,
			}).then(async (res) => {
				const data = await res.json();
				// console.log('Transcription response:', data);
				setTranscription(data.text);
				setNewTranscription((prev) => ({
					...prev,
					transcription: data.text
				}));
				setLoading(false);
			});
		}
	}, [new_transcription.transcription, new_transcription.enregistrement, setNewTranscription]);

	return (
		<div className="w-full">
			<h2 className="text-xl font-semibold mb-4 text-center">Transcription</h2>
			<div className="w-full">
				{
					loading ? <p className="text-center">Transcription en cours. Veuillez patienter...</p>
						:
						<Textarea value={transcription || ""} onChange={(e) => setTranscription(e.target.value)} />
				}
			</div>
			<div>
				{!loading && <p className="text-sm text-muted-foreground text-center mt-2">Vous pouvez éditer la transcription si nécessaire.</p>}
			</div>
			<div className="flex justify-center">
				{!loading && <Button className="mt-4 px-4 py-2"
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob([transcription || ""], { type: 'text/plain' });
						element.href = URL.createObjectURL(file);
						element.download = "transcription.txt";
						document.body.appendChild(element); // Required for this to work in FireFox
						element.click();
					}}>
					Télécharger la transcription en .txt
				</Button>}
			</div>
		</div>
	);
}