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
} from "@/components/ui/sidebar"
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  Calendar, 
  MessageSquare,
  ShieldAlert,
  Upload
} from "lucide-react"
import Link from "next/link"
import {
  SignedIn,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const { user } = useUser();
  
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
                <Link href="/dashboard" className="w-full">
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Medical Records</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/medical-records/upload" className="w-full">
                  <SidebarMenuButton>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Records
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/medical-records/requests" className="w-full">
                  <SidebarMenuButton>
                    <FileText className="h-4 w-4 mr-2" />
                    Access Requests
                  </SidebarMenuButton>
                </Link>
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
      <SidebarFooter className="border-t p-4">
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton/>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.fullName}</span>
            </div>
          </div>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  )
}
