'use client'

import React, { useEffect, useMemo, useState } from "react";
import { CheckIcon, MicIcon, PauseIcon, PlayIcon, XIcon } from "lucide-react";
import { useWavesurfer } from "@wavesurfer/react";
import Record from "wavesurfer.js/dist/plugins/record.js";
import { Button } from "@/components/ui/button";
import { Transcription } from "@/lib/types";

export function AudioRecorder({ new_transcription, setNewTranscription }: { new_transcription: Transcription, setNewTranscription: React.Dispatch<React.SetStateAction<Transcription>> }) {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const recordBtnRef = React.useRef<HTMLDivElement>(null);

	const [recordedUrl, setRecordedUrl] = useState<string | undefined>(undefined);
	const [playbackTime, setPlaybackTime] = useState<string>('00:00');
	const [isRecording, setIsRecording] = useState(false);
	const [recorded, setRecorded] = useState<boolean>(false);

	useEffect(() => {
		if (new_transcription.enregistrement) {
			setRecorded(true);
		} else {
			setRecorded(false);
		}
		if (new_transcription.enregistrement && !recordedUrl) {
			const url = URL.createObjectURL(new_transcription.enregistrement);
			recordBtnRef.current?.style.setProperty('background-color', 'grey');
			setRecordedUrl(url);
		}
	}, [new_transcription.enregistrement, recordedUrl]);

	const recordPlugin = useMemo(() => Record.create({
		renderRecordedAudio: false,
		scrollingWaveform: true,
	}), [])

	const { wavesurfer, isPlaying } = useWavesurfer({
		container: containerRef,
		waveColor: 'black',
		progressColor: 'grey',
		cursorColor: 'black',
		url: recordedUrl,
	});

	const formatTime = (input: number, isMilliseconds = false) => {
		const totalSeconds = isMilliseconds ? input / 1000 : input;
		return [totalSeconds / 60, totalSeconds % 60]
			.map((v) => `0${Math.floor(v)}`.slice(-2))
			.join(':');
	};

	useEffect(() => {
		if (wavesurfer) {
			wavesurfer.registerPlugin(recordPlugin);
			wavesurfer.on('timeupdate', (time) => {
				setPlaybackTime(formatTime(time));
			});
			recordPlugin!.on('record-end', (blob: Blob) => {
				const url = URL.createObjectURL(blob);
				setRecordedUrl(url);
				setNewTranscription((prev) => ({
					...prev,
					enregistrement: blob,
					transcription: null
				}));
				setRecorded(true);
				recordBtnRef.current?.style.setProperty('background-color', 'grey');
				setIsRecording(false);
			});
			recordPlugin!.on('record-progress', (time: number) => {
				setPlaybackTime(formatTime(time, true));
			});
			recordPlugin!.on('record-start', () => {
				setIsRecording(true);
			});
		}
	}, [wavesurfer, recordPlugin, setNewTranscription]);

	return (
		<div className="w-full" >
			<div onClick={() => {
				if (!recorded) {
					if (!recordPlugin) {
						console.error("Record plugin not found");
						return;
					}
					if (recordPlugin.isRecording()) {
						recordPlugin.stopRecording();
					} else {
						recordPlugin.startRecording().catch((error) => {
							console.error("Error starting recording:", error);
						});
					}
				}
			}} className={`cursor-pointer w-[150px] h-[150px]  rounded-full flex mx-auto p-5  hover:scale-105  ${isRecording ? 'bg-red-400 hover:bg-red-500' : 'bg-secondary'} transition-all duration-300`}
				ref={recordBtnRef}
			>
				<MicIcon size={50} color="white" className="m-auto" />
			</div>
			<div className="text-center mt-10">
				{playbackTime}
			</div>
			<div ref={containerRef} />
			{
				recordedUrl &&
				<div className="relative flex justify-center items-center mt-8 mb-5 bg-white rounded-lg shadow-lg p-4">
					<div className="flex ml-0 mr-auto">
						<Button onClick={() => {
							setRecordedUrl(undefined);
							setRecorded(false);
							setPlaybackTime('00:00');
							recordBtnRef.current?.style.removeProperty('background-color');
						}} className="bg-red-500">
							<XIcon />
						</Button>
					</div>
					<div className="absolute flex left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90px] h-[90px] rounded-full">
						<Button className="m-auto w-[75px] h-[75px]" color="blue" onClick={() => {
							wavesurfer?.playPause();
						}}>
							{isPlaying ? <PauseIcon /> : <PlayIcon />}
						</Button>
					</div>
					<div className="flex ml-auto mr-0">
						<Button className="bg-green-500" onClick={() => {
							wavesurfer?.stop();
						}}>
							<CheckIcon />
						</Button>
					</div>
				</div>
			}
		</div >
	)
}

