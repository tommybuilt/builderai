-- Batch 7: Supplemental tools to reach 500+ total
-- Filling gaps in all categories with real open-source projects
-- ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- ADDITIONAL TEXT-TO-SPEECH
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'NeuTTS Air', 'neutts-air', 'Lightweight neural TTS model optimized for edge and mobile deployment.',
'NeuTTS Air is a lightweight neural text-to-speech model optimized for edge and mobile deployment. Small model footprint with reasonable quality. Designed for low-latency on-device speech synthesis.',
'https://github.com/nickel-niu/NeuTTS', 'https://github.com/nickel-niu/NeuTTS',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), NULL, 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tts','edge','mobile','lightweight','on-device','low-latency'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'neutts-air');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FishAudio S1-mini', 'fishaudio-s1-mini', 'Compact variant of Fish Speech optimized for faster inference.',
'FishAudio S1-mini is a compact variant of Fish Speech optimized for faster inference with reduced VRAM requirements. Maintains good quality for voice synthesis while being more accessible on consumer hardware.',
'https://fish.audio', 'https://github.com/fishaudio/fish-speech',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['tts','compact','fast','voice-synthesis','fish-speech'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fishaudio-s1-mini');

------------------------------------------------------------
-- ADDITIONAL SPEECH-TO-TEXT
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Canary (NVIDIA NeMo)', 'canary-nemo', 'Multilingual ASR model by NVIDIA supporting 4 languages with translation.',
'Canary by NVIDIA NeMo is a multilingual ASR model supporting English, German, French, and Spanish. Features multi-task capabilities including transcription and translation. Built on the NeMo framework. Apache 2.0 license.',
'https://nvidia.github.io/NeMo/', 'https://github.com/NVIDIA/NeMo',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['stt','asr','multilingual','nvidia','nemo','translation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'canary-nemo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Voxtral', 'voxtral', 'Speech understanding model by Mistral AI for transcription and analysis.',
'Voxtral by Mistral AI is a speech understanding model handling transcription, translation, and spoken content analysis. Part of the Mistral model family with strong multilingual capabilities.',
'https://mistral.ai', 'https://huggingface.co/mistralai',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['stt','speech-understanding','mistral','multilingual','transcription'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'voxtral');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Paraformer (FunASR)', 'paraformer-funasr', 'Non-autoregressive ASR model by Alibaba achieving fast parallel transcription.',
'Paraformer by Alibaba DAMO Academy (part of FunASR) is a non-autoregressive ASR model that transcribes in parallel rather than sequentially. Achieves competitive accuracy with much faster inference. Supports Chinese and English. MIT license.',
'https://github.com/modelscope/FunASR', 'https://github.com/modelscope/FunASR',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['stt','asr','non-autoregressive','alibaba','fast','chinese'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'paraformer-funasr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Conformer (ESPnet)', 'conformer-espnet', 'Convolution-augmented transformer for speech recognition in ESPnet toolkit.',
'Conformer combines convolutions with transformers for speech recognition, achieving state-of-the-art results. Implemented in ESPnet, an end-to-end speech processing toolkit. Supports ASR, TTS, and speech translation. Apache 2.0 license.',
'https://github.com/espnet/espnet', 'https://github.com/espnet/espnet',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['stt','asr','conformer','espnet','transformer','convolution'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'conformer-espnet');

------------------------------------------------------------
-- ADDITIONAL IMAGE GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FLUX.2', 'flux-2', 'Next-generation image generation model by Black Forest Labs.',
'FLUX.2 by Black Forest Labs is the successor to FLUX.1, offering improved image quality, prompt adherence, and generation speed. State-of-the-art open image generation model.',
'https://blackforestlabs.ai', 'https://huggingface.co/black-forest-labs',
(SELECT id FROM categories WHERE slug = 'image-generation'), NULL, 'free', 'local', 3, true, 12, true, true, true,
ARRAY['image-generation','flux','black-forest-labs','text-to-image','next-gen'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flux-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Würstchen', 'wurstchen', 'Efficient latent diffusion model using highly compressed latent space.',
'Würstchen uses a novel three-stage pipeline with an extremely compressed latent space (42x compression). Enables fast training and inference while maintaining high image quality. By Pablo Pernias. MIT license.',
'https://github.com/dome272/Wuerstchen', 'https://github.com/dome272/Wuerstchen',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['image-generation','diffusion','compressed','efficient','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wurstchen');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SD-Turbo', 'sd-turbo', 'Distilled Stable Diffusion model generating images in a single step.',
'SD-Turbo by Stability AI is a distilled version of Stable Diffusion 2.1 that generates images in a single forward pass. Uses Adversarial Diffusion Distillation (ADD). Extremely fast — real-time image generation.',
'https://stability.ai', 'https://huggingface.co/stabilityai/sd-turbo',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Stability Community', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['image-generation','turbo','fast','single-step','distilled','real-time'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sd-turbo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'RealVisXL', 'realvisxl', 'Photorealistic SDXL fine-tune for generating realistic images.',
'RealVisXL is a popular community fine-tune of SDXL optimized for photorealistic image generation. Produces highly detailed, realistic images from text prompts. Available on Civitai and Hugging Face. CreativeML Open RAIL-M license.',
'https://civitai.com/models/139562', 'https://huggingface.co/SG161222/RealVisXL_V4.0',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'CreativeML Open RAIL-M', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['image-generation','photorealistic','sdxl','fine-tune','realistic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'realvisxl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DreamShaper', 'dreamshaper', 'Versatile Stable Diffusion fine-tune for creative and realistic imagery.',
'DreamShaper is a versatile community fine-tune of Stable Diffusion (available for SD 1.5 and SDXL). Balances creative/artistic and realistic styles. One of the most popular models on Civitai.',
'https://civitai.com/models/4384', 'https://huggingface.co/Lykon/dreamshaper-xl-v2-turbo',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'CreativeML Open RAIL-M', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['image-generation','versatile','creative','realistic','fine-tune','popular'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dreamshaper');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Juggernaut XL', 'juggernaut-xl', 'High-quality SDXL fine-tune optimized for photorealism and detail.',
'Juggernaut XL is a top-tier SDXL fine-tune by RunDiffusion optimized for photorealistic detail and quality. Produces stunning realistic images. One of the highest-rated models on Civitai.',
'https://civitai.com/models/133005', 'https://huggingface.co/RunDiffusion/Juggernaut-XL-v9',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'CreativeML Open RAIL-M', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['image-generation','photorealistic','sdxl','detail','quality','top-rated'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'juggernaut-xl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Animagine XL', 'animagine-xl', 'SDXL fine-tune optimized for high-quality anime-style image generation.',
'Animagine XL is an SDXL fine-tune optimized for generating high-quality anime-style images. Understands anime character descriptions, art styles, and composition. By Cagliostro Research Lab.',
'https://huggingface.co/cagliostrolab/animagine-xl-3.1', 'https://huggingface.co/cagliostrolab/animagine-xl-3.1',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Fair AI Public', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['image-generation','anime','sdxl','fine-tune','art-style'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'animagine-xl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Recraft v3', 'recraft-v3', 'Open-weight image generation model with strong text rendering capabilities.',
'Recraft v3 is an image generation model with notably strong text-in-image rendering capabilities. Generates high-quality images with legible text, logos, and typography. Available on Hugging Face.',
'https://www.recraft.ai', 'https://huggingface.co/recraft-ai/recraft-v3',
(SELECT id FROM categories WHERE slug = 'image-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-generation','text-rendering','typography','logos','high-quality'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'recraft-v3');

------------------------------------------------------------
-- ADDITIONAL VIDEO GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CogVideo 1.5', 'cogvideo-1-5', 'Updated CogVideo model by Zhipu AI with improved video quality.',
'CogVideo 1.5 by Zhipu AI / Tsinghua University is an updated text-to-video generation model with improved temporal consistency and visual quality over CogVideoX. Supports longer video generation.',
'https://github.com/THUDM/CogVideo', 'https://github.com/THUDM/CogVideo',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','text-to-video','zhipu','tsinghua','improved'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cogvideo-1-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MAGI-1', 'magi-1', 'Open-weight video generation model with autoregressive architecture.',
'MAGI-1 is an open-weight video generation model using autoregressive generation for consistent long-form video. Supports text-to-video and image-to-video generation. Requires significant GPU resources.',
'https://github.com/SandAI-org/MAGI-1', 'https://github.com/SandAI-org/MAGI-1',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 24, true, true, true,
ARRAY['video-generation','autoregressive','long-form','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'magi-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Show-1', 'show-1', 'Text-to-video model combining pixel and latent diffusion approaches.',
'Show-1 generates videos using a hybrid approach combining pixel-based and latent-based video diffusion models. Achieves high temporal consistency. Research project with pre-trained weights available.',
'https://github.com/showlab/Show-1', 'https://github.com/showlab/Show-1',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','text-to-video','hybrid','pixel','latent','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'show-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LaVie', 'lavie', 'Text-to-video generation framework with cascaded latent diffusion.',
'LaVie is a text-to-video generation framework using cascaded latent diffusion models. Generates high-quality videos with temporal super-resolution. By Shanghai AI Lab. Apache 2.0 license.',
'https://github.com/Vchitect/LaVie', 'https://github.com/Vchitect/LaVie',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','text-to-video','cascaded','diffusion','shanghai-ai'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lavie');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Wan 2.5', 'wan-2-5', 'Latest video generation model by Alibaba with improved quality and speed.',
'Wan 2.5 by Alibaba is the latest iteration of the Wan video generation series. Improvements in visual quality, motion coherence, and generation speed over Wan 2.1. Supports text-to-video and image-to-video.',
'https://github.com/Wan-Video/Wan2.1', 'https://github.com/Wan-Video/Wan2.1',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','alibaba','wan','improved','text-to-video','image-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wan-2-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Open-Sora 2.0', 'open-sora-2', 'Latest Open-Sora release with improved video generation quality.',
'Open-Sora 2.0 by HPC-AI Tech is an updated open-source video generation model. Improves on earlier versions with better motion, higher resolution, and longer video support. Apache 2.0 license.',
'https://github.com/hpcaitech/Open-Sora', 'https://github.com/hpcaitech/Open-Sora',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','open-sora','improved','hpc-ai','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'open-sora-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LTX-Video 2', 'ltx-video-2', 'Improved video generation model by Lightricks with higher quality output.',
'LTX-Video 2 by Lightricks improves upon the original LTX-Video with better visual quality, motion coherence, and prompt adherence. Supports text-to-video and image-to-video generation. Apache 2.0 license.',
'https://github.com/Lightricks/LTX-Video', 'https://github.com/Lightricks/LTX-Video',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['video-generation','lightricks','ltx','improved','text-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ltx-video-2');

------------------------------------------------------------
-- ADDITIONAL LARGE LANGUAGE MODELS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenHermes 2.5', 'openhermes', 'Fine-tuned Mistral 7B achieving top performance through curated training data.',
'OpenHermes 2.5 by Nous Research is a fine-tune of Mistral 7B using curated synthetic training data. Achieves top performance on benchmarks for its size class. Popular base for further fine-tuning. Apache 2.0 license.',
'https://huggingface.co/teknium/OpenHermes-2.5-Mistral-7B', 'https://huggingface.co/teknium/OpenHermes-2.5-Mistral-7B',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['llm','mistral','fine-tune','nous-research','synthetic-data'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'openhermes');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'WizardLM', 'wizardlm', 'LLM fine-tuned with Evol-Instruct for complex instruction following.',
'WizardLM by Microsoft Research is fine-tuned using Evol-Instruct, a method that evolves simple instructions into complex ones. Available based on Llama 2 (7B, 13B, 70B). Strong instruction-following capabilities.',
'https://github.com/nlpxucan/WizardLM', 'https://github.com/nlpxucan/WizardLM',
(SELECT id FROM categories WHERE slug = 'large-language-models'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','instruction-following','evol-instruct','microsoft','fine-tune'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wizardlm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Llama 3.2', 'llama-3-2', 'Multimodal and lightweight Llama models by Meta including vision and text-only variants.',
'Llama 3.2 by Meta includes lightweight text-only models (1B, 3B) for edge deployment and multimodal vision models (11B, 90B) for image understanding. Supports on-device use and visual reasoning. Llama 3.2 Community License.',
'https://llama.meta.com', 'https://github.com/meta-llama/llama-models',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Llama 3.2 Community', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['llm','meta','llama','multimodal','vision','edge','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-3-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Phi-3', 'phi-3', 'Small language model by Microsoft in 3.8B size with strong benchmark performance.',
'Phi-3 by Microsoft is a 3.8B parameter small language model that outperforms models twice its size on benchmarks. Available in mini (3.8B), small (7B), and medium (14B) variants. MIT license.',
'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct', 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['llm','microsoft','phi','small','efficient','3.8b'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'phi-3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Gemma 2', 'gemma-2', 'Open-weight models by Google in 2B, 9B, and 27B sizes with strong performance.',
'Gemma 2 by Google DeepMind offers open models in 2B, 9B, and 27B sizes. Strong benchmark performance especially for size class. Includes instruction-tuned variants. Gemma license.',
'https://ai.google.dev/gemma', 'https://huggingface.co/google/gemma-2-27b',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Gemma License', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['llm','google','gemma','efficient','instruction-tuned'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gemma-2');

------------------------------------------------------------
-- ADDITIONAL AI AGENTS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Phidata', 'phidata', 'Framework for building AI assistants with memory, knowledge, and tools.',
'Phidata is a framework for building AI assistants with memory, knowledge bases, and tool use. Simple Python API for creating function-calling agents with conversation memory. Supports any LLM. MIT license.',
'https://phidata.com', 'https://github.com/phidatahq/phidata',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['agents','assistants','memory','knowledge','tools','simple'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'phidata');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ControlFlow', 'controlflow', 'Python framework for building AI workflows with structured task management.',
'ControlFlow is a Python framework for building AI workflows that require structured task management. Define tasks with types, dependencies, and validation. Integrates with Prefect for orchestration. Apache 2.0 license.',
'https://controlflow.ai', 'https://github.com/PrefectHQ/ControlFlow',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['workflow','tasks','structured','prefect','orchestration'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'controlflow');

------------------------------------------------------------
-- ADDITIONAL VECTOR DATABASES
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Turbopuffer', 'turbopuffer', 'Serverless vector database with fast search and namespace isolation.',
'Turbopuffer is a serverless vector database optimized for fast search with namespace isolation. Designed for production RAG applications. Pay-per-query pricing. API-based with SDKs for Python and JS.',
'https://turbopuffer.com', 'https://github.com/turbopuffer',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), NULL, 'freemium', 'api', 1, false, NULL, false, false, false,
ARRAY['vector-db','serverless','fast','namespace','api','production'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'turbopuffer');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Vald', 'vald', 'Highly scalable distributed vector search engine by Yahoo Japan.',
'Vald by Yahoo Japan (now LY Corporation) is a highly scalable distributed approximate nearest neighbor search engine. Cloud-native architecture with Kubernetes deployment. Handles billions of vectors. Apache 2.0 license.',
'https://vald.vdaas.org', 'https://github.com/vdaas/vald',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['vector-search','distributed','kubernetes','yahoo-japan','billion-scale'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vald');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Voyager', 'voyager-spotify', 'Approximate nearest neighbor library by Spotify using HNSW.',
'Voyager by Spotify is an approximate nearest-neighbor search library using HNSW. Lightweight C++ core with Python and Java bindings. Designed for production music recommendation systems. Apache 2.0 license.',
'https://github.com/spotify/voyager', 'https://github.com/spotify/voyager',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['ann','hnsw','spotify','lightweight','production','music'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'voyager-spotify');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Infinity Embedding Server', 'infinity-embedding', 'Fast embedding inference server supporting many embedding models.',
'Infinity is a high-throughput embedding inference server supporting many popular embedding models. Features dynamic batching, caching, and OpenAI-compatible API. Optimized for production deployment. MIT license.',
'https://github.com/michaelfeil/infinity', 'https://github.com/michaelfeil/infinity',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['embeddings','server','inference','openai-compatible','fast','batching'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'infinity-embedding');

------------------------------------------------------------
-- ADDITIONAL COMPUTER VISION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'BoT-SORT', 'bot-sort', 'Robust multi-object tracking combining motion and appearance cues.',
'BoT-SORT is a multi-object tracking method that combines camera motion compensation, Kalman filter, and appearance-based re-identification. Achieves state-of-the-art tracking accuracy on MOT benchmarks.',
'https://github.com/NirAharon/BoT-SORT', 'https://github.com/NirAharon/BoT-SORT',
(SELECT id FROM categories WHERE slug = 'computer-vision'), NULL, 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tracking','multi-object','appearance','motion','robust'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bot-sort');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ArcFace', 'arcface', 'Additive angular margin loss for deep face recognition.',
'ArcFace (Additive Angular Margin Loss) provides a highly discriminative loss function for face recognition. Achieves state-of-the-art accuracy on face verification benchmarks. Implemented in InsightFace and other toolkits. MIT license.',
'https://github.com/deepinsight/insightface/tree/master/recognition/arcface_torch', 'https://github.com/deepinsight/insightface',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['face-recognition','loss-function','discriminative','verification'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'arcface');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Depth Anything V1', 'depth-anything-v1', 'Foundation model for monocular depth estimation by TikTok.',
'Depth Anything V1 by TikTok/ByteDance is a foundation model for monocular depth estimation. Trained on 62M images. Produces relative depth maps from single images. Available in small, base, and large variants. Apache 2.0 license.',
'https://github.com/LiheYoung/Depth-Anything', 'https://github.com/LiheYoung/Depth-Anything',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['depth-estimation','monocular','foundation-model','bytedance','tiktok'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'depth-anything-v1');

------------------------------------------------------------
-- ADDITIONAL MUSIC & AUDIO
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AudioLDM', 'audioldm-1', 'Original latent diffusion model for text-to-audio generation.',
'AudioLDM is a latent diffusion model for text-to-audio generation. Generates environmental sounds, sound effects, and music from text descriptions. Foundation for AudioLDM 2. By CVSSP, University of Surrey.',
'https://github.com/haoheliu/AudioLDM', 'https://github.com/haoheliu/AudioLDM',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['audio','text-to-audio','diffusion','sound-effects','latent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'audioldm-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ACE-Step 1.5', 'ace-step-1-5', 'Updated music generation model with improved quality and longer generation.',
'ACE-Step 1.5 improves upon the original ACE-Step with better audio quality, longer music generation, and improved lyrics alignment. Produces full songs with vocals in seconds.',
'https://github.com/ace-step/ACE-Step', 'https://github.com/ace-step/ACE-Step',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['music','song-generation','improved','lyrics','vocals','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ace-step-1-5');

------------------------------------------------------------
-- ADDITIONAL OCR & DOCUMENT
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OCRFlux-3B', 'ocrflux-3b', 'End-to-end OCR model using vision-language architecture.',
'OCRFlux-3B is an end-to-end OCR model using a vision-language architecture for document understanding. Handles diverse document types including forms, receipts, and tables. 3B parameter model.',
'https://huggingface.co/yifeihu/OCRFlux-3B', 'https://huggingface.co/yifeihu/OCRFlux-3B',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), NULL, 'free', 'local', 3, true, 6, true, true, true,
ARRAY['ocr','vision-language','document','forms','tables','end-to-end'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ocrflux-3b');

------------------------------------------------------------
-- ADDITIONAL DATA LABELING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'YOLO-Label', 'yolo-label', 'Simple image annotation tool for creating YOLO format labels.',
'YOLO-Label is a lightweight tool for annotating images specifically for YOLO object detection format. Simple drag-to-draw bounding boxes with class selection. Outputs YOLO-compatible txt files. MIT license.',
'https://github.com/developer0hye/Yolo_Label', 'https://github.com/developer0hye/Yolo_Label',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['annotation','yolo','bounding-box','simple','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'yolo-label');

------------------------------------------------------------
-- ADDITIONAL AI FRAMEWORKS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Flax', 'flax', 'Neural network library for JAX by Google providing Linen module system.',
'Flax by Google is a neural network library for JAX. Provides the Linen module system for defining models, training state management, and serialization. Used in many Google research projects. Apache 2.0 license.',
'https://flax.readthedocs.io', 'https://github.com/google/flax',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['framework','jax','neural-network','google','linen','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flax');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Equinox', 'equinox', 'JAX neural network library with PyTorch-like module system.',
'Equinox by Patrick Kidger brings a PyTorch-like module system to JAX. Filtered transformations replace pytrees with custom classes. Elegant and composable. Used in diffrax and other libraries. Apache 2.0 license.',
'https://docs.kidger.site/equinox/', 'https://github.com/patrick-kidger/equinox',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['framework','jax','neural-network','pytorch-like','elegant'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'equinox');

------------------------------------------------------------
-- ADDITIONAL DEPLOYMENT
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Cortex (NVIDIA)', 'cortex-nvidia', 'Open-source ML deployment platform for Kubernetes.',
'Cortex is an open-source platform for deploying, managing, and scaling ML models on Kubernetes. Supports autoscaling, multi-model endpoints, and monitoring. CLI-based workflow. Apache 2.0 license.',
'https://www.cortex.dev', 'https://github.com/cortexlabs/cortex',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['deployment','kubernetes','scaling','monitoring','cli'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cortex-nvidia');

------------------------------------------------------------
-- ADDITIONAL NLP
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AllenNLP', 'allennlp', 'Research library for NLP by AI2 built on PyTorch.',
'AllenNLP by the Allen Institute for AI is an open-source NLP research library built on PyTorch. Provides high-level abstractions for models, data readers, and training. Includes pre-trained models for various NLP tasks. Apache 2.0 license.',
'https://allenai.org/allennlp', 'https://github.com/allenai/allennlp',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['nlp','research','ai2','pytorch','models','abstractions'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'allennlp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenNLP', 'opennlp', 'Machine learning based toolkit for NLP tasks by Apache Foundation.',
'Apache OpenNLP is a machine learning toolkit for processing natural language text. Supports tokenization, sentence segmentation, POS tagging, NER, parsing, and coreference. Java-based with pre-trained models. Apache 2.0 license.',
'https://opennlp.apache.org', 'https://github.com/apache/opennlp',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','java','apache','tokenization','ner','parsing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'opennlp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stanford CoreNLP', 'corenlp', 'Comprehensive NLP toolkit by Stanford with pipeline architecture.',
'Stanford CoreNLP provides a comprehensive set of NLP tools: tokenization, POS tagging, NER, parsing, sentiment analysis, coreference, and more. Java-based with Python wrapper (Stanza). Supports 6 languages. GPL-3.0 license.',
'https://stanfordnlp.github.io/CoreNLP/', 'https://github.com/stanfordnlp/CoreNLP',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'GPL-3.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['nlp','stanford','java','pipeline','comprehensive','sentiment'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'corenlp');

------------------------------------------------------------
-- ADDITIONAL RAG
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GPT4All RAG', 'gpt4all-rag', 'Local RAG capabilities in GPT4All for chatting with documents privately.',
'GPT4All by Nomic AI includes built-in RAG capabilities for chatting with local documents. Upload PDFs, text files, or other documents. Indexes locally and queries with local LLMs. Fully private. MIT license.',
'https://gpt4all.io', 'https://github.com/nomic-ai/gpt4all',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['rag','local','private','documents','desktop','nomic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gpt4all-rag');

------------------------------------------------------------
-- ADDITIONAL MODEL TRAINING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Textual Inversion', 'textual-inversion', 'Technique for teaching Stable Diffusion new concepts from a few images.',
'Textual Inversion teaches Stable Diffusion new concepts (objects, styles, faces) from just 3-5 images by learning a new text embedding. Lightweight alternative to full fine-tuning. Implemented in Diffusers and AUTOMATIC1111.',
'https://textual-inversion.github.io', 'https://github.com/rinongal/textual_inversion',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), NULL, 'free', 'local', 2, true, 4, true, true, true,
ARRAY['fine-tuning','stable-diffusion','concepts','embedding','lightweight','few-shot'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'textual-inversion');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DreamBooth', 'dreambooth', 'Subject-driven fine-tuning technique for personalizing diffusion models.',
'DreamBooth by Google is a technique for personalizing text-to-image diffusion models with just 3-5 images of a subject. Teaches the model a unique identifier for the subject. Widely implemented in Kohya-ss, Diffusers, and other tools.',
'https://dreambooth.github.io', 'https://github.com/google/dreambooth',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['fine-tuning','stable-diffusion','personalization','subject','google','few-shot'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dreambooth');

------------------------------------------------------------
-- ADDITIONAL DIFFUSION TOOLS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Diffusers (Toolkit)', 'hf-diffusers-toolkit', 'Core Python library for running and customizing diffusion model pipelines.',
'Hugging Face Diffusers is the core Python library for diffusion models. Provides modular pipeline components (schedulers, UNets, VAEs), 1000+ pre-trained pipelines, and training utilities. The backbone of most diffusion tools. Apache 2.0 license.',
'https://huggingface.co/docs/diffusers', 'https://github.com/huggingface/diffusers',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['diffusers','pipelines','huggingface','schedulers','modular','library'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-diffusers-toolkit');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SD.Next', 'sd-next', 'Advanced Stable Diffusion web UI with extended model support.',
'SD.Next (formerly vladmandic/automatic) is an advanced fork of AUTOMATIC1111 with extended model support including SDXL, SD3, FLUX, and Kandinsky. Improved UI, performance optimizations, and additional features. AGPL-3.0 license.',
'https://github.com/vladmandic/automatic', 'https://github.com/vladmandic/automatic',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'AGPL-3.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['diffusion','ui','webui','sdxl','flux','sd3','extended'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sd-next');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stability Matrix', 'stability-matrix', 'Multi-platform package manager for Stable Diffusion UIs.',
'Stability Matrix is a multi-platform package manager and launcher for Stable Diffusion. One-click install of AUTOMATIC1111, ComfyUI, Forge, InvokeAI, and others. Manages models, environments, and updates. AGPL-3.0 license.',
'https://lykos.ai', 'https://github.com/LykosAI/StabilityMatrix',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'AGPL-3.0', 'free', 'local', 1, true, 4, true, true, true,
ARRAY['package-manager','launcher','comfyui','automatic1111','one-click','installer'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stability-matrix');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Pinokio', 'pinokio', 'One-click installer for running AI applications locally.',
'Pinokio is a browser-based application that lets you install and run AI applications with one click. Supports ComfyUI, AUTOMATIC1111, Fooocus, Ollama, and many more. Handles dependencies automatically. MIT license.',
'https://pinokio.computer', 'https://github.com/pinokiocomputer/pinokio',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['installer','one-click','ai-apps','comfyui','automatic1111','easy'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pinokio');

------------------------------------------------------------
-- ADDITIONAL VOICE CLONING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'XTTS-v2 (Voice Cloning)', 'xtts-v2-cloning', 'Voice cloning mode of XTTS-v2 for creating custom voice replicas.',
'XTTS-v2 (part of Coqui TTS) supports zero-shot voice cloning from just 6 seconds of reference audio. Clones voice characteristics across 17 languages. Requires GPU with 4+ GB VRAM. CPML license.',
'https://github.com/coqui-ai/TTS', 'https://github.com/coqui-ai/TTS',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'CPML', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['voice-cloning','zero-shot','multilingual','coqui','6-seconds'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'xtts-v2-cloning');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Fish Speech (Voice Cloning)', 'fish-speech-cloning', 'Zero-shot voice cloning capabilities of Fish Speech model.',
'Fish Speech supports zero-shot voice cloning from short reference audio. Achieves natural voice replication with minimal data. Supports multiple languages. Part of the FishAudio ecosystem. Apache 2.0 license.',
'https://fish.audio', 'https://github.com/fishaudio/fish-speech',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['voice-cloning','zero-shot','multilingual','fish-audio','natural'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fish-speech-cloning');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CosyVoice (Zero-Shot Cloning)', 'cosyvoice-cloning', 'Zero-shot voice cloning mode of CosyVoice model by Alibaba.',
'CosyVoice by Alibaba supports zero-shot voice cloning from a few seconds of reference audio. Produces natural-sounding speech with the cloned voice characteristics. Supports Chinese and English.',
'https://github.com/FunAudioLLM/CosyVoice', 'https://github.com/FunAudioLLM/CosyVoice',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['voice-cloning','zero-shot','alibaba','cosyvoice','chinese','english'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cosyvoice-cloning');

------------------------------------------------------------
-- ADDITIONAL AI ANIMATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AnimateAnyone', 'animateanyone', 'Character animation from a single image using pose guidance.',
'Animate Anyone generates character animation videos from a single reference image guided by pose sequences. Produces consistent character appearance and natural motion. Originally by Alibaba. Community implementations available.',
'https://github.com/HumanAIGC/AnimateAnyone', 'https://github.com/HumanAIGC/AnimateAnyone',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['animation','character','pose-guided','single-image','alibaba'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'animateanyone');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MagicPose', 'magicpose', 'Realistic human pose and facial expression transfer from video.',
'MagicPose generates videos with realistic human motion by transferring poses and facial expressions from a driving video to a reference image. Preserves appearance while animating. Requires GPU.',
'https://github.com/Boese0601/MagicDance', 'https://github.com/Boese0601/MagicDance',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['animation','pose-transfer','facial-expression','motion','video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'magicpose');

------------------------------------------------------------
-- ADDITIONAL OBSERVABILITY
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Weights & Biases (wandb)', 'wandb', 'ML experiment tracking and visualization platform.',
'Weights & Biases (W&B) is a platform for ML experiment tracking, dataset versioning, and model management. Auto-logs metrics, hyperparameters, and artifacts. Free tier for personal use. MIT license for the client library.',
'https://wandb.ai', 'https://github.com/wandb/wandb',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'MIT', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['tracking','experiments','visualization','metrics','hyperparameters'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wandb');
