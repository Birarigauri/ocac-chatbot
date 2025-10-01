import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sprout, Tractor, Cloud } from "lucide-react";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const categories = [
    { icon: Sprout, title: "Crop Management", desc: "Get advice on planting and harvesting" },
    { icon: Tractor, title: "Equipment", desc: "Learn about farm machinery" },
    { icon: Cloud, title: "Weather Insights", desc: "Check weather predictions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Farmer Portal</h1>
          </div>
          <Button
            onClick={() => setIsChatOpen(true)}
            className="gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            AI Assistant
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Your Farm Dashboard
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose a category below to get started with our AI assistant
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                onClick={() => setIsChatOpen(true)}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-border hover:border-primary group"
              >
                <Icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-muted-foreground">{category.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
              How Our AI Assistant Helps You
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Get instant answers to your farming questions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Receive personalized crop recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Access weather insights and planning tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Learn best practices for sustainable farming</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* ChatBot Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
