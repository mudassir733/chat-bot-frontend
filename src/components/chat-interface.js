'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'

export function ChatInterface({ chat, onUpdateMessages, onUpdateTitle, onNewChat }) {
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null)
    const [messages, setMessages] = useState([])
    const textareaRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)




    useEffect(() => {
        if (chat && chat.messages) {
            setMessages(chat.messages)
        } else {
            setMessages([])
        }
    }, [chat, setMessages])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        let chatId = chat?.id
        if (!chatId) {
            chatId = onNewChat()
        }

        await append({ role: 'user', content: input })
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
        }
    }

    useEffect(() => {
        adjustTextareaHeight()
    }, [input])

    if (!chat) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Hello, I'm Gemini</h2>
                    <p className="text-muted-foreground">How can I help you today?</p>
                </div>

                <div className="w-full max-w-2xl">
                    <form onSubmit={handleSubmit} className="relative">
                        <Textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter a prompt here"
                            className="h-[150px] resize-none pr-12 rounded-3xl border-2 focus:border-primary"
                            style={{ height: 'auto' }}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 bottom-3 h-8 w-8 rounded-full"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <MessageBubble
                        key={message.id || index}
                        message={message}
                        isLast={index === messages.length - 1}
                    />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
                <form onSubmit={handleSubmit} className=" flex items-center max-w-4xl mx-auto">
                    {/* <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter a prompt here"
                        className="h-[50px] resize-none pr-12 rounded-3xl border-2 focus:border-primary"
                        disabled={isLoading}
                    /> */}
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 bottom-2 h-8 w-8 rounded-full"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-2">
                    Gemini may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    )
}
