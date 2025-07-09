
import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ResourceCard } from "@/components/ResourceCard";
import { mockResources } from "@/data/mockResources";
import { Resource } from "@/types/Resource";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const filteredResources = useMemo(() => {
    let filtered = mockResources.filter((resource: Resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      const matchesTechnology = selectedTechnology === "all" || resource.technologies.includes(selectedTechnology);
      const matchesLanguage = selectedLanguage === "all" || resource.languages.includes(selectedLanguage);
      
      return matchesSearch && matchesCategory && matchesTechnology && matchesLanguage;
    });

    // Sort resources
    switch (sortBy) {
      case "newest":
        return filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case "popular":
        return filtered.sort((a, b) => b.usefulCount - a.usefulCount);
      case "favorites":
        return filtered.sort((a, b) => b.favoriteCount - a.favoriteCount);
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, selectedTechnology, selectedLanguage, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTechnology={selectedTechnology}
            setSelectedTechnology={setSelectedTechnology}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Developer Resources
              </h2>
              <p className="text-gray-600">
                {filteredResources.length} resources found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
