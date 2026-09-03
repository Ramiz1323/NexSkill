import mongoose from 'mongoose';
import env from '../../config/env.js';
import User from '../../modules/users/user.model.js';
import StudentProfile from '../../modules/students/student.model.js';

export const initialUsers = [
  {
    name: 'NexSkill Admin',
    email: 'admin@nexskill.gov.in',
    password: 'AdminPassword@2026',
    role: 'ADMIN',
    phone: '+91 9876543210',
    isVerified: true,
  },
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    password: 'StudentPassword@123',
    role: 'STUDENT',
    phone: '+91 9823456789',
    isVerified: true,
    studentProfile: {
      college: 'College of Engineering, Pune (COEP)',
      degree: 'B.Tech',
      branch: 'Computer Science and Engineering',
      graduationYear: 2026,
      cgpa: 8.9,
      targetCareerDomains: ['Full Stack Web Development', 'Cloud Architecture'],
      githubUrl: 'https://github.com/aaravsharma-dev',
      linkedinUrl: 'https://linkedin.com/in/aaravsharma',
      portfolioUrl: 'https://aaravsharma.dev',
      bio: 'Final year CS student passionate about distributed cloud systems and full stack engineering.',
      readinessScore: 82,
    },
  },
  {
    name: 'Ananya Verma',
    email: 'ananya.verma@gmail.com',
    password: 'StudentPassword@123',
    role: 'STUDENT',
    phone: '+91 9123456780',
    isVerified: true,
    studentProfile: {
      college: 'VJTI Mumbai',
      degree: 'B.Tech',
      branch: 'Information Technology',
      graduationYear: 2026,
      cgpa: 9.1,
      targetCareerDomains: ['AI/ML Engineering', 'Data Analytics'],
      githubUrl: 'https://github.com/ananya-v',
      linkedinUrl: 'https://linkedin.com/in/ananya-verma',
      portfolioUrl: 'https://ananya-verma.ai',
      bio: 'Machine learning practitioner specializing in LLMs, RAG, and NLP models.',
      readinessScore: 88,
    },
  },
  {
    name: 'Tata Consultancy Services',
    email: 'campus-recruitment@tcs.com',
    password: 'EmployerPassword@2026',
    role: 'EMPLOYER',
    phone: '+91 22 67789999',
    isVerified: true,
  },
  {
    name: 'Dr. Rajesh Patil',
    email: 'rajesh.patil@iti.gov.in',
    password: 'TrainerPassword@123',
    role: 'TRAINER',
    phone: '+91 9845123456',
    isVerified: true,
  },
];

export const seedUsers = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('🌱 Connected to MongoDB for users seeding...');

    let insertedCount = 0;
    for (const item of initialUsers) {
      const exists = await User.findOne({ email: item.email });
      if (!exists) {
        const { studentProfile, ...userData } = item;
        const user = await User.create(userData);

        if (studentProfile) {
          await StudentProfile.create({
            user: user._id,
            ...studentProfile,
          });
        }
        insertedCount += 1;
      }
    }

    console.log(`✅ Users Seeding Completed! ${insertedCount} seed accounts initialized.`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Users Seeding Error:', error.message);
    process.exit(1);
  }
};

// If run directly: `node src/database/seeders/seedUsers.js`
if (process.argv[1] && process.argv[1].endsWith('seedUsers.js')) {
  seedUsers();
}

export default seedUsers;
