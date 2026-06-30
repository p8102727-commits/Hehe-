export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'In Development' | 'Prototype' | 'Completed' | 'Released';
  description: string;
  purpose: string;
  features: string[];
  technologies: string[];
  lessonsLearned: string;
  roadmap: string[];
  coverGradient: string; // Tailored gradients instead of heavy image files
}

export interface Skill {
  name: string;
  level: number;
  category: 'Programming' | 'Artificial Intelligence' | 'Design' | 'Creative';
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  category: 'Milestone' | 'Learning' | 'Project Launch';
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  iconName: string;
}

export interface Idea {
  id: string;
  title: string;
  category: string;
  description: string;
  businessModel: string;
  features: string[];
  research: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  category: 'Short-Term' | 'Long-Term' | 'Lifetime Vision';
  status: 'Pending' | 'In Progress' | 'Achieved';
  description: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  category: 'Notes' | 'Research' | 'Documents' | 'Presentations' | 'Scripts' | 'References';
  description: string;
  date: string;
  readTime: string;
  content: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  aspect: 'portrait' | 'landscape' | 'square';
  gradient: string;
  tags: string[];
}
