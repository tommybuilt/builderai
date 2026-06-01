-- Batch 1: Text-to-Speech, Speech-to-Text, Image Generation, Video Generation
-- All tools are real open-source projects. Uses ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- TEXT-TO-SPEECH (TTS)
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Coqui TTS (XTTS-v2)', 'coqui-tts', 'Open-source deep learning text-to-speech library with voice cloning support.',
'Coqui TTS is an open-source deep learning toolkit for text-to-speech by Coqui AI. Includes XTTS-v2, a multilingual model supporting voice cloning with a 6-second reference clip across 17 languages. Supports Tacotron 2, VITS, and other architectures. Runs locally on GPU or CPU. MPL 2.0 license.',
'https://coqui.ai', 'https://github.com/coqui-ai/TTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MPL-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','voice-cloning','multilingual','xtts','deep-learning'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'coqui-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Bark', 'bark-tts', 'Transformer-based text-to-audio model by Suno that generates speech, music, and sound effects.',
'Bark is a transformer-based text-to-audio model by Suno AI. Unlike traditional TTS, it can generate realistic speech, music, background noise, and sound effects from text prompts. Supports multiple languages and speakers. Requires GPU with 4-12 GB VRAM depending on model size. MIT license.',
'https://github.com/suno-ai/bark', 'https://github.com/suno-ai/bark',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','text-to-audio','music','sound-effects','transformer'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bark-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Piper TTS', 'piper-tts', 'Fast local neural text-to-speech system optimized for Raspberry Pi and edge devices.',
'Piper is a fast local neural text-to-speech system by Rhasspy. Optimized to run on Raspberry Pi 4 and other low-power devices using ONNX Runtime. Supports dozens of languages with pre-trained VITS models. Runs entirely on CPU with minimal latency. MIT license.',
'https://github.com/rhasspy/piper', 'https://github.com/rhasspy/piper',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['tts','edge','raspberry-pi','onnx','lightweight','cpu'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'piper-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mozilla TTS', 'mozilla-tts', 'Deep learning TTS library by Mozilla with Tacotron and WaveRNN implementations.',
'Mozilla TTS is a deep learning text-to-speech library originally developed by Mozilla. Includes implementations of Tacotron 2, WaveRNN, and other architectures. Predecessor to Coqui TTS. Runs on GPU for training, CPU for inference. MPL 2.0 license.',
'https://github.com/mozilla/TTS', 'https://github.com/mozilla/TTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MPL-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','tacotron','wavernn','mozilla','deep-learning'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mozilla-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'StyleTTS 2', 'styletts-2', 'Style diffusion and adversarial training for human-level TTS with style transfer.',
'StyleTTS 2 is a text-to-speech model that uses style diffusion and adversarial training to achieve human-level speech synthesis quality. Supports style transfer, allowing control over speaking style via reference audio. Developed by Columbia University researchers. Requires GPU with 6+ GB VRAM. MIT license.',
'https://github.com/yl4579/StyleTTS2', 'https://github.com/yl4579/StyleTTS2',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 4, true, 6, true, true, true,
ARRAY['tts','style-transfer','diffusion','adversarial','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'styletts-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kokoro TTS', 'kokoro-tts', 'Lightweight and expressive TTS model with 82M parameters for fast local inference.',
'Kokoro TTS is a lightweight text-to-speech model with only 82 million parameters that achieves high-quality expressive speech synthesis. Supports multiple voices and styles. Fast enough for real-time inference on consumer hardware. Apache 2.0 license.',
'https://huggingface.co/hexgrad/Kokoro-82M', 'https://github.com/hexgrad/kokoro',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tts','lightweight','expressive','fast','cpu'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kokoro-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Fish Speech', 'fish-speech', 'Multilingual TTS with zero-shot voice cloning and streaming support.',
'Fish Speech is an open-source multilingual text-to-speech system supporting zero-shot voice cloning, streaming synthesis, and multiple languages. Version 1.5 introduces improved quality and lower latency. Requires GPU for optimal performance. Apache 2.0 license by Fish Audio.',
'https://speech.fish.audio', 'https://github.com/fishaudio/fish-speech',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','voice-cloning','multilingual','streaming','zero-shot'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fish-speech');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CosyVoice 2', 'cosyvoice-2', 'Large-scale multilingual TTS model by Alibaba with zero-shot voice cloning.',
'CosyVoice 2 is a large-scale multilingual speech synthesis model by Alibaba DAMO Academy. Supports zero-shot voice cloning, cross-lingual synthesis, and fine-grained prosody control. Built on a scalable transformer architecture. Requires GPU with 8+ GB VRAM. Apache 2.0 license.',
'https://github.com/FunAudioLLM/CosyVoice', 'https://github.com/FunAudioLLM/CosyVoice',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['tts','voice-cloning','multilingual','alibaba','zero-shot'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cosyvoice-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ChatTTS', 'chattts', 'Conversational TTS model optimized for dialogue and chat applications.',
'ChatTTS is a text-to-speech model specifically designed for conversational and dialogue scenarios. Generates natural-sounding speech with appropriate pauses, intonation, and fillers typical of spoken conversation. Supports Chinese and English. Requires GPU. Open-source release.',
'https://github.com/2noise/ChatTTS', 'https://github.com/2noise/ChatTTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','conversational','dialogue','chinese','english'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'chattts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MeloTTS', 'melotts', 'High-quality multilingual TTS library by MyShell with fast CPU inference.',
'MeloTTS is a high-quality multilingual text-to-speech library by MyShell AI. Supports English, Chinese, Japanese, Korean, and more. Optimized for fast inference on CPU. Includes a simple Python API and web interface. MIT license.',
'https://github.com/myshell-ai/MeloTTS', 'https://github.com/myshell-ai/MeloTTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tts','multilingual','cpu','fast','myshell'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'melotts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mimic 3', 'mimic-3', 'Privacy-focused neural TTS engine by Mycroft AI for offline voice assistants.',
'Mimic 3 is a neural text-to-speech engine developed by Mycroft AI for use in open-source voice assistants. Runs fully offline with low latency. Supports multiple languages and voices. Designed for privacy-focused applications on Linux and Raspberry Pi. AGPL-3.0 license.',
'https://github.com/MycroftAI/mimic3', 'https://github.com/MycroftAI/mimic3',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'AGPL-3.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tts','voice-assistant','offline','privacy','mycroft','raspberry-pi'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mimic-3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'eSpeak NG', 'espeak-ng', 'Compact open-source speech synthesizer supporting 100+ languages.',
'eSpeak NG (Next Generation) is a compact open-source software speech synthesizer for Linux, Windows, macOS, and Android. Supports over 100 languages and accents using formant synthesis. Extremely lightweight — runs on any hardware including embedded systems. GPL-3.0 license.',
'https://github.com/espeak-ng/espeak-ng', 'https://github.com/espeak-ng/espeak-ng',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'GPL-3.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['tts','formant','lightweight','embedded','multilingual','100-languages'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'espeak-ng');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Festival', 'festival-tts', 'University of Edinburgh speech synthesis system with decades of research behind it.',
'Festival is a general multi-lingual speech synthesis system developed at the University of Edinburgh Centre for Speech Technology Research. One of the oldest open-source TTS systems still in use. Supports multiple languages and synthesis methods. Runs on CPU. BSD-like license.',
'http://www.cstr.ed.ac.uk/projects/festival/', 'https://github.com/festvox/festival',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'BSD', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['tts','research','university','multilingual','classic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'festival-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Tortoise TTS', 'tortoise-tts', 'Multi-voice TTS system with emphasis on quality over speed.',
'Tortoise TTS is a text-to-speech system focused on producing high-quality, natural-sounding speech at the expense of inference speed. Supports voice cloning from short audio samples. Requires GPU with 6+ GB VRAM. Created by James Betker (neonbjb). Apache 2.0 license.',
'https://github.com/neonbjb/tortoise-tts', 'https://github.com/neonbjb/tortoise-tts',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['tts','voice-cloning','high-quality','slow-inference'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tortoise-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'VALL-E X', 'vall-e-x', 'Cross-lingual neural codec language model for speech synthesis.',
'VALL-E X is an open-source implementation of the cross-lingual neural codec language model for speech synthesis. Supports zero-shot voice cloning and cross-lingual speech generation. Based on Microsoft Research paper. Requires GPU with 8+ GB VRAM. MIT license.',
'https://github.com/Plachtaa/VALL-E-X', 'https://github.com/Plachtaa/VALL-E-X',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['tts','voice-cloning','cross-lingual','neural-codec','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vall-e-x');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MetaVoice', 'metavoice', 'Real-time voice cloning and TTS model with 1.2B parameters by MetaVoice.',
'MetaVoice-1B is a 1.2 billion parameter base model for text-to-speech with built-in voice cloning. Supports emotional speech, rhythm control, and American/British English. Can clone voices from short reference audio. Requires GPU. Apache 2.0 license.',
'https://github.com/metavoiceio/metavoice-src', 'https://github.com/metavoiceio/metavoice-src',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['tts','voice-cloning','emotional','1b-parameters'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'metavoice');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenVoice', 'openvoice', 'Instant voice cloning TTS by MyShell requiring only a short audio reference.',
'OpenVoice by MyShell AI enables instant voice cloning requiring only a short audio reference. Supports granular control over voice style including emotion, accent, rhythm, and pauses. Cross-lingual voice cloning supported. Requires GPU. MIT license.',
'https://github.com/myshell-ai/OpenVoice', 'https://github.com/myshell-ai/OpenVoice',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','voice-cloning','instant','myshell','cross-lingual'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'openvoice');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Matcha-TTS', 'matcha-tts', 'Fast TTS with conditional flow matching for efficient speech synthesis.',
'Matcha-TTS is a fast text-to-speech model using optimal-transport conditional flow matching (OT-CFM) for efficient non-autoregressive speech synthesis. Achieves high quality with fewer synthesis steps than diffusion models. Developed at MIAI Grenoble Alpes. MIT license.',
'https://github.com/shivammehta25/Matcha-TTS', 'https://github.com/shivammehta25/Matcha-TTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 4, true, 4, true, true, true,
ARRAY['tts','flow-matching','fast','non-autoregressive','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'matcha-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'VoiceCraft', 'voicecraft', 'Zero-shot speech editing and TTS using neural codec language models.',
'VoiceCraft is a zero-shot speech editing and text-to-speech model that uses neural codec language modeling. Can edit existing speech recordings or generate new speech with voice cloning. Developed at UT Austin. Requires GPU with 8+ GB VRAM.',
'https://github.com/jasonppy/VoiceCraft', 'https://github.com/jasonppy/VoiceCraft',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 4, true, 8, true, true, true,
ARRAY['tts','speech-editing','voice-cloning','neural-codec','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'voicecraft');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'WhisperSpeech', 'whisperspeech', 'Text-to-speech system built on top of Whisper encoder representations.',
'WhisperSpeech is an open-source text-to-speech system that inverts the Whisper speech recognition model to generate speech. Produces natural-sounding output by leveraging Whisper encoder representations. Supports voice cloning. Requires GPU. MIT license.',
'https://github.com/collabora/WhisperSpeech', 'https://github.com/collabora/WhisperSpeech',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 4, true, 6, true, true, true,
ARRAY['tts','whisper','voice-cloning','collabora'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisperspeech');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Sherpa-ONNX TTS', 'sherpa-onnx-tts', 'Cross-platform TTS using ONNX Runtime for on-device speech synthesis.',
'Sherpa-ONNX provides on-device text-to-speech using ONNX Runtime. Supports multiple TTS models (VITS, MeloTTS, Piper) and runs on Android, iOS, Linux, macOS, Windows, and embedded devices. No internet required. By k2-fsa/next-gen-kaldi. Apache 2.0 license.',
'https://github.com/k2-fsa/sherpa-onnx', 'https://github.com/k2-fsa/sherpa-onnx',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tts','onnx','cross-platform','mobile','embedded','on-device'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sherpa-onnx-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'EmotiVoice', 'emotivoice', 'Emotion-controllable TTS engine by NetEase with 2000+ voices.',
'EmotiVoice is an open-source text-to-speech engine by NetEase Youdao that supports emotion control. Includes over 2000 pre-built voices and supports Chinese and English. Users can control the emotional tone of generated speech. Requires GPU. Apache 2.0 license.',
'https://github.com/netease-youdao/EmotiVoice', 'https://github.com/netease-youdao/EmotiVoice',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','emotion','netease','chinese','english','2000-voices'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'emotivoice');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GPT-SoVITS', 'gpt-sovits', 'Few-shot voice cloning and TTS combining GPT and SoVITS architectures.',
'GPT-SoVITS combines GPT-style language modeling with SoVITS voice conversion for powerful few-shot text-to-speech. Can clone a voice from as little as 5 seconds of reference audio. Supports Chinese, English, and Japanese. Includes a WebUI for easy use. Requires GPU with 6+ GB VRAM.',
'https://github.com/RVC-Boss/GPT-SoVITS', 'https://github.com/RVC-Boss/GPT-SoVITS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 3, true, 6, true, true, true,
ARRAY['tts','voice-cloning','few-shot','gpt','sovits','webui'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gpt-sovits');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OuteTTS', 'outetts', 'Pure language modeling approach to TTS without traditional audio codecs.',
'OuteTTS is an experimental text-to-speech model that uses a pure language modeling approach, treating speech generation as a next-token prediction task without traditional audio codecs or vocoders. Supports voice cloning. Lightweight and fast.',
'https://github.com/edwko/OuteTTS', 'https://github.com/edwko/OuteTTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','language-model','experimental','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'outetts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Chatterbox TTS', 'chatterbox-tts', 'Expressive zero-shot TTS model by Resemble AI with emotion and accent control.',
'Chatterbox is an open-source text-to-speech model by Resemble AI that provides expressive zero-shot voice cloning. Features emotion control, accent adjustment, and high naturalness. Runs locally with GPU. Apache 2.0 license.',
'https://github.com/resemble-ai/chatterbox', 'https://github.com/resemble-ai/chatterbox',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tts','voice-cloning','emotion','resemble-ai','expressive'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'chatterbox-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Parler-TTS', 'parler-tts', 'TTS model that generates speech from text descriptions of the desired voice.',
'Parler-TTS is a text-to-speech model that generates high-quality speech based on text descriptions of the desired speaker characteristics (e.g., "a female speaker with a warm tone"). Built on the Hugging Face ecosystem. Requires GPU. Apache 2.0 license.',
'https://github.com/huggingface/parler-tts', 'https://github.com/huggingface/parler-tts',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['tts','text-description','huggingface','voice-control'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'parler-tts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'IndexTTS', 'indextts', 'Zero-shot TTS model with high naturalness and speaker similarity.',
'IndexTTS is a zero-shot text-to-speech model that achieves high naturalness and speaker similarity from short reference audio. Supports multiple languages. Requires GPU for inference. Open-source release.',
'https://github.com/index-tts/index-tts', 'https://github.com/index-tts/index-tts',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 3, true, 6, true, true, true,
ARRAY['tts','zero-shot','high-quality','naturalness'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'indextts');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'So-VITS-SVC', 'so-vits-svc', 'Singing voice conversion model based on VITS and SoftVC for voice-to-voice transfer.',
'So-VITS-SVC is a singing voice conversion model that combines SoftVC content encoder with VITS for high-quality voice-to-voice conversion. Widely used for voice cloning in singing applications. Requires GPU with 6+ GB VRAM. Community-maintained.',
'https://github.com/svc-develop-team/so-vits-svc', 'https://github.com/svc-develop-team/so-vits-svc',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 4, true, 6, true, true, true,
ARRAY['tts','singing','voice-conversion','vits','svc'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'so-vits-svc');

------------------------------------------------------------
-- SPEECH-TO-TEXT / SPEECH RECOGNITION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Whisper', 'whisper-openai', 'General-purpose speech recognition model by OpenAI trained on 680K hours of multilingual audio.',
'Whisper is an open-source automatic speech recognition model by OpenAI. Trained on 680,000 hours of multilingual audio, it handles transcription and translation across 99 languages. Available in multiple sizes (tiny to large-v3) for different accuracy/speed tradeoffs. Runs locally on CPU or GPU. MIT license.',
'https://github.com/openai/whisper', 'https://github.com/openai/whisper',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['stt','asr','transcription','translation','multilingual','openai'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisper-openai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Whisper.cpp', 'whisper-cpp', 'High-performance C/C++ port of Whisper for CPU-based speech recognition.',
'Whisper.cpp is a high-performance C/C++ implementation of OpenAI Whisper by Georgi Gerganov. Runs entirely on CPU with no dependencies. Supports Apple Silicon acceleration, WASM, and quantized models. Ideal for embedded and edge deployment. MIT license.',
'https://github.com/ggerganov/whisper.cpp', 'https://github.com/ggerganov/whisper.cpp',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['stt','asr','cpp','cpu','edge','apple-silicon','ggml'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisper-cpp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Faster Whisper', 'faster-whisper', 'CTranslate2-based Whisper implementation up to 4x faster than openai/whisper.',
'Faster Whisper reimplements OpenAI Whisper using CTranslate2, a fast inference engine for Transformer models. Achieves up to 4x speedup with comparable accuracy. Supports GPU and CPU inference. Memory-efficient through int8 quantization. MIT license by SYSTRAN.',
'https://github.com/SYSTRAN/faster-whisper', 'https://github.com/SYSTRAN/faster-whisper',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['stt','asr','whisper','fast','ctranslate2','quantization'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'faster-whisper');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'WhisperX', 'whisperx', 'Whisper with word-level timestamps, speaker diarization, and VAD.',
'WhisperX extends OpenAI Whisper with forced phoneme alignment for word-level timestamps, voice activity detection (VAD) for improved segmentation, and speaker diarization. Significantly faster through batched inference. Requires GPU for best performance. BSD-4-Clause license.',
'https://github.com/m-bain/whisperX', 'https://github.com/m-bain/whisperX',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'BSD-4-Clause', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['stt','asr','whisper','timestamps','diarization','vad'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisperx');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Vosk', 'vosk', 'Offline speech recognition toolkit supporting 20+ languages with small models.',
'Vosk is an offline speech recognition toolkit that supports 20+ languages. Models are small (50 MB) and work on Android, iOS, Raspberry Pi, and desktop. Supports streaming recognition, speaker identification, and works without internet. By Alpha Cephei. Apache 2.0 license.',
'https://alphacephei.com/vosk/', 'https://github.com/alphacep/vosk-api',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['stt','asr','offline','lightweight','mobile','raspberry-pi','multilingual'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vosk');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepSpeech', 'deepspeech', 'End-to-end speech recognition engine by Mozilla using TensorFlow.',
'DeepSpeech is an open-source speech-to-text engine by Mozilla, based on Baidu Deep Speech research paper. Uses a TensorFlow-trained model to convert audio to text. Supports real-time streaming transcription. Runs on CPU. Now in maintenance mode. MPL 2.0 license.',
'https://github.com/mozilla/DeepSpeech', 'https://github.com/mozilla/DeepSpeech',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MPL-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['stt','asr','mozilla','tensorflow','streaming'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepspeech');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kaldi', 'kaldi', 'Established speech recognition toolkit used in research and production systems.',
'Kaldi is a widely-used speech recognition toolkit written in C++ for research and production ASR systems. Supports GMM, DNN, and neural network acoustic models. Used extensively in academic research and industry. Requires Linux and significant setup. Apache 2.0 license.',
'https://kaldi-asr.org', 'https://github.com/kaldi-asr/kaldi',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 5, false, NULL, true, true, true,
ARRAY['stt','asr','research','production','cpp','academic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kaldi');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'NVIDIA NeMo ASR', 'nemo-asr', 'Production-grade ASR models and toolkit by NVIDIA for speech recognition.',
'NVIDIA NeMo is a toolkit for building and training conversational AI models. The ASR collection includes production-grade speech recognition models (Conformer, FastConformer, Canary) supporting 100+ languages. Requires NVIDIA GPU. Apache 2.0 license.',
'https://github.com/NVIDIA/NeMo', 'https://github.com/NVIDIA/NeMo',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['stt','asr','nvidia','nemo','conformer','production','gpu'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nemo-asr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SpeechBrain', 'speechbrain', 'All-in-one conversational AI toolkit for speech recognition, enhancement, and more.',
'SpeechBrain is a PyTorch-based open-source toolkit for speech processing. Covers ASR, speaker recognition, speech enhancement, spoken language understanding, and more. Includes pre-trained models and recipes. Designed for research and production. Apache 2.0 license.',
'https://speechbrain.github.io', 'https://github.com/speechbrain/speechbrain',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 4, true, 4, true, true, true,
ARRAY['stt','asr','speaker-recognition','speech-enhancement','pytorch','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'speechbrain');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Silero Models', 'silero-models', 'Pre-trained speech models for STT, TTS, and VAD with simple PyTorch integration.',
'Silero provides pre-trained enterprise-grade models for speech-to-text, text-to-speech, and voice activity detection. Models load via PyTorch Hub in one line of code. Supports multiple languages. Lightweight and fast on CPU. MIT license.',
'https://github.com/snakers4/silero-models', 'https://github.com/snakers4/silero-models',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['stt','asr','tts','vad','pytorch','lightweight','cpu'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'silero-models');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Distil-Whisper', 'distil-whisper', 'Distilled version of Whisper that is 6x faster with minimal accuracy loss.',
'Distil-Whisper is a distilled version of OpenAI Whisper by Hugging Face. Achieves 6x faster inference speed while maintaining within 1% WER of the original model. Ideal for production deployment where speed matters. MIT license.',
'https://github.com/huggingface/distil-whisper', 'https://github.com/huggingface/distil-whisper',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['stt','asr','whisper','distilled','fast','huggingface'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'distil-whisper');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Insanely Fast Whisper', 'insanely-fast-whisper', 'CLI tool that transcribes audio 10x faster using pipeline optimizations.',
'Insanely Fast Whisper is a CLI tool that uses Hugging Face pipeline optimizations (Flash Attention 2, batched inference) to achieve up to 10x faster Whisper transcription on GPU. Transcribes 2+ hours of audio in minutes. MIT license.',
'https://github.com/Vaibhavs10/insanely-fast-whisper', 'https://github.com/Vaibhavs10/insanely-fast-whisper',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['stt','asr','whisper','fast','cli','flash-attention'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'insanely-fast-whisper');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Whisper JAX', 'whisper-jax', 'JAX-based Whisper implementation optimized for TPU/GPU with 70x+ speedup.',
'Whisper JAX is a JAX/Flax implementation of OpenAI Whisper optimized for TPU and GPU. Achieves 70x+ real-time speed on TPU v4. Supports batched inference and chunked processing for long-form audio. Apache 2.0 license by Sanchit Gandhi.',
'https://github.com/sanchit-gandhi/whisper-jax', 'https://github.com/sanchit-gandhi/whisper-jax',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['stt','asr','whisper','jax','tpu','gpu','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisper-jax');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FunASR (Paraformer)', 'funasr', 'Industrial-grade ASR toolkit by Alibaba with Paraformer non-autoregressive models.',
'FunASR is an industrial-grade speech recognition toolkit by Alibaba DAMO Academy. Includes Paraformer, a non-autoregressive ASR model that achieves fast and accurate transcription. Supports Chinese, English, and other languages. Includes punctuation restoration and speaker diarization. MIT license.',
'https://github.com/modelscope/FunASR', 'https://github.com/modelscope/FunASR',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['stt','asr','paraformer','alibaba','chinese','industrial'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'funasr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ESPnet', 'espnet', 'End-to-end speech processing toolkit covering ASR, TTS, and speech translation.',
'ESPnet is an end-to-end speech processing toolkit supporting ASR, TTS, speech translation, speech enhancement, and more. Includes Conformer, Transformer, and other architectures. Widely used in research. Developed by Johns Hopkins, CMU, and others. Apache 2.0 license.',
'https://github.com/espnet/espnet', 'https://github.com/espnet/espnet',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 5, true, 8, true, true, true,
ARRAY['stt','asr','tts','speech-translation','research','conformer'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'espnet');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Sherpa-ONNX STT', 'sherpa-onnx-stt', 'Cross-platform speech recognition using ONNX Runtime for on-device ASR.',
'Sherpa-ONNX provides on-device speech recognition using ONNX Runtime. Supports streaming and non-streaming ASR models. Runs on Android, iOS, Linux, macOS, Windows, and embedded devices without internet. By k2-fsa/next-gen-kaldi. Apache 2.0 license.',
'https://github.com/k2-fsa/sherpa-onnx', 'https://github.com/k2-fsa/sherpa-onnx',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['stt','asr','onnx','cross-platform','mobile','embedded','on-device'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sherpa-onnx-stt');

------------------------------------------------------------
-- IMAGE GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stable Diffusion XL', 'stable-diffusion-xl', 'Open-weight latent diffusion model by Stability AI for high-resolution image generation.',
'Stable Diffusion XL (SDXL) is an open-weight latent diffusion model by Stability AI for generating high-resolution images from text prompts. Uses a two-stage architecture with base and refiner models. Supports 1024x1024 native resolution. Requires GPU with 8+ GB VRAM. Open RAIL-M license.',
'https://stability.ai', 'https://github.com/Stability-AI/generative-models',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Open RAIL-M', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','sdxl','stability-ai','text-to-image'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stable-diffusion-xl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stable Diffusion 3.5', 'stable-diffusion-3-5', 'Latest Stable Diffusion model with improved text rendering and composition.',
'Stable Diffusion 3.5 by Stability AI uses a Multimodal Diffusion Transformer (MMDiT) architecture. Available in Large (8B), Large Turbo, and Medium (2.5B) variants. Improved text rendering, composition, and prompt adherence over SDXL. Requires GPU with 8-16 GB VRAM. Community license.',
'https://stability.ai', 'https://github.com/Stability-AI/sd3.5',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Stability Community', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','sd3','stability-ai','mmdit','text-to-image'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stable-diffusion-3-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FLUX.1', 'flux-1', 'State-of-the-art open image generation model by Black Forest Labs with rectified flow transformers.',
'FLUX.1 is a state-of-the-art image generation model by Black Forest Labs (from former Stability AI researchers). Available in dev (guidance-distilled) and schnell (4-step) variants. Uses rectified flow transformers for high-quality generation. Requires GPU with 12+ GB VRAM. Apache 2.0 (schnell) license.',
'https://blackforestlabs.ai', 'https://github.com/black-forest-labs/flux',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['image-generation','diffusion','flux','rectified-flow','text-to-image'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flux-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kandinsky 3', 'kandinsky-3', 'Text-to-image model by Sber AI with latent diffusion architecture.',
'Kandinsky 3 is an open-source text-to-image model by Sber AI Lab. Uses a latent diffusion architecture with improved text understanding and image quality over previous versions. Supports Russian and English prompts. Requires GPU with 8+ GB VRAM. Apache 2.0 license.',
'https://github.com/ai-forever/Kandinsky-3', 'https://github.com/ai-forever/Kandinsky-3',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','kandinsky','sber','text-to-image'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kandinsky-3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PixArt-Sigma', 'pixart-sigma', 'Efficient text-to-image diffusion transformer producing 4K resolution images.',
'PixArt-Sigma is a Diffusion Transformer (DiT) model capable of generating images up to 4K resolution directly. Significantly more training-efficient than comparable models. Supports various aspect ratios. By Huawei researchers. Open-source weights available.',
'https://github.com/PixArt-alpha/PixArt-sigma', 'https://github.com/PixArt-alpha/PixArt-sigma',
(SELECT id FROM categories WHERE slug = 'image-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','dit','4k','efficient','text-to-image'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pixart-sigma');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Playground v2.5', 'playground-v2-5', 'Open-weight aesthetic-focused image generation model rivaling DALL-E 3.',
'Playground v2.5 is an open-weight diffusion model focused on aesthetic quality, rivaling DALL-E 3 and Midjourney in human evaluations. Built on SDXL architecture with improved training. Supports 1024x1024 resolution. Requires GPU with 8+ GB VRAM. Community license.',
'https://playground.com', 'https://huggingface.co/playgroundai/playground-v2.5-1024px-aesthetic',
(SELECT id FROM categories WHERE slug = 'image-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','aesthetic','playground','text-to-image'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'playground-v2-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Latent Consistency Models', 'latent-consistency-models', 'Distilled diffusion models enabling image generation in 1-4 steps.',
'Latent Consistency Models (LCM) are distilled from Stable Diffusion to enable high-quality image generation in just 1-4 inference steps, compared to the typical 20-50 steps. Enables near real-time generation on consumer GPUs. Available as LoRA adapters for SDXL. MIT license.',
'https://github.com/luosiallen/latent-consistency-model', 'https://github.com/luosiallen/latent-consistency-model',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'MIT', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['image-generation','diffusion','lcm','fast','few-step','distilled'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'latent-consistency-models');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'HunyuanDiT', 'hunyuandit', 'Bilingual text-to-image diffusion transformer by Tencent with Chinese and English support.',
'HunyuanDiT is a text-to-image diffusion transformer by Tencent. Native bilingual support for Chinese and English prompts. Uses a fine-grained understanding of text through a multi-resolution architecture. Requires GPU with 12+ GB VRAM. Tencent Hunyuan Community License.',
'https://github.com/Tencent/HunyuanDiT', 'https://github.com/Tencent/HunyuanDiT',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Tencent Community', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['image-generation','diffusion','dit','tencent','bilingual','chinese'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hunyuandit');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Fooocus', 'fooocus', 'Simplified Stable Diffusion UI focused on ease of use with SDXL defaults.',
'Fooocus is an image generation UI that simplifies Stable Diffusion usage. Inspired by Midjourney, it reduces complexity to just a prompt box with SDXL defaults. Handles model downloading, memory optimization, and quality settings automatically. Requires GPU with 4+ GB VRAM. GPL-3.0 license.',
'https://github.com/lllyasviel/Fooocus', 'https://github.com/lllyasviel/Fooocus',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'GPL-3.0', 'free', 'local', 1, true, 4, true, true, true,
ARRAY['image-generation','diffusion','ui','sdxl','easy','midjourney-like'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fooocus');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ControlNet', 'controlnet', 'Neural network architecture for adding spatial control to diffusion models.',
'ControlNet is a neural network architecture by Lvmin Zhang that adds conditional control to pre-trained diffusion models. Supports edge detection (Canny), depth maps, pose estimation, segmentation, and more as conditioning inputs. Essential for controlled image generation. Apache 2.0 license.',
'https://github.com/lllyasviel/ControlNet', 'https://github.com/lllyasviel/ControlNet',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','controlnet','conditioning','spatial-control'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'controlnet');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'IP-Adapter', 'ip-adapter', 'Image prompt adapter for pre-trained text-to-image diffusion models.',
'IP-Adapter enables using images as prompts for text-to-image diffusion models. Achieves comparable quality to fine-tuned models without retraining. Works with Stable Diffusion and SDXL. Supports combining image and text prompts. By Tencent AI Lab. Apache 2.0 license.',
'https://github.com/tencent-ailab/IP-Adapter', 'https://github.com/tencent-ailab/IP-Adapter',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','image-prompt','adapter','tencent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ip-adapter');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InstantID', 'instantid', 'Zero-shot identity-preserving image generation from a single face photo.',
'InstantID enables zero-shot identity-preserving image generation using only a single reference face image. No training or fine-tuning required. Compatible with SDXL and community models. Combines face embedding with ControlNet-style conditioning. Apache 2.0 license by InstantX.',
'https://github.com/InstantID/InstantID', 'https://github.com/InstantID/InstantID',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','face','identity','zero-shot'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'instantid');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PhotoMaker', 'photomaker', 'Customized realistic photo generation from input ID photos.',
'PhotoMaker generates customized realistic photos by stacking ID embeddings from multiple input photos. Creates images of people in various styles, scenes, and compositions while maintaining identity. Works with SDXL. By Tencent. Apache 2.0 license.',
'https://github.com/TencentARC/PhotoMaker', 'https://github.com/TencentARC/PhotoMaker',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','photo','identity','realistic','tencent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'photomaker');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PuLID', 'pulid', 'Pure and Lightning ID customization for diffusion models without fine-tuning.',
'PuLID (Pure and Lightning ID Customization) enables high-fidelity identity customization in diffusion models without any fine-tuning. Achieves fast identity-consistent image generation using a contrastive alignment loss. Works with FLUX and SDXL. Apache 2.0 license.',
'https://github.com/ToTheBeginning/PuLID', 'https://github.com/ToTheBeginning/PuLID',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['image-generation','diffusion','identity','tuning-free','flux'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pulid');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'T2I-Adapter', 't2i-adapter', 'Lightweight adapters for adding structural guidance to text-to-image models.',
'T2I-Adapter provides lightweight adapter modules for adding structural guidance (sketches, depth, color, style) to text-to-image diffusion models. Smaller and faster than ControlNet while achieving comparable results. By Tencent ARC. Apache 2.0 license.',
'https://github.com/TencentARC/T2I-Adapter', 'https://github.com/TencentARC/T2I-Adapter',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','adapter','conditioning','lightweight','tencent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 't2i-adapter');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SDXL-Turbo', 'sdxl-turbo', 'Real-time image generation model using adversarial diffusion distillation.',
'SDXL-Turbo by Stability AI uses Adversarial Diffusion Distillation (ADD) to generate images in a single step. Enables real-time image synthesis on consumer GPUs. Based on SDXL architecture. Requires GPU with 6+ GB VRAM. Research license.',
'https://stability.ai', 'https://huggingface.co/stabilityai/sdxl-turbo',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Stability Research', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['image-generation','diffusion','turbo','real-time','single-step','distilled'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sdxl-turbo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SDXL-Lightning', 'sdxl-lightning', 'Distilled SDXL model by ByteDance enabling 2-8 step image generation.',
'SDXL-Lightning by ByteDance is a distilled version of SDXL that generates images in 2-8 steps. Uses progressive distillation and adversarial training. Available as LoRA and full model. Requires GPU with 6+ GB VRAM. Open RAIL-M license.',
'https://huggingface.co/ByteDance/SDXL-Lightning', 'https://huggingface.co/ByteDance/SDXL-Lightning',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Open RAIL-M', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['image-generation','diffusion','lightning','fast','bytedance','distilled'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sdxl-lightning');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kolors', 'kolors', 'Bilingual text-to-image model by Kuaishou with strong Chinese prompt understanding.',
'Kolors is a bilingual (Chinese/English) text-to-image model by Kuaishou Technology. Built on a large language model backbone for superior text understanding. Generates high-quality images with photorealistic and artistic styles. Requires GPU with 8+ GB VRAM. Apache 2.0 license.',
'https://github.com/Kwai-Kolors/Kolors', 'https://github.com/Kwai-Kolors/Kolors',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','diffusion','bilingual','chinese','kuaishou'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kolors');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepFloyd IF', 'deepfloyd-if', 'Pixel-space diffusion model by DeepFloyd/Stability AI with strong text rendering.',
'DeepFloyd IF is a modular pixel-space diffusion model by DeepFloyd Lab (Stability AI). Uses T5-XXL text encoder for strong text rendering and prompt understanding. Three-stage cascaded architecture for up to 1024x1024 resolution. Requires GPU with 16+ GB VRAM. DeepFloyd IF license.',
'https://github.com/deep-floyd/IF', 'https://github.com/deep-floyd/IF',
(SELECT id FROM categories WHERE slug = 'image-generation'), NULL, 'free', 'local', 4, true, 16, true, true, true,
ARRAY['image-generation','diffusion','pixel-space','text-rendering','deepfloyd'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepfloyd-if');

------------------------------------------------------------
-- VIDEO GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stable Video Diffusion', 'stable-video-diffusion', 'Open video generation model by Stability AI for image-to-video synthesis.',
'Stable Video Diffusion (SVD) by Stability AI generates short video clips from a single image. Available in SVD (14 frames) and SVD-XT (25 frames) variants. Based on Stable Diffusion architecture adapted for temporal consistency. Requires GPU with 12+ GB VRAM. Stability Community License.',
'https://stability.ai', 'https://github.com/Stability-AI/generative-models',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Stability Community', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','diffusion','image-to-video','stability-ai'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stable-video-diffusion');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'HunyuanVideo', 'hunyuanvideo', 'Open-source video generation model by Tencent with text and image conditioning.',
'HunyuanVideo is an open-source video generation model by Tencent. Generates high-quality videos from text prompts or images. Version 1.5 adds improved temporal consistency and longer video generation. Requires GPU with 24+ GB VRAM (or quantized for less). Tencent Hunyuan Community License.',
'https://github.com/Tencent/HunyuanVideo', 'https://github.com/Tencent/HunyuanVideo',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Tencent Community', 'free', 'local', 4, true, 24, true, true, true,
ARRAY['video-generation','diffusion','tencent','text-to-video','image-to-video'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hunyuanvideo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Wan 2.1', 'wan-video', 'Open-source video generation model suite by Alibaba with text-to-video and image-to-video.',
'Wan 2.1 (and later versions 2.2, 2.5) by Alibaba is an open-source video generation model suite. Supports text-to-video and image-to-video generation with multiple model sizes. Generates temporally coherent videos with good motion. Requires GPU with 12-24 GB VRAM. Apache 2.0 license.',
'https://github.com/Wan-Video/Wan2.1', 'https://github.com/Wan-Video/Wan2.1',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','diffusion','alibaba','text-to-video','image-to-video'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wan-video');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mochi 1', 'mochi-1', 'Open-source video generation model by Genmo with state-of-the-art motion quality.',
'Mochi 1 by Genmo is an open-source video generation model focused on high-quality motion and temporal consistency. Uses an asymmetric diffusion transformer (AsymmDiT) architecture. Generates 480p videos with natural motion. Requires GPU with 24+ GB VRAM. Apache 2.0 license.',
'https://github.com/genmoai/mochi', 'https://github.com/genmoai/mochi',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 24, true, true, true,
ARRAY['video-generation','diffusion','genmo','motion','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mochi-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CogVideoX', 'cogvideox', 'Open-source text-to-video model by Zhipu AI/Tsinghua with 2B and 5B variants.',
'CogVideoX is an open-source text-to-video generation model by Zhipu AI and Tsinghua University. Available in 2B and 5B parameter variants. Generates 6-second videos at 480p with good semantic understanding. Uses 3D causal VAE. Requires GPU with 12-24 GB VRAM. Apache 2.0 license.',
'https://github.com/THUDM/CogVideo', 'https://github.com/THUDM/CogVideo',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','diffusion','cogvideo','zhipu','tsinghua','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cogvideox');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Open-Sora', 'open-sora', 'Open-source Sora-like video generation framework by HPC-AI Tech.',
'Open-Sora is an open-source initiative by HPC-AI Tech to reproduce and democratize Sora-like video generation. Supports text-to-video, image-to-video, and video-to-video. Multiple versions (1.2, 1.3, 2.0) with progressive improvements. Requires GPU with 16+ GB VRAM. Apache 2.0 license.',
'https://github.com/hpcaitech/Open-Sora', 'https://github.com/hpcaitech/Open-Sora',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','diffusion','sora','open-source','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'open-sora');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Open-Sora-Plan', 'open-sora-plan', 'Community-driven plan to reproduce Sora with open-source video generation models.',
'Open-Sora-Plan is a community-driven project aiming to reproduce OpenAI Sora through open-source development. Implements video generation using spatial-temporal transformers. Supports variable resolution and duration. Requires GPU with 16+ GB VRAM. MIT license by PKU-Yuan Lab.',
'https://github.com/PKU-YuanGroup/Open-Sora-Plan', 'https://github.com/PKU-YuanGroup/Open-Sora-Plan',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'MIT', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','diffusion','sora','community','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'open-sora-plan');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LTX-Video', 'ltx-video', 'Real-time video generation model by Lightricks using video DiT.',
'LTX-Video by Lightricks is a video generation model designed for fast inference. LTX-2 generates 768x512 videos faster than real-time on modern GPUs. Uses a Video Diffusion Transformer architecture. Supports text-to-video and image-to-video. LTXV Community License.',
'https://github.com/Lightricks/LTX-Video', 'https://github.com/Lightricks/LTX-Video',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'LTXV Community', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['video-generation','diffusion','lightricks','fast','real-time','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ltx-video');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AnimateDiff', 'animatediff', 'Motion module for animating personalized text-to-image diffusion models.',
'AnimateDiff is a plug-and-play motion module that turns any personalized text-to-image Stable Diffusion model into an animation generator. No model-specific tuning needed. Supports ControlNet and LoRA. By Shanghai AI Lab. Apache 2.0 license.',
'https://github.com/guoyww/AnimateDiff', 'https://github.com/guoyww/AnimateDiff',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['video-generation','diffusion','animation','motion','stable-diffusion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'animatediff');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DynamiCrafter', 'dynamicrafter', 'Image-to-video model that animates still images with text guidance.',
'DynamiCrafter animates open-domain still images into dynamic videos using text prompts for motion guidance. Leverages pre-trained video diffusion models for natural motion. Available in multiple resolutions. By Tencent ARC. Open-source weights available.',
'https://github.com/Doubiiu/DynamiCrafter', 'https://github.com/Doubiiu/DynamiCrafter',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','diffusion','image-to-video','animation','tencent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dynamicrafter');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SkyReels V1', 'skyreels-v1', 'Open-source video generation model with controllable camera and subject motion.',
'SkyReels V1 is an open-source video generation model that supports controllable camera movements and subject motion. Built on diffusion transformer architecture. Generates consistent and temporally coherent videos. Requires GPU with 16+ GB VRAM.',
'https://github.com/SkyworkAI/SkyReels-V1', 'https://github.com/SkyworkAI/SkyReels-V1',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','diffusion','camera-control','motion','skywork'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'skyreels-v1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Pyramid Flow', 'pyramid-flow', 'Efficient video generation using pyramid-shaped flow matching.',
'Pyramid Flow is an efficient video generation method that uses pyramid-shaped flow matching to generate videos with reduced computational cost. Generates temporally consistent videos at multiple resolutions. By Beijing Academy of AI. MIT license.',
'https://github.com/jy0205/Pyramid-Flow', 'https://github.com/jy0205/Pyramid-Flow',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'MIT', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','diffusion','flow-matching','efficient','pyramid'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pyramid-flow');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MagicAnimate', 'magicanimate', 'Temporally consistent human image animation using diffusion models.',
'MagicAnimate by Bytedance generates temporally consistent human image animations from a reference image and motion sequence. Uses a diffusion-based framework with temporal attention for smooth video generation. Requires GPU with 12+ GB VRAM.',
'https://github.com/magic-research/magic-animate', 'https://github.com/magic-research/magic-animate',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','animation','human','diffusion','bytedance'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'magicanimate');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MuseV', 'musev', 'Infinite-length music-driven video generation with visual conditioning.',
'MuseV is an infinite-length music-driven video generation model by Tencent. Generates videos conditioned on music, images, and text. Supports long-form video generation through a multi-reference approach. Requires GPU with 12+ GB VRAM.',
'https://github.com/TMElyralab/MuseV', 'https://github.com/TMElyralab/MuseV',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','music-driven','tencent','animation','long-form'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'musev');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Latte', 'latte-video', 'Latent diffusion transformer for video generation with spatial-temporal attention.',
'Latte is a latent diffusion transformer for video generation that models spatial and temporal dimensions through dedicated attention mechanisms. Achieves competitive results with efficient training. By Shanghai AI Lab. Apache 2.0 license.',
'https://github.com/Vchitect/Latte', 'https://github.com/Vchitect/Latte',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','diffusion','transformer','spatial-temporal','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'latte-video');
