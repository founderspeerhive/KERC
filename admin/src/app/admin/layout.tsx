// src/app/admin/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
