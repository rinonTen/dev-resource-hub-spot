
export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "article" | "video" | "tool" | "course";
  category: "frontend" | "backend" | "devops" | "mobile" | "design" | "tools";
  technologies: string[];
  languages: string[];
  usefulCount: number;
  favoriteCount: number;
  dateAdded: string;
  author?: string;
}
