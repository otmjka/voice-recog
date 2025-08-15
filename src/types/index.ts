import { z } from 'zod';

const VoiceRecordSchema = z.any().nullable();
const SpeachResultSchema = z.string().nullable();

/* */

export const memoIdSchema = z.string();

export type MemoId = z.infer<typeof memoIdSchema>;

export const tokenFormSchema = z.object({
  token: z.string().min(1),
});

const TokenSchema = tokenFormSchema;
/* */
export const createNewMemoSchema = z.object({
  id: memoIdSchema, // MemoId
  title: z.string(),
  tokens: z.array(TokenSchema),
  description: z.string().optional(),
  audio: VoiceRecordSchema,
  speach: SpeachResultSchema,
  created: z.number().optional(),
  updated: z.number().optional(),
});

export type AddMemoFormValue = z.infer<typeof createNewMemoSchema>;
export type MemoRecord = AddMemoFormValue;

export type VoiceRecord = unknown;

/** */
/** States */ // TODO: => MainPage space
export type MemoListState = {
  memoList: Array<AddMemoFormValue>;
  onEdit: (params: { id: MemoId }) => void;
  onRemove: (params: { id: MemoId }) => void;
};

// MemoRecord
export type AddMemoHandler = (item: AddMemoFormValue) => void;

/** */
/** Tokens */
export type AddTokenFormValue = z.infer<typeof tokenFormSchema>;
export type Token = AddTokenFormValue; // {'12332': 'daily', '2341': 'note'}
export type TokenListItems = Array<Token>;

export type RecResult = {
  audio: { result?: Blob; error?: unknown };
  speach: { result?: string; error?: unknown };
};

export type OnRecordResultHandler = (params: RecResult) => void;
