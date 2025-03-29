"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Bell, ChevronLeft, Home, LogOut, Menu, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    // In a real application, you would verify authentication with a backend
    const role = localStorage.getItem("userRole")
    setUserRole(role)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Point of Sale", href: "/pos", icon: ShoppingCart },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ]

  // Only show Users link for admin role
  if (userRole === "admin") {
    navigation.push({ name: "Users", href: "/users", icon: Users })
    navigation.push({ name: "Settings", href: "/settings", icon: Settings })
  }

  const NavItems = () => (
    <>
      <div className="flex h-14 items-center px-4 border-b lg:h-[60px]">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ShoppingCart className="h-6 w-6" />
          <span className="">RetailPOS</span>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 lg:hidden" onClick={() => setOpen(false)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => {
                  if (!isDesktop) {
                    setOpen(false)
                  }
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px] pr-0">
            <NavItems />
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <h1 className="text-lg font-semibold md:text-xl lg:hidden">RetailPOS</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>{userRole === "admin" ? "AD" : "CA"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="capitalize">{userRole}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r lg:block">
          <div className="flex h-full max-h-screen flex-col">
            <NavItems />
          </div>
        </aside>
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}

