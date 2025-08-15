import {
  type AddMemoFormValue,
  type AddTokenFormValue,
} from '../utils/validators';

export type VoiceRecord = unknown;

/*
export type MemoRecord = {
  id: string;
  title: string;
  tokens: Array<Token>;
  summary: string;
  description: string;
  records: Array<VoiceRecord>; // ! save all mb usefull in future
};
*/

export type MemoListState = {
  memoList: Array<AddMemoFormValue>;
};

export type MemoRecord = AddMemoFormValue;

// MemoRecord
export type AddMemoHandler = (item: AddMemoFormValue) => void;

export { type AddMemoFormValue, type AddTokenFormValue };

export type Token = AddTokenFormValue; // {'12332': 'daily', '2341': 'note'}
export type TokenListItems = Array<Token>;
