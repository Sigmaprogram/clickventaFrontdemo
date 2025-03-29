import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Package, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  // In a real application, you would check if the user is authenticated
  // If not authenticated, redirect to login page
  // const isAuthenticated = checkAuthentication()
  const isAuthenticated = false

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">RetailPOS</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A complete point-of-sale solution for small retail businesses
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,231.00</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inventory</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,432</div>
                  <p className="text-xs text-muted-foreground">+180 new items this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">+201 since last year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.8%</div>
                  <p className="text-xs text-muted-foreground">+4.3% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Point of Sale</CardTitle>
                  <CardDescription>Process sales transactions quickly and efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[140px] items-center justify-center rounded-md border border-dashed">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/pos" className="w-full">
                    <Button className="w-full">Open Register</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Add, update, and track your product inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[140px] items-center justify-center rounded-md border border-dashed">
                    <Package className="h-10 w-10 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/inventory" className="w-full">
                    <Button className="w-full">Manage Inventory</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>View sales reports and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[140px] items-center justify-center rounded-md border border-dashed">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/reports" className="w-full">
                    <Button className="w-full">View Reports</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

