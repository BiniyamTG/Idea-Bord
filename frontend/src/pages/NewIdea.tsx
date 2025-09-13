import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const suggestedTags = [
  "AI", "Web Development", "Mobile", "Blockchain", "IoT", 
  "Healthcare", "Education", "Finance", "Gaming", "Social",
  "Sustainability", "Security", "Data Science", "AR/VR", "Automation"
];

export default function NewIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      setTags([...tags, tag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Idea shared successfully!",
        description: "Your brilliant idea has been posted to the community.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share your idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Share Your Idea</h1>
              <p className="text-muted-foreground">
                Transform your brilliant concept into reality with community feedback
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>What's your innovative idea?</CardTitle>
              <CardDescription>
                Share your concept with the community and get valuable feedback to help bring it to life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="Give your idea a catchy title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    {title.length}/100 characters
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your idea in detail. What problem does it solve? How does it work? What makes it unique?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[200px] resize-none"
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground">
                    {description.length}/2000 characters • Markdown supported
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Tags ({tags.length}/5)
                  </label>
                  
                  {/* Selected tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Add new tag */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag (e.g., AI, Web Development)..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(newTag);
                        }
                      }}
                      disabled={tags.length >= 5}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addTag(newTag)}
                      disabled={!newTag.trim() || tags.length >= 5}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Suggested tags */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags
                        .filter(tag => !tags.includes(tag))
                        .slice(0, 8)
                        .map((tag) => (
                          <Button
                            key={tag}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addTag(tag)}
                            disabled={tags.length >= 5}
                            className="h-7 text-xs"
                          >
                            {tag}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting || !title.trim() || !description.trim()}
                    className="flex-1"
                  >
                    {isSubmitting ? "Sharing..." : "Share Idea"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}