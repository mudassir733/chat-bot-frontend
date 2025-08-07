'use client'

import { useState, useEffect } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { ChatInterface } from '@/components/chat-interface'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Home() {
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const createNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChatId)
    return newChatId
  }

  const updateChatTitle = (chatId, title) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, title } : chat
    ))
  }

  const updateChatMessages = (chatId, messages) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, messages } : chat
    ))
  }

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId) {
      setCurrentChatId(null)
    }
  }

  const currentChat = chats.find(chat => chat.id === currentChatId)

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <AppSidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={setCurrentChatId}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
      />

      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Gemini</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatInterface
            chat={currentChat}
            onUpdateMessages={updateChatMessages}
            onUpdateTitle={updateChatTitle}
            onNewChat={createNewChat}
          />
        </main>
      </SidebarInset>
    </div>


  )
}
