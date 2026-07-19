export type GenerationPayload = {
  prompt: string;
  negativePrompt: string;
  model: string;
  style: string;
  aspect: string;
  quality: string;
  mode: "image" | "video";
  hasReference: boolean;
};

export type PreviewState = {
  prompt: string;
  mode: "image" | "video";
  model: string;
  style: string;
  aspect: string;
  quality: string;
  progress: number;
};
