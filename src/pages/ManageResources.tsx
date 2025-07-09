
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Resource } from "@/types/Resource";
import { ResourceForm } from "@/components/ResourceForm";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ManageResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    // Load user's resources from localStorage
    const savedResources = localStorage.getItem("userResources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  }, [navigate]);

  const handleSaveResource = (resource: Omit<Resource, "id" | "dateAdded">) => {
    if (editingResource) {
      // Update existing resource
      const updatedResource = {
        ...resource,
        id: editingResource.id,
        dateAdded: editingResource.dateAdded,
      };
      const updatedResources = resources.map(r => 
        r.id === editingResource.id ? updatedResource : r
      );
      setResources(updatedResources);
      localStorage.setItem("userResources", JSON.stringify(updatedResources));
      toast({
        title: "Resource updated!",
        description: "Your resource has been successfully updated.",
      });
    } else {
      // Add new resource
      const newResource: Resource = {
        ...resource,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString(),
      };
      const updatedResources = [...resources, newResource];
      setResources(updatedResources);
      localStorage.setItem("userResources", JSON.stringify(updatedResources));
      toast({
        title: "Resource added!",
        description: "Your resource has been successfully added.",
      });
    }
    
    setShowForm(false);
    setEditingResource(null);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setShowForm(true);
  };

  const handleDeleteResource = (id: string) => {
    const updatedResources = resources.filter(r => r.id !== id);
    setResources(updatedResources);
    localStorage.setItem("userResources", JSON.stringify(updatedResources));
    toast({
      title: "Resource deleted!",
      description: "Your resource has been successfully deleted.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (showForm) {
    return (
      <ResourceForm
        resource={editingResource}
        onSave={handleSaveResource}
        onCancel={() => {
          setShowForm(false);
          setEditingResource(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Manage Resources
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Resources</h2>
            <p className="text-gray-600">{resources.length} resources</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>

        {resources.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No resources yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start building your collection by adding your first resource
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Resource
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditResource(resource)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteResource(resource.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">
                      {resource.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageResources;
