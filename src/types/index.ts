export type VoiceRecord = unknown;

export type Token = string; // {'12332': 'daily', '2341': 'note'}

export type MemoRecord = {
  id: string;
  tokens: Array<Token>;
  summary: string;
  description: string;
  records: Array<VoiceRecord>; // ! save all mb usefull in future
};

export type MemoListState = {
  memoList: Array<MemoRecord>;
};

export type AddMemoHandler = (item: MemoRecord) => void;
