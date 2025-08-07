import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, ThumbsUp, ThumbsDown, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MessageBubble({ message, isLast }) {
    const [copied, setCopied] = useState(false)
    const isUser = message.role === 'user'

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(message.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn(
            "flex gap-4 group",
            isUser ? "justify-end" : "justify-start"
        )}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
            )}

            <div className={cn(
                "max-w-[80%] space-y-2",
                isUser && "flex flex-col items-end"
            )}>
                <div className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    isUser
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                )}>
                    <div className="whitespace-pre-wrap break-words">
                        {message.content}
                    </div>
                </div>

                {!isUser && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={copyToClipboard}
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                        >
                            <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                        >
                            <ThumbsDown className="h-3 w-3" />
                        </Button>
                        {copied && (
                            <span className="text-xs text-muted-foreground ml-2">Copied!</span>
                        )}
                    </div>
                )}
            </div>

            {isUser && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                </div>
            )}
        </div>
    )
}
