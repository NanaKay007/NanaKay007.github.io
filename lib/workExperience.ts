// Work experience data
// Similar structure to blog posts for easy management

export interface WorkExperience {
  id: string
  year: string                    // Display year (e.g., "Present", "2023", "Ongoing")
  role: string                    // Job title/role
  company: string                 // Company name
  description: string             // Job description
  order: number                   // Display order (lower numbers appear first)
}

export const workExperiences: WorkExperience[] = [
  {
    id: 'ai-robotics-engineering',
    year: 'Present',
    role: 'AI & Robotics Engineering',
    company: 'Company Name', // Update with actual company name
    description: 'Building intelligent systems that pair computer vision, control, and machine learning to solve real-world automation problems.',
    order: 1
  },
  {
    id: 'technical-writing',
    year: 'Ongoing',
    role: 'Technical Writing & Enablement',
    company: 'Company Name', // Update with actual company name
    description: 'Translating complex AI/Robotics concepts into clear guides, documenting architectures, and creating learning resources for practitioners.',
    order: 2
  }
  // Add more work experience items here:
  // {
  //   id: 'unique-id',
  //   year: '2023',
  //   role: 'Senior Software Engineer',
  //   company: 'Company Name',
  //   description: 'Description of your role and achievements.',
  //   order: 3
  // }
]

// Sort by order (ascending)
export function getAllWorkExperiences(): WorkExperience[] {
  return [...workExperiences].sort((a, b) => a.order - b.order)
}

export function getWorkExperienceById(id: string): WorkExperience | undefined {
  return workExperiences.find(exp => exp.id === id)
}

