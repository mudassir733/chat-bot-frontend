import { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Plus, MessageSquare, MoreHorizontal, Trash2, Edit3 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AppSidebar({ chats, currentChatId, onChatSelect, onNewChat, onDeleteChat }) {
    const [editingId, setEditingId] = useState(null)
    const [editTitle, setEditTitle] = useState('')

    const handleEditStart = (chat) => {
        setEditingId(chat.id)
        setEditTitle(chat.title)
    }

    const handleEditSave = () => {
        // In a real app, you'd call an update function here
        setEditingId(null)
    }

    const formatDate = (date) => {
        const now = new Date()
        const chatDate = new Date(date)
        const diffTime = Math.abs(now - chatDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return 'Today'
        if (diffDays === 2) return 'Yesterday'
        if (diffDays <= 7) return `${diffDays - 1} days ago`
        return chatDate.toLocaleDateString()
    }

    const groupedChats = chats.reduce((groups, chat) => {
        const dateKey = formatDate(chat.createdAt)
        if (!groups[dateKey]) {
            groups[dateKey] = []
        }
        groups[dateKey].push(chat)
        return groups
    }, {})

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="p-4">
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    New Chat
                </Button>
            </SidebarHeader>

            <SidebarContent className="px-2">
                {Object.entries(groupedChats).map(([dateGroup, groupChats]) => (
                    <SidebarGroup key={dateGroup}>
                        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                            {dateGroup}
                        </div>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {groupChats.map((chat) => (
                                    <SidebarMenuItem key={chat.id}>
                                        <div className="group flex items-center w-full">
                                            <SidebarMenuButton
                                                onClick={() => onChatSelect(chat.id)}
                                                isActive={currentChatId === chat.id}
                                                className="flex-1 justify-start gap-2 pr-8"
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                                <span className="truncate">
                                                    {editingId === chat.id ? (
                                                        <input
                                                            value={editTitle}
                                                            onChange={(e) => setEditTitle(e.target.value)}
                                                            onBlur={handleEditSave}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleEditSave()
                                                                if (e.key === 'Escape') setEditingId(null)
                                                            }}
                                                            className="bg-transparent border-none outline-none w-full"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        chat.title
                                                    )}
                                                </span>
                                            </SidebarMenuButton>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <MoreHorizontal className="h-3 w-3" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditStart(chat)}>
                                                        <Edit3 className="h-4 w-4 mr-2" />
                                                        Rename
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onDeleteChat(chat.id)}
                                                        className="text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4">
                <div className="text-xs text-muted-foreground text-center">
                    Gemini Clone v1.0
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
