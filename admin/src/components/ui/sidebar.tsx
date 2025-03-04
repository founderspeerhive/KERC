// src/components/ui/sidebar.tsx
"use client"

import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Slot } from "@radix-ui/react-slot"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Sidebar Context
interface SidebarContextValue {
  open: boolean
  setOpen: (value: boolean) => void
  collapsible: boolean
}

const SidebarContext = React.createContext<SidebarContextValue>({
  open: true,
  setOpen: () => {},
  collapsible: true,
})

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Sidebar Provider
interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  collapsible?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  collapsible = true,
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  // Create a stable reference to the context value
  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      collapsible,
    }),
    [open, collapsible]
  )

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

// Sidebar
const sidebarVariants = cva(
  "h-screen flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "w-64",
        sm: "w-16",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: boolean
}

export function Sidebar({
  className,
  variant,
  collapsible = true,
  ...props
}: SidebarProps) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        sidebarVariants({ variant: open ? "default" : "sm" }),
        className
      )}
      {...props}
    />
  )
}

// Sidebar Header
export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        "flex h-14 items-center px-4 shrink-0",
        open ? "justify-between" : "justify-center",
        className
      )}
      {...props}
    />
  )
}

// Sidebar Content
export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-auto py-2", className)}
      {...props}
    />
  )
}

// Sidebar Footer
export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center p-4 shrink-0",
        open ? "justify-between" : "justify-center",
        className
      )}
      {...props}
    />
  )
}

// Sidebar Group
export function SidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-2", className)} {...props} />
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <div
      className={cn(
        "mb-2 px-2 text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export function SidebarGroupContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />
}

// Sidebar Menu
export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("space-y-1", className)} role="menu" {...props} />
  )
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn(className)} role="menuitem" {...props} />
}

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const { open } = useSidebar()
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        open ? "justify-start" : "justify-center",
        className
      )}
      {...props}
    />
  )
}

// Sidebar Trigger
export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar()

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
}

// Sidebar Submenu
interface SidebarMenuSubProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarMenuSub({
  children,
  defaultOpen = false,
}: SidebarMenuSubProps) {
  return <Collapsible defaultOpen={defaultOpen}>{children}</Collapsible>
}

export function SidebarMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsibleTrigger>) {
  const { open } = useSidebar()

  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg.chevron]:rotate-90",
        open ? "justify-between" : "justify-center",
        className
      )}
      {...props}
    >
      {children}
      {open && <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 chevron" />}
    </CollapsibleTrigger>
  )
}

export function SidebarMenuSubContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsibleContent>) {
  const { open } = useSidebar()

  return (
    <CollapsibleContent
      className={cn(
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        open ? "pl-4" : "",
        className
      )}
      {...props}
    />
  )
}
