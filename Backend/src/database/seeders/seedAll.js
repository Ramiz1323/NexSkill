import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../../config/db.js';
import { seedJobs } from './seedJobs.js';
import { seedCourses } from './seedCourses.js';
import { seedLabourMarket } from './seedLabourMarket.js';
import Placement from '../../modules/placement/placement.model.js';
import Employer from '../../modules/employers/employers.model.js';
import Job from '../../modules/jobs/jobs.model.js';

dotenv.config();

export const seedAll = async () => {
  try {
    console.log('🚀 Starting NexSkill Master Database Seeder...');
    await connectDB();

    // Run core seeders
    await seedJobs();
    await seedCourses();
    await seedLabourMarket();

    // Seed sample Placements for Analytics
    console.log('🌱 Seeding Placements...');
    await Placement.deleteMany({});

    const [tcs, microsoft] = await Employer.find().limit(2);
    const [softwareEngineerJob, cloudJob] = await Job.find().limit(2);

    if (tcs && softwareEngineerJob) {
      await Placement.insertMany([
        {
          studentName: 'Aarav Sharma',
          studentEmail: 'aarav.sharma@campus.edu',
          studentId: 'CS2026-001',
          job: softwareEngineerJob._id,
          employer: tcs._id,
          packageOffered: 850000,
          status: 'Joined',
          academicYear: '2025-2026',
          department: 'Computer Science',
        },
        {
          studentName: 'Sneha Patel',
          studentEmail: 'sneha.patel@campus.edu',
          studentId: 'IT2026-042',
          job: softwareEngineerJob._id,
          employer: tcs._id,
          packageOffered: 920000,
          status: 'Offer Accepted',
          academicYear: '2025-2026',
          department: 'Information Technology',
        },
        {
          studentName: 'Rohan Deshmukh',
          studentEmail: 'rohan.deshmukh@campus.edu',
          studentId: 'CS2026-088',
          job: cloudJob ? cloudJob._id : softwareEngineerJob._id,
          employer: microsoft ? microsoft._id : tcs._id,
          packageOffered: 1650000,
          status: 'Joined',
          academicYear: '2025-2026',
          department: 'Computer Science',
        },
      ]);
      console.log('✅ Seeded sample Placements for analytics.');
    }

    console.log('\n✨ Database seeding completed successfully! ✨\n');
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
