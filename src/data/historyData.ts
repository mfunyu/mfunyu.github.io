export type HistoryData = {
  title: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  description: string
}

export const historyData: HistoryData[] = [
  {
    title: '42Tokyo',
    startYear: 2020,
    startMonth: 6,
    endYear: 2023,
    endMonth: 6,
    description: 'Completed comprehensive software engineering education at 42Tokyo through hands-on project-based learning. Mastered C programming, Unix systems, algorithms, and data structures. Developed problem-solving skills through peer-to-peer collaboration and self-directed learning in a gamified environment.'
  },
  {
    title: '42Lyon',
    startYear: 2023,
    startMonth: 7,
    endYear: 2025,
    endMonth: 3,
    description: 'Completed my studies at 42Lyon, a tuition-free computer programming school. Developed strong skills in C/C++, system administration, and collaborative problem-solving through peer-to-peer learning methodology.'
  },
  {
    title: 'Internship',
    startYear: 2024,
    startMonth: 9,
    endYear: 2025,
    endMonth: 3,
    description: 'Gained practical experience in software development through various internship opportunities. Worked on real-world projects, collaborated with development teams, and applied theoretical knowledge to solve business challenges.'
  }
]

