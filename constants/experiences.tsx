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
  WordPress,
} from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types/experience';

export const EXPERIENCES: Experience[] = [
  {
    company: {
      name: 'Bali International Hospital',
      logo: '/media/resume/bih.png',
      url: 'https://www.bih.id',
      location: 'Bali',
      workplaceType: 'On-Site',
      jobType: 'Full-time',
    },
    role: 'IT Consultant',
    startDate: '2025-06',
    endDate: null,
    stacks: [
      {
        name: 'MySQL',
        icon: <MySQL className={cn('size-5 fill-[#4479A1]')} />,
      },
    ],
    accomplishments: [
      'Contributing to healthcare technology solutions',
      'Working on hospital information systems',
      'Collaborating with healthcare professionals',
      'Implementing digital solutions for healthcare services',
    ],
  },
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
      {
        name: 'MySQL',
        icon: <MySQL className={cn('size-5 fill-[#4479A1]')} />,
      },
    ],
    accomplishments: [
      'Developed and maintained SIMRS (Hospital Management Information System) using CodeIgniter',
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
        name: 'WordPress',
        icon: <WordPress className={cn('size-5 fill-[#21759B]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
      {
        name: 'MySQL',
        icon: <MySQL className={cn('size-5 fill-[#4479A1]')} />,
      },
    ],
    accomplishments: [
      'Developed and customized company profile website using WordPress',
      'Created custom WordPress themes and templates for client requirements',
      'Implemented responsive design and mobile-friendly layouts',
      'Integrated and configured essential WordPress plugins',
      'Optimized website performance and loading speed',
      'Set up and managed WordPress hosting and domain configurations',
      'Implemented SEO best practices and meta tag optimization',
      'Provided training and documentation for content management',
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
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
      {
        name: 'MySQL',
        icon: <MySQL className={cn('size-5 fill-[#4479A1]')} />,
      },
    ],
    accomplishments: [
      'Developed and maintained property management system using Laravel',
      'Built dynamic property listing platform with advanced search and filtering',
      'Implemented booking and payment system integration',
      'Created admin dashboard for property management and analytics',
      'Optimized property search performance and database queries',
      'Integrated with maps and location services for property visualization',
    ],
  },
];
