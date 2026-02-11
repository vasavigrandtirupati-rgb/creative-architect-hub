import React from "react";
import {
  Globe,
  Smartphone,
  Apple,
  Megaphone,
  Search,
  Code,
  Database,
  Cloud,
  BarChart3,
  Layers,
  GitBranch,
  Terminal,
  ExternalLink,
  Github,
  Star,
} from "lucide-react";

export interface Task {
  taskName: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: "idea" | "planning" | "in-progress" | "completed";
  tasks: Task[];
  deadline: string;
  image: string;
  liveLink: string;
  githubLink: string;
  isPublished: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  contributions: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
}

export interface Review {
  id: string;
  clientName: string;
  company: string;
  image: string;
  reviewText: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export const siteData = {
  personalInfo: {
    name: "Alex Morgan",
    title: "Senior Full-Stack Architect",
    tagline: "Crafting scalable digital ecosystems with pixel-perfect frontends. Turning complex problems into elegant code.",
    location: "San Francisco, CA",
    experience: "10+ Years Professional",
    email: "alex@alexdev.com",
    phone: "+1 (555) 123-4567",
    resumeLink: "#",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    summary: `I'm a Senior Full Stack Developer with over 10 years of experience committed to clean design and high-performance engineering. My journey began with a passion for clean code and evolved into leading cross-functional teams to deliver scalable web applications.\n\nI specialize in building robust, framework-agnostic systems that don't just work — they excel. My approach blends technical rigor with a deep understanding of user experience, ensuring that every line of code serves a clear purpose and delivers tangible value.\n\nWhether I'm architecting cloud solutions or refactoring legacy monoliths, I'm committed to learn, evolve, and mentoring the next generation of engineers.`,
  },

  services: [
    {
      id: "web",
      title: "Web Dev",
      description: "Modern, responsive websites built with cutting-edge technologies for optimal performance and user experience.",
      icon: React.createElement(Globe, { size: 28 }),
      enabled: true,
    },
    {
      id: "android",
      title: "Android",
      description: "Native Android applications with intuitive UI/UX and seamless device integration.",
      icon: React.createElement(Smartphone, { size: 28 }),
      enabled: true,
    },
    {
      id: "ios",
      title: "iOS Apps",
      description: "Polished iOS applications following Apple's design guidelines with smooth animations.",
      icon: React.createElement(Apple, { size: 28 }),
      enabled: true,
    },
    {
      id: "digital",
      title: "Digital Marketing",
      description: "Data-driven digital marketing strategies to grow your brand and reach target audiences.",
      icon: React.createElement(Megaphone, { size: 28 }),
      enabled: true,
    },
    {
      id: "seo",
      title: "SEO",
      description: "Search engine optimization to improve rankings, drive organic traffic and boost visibility.",
      icon: React.createElement(Search, { size: 28 }),
      enabled: true,
    },
  ] as Service[],

  skills: {
    frontend: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js / Go", "PostgreSQL", "GraphQL / APIs", "Redis Cache"],
    devops: ["AWS / GCP", "Docker & K8s", "CI/CD Pipelines", "Terraform"],
    marketing: ["Technical SEO", "Data Analytics", "A/B Testing", "Growth Hacks"],
  },

  projects: [
    {
      id: "1",
      title: "FinTech Dashboard",
      description: "A comprehensive financial analytics platform enabling real-time data visualization and reporting.",
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      status: "completed",
      tasks: [
        { taskName: "Design dashboard UI", isCompleted: true },
        { taskName: "Implement charts", isCompleted: true },
        { taskName: "API integration", isCompleted: true },
      ],
      deadline: "2024-03-15",
      image: "",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      isPublished: true,
    },
    {
      id: "2",
      title: "ShopSwift App",
      description: "Mobile-first e-commerce with AR product preview, secure payments, and real-time inventory.",
      techStack: ["React Native", "Firebase", "Stripe"],
      status: "completed",
      tasks: [
        { taskName: "Build product catalog", isCompleted: true },
        { taskName: "Payment integration", isCompleted: true },
      ],
      deadline: "2024-06-01",
      image: "",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      isPublished: true,
    },
    {
      id: "3",
      title: "Urban Insights",
      description: "An award-winning analytics solution for smart city data visualization and monitoring.",
      techStack: ["Vue.js", "D3.js", "Python", "AWS"],
      status: "completed",
      tasks: [
        { taskName: "Data pipeline setup", isCompleted: true },
        { taskName: "Visualization layer", isCompleted: true },
      ],
      deadline: "2024-01-20",
      image: "",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      isPublished: true,
    },
    {
      id: "4",
      title: "AI Content Platform",
      description: "AI-powered content management platform (draft).",
      techStack: ["Next.js", "OpenAI", "Prisma"],
      status: "planning",
      tasks: [
        { taskName: "Define architecture", isCompleted: false },
      ],
      deadline: "2025-01-01",
      image: "",
      liveLink: "",
      githubLink: "",
      isPublished: false,
    },
  ] as Project[],

  workExperience: [
    {
      id: "1",
      company: "TechCorp Global",
      role: "Senior Full-Stack Developer",
      duration: "2021 – Present",
      contributions: [
        "Led a team of 8 engineers to deliver a microservices architecture serving 2M+ users",
        "Reduced page load times by 60% through SSR implementation and code splitting",
        "Established CI/CD pipelines reducing deployment time from hours to minutes",
      ],
    },
    {
      id: "2",
      company: "StartupLab Inc.",
      role: "Full-Stack Developer",
      duration: "2018 – 2021",
      contributions: [
        "Built the core product from MVP to a platform serving 500K users",
        "Implemented real-time collaboration features using WebSockets",
        "Designed and maintained RESTful APIs handling 10K+ requests per minute",
      ],
    },
    {
      id: "3",
      company: "Digital Solutions Co.",
      role: "Frontend Developer",
      duration: "2015 – 2018",
      contributions: [
        "Developed responsive web applications for enterprise clients",
        "Introduced component-based architecture using React",
        "Mentored junior developers and conducted code reviews",
      ],
    },
  ] as WorkExperience[],

  achievements: [
    { id: "1", title: "AWS Solutions Architect", description: "Amazon Web Services Professional Certification", year: "2023" },
    { id: "2", title: "Best Innovation Award", description: "TechCorp Global Annual Hackathon Winner", year: "2022" },
    { id: "3", title: "Google Developer Expert", description: "Recognized for expertise in Web Technologies", year: "2021" },
    { id: "4", title: "Open Source Contributor", description: "1000+ contributions across major repositories", year: "2020" },
  ] as Achievement[],

  reviews: [
    {
      id: "1",
      clientName: "Sarah Davidson",
      company: "Vertex Labs",
      image: "",
      reviewText: "Alex transformed our outdated platform into a modern, scalable application. The attention to detail and code quality was exceptional.",
      rating: 5,
    },
    {
      id: "2",
      clientName: "Michael Chen",
      company: "NovaTech",
      image: "",
      reviewText: "Working with Alex was a game-changer for our startup. Delivered ahead of schedule with incredible performance optimization.",
      rating: 5,
    },
    {
      id: "3",
      clientName: "Emily Rodriguez",
      company: "DataFlow Inc.",
      image: "",
      reviewText: "Outstanding technical skills combined with excellent communication. Alex understood our requirements perfectly and delivered beyond expectations.",
      rating: 5,
    },
  ] as Review[],

  stats: [
    { label: "Years Experience", value: "8+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Open Source Repos", value: "12" },
    { label: "Client Satisfaction", value: "100%" },
  ],

  seo: {
    title: "Alex Morgan | Senior Full-Stack Developer",
    description: "Senior Full-Stack Developer specializing in React, Node.js, and cloud architecture. Building scalable digital solutions.",
    keywords: "full-stack developer, react, node.js, web development, mobile apps, SEO",
  },
};
