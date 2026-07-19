"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eraser, History, ImagePlus, LayoutTemplate, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PROMPT_TEMPLATES,
  type PromptTemplate,
} from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type PromptEditorProps = {
  value: string;
  onChange: (value: string) => void;
  referenceName: string | null;
  onReferenceChange: (name: string | null) => void;
  promptHistory: string[];
  onSelectHistoryPrompt: (prompt: string) => void;
  focused: boolean;
  onFocusedChange: (focused: boolean) => void;
  onSubmit?: () => void;
};

export function PromptEditor({
  value,
  onChange,
  referenceName,
  onReferenceChange,
  promptHistory,
  onSelectHistoryPrompt,
  focused,
  onFocusedChange,
  onSubmit,
}: PromptEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [dragging, setDragging] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const resize = useCallback(() => {
    const node = textareaRef.current;
    if (!node) return;
    node.style.height = "0px";
    node.style.height = `${Math.max(node.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    resize();
  }, [value, resize]);

  const attachFile = useCallback(
    (file?: File | null) => {
      if (!file || !file.type.startsWith("image/")) return;
      onReferenceChange(file.name);
    },
    [onReferenceChange]
  );

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    attachFile(event.dataTransfer.files?.[0]);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    attachFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const applyTemplate = (template: PromptTemplate) => {
    onChange(template.prompt);
    setShowTemplates(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Prompt Editor
          </p>
          <p className="mt-1 text-sm text-white/55">
            Write, refine, and stage your generation.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl text-white/65 hover:bg-white/8 hover:text-white"
            onClick={() => {
              setShowTemplates((open) => !open);
              setShowHistory(false);
            }}
          >
            <LayoutTemplate data-icon="inline-start" />
            Templates
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl text-white/65 hover:bg-white/8 hover:text-white"
            onClick={() => {
              setShowHistory((open) => !open);
              setShowTemplates(false);
            }}
          >
            <History data-icon="inline-start" />
            History
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl text-white/65 hover:bg-white/8 hover:text-white"
            onClick={() => {
              onChange("");
              onReferenceChange(null);
            }}
            disabled={!value && !referenceName}
          >
            <Eraser data-icon="inline-start" />
            Clear
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {PROMPT_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-left transition hover:border-neon-blue/30 hover:bg-white/[0.06]"
                >
                  <p className="text-xs font-medium text-white">{template.label}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/45">
                    {template.prompt}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {promptHistory.length === 0 ? (
                <p className="text-xs text-white/40">No prompt history yet.</p>
              ) : (
                promptHistory.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onSelectHistoryPrompt(item);
                      setShowHistory(false);
                    }}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-left text-xs text-white/60 transition hover:border-neon-blue/30 hover:text-white"
                  >
                    {item}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-3 transition-all duration-300",
          focused && "border-neon-blue/35 bg-white/[0.035]",
          dragging && "border-neon-blue/50 bg-neon-blue/5"
        )}
      >
        <AnimatePresence>
          {dragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 grid place-items-center rounded-2xl bg-[#0a0d18]/80 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-sm text-white">
                <Upload className="size-4 text-neon-cyan" />
                Drop reference image
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <label htmlFor="noro-prompt-editor" className="sr-only">
          Prompt
        </label>
        <textarea
          id="noro-prompt-editor"
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => onFocusedChange(true)}
          onBlur={() => onFocusedChange(false)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              onSubmit?.();
            }
          }}
          placeholder="Describe the world you want to create…"
          className="min-h-[160px] w-full resize-none overflow-hidden bg-transparent px-1 py-1 text-[15px] leading-relaxed text-white outline-none placeholder:text-white/35 sm:text-base"
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl text-white/70 hover:bg-white/8 hover:text-white"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus data-icon="inline-start" />
            Upload image
          </Button>
          {referenceName ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-blue/25 bg-neon-blue/10 px-3 py-1 text-xs text-white/80">
              {referenceName}
              <button
                type="button"
                aria-label="Remove reference"
                onClick={() => onReferenceChange(null)}
                className="rounded-full p-0.5 hover:bg-white/10"
              >
                <X className="size-3" />
              </button>
            </span>
          ) : (
            <span className="text-xs text-white/35">
              or drag & drop a reference
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
