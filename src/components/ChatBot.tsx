import { X, Bot, User, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Array<{type: 'bot' | 'user', text: string}>>([]);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);

  const questions = [
    "What crops grow best in my region?",
    "How can I improve soil health naturally?", 
    "What's the best time to plant this season?",
    "How do I manage pests naturally?"
  ];

  const answers: Record<string, string> = {
    "What crops grow best in my region?": "For optimal crop selection, consider your local climate zone, soil type, and rainfall patterns. Common high-yield crops include wheat, corn, soybeans, and rice depending on your region. Consult your local agricultural extension office for region-specific recommendations.",
    "How can I improve soil health naturally?": "Improve soil health through crop rotation, cover cropping, composting, and reduced tillage. Add organic matter like compost or manure, test soil pH regularly, and avoid overuse of chemical fertilizers.",
    "What's the best time to plant this season?": "Planting times depend on your crop type and local frost dates. Cool-season crops can be planted 2-4 weeks before the last frost, while warm-season crops should be planted after the last frost date.",
    "How do I manage pests naturally?": "Use integrated pest management: encourage beneficial insects, practice crop rotation, use companion planting, and apply organic pesticides only when necessary. Regular monitoring is key."
  };

  const availableQuestions = questions.filter(q => !askedQuestions.includes(q));

  const handleQuestionClick = (question: string) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: question },
      { type: 'bot', text: answers[question] }
    ]);
    setAskedQuestions(prev => [...prev, question]);
  };

  if (!isOpen) return null;

  return (
    <>


      <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white shadow-xl z-[9999] rounded-lg border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h2 className="text-lg font-semibold">AI Assistant</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="chatbot flex-1 p-4 overflow-y-auto overflow-x-hidden relative bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Animated Dotted Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              animation: 'float 6s ease-in-out infinite'
            }} />
          </div>
          <div className="relative z-10 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center gap-2 p-3 bg-white/80 rounded-lg shadow-sm">
                <Bot className="h-5 w-5 text-primary" />
                <p className="text-sm">Hello! I'm here to help with your farming questions. Choose one below:</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && <Bot className="h-5 w-5 text-primary mt-1" />}
                <div className={`max-w-[75%] p-3 rounded-lg shadow-sm break-words ${
                  message.type === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-white/90 text-gray-800'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-relaxed flex-1">{message.text}</p>
                    {message.type === 'bot' && (
                      <button
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(message.text);
                          speechSynthesis.speak(utterance);
                        }}
                        className="text-gray-500 hover:text-primary transition-colors p-1"
                        title="Read aloud"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                {message.type === 'user' && <User className="h-5 w-5 text-gray-500 mt-1" />}
              </div>
            ))}

            {/* Available Questions */}
            {availableQuestions.length > 0 && (
              <div className="space-y-3 mt-4">
                {availableQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left p-3 bg-white/80 border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all"
                  >
                    <p className="text-sm">{question}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>



        {/* Footer */}
        <div className="p-4 border-t">
          <Button onClick={onClose} variant="outline" className="w-full">
            Exit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
