import mongoose from 'mongoose';
import env from '../../config/env.js';
import Skill from '../../modules/skills/skill.model.js';

export const initialSkills = [
  // Frontend
  { name: 'JavaScript', category: 'Frontend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['JS', 'ES6'] },
  { name: 'TypeScript', category: 'Frontend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['TS'] },
  { name: 'React.js', category: 'Frontend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['React', 'ReactJS'] },
  { name: 'Next.js', category: 'Frontend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['NextJS', 'Next'] },
  { name: 'Vue.js', category: 'Frontend', demandLevel: 'Medium', benchmarkWeight: 7, aliases: ['Vue'] },
  { name: 'Tailwind CSS', category: 'Frontend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Tailwind'] },
  { name: 'HTML5 & CSS3', category: 'Frontend', demandLevel: 'High', benchmarkWeight: 7, aliases: ['HTML', 'CSS'] },

  // Backend
  { name: 'Node.js', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Node', 'NodeJS'] },
  { name: 'Express.js', category: 'Backend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Express'] },
  { name: 'Python', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Python3', 'Py'] },
  { name: 'Java', category: 'Backend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Core Java', 'J2EE'] },
  { name: 'Spring Boot', category: 'Backend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['SpringBoot', 'Spring'] },
  { name: 'Golang', category: 'Backend', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Go'] },
  { name: 'REST API Architecture', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['REST', 'RESTful API'] },
  { name: 'GraphQL', category: 'Backend', demandLevel: 'Medium', benchmarkWeight: 7, aliases: ['GQL'] },
  { name: 'Data Structures & Algorithms', category: 'Backend', demandLevel: 'Critical', benchmarkWeight: 10, aliases: ['DSA', 'Algorithms'] },

  // Database
  { name: 'SQL & Database Design', category: 'Database', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['SQL', 'RDBMS'] },
  { name: 'PostgreSQL', category: 'Database', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Postgres'] },
  { name: 'MySQL', category: 'Database', demandLevel: 'High', benchmarkWeight: 8 },
  { name: 'MongoDB', category: 'Database', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Mongo', 'NoSQL'] },
  { name: 'Redis', category: 'Database', demandLevel: 'High', benchmarkWeight: 8, aliases: ['In-Memory Cache'] },
  { name: 'Prisma ORM', category: 'Database', demandLevel: 'Medium', benchmarkWeight: 7, aliases: ['Prisma'] },

  // Cloud & DevOps
  { name: 'AWS Cloud Architecture', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['AWS', 'Amazon Web Services'] },
  { name: 'Docker & Containerization', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Docker'] },
  { name: 'Kubernetes Orchestration', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['K8s', 'Kubernetes'] },
  { name: 'CI/CD Pipelines', category: 'Cloud & DevOps', demandLevel: 'High', benchmarkWeight: 8, aliases: ['GitHub Actions', 'Jenkins'] },
  { name: 'Terraform & IaC', category: 'Cloud & DevOps', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Terraform'] },
  { name: 'Linux Administration', category: 'Cloud & DevOps', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Linux', 'Ubuntu', 'Bash'] },
  { name: 'Git & Version Control', category: 'Cloud & DevOps', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['Git', 'GitHub'] },

  // AI & Machine Learning
  { name: 'Machine Learning Fundamentals', category: 'AI & Machine Learning', demandLevel: 'High', benchmarkWeight: 8, aliases: ['ML', 'Scikit-learn'] },
  { name: 'Deep Learning & Neural Networks', category: 'AI & Machine Learning', demandLevel: 'High', benchmarkWeight: 8, aliases: ['PyTorch', 'TensorFlow'] },
  { name: 'Natural Language Processing', category: 'AI & Machine Learning', demandLevel: 'High', benchmarkWeight: 8, aliases: ['NLP', 'HuggingFace'] },
  { name: 'Large Language Models & RAG', category: 'AI & Machine Learning', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['LLM', 'RAG', 'LangChain'] },
  { name: 'Pandas & NumPy', category: 'AI & Machine Learning', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Data Analysis'] },
  { name: 'Computer Vision', category: 'AI & Machine Learning', demandLevel: 'Medium', benchmarkWeight: 7, aliases: ['OpenCV'] },

  // Cybersecurity
  { name: 'Application Security (OWASP)', category: 'Cybersecurity', demandLevel: 'High', benchmarkWeight: 8, aliases: ['OWASP Top 10', 'AppSec'] },
  { name: 'Network Security & Penetration Testing', category: 'Cybersecurity', demandLevel: 'High', benchmarkWeight: 8, aliases: ['PenTesting'] },
  { name: 'Cloud Security & IAM', category: 'Cybersecurity', demandLevel: 'High', benchmarkWeight: 8, aliases: ['IAM', 'CloudSec'] },

  // Mobile
  { name: 'React Native', category: 'Mobile Development', demandLevel: 'High', benchmarkWeight: 8, aliases: ['RN'] },
  { name: 'Flutter', category: 'Mobile Development', demandLevel: 'High', benchmarkWeight: 8, aliases: ['Dart'] },
  { name: 'Kotlin', category: 'Mobile Development', demandLevel: 'Medium', benchmarkWeight: 7 },

  // Soft Skills & Professional
  { name: 'Technical Problem Solving', category: 'Soft Skills', demandLevel: 'Critical', benchmarkWeight: 10 },
  { name: 'System Design & Architecture', category: 'Soft Skills', demandLevel: 'Critical', benchmarkWeight: 9, aliases: ['High Level Design', 'HLD'] },
  { name: 'Agile & Scrum Collaboration', category: 'Soft Skills', demandLevel: 'High', benchmarkWeight: 7 },
  { name: 'Cross-functional Communication', category: 'Soft Skills', demandLevel: 'High', benchmarkWeight: 8 },
];

export const seedSkills = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log('🌱 Connected to MongoDB for skills seeding...');

    let insertedCount = 0;
    for (const skillData of initialSkills) {
      const exists = await Skill.findOne({ name: skillData.name });
      if (!exists) {
        await Skill.create(skillData);
        insertedCount += 1;
      }
    }

    console.log(`✅ Skills Seeding Completed! ${insertedCount} new skills added (Total catalog: ${initialSkills.length}).`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Skills Seeding Error:', error.message);
    process.exit(1);
  }
};

// If run directly: `node src/database/seeders/seedSkills.js`
if (process.argv[1] && process.argv[1].endsWith('seedSkills.js')) {
  seedSkills();
}

export default seedSkills;
