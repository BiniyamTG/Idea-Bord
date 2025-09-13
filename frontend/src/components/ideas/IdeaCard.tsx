import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Eye, 
  Calendar,
  User
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    author: {
      name: string;
      avatar?: string;
      initials: string;
    };
    tags: string[];
    votes: {
      upvotes: number;
      downvotes: number;
      userVote?: 'up' | 'down' | null;
    };
    comments: number;
    views: number;
    createdAt: Date;
  };
  index?: number;
}

export function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  const [votes, setVotes] = useState(idea.votes);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType: 'up' | 'down') => {
    if (isVoting) return;
    setIsVoting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    setVotes(prev => {
      if (prev.userVote === voteType) {
        // Remove vote
        return {
          ...prev,
          userVote: null,
          upvotes: voteType === 'up' ? prev.upvotes - 1 : prev.upvotes,
          downvotes: voteType === 'down' ? prev.downvotes - 1 : prev.downvotes,
        };
      } else {
        // Add or change vote
        const newVotes = { ...prev, userVote: voteType };
        if (prev.userVote === 'up' && voteType === 'down') {
          newVotes.upvotes -= 1;
          newVotes.downvotes += 1;
        } else if (prev.userVote === 'down' && voteType === 'up') {
          newVotes.upvotes += 1;
          newVotes.downvotes -= 1;
        } else if (voteType === 'up') {
          newVotes.upvotes += 1;
        } else {
          newVotes.downvotes += 1;
        }
        return newVotes;
      }
    });

    setIsVoting(false);
  };

  const netVotes = votes.upvotes - votes.downvotes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-strong border-border/50 hover:border-primary/20 bg-gradient-neon">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={idea.author.avatar} alt={idea.author.name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {idea.author.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{idea.author.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDistanceToNow(idea.createdAt, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <Link 
            to={`/idea/${idea.id}`}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {idea.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {idea.description}
            </p>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {idea.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            {idea.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{idea.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between">
          {/* Vote Section */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('up')}
              disabled={isVoting}
              className={`h-8 px-2 ${
                votes.userVote === 'up' 
                  ? 'text-primary bg-primary/10' 
                  : 'hover:text-primary'
              }`}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {votes.upvotes}
            </Button>
            
            <span className={`text-sm font-medium px-2 ${
              netVotes > 0 ? 'text-green-600' : 
              netVotes < 0 ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {netVotes > 0 ? '+' : ''}{netVotes}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('down')}
              disabled={isVoting}
              className={`h-8 px-2 ${
                votes.userVote === 'down' 
                  ? 'text-red-500 bg-red-50' 
                  : 'hover:text-red-500'
              }`}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {votes.downvotes}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{idea.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{idea.views}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}