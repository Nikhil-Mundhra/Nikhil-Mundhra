export const experiences = [
  {
    id: 1,
    category: 'Research & Industry',
    featured: true,
    title: 'Machine Learning Researcher',
    company: 'NYU Abu Dhabi, Center for Brain and Health',
    companyUrl: 'https://nyuad.nyu.edu/en/research/faculty-labs-and-projects/center-for-brain-and-health.html',
    projectName: 'Capstone Project',
    projectUrl: 'https://github.com/nikhil-Mundhra/OCT-Analyser-Capstone/',
    duration: 'May 2026 - Present',
    location: 'Abu Dhabi, UAE',
    subNote: 'Advised by Dr. Bas Rokers & Prof. Gabriel Falcao',
    metrics: ['0.953 Surface Dice', '4.71 um Error', '98% Triage F1', '8x Faster Inference'],
    details: [
      'Engineered 2.5D Bi-Planar ResNet, 3D U-Net, and Hybrid TransUNet models for RNFL segmentation (320x768x320) under Dr. Bas Rokers, achieving 0.953 Surface Dice and 4.71 um (~1.5-px) boundary error (beating commercial Solix/Heidelberg baselines with +64.6% audit gain and 47% lower P95 tail error).',
      'Developed a hierarchical ConvNeXt V2 classifier with multi-scale CBAM attention and Grad-CAM across 88,800+ OCT B-scans (7,536 patients), achieving 98% triage F1 across 12 retinal pathologies under zero-leakage strict cross-validation.',
      'Architected end-to-end PyTorch, MONAI, and scikit-learn pipelines for automated multi-task training (Tversky, continuous boundary regression, and BMO cup losses), validation, and clinical reporting across 237 volumetric 3D scans (~75,800 slices), reducing per-volume inference latency by up to 8x (7.1s vs. 45-60s heuristic baseline).',
      'Scaled distributed multi-GPU training on NYUAD\'s Jubail HPC cluster across NVIDIA H200, A100, and 4x V100 GPUs (128 GB VRAM) via PyTorch DDP under Prof. Gabriel Falcao, optimizing mixed-precision (BF16/FP16 with FP32 loss upcasting) at effective batch size 64 to reach 95%-98% GPU SM utilization.',
      'Targeting publication at [IPMI](https://ipmi2027.org) for a comparative study of ML architectures and their biomarker detection accuracy.'
    ],
    tools: ['PyTorch', 'MONAI', 'TransUNet', 'ConvNeXt V2', 'CUDA DDP', 'scikit-learn', 'Jubail HPC']
  },
  {
    id: 2,
    category: 'Research & Industry',
    featured: true,
    title: 'AI Intern',
    company: 'Kanerika Software Pvt. Ltd.',
    companyUrl: 'https://kanerika.com',
    location: 'Hyderabad, India',
    duration: 'Jun 2026 - Aug 2026',
    metrics: ['Agentic SQL Fraud Engine', 'Multi-Tenant WOPI', 'Word Add-in'],
    details: [
      'Engineered an agentic fraud engine that synthesizes financial typologies (rent skimming, subsidy theft) into persistent SQL rules across a data lake, pairing deterministic flagging with LLM audit explainability.',
      'Developed a legal document compliance AI engine with a multi-tenant distributed Microsoft WOPI architecture and native Word add-in end-to-end, enabling seamless integration into client ecosystems.',
      'Conducting functional and technical REST API testing and debugging of Kanerika AI Labs\' products (including Karl).'
    ],
    tools: ['Python', 'SQL Lake', 'LLM Agents', 'Office.js', 'Microsoft WOPI', 'FastAPI', 'REST APIs']
  },
  {
    id: 3,
    category: 'Projects & Ventures',
    featured: true,
    title: 'Developer (Team Lead)',
    company: 'AeroLodge Metrics',
    companyUrl: 'https://challengeon-dct-nyuad.vercel.app',
    subNote: 'Department of Culture & Tourism, UAE funded project',
    duration: 'Aug 2026 - Oct 2026',
    location: 'Abu Dhabi, UAE',
    metrics: ['DCT UAE Funded', 'Constrained Conv Filters', 'Beats Deep Baselines'],
    details: [
      'Facilitated flight routes & hotel capacity decisions for the DCT using proprietary data by curating a lake architecture, and modeling noisy multi-horizon time-series via Constrained Convolution Filters, outperforming deep neural baselines.'
    ],
    tools: ['Python', 'Time-Series', 'Constrained Conv', 'Next.js', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 4,
    category: 'Projects & Ventures',
    featured: true,
    title: 'Developer (Team Lead)',
    company: 'Wealth Advisor',
    companyUrl: 'https://github.com/Nikhil-Mundhra/Wealth-Advisor',
    subNote: 'A Shenzhen FinTechathon project',
    duration: 'Sep 2026 - Oct 2026',
    location: 'Shenzhen / Remote',
    metrics: ['B2B2C DEWA Agent', 'Cross-Border FinTech'],
    details: [
      'Built a B2B2C Dynamic Expat Wealth Agent (DEWA) for autonomous AI wealth advisory for advisors and end-clients.'
    ],
    tools: ['React 19', 'TypeScript', 'Node.js', 'AI Agents', 'FinTech']
  },
  {
    id: 5,
    category: 'Projects & Ventures',
    featured: true,
    title: 'Founder',
    company: 'VivahGo Planners',
    companyUrl: 'http://vivahgo.com',
    subNote: 'An AI-driven SaaS platform for wedding workspaces',
    duration: 'Mar 2026 - Present',
    location: 'India & UAE',
    metrics: ['AI Wedding SaaS', 'Full-Stack & GTM'],
    details: [
      'Handled Marketing, Operations, Software Development, Finances, and Legal compliances of founding a startup.'
    ],
    tools: ['React', 'Capacitor', 'Express', 'MongoDB', 'Product Strategy']
  },
  {
    id: 6,
    category: 'Projects & Ventures',
    featured: true,
    title: 'Developer (Solo)',
    company: 'TakeOver',
    companyUrl: 'https://github.com/Nikhil-Mundhra/whatsapp-ai',
    subNote: 'Vercel & GCP Deployed Full Stack AI Harness for WhatsApp',
    duration: 'Jul 2026 - Sep 2026',
    location: 'Cloud (Vercel & GCP)',
    metrics: ['Semantic Context', 'Smart Permission Polling'],
    details: [
      'Engineered TakeOver agent pipeline to use semantic chat context, user guidelines, and smart permission polling.'
    ],
    tools: ['Node.js', 'TypeScript', 'GCP', 'Vercel', 'WhatsApp API', 'LLM Agents']
  },
  {
    id: 7,
    category: 'Research & Industry',
    featured: false,
    title: 'Cyber Security & Project Management Intern',
    company: 'Alstom',
    location: 'India',
    duration: 'Jun 2025 - Aug 2025',
    metrics: ['RS17 Trains V&V', 'IEC 62443 OT Security'],
    details: [
      'Conducted multi-site research of RS17 Trains, analyzing the DfQ V-cycle, gate reviews, and system V&V checkpoints.',
      'Shadowed development of OT cybersecurity models, including network segmentation and IEC 62443 compliance.'
    ],
    tools: ['OT Cybersecurity', 'IEC 62443', 'DfQ V-Cycle', 'System V&V']
  },
  {
    id: 8,
    category: 'Research & Industry',
    featured: false,
    title: 'Marketing Analyst Intern',
    company: 'Phool.Co',
    location: 'New Delhi, India',
    duration: 'Jun 2024 - Aug 2024',
    metrics: ['Multi-Variable Econometrics', 'STATA & R'],
    details: [
      'Reported geographical, financial, and seasonal buying behaviors using multi-variable data models in STATA & R.'
    ],
    tools: ['STATA', 'R', 'Data Modeling', 'Market Analytics']
  },
  {
    id: 9,
    category: 'Leadership',
    featured: false,
    title: 'Founder and President',
    company: 'Hindu Student Association (Peacock), NYU Abu Dhabi',
    location: 'Abu Dhabi, UAE',
    duration: 'Mar 2024 - Present',
    metrics: ['300+ Members', '50-200 Attendees/Event'],
    details: [
      'Kickstarted a thriving community of 300+ members, averaging 50-200 attendees per event, with under AED 20,000 p.a.'
    ],
    tools: ['Community Building', 'Budget Management', 'Executive Leadership']
  },
  {
    id: 10,
    category: 'Leadership',
    featured: false,
    title: 'Treasurer (Founding Team)',
    company: 'Code Paris - NYU Paris',
    location: 'Paris, France',
    duration: 'Jan 2025 - May 2025',
    metrics: ['AI & NumPy Workshops', 'Founding Board'],
    details: [
      'Designed educational frameworks and held workshops on NumPy, AI models, and advanced programming concepts.'
    ],
    tools: ['NumPy', 'AI Education', 'Technical Workshops']
  },
  {
    id: 11,
    category: 'Leadership',
    featured: false,
    title: 'Team Leader (5 NYUAD Undergraduates)',
    company: 'Bloomberg Trading Challenge',
    location: 'Abu Dhabi, UAE',
    duration: 'Sep 2023 - Nov 2023',
    metrics: ['Global Rank #243', '+5% Net Profit (30d)', '$1M Virtual Portfolio'],
    details: [
      'Globally ranked 243, with net profit of 5% in 30 days over a diverse 1 million virtual USD portfolio.'
    ],
    tools: ['Bloomberg Terminal', 'Quantitative Trading', 'Portfolio Risk']
  }
];
