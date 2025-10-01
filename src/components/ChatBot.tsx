import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const suggestedQuestions = [
    "What crops grow best in my region?",
    "How can I improve soil health naturally?",
  ];

  const handleQuestionClick = (question: string) => {
    // Handle question click - can be expanded to open full chat
    console.log("Question clicked:", question);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Chatbot Popup */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background shadow-large z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-muted-foreground mb-6">
            Here are some quick questions you can ask:
          </p>

          <div className="space-y-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left p-4 bg-secondary text-secondary-foreground rounded-xl shadow-soft hover:shadow-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Exit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
