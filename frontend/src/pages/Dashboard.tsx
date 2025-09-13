import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Mock data
const mockIdeas = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    description: "A smart assistant that analyzes code commits and provides intelligent feedback, suggestions for improvements, and identifies potential bugs before they reach production. Uses machine learning to understand coding patterns and best practices.",
    author: {
      name: "Sarah Johnson",
      avatar: "",
      initials: "SJ",
    },
    tags: ["AI", "Development", "Automation"],
    votes: {
      upvotes: 47,
      downvotes: 3,
      userVote: null as 'up' | 'down' | null,
    },
    comments: 12,
    views: 234,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    title: "Sustainable Food Delivery Network",
    description: "A platform connecting local farmers directly with consumers, reducing food waste and carbon footprint. Features real-time inventory tracking, route optimization for deliveries, and community-supported agriculture subscriptions.",
    author: {
      name: "Mike Chen",
      avatar: "",
      initials: "MC",
    },
    tags: ["Sustainability", "Food", "Logistics"],
    votes: {
      upvotes: 38,
      downvotes: 5,
      userVote: 'up' as 'up' | 'down' | null,
    },
    comments: 8,
    views: 189,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "3",
    title: "Virtual Reality Meditation Spaces",
    description: "Immersive VR environments designed for meditation and mindfulness practices. Users can join guided sessions in beautiful virtual locations like forests, beaches, or mountains, with biometric feedback for personalized experiences.",
    author: {
      name: "Emma Rodriguez",
      avatar: "",
      initials: "ER",
    },
    tags: ["VR", "Wellness", "Mental Health"],
    votes: {
      upvotes: 62,
      downvotes: 2,
      userVote: null as 'up' | 'down' | null,
    },
    comments: 15,
    views: 412,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
  {
    id: "4",
    title: "Blockchain-Based Academic Credentials",
    description: "A decentralized system for issuing and verifying educational certificates and achievements. Eliminates fraud, provides instant verification, and gives students complete ownership of their academic records.",
    author: {
      name: "David Park",
      avatar: "",
      initials: "DP",
    },
    tags: ["Blockchain", "Education", "Web3"],
    votes: {
      upvotes: 29,
      downvotes: 8,
      userVote: null as 'up' | 'down' | null,
    },
    comments: 6,
    views: 156,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: "5",
    title: "Smart Home Energy Optimization",
    description: "An IoT system that learns household energy usage patterns and automatically optimizes consumption. Integrates with smart appliances, solar panels, and battery storage to minimize costs and environmental impact.",
    author: {
      name: "Lisa Wang",
      avatar: "",
      initials: "LW",
    },
    tags: ["IoT", "Energy", "Smart Home"],
    votes: {
      upvotes: 41,
      downvotes: 4,
      userVote: null as 'up' | 'down' | null,
    },
    comments: 9,
    views: 201,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
  },
  {
    id: "6",
    title: "Personalized Learning Path Generator",
    description: "An AI-driven platform that creates customized learning experiences based on individual learning styles, pace, and goals. Adapts content difficulty and presentation methods in real-time to maximize knowledge retention.",
    author: {
      name: "Alex Thompson",
      avatar: "",
      initials: "AT",
    },
    tags: ["AI", "Education", "Personalization"],
    votes: {
      upvotes: 55,
      downvotes: 1,
      userVote: null as 'up' | 'down' | null,
    },
    comments: 18,
    views: 298,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ideas, setIdeas] = useState(mockIdeas);
  const [isLoading, setIsLoading] = useState(false);

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Discover Ideas</h1>
                <p className="text-muted-foreground">
                  Explore innovative concepts and share your own brilliant ideas
                </p>
              </div>
              
              <Button variant="hero" size="lg" asChild>
                <Link to="/new-idea">
                  <Plus className="mr-2 h-5 w-5" />
                  Share Your Idea
                </Link>
              </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ideas, tags, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </motion.div>

          {/* Ideas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredIdeas.map((idea, index) => (
              <IdeaCard key={idea.id} idea={idea} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredIdeas.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No ideas found for "{searchQuery}"</p>
                <p className="text-sm">Try different keywords or browse all ideas</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="mt-4"
              >
                Show All Ideas
              </Button>
            </motion.div>
          )}

          {/* Load More Button (for future infinite scroll) */}
          {filteredIdeas.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  // Simulate loading more ideas
                  setTimeout(() => setIsLoading(false), 1000);
                }}
              >
                {isLoading ? "Loading..." : "Load More Ideas"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}