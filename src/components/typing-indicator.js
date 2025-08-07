import { Sparkles } from 'lucide-react'

export function TypingIndicator() {
    return (
        <div className="flex gap-4 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
            </div>

            <div className="max-w-[80%] space-y-2">
                <div className="rounded-2xl px-4 py-3 bg-muted">
                    <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
