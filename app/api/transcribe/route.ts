import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
        },
        body: (() => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("model", "gpt-4o-transcribe");
          fd.append(
            "prompt",
            "This is an audio transcription. Please transcribe it accurately."
          );
          return fd;
        })(),
      }
    );
    const json = await openaiRes.json();
    return NextResponse.json({ text: json.text || "Transcription failed" });
  } catch (error) {
    console.error("Error during transcription:", error);
    return NextResponse.json(
      { error: "Transcription failed" },
      { status: 500 }
    );
  }
}
