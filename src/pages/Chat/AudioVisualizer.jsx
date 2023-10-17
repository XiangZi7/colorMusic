export default class AudioPlayer {
    constructor() {
        this.audioContext = new AudioContext();
        this.source = null;
    }

    async loadAudio(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = audioBuffer;
        this.source.connect(this.audioContext.destination);
    }

    play() {
        if (this.source) {
            this.source.start();
        }
    }

    pause() {
        if (this.source) {
            this.source.stop();
        }
    }

    stop() {
        if (this.source) {
            this.source.stop();
            this.source = null;
        }
    }
}