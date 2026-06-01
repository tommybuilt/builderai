-- Batch 2: Music & Audio Generation, 3D Model Generation, OCR & Document Processing, NLP
-- All tools are real open-source projects. Uses ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- MUSIC & AUDIO GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AudioCraft / MusicGen', 'audiocraft-musicgen', 'Audio generation framework by Meta including MusicGen for text-to-music.',
'AudioCraft by Meta Research is a PyTorch library for audio generation. Includes MusicGen (text-to-music), AudioGen (text-to-sound effects), and EnCodec (neural audio codec). MusicGen generates music from text descriptions or melody conditioning. Requires GPU with 8+ GB VRAM. MIT license.',
'https://github.com/facebookresearch/audiocraft', 'https://github.com/facebookresearch/audiocraft',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['music','audio','text-to-music','meta','musicgen','audiocraft'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'audiocraft-musicgen');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AudioLDM 2', 'audioldm-2', 'Latent diffusion model for text-to-audio, music, and speech generation.',
'AudioLDM 2 is a unified latent diffusion model for text-to-audio, text-to-music, and text-to-speech generation. Uses a shared representation space for different audio types. Generates high-quality audio from text descriptions. Requires GPU with 8+ GB VRAM. By CVSSP, University of Surrey.',
'https://github.com/haoheliu/AudioLDM2', 'https://github.com/haoheliu/AudioLDM2',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['audio','music','text-to-audio','diffusion','latent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'audioldm-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Riffusion', 'riffusion', 'Real-time music generation using Stable Diffusion on spectrograms.',
'Riffusion generates music in real-time by fine-tuning Stable Diffusion on spectrograms. Converts text prompts to spectrogram images which are then converted to audio. Enables creative music generation through image diffusion techniques. Requires GPU. MIT license.',
'https://www.riffusion.com', 'https://github.com/riffusion/riffusion',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['music','spectrogram','diffusion','real-time','creative'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'riffusion');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stable Audio Open', 'stable-audio-open', 'Open-weight audio generation model by Stability AI for sound effects and production elements.',
'Stable Audio Open by Stability AI generates variable-length stereo audio (up to 47 seconds) from text descriptions. Optimized for sound effects, production elements, and audio samples rather than full songs. Uses a latent diffusion architecture. Requires GPU. Stability Community License.',
'https://stability.ai', 'https://huggingface.co/stabilityai/stable-audio-open-1.0',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'Stability Community', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['audio','sound-effects','text-to-audio','stability-ai','diffusion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stable-audio-open');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DiffRhythm', 'diffrhythm', 'Full-length song generation model using diffusion with lyrics and style conditioning.',
'DiffRhythm is a diffusion-based model for generating full-length songs (up to 4m45s). Conditions on lyrics and musical style descriptions. Produces vocals and instrumentals together. By ASLP@NPU. Requires GPU with 12+ GB VRAM. Apache 2.0 license.',
'https://github.com/ASLP-lab/DiffRhythm', 'https://github.com/ASLP-lab/DiffRhythm',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'Apache-2.0', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['music','song-generation','lyrics','diffusion','full-length'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'diffrhythm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ACE-Step', 'ace-step', 'Fast music generation model producing full songs with lyrics in seconds.',
'ACE-Step is a fast music generation model that can produce full songs with vocals and lyrics in seconds. Uses an efficient diffusion architecture optimized for speed. Supports multiple musical styles. Requires GPU. Open-source release.',
'https://github.com/ace-step/ACE-Step', 'https://github.com/ace-step/ACE-Step',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['music','song-generation','fast','lyrics','vocals'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ace-step');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'YuE', 'yue-music', 'Open-source music generation model for creating full songs with vocals and accompaniment.',
'YuE is an open-source music generation model that creates full songs including vocals and instrumental accompaniment from text descriptions and lyrics. Supports multiple genres and languages. Requires GPU with 16+ GB VRAM.',
'https://github.com/multimodal-art-projection/YuE', 'https://github.com/multimodal-art-projection/YuE',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 4, true, 16, true, true, true,
ARRAY['music','song-generation','vocals','accompaniment','multilingual'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'yue-music');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'EnCodec', 'encodec', 'High-fidelity neural audio codec by Meta for audio compression and tokenization.',
'EnCodec is a high-fidelity neural audio codec by Meta Research. Compresses audio to very low bitrates while maintaining quality. Used as the audio tokenizer in MusicGen and other generative models. Runs on CPU. MIT license.',
'https://github.com/facebookresearch/encodec', 'https://github.com/facebookresearch/encodec',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['audio','codec','compression','tokenizer','meta'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'encodec');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Demucs', 'demucs', 'State-of-the-art music source separation model by Meta for splitting tracks.',
'Demucs by Meta Research is a state-of-the-art music source separation model. Separates songs into drums, bass, vocals, and other stems. Version 4 (Hybrid Transformer) achieves top results on MDX benchmark. Runs on GPU or CPU. MIT license.',
'https://github.com/facebookresearch/demucs', 'https://github.com/facebookresearch/demucs',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['audio','source-separation','music','stems','meta','demucs'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'demucs');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AudioSR', 'audiosr', 'Audio super-resolution model for upsampling audio to higher sample rates.',
'AudioSR is an audio super-resolution model that upsamples audio from lower sample rates (e.g., 4kHz, 8kHz, 16kHz, 24kHz) to 48kHz. Improves the quality of low-resolution audio recordings. Supports speech, music, and environmental sounds. Requires GPU.',
'https://github.com/haoheliu/versatile_audio_super_resolution', 'https://github.com/haoheliu/versatile_audio_super_resolution',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 3, true, 6, true, true, true,
ARRAY['audio','super-resolution','upsampling','enhancement'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'audiosr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DAC (Descript Audio Codec)', 'dac-audio', 'High-fidelity universal neural audio codec by Descript for compression.',
'Descript Audio Codec (DAC) is a high-fidelity, general-purpose neural audio compression codec. Achieves better compression than EnCodec at similar bitrates. Supports speech, music, and environmental sounds. Runs on GPU or CPU. MIT license by Descript.',
'https://github.com/descriptinc/descript-audio-codec', 'https://github.com/descriptinc/descript-audio-codec',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['audio','codec','compression','descript','neural'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dac-audio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Amphion', 'amphion', 'Open-source toolkit for audio, music, and speech generation research.',
'Amphion is a comprehensive open-source toolkit for audio, music, and speech generation by OpenMMLab. Covers TTS, singing voice synthesis, voice conversion, music generation, and more. Modular design for research and production. Apache 2.0 license.',
'https://github.com/open-mmlab/Amphion', 'https://github.com/open-mmlab/Amphion',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['audio','music','speech','toolkit','research','openmmlab'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'amphion');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'VampNet', 'vampnet', 'Music generation model using masked acoustic token modeling.',
'VampNet is a music generation model that uses masked acoustic token modeling for non-autoregressive audio generation. Can generate music unconditionally, perform music infilling, and create variations. By Hugo Flores Garcia. MIT license.',
'https://github.com/hugofloresgarcia/vampnet', 'https://github.com/hugofloresgarcia/vampnet',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['music','generation','masked-modeling','infilling','variation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vampnet');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Dance Diffusion', 'dance-diffusion', 'Audio diffusion model by Harmonai for generating music samples.',
'Dance Diffusion by Harmonai (backed by Stability AI) generates music samples using diffusion models applied directly to raw audio waveforms. One of the first open-source audio diffusion models. Generates short musical clips. MIT license.',
'https://github.com/Harmonai-org/sample-generator', 'https://github.com/Harmonai-org/sample-generator',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['music','diffusion','raw-audio','harmonai','stability-ai'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dance-diffusion');

------------------------------------------------------------
-- 3D MODEL GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Point-E', 'point-e', 'Text-to-3D point cloud generation system by OpenAI.',
'Point-E by OpenAI generates 3D point clouds from text descriptions. Uses a two-stage approach: text-to-image then image-to-3D. Fast generation (1-2 minutes on a single GPU) compared to optimization-based methods. Requires GPU. MIT license.',
'https://github.com/openai/point-e', 'https://github.com/openai/point-e',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','point-cloud','text-to-3d','openai'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'point-e');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Shap-E', 'shap-e', 'Text-to-3D model by OpenAI that generates textured meshes and NeRFs.',
'Shap-E by OpenAI generates 3D assets conditioned on text or images. Unlike Point-E, it directly produces textured 3D meshes and Neural Radiance Fields (NeRFs). Faster than optimization methods. Requires GPU with 8+ GB VRAM. MIT license.',
'https://github.com/openai/shap-e', 'https://github.com/openai/shap-e',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','mesh','nerf','text-to-3d','openai'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'shap-e');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TripoSR', 'triposr', 'Fast single-image 3D reconstruction by Stability AI and Tripo in under 1 second.',
'TripoSR by Stability AI and Tripo generates 3D meshes from a single image in under 0.5 seconds. Uses a feed-forward transformer architecture for fast reconstruction. Outputs textured meshes suitable for downstream applications. Requires GPU. MIT license.',
'https://github.com/VAST-AI-Research/TripoSR', 'https://github.com/VAST-AI-Research/TripoSR',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['3d','mesh','image-to-3d','fast','stability-ai','tripo'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'triposr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InstantMesh', 'instantmesh', 'Fast single-image to 3D mesh generation using multi-view diffusion and LRM.',
'InstantMesh generates 3D meshes from single images by combining multi-view diffusion models with a Large Reconstruction Model (LRM). Produces high-quality textured meshes in seconds. By Tencent ARC. Requires GPU with 8+ GB VRAM. Apache 2.0 license.',
'https://github.com/TencentARC/InstantMesh', 'https://github.com/TencentARC/InstantMesh',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','mesh','image-to-3d','multi-view','tencent','lrm'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'instantmesh');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LGM (Large Gaussian Model)', 'lgm-3d', 'High-resolution 3D Gaussian generation from text or single images.',
'LGM (Large Gaussian Model) generates high-resolution 3D Gaussian Splatting representations from text prompts or single images. Produces 3D assets in ~5 seconds using an asymmetric U-Net backbone. Requires GPU with 8+ GB VRAM. MIT license.',
'https://github.com/3DTopia/LGM', 'https://github.com/3DTopia/LGM',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','gaussian-splatting','text-to-3d','image-to-3d','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lgm-3d');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenLRM', 'openlrm', 'Open-source implementation of Large Reconstruction Models for single-image 3D.',
'OpenLRM is an open-source implementation of Large Reconstruction Models for generating 3D NeRFs from single images. Provides pre-trained models and training code. Fast single-image to 3D reconstruction. By Zexin He. Apache 2.0 license.',
'https://github.com/3DTopia/OpenLRM', 'https://github.com/3DTopia/OpenLRM',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','nerf','lrm','image-to-3d','reconstruction'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'openlrm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DreamGaussian', 'dreamgaussian', 'Fast 3D content generation using Gaussian Splatting with mesh extraction.',
'DreamGaussian generates 3D content using Gaussian Splatting with efficient mesh extraction. Produces textured 3D meshes from text or images in ~2 minutes (10x faster than DreamFusion). By Jiaxiang Tang. MIT license.',
'https://github.com/dreamgaussian/dreamgaussian', 'https://github.com/dreamgaussian/dreamgaussian',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['3d','gaussian-splatting','mesh','text-to-3d','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dreamgaussian');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Zero-1-to-3', 'zero-1-to-3', 'Novel view synthesis from a single image using diffusion model conditioning.',
'Zero-1-to-3 generates novel views of an object from a single input image by conditioning a diffusion model on relative camera viewpoints. Enables 3D reconstruction from 2D images. By Columbia University. Apache 2.0 license.',
'https://github.com/cvlab-columbia/zero123', 'https://github.com/cvlab-columbia/zero123',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['3d','novel-view','diffusion','image-to-3d','columbia'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'zero-1-to-3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Wonder3D', 'wonder3d', 'Single image to 3D mesh with cross-domain diffusion for consistent multi-view generation.',
'Wonder3D generates 3D meshes from single images using cross-domain diffusion to produce consistent multi-view color images and normal maps simultaneously. Achieves high-quality reconstruction in 2-3 minutes. By Xiaoming Zhao et al.',
'https://github.com/xxlong0/Wonder3D', 'https://github.com/xxlong0/Wonder3D',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), NULL, 'free', 'local', 4, true, 8, true, true, true,
ARRAY['3d','mesh','multi-view','diffusion','image-to-3d'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wonder3d');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TRELLIS', 'trellis-3d', 'Large-scale 3D asset generation framework using structured latent representations.',
'TRELLIS is a 3D asset generation framework that uses structured latent representations (SLATs) for generating high-quality 3D assets with detailed geometry and textures. Supports text-to-3D and image-to-3D. By Microsoft Research. MIT license.',
'https://github.com/microsoft/TRELLIS', 'https://github.com/microsoft/TRELLIS',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['3d','mesh','latent','text-to-3d','image-to-3d','microsoft'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'trellis-3d');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CRM', 'crm-3d', 'Convolutional Reconstruction Model for single-image 3D generation with high-quality textures.',
'CRM (Convolutional Reconstruction Model) generates high-quality textured 3D meshes from single images. Uses a convolutional architecture for fast and detailed reconstruction. Produces ready-to-use 3D assets. Requires GPU.',
'https://github.com/thu-ml/CRM', 'https://github.com/thu-ml/CRM',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','mesh','convolutional','image-to-3d','texture'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'crm-3d');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MVDream', 'mvdream', 'Multi-view diffusion model for consistent 3D generation from text.',
'MVDream generates consistent multi-view images from text prompts by fine-tuning Stable Diffusion with 3D-aware attention. The generated views can be used for high-quality 3D reconstruction. By Yichun Shi et al. Apache 2.0 license.',
'https://github.com/bytedance/MVDream', 'https://github.com/bytedance/MVDream',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['3d','multi-view','diffusion','text-to-3d','bytedance'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mvdream');

------------------------------------------------------------
-- OCR & DOCUMENT PROCESSING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Tesseract', 'tesseract-ocr', 'Most widely-used open-source OCR engine supporting 100+ languages.',
'Tesseract is the most widely-used open-source OCR engine, originally developed by HP and now maintained by Google. Supports 100+ languages. LSTM-based recognition in v5. Works with images and PDFs. Runs on CPU. Apache 2.0 license.',
'https://github.com/tesseract-ocr/tesseract', 'https://github.com/tesseract-ocr/tesseract',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['ocr','text-extraction','multilingual','google','lstm'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tesseract-ocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'EasyOCR', 'easyocr', 'Ready-to-use OCR library supporting 80+ languages with simple Python API.',
'EasyOCR is a Python OCR library by JaidedAI that supports 80+ languages. Uses deep learning models for text detection and recognition. Simple 3-line API for integration. Supports GPU and CPU. Apache 2.0 license.',
'https://github.com/JaidedAI/EasyOCR', 'https://github.com/JaidedAI/EasyOCR',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['ocr','text-extraction','python','multilingual','easy'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'easyocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PaddleOCR', 'paddleocr', 'Multilingual OCR toolkit by PaddlePaddle with state-of-the-art accuracy.',
'PaddleOCR by Baidu is a multilingual OCR toolkit achieving industry-leading accuracy. Supports 80+ languages with PP-OCR series models. Includes text detection, recognition, layout analysis, and table recognition. Ultra-lightweight models available for mobile. Apache 2.0 license.',
'https://github.com/PaddlePaddle/PaddleOCR', 'https://github.com/PaddlePaddle/PaddleOCR',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['ocr','text-extraction','baidu','multilingual','mobile','lightweight','table'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'paddleocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Surya OCR', 'surya-ocr', 'Multilingual document OCR toolkit with line detection and layout analysis.',
'Surya is a multilingual document OCR toolkit that provides line-level text detection, text recognition across 90+ languages, layout analysis, table detection, and reading order detection. Uses transformer-based models. By VikParuchuri. GPL-3.0 license.',
'https://github.com/VikParuchuri/surya', 'https://github.com/VikParuchuri/surya',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'GPL-3.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['ocr','document','layout','table','multilingual','transformer'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'surya-ocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OCRmyPDF', 'ocrmypdf', 'Adds searchable text layer to scanned PDFs using Tesseract OCR.',
'OCRmyPDF adds a searchable text layer to scanned PDF files, making them searchable and selectable. Uses Tesseract OCR engine. Handles image preprocessing, deskewing, and optimization. Runs entirely on CPU. MPL-2.0 license.',
'https://github.com/ocrmypdf/OCRmyPDF', 'https://github.com/ocrmypdf/OCRmyPDF',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'MPL-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['ocr','pdf','searchable','tesseract','preprocessing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ocrmypdf');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Docling', 'docling', 'Document parsing library by IBM for converting PDFs and documents to structured data.',
'Docling by IBM Research converts PDFs, DOCX, PPTX, and other document formats to structured JSON or Markdown. Handles complex layouts, tables, figures, and equations. Designed for LLM/RAG pipelines. Runs on CPU. MIT license.',
'https://github.com/DS4SD/docling', 'https://github.com/DS4SD/docling',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['document','pdf','parsing','ibm','structured','rag','markdown'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'docling');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MinerU', 'mineru', 'One-stop tool for high-quality PDF extraction to Markdown or JSON.',
'MinerU is a one-stop tool for converting PDFs to machine-readable Markdown or structured JSON. Handles complex layouts, formulas, tables, and images. Built on top of multiple OCR engines. By OpenDataLab. AGPL-3.0 license.',
'https://github.com/opendatalab/MinerU', 'https://github.com/opendatalab/MinerU',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'AGPL-3.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['document','pdf','extraction','markdown','json','opendatalab'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mineru');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'olmOCR', 'olmocr', 'Vision-language model based OCR toolkit by AI2 for document understanding.',
'olmOCR by AI2 (Allen Institute for AI) uses vision-language models for document understanding and OCR. Goes beyond traditional OCR by understanding document structure, context, and semantics. Part of the OLMo family. Apache 2.0 license.',
'https://github.com/allenai/olmocr', 'https://github.com/allenai/olmocr',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['ocr','document','vlm','ai2','olmo','understanding'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'olmocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Marker', 'marker-pdf', 'Converts PDFs to clean Markdown with high accuracy for text, tables, and equations.',
'Marker converts PDF documents to clean Markdown format with high accuracy. Handles text, tables, equations (LaTeX), and images. Uses a pipeline of deep learning models for layout detection, OCR, and formatting. By VikParuchuri. GPL-3.0 license.',
'https://github.com/VikParuchuri/marker', 'https://github.com/VikParuchuri/marker',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'GPL-3.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['document','pdf','markdown','table','equation','conversion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'marker-pdf');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Nougat', 'nougat-meta', 'Neural OCR model by Meta for academic documents and mathematical expressions.',
'Nougat (Neural Optical Understanding for Academic Documents) by Meta converts academic PDFs to Markdown. Excels at mathematical expressions, tables, and scientific notation. Uses a vision-encoder-decoder architecture. Requires GPU. CC-BY-NC license.',
'https://github.com/facebookresearch/nougat', 'https://github.com/facebookresearch/nougat',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'CC-BY-NC', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['ocr','academic','math','scientific','meta','pdf','markdown'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nougat-meta');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Unstructured', 'unstructured', 'Open-source library for preprocessing unstructured documents for LLM pipelines.',
'Unstructured provides open-source components for ingesting and preprocessing unstructured documents (PDFs, HTML, DOCX, images, etc.) for LLM and RAG pipelines. Handles partitioning, chunking, cleaning, and staging. Python library runs on CPU. Apache 2.0 license.',
'https://github.com/Unstructured-IO/unstructured', 'https://github.com/Unstructured-IO/unstructured',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['document','preprocessing','llm','rag','pdf','html','ingestion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'unstructured');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Camelot', 'camelot', 'Python library for extracting tables from PDF files.',
'Camelot is a Python library for extracting tables from PDF files into pandas DataFrames. Supports stream and lattice table parsing methods. Handles complex table layouts. No OCR needed for text-based PDFs. MIT license.',
'https://github.com/camelot-dev/camelot', 'https://github.com/camelot-dev/camelot',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['document','pdf','table-extraction','pandas','python'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'camelot');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Tabula', 'tabula', 'Tool for extracting tables from PDF files into CSV or DataFrame format.',
'Tabula is a tool for liberating data tables from PDF files. Available as a Java library, command-line tool, and web GUI. Extracts tables to CSV, TSV, or JSON format. Used by journalists and data analysts worldwide. MIT license.',
'https://tabula.technology', 'https://github.com/tabulapdf/tabula',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['document','pdf','table-extraction','csv','java'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tabula');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'pdfplumber', 'pdfplumber', 'Python library for extracting text, tables, and metadata from PDFs.',
'pdfplumber is a Python library for extracting detailed text, tables, and metadata from PDF files. Built on pdfminer.six. Provides visual debugging tools and character-level position data. No OCR — works with text-based PDFs. MIT license.',
'https://github.com/jsvine/pdfplumber', 'https://github.com/jsvine/pdfplumber',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['document','pdf','text-extraction','table','python','metadata'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pdfplumber');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GOT-OCR', 'got-ocr', 'General OCR Theory model with unified end-to-end architecture for various OCR tasks.',
'GOT-OCR (General OCR Theory) is a unified end-to-end OCR model that handles scene text, document text, formulas, charts, sheet music, and more with a single architecture. Uses a vision-encoder-decoder approach. By StepFun. Apache 2.0 license.',
'https://github.com/Ucas-HaoranWei/GOT-OCR2.0', 'https://github.com/Ucas-HaoranWei/GOT-OCR2.0',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['ocr','unified','document','formula','scene-text','end-to-end'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'got-ocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kraken', 'kraken-ocr', 'Turn-key OCR system for historical and non-Latin script documents.',
'Kraken is a turn-key OCR system built for academic use on historical and non-Latin script documents. Supports binarization, layout analysis, and recognition. Includes models for Arabic, Hebrew, Greek, and other scripts. Apache 2.0 license.',
'https://github.com/mittagessen/kraken', 'https://github.com/mittagessen/kraken',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['ocr','historical','non-latin','academic','arabic','hebrew'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kraken-ocr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PyMuPDF', 'pymupdf', 'Python bindings for MuPDF library for fast PDF text and image extraction.',
'PyMuPDF provides Python bindings for the MuPDF library, enabling fast extraction of text, images, and metadata from PDF documents. Also supports rendering PDFs to images. Very fast and memory-efficient. AGPL-3.0 license.',
'https://github.com/pymupdf/PyMuPDF', 'https://github.com/pymupdf/PyMuPDF',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'AGPL-3.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['document','pdf','text-extraction','images','python','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pymupdf');

------------------------------------------------------------
-- NATURAL LANGUAGE PROCESSING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'spaCy', 'spacy', 'Industrial-strength NLP library for production use with trained pipelines.',
'spaCy is an industrial-strength natural language processing library in Python. Provides fast and accurate tokenization, POS tagging, NER, dependency parsing, and text classification. Includes pre-trained pipelines for 25+ languages. Designed for production use. MIT license by Explosion.',
'https://spacy.io', 'https://github.com/explosion/spaCy',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','ner','pos-tagging','parsing','python','production','explosion'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'spacy');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'NLTK', 'nltk', 'Comprehensive NLP toolkit for education and research in Python.',
'NLTK (Natural Language Toolkit) is a comprehensive platform for building Python programs to work with human language data. Provides easy interfaces to corpora, text processing libraries, and classification tools. Standard tool for NLP education and research. Apache 2.0 license.',
'https://www.nltk.org', 'https://github.com/nltk/nltk',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','education','research','python','corpora','classification'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nltk');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Transformers', 'huggingface-transformers', 'State-of-the-art machine learning library providing thousands of pre-trained models.',
'Hugging Face Transformers provides APIs and tools to download and use thousands of pre-trained models for NLP, computer vision, audio, and multimodal tasks. Supports PyTorch, TensorFlow, and JAX. The de facto standard for working with transformer models. Apache 2.0 license.',
'https://huggingface.co/docs/transformers', 'https://github.com/huggingface/transformers',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','transformers','huggingface','pytorch','tensorflow','pre-trained'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'huggingface-transformers');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stanza', 'stanza-nlp', 'Stanford NLP library for 70+ languages with neural network models.',
'Stanza is the official Python NLP library by the Stanford NLP Group. Provides pre-trained neural models for tokenization, POS tagging, NER, dependency parsing, and sentiment analysis across 70+ languages. Successor to Stanford CoreNLP. Apache 2.0 license.',
'https://stanfordnlp.github.io/stanza/', 'https://github.com/stanfordnlp/stanza',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','stanford','multilingual','ner','parsing','neural'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stanza-nlp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Gensim', 'gensim', 'Topic modeling and document similarity library for unsupervised NLP.',
'Gensim is a Python library for unsupervised topic modeling, document indexing, and similarity retrieval. Implements Word2Vec, Doc2Vec, FastText, LDA, and LSI. Memory-efficient streaming algorithms for large corpora. LGPL-2.1 license by Radim Rehurek.',
'https://radimrehurek.com/gensim/', 'https://github.com/piskvorky/gensim',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'LGPL-2.1', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','topic-modeling','word2vec','doc2vec','similarity','unsupervised'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gensim');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Flair NLP', 'flair-nlp', 'Simple framework for state-of-the-art NLP by Zalando Research.',
'Flair is a simple NLP framework by Zalando Research built on PyTorch. Provides state-of-the-art models for NER, POS tagging, text classification, and more. Features contextual string embeddings and easy model stacking. MIT license.',
'https://github.com/flairNLP/flair', 'https://github.com/flairNLP/flair',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','ner','classification','embeddings','pytorch','zalando'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flair-nlp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Sentence-Transformers', 'sentence-transformers', 'Framework for computing dense vector representations of sentences and paragraphs.',
'Sentence-Transformers provides an easy framework for computing dense vector representations (embeddings) of sentences, paragraphs, and images. Powers semantic search, clustering, and similarity tasks. Includes 100+ pre-trained models. Apache 2.0 license by UKP Lab.',
'https://www.sbert.net', 'https://github.com/UKPLab/sentence-transformers',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','embeddings','semantic-search','similarity','clustering','sbert'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sentence-transformers');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'KeyBERT', 'keybert', 'Minimal keyword extraction library using BERT embeddings.',
'KeyBERT is a minimal and easy-to-use keyword extraction technique that leverages BERT embeddings. Extracts keywords and keyphrases that are most similar to the document. Supports multiple embedding backends. MIT license by Maarten Grootendorst.',
'https://github.com/MaartenGr/KeyBERT', 'https://github.com/MaartenGr/KeyBERT',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['nlp','keywords','extraction','bert','embeddings','minimal'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'keybert');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'BERTopic', 'bertopic', 'Topic modeling library leveraging transformer embeddings and c-TF-IDF.',
'BERTopic is a topic modeling technique that leverages transformer embeddings and c-TF-IDF to create dense clusters allowing for easily interpretable topics. Supports dynamic topic modeling, guided topic modeling, and visualization. MIT license by Maarten Grootendorst.',
'https://github.com/MaartenGr/BERTopic', 'https://github.com/MaartenGr/BERTopic',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','topic-modeling','bert','clustering','visualization'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bertopic');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Presidio', 'presidio', 'Data protection and PII anonymization framework by Microsoft.',
'Presidio by Microsoft provides context-aware, pluggable, and customizable PII (Personally Identifiable Information) detection and anonymization. Supports text and image anonymization. Uses NLP, regex, and custom recognizers. Designed for privacy compliance. MIT license.',
'https://github.com/microsoft/presidio', 'https://github.com/microsoft/presidio',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','pii','anonymization','privacy','microsoft','data-protection'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'presidio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GLiNER', 'gliner', 'Generalist model for named entity recognition using bidirectional transformer.',
'GLiNER is a generalist model for Named Entity Recognition (NER) that can identify any entity type using a bidirectional transformer encoder. Unlike traditional NER, it does not require entity type training — just provide type labels at inference time. Apache 2.0 license.',
'https://github.com/urchade/GLiNER', 'https://github.com/urchade/GLiNER',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','ner','zero-shot','transformer','generalist','entity-recognition'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gliner');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Rasa', 'rasa', 'Open-source framework for building conversational AI assistants.',
'Rasa is an open-source framework for building contextual AI assistants and chatbots. Provides NLU, dialogue management, and integration capabilities. Supports custom actions, forms, and slot filling. Self-hosted with full data control. Apache 2.0 license.',
'https://rasa.com', 'https://github.com/RasaHQ/rasa',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['nlp','chatbot','conversational-ai','nlu','dialogue','self-hosted'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rasa');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'fastText', 'fasttext', 'Library for efficient text classification and word representation by Meta.',
'fastText by Meta Research is a library for efficient text classification and word representation learning. Trains on billions of words in minutes. Supports 157 pre-trained language vectors. Used for language detection, text classification, and embeddings. MIT license.',
'https://fasttext.cc', 'https://github.com/facebookresearch/fastText',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','classification','word-embeddings','meta','fast','language-detection'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fasttext');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TextAttack', 'textattack', 'Framework for adversarial attacks, data augmentation, and model training in NLP.',
'TextAttack is a Python framework for adversarial attacks, data augmentation, and model training in NLP. Includes 16+ attack recipes, augmentation methods, and a model training module. Useful for testing model robustness. MIT license by QData Lab.',
'https://github.com/QData/TextAttack', 'https://github.com/QData/TextAttack',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['nlp','adversarial','augmentation','robustness','testing','attack'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'textattack');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SetFit', 'setfit', 'Few-shot text classification framework using Sentence Transformers.',
'SetFit enables few-shot text classification by fine-tuning Sentence Transformers with contrastive learning. Achieves high accuracy with as few as 8 labeled examples per class. No prompts or LLMs needed. By Hugging Face. Apache 2.0 license.',
'https://github.com/huggingface/setfit', 'https://github.com/huggingface/setfit',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','classification','few-shot','sentence-transformers','huggingface'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'setfit');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Argilla', 'argilla', 'Open-source data curation and annotation platform for NLP and LLM projects.',
'Argilla is an open-source data curation platform for NLP and LLM projects. Provides tools for data labeling, RLHF, and prompt evaluation. Supports text classification, NER, and question answering annotation. Integrates with Hugging Face. Apache 2.0 license.',
'https://argilla.io', 'https://github.com/argilla-io/argilla',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['nlp','annotation','labeling','rlhf','curation','huggingface'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'argilla');
