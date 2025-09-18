import { Transcription } from "@/lib/types";
import { AudioRecorder } from "./utils/audioRecorder";

export function Enregistrement({ new_transcription, setNewTranscription }: { new_transcription: Transcription, setNewTranscription: React.Dispatch<React.SetStateAction<Transcription>> }) {
	return (
		<div className="w-full">
			<h2 className="text-xl font-semibold mb-4 text-center">Enregistrement</h2>
			<div className="w-full">
				<AudioRecorder new_transcription={new_transcription} setNewTranscription={setNewTranscription} />
			</div>
		</div>
	)
}