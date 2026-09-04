import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../../config/db.js';

// Models
import User from '../../modules/users/user.model.js';
import Skill from '../../modules/skills/skill.model.js';
import { EmergingSkill } from '../../modules/emergingSkills/emergingSkills.model.js';
import Employer from '../../modules/employers/employers.model.js';
import Job from '../../modules/jobs/jobs.model.js';
import Course from '../../models/Course.js';
import { LabourMarket } from '../../modules/labourMarket/labourMarket.model.js';
import Placement from '../../modules/placement/placement.model.js';
import TrainerProgram from '../../modules/trainer/trainerProgram.model.js';
import TrainerCert from '../../modules/trainer/trainerCert.model.js';
import CareerTrack from '../../modules/career/careerTrack.model.js';
import Credential from '../../modules/progress/credential.model.js';
import StudentSkill from '../../modules/skillProfiles/skillProfile.model.js';

dotenv.config();

export const seedAll = async () => {
  try {
    console.log('🚀 Starting NexSkill Master Database Seeder...');
    await connectDB();

    // 1. Seed Core Users
    console.log('👤 Seeding Users...');
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Password123!', salt);

    const demoStudent = await User.create({
      name: 'Demo Student',
      email: 'demo@nexskill.com',
      password: 'Password123!',
      role: 'STUDENT',
      isActive: true,
      isVerified: true,
      bio: 'Full-Stack & Cloud aspirant preparing for SIH 2026 placements',
    });

    const demoEmployer = await User.create({
      name: 'NexSkill Talent Partner',
      email: 'employer@nexskill.com',
      password: 'Password123!',
      role: 'EMPLOYER',
      isActive: true,
      isVerified: true,
    });

    const demoTrainer = await User.create({
      name: 'Prof. Rajesh Kulkarni',
      email: 'trainer@nexskill.com',
      password: 'Password123!',
      role: 'TRAINER',
      isActive: true,
      isVerified: true,
      bio: 'Senior Cloud Architecture & AI Faculty Lead',
    });

    const demoAdmin = await User.create({
      name: 'System Administrator',
      email: 'admin@nexskill.com',
      password: 'Password123!',
      role: 'ADMIN',
      isActive: true,
      isVerified: true,
    });
    console.log('✅ Users seeded.');

    // 2. Seed Skills Catalog
    console.log('⚡ Seeding Skills Catalog...');
    await Skill.deleteMany({});
    const skillDocs = await Skill.insertMany([
      { name: 'JavaScript', category: 'Frontend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['JS', 'ES6'] },
      { name: 'TypeScript', category: 'Frontend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['TS'] },
      { name: 'React.js', category: 'Frontend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['React', 'React 19', 'ReactJS'] },
      { name: 'Next.js', category: 'Frontend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['NextJS', 'Next'] },
      { name: 'Node.js', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Node', 'NodeJS'] },
      { name: 'Express.js', category: 'Backend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Express'] },
      { name: 'Python', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Python3', 'Py'] },
      { name: 'PostgreSQL', category: 'Database', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Postgres', 'SQL'] },
      { name: 'MongoDB', category: 'Database', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Mongo', 'NoSQL'] },
      { name: 'Docker & Containerization', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Docker'] },
      { name: 'Kubernetes Orchestration', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['K8s', 'Kubernetes'] },
      { name: 'AWS Cloud Architecture', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['AWS'] },
      { name: 'Large Language Models & RAG', category: 'AI & Machine Learning', demandLevel: 'Critical', benchmarkWeight: 10, aliases: ['LLM', 'RAG', 'LangChain', 'FastAPI'] },
      { name: 'Git & Version Control', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Git', 'GitHub'] },
      { name: 'Data Structures & Algorithms', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 10, aliases: ['DSA'] },
    ]);
    console.log(`✅ Seeded ${skillDocs.length} technical skills.`);

    // 3. Seed Emerging Skills & Forecasting Telemetry
    console.log('📈 Seeding Emerging Skills & Forecasting Models...');
    await EmergingSkill.deleteMany({});
    await EmergingSkill.insertMany([
      {
        skillName: 'Generative AI & LLM Systems',
        name: 'Generative AI & LLM Systems',
        category: 'Artificial Intelligence',
        adoptionRate: 92,
        projectedGrowthRate: 88,
        demandForecastScore: 96,
        displacementRiskScore: 10,
        growth2026: 88,
        growth2028: 145,
        riskScore: 'Low',
        adoption: 'Hypergrowth',
        domain: 'Artificial Intelligence',
      },
      {
        skillName: 'Kubernetes & Cloud Orchestration',
        name: 'Kubernetes & Cloud Orchestration',
        category: 'Cloud Engineering',
        adoptionRate: 85,
        projectedGrowthRate: 72,
        demandForecastScore: 90,
        displacementRiskScore: 8,
        growth2026: 72,
        growth2028: 110,
        riskScore: 'Very Low',
        adoption: 'Mainstream Standard',
        domain: 'Cloud Engineering',
      },
      {
        skillName: 'Cybersecurity Threat Modeling',
        name: 'Cybersecurity Threat Modeling',
        category: 'Cybersecurity',
        adoptionRate: 78,
        projectedGrowthRate: 65,
        demandForecastScore: 88,
        displacementRiskScore: 12,
        growth2026: 65,
        growth2028: 98,
        riskScore: 'Low',
        adoption: 'Mandatory',
        domain: 'Cybersecurity',
      },
      {
        skillName: 'Rust & Systems Optimization',
        name: 'Rust & Systems Optimization',
        category: 'Systems Programming',
        adoptionRate: 60,
        projectedGrowthRate: 54,
        demandForecastScore: 78,
        displacementRiskScore: 20,
        growth2026: 54,
        growth2028: 85,
        riskScore: 'Moderate',
        adoption: 'Rapid Growth',
        domain: 'Systems Engineering',
      },
      {
        skillName: 'Distributed Ledger & Smart Contracts',
        name: 'Distributed Ledger & Smart Contracts',
        category: 'Web3 & Blockchain',
        adoptionRate: 48,
        projectedGrowthRate: 42,
        demandForecastScore: 68,
        displacementRiskScore: 25,
        growth2026: 42,
        growth2028: 68,
        riskScore: 'Moderate',
        adoption: 'Selective',
        domain: 'Blockchain',
      },
      {
        skillName: 'Legacy Monolithic Maintenance',
        name: 'Legacy Monolithic Maintenance',
        category: 'Software Maintenance',
        adoptionRate: 20,
        projectedGrowthRate: -28,
        demandForecastScore: 30,
        displacementRiskScore: 75,
        growth2026: -28,
        growth2028: -64,
        riskScore: 'High Risk',
        adoption: 'Declining',
        domain: 'Software Maintenance',
      },
    ]);
    console.log('✅ Seeded Emerging Skills.');

    // 4. Seed Employers & Job Postings
    console.log('🏢 Seeding Employers & Jobs...');
    await Employer.deleteMany({});
    await Job.deleteMany({});

    const employers = await Employer.insertMany([
      {
        companyName: 'AWS Academy & NexSkill Industry Alliance',
        industry: 'Cloud Computing & AI',
        location: 'Bengaluru, Karnataka',
        contactEmail: 'talent@aws-alliance.org',
        contactPhone: '+91 80 4455 6677',
        website: 'https://aws.amazon.com',
        description: 'Global leader in cloud computing and enterprise scalable solutions.',
        isVerified: true,
        verifiedStatus: true,
      },
      {
        companyName: 'OpenAI Academic Initiative',
        industry: 'Artificial Intelligence',
        location: 'Hyderabad, Telangana',
        contactEmail: 'recruiting@openai-academic.org',
        contactPhone: '+91 40 3322 1100',
        website: 'https://openai.com',
        description: 'Frontier AI research and deployment institution.',
        isVerified: true,
        verifiedStatus: true,
      },
      {
        companyName: 'Tata Consultancy Services (TCS)',
        industry: 'Information Technology & Consulting',
        location: 'Mumbai & Pune, Maharashtra',
        contactEmail: 'campus.talent@tcs.com',
        contactPhone: '+91 22 6677 8899',
        website: 'https://tcs.com',
        description: 'Premier global IT services and digital transformation organization.',
        isVerified: true,
        verifiedStatus: true,
      },
      {
        companyName: 'Microsoft Cloud & Enterprise',
        industry: 'Cloud & Software Platforms',
        location: 'Hyderabad & Bengaluru',
        contactEmail: 'talent@microsoft.com',
        contactPhone: '+91 80 2233 4455',
        website: 'https://microsoft.com',
        description: 'Empowering digital transformation through Azure and frontier AI.',
        isVerified: true,
        verifiedStatus: true,
      },
    ]);

    await Job.insertMany([
      {
        title: 'Full-Stack Cloud & AI Software Engineer',
        employer: employers[0]._id,
        location: 'Bengaluru',
        employmentType: 'Full-time',
        workplaceType: 'Hybrid',
        experienceLevel: 'Entry',
        salaryRange: { min: 1400000, max: 2200000, currency: 'INR' },
        description: 'Build high-throughput microservices in React 19, Node.js, Docker, and LangChain RAG pipelines.',
        requiredSkills: ['React.js', 'Node.js', 'Docker & Containerization', 'AWS Cloud Architecture'],
        status: 'Active',
        openPositions: 24,
      },
      {
        title: 'Frontier Generative AI & MLOps Specialist',
        employer: employers[1]._id,
        location: 'Hyderabad',
        employmentType: 'Full-time',
        workplaceType: 'On-site',
        experienceLevel: 'Mid',
        salaryRange: { min: 1800000, max: 2800000, currency: 'INR' },
        description: 'Orchestrate autonomous LLM multi-agents, vector databases (Qdrant), and fine-tuning pipelines.',
        requiredSkills: ['Python', 'Large Language Models & RAG', 'FastAPI', 'Docker & Containerization'],
        status: 'Active',
        openPositions: 15,
      },
      {
        title: 'Site Reliability Engineer & Kubernetes Architect',
        employer: employers[3]._id,
        location: 'Pune',
        employmentType: 'Full-time',
        workplaceType: 'Remote',
        experienceLevel: 'Mid',
        salaryRange: { min: 1600000, max: 2400000, currency: 'INR' },
        description: 'Manage zero-downtime multi-cluster Kubernetes deployments with Terraform and Prometheus.',
        requiredSkills: ['Kubernetes Orchestration', 'Docker & Containerization', 'AWS Cloud Architecture', 'Linux Administration'],
        status: 'Active',
        openPositions: 18,
      },
    ]);
    console.log('✅ Seeded Employers and Jobs.');

    // 5. Seed Industry Curricula & Courses
    console.log('📚 Seeding Industry Curricula...');
    await Course.deleteMany({});
    await Course.insertMany([
      {
        title: 'Full-Stack Cloud & AI Engineering Track',
        code: 'CURR-CLOUD-AI-101',
        description: 'Comprehensive industry curriculum co-designed with top tech employers covering React 19, Node.js microservices, and Docker/Kubernetes container orchestration.',
        industryPartner: 'AWS Academy & NexSkill Industry Alliance',
        targetRole: 'Software Engineer',
        duration: '14 Weeks',
        durationWeeks: 14,
        matchScore: 96,
        alignmentScore: 96,
        category: 'Information Technology',
        modules: [
          { title: 'Modern React & State Architecture', description: 'React 19 hooks, concurrent transitions, and Redux Toolkit.' },
          { title: 'REST & GraphQL Backend Microservices', description: 'Node.js, Express, and PostgreSQL high-throughput design.' },
          { title: 'Containerization with Docker & Kubernetes', description: 'Multi-stage builds, pods, services, and Helm deployments.' },
          { title: 'LLM Agent & RAG System Integration', description: 'LangChain, vector embeddings, and retrieval-augmented generation.' },
        ],
        prerequisites: ['Foundational JavaScript', 'Data Structures and Algorithms'],
        isActive: true,
      },
      {
        title: 'Enterprise AI & Large Language Model Systems',
        code: 'CURR-AI-LLM-201',
        description: 'Production generative AI engineering track covering embeddings, vector databases, LangChain orchestration, and evaluation benchmarks.',
        industryPartner: 'OpenAI Academic & NASSCOM FutureSkills',
        targetRole: 'AI Specialist',
        duration: '12 Weeks',
        durationWeeks: 12,
        matchScore: 98,
        alignmentScore: 98,
        category: 'Artificial Intelligence',
        modules: [
          { title: 'Deep Learning & Vector Embeddings', description: 'Dense embeddings, cosine similarity, and chunking strategies.' },
          { title: 'RAG Design with Qdrant & Pinecone', description: 'Hybrid search, re-ranking, and context window optimization.' },
          { title: 'Autonomous Agent Workflows (CrewAI)', description: 'Multi-agent coordination, tools, and guardrails.' },
          { title: 'LLMOps, Quantization & Serving', description: 'vLLM, Ollama, TensorRT, and low-latency inference APIs.' },
        ],
        prerequisites: ['Python programming', 'Linear algebra fundamentals'],
        isActive: true,
      },
      {
        title: 'Site Reliability Engineering & DevOps Masterclass',
        code: 'CURR-SRE-301',
        description: 'Production infrastructure curriculum focusing on Terraform infrastructure as code, continuous deployment pipelines, and observability.',
        industryPartner: 'Cloud Native Computing Foundation (CNCF)',
        targetRole: 'Cloud Architect',
        duration: '10 Weeks',
        durationWeeks: 10,
        matchScore: 92,
        alignmentScore: 92,
        category: 'Cloud Engineering',
        modules: [
          { title: 'Linux Kernel & eBPF Networking', description: 'Systems internals, sockets, and memory allocation profiling.' },
          { title: 'Kubernetes Architecture & Helm', description: 'Ingress controllers, stateful sets, and persistent volume claims.' },
          { title: 'Terraform & Multi-cloud Automation', description: 'State management, modules, and AWS provisioning.' },
          { title: 'Prometheus & OpenTelemetry Monitoring', description: 'SLO/SLI dashboards, distributed tracing, and alerts.' },
        ],
        prerequisites: ['Command line proficiency', 'Networking fundamentals'],
        isActive: true,
      },
    ]);
    console.log('✅ Seeded Industry Curricula.');

    // 6. Seed Labour Market Intelligence Telemetry
    console.log('📊 Seeding Labour Market Signals...');
    await LabourMarket.deleteMany({});
    await LabourMarket.insertMany([
      {
        sector: 'Information Technology',
        jobRole: 'Full-Stack AI Developer',
        role: 'Full-Stack AI Developer',
        region: 'Bengaluru / Hyderabad',
        topRegion: 'Bengaluru / Hyderabad',
        hiringVolume: 14200,
        openPositions: 14200,
        growthRatePercentage: 34,
        growthRate: '+34%',
        demandLevel: 'Very High',
        priority: 'Critical',
        avgSalary: '₹16-24 LPA',
        salaryInsights: { currency: 'INR', entryLevel: 1200000, midLevel: 1800000, seniorLevel: 2800000 },
        skillsRequired: ['React 19', 'Node.js', 'Python', 'LangChain', 'Docker'],
        hiringVelocity: 'Very High',
      },
      {
        sector: 'Cloud Infrastructure',
        jobRole: 'Cloud Platform Engineer (AWS/GCP)',
        role: 'Cloud Platform Engineer (AWS/GCP)',
        region: 'Pune / NCR',
        topRegion: 'Pune / NCR',
        hiringVolume: 11800,
        openPositions: 11800,
        growthRatePercentage: 28,
        growthRate: '+28%',
        demandLevel: 'High',
        priority: 'High',
        avgSalary: '₹14-22 LPA',
        salaryInsights: { currency: 'INR', entryLevel: 1000000, midLevel: 1600000, seniorLevel: 2400000 },
        skillsRequired: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'CI/CD'],
        hiringVelocity: 'High',
      },
      {
        sector: 'Artificial Intelligence',
        jobRole: 'Data & MLOps Specialist',
        role: 'Data & MLOps Specialist',
        region: 'Bengaluru / Chennai',
        topRegion: 'Bengaluru / Chennai',
        hiringVolume: 8900,
        openPositions: 8900,
        growthRatePercentage: 42,
        growthRate: '+42%',
        demandLevel: 'Very High',
        priority: 'Critical',
        avgSalary: '₹18-28 LPA',
        salaryInsights: { currency: 'INR', entryLevel: 1400000, midLevel: 2000000, seniorLevel: 3200000 },
        skillsRequired: ['PyTorch', 'Vector DBs', 'Kubeflow', 'Python', 'SQL'],
        hiringVelocity: 'High',
      },
      {
        sector: 'Cybersecurity',
        jobRole: 'Cybersecurity Architect',
        role: 'Cybersecurity Architect',
        region: 'Mumbai / Hyderabad',
        topRegion: 'Mumbai / Hyderabad',
        hiringVolume: 6400,
        openPositions: 6400,
        growthRatePercentage: 31,
        growthRate: '+31%',
        demandLevel: 'High',
        priority: 'High',
        avgSalary: '₹20-32 LPA',
        salaryInsights: { currency: 'INR', entryLevel: 1500000, midLevel: 2200000, seniorLevel: 3500000 },
        skillsRequired: ['Zero Trust', 'Cloud Security', 'OWASP', 'Penetration Testing'],
        hiringVelocity: 'Moderate',
      },
    ]);
    console.log('✅ Seeded Labour Market Signals.');

    // 7. Seed Trainer Programs & Certifications
    console.log('🎓 Seeding Trainer Programs & Faculty Certifications...');
    await TrainerProgram.deleteMany({});
    await TrainerCert.deleteMany({});

    await TrainerProgram.insertMany([
      {
        title: 'Modern Cloud Architecture & Kubernetes Masterclass for Faculty',
        category: 'Faculty Upskilling',
        mode: 'Hybrid',
        partner: 'AWS Academy & NexSkill Industry Alliance',
        duration: '6 Weeks',
        seats: 40,
        availableSeats: 32,
        description: 'Empowers professors and technical trainers with modern DevOps and cloud native infrastructure pedagogical tools.',
        syllabus: ['Microservices Design Patterns', 'Container Orchestration with K8s', 'Continuous Delivery Pipelines', 'Pedagogy & Hands-on Lab Setup'],
        prerequisites: 'Basic knowledge of Linux and command-line interfaces.',
        isEnrolled: false,
      },
      {
        title: 'Enterprise AI & Large Language Models Curriculum Delivery',
        category: 'Advanced Technical Training',
        mode: 'Online',
        partner: 'OpenAI Academic Initiative',
        duration: '4 Weeks',
        seats: 60,
        availableSeats: 45,
        description: 'Hands-on pedagogy training for college educators to teach generative AI, vector retrieval, and prompt engineering.',
        syllabus: ['Foundations of Transformer Architectures', 'RAG Design & Vector Embeddings', 'Model Evaluation & Ethical AI Guardrails', 'Grading Practical AI Projects'],
        prerequisites: 'Proficiency in Python and basic data structures.',
        isEnrolled: false,
      },
      {
        title: 'Full-Stack JavaScript & Modern Web Standards',
        category: 'Core Engineering Upskilling',
        mode: 'On-site',
        partner: 'NASSCOM FutureSkills Prime',
        duration: '5 Weeks',
        seats: 30,
        availableSeats: 18,
        description: 'Industry-aligned bootcamp for computer science faculty covering React 19, Node.js, and automated unit testing.',
        syllabus: ['Modern React & State Architecture', 'RESTful & GraphQL API Design', 'Database Modeling & Query Optimization', 'Setting up Industry Capstone Rubrics'],
        prerequisites: 'Prior experience teaching Web Development or OOP.',
        isEnrolled: false,
      },
    ]);

    await TrainerCert.insertMany([
      {
        title: 'Certified Cloud Computing Educator (CCCE)',
        name: 'Certified Cloud Computing Educator (CCCE)',
        issuer: 'NexSkill & AWS Academic Alliance',
        status: 'Verified Badge',
        issuedDate: '2026-02-15',
      },
      {
        title: 'Advanced AI Curriculum Instructor (AACI)',
        name: 'Advanced AI Curriculum Instructor (AACI)',
        issuer: 'NASSCOM FutureSkills Prime',
        status: 'Active',
        issuedDate: '2026-01-20',
      },
    ]);
    console.log('✅ Seeded Trainer Programs & Certifications.');

    // 8. Seed Verified Credentials & Career Tracks
    console.log('🎖️ Seeding Credentials & Career Tracks...');
    await Credential.deleteMany({});
    await CareerTrack.deleteMany({});

    await Credential.insertMany([
      {
        student: demoStudent._id,
        studentId: 'STUDENT-001',
        title: 'Full-Stack Cloud Readiness Credential',
        issuer: 'NexSkill & AWS Industry Alliance',
        issueDate: 'March 2026',
        credentialUrl: 'https://credentials.nexskill.org/verify/NX-2026-8841',
        verified: true,
        badgeLevel: 'PLATINUM',
      },
      {
        student: demoStudent._id,
        studentId: 'STUDENT-001',
        title: 'AI Systems & RAG Diagnostics Certification',
        issuer: 'NASSCOM FutureSkills Prime',
        issueDate: 'Feb 2026',
        credentialUrl: 'https://credentials.nexskill.org/verify/NX-2026-8842',
        verified: true,
        badgeLevel: 'GOLD',
      },
      {
        student: demoStudent._id,
        studentId: 'STUDENT-001',
        title: 'Enterprise Backend Microservices Badge',
        issuer: 'NexSkill Technical Committee',
        issueDate: 'Jan 2026',
        credentialUrl: 'https://credentials.nexskill.org/verify/NX-2026-8843',
        verified: true,
        badgeLevel: 'SILVER',
      },
    ]);

    await CareerTrack.insertMany([
      {
        title: 'Full-Stack AI Software Engineer',
        domain: 'Software Engineering',
        demandLevel: 'Critical',
        averageSalary: '₹16 - 28 LPA',
        timeToReady: '12 - 16 Weeks',
        description: 'Architect scalable web platforms integrated with real-time generative AI models and distributed cloud databases.',
        requiredSkills: ['React 19', 'Node.js', 'Python', 'LangChain', 'Docker', 'PostgreSQL'],
        milestones: [
          { phase: 'Phase 1', title: 'Modern Frontend & State Architecture', duration: '4 Weeks', skills: ['React 19', 'TailwindCSS', 'Redux Toolkit'] },
          { phase: 'Phase 2', title: 'Microservices & Database Design', duration: '4 Weeks', skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
          { phase: 'Phase 3', title: 'Cloud Containerization & AI Integration', duration: '6 Weeks', skills: ['Docker', 'AWS', 'LangChain', 'RAG Pipelines'] },
        ],
      },
      {
        title: 'Frontier AI & Large Language Model Specialist',
        domain: 'Artificial Intelligence',
        demandLevel: 'Hypergrowth',
        averageSalary: '₹20 - 35 LPA',
        timeToReady: '14 - 18 Weeks',
        description: 'Design and deploy state-of-the-art autonomous multi-agent systems, vector retrieval indexes, and model fine-tuning.',
        requiredSkills: ['Python', 'PyTorch', 'Vector DBs', 'LangChain', 'FastAPI', 'Docker'],
        milestones: [
          { phase: 'Phase 1', title: 'Deep Learning & Embeddings', duration: '5 Weeks', skills: ['Python', 'PyTorch', 'Vector Embeddings'] },
          { phase: 'Phase 2', title: 'RAG Architecture & Knowledge Graphs', duration: '5 Weeks', skills: ['Qdrant', 'LangChain', 'FastAPI'] },
          { phase: 'Phase 3', title: 'Multi-Agent Autonomous Systems', duration: '6 Weeks', skills: ['CrewAI', 'LLMOps', 'Evaluation Benchmarks'] },
        ],
      },
    ]);
    console.log('✅ Seeded Credentials & Career Tracks.');

    console.log('\n✨ All NexSkill Database Collections successfully populated with live data! ✨\n');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Execute if run directly
if (process.argv[1]?.endsWith('seedAll.js')) {
  seedAll();
}

export default seedAll;
