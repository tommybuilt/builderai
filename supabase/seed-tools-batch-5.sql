-- Batch 5: AI Code Assistants, AI Image/Video Editing, Data Labeling, Model Training & Fine-Tuning
-- All tools are real open-source projects. ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- AI CODE ASSISTANTS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Continue.dev', 'continue-dev', 'Open-source AI code assistant for VS Code and JetBrains connecting to any LLM.',
'Continue is the leading open-source AI code assistant. Works in VS Code and JetBrains IDEs. Connect to any LLM (local via Ollama or cloud), customize prompts, use autocomplete, and chat with your codebase. Apache 2.0 license.',
'https://continue.dev', 'https://github.com/continuedev/continue',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['code-assistant','vscode','jetbrains','autocomplete','chat','ide'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'continue-dev');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Cline', 'cline', 'Autonomous AI coding agent for VS Code that can create and edit files.',
'Cline is an autonomous AI coding agent in VS Code that can create/edit files, execute commands, use the browser, and work with any LLM (local or cloud). Asks permission before making changes. Apache 2.0 license.',
'https://github.com/cline/cline', 'https://github.com/cline/cline',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['code-assistant','vscode','autonomous','agent','file-editing'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cline');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Aider', 'aider', 'AI pair programming tool in the terminal that edits code in your local git repo.',
'Aider is a command-line AI pair programming tool that edits code directly in your local git repo. Supports GPT-4, Claude, local models, and more. Creates proper git commits. Understands full repo context through repo maps. Apache 2.0 license.',
'https://aider.chat', 'https://github.com/Aider-AI/aider',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['code-assistant','terminal','cli','git','pair-programming'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'aider');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Tabby', 'tabby', 'Self-hosted AI coding assistant with code completion and chat.',
'Tabby is a self-hosted AI coding assistant providing code completion and chat. Supports VS Code, JetBrains, and Vim. Uses StarCoder, CodeLlama, or custom models. Includes a built-in RAG engine for repository context. Apache 2.0 license.',
'https://tabby.tabbyml.com', 'https://github.com/TabbyML/tabby',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['code-assistant','self-hosted','completion','chat','rag','copilot-alternative'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tabby');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Refact.ai', 'refact-ai', 'Self-hosted AI coding assistant with code completion, chat, and toolbox.',
'Refact.ai is a self-hosted AI coding assistant with code completion, chat, and AI toolbox features. Supports multiple IDEs. Can run with local models for fully private coding assistance. BSD-3-Clause license.',
'https://refact.ai', 'https://github.com/smallcloudai/refact',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'BSD-3-Clause', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['code-assistant','self-hosted','completion','chat','private'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'refact-ai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FauxPilot', 'fauxpilot', 'Self-hosted alternative to GitHub Copilot using open-source models.',
'FauxPilot is a self-hosted alternative to GitHub Copilot. Uses SalesForce CodeGen or StarCoder models with NVIDIA Triton backend. Compatible with Copilot-enabled IDE extensions. Requires NVIDIA GPU. MIT license.',
'https://github.com/fauxpilot/fauxpilot', 'https://github.com/fauxpilot/fauxpilot',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['code-assistant','self-hosted','copilot-alternative','codegen','nvidia'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fauxpilot');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenHands', 'openhands', 'Open-source AI software developer agent formerly known as OpenDevin.',
'OpenHands (formerly OpenDevin) is an autonomous AI software development agent. Writes code, runs commands, browses the web, and interacts with APIs to complete software engineering tasks. Supports multiple LLMs. MIT license.',
'https://www.all-hands.dev', 'https://github.com/All-Hands-AI/OpenHands',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'MIT', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['code-assistant','autonomous','agent','software-dev','opendevin'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'openhands');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SWE-Agent', 'swe-agent', 'Autonomous agent by Princeton that resolves real GitHub issues.',
'SWE-Agent by Princeton NLP turns LLMs into autonomous software engineering agents that can resolve real GitHub issues. Uses a custom agent-computer interface for efficient code navigation and editing. MIT license.',
'https://swe-agent.com', 'https://github.com/princeton-nlp/SWE-agent',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'MIT', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['code-assistant','autonomous','agent','github-issues','princeton'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'swe-agent');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mentat', 'mentat', 'AI coding assistant that works with your existing codebase from the terminal.',
'Mentat is a command-line AI coding assistant that understands your codebase context. Coordinates edits across multiple files, creates new files, and runs commands. Works with GPT-4, Claude, and local models. Apache 2.0 license.',
'https://mentat.ai', 'https://github.com/AbanteAI/mentat',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['code-assistant','terminal','codebase','multi-file','cli'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mentat');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Qwen-Coder', 'qwen-coder', 'Code-specialized LLM by Alibaba for completion, reasoning, and repair.',
'Qwen-Coder by Alibaba Cloud is a code-specialized model available in 1.5B, 7B, 14B, and 32B sizes. Excels at code completion, generation, reasoning, and bug repair. Supports 92+ programming languages. Apache 2.0 license.',
'https://github.com/QwenLM/Qwen2.5-Coder', 'https://github.com/QwenLM/Qwen2.5-Coder',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['code','llm','alibaba','qwen','completion','repair','92-languages'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'qwen-coder');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Void Editor', 'void-editor', 'Open-source AI code editor forked from VS Code.',
'Void is an open-source AI code editor built as a fork of VS Code. Integrates AI directly into the editor experience with inline completions, chat, and code actions. Supports local and cloud models. MIT license.',
'https://voideditor.com', 'https://github.com/voideditor/void',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'MIT', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['code-editor','vscode-fork','ai','inline','open-source'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'void-editor');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Pear AI', 'pear-ai', 'Open-source AI code editor with integrated chat and code generation.',
'Pear AI is an open-source AI-powered code editor with integrated chat, code generation, and inline editing. Built on VS Code. Supports multiple LLM providers. Apache 2.0 license.',
'https://trypear.ai', 'https://github.com/trypear/pearai-app',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['code-editor','ai','chat','generation','vscode-based'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pear-ai');

------------------------------------------------------------
-- AI IMAGE/VIDEO EDITING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ComfyUI', 'comfyui', 'Node-based workflow UI for Stable Diffusion with advanced pipeline control.',
'ComfyUI is a powerful node-based UI for Stable Diffusion and other diffusion models. Build complex image/video generation workflows visually by connecting nodes. Supports ControlNet, LoRA, IP-Adapter, AnimateDiff, and hundreds of custom nodes. GPU required. GPL-3.0 license.',
'https://github.com/comfyanonymous/ComfyUI', 'https://github.com/comfyanonymous/ComfyUI',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'GPL-3.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['diffusion','ui','nodes','workflow','stable-diffusion','controlnet'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'comfyui');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AUTOMATIC1111 Web UI', 'automatic1111', 'Feature-rich web UI for Stable Diffusion with extensive extension ecosystem.',
'AUTOMATIC1111 Stable Diffusion Web UI is the most widely-used interface for Stable Diffusion. Features txt2img, img2img, inpainting, outpainting, scripts, and a massive extension ecosystem. Runs locally with GPU. AGPL-3.0 license.',
'https://github.com/AUTOMATIC1111/stable-diffusion-webui', 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'AGPL-3.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['diffusion','ui','stable-diffusion','extensions','inpainting','webui'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'automatic1111');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Forge (SD Web UI)', 'forge-webui', 'Optimized fork of AUTOMATIC1111 with better memory management and speed.',
'Forge is an optimized fork of AUTOMATIC1111 Stable Diffusion Web UI by lllyasviel (ControlNet author). Provides better memory management, faster generation, and SDXL/SD3/FLUX support with reduced VRAM requirements. AGPL-3.0 license.',
'https://github.com/lllyasviel/stable-diffusion-webui-forge', 'https://github.com/lllyasviel/stable-diffusion-webui-forge',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'AGPL-3.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['diffusion','ui','stable-diffusion','optimized','fork','flux'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'forge-webui');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InvokeAI', 'invokeai', 'Professional creative AI image generation tool with node-based editor.',
'InvokeAI is a professional creative tool for generating images with Stable Diffusion. Features a polished web UI with node-based editor, unified canvas, and model manager. Supports SDXL, ControlNet, and LoRA. Apache 2.0 license.',
'https://invoke.ai', 'https://github.com/invoke-ai/InvokeAI',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['diffusion','ui','professional','canvas','stable-diffusion','creative'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'invokeai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Upscayl', 'upscayl', 'Free open-source AI image upscaler for Linux, macOS, and Windows.',
'Upscayl is a free open-source AI image upscaler. Upscale low-resolution images using Real-ESRGAN and other models with a simple desktop GUI. Supports batch processing. No GPU required (uses Vulkan). AGPL-3.0 license.',
'https://upscayl.org', 'https://github.com/upscayl/upscayl',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'AGPL-3.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['upscaling','image','desktop','gui','real-esrgan','vulkan','batch'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'upscayl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Real-ESRGAN', 'real-esrgan', 'Practical image/video restoration model for general upscaling.',
'Real-ESRGAN by Tencent ARC is a practical image and video restoration model. Upscales images 2x-4x with artifact reduction. Includes face enhancement (GFPGAN). Works on anime and real-world images. Runs on GPU or CPU. BSD-3-Clause license.',
'https://github.com/xinntao/Real-ESRGAN', 'https://github.com/xinntao/Real-ESRGAN',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'BSD-3-Clause', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['upscaling','restoration','image','video','tencent','super-resolution'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'real-esrgan');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GFPGAN', 'gfpgan', 'Face restoration model by Tencent ARC for enhancing old or low-quality face photos.',
'GFPGAN by Tencent ARC is a practical face restoration algorithm using Generative Facial Prior. Restores old, damaged, or low-quality face photos with realistic detail. Often used alongside Real-ESRGAN. Apache 2.0 license.',
'https://github.com/TencentARC/GFPGAN', 'https://github.com/TencentARC/GFPGAN',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['face-restoration','enhancement','tencent','old-photos','repair'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gfpgan');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CodeFormer', 'codeformer', 'Robust face restoration using codebook lookup transformer.',
'CodeFormer is a robust face restoration model using a discrete codebook and Transformer architecture. Handles severely degraded faces better than previous methods. Supports old photo restoration and face inpainting. By NTU S-Lab.',
'https://github.com/sczhou/CodeFormer', 'https://github.com/sczhou/CodeFormer',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), NULL, 'free', 'local', 2, true, 4, true, true, true,
ARRAY['face-restoration','codebook','transformer','old-photos','robust'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'codeformer');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Rembg', 'rembg', 'AI-powered background removal tool for images.',
'Rembg removes image backgrounds automatically using AI models (U2-Net, ISNet, SAM). Simple command-line and Python API. Supports batch processing and multiple output formats. Runs on CPU. MIT license by Daniel Gatis.',
'https://github.com/danielgatis/rembg', 'https://github.com/danielgatis/rembg',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['background-removal','image','cli','python','u2net','batch'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rembg');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'IOPaint (Lama Cleaner)', 'iopaint', 'AI-powered image inpainting tool for removing objects and defects from photos.',
'IOPaint (formerly Lama Cleaner) is an AI-powered image inpainting tool. Remove unwanted objects, watermarks, or defects from photos using LaMa, Stable Diffusion, and other models. Web UI and API. Apache 2.0 license.',
'https://www.iopaint.com', 'https://github.com/Sanster/IOPaint',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['inpainting','object-removal','watermark','image-editing','webui'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'iopaint');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SwinIR', 'swinir', 'Image restoration using Swin Transformer for super-resolution and denoising.',
'SwinIR applies Swin Transformer to image restoration tasks including super-resolution, denoising, and JPEG artifact removal. State-of-the-art results across multiple benchmarks. By Jingyun Liang (ETH Zurich). Apache 2.0 license.',
'https://github.com/JingyunLiang/SwinIR', 'https://github.com/JingyunLiang/SwinIR',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['super-resolution','denoising','image-restoration','swin-transformer','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'swinir');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Inpaint Anything', 'inpaint-anything', 'Click to segment and inpaint any object using SAM and inpainting models.',
'Inpaint Anything combines Segment Anything (SAM) with various inpainting models. Click to select any object, then remove, fill, or replace it. Works with Stable Diffusion, LaMa, and other backends. Apache 2.0 license.',
'https://github.com/geekyutao/Inpaint-Anything', 'https://github.com/geekyutao/Inpaint-Anything',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['inpainting','sam','segmentation','object-removal','click'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'inpaint-anything');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InstantStyle', 'instantstyle', 'Style transfer for diffusion models without fine-tuning.',
'InstantStyle enables style transfer in diffusion model image generation without any fine-tuning. Separates content and style in CLIP feature space. Works with IP-Adapter on SDXL. By InstantX Team. Apache 2.0 license.',
'https://github.com/InstantStyle/InstantStyle', 'https://github.com/InstantStyle/InstantStyle',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['style-transfer','diffusion','ip-adapter','tuning-free','sdxl'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'instantstyle');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SwarmUI', 'swarmui', 'Modular Stable Diffusion web UI focused on power users and server deployment.',
'SwarmUI is a modular Stable Diffusion web UI focused on making powerful tools accessible. Supports ComfyUI backend, multiple models, batching, and server deployment. Built by mcmonkeyprojects. MIT license.',
'https://github.com/mcmonkeyprojects/SwarmUI', 'https://github.com/mcmonkeyprojects/SwarmUI',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'MIT', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['diffusion','ui','modular','server','stable-diffusion','comfyui-backend'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'swarmui');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DiffusionBee', 'diffusionbee', 'One-click Stable Diffusion app for macOS with Apple Silicon optimization.',
'DiffusionBee is the easiest way to run Stable Diffusion on Mac. One-click install, no dependencies. Optimized for Apple Silicon (M1/M2/M3). Supports txt2img, img2img, inpainting, and ControlNet. MIT license.',
'https://diffusionbee.com', 'https://github.com/divamgupta/diffusionbee-stable-diffusion-ui',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['diffusion','macos','apple-silicon','easy','one-click','desktop'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'diffusionbee');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Draw Things', 'draw-things', 'AI image generation app for Apple devices with on-device processing.',
'Draw Things is an AI image generation app for iPhone, iPad, and Mac. Runs Stable Diffusion, SDXL, and other models entirely on-device using CoreML and Metal. No internet required. Free on App Store. MIT license.',
'https://drawthings.ai', 'https://github.com/nicklabs/draw-things-community',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['diffusion','apple','ios','macos','on-device','coreml','metal'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'draw-things');

------------------------------------------------------------
-- DATA LABELING & ANNOTATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Label Studio', 'label-studio', 'Open-source data labeling platform for images, text, audio, and video.',
'Label Studio is a multi-type data labeling and annotation tool. Supports image, text, audio, video, and time-series labeling. Includes ML-assisted labeling, custom templates, and team collaboration. Self-hosted with Docker. Apache 2.0 license.',
'https://labelstud.io', 'https://github.com/HumanSignal/label-studio',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['labeling','annotation','image','text','audio','video','ml-assisted'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'label-studio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CVAT', 'cvat', 'Computer vision annotation tool by Intel for image and video labeling.',
'CVAT (Computer Vision Annotation Tool) by Intel is a powerful web-based tool for labeling images and videos. Supports bounding boxes, polygons, polylines, points, cuboids, and more. AI-assisted annotation with built-in models. MIT license.',
'https://www.cvat.ai', 'https://github.com/cvat-ai/cvat',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['annotation','computer-vision','image','video','intel','bounding-box','polygon'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cvat');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Labelme', 'labelme', 'Image annotation tool for polygon, rectangle, circle, and line annotations.',
'Labelme is an image annotation tool for creating polygon, rectangle, circle, line, and point annotations. Generates JSON output compatible with many ML frameworks. Simple Python-based GUI. MIT license.',
'https://github.com/labelmeai/labelme', 'https://github.com/labelmeai/labelme',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['annotation','image','polygon','rectangle','json','simple'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'labelme');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Doccano', 'doccano', 'Open-source text annotation tool for NLP tasks.',
'Doccano is an open-source text annotation tool for sequence labeling, text classification, and sequence-to-sequence tasks. Web-based with team collaboration features. Supports importing/exporting multiple formats. MIT license.',
'https://github.com/doccano/doccano', 'https://github.com/doccano/doccano',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['annotation','text','nlp','classification','ner','sequence-labeling'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'doccano');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'VGG Image Annotator', 'vgg-annotator', 'Lightweight browser-based image annotation tool by Oxford VGG group.',
'VGG Image Annotator (VIA) is a simple, lightweight browser-based tool for annotating images, audio, and video. No installation required — runs entirely in the browser. Supports regions, attributes, and export. BSD-2-Clause license.',
'https://www.robots.ox.ac.uk/~vgg/software/via/', 'https://gitlab.com/vgg/via',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'BSD-2-Clause', 'free', 'web', 1, false, NULL, true, false, true,
ARRAY['annotation','image','browser','lightweight','no-install','oxford'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vgg-annotator');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Universal Data Tool', 'universal-data-tool', 'Web-based tool for labeling images, text, audio, and documents.',
'Universal Data Tool is a web-based interface for labeling images, text, audio, documents, and video. Supports collaborative labeling, import/export, and desktop app. MIT license.',
'https://universaldatatool.com', 'https://github.com/UniversalDataTool/universal-data-tool',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'MIT', 'free', 'web', 1, false, NULL, true, true, true,
ARRAY['annotation','multi-type','web','collaborative','desktop'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'universal-data-tool');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Diffgram', 'diffgram', 'Training data platform for images, video, 3D, text, and geo data.',
'Diffgram is an open-source training data platform supporting images, video, 3D point clouds, text, and geospatial data annotation. Includes workflow automation, model-assisted labeling, and integrations. Elastic License 2.0.',
'https://diffgram.com', 'https://github.com/diffgram/diffgram',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'ELv2', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['annotation','training-data','3d','video','workflow','platform'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'diffgram');

------------------------------------------------------------
-- MODEL TRAINING & FINE-TUNING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face TRL', 'hf-trl', 'Library for training LLMs with reinforcement learning (RLHF, DPO, PPO).',
'TRL (Transformer Reinforcement Learning) by Hugging Face provides tools for training language models with RLHF, DPO, PPO, SFT, and reward modeling. Built on Transformers and PEFT. Supports DeepSpeed and FSDP. Apache 2.0 license.',
'https://huggingface.co/docs/trl', 'https://github.com/huggingface/trl',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['training','rlhf','dpo','ppo','sft','huggingface','fine-tuning'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-trl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Axolotl', 'axolotl', 'Streamlined tool for fine-tuning LLMs with YAML configuration.',
'Axolotl streamlines LLM fine-tuning with YAML-based configuration. Supports LoRA, QLoRA, full fine-tuning, RLHF, and various architectures. Handles data formatting, multi-GPU, and DeepSpeed automatically. Apache 2.0 license.',
'https://github.com/axolotl-ai-cloud/axolotl', 'https://github.com/axolotl-ai-cloud/axolotl',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['fine-tuning','lora','qlora','yaml','streamlined','multi-gpu'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'axolotl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Unsloth', 'unsloth', 'Fine-tune LLMs 2-5x faster with 80% less memory.',
'Unsloth enables 2-5x faster LLM fine-tuning with 80% less memory usage. Optimized kernels for LoRA and QLoRA training. Supports Llama, Mistral, Phi, Gemma, and more. Free tier available. Apache 2.0 license.',
'https://unsloth.ai', 'https://github.com/unslothai/unsloth',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['fine-tuning','fast','memory-efficient','lora','qlora','optimized'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'unsloth');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LLaMA-Factory', 'llama-factory', 'All-in-one framework for fine-tuning 100+ LLMs with web UI.',
'LLaMA-Factory provides an all-in-one framework for fine-tuning over 100 LLMs. Includes a web UI (LlamaBoard), supports LoRA, QLoRA, full tuning, RLHF, and DPO. Easy dataset formatting. Apache 2.0 license.',
'https://github.com/hiyouga/LLaMA-Factory', 'https://github.com/hiyouga/LLaMA-Factory',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['fine-tuning','webui','lora','qlora','rlhf','100-models','all-in-one'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-factory');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PEFT', 'peft', 'Parameter-efficient fine-tuning library by Hugging Face for LoRA, prefix tuning, and more.',
'PEFT (Parameter-Efficient Fine-Tuning) by Hugging Face provides methods for adapting large models by training only a small number of parameters. Includes LoRA, QLoRA, prefix tuning, prompt tuning, and IA3. Apache 2.0 license.',
'https://huggingface.co/docs/peft', 'https://github.com/huggingface/peft',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['fine-tuning','lora','qlora','parameter-efficient','huggingface','adapters'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'peft');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Ludwig', 'ludwig', 'Low-code framework for building custom AI models by Predibase.',
'Ludwig by Predibase is a low-code framework for building custom AI models. Define models using YAML configuration without writing code. Supports fine-tuning LLMs, tabular data, images, and more. Built on PyTorch. Apache 2.0 license.',
'https://ludwig.ai', 'https://github.com/ludwig-ai/ludwig',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['low-code','training','yaml','llm','tabular','predibase','multi-modal'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ludwig');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AutoTrain', 'autotrain', 'No-code tool by Hugging Face for training ML models automatically.',
'AutoTrain by Hugging Face enables training ML models with no code. Supports LLM fine-tuning (SFT, DPO, ORPO), text classification, image classification, object detection, and tabular tasks. CLI and web interface. Apache 2.0 license.',
'https://huggingface.co/autotrain', 'https://github.com/huggingface/autotrain-advanced',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 1, true, 8, true, true, true,
ARRAY['no-code','training','llm','classification','huggingface','automatic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'autotrain');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kohya-ss', 'kohya-ss', 'Training scripts for Stable Diffusion fine-tuning with LoRA and DreamBooth.',
'Kohya-ss provides training scripts and a GUI for fine-tuning Stable Diffusion models. Supports LoRA, DreamBooth, textual inversion, and full fine-tuning for SD 1.5, SDXL, and FLUX. The standard tool for SD model training. Apache 2.0 license.',
'https://github.com/kohya-ss/sd-scripts', 'https://github.com/kohya-ss/sd-scripts',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['fine-tuning','stable-diffusion','lora','dreambooth','sdxl','flux'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kohya-ss');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OneTrainer', 'onetrainer', 'All-in-one Stable Diffusion fine-tuning tool with intuitive GUI.',
'OneTrainer is an all-in-one solution for fine-tuning Stable Diffusion models. GUI-based with support for LoRA, DreamBooth, fine-tuning, and embedding training. Supports SD 1.5, SDXL, SD 3, FLUX, and more. AGPL-3.0 license.',
'https://github.com/Nerogar/OneTrainer', 'https://github.com/Nerogar/OneTrainer',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'AGPL-3.0', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['fine-tuning','stable-diffusion','gui','lora','dreambooth','all-in-one'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'onetrainer');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SimpleTuner', 'simpletuner', 'Generalist fine-tuning toolkit for Stable Diffusion and FLUX models.',
'SimpleTuner is a generalist fine-tuning toolkit supporting SDXL, SD 3, FLUX, and PixArt models. Handles LoRA and full fine-tuning with multi-GPU and multi-resolution support. Designed for simplicity. AGPL-3.0 license.',
'https://github.com/bghira/SimpleTuner', 'https://github.com/bghira/SimpleTuner',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'AGPL-3.0', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['fine-tuning','stable-diffusion','flux','sdxl','sd3','multi-gpu'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'simpletuner');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'EveryDream2', 'everydream2', 'Fine-tuning tool for Stable Diffusion focused on training quality.',
'EveryDream2 is a Stable Diffusion fine-tuning tool focused on high-quality results. Supports SD 1.5 and SDXL with automatic captioning, aspect ratio bucketing, and detailed training controls. MIT license.',
'https://github.com/victorchall/EveryDream2trainer', 'https://github.com/victorchall/EveryDream2trainer',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['fine-tuning','stable-diffusion','quality','captioning','aspect-ratio'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'everydream2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'finetrainers', 'finetrainers', 'Video model fine-tuning toolkit by Hugging Face Diffusers team.',
'finetrainers is a toolkit by the Hugging Face Diffusers team for fine-tuning video generation models. Supports HunyuanVideo, LTX-Video, CogVideoX, and Wan. Handles LoRA and full fine-tuning with memory optimization. Apache 2.0 license.',
'https://github.com/a-r-r-o-w/finetrainers', 'https://github.com/a-r-r-o-w/finetrainers',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['fine-tuning','video','hunyuanvideo','cogvideo','lora','diffusers'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'finetrainers');
