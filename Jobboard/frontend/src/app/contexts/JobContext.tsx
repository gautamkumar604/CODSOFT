import { createContext, useContext, useState, ReactNode } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  employerId: string;
  featured?: boolean;
  logo?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  resume: string;
  coverLetter: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  addJob: (job: Omit<Job, 'id' | 'postedDate'>) => void;
  applyForJob: (application: Omit<Application, 'id' | 'appliedDate' | 'status'>) => void;
  getJobById: (id: string) => Job | undefined;
  getApplicationsByCandidate: (candidateId: string) => Application[];
  getApplicationsByEmployer: (employerId: string) => Application[];
  updateApplicationStatus: (applicationId: string, status: Application['status']) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'We are looking for a talented Senior Frontend Developer to join our team and help build the future of our web applications.',
    requirements: ['5+ years of React experience', 'Strong TypeScript skills', 'Experience with modern build tools', 'Excellent communication skills'],
    responsibilities: ['Build and maintain web applications', 'Collaborate with design team', 'Code reviews and mentoring', 'Performance optimization'],
    benefits: ['Health insurance', '401k matching', 'Unlimited PTO', 'Remote work options'],
    postedDate: '2026-04-28',
    employerId: '1',
    featured: true,
    logo: '🏢'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Remote',
    salary: '$100,000 - $140,000',
    description: 'Join our fast-growing startup as a Full Stack Engineer and help us revolutionize the industry.',
    requirements: ['3+ years full stack experience', 'Node.js and React proficiency', 'Database design skills', 'Startup mentality'],
    responsibilities: ['Design and develop features end-to-end', 'Participate in architecture decisions', 'Deploy and monitor applications', 'Customer-facing feature development'],
    benefits: ['Equity options', 'Flexible hours', 'Home office stipend', 'Learning budget'],
    postedDate: '2026-04-30',
    employerId: '1',
    featured: true,
    logo: '🚀'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description: 'Creative UX/UI Designer wanted to craft beautiful and intuitive user experiences.',
    requirements: ['Portfolio showcasing UX/UI work', 'Figma expert', '3+ years experience', 'User research experience'],
    responsibilities: ['Design user interfaces', 'Conduct user research', 'Create prototypes', 'Collaborate with developers'],
    benefits: ['Creative freedom', 'Modern tools', 'Design conferences', 'Health benefits'],
    postedDate: '2026-05-01',
    employerId: '1',
    logo: '🎨'
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'DataTech Solutions',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'Backend Developer needed to build scalable APIs and microservices.',
    requirements: ['Strong Python or Java skills', 'Database expertise', 'API design', 'Cloud experience (AWS/GCP)'],
    responsibilities: ['Build RESTful APIs', 'Database optimization', 'System architecture', 'Code quality and testing'],
    benefits: ['Stock options', 'Relocation assistance', 'Professional development', 'Gym membership'],
    postedDate: '2026-05-02',
    employerId: '1',
    logo: '⚙️'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Innovations',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Experienced DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.',
    requirements: ['Kubernetes and Docker expertise', 'CI/CD pipeline experience', 'Terraform or similar IaC', 'Linux administration'],
    responsibilities: ['Manage cloud infrastructure', 'Build CI/CD pipelines', 'Monitor and optimize systems', 'Security best practices'],
    benefits: ['Competitive salary', 'Remote work', 'Latest tech tools', 'Conference attendance'],
    postedDate: '2026-05-03',
    employerId: '1',
    logo: '☁️'
  },
  {
    id: '6',
    title: 'Mobile Developer (iOS)',
    company: 'Mobile First Inc',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$115,000 - $145,000',
    description: 'iOS Developer to create amazing mobile experiences for millions of users.',
    requirements: ['Swift proficiency', 'iOS SDK expertise', 'App Store experience', 'UI/UX sensibility'],
    responsibilities: ['Develop iOS applications', 'Optimize performance', 'Collaborate with designers', 'App Store submissions'],
    benefits: ['Apple hardware', 'Flexible schedule', 'Team events', 'Health coverage'],
    postedDate: '2026-05-04',
    employerId: '1',
    featured: true,
    logo: '📱'
  },
];

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>([]);

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(),
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobs([newJob, ...jobs]);
  };

  const applyForJob = (applicationData: Omit<Application, 'id' | 'appliedDate' | 'status'>) => {
    const newApplication: Application = {
      ...applicationData,
      id: Math.random().toString(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setApplications([...applications, newApplication]);
  };

  const getJobById = (id: string) => jobs.find(job => job.id === id);

  const getApplicationsByCandidate = (candidateId: string) =>
    applications.filter(app => app.candidateId === candidateId);

  const getApplicationsByEmployer = (employerId: string) => {
    const employerJobs = jobs.filter(job => job.employerId === employerId);
    const jobIds = employerJobs.map(job => job.id);
    return applications.filter(app => jobIds.includes(app.jobId));
  };

  const updateApplicationStatus = (applicationId: string, status: Application['status']) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      addJob,
      applyForJob,
      getJobById,
      getApplicationsByCandidate,
      getApplicationsByEmployer,
      updateApplicationStatus,
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within JobProvider');
  }
  return context;
}
