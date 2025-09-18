// NoteSanté/note-sante/lib/types.ts
// This file defines the types used in the NoteSanté application.

export type Transcription = {
  _id: string;
  createdAt: Date;
  enregistrement: Blob | null;
  transcription: string | null;
};
