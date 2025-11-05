import React from 'react';
import { FileText, Users, TrendingUp, Calendar, Mail, MapPin, DollarSign, Image } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions = [
  {
    icon: FileText,
    title: 'Write Listing Description',
    prompt: 'Help me write a compelling listing description for a property',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Users,
    title: 'Qualify Buyer',
    prompt: 'What questions should I ask to qualify a potential buyer?',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: TrendingUp,
    title: 'Market Analysis',
    prompt: 'Help me prepare a market analysis for a client',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Calendar,
    title: 'Schedule Showing',
    prompt: 'Create a professional showing schedule response template',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: Mail,
    title: 'Follow-Up Email',
    prompt: 'Write a follow-up email for a client who viewed a property yesterday',
    color: 'bg-pink-50 text-pink-600'
  },
  {
    icon: MapPin,
    title: 'Neighborhood Info',
    prompt: 'Help me describe the key features and amenities of a neighborhood',
    color: 'bg-cyan-50 text-cyan-600'
  },
  {
    icon: DollarSign,
    title: 'Price Negotiation',
    prompt: 'Give me strategies for negotiating price with a seller/buyer',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: Image,
    title: 'Social Media Post',
    prompt: 'Create an engaging social media post for a new listing',
    color: 'bg-indigo-50 text-indigo-600'
  }
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div>
      <h2 className="text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={() => onActionClick(action.prompt)}
            className="flex flex-col items-start p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left group"
          >
            <div className={`p-2 rounded-lg ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm text-gray-900 mb-1">{action.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{action.prompt}</p>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm text-blue-900 mb-2">💡 Pro Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use context selector to get more relevant responses</li>
          <li>• Include specific property details for better descriptions</li>
          <li>• Ask for templates to save time on repetitive tasks</li>
          <li>• Request multiple versions to find the perfect wording</li>
        </ul>
      </div>
    </div>
  );
}
