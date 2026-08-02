export interface SkillGroup {
  title: string;
  items: string[];
  coreSkills?: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "React",
      "React Hook Form",
      "Zod",
      "Axios",
      "Apollo Client",
      "Next.js",
      "Redux Toolkit",
      "Zustand",
      "Shadcn UI",
      "Material UI",
      "Ant Design",
    ],
    coreSkills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "REST API", "GraphQL", "PostgreSQL", "MySQL", "MongoDB"],
    coreSkills: ["Node.js"],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Python",
      "PyTorch",
      "OpenCV",
      "YOLO11",
      "NumPy",
      "Pandas",
      "PySpark",
      "scikit-learn",
      "Ultralytics",
      "TensorFlow",
      "LabelImg",
    ],
    coreSkills: ["Python", "YOLO11", "PySpark"],
  },
  {
    title: "Computer Vision",
    items: [
      "Object Detection",
      "Image Classification",
      "Data Annotation",
      "Model Training",
      "Model Evaluation",
    ],
  },
  {
    title: "DevOps / Tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "Linux",
      "VS Code",
      "Postman",
      "Jira",
    ],
  },
  {
    title: "Testing",
    items: ["K6"],
  },
];
