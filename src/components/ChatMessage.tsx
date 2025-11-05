import React from 'react';
import { Home, User, ThumbsUp, ThumbsDown, Copy, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Bold text between **
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }
      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return <li key={index} className="ml-4">{line.replace(/^[•-]\s*/, '')}</li>;
      }
      // Numbered lists
      if (/^\d+\./.test(line.trim())) {
        return <li key={index} className="ml-4">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-600">
          <Home className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className={`rounded-lg p-4 ${
          isUser ? 'bg-gray-50' : 'bg-white border border-gray-200'
        }`}>
          <div className="text-gray-900 whitespace-pre-wrap">
            {formatContent(message.content)}
          </div>
        </div>

        {/* Actions (only for AI messages) */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 text-gray-600 hover:text-gray-900"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-gray-600 hover:text-gray-900"
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Helpful
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-gray-600 hover:text-gray-900"
            >
              <ThumbsDown className="w-3 h-3 mr-1" />
              Not helpful
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-gray-600 hover:text-gray-900"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Regenerate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
