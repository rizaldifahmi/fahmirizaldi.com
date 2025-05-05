import {
  Android,
  Bootstrap,
  JavaScript,
  Laravel,
  MySQL,
  NextJS,
  NuxtJS,
  PHP,
  PostgreSQL,
  RabbitMQ,
  ReactJS,
  Redis,
  TailwindCSS,
  TypeScript,
  VueJS,
} from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types/experience';

export const EXPERIENCES: Experience[] = [
  {
    company: {
      name: 'RSKGM Kota Bandung',
      logo: '/media/resume/rskgm.png',
      url: 'https://rskgm.bandung.go.id',
      location: 'Bandung',
      workplaceType: 'On-Site',
      jobType: 'Full-time',
    },
    role: 'Full-stack Engineer',
    startDate: '2023-03',
    endDate: '2025-04',
    stacks: [
      {
        name: 'React.js',
        icon: <ReactJS className={cn('size-5 fill-[#61DAFB]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
    ],
    accomplishments: [
      'Developed and maintained SIMRS (Hospital Management Information System) using CodeIgniter and React.js',
      'Implemented patient registration and queue management system',
      'Developed electronic medical records (EMR) system for dental and oral health services',
      'Integrated with BPJS Kesehatan API for insurance claim processing',
      'Integrated with SATUSEHAT for national health data interoperability',
      'Implemented reporting system for hospital management and health authorities',
      'Provided training and technical support for medical and administrative staff',
    ],
  },
  {
    company: {
      name: 'GAMI Labs',
      logo: '/media/resume/gami.png',
      url: 'https://gamilabs.com',
      location: 'Bandung',
      workplaceType: 'On-Site',
      jobType: 'Full-time',
    },
    role: 'Web Developer',
    startDate: '2020-10',
    endDate: '2021-01',
    stacks: [
      {
        name: 'Vue.js',
        icon: <VueJS className={cn('size-5 fill-[#4FC08D]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
      {
        name: 'Laravel',
        icon: <Laravel className={cn('size-5 fill-[#FF2D20]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
      {
        name: 'Redis',
        icon: <Redis className={cn('size-5 fill-[#DC382D]')} />,
      },
      {
        name: 'RabbitMQ',
        icon: <RabbitMQ className={cn('size-5 fill-[#FF6600]')} />,
      },
    ],
    accomplishments: [
      'Designed and developed high-performance game backend services using PHP (Laravel)',
      'Built and maintained game management dashboard using Vue.js and JavaScript',
      'Implemented real-time features using WebSocket and Redis for live game interactions',
      'Optimized database queries and API performance for handling high-traffic game sessions',
      'Developed microservices architecture using RabbitMQ for game event processing',
      'Implemented comprehensive unit testing using Jest for frontend and backend components',
      'Collaborated with game designers and frontend developers to implement game mechanics',
      'Maintained API documentation and technical specifications for game services',
    ],
  },
  {
    company: {
      name: 'Spaceless Indonesia',
      logo: '/media/resume/spaceless.png',
      url: 'https://spaceless.id',
      location: 'Bandung',
      workplaceType: 'On-Site',
      jobType: 'Internship',
    },
    role: 'Web Developer',
    startDate: '2020-07',
    endDate: '2020-10',
    stacks: [
      {
        name: 'Laravel',
        icon: <Laravel className={cn('size-5 fill-[#FF2D20]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
      {
        name: 'Vue.js',
        icon: <VueJS className={cn('size-5 fill-[#4FC08D]')} />,
      },
      {
        name: 'React.js',
        icon: <ReactJS className={cn('size-5 fill-[#61DAFB]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
    ],
    accomplishments: [
      'Developed and maintained property management system using Laravel and Vue.js',
      'Built dynamic property listing platform with advanced search and filtering',
      'Implemented booking and payment system integration',
      'Created admin dashboard for property management and analytics',
      'Optimized property search performance and database queries',
      'Integrated with maps and location services for property visualization',
      'Developed mobile-responsive UI components with React.js',
    ],
  },
];
