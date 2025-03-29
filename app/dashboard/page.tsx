"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would verify authentication with a backend
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const role = localStorage.getItem("userRole")

    if (!isAuthenticated) {
      router.push("/login")
    } else {
      setUserRole(role)
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Reports</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            {userRole === "admin" && <TabsTrigger value="settings">Settings</TabsTrigger>}
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,432</div>
                  <p className="text-xs text-muted-foreground">+43 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Sales chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Your best selling products this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Organic Cotton T-Shirt",
                      "Eco-Friendly Water Bottle",
                      "Handmade Ceramic Mug",
                      "Recycled Paper Notebook",
                    ].map((product, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-[46px] h-[46px] rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{product}</p>
                          <p className="text-sm text-muted-foreground">
                            ${(Math.random() * 100).toFixed(2)} x {Math.floor(Math.random() * 100)} units
                          </p>
                        </div>
                        <div className="ml-auto font-medium">${(Math.random() * 1000).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/pos" className="w-full">
                    <Button className="w-full">Open Register</Button>
                  </Link>
                  <Link href="/inventory" className="w-full">
                    <Button variant="outline" className="w-full">
                      Manage Inventory
                    </Button>
                  </Link>
                  {userRole === "admin" && (
                    <Link href="/users" className="w-full">
                      <Button variant="outline" className="w-full">
                        Manage Users
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Organic Cotton T-Shirt (Small) - Low Stock</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Handmade Ceramic Mug (Blue) - Low Stock</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">Recycled Paper Notebook - Medium Stock</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "John", action: "processed a sale", time: "2 minutes ago" },
                      { user: "Sarah", action: "updated inventory", time: "1 hour ago" },
                      { user: "Admin", action: "generated monthly report", time: "3 hours ago" },
                      { user: "System", action: "performed daily backup", time: "12 hours ago" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>View your sales performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics charts will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span>Sales Report</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Package className="h-6 w-6 mb-2" />
                      <span>Inventory Report</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Users className="h-6 w-6 mb-2" />
                      <span>Customer Report</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {userRole === "admin" && (
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Manage your POS system settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        User Management
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Package className="mr-2 h-4 w-4" />
                        Product Categories
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Tax Settings
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Discount Rules
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

