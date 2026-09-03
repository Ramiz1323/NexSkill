import Employer from '../../modules/employers/employers.model.js';
import Job from '../../modules/jobs/jobs.model.js';

export const seedJobs = async () => {
  console.log('🌱 Seeding Employers & Jobs...');

  // Clean existing seed jobs & employers
  await Job.deleteMany({});
  await Employer.deleteMany({});

  const employersData = [
    {
      companyName: 'Tata Consultancy Services',
      website: 'https://www.tcs.com',
      industry: 'Information Technology & Consulting',
      location: 'Mumbai, Maharashtra',
      contactEmail: 'campus.hiring@tcs.com',
      contactPhone: '+91-22-67789999',
      verifiedStatus: true,
      description: 'Global leader in IT services, consulting, and business solutions with 600,000+ associates.',
      techStack: ['Java', 'Spring Boot', 'React', 'Cloud Native', 'Node.js', 'Azure'],
      hiringDomains: ['Full Stack', 'Cloud & DevOps', 'Cybersecurity'],
    },
    {
      companyName: 'Google India',
      website: 'https://careers.google.com',
      industry: 'Internet & Cloud Technology',
      location: 'Bengaluru, Karnataka',
      contactEmail: 'talent-india@google.com',
      contactPhone: '+91-80-67218000',
      verifiedStatus: true,
      description: 'Innovating internet search, cloud computing, generative AI, and quantum systems.',
      techStack: ['Go', 'Python', 'Kubernetes', 'TensorFlow', 'Angular', 'GCP'],
      hiringDomains: ['AI/ML', 'Cloud Engineering', 'Distributed Systems'],
    },
    {
      companyName: 'Microsoft India',
      website: 'https://careers.microsoft.com',
      industry: 'Software & Cloud Computing',
      location: 'Hyderabad, Telangana',
      contactEmail: 'india-recruitment@microsoft.com',
      contactPhone: '+91-40-66950000',
      verifiedStatus: true,
      description: 'Empowering digital transformation across intelligent cloud and modern edge.',
      techStack: ['C#', '.NET', 'Azure', 'TypeScript', 'React', 'OpenAI APIs'],
      hiringDomains: ['Cloud Architecture', 'Generative AI', 'Full Stack'],
    },
    {
      companyName: 'Razorpay',
      website: 'https://razorpay.com',
      industry: 'FinTech & Payments',
      location: 'Bengaluru, Karnataka',
      contactEmail: 'careers@razorpay.com',
      contactPhone: '+91-80-46669555',
      verifiedStatus: true,
      description: 'India’s leading full-stack financial services and payments infrastructure platform.',
      techStack: ['Node.js', 'Go', 'React', 'Kafka', 'PostgreSQL', 'Docker'],
      hiringDomains: ['Backend Systems', 'Fintech Architecture', 'Data Engineering'],
    },
  ];

  const createdEmployers = await Employer.insertMany(employersData);
  const [tcs, google, microsoft, razorpay] = createdEmployers;

  const jobsData = [
    {
      title: 'Full Stack Software Engineer',
      employer: tcs._id,
      description: 'Build enterprise-grade microservices and responsive web interfaces using modern JavaScript technologies.',
      employmentType: 'Full-time',
      workplaceType: 'Hybrid',
      experienceLevel: 'Entry',
      location: 'Pune, Maharashtra',
      salaryRange: { min: 700000, max: 1100000, currency: 'INR' },
      requiredSkills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
      preferredSkills: ['TypeScript', 'Tailwind CSS', 'Docker'],
      openings: 5,
      status: 'Active',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Cloud & DevOps Engineer',
      employer: microsoft._id,
      description: 'Automate build/release pipelines, manage Kubernetes clusters, and optimize cloud infrastructure on Azure.',
      employmentType: 'Full-time',
      workplaceType: 'Hybrid',
      experienceLevel: 'Mid',
      location: 'Hyderabad, Telangana',
      salaryRange: { min: 1400000, max: 2200000, currency: 'INR' },
      requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
      preferredSkills: ['Azure', 'Python', 'Prometheus'],
      openings: 3,
      status: 'Active',
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Generative AI & LLM Systems Engineer',
      employer: google._id,
      description: 'Design agentic workflows, orchestrate LLMs, and build intelligent enterprise search solutions.',
      employmentType: 'Full-time',
      workplaceType: 'On-site',
      experienceLevel: 'Mid',
      location: 'Bengaluru, Karnataka',
      salaryRange: { min: 1800000, max: 2800000, currency: 'INR' },
      requiredSkills: ['Python', 'LangChain', 'Prompt Engineering', 'PyTorch', 'Vector Databases'],
      preferredSkills: ['Agentic AI', 'GCP', 'Docker'],
      openings: 2,
      status: 'Active',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Backend Systems Engineer (FinTech)',
      employer: razorpay._id,
      description: 'Design high-throughput, fault-tolerant transaction processing pipelines and payment webhooks.',
      employmentType: 'Full-time',
      workplaceType: 'Remote',
      experienceLevel: 'Entry',
      location: 'Bengaluru, Karnataka',
      salaryRange: { min: 1200000, max: 1800000, currency: 'INR' },
      requiredSkills: ['Node.js', 'REST API', 'SQL', 'PostgreSQL', 'Redis'],
      preferredSkills: ['Go', 'Kafka', 'Docker'],
      openings: 4,
      status: 'Active',
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    },
  ];

  await Job.insertMany(jobsData);
  console.log(`✅ Seeded ${createdEmployers.length} employers and ${jobsData.length} active jobs.`);
};

export default seedJobs;
