"use client";

import * as React from "react";
import { SendHorizonal, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAnswer } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function RecommendationForm() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    startTransition(async () => {
      const currentInput = input;
      setInput(""); // Clear input immediately for better UX
      
      const { data, error } = await getAnswer({
        question: currentInput,
        chatHistory: messages,
      });
      
      if (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error,
          variant: "destructive",
        });
        const errorMessage: Message = { role: 'model', content: "ขออภัยค่ะ เกิดข้อผิดพลาดบางอย่าง โปรดลองอีกครั้ง" };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }

      if (data) {
        const aiMessage: Message = { role: 'model', content: data.answer };
        setMessages(prev => [...prev, aiMessage]);
      }
    });
  };
  
  React.useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollableNode) {
          scrollableNode.scrollTo({
            top: scrollableNode.scrollHeight,
            behavior: 'smooth'
          });
        }
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl border-0">
      <CardContent className="p-0">
        <ScrollArea className="h-[450px] w-full p-4 bg-background rounded-t-xl border">
          <div className="space-y-6" ref={scrollAreaRef}>
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback><Bot size={20} /></AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap bg-muted">
                สวัสดีค่ะ มีอะไรให้รุ่งโรจน์ AI ช่วยเหลือไหมคะ?
              </div>
            </div>
            {messages.map((message, index) => (
              <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn('rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><User size={20} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin"/>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 flex items-center gap-2 bg-muted/60 rounded-b-xl border border-t-0">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์คำถามของคุณที่นี่..."
            disabled={isPending}
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" disabled={isPending || !input.trim()} size="icon">
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
