import { Langs } from '@/enums/langs';

type ResultParams = {
  error?: unknown;
  result?: { finalTranscript: string; interimTranscript: string };
};

type ResultHandler = (params: ResultParams) => void;

class SpeechRecognizer {
  recognition: SpeechRecognition | null = null;
  recognizing: boolean = false;
  finalTranscript: string = '';
  startTimestamp: number = 0;
  onResult: ResultHandler = () => {};
  constructor() {}

  setup() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error({
        error: 'Web Speech API не поддерживается в этом браузере',
      });
      return;
    }

    this.recognition = new SpeechRecognition();

    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.recognizing = true;
    };

    this.recognition.onerror = (event) => {
      this.onResult({ error: event.error });
    };

    this.recognition.onend = () => {
      this.recognizing = false;
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      if (typeof event.results == 'undefined') {
        if (this.recognition) {
          this.recognition.onend = null;
          this.recognition.stop();
        }
        return;
      }
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.onResult({
        result: {
          finalTranscript: this.finalTranscript,
          interimTranscript,
        },
      });
    };
  }

  start({
    lang = Langs.en,
    onResult,
  }: {
    lang?: Langs;
    onResult?: ResultHandler;
  }) {
    this.onResult = onResult ?? this.onResult;

    if (!this.recognition) {
      console.log('recognition is undefined');
      return;
    }
    this.finalTranscript = '';
    this.recognition.lang = lang;
    this.recognition.start();
    this.startTimestamp = Date.now();
  }

  stop() {
    if (!this.recognizing || !this.recognition) {
      return;
    }
    this.recognition.stop();
  }
}

export const speechRecognizer = new SpeechRecognizer();
