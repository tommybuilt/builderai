-- Batch 4: AI Frameworks, AI Agents & Orchestration, Vector Databases, RAG & Document Retrieval
-- All tools are real open-source projects. ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- AI FRAMEWORKS & LIBRARIES
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PyTorch', 'pytorch', 'Open-source machine learning framework by Meta with dynamic computation graphs.',
'PyTorch by Meta AI is the most popular deep learning framework. Features dynamic computation graphs, eager execution, and a rich ecosystem. Used for research and production. Supports GPU/CPU training and inference. BSD-3-Clause license.',
'https://pytorch.org', 'https://github.com/pytorch/pytorch',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'BSD-3-Clause', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['framework','deep-learning','meta','dynamic-graph','research','production'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pytorch');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TensorFlow', 'tensorflow', 'End-to-end open-source ML platform by Google for training and deployment.',
'TensorFlow by Google is an end-to-end open-source platform for machine learning. Supports training and deployment across servers, edge, mobile, and browser (TF.js). Includes TF Lite for mobile and TF Serving for production. Apache 2.0 license.',
'https://www.tensorflow.org', 'https://github.com/tensorflow/tensorflow',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['framework','deep-learning','google','production','mobile','browser'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tensorflow');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'JAX', 'jax', 'High-performance numerical computing library by Google with auto-differentiation.',
'JAX by Google Research combines NumPy with automatic differentiation and XLA compilation for high-performance ML research. Supports GPU/TPU acceleration, vmap, pmap for parallelism, and JIT compilation. Apache 2.0 license.',
'https://github.com/jax-ml/jax', 'https://github.com/jax-ml/jax',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['framework','numerical','google','autodiff','xla','tpu','jit'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'jax');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Keras', 'keras', 'High-level deep learning API supporting JAX, TensorFlow, and PyTorch backends.',
'Keras is a high-level deep learning API that runs on top of JAX, TensorFlow, or PyTorch. Provides simple, consistent interfaces for building and training models. Keras 3 is multi-backend. Created by Francois Chollet. Apache 2.0 license.',
'https://keras.io', 'https://github.com/keras-team/keras',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['framework','deep-learning','high-level','multi-backend','easy'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'keras');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Hugging Face Diffusers', 'hf-diffusers', 'Library for state-of-the-art diffusion models for image, audio, and 3D generation.',
'Diffusers by Hugging Face provides pre-trained diffusion pipelines for image generation (Stable Diffusion, FLUX, Kandinsky), audio, video, and 3D. Modular design with schedulers, pipelines, and models. Apache 2.0 license.',
'https://huggingface.co/docs/diffusers', 'https://github.com/huggingface/diffusers',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['diffusion','image-generation','huggingface','stable-diffusion','flux','pipelines'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hf-diffusers');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'scikit-learn', 'scikit-learn', 'Essential machine learning library for Python with classical ML algorithms.',
'scikit-learn is the essential Python library for classical machine learning. Provides classification, regression, clustering, dimensionality reduction, and preprocessing tools. Built on NumPy and SciPy. Runs on CPU. BSD-3-Clause license.',
'https://scikit-learn.org', 'https://github.com/scikit-learn/scikit-learn',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'BSD-3-Clause', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['machine-learning','classical-ml','classification','clustering','python'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'scikit-learn');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'XGBoost', 'xgboost', 'Optimized gradient boosting library for structured/tabular data.',
'XGBoost is an optimized gradient boosting library designed for speed and performance on structured/tabular data. Supports distributed training, GPU acceleration, and handles missing values natively. Dominant in ML competitions. Apache 2.0 license.',
'https://xgboost.readthedocs.io', 'https://github.com/dmlc/xgboost',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['gradient-boosting','tabular','structured-data','fast','competitions'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'xgboost');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LightGBM', 'lightgbm', 'Fast gradient boosting framework by Microsoft using histogram-based algorithms.',
'LightGBM by Microsoft is a fast gradient boosting framework using histogram-based decision tree learning. Handles large datasets efficiently with low memory. Supports categorical features natively. MIT license.',
'https://lightgbm.readthedocs.io', 'https://github.com/microsoft/LightGBM',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['gradient-boosting','fast','microsoft','tabular','histogram'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lightgbm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ONNX Runtime', 'onnx-runtime', 'Cross-platform inference engine for ONNX models by Microsoft.',
'ONNX Runtime by Microsoft is a cross-platform inference engine for models in the Open Neural Network Exchange format. Supports CPU, GPU (CUDA, DirectML, TensorRT), and mobile. Optimizes models from PyTorch, TensorFlow, etc. MIT license.',
'https://onnxruntime.ai', 'https://github.com/microsoft/onnxruntime',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['inference','onnx','cross-platform','microsoft','optimization','mobile'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'onnx-runtime');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'tinygrad', 'tinygrad', 'Minimalist deep learning framework in under 10,000 lines of code.',
'tinygrad by George Hotz (comma.ai) is a minimalist deep learning framework aiming for simplicity and educational value. Under 10,000 lines of code. Supports GPU acceleration and can run real models. MIT license.',
'https://github.com/tinygrad/tinygrad', 'https://github.com/tinygrad/tinygrad',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['framework','minimalist','educational','small','george-hotz'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tinygrad');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'micrograd', 'micrograd', 'Tiny autograd engine by Andrej Karpathy for educational purposes.',
'micrograd by Andrej Karpathy is a tiny scalar-valued autograd engine and neural network library in ~100 lines of Python. Designed for educational purposes to understand how backpropagation works. MIT license.',
'https://github.com/karpathy/micrograd', 'https://github.com/karpathy/micrograd',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['autograd','educational','tiny','karpathy','backpropagation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'micrograd');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FastAI', 'fastai', 'High-level deep learning library making neural nets accessible with best practices.',
'FastAI provides high-level components for training deep learning models with PyTorch. Implements best practices by default (learning rate finder, mixed precision, progressive resizing). Includes the fast.ai course materials. Apache 2.0 license.',
'https://www.fast.ai', 'https://github.com/fastai/fastai',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['deep-learning','high-level','pytorch','course','best-practices'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'fastai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PyTorch Lightning', 'pytorch-lightning', 'Lightweight PyTorch wrapper for organized ML research and production code.',
'Lightning (formerly PyTorch Lightning) organizes PyTorch code to decouple research from engineering. Handles distributed training, mixed precision, logging, and checkpointing automatically. Scales from laptop to cluster. Apache 2.0 license.',
'https://lightning.ai', 'https://github.com/Lightning-AI/pytorch-lightning',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['pytorch','training','distributed','organized','production','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pytorch-lightning');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Triton (OpenAI)', 'triton-openai', 'Language and compiler for writing GPU kernels in Python by OpenAI.',
'Triton by OpenAI is a language and compiler for writing efficient GPU programs (kernels) in Python. Enables researchers to write custom CUDA-level operations without C++/CUDA knowledge. Powers FlashAttention and other optimizations. MIT license.',
'https://triton-lang.org', 'https://github.com/triton-lang/triton',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'MIT', 'free', 'local', 5, true, 8, true, true, true,
ARRAY['gpu','kernels','compiler','python','openai','cuda','optimization'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'triton-openai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FlashAttention', 'flash-attention', 'IO-aware exact attention algorithm that is 2-4x faster and uses less memory.',
'FlashAttention by Tri Dao is an IO-aware exact attention algorithm that reduces memory usage from O(N^2) to O(N) while being 2-4x faster than standard attention. Critical optimization for training and inference of large transformer models. BSD-3-Clause license.',
'https://github.com/Dao-AILab/flash-attention', 'https://github.com/Dao-AILab/flash-attention',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'BSD-3-Clause', 'free', 'local', 5, true, 8, true, true, true,
ARRAY['attention','optimization','memory-efficient','fast','transformer','cuda'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flash-attention');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepSpeed', 'deepspeed', 'Deep learning optimization library by Microsoft for distributed training.',
'DeepSpeed by Microsoft enables efficient distributed training and inference of large models. Features ZeRO optimizer (shards model states across GPUs), pipeline parallelism, and inference optimization. Trains trillion-parameter models. Apache 2.0 license.',
'https://www.deepspeed.ai', 'https://github.com/microsoft/DeepSpeed',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['distributed-training','optimization','microsoft','zero','large-models','gpu'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepspeed');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Megatron-LM', 'megatron-lm', 'NVIDIA framework for training multi-billion parameter transformer models.',
'Megatron-LM by NVIDIA Research is a framework for efficiently training very large transformer models. Implements tensor, pipeline, and sequence parallelism. Used to train many of the largest open models. Custom NVIDIA license.',
'https://github.com/NVIDIA/Megatron-LM', 'https://github.com/NVIDIA/Megatron-LM',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Custom', 'free', 'local', 5, true, 16, true, true, true,
ARRAY['distributed-training','nvidia','large-models','parallelism','transformer'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'megatron-lm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ColossalAI', 'colossalai', 'Unified system for large-scale distributed training and inference.',
'ColossalAI provides a unified system for large-scale distributed training and inference. Supports data, tensor, pipeline, and sequence parallelism. Includes Colossal-LLaMA training recipes and memory optimization. Apache 2.0 license.',
'https://colossalai.org', 'https://github.com/hpcaitech/ColossalAI',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['distributed-training','parallelism','inference','large-models'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'colossalai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CatBoost', 'catboost', 'Gradient boosting library by Yandex with native categorical feature handling.',
'CatBoost by Yandex is a gradient boosting library that handles categorical features natively without manual encoding. Provides ordered boosting to reduce overfitting. Supports GPU training. Competitive with XGBoost and LightGBM. Apache 2.0 license.',
'https://catboost.ai', 'https://github.com/catboost/catboost',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['gradient-boosting','categorical','yandex','tabular','structured-data'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'catboost');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PaddlePaddle', 'paddlepaddle', 'Deep learning platform by Baidu with industrial-strength deployment tools.',
'PaddlePaddle by Baidu is a deep learning platform designed for industrial applications. Includes PaddleOCR, PaddleNLP, PaddleSeg, and other task-specific toolkits. Strong Chinese language ecosystem. Apache 2.0 license.',
'https://www.paddlepaddle.org.cn', 'https://github.com/PaddlePaddle/Paddle',
(SELECT id FROM categories WHERE slug = 'ai-frameworks-libraries'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['framework','deep-learning','baidu','industrial','chinese-ecosystem'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'paddlepaddle');

------------------------------------------------------------
-- AI AGENTS & ORCHESTRATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LangChain', 'langchain', 'Framework for building applications powered by language models with chaining.',
'LangChain is the most popular framework for building LLM-powered applications. Provides abstractions for chains, agents, retrieval, memory, and tool use. Supports OpenAI, Anthropic, local models, and many more. MIT license.',
'https://langchain.com', 'https://github.com/langchain-ai/langchain',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['agents','chains','rag','tools','llm','orchestration'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'langchain');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LlamaIndex', 'llamaindex', 'Data framework for connecting LLMs with external data sources for RAG.',
'LlamaIndex is a data framework for LLM applications. Provides tools for data ingestion, indexing, and querying. Excels at RAG (Retrieval-Augmented Generation) with connectors for 160+ data sources. MIT license.',
'https://www.llamaindex.ai', 'https://github.com/run-llama/llama_index',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['rag','data','indexing','retrieval','connectors','llm'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llamaindex');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CrewAI', 'crewai', 'Framework for orchestrating role-playing autonomous AI agents.',
'CrewAI enables building teams of AI agents that collaborate on complex tasks. Each agent has a role, goal, and backstory. Supports sequential and hierarchical workflows. Integrates with LangChain tools. MIT license.',
'https://www.crewai.com', 'https://github.com/crewAIInc/crewAI',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['agents','multi-agent','collaboration','roles','orchestration'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'crewai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AutoGen (AG2)', 'autogen', 'Multi-agent conversation framework by Microsoft for complex LLM workflows.',
'AutoGen (now AG2) by Microsoft enables building multi-agent systems where AI agents converse to solve tasks. Supports human-in-the-loop, code execution, tool use, and group chat. Flexible agent customization. CC-BY-4.0 license.',
'https://ag2.ai', 'https://github.com/ag2ai/ag2',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'CC-BY-4.0', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['agents','multi-agent','microsoft','conversation','code-execution'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'autogen');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Semantic Kernel', 'semantic-kernel', 'LLM integration SDK by Microsoft for C#, Python, and Java applications.',
'Semantic Kernel by Microsoft is an SDK for integrating LLMs into C#, Python, and Java applications. Features planners, plugins, memory, and connectors. Enterprise-focused with Azure OpenAI integration. MIT license.',
'https://learn.microsoft.com/en-us/semantic-kernel/', 'https://github.com/microsoft/semantic-kernel',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['sdk','microsoft','csharp','python','enterprise','plugins','planners'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'semantic-kernel');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DSPy', 'dspy', 'Framework by Stanford for programming with foundation models using optimized prompts.',
'DSPy by Stanford NLP replaces hand-written prompts with programming abstractions. Compiles declarative language model calls into optimized prompts or fine-tuning. Enables systematic optimization of LLM pipelines. MIT license.',
'https://dspy.ai', 'https://github.com/stanfordnlp/dspy',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 4, false, NULL, true, true, false,
ARRAY['prompts','optimization','stanford','programming','compilation','llm'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dspy');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Haystack', 'haystack', 'Open-source LLM framework by deepset for building RAG and search pipelines.',
'Haystack by deepset is an open-source framework for building production-ready LLM applications, RAG pipelines, and semantic search systems. Modular pipeline design with 100+ integrations. Apache 2.0 license.',
'https://haystack.deepset.ai', 'https://github.com/deepset-ai/haystack',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['rag','search','pipelines','deepset','modular','production'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'haystack');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Dify', 'dify', 'Open-source platform for building LLM applications with visual workflow editor.',
'Dify is an open-source LLM app development platform with a visual workflow editor. Supports RAG pipelines, AI agents, and prompt engineering. Includes model management for 100+ LLMs. Self-hosted with Docker. Apache 2.0 license.',
'https://dify.ai', 'https://github.com/langgenius/dify',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['platform','visual','workflow','rag','agents','self-hosted','docker'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dify');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Flowise', 'flowise', 'Drag-and-drop UI for building LLM flows and AI agents.',
'Flowise provides a drag-and-drop UI for building customized LLM flows. Supports LangChain and LlamaIndex nodes, chatbots, RAG, and agents. Deploy as API endpoints. Self-hosted with Docker. Apache 2.0 license.',
'https://flowiseai.com', 'https://github.com/FlowiseAI/Flowise',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['visual','drag-drop','langchain','chatbot','low-code','docker'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'flowise');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Langflow', 'langflow', 'Visual framework for building multi-agent and RAG applications.',
'Langflow is a visual framework for building multi-agent and RAG applications. Python-based with a drag-and-drop UI. Supports custom components. Deploy as API. By DataStax. MIT license.',
'https://www.langflow.org', 'https://github.com/langflow-ai/langflow',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['visual','multi-agent','rag','drag-drop','datastax','api'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'langflow');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'n8n', 'n8n', 'Workflow automation platform with AI agent capabilities and 400+ integrations.',
'n8n is an extendable workflow automation platform with built-in AI agent capabilities. Supports LLM chains, RAG, tool use, and connects to 400+ services. Self-hosted with fair-code license. Sustainable Use License.',
'https://n8n.io', 'https://github.com/n8n-io/n8n',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Sustainable Use', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['automation','workflow','ai-agents','integrations','self-hosted','low-code'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'n8n');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'smolagents', 'smolagents', 'Lightweight agent framework by Hugging Face for building tool-using AI agents.',
'smolagents by Hugging Face is a lightweight library for building AI agents that use tools. Minimal abstraction over LLM function calling. Supports code agents that write Python to solve tasks. Apache 2.0 license.',
'https://github.com/huggingface/smolagents', 'https://github.com/huggingface/smolagents',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['agents','tools','huggingface','lightweight','code-agent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'smolagents');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Letta (MemGPT)', 'letta-memgpt', 'Framework for building LLM agents with persistent memory and self-editing.',
'Letta (formerly MemGPT) enables building LLM agents with persistent memory that grows over time. Agents can self-edit their memory, enabling long-term context beyond context window limits. Apache 2.0 license.',
'https://www.letta.com', 'https://github.com/letta-ai/letta',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['agents','memory','persistent','self-editing','long-term','memgpt'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'letta-memgpt');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Instructor', 'instructor', 'Library for structured LLM outputs with Pydantic validation.',
'Instructor patches LLM client libraries (OpenAI, Anthropic, etc.) to return structured, validated outputs using Pydantic models. Handles retries and validation automatically. Supports function calling and tool use. MIT license by Jason Liu.',
'https://python.useinstructor.com', 'https://github.com/instructor-ai/instructor',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['structured-output','pydantic','validation','llm','function-calling'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'instructor');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Outlines', 'outlines', 'Structured text generation library using constrained decoding with FSMs.',
'Outlines by .txt enables structured text generation from LLMs using finite-state machine (FSM) guided decoding. Generate valid JSON, regex-conforming text, or choice selection with guaranteed structure. Apache 2.0 license.',
'https://github.com/dottxt-ai/outlines', 'https://github.com/dottxt-ai/outlines',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['structured-generation','json','constrained-decoding','fsm','regex'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'outlines');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Guidance', 'guidance-ms', 'Language for controlling LLM generation with constrained output by Microsoft.',
'Guidance by Microsoft provides a language for controlling large language model generation. Enables interleaving generation, prompting, and logical control. Supports constrained output with regex, JSON schemas, and grammars. MIT license.',
'https://github.com/guidance-ai/guidance', 'https://github.com/guidance-ai/guidance',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['structured-generation','control','microsoft','constrained','grammar'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'guidance-ms');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Guardrails AI', 'guardrails-ai', 'Framework for adding validation and safety guardrails to LLM outputs.',
'Guardrails AI provides validators for LLM outputs including format checking, PII detection, toxicity filtering, and factual consistency. Composable guard pipelines. Works with any LLM. Apache 2.0 license.',
'https://www.guardrailsai.com', 'https://github.com/guardrails-ai/guardrails',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['guardrails','validation','safety','pii','toxicity','llm'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'guardrails-ai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'NeMo Guardrails', 'nemo-guardrails', 'Toolkit by NVIDIA for adding programmable guardrails to LLM-based applications.',
'NeMo Guardrails by NVIDIA enables adding programmable guardrails to LLM-based applications. Define rules in Colang language for topical, safety, and security rails. Works with any LLM. Apache 2.0 license.',
'https://github.com/NVIDIA/NeMo-Guardrails', 'https://github.com/NVIDIA/NeMo-Guardrails',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['guardrails','nvidia','safety','colang','programmable','rules'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'nemo-guardrails');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PydanticAI', 'pydanticai', 'Agent framework by the Pydantic team with type-safe LLM interactions.',
'PydanticAI by the Pydantic team provides a type-safe agent framework for building LLM-powered applications. First-class support for structured outputs, dependency injection, and streaming. Integrates with Logfire for observability. MIT license.',
'https://ai.pydantic.dev', 'https://github.com/pydantic/pydantic-ai',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['agents','pydantic','type-safe','structured','python'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pydanticai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LiteLLM', 'litellm', 'Unified API to call 100+ LLM providers with OpenAI-compatible format.',
'LiteLLM provides a unified interface to call 100+ LLM APIs (OpenAI, Anthropic, Cohere, local models, etc.) using the OpenAI format. Includes a proxy server for load balancing, budget management, and caching. MIT license.',
'https://litellm.ai', 'https://github.com/BerriAI/litellm',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['api','unified','openai-compatible','proxy','multi-provider','routing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'litellm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Composio', 'composio', 'Integration platform providing 250+ tools for AI agents and LLMs.',
'Composio provides 250+ pre-built tool integrations (GitHub, Slack, Jira, databases, etc.) for AI agents. Works with LangChain, CrewAI, AutoGen, and other frameworks. Handles auth, rate limits, and errors. MIT license.',
'https://composio.dev', 'https://github.com/ComposioHQ/composio',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['tools','integrations','agents','github','slack','auth'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'composio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'E2B', 'e2b', 'Sandboxed cloud environments for AI agents to execute code safely.',
'E2B provides sandboxed cloud environments (Code Interpreters) for AI agents and LLMs to safely execute code. Isolated containers prevent harmful actions. Supports Python, JS, and more. Apache 2.0 license.',
'https://e2b.dev', 'https://github.com/e2b-dev/E2B',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'api', 2, false, NULL, true, false, false,
ARRAY['sandbox','code-execution','agents','safe','isolated','cloud'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'e2b');

------------------------------------------------------------
-- VECTOR DATABASES & EMBEDDINGS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Chroma', 'chroma', 'Open-source embedding database for AI applications with simple API.',
'Chroma is an open-source embedding database designed for AI applications. Simple Python/JS API for storing, querying, and filtering embeddings. Runs in-memory, as a client, or as a server. Apache 2.0 license.',
'https://www.trychroma.com', 'https://github.com/chroma-core/chroma',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['vector-db','embeddings','simple','python','javascript','in-memory'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'chroma');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Qdrant', 'qdrant', 'High-performance vector similarity search engine built in Rust.',
'Qdrant is a vector similarity search engine and database built in Rust. Supports filtering, payload storage, and distributed deployment. REST and gRPC APIs. Optimized for production workloads. Apache 2.0 license.',
'https://qdrant.tech', 'https://github.com/qdrant/qdrant',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['vector-db','rust','search','filtering','production','grpc'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'qdrant');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Weaviate', 'weaviate', 'Open-source vector database with built-in vectorization and hybrid search.',
'Weaviate is an open-source vector database with built-in vectorization modules, hybrid (vector + keyword) search, and GraphQL API. Supports multi-tenancy and horizontal scaling. Docker deployment. BSD-3-Clause license.',
'https://weaviate.io', 'https://github.com/weaviate/weaviate',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'BSD-3-Clause', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['vector-db','hybrid-search','graphql','vectorization','multi-tenancy'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'weaviate');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Milvus', 'milvus', 'Cloud-native vector database built for billion-scale similarity search.',
'Milvus is a cloud-native vector database designed for billion-scale vector similarity search. Supports GPU-accelerated indexing, hybrid search, and multi-vector queries. Used in production at scale. Apache 2.0 license by Zilliz.',
'https://milvus.io', 'https://github.com/milvus-io/milvus',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['vector-db','billion-scale','cloud-native','gpu','zilliz','production'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'milvus');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'pgvector', 'pgvector', 'Open-source vector similarity search extension for PostgreSQL.',
'pgvector adds vector similarity search to PostgreSQL. Store embeddings alongside your existing data. Supports exact and approximate nearest neighbor search (IVFFlat, HNSW). No separate database needed. PostgreSQL license.',
'https://github.com/pgvector/pgvector', 'https://github.com/pgvector/pgvector',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'PostgreSQL', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['vector-db','postgresql','extension','hnsw','ivfflat','sql'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pgvector');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LanceDB', 'lancedb', 'Serverless vector database built on Lance columnar format.',
'LanceDB is a serverless vector database that runs embedded in your application (like SQLite). Built on the Lance columnar format for fast vector search and data management. Zero infrastructure needed. Apache 2.0 license.',
'https://lancedb.com', 'https://github.com/lancedb/lancedb',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['vector-db','serverless','embedded','lance','columnar','simple'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lancedb');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FAISS', 'faiss', 'Efficient similarity search library by Meta for dense vector clustering and retrieval.',
'FAISS (Facebook AI Similarity Search) by Meta provides efficient algorithms for similarity search and clustering of dense vectors. Supports GPU-accelerated search, billion-scale indexes, and various quantization methods. MIT license.',
'https://github.com/facebookresearch/faiss', 'https://github.com/facebookresearch/faiss',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['similarity-search','vectors','meta','gpu','billion-scale','clustering'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'faiss');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Annoy', 'annoy', 'Approximate nearest neighbor library by Spotify optimized for memory usage.',
'Annoy (Approximate Nearest Neighbors Oh Yeah) by Spotify builds read-only data structures for fast nearest neighbor search. Memory-mapped files enable sharing indexes across processes. C++ with Python bindings. Apache 2.0 license.',
'https://github.com/spotify/annoy', 'https://github.com/spotify/annoy',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['ann','nearest-neighbor','spotify','memory-efficient','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'annoy');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'HNSWlib', 'hnswlib', 'Header-only C++ library implementing HNSW approximate nearest neighbor search.',
'HNSWlib is a header-only C++ library implementing the Hierarchical Navigable Small World (HNSW) algorithm for approximate nearest neighbor search. Fast and memory-efficient. Python bindings available. Apache 2.0 license.',
'https://github.com/nmslib/hnswlib', 'https://github.com/nmslib/hnswlib',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['ann','hnsw','nearest-neighbor','cpp','header-only','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'hnswlib');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'USearch', 'usearch', 'Compact single-header vector search engine supporting multiple languages.',
'USearch is a compact single-header vector search engine supporting C, C++, Python, JavaScript, Java, Rust, and more. 10x smaller than FAISS. Supports half-precision, SIMD, and custom distance functions. Apache 2.0 license by Unum.',
'https://github.com/unum-cloud/usearch', 'https://github.com/unum-cloud/usearch',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['vector-search','compact','multi-language','simd','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'usearch');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'txtai', 'txtai', 'All-in-one embeddings database for semantic search, LLM orchestration, and language model workflows.',
'txtai is an all-in-one embeddings database combining vector search with LLM orchestration. Supports semantic search, RAG, and workflow pipelines. Includes built-in embedding models. Apache 2.0 license by NeuML.',
'https://neuml.github.io/txtai/', 'https://github.com/neuml/txtai',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['embeddings','search','rag','workflows','all-in-one','neuml'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'txtai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TEI (Text Embeddings Inference)', 'tei', 'High-performance embedding server by Hugging Face for production deployment.',
'TEI by Hugging Face is a high-performance inference server for text embeddings and reranking models. Supports batch inference, dynamic batching, and GPU acceleration. Production-ready with Docker deployment. Apache 2.0 license.',
'https://github.com/huggingface/text-embeddings-inference', 'https://github.com/huggingface/text-embeddings-inference',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['embeddings','server','huggingface','production','batch','docker'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tei');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Vespa', 'vespa', 'Open-source big data serving engine with built-in vector search and ML inference.',
'Vespa is an open-source big data serving engine that combines vector search, text search, and ML model inference in one system. Handles billions of items with real-time updates. Used by Yahoo, Spotify, and others. Apache 2.0 license.',
'https://vespa.ai', 'https://github.com/vespa-engine/vespa',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['search','vector-db','ml-inference','big-data','production','yahoo'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vespa');

------------------------------------------------------------
-- RAG & DOCUMENT RETRIEVAL
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'RAGFlow', 'ragflow', 'Open-source RAG engine with deep document understanding and chunk-level citations.',
'RAGFlow is an open-source RAG engine that provides document understanding with visual chunking, template-based parsing, and chunk-level citations. Supports PDFs, Word, Excel, and more. Docker self-hosted. Apache 2.0 license by InfiniFlow.',
'https://ragflow.io', 'https://github.com/infiniflow/ragflow',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['rag','document','citations','parsing','docker','self-hosted'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ragflow');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kotaemon', 'kotaemon', 'Open-source RAG-based tool for chatting with documents.',
'Kotaemon is an open-source RAG-based document QA tool with a clean web UI. Supports multiple LLM providers, multi-modal documents, and hybrid retrieval. Self-hosted with Docker. Apache 2.0 license by Cinnamon.',
'https://github.com/Cinnamon/kotaemon', 'https://github.com/Cinnamon/kotaemon',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['rag','document-qa','chat','webui','self-hosted'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kotaemon');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PrivateGPT', 'privategpt', 'Production-ready AI project for private document interaction without data leaving your environment.',
'PrivateGPT enables asking questions about documents using LLMs in a fully private setup. No data leaves your execution environment. Supports local LLMs, embeddings, and vector storage. API and web UI. Apache 2.0 license.',
'https://privategpt.dev', 'https://github.com/zylon-ai/private-gpt',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['rag','private','document-qa','local','offline','privacy'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'privategpt');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AnythingLLM', 'anythingllm', 'All-in-one desktop and Docker app for private LLM chat with your documents.',
'AnythingLLM is an all-in-one application for chatting with documents using any LLM. Supports local models (Ollama, LM Studio), cloud APIs, multiple vector databases, and multi-user workspaces. Desktop app and Docker. MIT license.',
'https://anythingllm.com', 'https://github.com/Mintplex-Labs/anything-llm',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['rag','chat','documents','desktop','docker','multi-user','all-in-one'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'anythingllm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Open WebUI', 'open-webui', 'Self-hosted web interface for local LLMs with RAG, model management, and multi-user support.',
'Open WebUI (formerly Ollama WebUI) is a self-hosted web interface for LLMs. Supports Ollama, OpenAI-compatible APIs, RAG with document uploads, model management, and multi-user with role-based access. MIT license.',
'https://openwebui.com', 'https://github.com/open-webui/open-webui',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['webui','chat','ollama','rag','self-hosted','multi-user'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'open-webui');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Quivr', 'quivr', 'Open-source AI second brain for chatting with documents and knowledge bases.',
'Quivr is an open-source generative AI second brain. Upload documents, websites, or connect data sources to chat with your knowledge using any LLM. Supports RAG with multiple vector stores. Apache 2.0 license.',
'https://www.quivr.com', 'https://github.com/QuivrHQ/quivr',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['rag','document-qa','second-brain','knowledge-base','chat'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'quivr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Firecrawl', 'firecrawl', 'Web scraping API that turns websites into clean LLM-ready markdown.',
'Firecrawl crawls and converts websites into clean markdown or structured data optimized for LLM consumption. Handles JavaScript rendering, sitemaps, and rate limiting. API and self-hosted options. AGPL-3.0 license.',
'https://firecrawl.dev', 'https://github.com/mendableai/firecrawl',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'AGPL-3.0', 'free', 'api', 2, false, NULL, true, true, false,
ARRAY['scraping','markdown','llm-ready','web','crawling','api'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'firecrawl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Crawlee', 'crawlee', 'Web scraping and browser automation library by Apify for Node.js and Python.',
'Crawlee by Apify is a web scraping and browser automation library. Supports HTTP crawling, headless Chrome/Playwright, automatic scaling, and proxy rotation. Designed for reliable large-scale crawling. Apache 2.0 license.',
'https://crawlee.dev', 'https://github.com/apify/crawlee',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['scraping','automation','browser','playwright','apify','crawling'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'crawlee');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ScrapeGraphAI', 'scrapegraphai', 'AI-powered web scraping library using LLMs for intelligent data extraction.',
'ScrapeGraphAI uses LLMs to create intelligent web scraping pipelines. Describe what data you want in natural language, and it builds the scraping graph automatically. Supports local and cloud LLMs. MIT license.',
'https://scrapegraphai.com', 'https://github.com/ScrapeGraphAI/Scrapegraph-ai',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['scraping','llm','ai-powered','natural-language','extraction'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'scrapegraphai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LocalGPT', 'localgpt', 'Chat with documents locally using any open-source LLM without data leaving your device.',
'LocalGPT enables chatting with documents using local open-source LLMs. All data stays on your device. Uses LangChain for document processing and retrieval. Supports various embedding and LLM models. Apache 2.0 license.',
'https://github.com/PromtEngineer/localGPT', 'https://github.com/PromtEngineer/localGPT',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['rag','local','private','document-qa','langchain','offline'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'localgpt');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Verba', 'verba', 'Open-source RAG chatbot by Weaviate for exploring datasets and documents.',
'Verba by Weaviate is a RAG chatbot for exploring datasets and documents. Provides a clean web interface with chunking visualization, source citations, and customizable retrieval. Built on Weaviate vector database. BSD-3-Clause license.',
'https://github.com/weaviate/Verba', 'https://github.com/weaviate/Verba',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'BSD-3-Clause', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['rag','chatbot','weaviate','visualization','citations','documents'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'verba');
