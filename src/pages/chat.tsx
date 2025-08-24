import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

export function ChatPage() {
  const { conversationId } = useParams();

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="p-12">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Chat Feature</h3>
              <p className="text-muted-foreground">
                Chat functionality will be implemented here. 
                {conversationId && ` Conversation ID: ${conversationId}`}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}