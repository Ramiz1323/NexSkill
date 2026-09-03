import Course from '../../modules/courses/courses.model.js';

export const seedCourses = async () => {
  console.log('🌱 Seeding Courses Catalog...');

  await Course.deleteMany({});

  const coursesData = [
    {
      title: 'Full Stack MERN Architecture & Production Engineering',
      description: 'Master enterprise Full Stack development with React 19, Node.js, Express, MongoDB, and Redux Toolkit.',
      provider: 'NexSkill Academy',
      skillsTaught: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'REST API', 'Tailwind CSS'],
      difficulty: 'Intermediate',
      durationWeeks: 8,
      durationHours: 40,
      url: 'https://nexskill.edu/courses/fullstack-mern',
      price: 0,
      rating: 4.8,
      enrolledCount: 1420,
      certificationAvailable: true,
      tags: ['Web Development', 'Full Stack', 'JavaScript'],
    },
    {
      title: 'Cloud Native & DevOps Automation Masterclass',
      description: 'Deploy resilient containerized microservices using Docker, Kubernetes, GitHub Actions CI/CD, and Terraform on AWS/Azure.',
      provider: 'AWS Cloud Academy',
      skillsTaught: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform', 'AWS'],
      difficulty: 'Advanced',
      durationWeeks: 6,
      durationHours: 32,
      url: 'https://nexskill.edu/courses/cloud-devops',
      price: 0,
      rating: 4.9,
      enrolledCount: 980,
      certificationAvailable: true,
      tags: ['Cloud', 'DevOps', 'Infrastructure'],
    },
    {
      title: 'Agentic Generative AI & LLM Systems Engineering',
      description: 'Build production AI agents, RAG workflows, and multi-modal autonomous pipelines with LangChain and Python.',
      provider: 'Google AI Institute',
      skillsTaught: ['Python', 'LangChain', 'Prompt Engineering', 'Agentic AI', 'PyTorch', 'Vector Databases'],
      difficulty: 'Intermediate',
      durationWeeks: 6,
      durationHours: 36,
      url: 'https://nexskill.edu/courses/agentic-ai',
      price: 0,
      rating: 4.9,
      enrolledCount: 2150,
      certificationAvailable: true,
      tags: ['Artificial Intelligence', 'LLM', 'Python'],
    },
    {
      title: 'Scalable Backend Engineering & High-Throughput APIs',
      description: 'Master asynchronous event-driven architectures, caching with Redis, SQL schema design, and message queues with Kafka.',
      provider: 'NexSkill Academy',
      skillsTaught: ['Node.js', 'PostgreSQL', 'SQL', 'Redis', 'Kafka', 'REST API'],
      difficulty: 'Intermediate',
      durationWeeks: 6,
      durationHours: 28,
      url: 'https://nexskill.edu/courses/backend-systems',
      price: 0,
      rating: 4.7,
      enrolledCount: 1100,
      certificationAvailable: true,
      tags: ['Backend', 'Fintech', 'Databases'],
    },
  ];

  await Course.insertMany(coursesData);
  console.log(`✅ Seeded ${coursesData.length} industry-mapped courses.`);
};

export default seedCourses;
