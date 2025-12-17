import { ref, computed } from 'vue';

interface AudioNode {
    source: AudioBufferSourceNode | OscillatorNode;
    gainNode: GainNode;
    filterNode?: BiquadFilterNode;
}

export const useAudioGenerator = () => {
    const audioContext = ref<AudioContext | null>(null);
    const activeNodes = ref<Map<string, AudioNode>>(new Map());
    const activeSounds = ref<Set<string>>(new Set());

    const getAudioContext = () => {
    if (!audioContext.value) {
      audioContext.value = new AudioContext();
    }
    if (audioContext.value.state === 'suspended') {
      audioContext.value.resume();
    }
    return audioContext.value;
  };

    const createWhiteNoise = (ctx: AudioContext): AudioBufferSourceNode => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  };

  const createPinkNoise = (ctx: AudioContext): AudioBufferSourceNode => {
     const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  };

  const createBrownNoise = (ctx: AudioContext): AudioBufferSourceNode => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let lastOut = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i] ?? 0;
      data[i] = 3.5;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  };

  const createRainSound = (ctx: AudioContext): { source: AudioBufferSourceNode; filter: BiquadFilterNode } => {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      const dropProbability = Math.random();
      if (dropProbability > 0.997) {
        data[i] = white * 0.8;
      } else {
        data[i] = white * 0.15;
      }
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 4000;
    
    return { source, filter };
  };

  const createOceanSound = (ctx: AudioContext): { source: AudioBufferSourceNode; filter: BiquadFilterNode } => {
    const bufferSize = ctx.sampleRate * 6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const wave = Math.sin(t * 0.3) * 0.5 + 0.5;
      const noise = (Math.random() * 2 - 1) * 0.3;
      data[i] = (noise * wave) + (Math.sin(t * 0.1) * 0.1);
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    return { source, filter };
  };

   const createForestSound = (ctx: AudioContext): { source: AudioBufferSourceNode; filter: BiquadFilterNode } => {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      let sample = 0;
      
      // Wind-like base
      sample += (Math.random() * 2 - 1) * 0.05;
      
      // Bird-like chirps
      if (Math.random() > 0.9995) {
        const chirpLength = Math.floor(ctx.sampleRate * 0.1);
        for (let j = 0; j < chirpLength && i + j < bufferSize; j++) {
          const chirpT = j / chirpLength;
          data[i + j] = Math.sin(chirpT * 80 + t * 2000) * (1 - chirpT) * 0.3;
        }
      }
      
      // Rustling leaves
      sample += (Math.random() * 2 - 1) * Math.sin(t * 2) * 0.08;
      
      data[i] = sample;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 0.5;
    
    return { source, filter };
  };

  const startSound = (soundType: string, volume: number = 0.5) => {
    const ctx = getAudioContext();

    //? Stop existing sound of this type
    if(activeNodes.value.has(soundType)){
        stopSound(soundType);
    }

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ctx.destination);
    
    let source: AudioBufferSourceNode | OscillatorNode;
    let filterNode: BiquadFilterNode | undefined;
    
    switch (soundType) {
      case 'white':
        source = createWhiteNoise(ctx);
        source.connect(gainNode);
        break;
      case 'pink':
        source = createPinkNoise(ctx);
        source.connect(gainNode);
        break;
      case 'brown':
        source = createBrownNoise(ctx);
        source.connect(gainNode);
        break;
      case 'rain': {
        const rain = createRainSound(ctx);
        source = rain.source;
        filterNode = rain.filter;
        source.connect(filterNode);
        filterNode.connect(gainNode);
        break;
      }
      case 'ocean': {
        const ocean = createOceanSound(ctx);
        source = ocean.source;
        filterNode = ocean.filter;
        source.connect(filterNode);
        filterNode.connect(gainNode);
        break;
      }
      case 'forest': {
        const forest = createForestSound(ctx);
        source = forest.source;
        filterNode = forest.filter;
        source.connect(filterNode);
        filterNode.connect(gainNode);
        break;
      }
      default:
        source = createWhiteNoise(ctx);
        source.connect(gainNode);
    }
    
    source.start();
    activeNodes.value.set(soundType, { source, gainNode, filterNode });
    activeSounds.value = new Set(activeSounds.value).add(soundType);
  }

  const stopSound = (soundType: string) => {
    const node = activeNodes.value.get(soundType);
    if (node) {
      node.source.stop();
      node.gainNode.disconnect();
      if (node.filterNode) {
        node.filterNode.disconnect();
      }
      activeNodes.value.delete(soundType);
      activeSounds.value = new Set([...activeSounds.value].filter(s => s !== soundType));
    }
  };

  const setVolume = (soundType: string, volume: number) => {
    const node = activeNodes.value.get(soundType);
    if (node) {
      node.gainNode.gain.setValueAtTime(volume, audioContext.value?.currentTime || 0);
    }
  };

  const stopAllSounds = () => {
    activeNodes.value.forEach((_, soundType) => {
      stopSound(soundType);
    });
  };

   const isPlaying = (soundType: string) => {
    return activeSounds.value.has(soundType);
  };

  // Computed para reactividad de Vue
  const activeSoundsList = computed(() => Array.from(activeSounds.value));

  return {
    startSound,
    stopSound,
    setVolume,
    stopAllSounds,
    isPlaying,
    activeSounds: activeSoundsList,
  }
}