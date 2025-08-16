class AudioRecorder {
  mediaRecorder: MediaRecorder | null = null;
  chunks: Array<Blob> = [];

  async start(): Promise<{ result: Blob; error?: unknown }> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    return new Promise((resolve, reject) => {
      try {
        this.mediaRecorder = new MediaRecorder(stream);
        const mimeType = this.mediaRecorder.mimeType;

        this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
          this.chunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
          if (!this.mediaRecorder) {
            console.log('this.mediaRecorder is undefined, onStop');
            return;
          }

          this.mediaRecorder.stream
            .getTracks()
            .forEach((track) => track.stop());

          const blob = new Blob(this.chunks, { type: mimeType });
          this.chunks = [];
          resolve({ result: blob });
        };

        this.mediaRecorder.start();
      } catch (error) {
        console.error(`error while audio recorder initing`, error);
        reject({ error });
      }
    });
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
  }
}

const audioRecorder = new AudioRecorder();

export default audioRecorder;
