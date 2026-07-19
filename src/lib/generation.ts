export type GenerationPayload = {
  prompt: string;
  mediaType: "image" | "video" | "music" | "code";
  style: string;
  hasReference: boolean;
};

export type GenerationStatus =
  | "idle"
  | "queued"
  | "generating"
  | "refining"
  | "complete"
  | "error";
