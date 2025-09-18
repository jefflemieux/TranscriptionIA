'use client'

import { Card } from "@/components/ui/card";
import { FolderOpenDotIcon, FolderPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<>
			<div className="flex flex-col w-full items-center min-h-screen">
				<Card className="w-full max-w-md mt-10 shadow-lg cursor-pointer"
					onClick={() => router.push('/nouvelle_transcription')}>
					<div className="p-6 mx-auto">
						<div className="flex gap-5">
							<FolderPlusIcon size={75} />
							<p className="my-auto text-xl font-semibold">Nouvelle transcription</p>
						</div>
					</div>
				</Card>
				<Card className="w-full max-w-md mt-10 shadow-lg cursor-pointer">
					<div className="p-6 mx-auto">
						<div className="flex gap-5">
							<FolderOpenDotIcon size={75} />
							<p className="my-auto text-xl font-semibold">Transcriptions</p>
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}
