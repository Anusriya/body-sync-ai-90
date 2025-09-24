import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const CommunityPage = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah M.",
      avatar: "SM",
      time: "2 hours ago",
      category: "Sleep",
      content: "Finally found a sleep routine that works! Sync'd helped me identify that my phone usage before bed was the main culprit. 3 weeks of consistent improvement!",
      likes: 24,
      comments: 8,
      liked: false
    },
    {
      id: 2,
      author: "Mike T.",
      avatar: "MT",
      time: "5 hours ago",
      category: "Pain",
      content: "Lower back pain update: The AI suggested gentle stretches and posture changes. Started seeing improvement after just 1 week. The body heat map feature is incredible!",
      likes: 31,
      comments: 12,
      liked: true
    },
    {
      id: 3,
      author: "Elena R.",
      avatar: "ER",
      time: "1 day ago",
      category: "Nutrition",
      content: "Who else struggles with afternoon energy crashes? Sync'd's nutrition insights helped me realize I was eating too many refined carbs. Simple changes, big results!",
      likes: 18,
      comments: 15,
      liked: false
    }
  ]);

  const categories = [
    { name: "All", count: 156, active: true },
    { name: "Pain Relief", count: 43, active: false },
    { name: "Sleep", count: 38, active: false },
    { name: "Nutrition", count: 29, active: false },
    { name: "Mental Health", count: 31, active: false },
    { name: "Success Stories", count: 15, active: false }
  ];

  const trendingTopics = [
    "Morning Routines",
    "Stress Management",
    "Pain-Free Workouts",
    "Sleep Hygiene",
    "Mindful Eating"
  ];

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: "You",
      avatar: "YO",
      time: "now",
      category: "General",
      content: newPost,
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Community
          </h1>
          <p className="text-muted-foreground">
            Connect, share, and learn from fellow wellness journeys
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">2.4k</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="w-5 h-5 text-secondary mr-2" />
                    <span className="text-2xl font-bold">156</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Posts This Week</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-tertiary mr-2" />
                    <span className="text-2xl font-bold">94%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your wellness journey, tips, or ask for advice..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] glass"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Pain Relief
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">
                    Sleep
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-tertiary/10">
                    Nutrition
                  </Badge>
                </div>
                <Button 
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                  variant="hero"
                  size="sm"
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={category.active ? "default" : "outline"}
              className="whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </motion.div>

        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                  >
                    #{topic.replace(" ", "")}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card className="glass">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-background font-semibold text-sm">
                        {post.avatar}
                      </div>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-foreground">{post.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{post.time}</span>
                      </div>
                      
                      <p className="text-foreground/90 mb-4 leading-relaxed">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 ${post.liked ? 'text-red-500' : ''}`}
                        >
                          <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <Button variant="soft" className="px-8">
            Load More Posts
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;