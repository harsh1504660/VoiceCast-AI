from elevenlabs import ElevenLabs
import soundfile as sf
import numpy as np
from upload import upload_to_catbox
from io import BytesIO
import os
# Initialize ElevenLabs client


# Script: Host A (Rachel) and Host B (Adam) alternate speaking
# dialogue = [
#     {"character": "JBFqnCBsd6RMkjVDRZzb", "text": "Hey Adam, welcome back to our AI podcast!"},
#     {"character": "uYXf8XasLslADfZ2MB4u", "text": "Thanks Rachel, great to be here. What are we talking about today?"},
#     {"character": "JBFqnCBsd6RMkjVDRZzb", "text": "Today, we're exploring how text-to-speech tools like ElevenLabs are changing podcasting."},
#     {"character": "uYXf8XasLslADfZ2MB4u", "text": "That's exciting! Can we try generating this whole podcast with AI voices?"},
#     {"character": "JBFqnCBsd6RMkjVDRZzb", "text": "Absolutely. And guess what—we already are!"},
# ]

# Combine all segments as numpy arrays

import os
import soundfile as sf
import librosa
import numpy as np
from io import BytesIO

def genrate_audio(dialouge, client):
    all_audio = []
    samplerate = None

    # 1. Load Intro
    intro, intro_rate = librosa.load("inro.mp3", sr=None)
    all_audio.append(intro)
    if samplerate is None:
        samplerate = intro_rate

    # 2. Generate Dialogue Audio
    for line in dialouge:
        audio_generator = client.text_to_speech.convert(
            text=line["text"],
            voice_id=line["character"],
            model_id="eleven_multilingual_v2"
        )

        audio_bytes = b"".join(audio_generator)
        audio_data, rate = sf.read(BytesIO(audio_bytes), dtype='float32')

        if samplerate is None:
            samplerate = rate

        all_audio.append(audio_data)

    # 3. Load Outro
    outro, outro_rate = librosa.load("outro.mp3", sr=None)
    all_audio.append(outro)

    # 4. Resample if needed
    all_audio = [librosa.resample(a, orig_sr=sr, target_sr=samplerate) if sr != samplerate else a
                 for a, sr in zip(all_audio, [intro_rate] + [samplerate]*(len(dialouge)) + [outro_rate])]

    # 5. Concatenate and Save
    final_audio = np.concatenate(all_audio, axis=0)
    sf.write("combined_podcast.wav", final_audio, samplerate)
    print("✅ Combined podcast saved as 'combined_podcast.wav'")

    url = upload_to_catbox("combined_podcast.wav")
    print("📤 File uploaded:", url)
    os.remove("combined_podcast.wav")

    return url








