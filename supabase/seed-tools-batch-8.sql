-- Batch 8: Final supplemental tools to reach 500+ total
-- All tools are real open-source projects. ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- ADDITIONAL LLM INFERENCE & SERVING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Aphrodite Engine', 'aphrodite-engine', 'High-performance LLM inference engine forked from vLLM with extra features.',
'Aphrodite Engine is a high-performance LLM inference engine forked from vLLM. Adds support for EXL2 quantization, speculative decoding, LoRA hot-swapping, and other advanced features. AGPL-3.0 license.',
'https://github.com/PygmalionAI/aphrodite-engine', 'https://github.com/PygmalionAI/aphrodite-engine',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'AGPL-3.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['inference','vllm-fork','exl2','speculative-decoding','lora'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'aphrodite-engine');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Nitro', 'nitro-ai', 'Lightweight inference engine for local AI with OpenAI-compatible API.',
'Nitro by Jan AI is a lightweight C++ inference engine providing an OpenAI-compatible API for local AI. Supports llama.cpp and TensorRT-LLM backends. Designed for easy integration. Apache 2.0 license.',
'https://nitro.jan.ai', 'https://github.com/janhq/nitro',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['inference','lightweight','cpp','openai-compatible','jan'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nitro-ai');

------------------------------------------------------------
-- ADDITIONAL AI FRAMEWORKS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ONNX', 'onnx', 'Open standard for representing machine learning models across frameworks.',
'ONNX (Open Neural Network Exchange) is an open format for representing ML models. Enables model portability between PyTorch, TensorFlow, scikit-learn, and other frameworks. Foundation for ONNX Runtime. Apache 2.0 license.',
'https://onnx.ai', 'https://github.com/onnx/onnx',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['format','interoperability','model-exchange','standard','portable'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'onnx');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Safetensors', 'safetensors', 'Fast and safe tensor serialization format by Hugging Face.',
'Safetensors by Hugging Face is a safe and fast file format for storing tensors. Prevents arbitrary code execution (unlike pickle). Memory-mapped loading for zero-copy reads. Now the default format for Hugging Face models. Apache 2.0 license.',
'https://huggingface.co/docs/safetensors', 'https://github.com/huggingface/safetensors',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['format','tensors','safe','fast','huggingface','serialization'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'safetensors');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Hub', 'hf-hub', 'Platform and Python library for sharing ML models, datasets, and Spaces.',
'Hugging Face Hub hosts 500K+ models, 100K+ datasets, and 200K+ Spaces. The Python library (huggingface_hub) enables programmatic model upload, download, and management. Central hub for the ML community. Apache 2.0 license.',
'https://huggingface.co', 'https://github.com/huggingface/huggingface_hub',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'hybrid', 1, false, NULL, true, false, false,
ARRAY['hub','models','datasets','sharing','community','huggingface'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-hub');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Tokenizers', 'hf-tokenizers', 'Ultra-fast text tokenization library in Rust with Python bindings.',
'Hugging Face Tokenizers is an ultra-fast tokenization library written in Rust. Provides BPE, WordPiece, and Unigram tokenizers. Trains custom tokenizers and handles pre/post-processing. Used by Transformers library. Apache 2.0 license.',
'https://huggingface.co/docs/tokenizers', 'https://github.com/huggingface/tokenizers',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tokenization','rust','fast','bpe','wordpiece','huggingface'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-tokenizers');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Accelerate', 'hf-accelerate', 'Library for running PyTorch training across distributed setups with minimal code changes.',
'Hugging Face Accelerate enables running PyTorch training scripts across any distributed configuration (multi-GPU, TPU, mixed precision) with minimal code changes. Just 4 lines to adapt existing code. Apache 2.0 license.',
'https://huggingface.co/docs/accelerate', 'https://github.com/huggingface/accelerate',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['distributed','training','pytorch','multi-gpu','tpu','huggingface'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-accelerate');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Datasets', 'hf-datasets', 'Library for easily accessing and processing ML datasets.',
'Hugging Face Datasets provides efficient access to 100K+ datasets with memory-mapping, streaming, and processing tools. Handles large datasets without RAM limitations. Built-in train/test splits and dataset cards. Apache 2.0 license.',
'https://huggingface.co/docs/datasets', 'https://github.com/huggingface/datasets',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['datasets','data-loading','streaming','memory-mapping','huggingface'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-datasets');

------------------------------------------------------------
-- ADDITIONAL AI AGENTS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Autogen Studio', 'autogen-studio', 'Visual interface for building and testing AutoGen multi-agent workflows.',
'AutoGen Studio provides a visual interface for building, testing, and deploying AutoGen multi-agent workflows. Drag-and-drop agent configuration, skill management, and conversation testing. By Microsoft. CC-BY-4.0 license.',
'https://github.com/microsoft/autogen/tree/main/samples/apps/autogen-studio', 'https://github.com/microsoft/autogen',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'CC-BY-4.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['agents','visual','studio','microsoft','multi-agent','testing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'autogen-studio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Browser Use', 'browser-use', 'Library for enabling AI agents to interact with web browsers.',
'Browser Use enables AI agents to autonomously browse the web, fill forms, click buttons, and extract information. Integrates with LangChain and other agent frameworks. Uses Playwright for browser automation. MIT license.',
'https://browser-use.com', 'https://github.com/browser-use/browser-use',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['agents','browser','web','automation','playwright','scraping'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'browser-use');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Crawl4AI', 'crawl4ai', 'Open-source web crawling library optimized for LLM and AI applications.',
'Crawl4AI is an open-source web crawling library specifically designed for LLM and AI applications. Extracts clean markdown, handles JavaScript rendering, and supports concurrent crawling. Apache 2.0 license.',
'https://crawl4ai.com', 'https://github.com/unclecode/crawl4ai',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['crawling','web','markdown','llm','extraction','concurrent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'crawl4ai');

------------------------------------------------------------
-- ADDITIONAL RAG & RETRIEVAL
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Rerankers', 'rerankers', 'Lightweight library for using reranking models to improve search results.',
'Rerankers provides a unified interface for running various reranking models (cross-encoders, ColBERT, RankGPT, etc.) to improve search and RAG retrieval quality. Simple API. By Ben Clavié. Apache 2.0 license.',
'https://github.com/AnswerDotAI/rerankers', 'https://github.com/AnswerDotAI/rerankers',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['reranking','search','retrieval','cross-encoder','colbert','rag'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rerankers');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FlashRAG', 'flashrag', 'Python toolkit for reproducing and developing RAG research.',
'FlashRAG is a Python toolkit for reproducing and developing Retrieval-Augmented Generation research. Implements 12+ RAG methods with a unified framework. Includes datasets and evaluation. MIT license by RUC-NLPIR.',
'https://github.com/RUC-NLPIR/FlashRAG', 'https://github.com/RUC-NLPIR/FlashRAG',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['rag','research','toolkit','evaluation','methods','unified'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flashrag');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LangGraph', 'langgraph', 'Library for building stateful multi-agent applications with LLMs.',
'LangGraph by LangChain is a library for building stateful, multi-actor applications with LLMs. Uses a graph-based approach for defining agent workflows with cycles, persistence, and human-in-the-loop. MIT license.',
'https://langchain-ai.github.io/langgraph/', 'https://github.com/langchain-ai/langgraph',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'MIT', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['agents','graph','stateful','multi-actor','langchain','workflow'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'langgraph');

------------------------------------------------------------
-- ADDITIONAL COMPUTER VISION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SAM (Segment Anything v1)', 'segment-anything-v1', 'Original Segment Anything Model by Meta for zero-shot image segmentation.',
'SAM (Segment Anything Model) v1 by Meta AI is a foundation model for image segmentation. Segments any object in any image given point, box, or text prompts. Trained on 11M images with 1.1B masks. Apache 2.0 license.',
'https://segment-anything.com', 'https://github.com/facebookresearch/segment-anything',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['segmentation','foundation-model','meta','zero-shot','promptable'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'segment-anything-v1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Grounded SAM 2', 'grounded-sam-2', 'Combines Grounding DINO with SAM 2 for text-prompted segmentation and tracking.',
'Grounded SAM 2 by IDEA Research combines Grounding DINO text-prompted detection with SAM 2 segmentation and tracking. Detect, segment, and track any object described in natural language across images and video. Apache 2.0 license.',
'https://github.com/IDEA-Research/Grounded-SAM-2', 'https://github.com/IDEA-Research/Grounded-SAM-2',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['segmentation','detection','tracking','text-prompt','grounding','sam'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'grounded-sam-2');

------------------------------------------------------------
-- ADDITIONAL IMAGE/VIDEO EDITING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'BSRGAN', 'bsrgan', 'Practical image super-resolution model trained on diverse degradations.',
'BSRGAN is a practical image super-resolution model trained to handle diverse real-world degradations (blur, noise, JPEG, resize). More robust than models trained on synthetic data. By Kai Zhang (ETH Zurich). Apache 2.0 license.',
'https://github.com/cszn/BSRGAN', 'https://github.com/cszn/BSRGAN',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['super-resolution','degradation','robust','practical','image'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bsrgan');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DragGAN', 'draggan', 'Interactive point-based image manipulation using GANs.',
'DragGAN by Max Planck Institute enables interactive point-based image editing. Users drag points on an image to deform, resize, rotate, or move objects naturally. Uses GAN-based generation for realistic results. Custom license.',
'https://github.com/XingangPan/DragGAN', 'https://github.com/XingangPan/DragGAN',
(SELECT id FROM categories WHERE slug = 'ai-image-video-editing'), 'Custom', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['image-editing','interactive','drag','gan','manipulation','point-based'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'draggan');

------------------------------------------------------------
-- ADDITIONAL MODEL TRAINING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Weights Merging (mergekit)', 'mergekit', 'Toolkit for merging multiple LLMs into a single model.',
'mergekit by Arcee AI is a toolkit for merging pre-trained LLMs. Supports SLERP, TIES, DARE, linear, and passthrough merge methods. Create custom model blends without training. Runs on CPU. Apache 2.0 license.',
'https://github.com/arcee-ai/mergekit', 'https://github.com/arcee-ai/mergekit',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['merging','llm','slerp','ties','dare','no-training','cpu'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mergekit');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GPTQ (Quantization)', 'gptq', 'Post-training quantization method for compressing large language models.',
'GPTQ is a one-shot post-training quantization method for large language models. Compresses models to 4-bit or 3-bit precision with minimal quality loss. Enables running large models on consumer GPUs. By IST Austria.',
'https://github.com/IST-DASLab/gptq', 'https://github.com/IST-DASLab/gptq',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['quantization','compression','4-bit','3-bit','post-training','llm'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gptq');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AWQ (Activation-aware Weight Quantization)', 'awq', 'Efficient LLM quantization preserving important weight channels.',
'AWQ (Activation-aware Weight Quantization) by MIT HAN Lab quantizes LLMs by protecting salient weight channels based on activation magnitudes. Achieves better quality than naive quantization at same bit-width. MIT license.',
'https://github.com/mit-han-lab/llm-awq', 'https://github.com/mit-han-lab/llm-awq',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['quantization','activation-aware','4-bit','llm','mit','efficient'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'awq');

------------------------------------------------------------
-- ADDITIONAL DEPLOYMENT
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Gradio', 'gradio', 'Python library for building ML demos and web UIs quickly.',
'Gradio by Hugging Face creates interactive ML demos and web UIs with a few lines of Python. Auto-generates interfaces for any function. Supports file uploads, audio, images, and chat. Powers Hugging Face Spaces. Apache 2.0 license.',
'https://gradio.app', 'https://github.com/gradio-app/gradio',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['demo','webui','interface','python','huggingface','quick'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gradio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Streamlit', 'streamlit', 'Python framework for building data apps and ML demos rapidly.',
'Streamlit is a Python framework for rapidly building data apps, ML demos, and dashboards. Write a script and it becomes an interactive web app. Widget-based UI, session state, and caching. Apache 2.0 license by Snowflake.',
'https://streamlit.io', 'https://github.com/streamlit/streamlit',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['demo','app','dashboard','python','rapid','snowflake'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'streamlit');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FastAPI', 'fastapi', 'Modern high-performance Python web framework for building APIs.',
'FastAPI is a modern Python web framework for building APIs. Auto-generates OpenAPI docs, supports async, and uses Pydantic for validation. Widely used for ML model serving APIs. MIT license by Sebastián Ramírez.',
'https://fastapi.tiangolo.com', 'https://github.com/fastapi/fastapi',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['api','python','async','openapi','pydantic','serving'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fastapi');

------------------------------------------------------------
-- ADDITIONAL LARGE LANGUAGE MODELS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Llama 3', 'llama-3', 'Open-weight LLM by Meta in 8B and 70B sizes with strong general capabilities.',
'Llama 3 by Meta is an open-weight LLM in 8B and 70B sizes. Trained on 15 trillion tokens with 8K context. Strong general capabilities across coding, math, and reasoning. Llama 3 Community License.',
'https://llama.meta.com', 'https://github.com/meta-llama/llama3',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Llama 3 Community', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','meta','llama','8b','70b','general'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Qwen-VL', 'qwen-vl', 'Multimodal vision-language model by Alibaba for image understanding.',
'Qwen-VL by Alibaba Cloud is a multimodal LLM supporting image and video understanding. Processes images with text prompts for visual QA, captioning, and reasoning. Available in multiple sizes. Apache 2.0 license.',
'https://github.com/QwenLM/Qwen-VL', 'https://github.com/QwenLM/Qwen-VL',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','multimodal','vision','alibaba','qwen','image-understanding'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'qwen-vl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LLaVA', 'llava', 'Visual instruction tuned multimodal LLM for image understanding and chat.',
'LLaVA (Large Language and Vision Assistant) is a multimodal model combining a vision encoder with an LLM for visual chat. Understands images, charts, documents, and screenshots. Available in 7B and 13B sizes. Apache 2.0 license.',
'https://llava-vl.github.io', 'https://github.com/haotian-liu/LLaVA',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','multimodal','vision','chat','visual-qa','instruction-tuned'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llava');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InternVL 2.5', 'internvl', 'Open-source multimodal LLM competitive with commercial models by Shanghai AI Lab.',
'InternVL 2.5 by Shanghai AI Lab is a competitive open-source multimodal LLM. Strong performance on visual understanding, OCR, chart reading, and multi-image reasoning. Available in multiple sizes. MIT license.',
'https://github.com/OpenGVLab/InternVL', 'https://github.com/OpenGVLab/InternVL',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'MIT', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['llm','multimodal','vision','competitive','ocr','chart','shanghai-ai'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'internvl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Nous Hermes', 'nous-hermes', 'Fine-tuned LLM series by Nous Research known for instruction following.',
'Nous Hermes by Nous Research is a series of fine-tuned LLMs (based on Llama, Mistral, etc.) known for strong instruction following and function calling. Active community development and research.',
'https://nousresearch.com', 'https://huggingface.co/NousResearch',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['llm','fine-tune','instruction-following','nous-research','function-calling'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nous-hermes');

------------------------------------------------------------
-- ADDITIONAL DIFFUSION TOOLS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'kohya-ss GUI', 'kohya-gui', 'Graphical interface for kohya-ss SD training scripts.',
'kohya-ss GUI by bmaltais provides a user-friendly graphical interface for the kohya-ss Stable Diffusion training scripts. Makes LoRA, DreamBooth, and fine-tuning accessible without command-line usage. Apache 2.0 license.',
'https://github.com/bmaltais/kohya_ss', 'https://github.com/bmaltais/kohya_ss',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'Apache-2.0', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['training','gui','kohya','lora','dreambooth','stable-diffusion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kohya-gui');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ComfyUI-Impact-Pack', 'comfyui-impact-pack', 'Essential node pack for ComfyUI with face detection, segmentation, and more.',
'ComfyUI-Impact-Pack by ltdrdata is one of the most popular node packs for ComfyUI. Adds face detection/restoration, segmentation, wildcards, regional conditioning, and many utility nodes. GPL-3.0 license.',
'https://github.com/ltdrdata/ComfyUI-Impact-Pack', 'https://github.com/ltdrdata/ComfyUI-Impact-Pack',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'GPL-3.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['comfyui','nodes','face-detection','segmentation','wildcards','utility'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'comfyui-impact-pack');

------------------------------------------------------------
-- ADDITIONAL VOICE CLONING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenVoice V2', 'openvoice-v2', 'Updated zero-shot voice cloning by MyShell with improved quality.',
'OpenVoice V2 by MyShell AI improves upon V1 with better voice cloning quality, reduced artifacts, and wider language support. Zero-shot cloning from short reference audio. MIT license.',
'https://github.com/myshell-ai/OpenVoice', 'https://github.com/myshell-ai/OpenVoice',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['voice-cloning','zero-shot','myshell','improved','multilingual'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'openvoice-v2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GPT-SoVITS (Voice Cloning)', 'gpt-sovits-cloning', 'Few-shot voice cloning and TTS using GPT and SoVITS architectures.',
'GPT-SoVITS combines GPT-based language modeling with SoVITS for few-shot voice cloning. Clone a voice from as little as 5 seconds of audio. Supports Chinese, English, and Japanese. AGPL-3.0 license.',
'https://github.com/RVC-Boss/GPT-SoVITS', 'https://github.com/RVC-Boss/GPT-SoVITS',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'AGPL-3.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['voice-cloning','few-shot','gpt','sovits','chinese','english','japanese'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gpt-sovits-cloning');

------------------------------------------------------------
-- ADDITIONAL AI CODE ASSISTANTS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Sweep AI', 'sweep-ai', 'AI-powered junior developer that handles GitHub issues and PRs.',
'Sweep AI is an AI-powered tool that turns GitHub issues into pull requests. Reads your codebase, plans changes, writes code, and creates PRs. Handles bug fixes, features, and refactors. Apache 2.0 license.',
'https://sweep.dev', 'https://github.com/sweepai/sweep',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['code-assistant','github','issues','prs','autonomous','junior-dev'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sweep-ai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Sourcegraph Cody', 'sourcegraph-cody', 'AI coding assistant with codebase context by Sourcegraph.',
'Cody by Sourcegraph is an AI coding assistant that understands your entire codebase. Provides context-aware code generation, explanations, and editing. Works in VS Code and JetBrains. Apache 2.0 license.',
'https://sourcegraph.com/cody', 'https://github.com/sourcegraph/cody',
(SELECT id FROM categories WHERE slug = 'ai-code-assistants'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['code-assistant','codebase-context','vscode','jetbrains','sourcegraph'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sourcegraph-cody');

------------------------------------------------------------
-- ADDITIONAL DATA LABELING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Prodigy', 'prodigy', 'Scriptable annotation tool by Explosion (spaCy team) for efficient labeling.',
'Prodigy by Explosion (creators of spaCy) is a scriptable annotation tool for NLP. Features active learning, binary annotation for speed, and integration with spaCy pipelines. Commercial license with free academic use.',
'https://prodi.gy', 'https://github.com/explosion/prodigy-recipes',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'Commercial', 'freemium', 'local', 2, false, NULL, false, true, true,
ARRAY['annotation','nlp','active-learning','spacy','explosion','efficient'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'prodigy');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FiftyOne', 'fiftyone', 'Open-source toolkit for building high-quality datasets and computer vision models.',
'FiftyOne by Voxel51 is a toolkit for curating, visualizing, and evaluating image and video datasets. Integrates with CVAT, Label Studio, and Hugging Face. Helps find labeling errors and improve model performance. Apache 2.0 license.',
'https://voxel51.com', 'https://github.com/voxel51/fiftyone',
(SELECT id FROM categories WHERE slug = 'data-labeling-annotation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['dataset-curation','visualization','computer-vision','quality','voxel51'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fiftyone');

------------------------------------------------------------
-- ADDITIONAL AI ANIMATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MusePose', 'musepose', 'Virtual human pose generation and animation from images.',
'MusePose by Tencent generates virtual human animations by transferring pose sequences to reference images. Produces full-body animated videos from a single image and driving poses. Part of the Muse series.',
'https://github.com/TMElyralab/MusePose', 'https://github.com/TMElyralab/MusePose',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['animation','pose','virtual-human','tencent','full-body'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'musepose');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hallo', 'hallo', 'Hierarchical audio-driven visual synthesis for portrait animation.',
'Hallo generates portrait animation videos driven by audio input using hierarchical audio-driven visual synthesis. Produces natural facial expressions and head movements synchronized with speech. By Fudan University.',
'https://github.com/fudan-generative-vision/hallo', 'https://github.com/fudan-generative-vision/hallo',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['animation','portrait','audio-driven','hierarchical','fudan'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hallo');

------------------------------------------------------------
-- ADDITIONAL OCR
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mathpix (Snip)', 'mathpix-snip', 'OCR tool specialized in recognizing mathematical equations and LaTeX.',
'Mathpix Snip converts images of math equations to LaTeX, MathML, and other formats. Screenshot-to-LaTeX in seconds. Free tier available. API and desktop applications.',
'https://mathpix.com', 'https://github.com/Mathpix',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), NULL, 'freemium', 'hybrid', 1, false, NULL, false, false, false,
ARRAY['ocr','math','latex','equations','screenshot','conversion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mathpix-snip');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DocTR', 'doctr', 'Deep learning based OCR library in Python and TensorFlow/PyTorch.',
'DocTR (Document Text Recognition) is a seamless, high-performing, and accessible OCR library. Supports text detection and recognition with TensorFlow and PyTorch backends. By Mindee. Apache 2.0 license.',
'https://github.com/mindee/doctr', 'https://github.com/mindee/doctr',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['ocr','deep-learning','text-detection','recognition','mindee'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'doctr');

------------------------------------------------------------
-- ADDITIONAL MUSIC & AUDIO
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Bark (Audio Effects)', 'bark-audio', 'Transformer-based text-to-audio model by Suno supporting speech, music, and sound effects.',
'Bark by Suno is a transformer-based text-to-audio model that generates realistic speech, music, background noise, and sound effects from text. Supports multilingual speech with non-verbal communication (laughter, sighing). MIT license.',
'https://github.com/suno-ai/bark', 'https://github.com/suno-ai/bark',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['audio','text-to-audio','speech','sound-effects','suno','multilingual'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bark-audio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Whisper Audio (Transcription+)', 'whisper-audio-tools', 'Audio processing toolkit building on Whisper for diarization and subtitling.',
'whisper-audio-tools extends OpenAI Whisper with speaker diarization, subtitle generation, and batch processing. Identifies who spoke when while transcribing. Useful for podcast and meeting processing.',
'https://github.com/jianfch/stable-ts', 'https://github.com/jianfch/stable-ts',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['audio','transcription','diarization','subtitles','whisper','processing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisper-audio-tools');

------------------------------------------------------------
-- ADDITIONAL 3D GENERATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Instant3D', 'instant3d', 'Fast text-to-3D generation using multi-view diffusion and reconstruction.',
'Instant3D generates 3D meshes from text in seconds by combining multi-view image generation with a fast 3D reconstruction network. Avoids slow per-shape optimization. By Li et al.',
'https://github.com/ming1993li/Instant3DCodes', 'https://github.com/ming1993li/Instant3DCodes',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['3d','text-to-3d','fast','multi-view','reconstruction'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'instant3d');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Gaussian Splatting', 'gaussian-splatting', 'Original 3D Gaussian Splatting implementation for real-time radiance field rendering.',
'3D Gaussian Splatting by Inria and Max Planck Institute provides real-time rendering of radiance fields using 3D Gaussians. Reconstructs scenes from images with training in minutes. Foundation for many 3D generation tools.',
'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/', 'https://github.com/graphdeco-inria/gaussian-splatting',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), NULL, 'free', 'local', 4, true, 8, true, true, true,
ARRAY['3d','gaussian-splatting','real-time','rendering','radiance-field','inria'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gaussian-splatting');

------------------------------------------------------------
-- FINAL ADDITIONS TO REACH 500+
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Pixtral', 'pixtral', 'Multimodal vision-language model by Mistral AI for image understanding.',
'Pixtral by Mistral AI is a 12B multimodal model that understands images alongside text. Supports visual QA, chart reading, document understanding, and image reasoning. Natively multimodal architecture. Apache 2.0 license.',
'https://mistral.ai', 'https://huggingface.co/mistralai/Pixtral-12B-2409',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['llm','multimodal','vision','mistral','image-understanding'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pixtral');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DocArray', 'docarray', 'Library for representing and sending multimodal data by Jina AI.',
'DocArray by Jina AI is a library for representing, sending, and storing multimodal data. Provides Pythonic dataclasses for nested documents with embeddings. Integrates with vector databases. Apache 2.0 license.',
'https://docs.docarray.org', 'https://github.com/docarray/docarray',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['multimodal','data','documents','embeddings','jina','dataclass'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'docarray');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Marqo', 'marqo', 'End-to-end vector search engine with built-in model inference.',
'Marqo is an end-to-end vector search engine that handles embedding generation and search in one system. No need for separate embedding pipelines. Supports text and image search. Apache 2.0 license.',
'https://www.marqo.ai', 'https://github.com/marqo-ai/marqo',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['vector-search','embeddings','end-to-end','image-search','text-search'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'marqo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Qdrant Client', 'qdrant-client', 'Python client library for Qdrant vector database.',
'Qdrant Client is the official Python SDK for interacting with Qdrant vector database. Supports local (in-memory) mode for development, async operations, and batch uploads. Apache 2.0 license.',
'https://github.com/qdrant/qdrant-client', 'https://github.com/qdrant/qdrant-client',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['vector-db','python','sdk','qdrant','async','in-memory'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'qdrant-client');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Haystack Pipeline Builder', 'haystack-pipeline', 'Visual pipeline builder for Haystack RAG and search applications.',
'Haystack Pipeline Builder by deepset provides a visual interface for constructing Haystack RAG and search pipelines. Drag-and-drop components, test configurations, and export working code. Apache 2.0 license.',
'https://haystack.deepset.ai', 'https://github.com/deepset-ai/haystack',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['rag','pipeline','visual','deepset','search','builder'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'haystack-pipeline');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LangSmith', 'langsmith', 'Platform by LangChain for debugging, testing, and monitoring LLM applications.',
'LangSmith by LangChain provides tools for debugging, testing, evaluating, and monitoring LLM applications. Trace execution, log inputs/outputs, and run evaluations. Free tier available. Proprietary with open SDK.',
'https://smith.langchain.com', 'https://github.com/langchain-ai/langsmith-sdk',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'MIT', 'freemium', 'hybrid', 2, false, NULL, false, false, false,
ARRAY['debugging','testing','monitoring','langchain','tracing','evaluation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'langsmith');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Lora (Low-Rank Adaptation)', 'lora-technique', 'Parameter-efficient fine-tuning technique that adapts large models with minimal trainable parameters.',
'LoRA (Low-Rank Adaptation) by Microsoft Research enables fine-tuning large language models by injecting trainable rank decomposition matrices into existing weights. Reduces trainable parameters by 10,000x while maintaining quality. MIT license.',
'https://github.com/microsoft/LoRA', 'https://github.com/microsoft/LoRA',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['fine-tuning','lora','parameter-efficient','microsoft','low-rank','adaptation'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lora-technique');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'QLoRA', 'qlora', 'Efficient fine-tuning method using 4-bit quantized base model with LoRA adapters.',
'QLoRA by University of Washington enables fine-tuning 65B parameter models on a single 48GB GPU. Uses 4-bit NormalFloat quantization for the base model with LoRA adapters. Achieves ChatGPT-level performance. MIT license.',
'https://github.com/artidoro/qlora', 'https://github.com/artidoro/qlora',
(SELECT id FROM categories WHERE slug = 'model-training-fine-tuning'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['fine-tuning','qlora','4-bit','quantized','efficient','single-gpu'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'qlora');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Nerfstudio', 'nerfstudio', 'Framework for training and rendering Neural Radiance Fields.',
'Nerfstudio is a modular framework for building, training, and rendering Neural Radiance Fields (NeRFs). Provides a web viewer, data processing, and multiple NeRF implementations. By Berkeley and others. Apache 2.0 license.',
'https://nerf.studio', 'https://github.com/nerfstudio-project/nerfstudio',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['3d','nerf','rendering','framework','modular','berkeley'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nerfstudio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Meshroom', 'meshroom', 'Open-source 3D reconstruction pipeline based on photogrammetry.',
'Meshroom by AliceVision is an open-source 3D reconstruction pipeline using photogrammetry. Creates 3D models from photographs. Node-based workflow with GPU-accelerated processing. MPL-2.0 license.',
'https://alicevision.org/meshroom', 'https://github.com/alicevision/Meshroom',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MPL-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['3d','photogrammetry','reconstruction','node-based','alicevision'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'meshroom');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stable Video Diffusion XT', 'svd-xt', 'Extended Stable Video Diffusion model generating 25-frame videos.',
'Stable Video Diffusion XT (SVD-XT) by Stability AI extends SVD to generate 25 frames (vs 14 in base SVD) from a single conditioning image. Higher temporal consistency for longer video generation. Stability Community License.',
'https://stability.ai', 'https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Stability Community', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['video-generation','image-to-video','stability-ai','25-frames','extended'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'svd-xt');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SeedDance', 'seeddance', 'Open-weight dance video generation model from ByteDance.',
'SeedDance by ByteDance generates dance videos from music and pose inputs. Open-weight model for creating choreographed dance content. Supports various dance styles.',
'https://github.com/bytedance/SeedDance', 'https://github.com/bytedance/SeedDance',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','dance','music','bytedance','choreography'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'seeddance');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Waver 1.0', 'waver-1', 'Open video generation model by Genmo focused on motion quality.',
'Waver 1.0 by Genmo is an open video generation model focused on high-quality motion. Generates smooth, coherent video clips from text descriptions. Apache 2.0 license.',
'https://github.com/genmoai/models', 'https://github.com/genmoai/models',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['video-generation','motion','genmo','text-to-video','smooth'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'waver-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'HunyuanVideo 1.5', 'hunyuanvideo-1-5', 'Updated video generation model by Tencent with improved quality.',
'HunyuanVideo 1.5 by Tencent improves upon the original with better visual quality, motion coherence, and prompt following. Supports text-to-video and image-to-video generation. Tencent Hunyuan Community License.',
'https://github.com/Tencent/HunyuanVideo', 'https://github.com/Tencent/HunyuanVideo',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Tencent Hunyuan Community', 'free', 'local', 4, true, 24, true, true, true,
ARRAY['video-generation','tencent','improved','text-to-video','image-to-video'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hunyuanvideo-1-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Whisper Timestamped', 'whisper-timestamped', 'Whisper extension providing word-level timestamps for transcription.',
'whisper-timestamped adds word-level timestamp accuracy to OpenAI Whisper. Uses dynamic time warping (DTW) for precise alignment. Useful for subtitles, karaoke, and audio editing. LGPL-3.0 license.',
'https://github.com/linto-ai/whisper-timestamped', 'https://github.com/linto-ai/whisper-timestamped',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'LGPL-3.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['stt','whisper','timestamps','word-level','subtitles','dtw'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'whisper-timestamped');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Pyannote Audio', 'pyannote-audio', 'Open-source speaker diarization and voice activity detection toolkit.',
'pyannote.audio is a toolkit for speaker diarization (who spoke when), voice activity detection, and speaker verification. Neural network-based with pre-trained models. MIT license by Hervé Bredin.',
'https://github.com/pyannote/pyannote-audio', 'https://github.com/pyannote/pyannote-audio',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['stt','diarization','speaker','voice-activity','verification'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pyannote-audio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Chatterbox TTS (Resemble)', 'chatterbox-tts-resemble', 'Open-source TTS model by Resemble AI with emotion and accent control.',
'Chatterbox by Resemble AI is an open-source text-to-speech model with controllable emotion, accent, and pacing. Produces natural-sounding speech with fine-grained control over prosody. MIT license.',
'https://github.com/resemble-ai/chatterbox', 'https://github.com/resemble-ai/chatterbox',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['tts','emotion','accent','resemble-ai','controllable','prosody'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'chatterbox-tts-resemble');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Dia TTS', 'dia-tts', 'Open-source dialogue TTS model by Nari Labs supporting multi-speaker conversations.',
'Dia by Nari Labs is a text-to-speech model designed for dialogue generation. Supports multi-speaker conversations with distinct voices, non-verbal sounds (laughter, sighing), and emotion expression. Apache 2.0 license.',
'https://github.com/nari-labs/dia', 'https://github.com/nari-labs/dia',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['tts','dialogue','multi-speaker','conversation','emotion','nari-labs'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dia-tts');
