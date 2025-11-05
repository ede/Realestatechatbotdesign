import React, { useState, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { QuickActions } from './components/QuickActions';
import { Button } from './components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { Home, Send, Share2, X, Plus, ImageIcon, CalendarDays, Sun, Mic, Minimize2 } from 'lucide-react';
import floorplanIcon from 'figma:asset/c002938dbdf39e7dffbf0119d9dbbd21a68d9d31.png';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'user',
      content: 'Where is the nearest sandy beach to my house (Brunnenstrasse 41, 10115 Berlin)?',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '2',
      type: 'ai',
      content: `I'll help you find the nearest sandy beach to that address in Berlin. Let me search for information about beaches near Brunnenstrasse 41 in Berlin.

Based on the search results, the nearest sandy beaches to Brunnenstrasse 41 in Berlin (which is in the Mitte district) are quite close! Here are your best options:

**Closest options in/near central Berlin:**

**Strandbar Mitte** - This is right in the heart of Berlin, located on the Spree River just across from Museum Island. It's only a short walk from Alexanderplatz and the Brandenburg Gate, offering a sandy beach atmosphere with real palm trees and beach bars. It's the oldest beach bar operating in the city itself, founded in 2002.`,
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [context, setContext] = useState('general');
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Bedroom');

  const rooms = ['Bedroom', 'Livingroom', 'Kitchen', 'Bathroom', 'Basement'];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('qualify') || lowerQuestion.includes('buyer')) {
      return `Here are key buyer qualification questions:

1. **Financial Readiness**
   - What's your budget range?
   - Are you pre-approved for a mortgage?
   - How much do you have for a down payment?

2. **Timeline**
   - When are you looking to move?
   - Is this urgent or flexible?

3. **Must-Haves**
   - How many bedrooms/bathrooms?
   - Preferred neighborhoods?
   - School district requirements?

4. **Current Situation**
   - Do you need to sell first?
   - Are you a first-time buyer?

Would you like me to create a follow-up email template for this lead?`;
    }
    
    if (lowerQuestion.includes('market') || lowerQuestion.includes('price')) {
      return `I can help with market analysis. For accurate pricing, I'd need:

• Property address and details
• Recent comparable sales (within 0.5 miles, last 90 days)
• Current market conditions in the area
• Unique features or upgrades

**Current Market Insights:**
- Average days on market in most areas: 25-35 days
- Well-priced homes are receiving multiple offers
- Buyers are focused on move-in ready properties
- Updated kitchens and bathrooms add 5-10% value

Would you like me to draft a CMA (Comparative Market Analysis) report template?`;
    }

    if (lowerQuestion.includes('schedule') || lowerQuestion.includes('showing')) {
      return `I can help you manage showings efficiently:

**Best Practices for Scheduling:**
1. Confirm availability within 2 hours of request
2. Bundle showings in the same area to save time
3. Allow 30-45 minutes per property
4. Send confirmation texts 2 hours before

**Sample Response Template:**
"Thank you for your interest! I have availability for a showing at [Property Address] on:
- [Day] at [Time]
- [Day] at [Time]

Please let me know which works best, and I'll send you a calendar invite with directions."

Would you like me to create a showing checklist?`;
    }

    return `I'm here to help with your real estate needs! I can assist with:

• Writing listing descriptions
• Qualifying potential buyers
• Market analysis and pricing
• Scheduling and coordination
• Client follow-up emails
• Neighborhood information
• Open house planning
• Social media content

What specific task can I help you with today?`;
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  // Auto-expand when user types in minimized mode
  useEffect(() => {
    if (isMinimized && inputValue.length > 0) {
      setIsMinimized(false);
    }
  }, [inputValue, isMinimized]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className={`flex flex-col ${isMinimized ? 'w-auto max-w-md' : 'flex-1 max-w-4xl'} mx-auto w-full bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-300`}>
        {/* Header */}
        {!isMinimized && (
          <div className="flex items-center justify-between px-6 py-4 border-b bg-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Kukan Home Assistant</h1>
                <p className="text-sm text-gray-500">Learn everything about this home</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleMinimize}>
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {!isMinimized && messages.length === 0 && (
          <div className="p-6">
            <QuickActions onActionClick={handleQuickAction} />
          </div>
        )}

        {/* Messages */}
        {!isMinimized && (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-blue-50 p-6 rounded-full mb-4">
                  <Home className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-gray-900 mb-2">Welcome to your Real Estate AI Assistant</h2>
                <p className="text-gray-600 max-w-md">
                  Get instant help with listings, client qualification, market analysis, and more. 
                  Select a quick action above or type your question below.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
          </div>
        )}

        {/* Room Navigation */}
        {!isMinimized && (
          <div className="px-6 py-4 bg-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 flex-wrap">
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedRoom === room
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/40 text-gray-700 hover:bg-white/60'
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className={`${isMinimized ? '' : 'border-t'} bg-white/20 backdrop-blur-sm px-6 py-4`}>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <div className={`bg-white/60 backdrop-blur-sm rounded-2xl ${isMinimized ? 'p-2' : 'p-4'}`}>
                {isMinimized ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask Anything, e.g. nearby schools, grocery stores, features of this room"
                    className="w-full bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 px-2 py-1"
                  />
                ) : (
                  <>
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Ask Anything, e.g. nearby schools, grocery stores, features of this room"
                      className="w-full resize-none bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
                      rows={2}
                    />
                    
                    {/* Toolbar */}
                    <TooltipProvider>
                      <div className="flex items-center gap-3 mt-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                          <Plus className="w-5 h-5" />
                        </Button>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                              <ImageIcon className="w-5 h-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Photos</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900 p-1.5">
                              <img src={floorplanIcon} alt="Floorplan" className="w-full h-full object-contain" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Floorplan</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                              <CalendarDays className="w-5 h-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Book a Viewing</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                              <Sun className="w-5 h-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Adjust daylight</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <div className="flex-1" />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                          <Mic className="w-5 h-5" />
                        </Button>
                      </div>
                    </TooltipProvider>
                  </>
                )}
              </div>
            </div>
            {!isMinimized && (
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 h-[88px] px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
