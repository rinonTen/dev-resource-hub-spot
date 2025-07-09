
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Share2, ExternalLink, BookOpen, PlayCircle } from "lucide-react";
import { Resource } from "@/types/Resource";
import { toast } from "@/hooks/use-toast";

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const [isUseful, setIsUseful] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [usefulCount, setUsefulCount] = useState(resource.usefulCount);
  const [favoriteCount, setFavoriteCount] = useState(resource.favoriteCount);

  const handleUseful = () => {
    setIsUseful(!isUseful);
    setUsefulCount(prev => isUseful ? prev - 1 : prev + 1);
    toast({
      title: isUseful ? "Removed from useful" : "Marked as useful",
      description: isUseful ? "Resource unmarked as useful" : "Resource marked as useful",
    });
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    setFavoriteCount(prev => isFavorited ? prev - 1 : prev + 1);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Resource removed from favorites" : "Resource added to favorites",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(resource.url);
    toast({
      title: "Link copied!",
      description: "Resource link copied to clipboard",
    });
  };

  const getTypeIcon = () => {
    switch (resource.type) {
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getCategoryColor = () => {
    switch (resource.category) {
      case "frontend":
        return "bg-blue-100 text-blue-800";
      case "backend":
        return "bg-green-100 text-green-800";
      case "devops":
        return "bg-orange-100 text-orange-800";
      case "mobile":
        return "bg-purple-100 text-purple-800";
      case "design":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${getCategoryColor()} capitalize`}>
            {resource.category}
          </Badge>
          <div className="flex items-center gap-1 text-gray-500">
            {getTypeIcon()}
            <span className="text-xs capitalize">{resource.type}</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {resource.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {resource.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{resource.technologies.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUseful}
              className={`flex items-center gap-1 ${
                isUseful ? "text-blue-600 bg-blue-50" : "text-gray-500"
              }`}
            >
              <ThumbsUp className={`h-4 w-4 ${isUseful ? "fill-current" : ""}`} />
              <span className="text-xs">{usefulCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={`flex items-center gap-1 ${
                isFavorited ? "text-red-600 bg-red-50" : "text-gray-500"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
              <span className="text-xs">{favoriteCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-500 hover:text-blue-600"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => window.open(resource.url, "_blank")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            View
          </Button>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Added {new Date(resource.dateAdded).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
