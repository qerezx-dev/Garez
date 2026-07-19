export type GenerationPayload = {
  prompt: string;
  negativePrompt: string;
  providerId: string;
  providerName: string;
  aspect: string;
  quality: string;
  creativity: number;
  seed: string;
  outputCount: number;
  hasReference: boolean;
  mode: "image" | "video";
  toolId: string;
  toolLabel: string;
};

export type GenerationStatus =
  | "idle"
  | "queued"
  | "generating"
  | "refining"
  | "complete"
  | "error";
