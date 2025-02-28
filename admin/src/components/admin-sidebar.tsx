// src/components/admin-sidebar.tsx
"use client"

import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubTrigger,
  SidebarMenuSubContent
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  Calendar, 
  MessageSquare,
  ShieldAlert
} from "lucide-react"
import Link from "next/link"

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <h2 className="text-lg font-semibold">KERC Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" className="w-full">
                  <SidebarMenuButton>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/users" className="w-full">
                  <SidebarMenuButton>
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/reports" className="w-full">
                  <SidebarMenuButton>
                    <FileText className="h-4 w-4 mr-2" />
                    Reports
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin/analytics" className="w-full">
                  <SidebarMenuButton>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Statistics
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </SidebarMenuSubTrigger>
                  <SidebarMenuSubContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <Link href="/admin/schedule/daily" className="w-full">
                          <SidebarMenuButton>Daily</SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <Link href="/admin/schedule/weekly" className="w-full">
                          <SidebarMenuButton>Weekly</SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <Link href="/admin/schedule/monthly" className="w-full">
                          <SidebarMenuButton>Monthly</SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarMenuSubContent>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin/settings" className="w-full">
                  <SidebarMenuButton>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/messages" className="w-full">
                  <SidebarMenuButton>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/security" className="w-full">
                  <SidebarMenuButton>
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    Security
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
