-- Batch 6: AI Observability, AI Deployment, Voice Cloning, AI Animation, Diffusion Tools
-- Plus supplemental tools from earlier categories to reach 500+ total
-- All tools are real open-source projects. ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- AI OBSERVABILITY & EVALUATION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Langfuse', 'langfuse', 'Open-source LLM observability platform with tracing, analytics, and evaluation.',
'Langfuse is an open-source LLM engineering platform providing tracing, prompt management, evaluation, and analytics for LLM applications. Integrates with LangChain, LlamaIndex, and OpenAI SDK. Self-hosted with Docker. MIT license.',
'https://langfuse.com', 'https://github.com/langfuse/langfuse',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['observability','tracing','evaluation','llm','analytics','self-hosted'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'langfuse');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Helicone', 'helicone', 'Open-source LLM observability platform for logging, caching, and monitoring.',
'Helicone is an open-source observability platform for LLM applications. Provides request logging, caching, rate limiting, and cost tracking. One-line integration with OpenAI, Anthropic, and other providers. Apache 2.0 license.',
'https://helicone.ai', 'https://github.com/Helicone/helicone',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, false,
ARRAY['observability','logging','caching','monitoring','llm','cost-tracking'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'helicone');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Promptfoo', 'promptfoo', 'CLI and library for testing, evaluating, and red-teaming LLM outputs.',
'Promptfoo is a tool for testing and evaluating LLM outputs. Compare prompts, models, and RAG pipelines with automated assertions. Includes LLM red-teaming and vulnerability scanning. CLI and web UI. MIT license.',
'https://promptfoo.dev', 'https://github.com/promptfoo/promptfoo',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['evaluation','testing','red-teaming','prompts','comparison','cli'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'promptfoo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Phoenix (Arize)', 'phoenix-arize', 'Open-source AI observability platform for tracing, evaluation, and experimentation.',
'Phoenix by Arize AI is an open-source observability library for AI applications. Provides tracing, evaluation, dataset management, and experimentation. Supports LLM, retrieval, and agent workflows. Apache 2.0 license.',
'https://phoenix.arize.com', 'https://github.com/Arize-ai/phoenix',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['observability','tracing','evaluation','arize','experimentation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'phoenix-arize');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Evidently AI', 'evidently-ai', 'Open-source ML monitoring framework for data drift and model quality.',
'Evidently AI is an open-source framework for monitoring ML models in production. Detects data drift, tracks model quality metrics, and generates reports. Supports tabular, NLP, and LLM use cases. Apache 2.0 license.',
'https://www.evidentlyai.com', 'https://github.com/evidentlyai/evidently',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['monitoring','data-drift','model-quality','reports','production'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'evidently-ai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepChecks', 'deepchecks', 'Open-source testing framework for ML models and data validation.',
'DeepChecks provides comprehensive testing for ML models and data. Validates data integrity, checks for distribution shifts, and evaluates model performance. Supports tabular, NLP, and computer vision. AGPL-3.0 license.',
'https://deepchecks.com', 'https://github.com/deepchecks/deepchecks',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'AGPL-3.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['testing','validation','data-integrity','model-evaluation','checks'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepchecks');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Giskard', 'giskard', 'Open-source testing framework for AI models focusing on quality and safety.',
'Giskard is an open-source testing framework for AI models. Automatically detects vulnerabilities, biases, and quality issues in LLMs and ML models. Supports RAG evaluation and LLM security testing. Apache 2.0 license.',
'https://giskard.ai', 'https://github.com/Giskard-AI/giskard',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['testing','vulnerability','bias','safety','llm','quality'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'giskard');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TruLens', 'trulens', 'Open-source library for evaluating and tracking LLM applications.',
'TruLens provides evaluation and tracking for LLM applications. Includes feedback functions for groundedness, relevance, and toxicity. Tracks experiments and compares configurations. MIT license by TruEra.',
'https://www.trulens.org', 'https://github.com/truera/trulens',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['evaluation','tracking','llm','groundedness','relevance','truera'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'trulens');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Opik', 'opik', 'Open-source LLM evaluation and tracing platform by Comet.',
'Opik by Comet is an open-source platform for evaluating, testing, and monitoring LLM applications. Provides tracing, evaluation metrics, dataset management, and experiment tracking. Apache 2.0 license.',
'https://www.comet.com/site/products/opik/', 'https://github.com/comet-ml/opik',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['evaluation','tracing','monitoring','comet','experiments','metrics'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'opik');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MLflow', 'mlflow', 'Open-source platform for the complete ML lifecycle including tracking and deployment.',
'MLflow is an open-source platform for managing the complete ML lifecycle. Includes experiment tracking, model registry, project packaging, and model serving. Supports all major ML frameworks. Apache 2.0 license by Databricks.',
'https://mlflow.org', 'https://github.com/mlflow/mlflow',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['mlops','tracking','registry','lifecycle','databricks','experiment'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mlflow');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ClearML', 'clearml', 'Open-source ML/AI development platform with experiment tracking and orchestration.',
'ClearML is an end-to-end ML/AI platform providing experiment tracking, data versioning, orchestration, and model serving. Auto-logs experiments from any Python code. Self-hosted or cloud. Apache 2.0 license.',
'https://clear.ml', 'https://github.com/allegroai/clearml',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['mlops','tracking','orchestration','auto-logging','platform'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'clearml');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Aim', 'aim-ml', 'Open-source AI metadata tracker for logging and comparing ML experiments.',
'Aim is an open-source AI metadata tracker for logging, comparing, and reproducing ML experiments. Provides a rich web UI for exploring runs, metrics, images, and distributions. Super-fast with 1000s of runs. Apache 2.0 license.',
'https://aimstack.io', 'https://github.com/aimhubio/aim',
(SELECT id FROM categories WHERE slug = 'ai-observability-evaluation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['tracking','experiments','visualization','comparison','metadata','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'aim-ml');

------------------------------------------------------------
-- AI DEPLOYMENT & MLOPS
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'BentoML', 'bentoml', 'Framework for building production-ready AI application services.',
'BentoML is a framework for building reliable, scalable, and cost-efficient AI application services. Package models from any framework, create APIs, and deploy anywhere. Supports batching, GPU serving, and containerization. Apache 2.0 license.',
'https://bentoml.com', 'https://github.com/bentoml/BentoML',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['serving','deployment','api','containerization','production','multi-framework'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bentoml');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Triton Inference Server', 'triton-inference', 'NVIDIA inference serving platform for deploying AI models at scale.',
'Triton Inference Server by NVIDIA supports deploying models from all major frameworks (TensorRT, PyTorch, TensorFlow, ONNX, vLLM). Features dynamic batching, model ensemble, GPU/CPU inference, and metrics. BSD-3-Clause license.',
'https://developer.nvidia.com/triton-inference-server', 'https://github.com/triton-inference-server/server',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'BSD-3-Clause', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['inference','serving','nvidia','multi-framework','production','gpu','batching'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'triton-inference');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Seldon Core', 'seldon-core', 'Kubernetes-native platform for deploying ML models to production.',
'Seldon Core is a Kubernetes-native platform for deploying, scaling, and monitoring ML models. Supports canary deployments, A/B testing, explainability, and drift detection. Works with any ML framework. Apache 2.0 license.',
'https://www.seldon.io', 'https://github.com/SeldonIO/seldon-core',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['deployment','kubernetes','scaling','monitoring','canary','ab-testing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'seldon-core');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'KServe', 'kserve', 'Kubernetes serverless inference platform for deploying ML models.',
'KServe (formerly KFServing) provides a Kubernetes Custom Resource for serverless ML model inference. Supports autoscaling, canary rollouts, and multi-framework serving (TensorFlow, PyTorch, ONNX, etc.). Apache 2.0 license.',
'https://kserve.github.io/kserve/', 'https://github.com/kserve/kserve',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['deployment','kubernetes','serverless','autoscaling','inference'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kserve');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TorchServe', 'torchserve', 'PyTorch model serving framework for production deployment.',
'TorchServe is the official model serving framework for PyTorch. Features model archiving, REST/gRPC APIs, batching, logging, and metrics. Supports custom handlers and multi-model serving. Apache 2.0 license by AWS and Meta.',
'https://pytorch.org/serve/', 'https://github.com/pytorch/serve',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['serving','pytorch','api','production','aws','meta','batching'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'torchserve');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TensorFlow Serving', 'tf-serving', 'Production model serving system for TensorFlow models.',
'TensorFlow Serving is a flexible, high-performance serving system for ML models in production. Features model versioning, batching, and monitoring. Designed for TensorFlow but supports other formats. Apache 2.0 license by Google.',
'https://www.tensorflow.org/tfx/guide/serving', 'https://github.com/tensorflow/serving',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['serving','tensorflow','production','google','versioning','batching'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tf-serving');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Ray Serve', 'ray-serve', 'Scalable model serving library built on Ray for ML applications.',
'Ray Serve is a scalable model serving library built on the Ray distributed computing framework. Supports multi-model composition, autoscaling, and GPU/CPU serving. Language-agnostic with FastAPI integration. Apache 2.0 license by Anyscale.',
'https://docs.ray.io/en/latest/serve/', 'https://github.com/ray-project/ray',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['serving','ray','distributed','autoscaling','composition','anyscale'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ray-serve');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Cog', 'cog-replicate', 'Container tool by Replicate for packaging ML models as standard Docker images.',
'Cog by Replicate packages ML models as standard, production-ready Docker containers. Define dependencies and a predict function in Python, and Cog builds a Docker image with CUDA, web server, and API. Apache 2.0 license.',
'https://cog.run', 'https://github.com/replicate/cog',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['packaging','docker','replicate','containerization','api','simple'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cog-replicate');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DVC', 'dvc', 'Open-source version control for ML datasets, models, and experiments.',
'DVC (Data Version Control) is Git for data and ML. Version control datasets, models, and experiments alongside code. Supports remote storage (S3, GCS, Azure). Enables reproducible ML pipelines. Apache 2.0 license by iterative.ai.',
'https://dvc.org', 'https://github.com/iterative/dvc',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['version-control','data','models','experiments','git','reproducible'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dvc');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kubeflow', 'kubeflow', 'ML toolkit for Kubernetes providing pipelines, training, and serving.',
'Kubeflow is the ML toolkit for Kubernetes. Provides ML pipelines, distributed training operators, model serving (KServe), Katib hyperparameter tuning, and Jupyter notebooks. Apache 2.0 license by Google.',
'https://www.kubeflow.org', 'https://github.com/kubeflow/kubeflow',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 5, false, NULL, true, true, true,
ARRAY['mlops','kubernetes','pipelines','training','serving','google'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'kubeflow');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Truss', 'truss', 'Framework by Baseten for packaging and serving ML models.',
'Truss by Baseten is a framework for packaging ML models as production-ready API endpoints. Simple Python interface for model definition. Supports GPU, custom dependencies, and secrets. MIT license.',
'https://truss.baseten.co', 'https://github.com/basetenlabs/truss',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['serving','packaging','api','baseten','python','production'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'truss');

------------------------------------------------------------
-- VOICE CLONING & VOICE CONVERSION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'RVC (Retrieval-based Voice Conversion)', 'rvc', 'Easy-to-use voice conversion framework based on retrieval for real-time voice cloning.',
'RVC (Retrieval-based Voice Conversion) is a voice conversion framework that achieves high-quality voice cloning with minimal training data. Supports real-time conversion, GPU and CPU inference. Easy-to-use training pipeline with web UI. MIT license.',
'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI', 'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['voice-conversion','voice-cloning','real-time','webui','training'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rvc');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'FreeVC', 'freevc', 'Text-free one-shot voice conversion model requiring no text transcription.',
'FreeVC is a text-free one-shot voice conversion model. Converts voice characteristics without requiring text transcription or alignment. Works with a single reference utterance. By Jungil Kong. MIT license.',
'https://github.com/OlaWod/FreeVC', 'https://github.com/OlaWod/FreeVC',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['voice-conversion','one-shot','text-free','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'freevc');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Applio', 'applio', 'Advanced RVC fork with enhanced training and inference features.',
'Applio is an advanced fork of RVC (Retrieval-based Voice Conversion) with enhanced features. Improved training pipeline, TensorBoard logging, model fusion, and audio processing. User-friendly interface. MIT license.',
'https://applio.org', 'https://github.com/IAHispano/Applio',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['voice-conversion','rvc','fork','enhanced','training','webui'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'applio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mangio-RVC', 'mangio-rvc', 'Community fork of RVC with additional features and optimizations.',
'Mangio-RVC is a community fork of RVC with additional features including crepe pitch extraction, improved training options, and performance optimizations. Popular in the voice conversion community.',
'https://github.com/Mangio621/Mangio-RVC-Fork', 'https://github.com/Mangio621/Mangio-RVC-Fork',
(SELECT id FROM categories WHERE slug = 'voice-cloning-conversion'), 'MIT', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['voice-conversion','rvc','fork','crepe','community'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mangio-rvc');

------------------------------------------------------------
-- AI ANIMATION & MOTION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LivePortrait', 'liveportrait', 'Efficient portrait animation framework for stitching and retargeting.',
'LivePortrait by Kuaishou Technology animates portrait photos with driving videos or audio. Efficient stitching and retargeting pipeline that runs in real-time. High-quality facial animation from a single image. Apache 2.0 license.',
'https://github.com/KwaiVGI/LivePortrait', 'https://github.com/KwaiVGI/LivePortrait',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['animation','portrait','face','real-time','kuaishou','driving'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'liveportrait');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SadTalker', 'sadtalker', 'Audio-driven talking head animation from a single image.',
'SadTalker generates realistic talking head videos from a single image and audio input. Uses 3D motion coefficients for natural head movement and lip sync. By Wenxuan Zhang (Xi''an Jiaotong University). MIT license.',
'https://github.com/OpenTalker/SadTalker', 'https://github.com/OpenTalker/SadTalker',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), 'MIT', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['animation','talking-head','audio-driven','lip-sync','face'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sadtalker');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MuseTalk', 'musetalk', 'Real-time high-quality lip-sync model for audio-driven talking face generation.',
'MuseTalk by Tencent generates real-time lip-synced talking face videos from audio. High-quality mouth region generation that matches speech. Works with any face image. Requires GPU.',
'https://github.com/TMElyralab/MuseTalk', 'https://github.com/TMElyralab/MuseTalk',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 3, true, 6, true, true, true,
ARRAY['animation','lip-sync','talking-face','real-time','tencent','audio'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'musetalk');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Wav2Lip', 'wav2lip', 'Accurately lip-sync videos to any audio using a pre-trained model.',
'Wav2Lip accurately lip-syncs any video to any audio speech. Generates realistic mouth movements that match the spoken words. Pre-trained model requires no training. Widely used for dubbing and content creation.',
'https://github.com/Rudrabha/Wav2Lip', 'https://github.com/Rudrabha/Wav2Lip',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 2, true, 4, true, true, true,
ARRAY['lip-sync','video','audio','dubbing','pre-trained','face'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wav2lip');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'EchoMimic', 'echomimic', 'Audio-driven portrait animation with lifelike expressions and head movements.',
'EchoMimic generates lifelike portrait animations driven by audio input. Produces natural expressions, head movements, and lip sync from a reference image and speech audio. By Ant Group. Apache 2.0 license.',
'https://github.com/BadToBest/EchoMimic', 'https://github.com/BadToBest/EchoMimic',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['animation','portrait','audio-driven','expressions','ant-group'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'echomimic');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Video-Retalking', 'video-retalking', 'Audio-based lip sync editing for talking head videos.',
'Video-Retalking edits the lip movements in existing talking head videos to match new audio. Useful for dubbing, translation, and editing. Achieves high-quality results with pre-trained models. Requires GPU.',
'https://github.com/OpenTalker/video-retalking', 'https://github.com/OpenTalker/video-retalking',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), NULL, 'free', 'local', 3, true, 6, true, true, true,
ARRAY['lip-sync','video-editing','dubbing','talking-head','retalking'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'video-retalking');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'AniPortrait', 'aniportrait', 'Audio and pose-driven portrait animation framework.',
'AniPortrait generates portrait animations driven by audio or pose sequences. Produces high-quality talking face videos with natural head movements. Two-stage pipeline with pose generation and image animation. Apache 2.0 license.',
'https://github.com/Zejun-Yang/AniPortrait', 'https://github.com/Zejun-Yang/AniPortrait',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['animation','portrait','audio-driven','pose-driven','talking-face'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'aniportrait');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DWPose', 'dwpose', 'Effective whole-body pose estimation with few-shot keypoint detection.',
'DWPose is a whole-body pose estimation model achieving strong results on body, hand, and face keypoints. Uses a two-stage distillation approach. Lightweight and fast. Often used as conditioning for ControlNet animations. Apache 2.0 license.',
'https://github.com/IDEA-Research/DWPose', 'https://github.com/IDEA-Research/DWPose',
(SELECT id FROM categories WHERE slug = 'ai-animation-motion'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['pose-estimation','whole-body','keypoints','controlnet','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dwpose');

------------------------------------------------------------
-- DIFFUSION MODEL TOOLS & UIs
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ComfyUI Manager', 'comfyui-manager', 'Extension manager for ComfyUI to install and manage custom nodes.',
'ComfyUI Manager is an essential extension for ComfyUI that provides a GUI for installing, updating, and managing custom nodes. Browse and install from hundreds of community nodes. One-click installation. GPL-3.0 license.',
'https://github.com/ltdrdata/ComfyUI-Manager', 'https://github.com/ltdrdata/ComfyUI-Manager',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'GPL-3.0', 'free', 'local', 1, true, 6, true, true, true,
ARRAY['comfyui','manager','nodes','extensions','install','gui'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'comfyui-manager');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'comfy-pack', 'comfy-pack', 'Tool for packaging ComfyUI workflows into portable standalone applications.',
'comfy-pack packages ComfyUI workflows into portable, standalone applications. Bundles all dependencies, custom nodes, and models for easy sharing and deployment. No ComfyUI installation needed to run. Apache 2.0 license.',
'https://github.com/city96/comfy-pack', 'https://github.com/city96/comfy-pack',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'Apache-2.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['comfyui','packaging','portable','standalone','sharing'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'comfy-pack');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Civitai', 'civitai', 'Open-source platform for sharing and discovering AI-generated models and artwork.',
'Civitai is the largest community platform for sharing Stable Diffusion models (checkpoints, LoRAs, embeddings), workflows, and generated images. Browse thousands of community-created models. Apache 2.0 license for the platform.',
'https://civitai.com', 'https://github.com/civitai/civitai',
(SELECT id FROM categories WHERE slug = 'diffusion-model-tools'), 'Apache-2.0', 'free', 'web', 1, false, NULL, true, false, false,
ARRAY['models','community','sharing','lora','checkpoints','stable-diffusion'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'civitai');

------------------------------------------------------------
-- SUPPLEMENTAL: Additional tools from earlier categories
------------------------------------------------------------

-- Additional TTS tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'VibeVoice', 'vibevoice', 'Neural TTS model by Microsoft with expressive speech synthesis.',
'VibeVoice by Microsoft Research is a neural text-to-speech model focused on expressive and natural speech synthesis. Supports controllable prosody and emotional speech generation. Requires GPU. MIT license.',
'https://github.com/microsoft/VibeVoice', 'https://github.com/microsoft/VibeVoice',
(SELECT id FROM categories WHERE slug = 'text-to-speech'), 'MIT', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['tts','expressive','microsoft','prosody','emotional'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vibevoice');

-- Additional STT tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Wav2Vec 2.0', 'wav2vec2', 'Self-supervised speech representation model by Meta for ASR.',
'Wav2Vec 2.0 by Meta AI learns speech representations from unlabeled audio through self-supervised learning. Fine-tune with just 10 minutes of labeled data for strong ASR. Foundation for many speech models. MIT license.',
'https://github.com/facebookresearch/fairseq', 'https://github.com/facebookresearch/fairseq',
(SELECT id FROM categories WHERE slug = 'speech-to-text'), 'MIT', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['stt','asr','self-supervised','meta','representation','low-resource'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'wav2vec2');

-- Additional Image Gen tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Stable Diffusion 1.5', 'stable-diffusion-1-5', 'The original widely-adopted open-source latent diffusion model by Stability AI.',
'Stable Diffusion 1.5 by Stability AI is the foundational open-source text-to-image model that launched the open diffusion revolution. Generates 512x512 images. Massive community ecosystem of fine-tunes, LoRAs, and tools. Requires GPU with 4+ GB VRAM. CreativeML Open RAIL-M license.',
'https://stability.ai', 'https://github.com/CompVis/stable-diffusion',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'CreativeML Open RAIL-M', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['image-generation','diffusion','sd15','foundational','community','text-to-image'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stable-diffusion-1-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DALL-E Mini (Craiyon)', 'craiyon', 'Open-source text-to-image model that popularized AI image generation.',
'DALL-E Mini (now Craiyon) is an open-source text-to-image model that helped popularize AI image generation. Based on BART and VQGAN. Simpler architecture than diffusion models. Runs on CPU or GPU. Apache 2.0 license.',
'https://www.craiyon.com', 'https://github.com/borisdayma/dalle-mini',
(SELECT id FROM categories WHERE slug = 'image-generation'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['image-generation','text-to-image','bart','vqgan','historic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'craiyon');

-- Additional Video Gen tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'I2VGen-XL', 'i2vgen-xl', 'Image-to-video generation model by Alibaba DAMO Academy.',
'I2VGen-XL by Alibaba DAMO Academy generates high-quality videos from input images. Uses a cascaded approach with semantic and detail stages. Supports various resolutions. Apache 2.0 license.',
'https://github.com/ali-vilab/i2vgen-xl', 'https://github.com/ali-vilab/i2vgen-xl',
(SELECT id FROM categories WHERE slug = 'video-generation'), 'Apache-2.0', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','image-to-video','alibaba','cascaded'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'i2vgen-xl');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ModelScope Text-to-Video', 'modelscope-t2v', 'Text-to-video generation model by Alibaba DAMO Academy on ModelScope.',
'ModelScope text-to-video synthesis model by Alibaba DAMO Academy generates short video clips from text descriptions. One of the first open-source text-to-video models. Requires GPU with 12+ GB VRAM.',
'https://modelscope.cn', 'https://github.com/modelscope/modelscope',
(SELECT id FROM categories WHERE slug = 'video-generation'), NULL, 'free', 'local', 4, true, 12, true, true, true,
ARRAY['video-generation','text-to-video','alibaba','modelscope'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'modelscope-t2v');

-- Additional LLMs
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'StableLM', 'stablelm', 'Open-weight language model family by Stability AI for text generation.',
'StableLM by Stability AI is a family of open-weight language models. Available in 3B and 7B sizes with base and chat variants. Trained on a diverse dataset with good general capabilities. CC-BY-SA-4.0 license.',
'https://stability.ai', 'https://github.com/Stability-AI/StableLM',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'CC-BY-SA-4.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['llm','stability-ai','text-generation','small','general'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'stablelm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MPT', 'mpt-llm', 'Open-source LLM by MosaicML trained for commercial use with 65K context.',
'MPT (MosaicML Pretrained Transformer) is a family of open-source LLMs in 7B and 30B sizes. Trained for commercial use with ALiBi attention supporting 65K context. Efficient training with FlashAttention. Apache 2.0 license.',
'https://www.mosaicml.com', 'https://huggingface.co/mosaicml/mpt-7b',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','mosaicml','commercial','alibi','long-context'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mpt-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'RedPajama', 'redpajama', 'Open-source reproduction of LLaMA training dataset and models.',
'RedPajama by Together AI is an open-source effort to reproduce the LLaMA training data and models. Includes RedPajama-Data (1.2T tokens) and RedPajama-INCITE models (3B, 7B). Fully open training pipeline. Apache 2.0 license.',
'https://www.together.ai/blog/redpajama', 'https://github.com/togethercomputer/RedPajama-Data',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','dataset','training','open-data','together-ai','reproduction'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'redpajama');

-- Additional NLP tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TextBlob', 'textblob', 'Simple Python library for processing textual data with NLP tasks.',
'TextBlob provides a simple API for common NLP tasks: part-of-speech tagging, noun phrase extraction, sentiment analysis, classification, translation, and more. Built on NLTK and Pattern. MIT license.',
'https://textblob.readthedocs.io', 'https://github.com/sloria/TextBlob',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['nlp','sentiment','classification','simple','python','beginner'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'textblob');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Botpress', 'botpress', 'Open-source platform for building conversational AI chatbots.',
'Botpress is an open-source platform for building conversational AI chatbots. Visual flow editor, NLU engine, multi-channel deployment, and built-in analytics. Supports custom actions and integrations. MIT license.',
'https://botpress.com', 'https://github.com/botpress/botpress',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['chatbot','conversational-ai','nlu','visual-editor','multi-channel'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'botpress');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Langdetect', 'langdetect', 'Language detection library ported from Google language-detection.',
'Langdetect is a Python port of Google''s language-detection library. Detects 55 languages from text input using a naive Bayesian filter. Lightweight and fast. Apache 2.0 license.',
'https://github.com/Mimino666/langdetect', 'https://github.com/Mimino666/langdetect',
(SELECT id FROM categories WHERE slug = 'natural-language-processing'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['nlp','language-detection','lightweight','google','55-languages'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'langdetect');

-- Additional Music/Audio
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Moûsai', 'mousai', 'Text-to-music generation model using cascaded latent diffusion.',
'Moûsai is a text-to-music generation model using cascaded latent diffusion. Generates long-form music from text descriptions at 48kHz stereo. Efficient architecture for high-quality audio. Research release.',
'https://github.com/archinetai/audio-diffusion-pytorch', 'https://github.com/archinetai/audio-diffusion-pytorch',
(SELECT id FROM categories WHERE slug = 'music-audio-generation'), NULL, 'free', 'local', 4, true, 8, true, true, true,
ARRAY['music','text-to-music','diffusion','cascaded','48khz'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mousai');

-- Additional 3D tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GaussianDreamer', 'gaussiandreamer', 'Text-to-3D generation using Gaussian Splatting with multi-view guidance.',
'GaussianDreamer generates 3D content using Gaussian Splatting with multi-view diffusion guidance. Produces detailed 3D assets from text prompts. Combines 3D and 2D diffusion priors for quality. MIT license.',
'https://github.com/hustvl/GaussianDreamer', 'https://github.com/hustvl/GaussianDreamer',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'MIT', 'free', 'local', 4, true, 12, true, true, true,
ARRAY['3d','gaussian-splatting','text-to-3d','multi-view','diffusion'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gaussiandreamer');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SyncDreamer', 'syncdreamer', 'Generates consistent multi-view images from a single view for 3D reconstruction.',
'SyncDreamer generates multiview-consistent images from a single-view image by synchronizing multiple diffusion processes. Produces 16 consistent views for downstream 3D reconstruction. Apache 2.0 license.',
'https://github.com/liuyuan-pal/SyncDreamer', 'https://github.com/liuyuan-pal/SyncDreamer',
(SELECT id FROM categories WHERE slug = '3d-model-generation'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['3d','multi-view','consistent','diffusion','reconstruction'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'syncdreamer');

-- Additional OCR tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'pdf2image', 'pdf2image', 'Simple Python library to convert PDF pages to images using Poppler.',
'pdf2image is a simple Python module that converts PDF pages to PIL Image objects using pdftoppm (Poppler). Useful as a preprocessing step for OCR pipelines. Lightweight with minimal dependencies. MIT license.',
'https://github.com/Belval/pdf2image', 'https://github.com/Belval/pdf2image',
(SELECT id FROM categories WHERE slug = 'ocr-document-processing'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['pdf','image','conversion','poppler','preprocessing','simple'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'pdf2image');

-- Additional Agent tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mem0', 'mem0', 'Memory layer for AI assistants enabling persistent personalized interactions.',
'Mem0 provides a memory layer for AI applications. Adds persistent, personalized memory to LLM agents and assistants. Stores user preferences, facts, and context across conversations. Apache 2.0 license.',
'https://mem0.ai', 'https://github.com/mem0ai/mem0',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['memory','agents','personalization','persistent','context'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mem0');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Rivet', 'rivet', 'Visual AI programming environment for building AI agent workflows.',
'Rivet by Ironclad is a visual programming environment for building, testing, and debugging complex AI agent workflows. Node-based editor for chaining LLM calls, conditions, and data transformations. MIT license.',
'https://rivet.ironcladapp.com', 'https://github.com/Ironclad/rivet',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'MIT', 'free', 'local', 2, false, NULL, true, true, false,
ARRAY['visual','programming','agents','workflow','debugging','ironclad'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rivet');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LMQL', 'lmql', 'Programming language for LLM interaction with constraints and control flow.',
'LMQL is a programming language for LLM interaction. Combines natural language prompting with Python-like control flow and constraints. Enables type-safe, structured LLM outputs. Apache 2.0 license by ETH Zurich.',
'https://lmql.ai', 'https://github.com/eth-sri/lmql',
(SELECT id FROM categories WHERE slug = 'ai-agents-orchestration'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['programming-language','llm','constraints','control-flow','eth-zurich'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lmql');

-- Additional Vector DB tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ScaNN', 'scann', 'Efficient vector similarity search library by Google Research.',
'ScaNN (Scalable Nearest Neighbors) by Google Research provides efficient vector similarity search. Uses learned quantization and partitioning for high recall with low latency. Handles billion-scale datasets. Apache 2.0 license.',
'https://github.com/google-research/google-research/tree/master/scann', 'https://github.com/google-research/google-research',
(SELECT id FROM categories WHERE slug = 'vector-databases-embeddings'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['similarity-search','google','efficient','quantization','billion-scale'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'scann');

-- Additional Deployment tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MLEM', 'mlem', 'Tool for packaging and deploying ML models by iterative.ai.',
'MLEM by iterative.ai (makers of DVC) helps package and deploy ML models. Saves models with metadata, builds Docker containers, and deploys to various platforms. Integrates with DVC for versioning. Apache 2.0 license.',
'https://mlem.ai', 'https://github.com/iterative/mlem',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['packaging','deployment','docker','iterative','dvc','models'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mlem');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Cortex', 'cortex-ai', 'Local AI API platform that runs LLMs on your hardware with OpenAI-compatible API.',
'Cortex is a local AI API platform that runs LLMs and other models on your hardware. Provides an OpenAI-compatible API for easy integration. Supports llama.cpp and ONNX backends. By Jan AI. Apache 2.0 license.',
'https://cortex.so', 'https://github.com/janhq/cortex.cpp',
(SELECT id FROM categories WHERE slug = 'ai-deployment-mlops'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['api','local','openai-compatible','llm','serving','jan'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cortex-ai');

-- Additional RAG tools
INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Indexify', 'indexify', 'Open-source data extraction and indexing engine for RAG applications.',
'Indexify is an open-source extraction and indexing engine for building RAG applications. Supports real-time extraction from documents, images, and audio. Scales with Kubernetes. Apache 2.0 license by Tensorlake.',
'https://getindexify.ai', 'https://github.com/tensorlakeai/indexify',
(SELECT id FROM categories WHERE slug = 'rag-document-retrieval'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, false,
ARRAY['rag','extraction','indexing','real-time','kubernetes','tensorlake'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'indexify');
