import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  TrendingUp, 
  ThumbsUp, 
  Hash,
  Filter,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [sortBy, setSortBy] = useState("recent");
  const [showAllTags, setShowAllTags] = useState(false);

  const sortOptions = [
    { id: "recent", label: "Most Recent", icon: Clock },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "votes", label: "Most Voted", icon: ThumbsUp },
  ];

  const popularTags = [
    { name: "AI", count: 156 },
    { name: "Web3", count: 89 },
    { name: "Startup", count: 134 },
    { name: "Design", count: 78 },
    { name: "Mobile", count: 92 },
    { name: "SaaS", count: 67 },
    { name: "Healthcare", count: 45 },
    { name: "Education", count: 38 },
  ];

  const visibleTags = showAllTags ? popularTags : popularTags.slice(0, 5);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`w-64 border-r bg-gradient-subtle p-6 ${className}`}
    >
      {/* Sort Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Sort By</h3>
        </div>
        
        <div className="space-y-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant={sortBy === option.id ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSortBy(option.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Popular Tags */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Popular Tags</h3>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {visibleTags.map((tag, index) => (
              <motion.div
                key={tag.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between h-auto p-2"
                >
                  <span className="text-sm">{tag.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {tag.count}
                  </Badge>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-muted-foreground"
            onClick={() => setShowAllTags(!showAllTags)}
          >
            {showAllTags ? (
              <>
                <ChevronUp className="mr-2 h-3 w-3" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-3 w-3" />
                Show More ({popularTags.length - 5} more)
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Quick Stats */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Ideas</span>
            <span className="font-medium">2,847</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-medium text-primary">+127</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Users</span>
            <span className="font-medium">1,234</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}