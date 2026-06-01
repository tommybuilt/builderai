-- Batch 3: Computer Vision, Large Language Models, LLM Inference & Serving
-- All tools are real open-source projects. ON CONFLICT (slug) DO NOTHING.

------------------------------------------------------------
-- COMPUTER VISION & OBJECT DETECTION
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Ultralytics YOLO', 'ultralytics-yolo', 'State-of-the-art real-time object detection supporting YOLOv5 through v11.',
'Ultralytics provides the most popular YOLO implementations including v5, v8, v9, v10, and v11. Supports detection, segmentation, classification, pose estimation, and tracking. Simple Python API and CLI. Runs on GPU or CPU. AGPL-3.0 license.',
'https://ultralytics.com', 'https://github.com/ultralytics/ultralytics',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'AGPL-3.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['object-detection','yolo','segmentation','tracking','pose'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ultralytics-yolo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'YOLO-World', 'yolo-world', 'Open-vocabulary real-time object detection using YOLO with text prompts.',
'YOLO-World combines YOLO with vision-language modeling for open-vocabulary detection. Detect any object using text descriptions without retraining. Real-time speed. By Tencent AI Lab. GPL-3.0 license.',
'https://github.com/AILab-CVC/YOLO-World', 'https://github.com/AILab-CVC/YOLO-World',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'GPL-3.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['object-detection','yolo','open-vocabulary','text-prompt','tencent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'yolo-world');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Grounding DINO', 'grounding-dino', 'Open-set object detection combining DINO with grounded pre-training.',
'Grounding DINO by IDEA Research detects arbitrary objects specified by text prompts without category-specific training. Achieves 52.5 AP on COCO zero-shot. Pairs well with SAM for grounded segmentation. Apache 2.0 license.',
'https://github.com/IDEA-Research/GroundingDINO', 'https://github.com/IDEA-Research/GroundingDINO',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['object-detection','open-set','text-prompt','grounding','zero-shot'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'grounding-dino');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Segment Anything 2 (SAM 2)', 'segment-anything-2', 'Foundation model by Meta for promptable image and video segmentation.',
'SAM 2 by Meta is a foundation model for promptable segmentation in images and videos. Supports point, box, and mask prompts. Handles arbitrary objects without training. Extends to video with streaming memory. Requires GPU with 8+ GB VRAM. Apache 2.0 license.',
'https://github.com/facebookresearch/sam2', 'https://github.com/facebookresearch/sam2',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['segmentation','foundation-model','meta','promptable','video','sam'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'segment-anything-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Florence-2', 'florence-2', 'Unified vision foundation model by Microsoft for captioning, detection, and segmentation.',
'Florence-2 by Microsoft handles multiple vision tasks through a unified sequence-to-sequence architecture. Supports captioning, object detection, grounding, OCR, and segmentation using text prompts. Lightweight yet powerful. MIT license.',
'https://huggingface.co/microsoft/Florence-2-large', 'https://huggingface.co/microsoft/Florence-2-large',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['vision','foundation-model','microsoft','captioning','detection','ocr'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'florence-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Detectron2', 'detectron2', 'Meta AI research platform for object detection, segmentation, and pose estimation.',
'Detectron2 by Meta AI is a modular computer vision library for object detection, instance/panoptic segmentation, keypoint detection, and more. Built on PyTorch with a flexible config system. Supports many architectures including Faster R-CNN, Mask R-CNN. Apache 2.0 license.',
'https://github.com/facebookresearch/detectron2', 'https://github.com/facebookresearch/detectron2',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['object-detection','segmentation','pose','meta','pytorch','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'detectron2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DETR', 'detr', 'End-to-end object detection with transformers by Meta, eliminating hand-designed components.',
'DETR (Detection Transformer) by Meta uses a transformer encoder-decoder architecture for end-to-end object detection. Eliminates NMS, anchors, and other hand-designed components. Simple yet effective. Apache 2.0 license.',
'https://github.com/facebookresearch/detr', 'https://github.com/facebookresearch/detr',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['object-detection','transformer','end-to-end','meta','research'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'detr');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MMDetection', 'mmdetection', 'OpenMMLab detection toolbox with 300+ pre-trained models and 80+ algorithms.',
'MMDetection is an open-source object detection toolbox by OpenMMLab. Contains 80+ detection algorithms and 300+ pre-trained models including Faster R-CNN, YOLOX, DINO, and more. Modular design for research and production. Apache 2.0 license.',
'https://github.com/open-mmlab/mmdetection', 'https://github.com/open-mmlab/mmdetection',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['object-detection','toolbox','openmmlab','research','pre-trained'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mmdetection');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenCV', 'opencv', 'The most widely-used open-source computer vision library with 2500+ algorithms.',
'OpenCV (Open Source Computer Vision Library) provides 2500+ optimized algorithms for image processing, video analysis, object detection, face recognition, and more. Supports C++, Python, Java. Runs on all platforms including mobile and embedded. Apache 2.0 license.',
'https://opencv.org', 'https://github.com/opencv/opencv',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['computer-vision','image-processing','video','classic','cross-platform'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'opencv');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Supervision', 'supervision', 'Reusable computer vision tools for detection, tracking, and annotation by Roboflow.',
'Supervision by Roboflow provides reusable utilities for computer vision: bounding box annotation, tracking, zone counting, heatmaps, and more. Works with any detection model (YOLO, SAM, DINO). Python library. MIT license.',
'https://supervision.roboflow.com', 'https://github.com/roboflow/supervision',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['computer-vision','annotation','tracking','utility','roboflow'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'supervision');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CLIP', 'clip-openai', 'Contrastive language-image pre-training model by OpenAI for zero-shot visual classification.',
'CLIP (Contrastive Language-Image Pre-Training) by OpenAI learns visual concepts from natural language descriptions. Enables zero-shot image classification, image-text similarity, and visual search without task-specific training. Foundation for many downstream tools. MIT license.',
'https://github.com/openai/CLIP', 'https://github.com/openai/CLIP',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['vision-language','zero-shot','classification','openai','embeddings'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'clip-openai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DINOv2', 'dinov2', 'Self-supervised vision transformer by Meta producing universal visual features.',
'DINOv2 by Meta AI produces universal visual features through self-supervised learning on 142M images. Works as a visual backbone for classification, segmentation, depth estimation, and retrieval without fine-tuning. Apache 2.0 license.',
'https://github.com/facebookresearch/dinov2', 'https://github.com/facebookresearch/dinov2',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['vision','self-supervised','features','meta','backbone'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'dinov2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Depth Anything V2', 'depth-anything-v2', 'Monocular depth estimation model producing detailed depth maps from single images.',
'Depth Anything V2 estimates depth from single images with high detail and accuracy. Available in small, base, and large variants. Useful for 3D reconstruction, autonomous driving, and AR applications. By TikTok/ByteDance. Apache 2.0 license.',
'https://github.com/DepthAnything/Depth-Anything-V2', 'https://github.com/DepthAnything/Depth-Anything-V2',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['depth-estimation','monocular','3d','bytedance'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'depth-anything-v2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MiDaS', 'midas', 'Monocular depth estimation model by Intel ISL supporting multiple backbones.',
'MiDaS (Monocular Depth estimation in the wild using Semantic cues) by Intel ISL estimates depth from single images. Supports multiple backbone architectures. Robust across diverse scenes. Runs on GPU or CPU. MIT license.',
'https://github.com/isl-org/MiDaS', 'https://github.com/isl-org/MiDaS',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['depth-estimation','monocular','intel','robust'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'midas');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MediaPipe', 'mediapipe', 'Cross-platform ML solutions by Google for face, hand, pose, and object detection.',
'MediaPipe by Google provides production-ready cross-platform ML solutions for face detection/mesh, hand tracking, pose estimation, object detection, and more. Runs on mobile, web, and desktop with hardware acceleration. Apache 2.0 license.',
'https://mediapipe.dev', 'https://github.com/google-ai-edge/mediapipe',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'hybrid', 1, false, NULL, true, true, true,
ARRAY['face','hand','pose','google','mobile','cross-platform','real-time'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mediapipe');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepFace', 'deepface', 'Lightweight face recognition and analysis framework wrapping multiple models.',
'DeepFace is a lightweight Python framework for face recognition and facial attribute analysis. Wraps VGG-Face, FaceNet, OpenFace, DeepID, ArcFace, Dlib, and SFace models. Provides a unified API for verification, recognition, and analysis. MIT license.',
'https://github.com/serengil/deepface', 'https://github.com/serengil/deepface',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['face-recognition','face-analysis','verification','python','wrapper'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepface');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InsightFace', 'insightface', 'Open-source face analysis toolbox for recognition, detection, and alignment.',
'InsightFace is an open-source 2D and 3D face analysis toolbox. Includes state-of-the-art face detection (RetinaFace), recognition (ArcFace), alignment, and 3D face reconstruction. By DeepInsight. MIT license.',
'https://insightface.ai', 'https://github.com/deepinsight/insightface',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['face-recognition','face-detection','arcface','retinaface','3d-face'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'insightface');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OpenPose', 'openpose', 'Real-time multi-person pose estimation by CMU for body, hand, and face keypoints.',
'OpenPose by Carnegie Mellon University is the first real-time multi-person system for body, foot, hand, and facial keypoint detection. Runs on GPU with CUDA. Used in research and creative applications. Custom non-commercial license.',
'https://github.com/CMU-Perceptual-Computing-Lab/openpose', 'https://github.com/CMU-Perceptual-Computing-Lab/openpose',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Custom', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['pose-estimation','body','hand','face','keypoints','cmu','real-time'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'openpose');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'RTMPose', 'rtmpose', 'Real-time multi-person pose estimation by OpenMMLab with high accuracy.',
'RTMPose by OpenMMLab achieves real-time multi-person pose estimation with high accuracy. Part of the MMPose framework. Supports body, hand, face, and whole-body keypoints. Optimized for deployment. Apache 2.0 license.',
'https://github.com/open-mmlab/mmpose', 'https://github.com/open-mmlab/mmpose',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['pose-estimation','real-time','openmmlab','mmpose','body','hand'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rtmpose');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ByteTrack', 'bytetrack', 'Simple and effective multi-object tracking using every detection box.',
'ByteTrack is a multi-object tracking method that associates every detection box, including low-confidence ones. Achieves state-of-the-art tracking performance with simple association logic. Works with any detector. MIT license.',
'https://github.com/ifzhang/ByteTrack', 'https://github.com/ifzhang/ByteTrack',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'MIT', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['tracking','multi-object','detection','simple','efficient'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bytetrack');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SigLIP', 'siglip', 'Improved vision-language model by Google using sigmoid loss for contrastive learning.',
'SigLIP by Google replaces the softmax loss in CLIP with a sigmoid loss, enabling better scaling and performance. Produces strong image-text embeddings for zero-shot classification and retrieval. Available via Hugging Face. Apache 2.0 license.',
'https://huggingface.co/google/siglip-so400m-patch14-384', 'https://github.com/google-research/big_vision',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['vision-language','embeddings','google','zero-shot','contrastive'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'siglip');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OWL-ViT', 'owl-vit', 'Open-vocabulary object detection model by Google using vision transformers.',
'OWL-ViT (Vision Transformer for Open-World Localization) by Google enables open-vocabulary object detection using text queries. Transfers CLIP to detection without task-specific training data. Apache 2.0 license.',
'https://huggingface.co/google/owlvit-base-patch32', 'https://github.com/google-research/scenic',
(SELECT id FROM categories WHERE slug = 'computer-vision'), 'Apache-2.0', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['object-detection','open-vocabulary','vision-transformer','google','clip'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'owl-vit');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Track Anything', 'track-anything', 'Interactive tool for tracking and segmenting any object in video.',
'Track Anything combines SAM (Segment Anything) with video object tracking models. Users click to select objects in the first frame, then the tool tracks and segments them through the entire video. Requires GPU.',
'https://github.com/gaomingqi/Track-Anything', 'https://github.com/gaomingqi/Track-Anything',
(SELECT id FROM categories WHERE slug = 'computer-vision'), NULL, 'free', 'local', 3, true, 8, true, true, true,
ARRAY['tracking','segmentation','video','interactive','sam'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'track-anything');

------------------------------------------------------------
-- LARGE LANGUAGE MODELS (LLMs)
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Llama 3.1', 'llama-3-1', 'Open-weight LLM by Meta available in 8B, 70B, and 405B parameter sizes.',
'Llama 3.1 by Meta is an open-weight large language model available in 8B, 70B, and 405B parameter variants. Supports 128K context length, tool use, and multilingual capabilities. State-of-the-art open model performance. Llama 3.1 Community License.',
'https://llama.meta.com', 'https://github.com/meta-llama/llama3',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Llama 3.1 Community', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','meta','llama','multilingual','tool-use','128k-context'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-3-1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Llama 4', 'llama-4', 'Latest Llama model family by Meta with Mixture-of-Experts architecture.',
'Llama 4 by Meta introduces Scout (17B active / 109B total) and Maverick (17B active / 400B total) variants using Mixture-of-Experts. Supports 10M+ context length (Scout), multimodal input, and 12 languages. Llama 4 Community License.',
'https://llama.meta.com', 'https://github.com/meta-llama/llama4',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Llama 4 Community', 'free', 'local', 4, true, 16, true, true, true,
ARRAY['llm','meta','llama','moe','multimodal','long-context'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-4');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mistral / Mixtral', 'mistral-mixtral', 'High-performance open-weight LLMs by Mistral AI with MoE architecture.',
'Mistral AI produces Mistral 7B (dense) and Mixtral 8x7B/8x22B (Mixture-of-Experts) open-weight models. Known for excellent performance-to-size ratio. Supports function calling and 32K context. Apache 2.0 license.',
'https://mistral.ai', 'https://github.com/mistralai/mistral-inference',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','mistral','mixtral','moe','efficient','function-calling'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mistral-mixtral');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Qwen 2.5 / Qwen 3', 'qwen-llm', 'Open-weight LLM family by Alibaba with strong multilingual and coding abilities.',
'Qwen by Alibaba Cloud is an open-weight LLM family. Qwen 2.5 offers 0.5B to 72B sizes. Qwen 3 adds hybrid thinking modes (thinking/non-thinking). Strong multilingual support (29+ languages) and coding abilities. Apache 2.0 license.',
'https://qwenlm.github.io', 'https://github.com/QwenLM/Qwen2.5',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','qwen','alibaba','multilingual','coding','thinking'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'qwen-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepSeek-V3', 'deepseek-v3', 'High-performance open-weight MoE LLM with 671B total parameters.',
'DeepSeek-V3 is an open-weight Mixture-of-Experts LLM with 671B total parameters (37B active). Achieves performance competitive with GPT-4o and Claude 3.5 Sonnet on benchmarks. Trained efficiently using FP8 mixed precision. DeepSeek License.',
'https://www.deepseek.com', 'https://github.com/deepseek-ai/DeepSeek-V3',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'DeepSeek License', 'free', 'local', 4, true, 24, true, true, true,
ARRAY['llm','deepseek','moe','671b','efficient-training','fp8'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepseek-v3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepSeek-R1', 'deepseek-r1', 'Reasoning-focused open-weight LLM with chain-of-thought capabilities.',
'DeepSeek-R1 is a reasoning-focused model trained with reinforcement learning to produce explicit chain-of-thought reasoning. Achieves strong math, coding, and reasoning performance. Available in multiple distilled sizes (1.5B to 70B). MIT license.',
'https://www.deepseek.com', 'https://github.com/deepseek-ai/DeepSeek-R1',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'MIT', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','deepseek','reasoning','chain-of-thought','math','coding'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepseek-r1');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Gemma 3', 'gemma-3', 'Lightweight open-weight LLM by Google available in 1B to 27B sizes.',
'Gemma 3 by Google DeepMind is a lightweight open model family in 1B, 4B, 12B, and 27B sizes. Supports 128K context, multimodal input (images), function calling, and 35+ languages. Runs efficiently on single GPUs. Gemma license.',
'https://ai.google.dev/gemma', 'https://github.com/google-deepmind/gemma',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Gemma License', 'free', 'local', 2, true, 4, true, true, true,
ARRAY['llm','google','gemma','lightweight','multimodal','function-calling'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gemma-3');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Phi-4', 'phi-4', 'Small language model by Microsoft with strong reasoning for its size.',
'Phi-4 by Microsoft Research is a 14B parameter model achieving performance competitive with much larger models on reasoning, math, and coding tasks. Uses synthetic data and curriculum training. MIT license.',
'https://huggingface.co/microsoft/phi-4', 'https://huggingface.co/microsoft/phi-4',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'MIT', 'free', 'local', 2, true, 8, true, true, true,
ARRAY['llm','microsoft','phi','small','reasoning','math','coding'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'phi-4');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Command R+', 'command-r-plus', 'Retrieval-augmented generation optimized LLM by Cohere with 128K context.',
'Command R+ by Cohere is a 104B parameter model optimized for RAG and tool use. Features 128K context, multi-step tool use, and strong multilingual support (10 languages). CC-BY-NC license.',
'https://huggingface.co/CohereForAI/c4ai-command-r-plus', 'https://huggingface.co/CohereForAI/c4ai-command-r-plus',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'CC-BY-NC', 'free', 'local', 4, true, 24, true, true, true,
ARRAY['llm','cohere','rag','tool-use','multilingual','128k-context'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'command-r-plus');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Yi', 'yi-llm', 'Open-weight bilingual LLM by 01.AI in 6B and 34B sizes.',
'Yi by 01.AI is an open-weight bilingual (Chinese/English) LLM available in 6B and 34B sizes. Strong performance on both Chinese and English benchmarks. Extended context support up to 200K tokens. Apache 2.0 license.',
'https://github.com/01-ai/Yi', 'https://github.com/01-ai/Yi',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','01ai','bilingual','chinese','english','long-context'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'yi-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'InternLM 2.5', 'internlm-2-5', 'Open-weight LLM by Shanghai AI Lab with strong reasoning and tool use.',
'InternLM 2.5 by Shanghai AI Lab is an open-weight LLM available in 7B and 20B sizes. Excels at reasoning, math, code, and tool use. Supports 1M token context through dynamic NTK scaling. Apache 2.0 license.',
'https://github.com/InternLM/InternLM', 'https://github.com/InternLM/InternLM',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','internlm','shanghai-ai-lab','reasoning','tool-use','long-context'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'internlm-2-5');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GLM-4', 'glm-4', 'Open-weight bilingual LLM by Zhipu AI with multimodal capabilities.',
'GLM-4 by Zhipu AI / Tsinghua University is a bilingual (Chinese/English) LLM with 9B parameters. Supports function calling, code execution, and multimodal input. GLM-4-9B-Chat is the open-weight version. Apache 2.0 license.',
'https://github.com/THUDM/GLM-4', 'https://github.com/THUDM/GLM-4',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','glm','zhipu','tsinghua','bilingual','multimodal'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'glm-4');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'BLOOM', 'bloom-llm', 'Open-access 176B parameter multilingual LLM by BigScience supporting 46 languages.',
'BLOOM is a 176 billion parameter open-access multilingual LLM trained by BigScience (1000+ researchers). Supports 46 natural languages and 13 programming languages. One of the first truly open large language models. RAIL license.',
'https://huggingface.co/bigscience/bloom', 'https://github.com/bigscience-workshop/bigscience',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'RAIL', 'free', 'local', 5, true, 80, true, true, true,
ARRAY['llm','bloom','bigscience','multilingual','176b','open-access'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'bloom-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Falcon', 'falcon-llm', 'Open-weight LLM by TII achieving top performance with efficient training.',
'Falcon by Technology Innovation Institute (TII) is an open-weight LLM in 7B, 40B, and 180B sizes. Trained on the RefinedWeb dataset. Known for efficient training and strong performance. Apache 2.0 license.',
'https://falconllm.tii.ae', 'https://huggingface.co/tiiuae/falcon-180B',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','falcon','tii','refinedweb','efficient'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'falcon-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TinyLlama', 'tinyllama', 'Compact 1.1B parameter LLM pre-trained on 3 trillion tokens.',
'TinyLlama is a compact 1.1 billion parameter language model pre-trained on 3 trillion tokens. Uses the Llama 2 architecture at a smaller scale. Suitable for edge deployment, research, and applications with limited compute. Apache 2.0 license.',
'https://github.com/jzhang38/TinyLlama', 'https://github.com/jzhang38/TinyLlama',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['llm','tiny','1b','edge','efficient','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tinyllama');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SmolLM', 'smollm', 'Family of small language models by Hugging Face for on-device use.',
'SmolLM by Hugging Face is a family of small language models (135M, 360M, 1.7B) designed for on-device and edge use. Trained on high-quality curated data. Strong performance for their size class. Apache 2.0 license.',
'https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B', 'https://github.com/huggingface/smollm',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['llm','small','edge','on-device','huggingface','lightweight'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'smollm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'RWKV', 'rwkv', 'RNN-based language model with transformer-level performance and linear scaling.',
'RWKV is a language model architecture combining RNN efficiency with transformer performance. Runs with linear memory and compute scaling, enabling very long context. Available in 0.1B to 14B sizes. Apache 2.0 license by BlinkDL.',
'https://www.rwkv.com', 'https://github.com/BlinkDL/RWKV-LM',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 4, true, true, true,
ARRAY['llm','rnn','linear-scaling','efficient','long-context','alternative'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'rwkv');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Mamba', 'mamba-ssm', 'State-space model for language with linear-time sequence modeling.',
'Mamba is a selective state-space model (SSM) architecture for language modeling that achieves linear-time sequence processing. Matches or exceeds transformer performance on various benchmarks while being faster at inference. By Albert Gu and Tri Dao. Apache 2.0 license.',
'https://github.com/state-spaces/mamba', 'https://github.com/state-spaces/mamba',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['llm','ssm','state-space','linear-time','efficient','alternative'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mamba-ssm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'OLMo', 'olmo', 'Fully open language model by AI2 with open data, code, and training logs.',
'OLMo (Open Language Model) by AI2 (Allen Institute for AI) is a truly open language model. Everything is released: training data (Dolma), training code, model weights, and evaluation tools. Available in 1B and 7B sizes. Apache 2.0 license.',
'https://allenai.org/olmo', 'https://github.com/allenai/OLMo',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','ai2','fully-open','training-data','research','transparent'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'olmo');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'StarCoder 2', 'starcoder-2', 'Open-weight code LLM by BigCode trained on 600+ programming languages.',
'StarCoder 2 by BigCode (Hugging Face + ServiceNow) is an open code LLM in 3B, 7B, and 15B sizes. Trained on The Stack v2 covering 600+ programming languages. Supports fill-in-the-middle and 16K context. BigCode OpenRAIL-M license.',
'https://github.com/bigcode-project/starcoder2', 'https://github.com/bigcode-project/starcoder2',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'BigCode OpenRAIL-M', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','code','bigcode','programming','fill-in-middle'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'starcoder-2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CodeLlama', 'codellama', 'Code-specialized Llama model by Meta for code generation and understanding.',
'CodeLlama by Meta is a family of code-specialized LLMs based on Llama 2. Available in 7B, 13B, and 34B sizes with base, Python, and Instruct variants. Supports infilling and 100K context. Llama 2 Community License.',
'https://github.com/meta-llama/codellama', 'https://github.com/meta-llama/codellama',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Llama 2 Community', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','code','meta','python','infilling','code-generation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'codellama');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'DeepSeek-Coder', 'deepseek-coder', 'Open-weight code LLM trained on 2 trillion tokens of code and natural language.',
'DeepSeek-Coder is a code-focused LLM trained on 2 trillion tokens comprising 87% code and 13% natural language. Available in 1.3B, 6.7B, and 33B sizes. Supports 16K context with fill-in-the-blank and cross-file completion. DeepSeek License.',
'https://github.com/deepseek-ai/DeepSeek-Coder', 'https://github.com/deepseek-ai/DeepSeek-Coder',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'DeepSeek License', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','code','deepseek','programming','fill-in-blank'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'deepseek-coder');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Granite Code', 'granite-code', 'Open-source code LLM family by IBM for enterprise code generation.',
'Granite Code by IBM is a family of code LLMs in 3B, 8B, 20B, and 34B sizes. Trained on 116 programming languages. Strong performance on code generation, debugging, and explanation. Enterprise-ready with Apache 2.0 license.',
'https://github.com/ibm-granite/granite-code-models', 'https://github.com/ibm-granite/granite-code-models',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','code','ibm','granite','enterprise','116-languages'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'granite-code');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MiniCPM', 'minicpm', 'Compact edge-deployable LLM family by OpenBMB with strong performance per parameter.',
'MiniCPM by OpenBMB is a family of compact language models (1.2B, 2.4B) achieving performance comparable to larger models. Designed for edge and mobile deployment. Supports multimodal input in MiniCPM-V. Apache 2.0 license.',
'https://github.com/OpenBMB/MiniCPM', 'https://github.com/OpenBMB/MiniCPM',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['llm','compact','edge','mobile','openbmb','efficient'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'minicpm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Vicuna', 'vicuna', 'Fine-tuned LLaMA model by LMSYS achieving 90% ChatGPT quality.',
'Vicuna by LMSYS is a chatbot model fine-tuned from LLaMA on ShareGPT conversations. Achieved ~90% of ChatGPT quality in early evaluations. Available in 7B and 13B sizes. Foundational work in open-source chat models. Llama license.',
'https://lmsys.org/blog/2023-03-30-vicuna/', 'https://github.com/lm-sys/FastChat',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Llama License', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['llm','chat','lmsys','fine-tuned','shareGPT','vicuna'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vicuna');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Jamba', 'jamba', 'Hybrid SSM-Transformer model by AI21 Labs combining Mamba with attention layers.',
'Jamba by AI21 Labs is a hybrid architecture combining Mamba state-space layers with Transformer attention layers and MoE. Achieves strong performance with 256K context and efficient inference. Available in 1.5-Mini (12B active). Apache 2.0 license.',
'https://huggingface.co/ai21labs/AI21-Jamba-1.5-Mini', 'https://huggingface.co/ai21labs/AI21-Jamba-1.5-Mini',
(SELECT id FROM categories WHERE slug = 'large-language-models'), 'Apache-2.0', 'free', 'local', 3, true, 12, true, true, true,
ARRAY['llm','ai21','hybrid','mamba','transformer','moe','long-context'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'jamba');

------------------------------------------------------------
-- LLM INFERENCE & SERVING
------------------------------------------------------------

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Ollama', 'ollama', 'Run large language models locally with a simple command-line interface.',
'Ollama makes it easy to run open-source LLMs locally. Simple one-command model downloading and serving. Built-in model library with Llama, Mistral, Gemma, Phi, and more. REST API for integration. Supports macOS, Linux, Windows. MIT license.',
'https://ollama.com', 'https://github.com/ollama/ollama',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['inference','local','cli','easy','llama','mistral','api'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ollama');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'llama.cpp', 'llama-cpp', 'High-performance C/C++ LLM inference engine with broad hardware support.',
'llama.cpp by Georgi Gerganov enables LLM inference in C/C++ with no dependencies. Supports CPU (AVX, ARM NEON), GPU (CUDA, Metal, Vulkan), and quantization (GGUF format). Foundation for Ollama and many other tools. MIT license.',
'https://github.com/ggerganov/llama.cpp', 'https://github.com/ggerganov/llama.cpp',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['inference','cpp','cpu','gpu','quantization','gguf','foundation'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-cpp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'vLLM', 'vllm', 'High-throughput LLM serving engine with PagedAttention for efficient memory use.',
'vLLM is a high-throughput LLM serving engine using PagedAttention for near-zero memory waste. Supports continuous batching, tensor parallelism, and many model architectures. 2-4x higher throughput than HF Transformers. Apache 2.0 license by UC Berkeley.',
'https://vllm.ai', 'https://github.com/vllm-project/vllm',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['inference','serving','high-throughput','paged-attention','production','gpu'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'vllm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LM Studio', 'lm-studio', 'Desktop application for discovering, downloading, and running local LLMs.',
'LM Studio is a desktop application for running LLMs locally. Provides a GUI for model discovery, downloading, and chat. Supports GGUF models with llama.cpp backend. Auto-detects hardware and optimizes settings. Free for personal use. macOS, Windows, Linux.',
'https://lmstudio.ai', 'https://github.com/lmstudio-ai',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), NULL, 'free', 'local', 1, false, NULL, false, true, true,
ARRAY['inference','desktop','gui','local','gguf','easy','chat'], true, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'lm-studio');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Jan', 'jan-ai', 'Open-source ChatGPT alternative that runs 100% offline on your computer.',
'Jan is an open-source desktop application providing a ChatGPT-like interface for local LLMs. Runs 100% offline with local model management. Supports Llama, Mistral, and other GGUF models. Extensions system for customization. AGPL-3.0 license.',
'https://jan.ai', 'https://github.com/janhq/jan',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'AGPL-3.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['inference','desktop','offline','chat','gui','privacy'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'jan-ai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'GPT4All', 'gpt4all', 'Open-source ecosystem for running LLMs locally on consumer hardware.',
'GPT4All by Nomic AI is an ecosystem for running LLMs on consumer-grade CPUs and GPUs. Includes a desktop chat application, Python SDK, and model library. Supports quantized models for low-resource hardware. MIT license.',
'https://gpt4all.io', 'https://github.com/nomic-ai/gpt4all',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['inference','local','desktop','cpu','consumer-hardware','nomic'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'gpt4all');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Llamafile', 'llamafile', 'Single-file executable LLMs by Mozilla that run on any OS without installation.',
'Llamafile by Mozilla packages an LLM with llama.cpp into a single executable file that runs on Windows, macOS, Linux, and more without any installation. Just download and double-click. Built on Cosmopolitan Libc. Apache 2.0 license.',
'https://github.com/Mozilla-Ocho/llamafile', 'https://github.com/Mozilla-Ocho/llamafile',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['inference','single-file','portable','mozilla','no-install','cross-platform'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llamafile');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'LocalAI', 'localai', 'Drop-in OpenAI-compatible API server for running LLMs, image, and audio models locally.',
'LocalAI is a self-hosted, OpenAI API-compatible server for running LLMs, generating images, audio, and embeddings locally. Supports GGUF, GPTQ, and other formats. No GPU required. Docker-ready. MIT license.',
'https://localai.io', 'https://github.com/mudler/LocalAI',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['inference','openai-compatible','api','self-hosted','docker','multi-modal'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'localai');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TensorRT-LLM', 'tensorrt-llm', 'NVIDIA toolkit for optimizing LLM inference on NVIDIA GPUs.',
'TensorRT-LLM by NVIDIA optimizes LLM inference performance on NVIDIA GPUs. Supports quantization, in-flight batching, paged KV cache, and multi-GPU/multi-node deployment. Achieves best-in-class throughput on NVIDIA hardware. Apache 2.0 license.',
'https://github.com/NVIDIA/TensorRT-LLM', 'https://github.com/NVIDIA/TensorRT-LLM',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 4, true, 8, true, true, true,
ARRAY['inference','nvidia','tensorrt','optimization','gpu','production'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tensorrt-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Text Generation Inference (TGI)', 'tgi', 'Production-ready LLM serving toolkit by Hugging Face.',
'TGI (Text Generation Inference) by Hugging Face is a production-ready toolkit for serving LLMs. Features continuous batching, tensor parallelism, Flash Attention, quantization (GPTQ, AWQ, EETQ), and streaming. Powers Hugging Face Inference Endpoints. Apache 2.0 license.',
'https://github.com/huggingface/text-generation-inference', 'https://github.com/huggingface/text-generation-inference',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['inference','serving','huggingface','production','streaming','docker'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tgi');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'ExLlamaV2', 'exllamav2', 'Optimized inference library for running quantized LLMs on consumer GPUs.',
'ExLlamaV2 is an optimized inference library for running GPTQ and EXL2 quantized language models on consumer NVIDIA GPUs. Achieves fast inference through custom CUDA kernels. Supports dynamic batching and speculative decoding. MIT license.',
'https://github.com/turboderp/exllamav2', 'https://github.com/turboderp/exllamav2',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 3, true, 6, true, true, true,
ARRAY['inference','quantization','gptq','exl2','cuda','fast','consumer-gpu'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'exllamav2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'CTranslate2', 'ctranslate2', 'Fast inference engine for Transformer models using custom C++ runtime.',
'CTranslate2 by SYSTRAN is a fast inference engine for Transformer models. Supports int8/int16/float16 quantization. Up to 4x faster and 4x less memory than PyTorch. Supports translation, generation, and speech models. MIT license.',
'https://github.com/OpenNMT/CTranslate2', 'https://github.com/OpenNMT/CTranslate2',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['inference','cpp','quantization','fast','memory-efficient','translation'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'ctranslate2');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'MLC LLM', 'mlc-llm', 'Universal LLM deployment engine for native apps on any hardware.',
'MLC LLM enables deploying large language models natively on diverse hardware (phones, laptops, browsers) with hardware-accelerated runtimes. Compiles models for optimal performance on each platform. Supports iOS, Android, web, and more. Apache 2.0 license.',
'https://llm.mlc.ai', 'https://github.com/mlc-ai/mlc-llm',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 3, false, NULL, true, true, true,
ARRAY['inference','deployment','mobile','browser','native','cross-platform'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'mlc-llm');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'SGLang', 'sglang', 'Fast serving framework for LLMs with structured generation and RadixAttention.',
'SGLang is a fast serving framework for large language models by LMSYS. Features RadixAttention for efficient KV cache reuse, constrained decoding (JSON, regex), and multi-modal support. Competitive throughput with vLLM. Apache 2.0 license.',
'https://github.com/sgl-project/sglang', 'https://github.com/sgl-project/sglang',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'Apache-2.0', 'free', 'local', 3, true, 8, true, true, true,
ARRAY['inference','serving','structured','json','fast','radix-attention'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'sglang');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Kobold.cpp', 'koboldcpp', 'Easy-to-use local AI inference with built-in web UI and API.',
'Kobold.cpp is a single-file local AI inference solution with a built-in web UI for chat and story generation. Based on llama.cpp with additional features like GPU offloading, context shifting, and image generation. Supports GGUF models. AGPL-3.0 license.',
'https://github.com/LostRuins/koboldcpp', 'https://github.com/LostRuins/koboldcpp',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'AGPL-3.0', 'free', 'local', 1, false, NULL, true, true, true,
ARRAY['inference','local','webui','chat','story','gguf','easy'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'koboldcpp');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Petals', 'petals', 'Run large language models collaboratively by distributing layers across users.',
'Petals enables running LLMs collaboratively by distributing model layers across multiple users over the internet. Run 70B+ models by contributing and using shared GPU resources. Like BitTorrent for LLM inference. MIT license.',
'https://petals.dev', 'https://github.com/bigscience-workshop/petals',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 3, true, 4, true, true, false,
ARRAY['inference','distributed','collaborative','p2p','large-models'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'petals');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'Candle', 'candle-ml', 'Minimalist ML framework in Rust by Hugging Face for fast inference.',
'Candle by Hugging Face is a minimalist machine learning framework written in Rust. Designed for performance-critical inference workloads. Supports Llama, Mistral, Whisper, and Stable Diffusion. CPU and CUDA backends. MIT/Apache-2.0 dual license.',
'https://github.com/huggingface/candle', 'https://github.com/huggingface/candle',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 4, false, NULL, true, true, true,
ARRAY['inference','rust','huggingface','performance','minimal','native'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'candle-ml');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'TabbyAPI', 'tabbyapi', 'Fast ExLlamaV2-based OpenAI-compatible API server for quantized models.',
'TabbyAPI is an OpenAI-compatible API server built on ExLlamaV2 for serving EXL2 and GPTQ quantized models. Fast inference on consumer GPUs. Supports streaming, function calling, and multi-user. AGPL-3.0 license.',
'https://github.com/theroyallab/tabbyAPI', 'https://github.com/theroyallab/tabbyAPI',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'AGPL-3.0', 'free', 'local', 2, true, 6, true, true, true,
ARRAY['inference','api','exllamav2','quantized','openai-compatible','fast'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tabbyapi');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'PowerInfer', 'powerinfer', 'Fast LLM inference on consumer GPUs using neuron-aware sparse computation.',
'PowerInfer by SJTU achieves fast LLM inference on consumer GPUs by exploiting neuron activation locality. Hot neurons stay on GPU, cold neurons on CPU. Up to 11x faster than llama.cpp for large models on limited VRAM. MIT license.',
'https://github.com/SJTU-IPADS/PowerInfer', 'https://github.com/SJTU-IPADS/PowerInfer',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 4, true, 4, true, true, true,
ARRAY['inference','sparse','neuron-aware','consumer-gpu','fast','hybrid'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'powerinfer');

INSERT INTO tools (name, slug, short_description, description, website_url, github_url, category_id, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags, featured, status)
SELECT 'llama-cpp-python', 'llama-cpp-python', 'Python bindings for llama.cpp with OpenAI-compatible API server.',
'llama-cpp-python provides Python bindings for llama.cpp, enabling easy LLM inference from Python. Includes an OpenAI-compatible API server, function calling support, and GPU acceleration. Simple pip install. MIT license.',
'https://github.com/abetlen/llama-cpp-python', 'https://github.com/abetlen/llama-cpp-python',
(SELECT id FROM categories WHERE slug = 'llm-inference-serving'), 'MIT', 'free', 'local', 2, false, NULL, true, true, true,
ARRAY['inference','python','llama-cpp','bindings','api','openai-compatible'], false, 'published'
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'llama-cpp-python');
