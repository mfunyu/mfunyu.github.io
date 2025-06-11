export type HistoryData = {
  title: string
  startYear: number
  startMonth: number
  endYear?: number
  endMonth?: number
  isCompleted: boolean
  description: string
  location: string
}

export const historyData: HistoryData[] = [
  {
    title: 'Pearson College UWC',
    startYear: 2017,
    startMonth: 9,
    endYear: 2019,
    endMonth: 6,
    isCompleted: true,
    description: 'Studied at UWC Canada, a global boarding school. Developed a strong foundation in computer science and programming through a rigorous academic program.',
    location: 'Victoria, Canada'
  },
  {
    title: 'Gap Year',
    startYear: 2019,
    startMonth: 6,
    endYear: 2020,
    endMonth: 6,
    isCompleted: true,
    description: 'Took a gap year to travel and explore the world.',
    location: 'Japan / Western Europe'
  },
  {
    title: '42Tokyo',
    startYear: 2020,
    startMonth: 6,
    endYear: 2023,
    endMonth: 6,
    isCompleted: true,
    description: 'Completed comprehensive software engineering education at 42Tokyo through hands-on project-based learning. Mastered C programming, Unix systems, algorithms, and data structures. Developed problem-solving skills through peer-to-peer collaboration and self-directed learning in a gamified environment.',
    location: 'Tokyo, Japan'
  },
  {
    title: '42Lyon',
    startYear: 2023,
    startMonth: 7,
    isCompleted: false,
    description: 'Currently pursuing studies at 42Lyon, a tuition-free computer programming school. Developing advanced skills in C/C++, system administration, and collaborative problem-solving through peer-to-peer learning methodology.',
    location: 'Lyon, France'
  },
  {
    title: 'Internship in Lyon, France',
    startYear: 2024,
    startMonth: 9,
    endYear: 2025,
    endMonth: 3,
    isCompleted: true,
    description: 'Gained practical experience in software development through various internship opportunities. Worked on real-world projects, collaborated with development teams, and applied theoretical knowledge to solve business challenges.',
    location: 'Lyon, France'
  },
  {
    title: 'Internship in Tokyo, Japan',
    startYear: 2022,
    startMonth: 8,
    endYear: 2022,
    endMonth: 10,
    isCompleted: true,
    description: 'Gained practical experience in software development through various internship opportunities. Worked on real-world projects, collaborated with development teams, and applied theoretical knowledge to solve business challenges.',
    location: 'Tokyo, Japan'
  },
  {
    title: 'NYUAD',
    startYear: 2020,
    startMonth: 9,
    endYear: 2021,
    endMonth: 6,
    isCompleted: false,
    description: 'Studied for a Bachelor of Arts in Computer Science at NYU Abu Dhabi. Developing skills in software development, computer science, and problem-solving through a rigorous academic program.',
    location: 'Abu Dhabi, UAE'
  },
  {
    title: 'build@mercari',
    startYear: 2022,
    startMonth: 3,
    endYear: 2022,
    endMonth: 4,
    isCompleted: true,
    description: 'Worked on a project to build a new feature for the Mercari app. The project was a success and the feature was released to the app.',
    location: 'Tokyo, Japan'
  },
  {
    title: 'Full-time job in Tokyo, Japan',
    startYear: 2025,
    startMonth: 4,
    isCompleted: false,
    description: 'Working as a software engineer at a startup in Tokyo. Developing a new feature for the app. The project was a success and the feature was released to the app.',
    location: 'Tokyo, Japan'
  }
]

