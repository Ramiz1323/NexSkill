import LabourMarket from '../../modules/labourMarket/labourMarket.model.js';
import EmergingSkill from '../../modules/emergingSkills/emergingSkills.model.js';

export const seedLabourMarket = async () => {
  console.log('🌱 Seeding Labour Market Trends & Emerging Skills...');

  await LabourMarket.deleteMany({});
  await EmergingSkill.deleteMany({});

  const labourMarketData = [
    {
      sector: 'Information Technology',
      jobRole: 'Full Stack Software Engineer',
      region: 'India',
      hiringVolume: 42500,
      growthRatePercentage: 22.4,
      demandLevel: 'Very High',
      salaryInsights: {
        entryLevel: 650000,
        midLevel: 1400000,
        seniorLevel: 2600000,
        average: 1550000,
        currency: 'INR',
      },
      topRequiredSkills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'REST API'],
      historicalTrends: [
        { year: 2024, openingsCount: 31000, averageSalary: 1250000 },
        { year: 2025, openingsCount: 37000, averageSalary: 1400000 },
        { year: 2026, openingsCount: 42500, averageSalary: 1550000 },
      ],
      reportedQuarter: 'Q3-2026',
    },
    {
      sector: 'Artificial Intelligence',
      jobRole: 'Generative AI & LLM Engineer',
      region: 'India',
      hiringVolume: 18200,
      growthRatePercentage: 58.7,
      demandLevel: 'Very High',
      salaryInsights: {
        entryLevel: 900000,
        midLevel: 2100000,
        seniorLevel: 3800000,
        average: 2250000,
        currency: 'INR',
      },
      topRequiredSkills: ['Python', 'LangChain', 'Prompt Engineering', 'PyTorch', 'Agentic AI'],
      historicalTrends: [
        { year: 2024, openingsCount: 5000, averageSalary: 1600000 },
        { year: 2025, openingsCount: 11500, averageSalary: 1950000 },
        { year: 2026, openingsCount: 18200, averageSalary: 2250000 },
      ],
      reportedQuarter: 'Q3-2026',
    },
    {
      sector: 'Cloud Infrastructure',
      jobRole: 'Cloud & DevOps Architect',
      region: 'India',
      hiringVolume: 29000,
      growthRatePercentage: 34.1,
      demandLevel: 'High',
      salaryInsights: {
        entryLevel: 750000,
        midLevel: 1650000,
        seniorLevel: 3200000,
        average: 1850000,
        currency: 'INR',
      },
      topRequiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
      historicalTrends: [
        { year: 2024, openingsCount: 18000, averageSalary: 1450000 },
        { year: 2025, openingsCount: 23000, averageSalary: 1650000 },
        { year: 2026, openingsCount: 29000, averageSalary: 1850000 },
      ],
      reportedQuarter: 'Q3-2026',
    },
  ];

  const emergingSkillsData = [
    {
      skillName: 'Agentic AI Workflows',
      category: 'Generative AI',
      adoptionRate: 64,
      projectedGrowthRate: 88.5,
      demandForecastScore: 96,
      displacementRiskScore: 35,
      associatedRoles: ['AI Systems Engineer', 'Full Stack Developer', 'Automation Architect'],
      adjacentTraditionalSkills: ['Rule-based RPA', 'Static Chatbot Scripting'],
      forecastHorizonYears: 3,
      readinessRecommendation: 'Highest institutional training priority for 2026 computer science curriculum.',
    },
    {
      skillName: 'Prompt Engineering & Fine-Tuning',
      category: 'Generative AI',
      adoptionRate: 78,
      projectedGrowthRate: 62.0,
      demandForecastScore: 91,
      displacementRiskScore: 40,
      associatedRoles: ['Prompt Engineer', 'Product Designer', 'Data Scientist'],
      adjacentTraditionalSkills: ['Basic Keyword Search', 'Traditional RegEx Parsing'],
      forecastHorizonYears: 2,
      readinessRecommendation: 'Incorporate into foundational software engineering and NLP coursework.',
    },
    {
      skillName: 'Kubernetes Multi-Cluster Orchestration',
      category: 'Cloud Native',
      adoptionRate: 72,
      projectedGrowthRate: 41.5,
      demandForecastScore: 89,
      displacementRiskScore: 20,
      associatedRoles: ['DevOps Specialist', 'Site Reliability Engineer', 'Cloud Architect'],
      adjacentTraditionalSkills: ['Monolithic Bare Metal Server Administration'],
      forecastHorizonYears: 3,
      readinessRecommendation: 'Integrate into distributed systems and enterprise infrastructure programs.',
    },
    {
      skillName: 'Rust Systems Programming',
      category: 'Systems Programming',
      adoptionRate: 48,
      projectedGrowthRate: 74.2,
      demandForecastScore: 92,
      displacementRiskScore: 25,
      associatedRoles: ['Systems Engineer', 'Blockchain Developer', 'Security Researcher'],
      adjacentTraditionalSkills: ['C/C++ Memory Management'],
      forecastHorizonYears: 4,
      readinessRecommendation: 'High-growth memory safety recommendation for core systems track.',
    },
  ];

  await LabourMarket.insertMany(labourMarketData);
  await EmergingSkill.insertMany(emergingSkillsData);

  console.log(
    `✅ Seeded ${labourMarketData.length} labour market sectors and ${emergingSkillsData.length} emerging skills.`
  );
};

export default seedLabourMarket;
