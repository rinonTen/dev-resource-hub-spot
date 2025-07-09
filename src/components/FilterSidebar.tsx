import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTechnology: string;
  setSelectedTechnology: (technology: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const categories = [
  { id: "all", name: "All Categories", count: 156 },
  { id: "frontend", name: "Frontend", count: 45 },
  { id: "backend", name: "Backend", count: 38 },
  { id: "devops", name: "DevOps", count: 28 },
  { id: "mobile", name: "Mobile", count: 22 },
  { id: "design", name: "Design", count: 15 },
  { id: "tools", name: "Tools", count: 8 },
  { id: "interview", name: "Interview Resources", count: 24 },
  { id: "challenges", name: "Coding Challenges", count: 18 },
  { id: "news", name: "Latest News", count: 32 },
];

const technologies = [
  { id: "all", name: "All Technologies" },
  { id: "react", name: "React" },
  { id: "vue", name: "Vue.js" },
  { id: "angular", name: "Angular" },
  { id: "nodejs", name: "Node.js" },
  { id: "docker", name: "Docker" },
  { id: "kubernetes", name: "Kubernetes" },
  { id: "aws", name: "AWS" },
  { id: "nextjs", name: "Next.js" },
];

const languages = [
  { id: "all", name: "All Languages" },
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "csharp", name: "C#" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
];

export const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedTechnology,
  setSelectedTechnology,
  selectedLanguage,
  setSelectedLanguage,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      <Card className="p-6 bg-white/60 backdrop-blur-sm border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span>{category.name}</span>
              <Badge variant={selectedCategory === category.id ? "secondary" : "outline"}>
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white/60 backdrop-blur-sm border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Technologies</h3>
        <div className="space-y-2">
          {technologies.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setSelectedTechnology(tech.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                selectedTechnology === tech.id
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {tech.name}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white/60 backdrop-blur-sm border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Languages</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                selectedLanguage === lang.id
                  ? "bg-green-500 text-white shadow-lg scale-105"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </Card>
    </aside>
  );
};
