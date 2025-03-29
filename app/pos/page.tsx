"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Search, ShoppingCart, Trash2, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock product data
const mockProducts = [
  { id: 1, name: "Organic Cotton T-Shirt", price: 24.99, category: "clothing", image: "/placeholder.svg" },
  { id: 2, name: "Eco-Friendly Water Bottle", price: 15.99, category: "accessories", image: "/placeholder.svg" },
  { id: 3, name: "Handmade Ceramic Mug", price: 12.99, category: "home", image: "/placeholder.svg" },
  { id: 4, name: "Recycled Paper Notebook", price: 8.99, category: "stationery", image: "/placeholder.svg" },
  { id: 5, name: "Bamboo Toothbrush", price: 4.99, category: "health", image: "/placeholder.svg" },
  { id: 6, name: "Reusable Produce Bags", price: 9.99, category: "home", image: "/placeholder.svg" },
  { id: 7, name: "Natural Soy Candle", price: 18.99, category: "home", image: "/placeholder.svg" },
  { id: 8, name: "Organic Lip Balm", price: 3.99, category: "health", image: "/placeholder.svg" },
  { id: 9, name: "Stainless Steel Straw Set", price: 11.99, category: "accessories", image: "/placeholder.svg" },
  { id: 10, name: "Hemp Backpack", price: 49.99, category: "accessories", image: "/placeholder.svg" },
  { id: 11, name: "Organic Cotton Socks", price: 7.99, category: "clothing", image: "/placeholder.svg" },
  { id: 12, name: "Bamboo Cutting Board", price: 19.99, category: "home", image: "/placeholder.svg" },
]

// Product categories
const categories = ["all", "clothing", "accessories", "home", "stationery", "health"]

// Cart item type
type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function POSPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [cashAmount, setCashAmount] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would verify authentication with a backend
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    if (!isAuthenticated) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // Filter products based on search term and selected category
  const filteredProducts = (category: string) => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = category === "all" || product.category === category
      return matchesSearch && matchesCategory
    })
  }

  // Add product to cart
  const addToCart = (product: (typeof mockProducts)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Update cart item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate change
  const calculateChange = () => {
    const cashValue = Number.parseFloat(cashAmount)
    if (isNaN(cashValue)) return 0
    return Math.max(0, cashValue - cartTotal)
  }

  // Process payment
  const processPayment = () => {
    // In a real application, you would process the payment with a payment gateway
    // and update inventory in your database

    // For demo purposes, we'll just clear the cart and close the dialog
    setCart([])
    setPaymentDialogOpen(false)
    setCashAmount("")

    // You would also print a receipt or send it via email
    alert("Payment processed successfully!")
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-60px)] md:flex-row">
        {/* Products Section */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">Point of Sale</h2>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
                    {filteredProducts(category).map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                            width={200}
                            height={200}
                          />
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <Button variant="default" size="sm" className="w-full" onClick={() => addToCart(product)}>
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Cart Section */}
        <div className="w-full md:w-[400px] border-t md:border-t-0 md:border-l bg-muted/40 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Current Sale</h3>
              <Badge variant="outline" className="ml-2">
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </Badge>
            </div>
          </div>

          <ScrollArea className="flex-1">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add products to begin a sale</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      <div className="flex items-center mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tax (8%)</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full" onClick={() => setCart([])} disabled={cart.length === 0}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" disabled={cart.length === 0}>
                    Pay Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Complete Payment</DialogTitle>
                    <DialogDescription>Enter payment details to complete the transaction.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Amount:</span>
                        <span className="font-bold">${(cartTotal * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cash-amount">Cash Amount</Label>
                      <Input
                        id="cash-amount"
                        placeholder="0.00"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                      />
                    </div>
                    {cashAmount && !isNaN(Number.parseFloat(cashAmount)) && (
                      <div className="space-y-2">
                        <Label>Change</Label>
                        <div className="text-2xl font-bold">${calculateChange().toFixed(2)}</div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={processPayment}
                      disabled={
                        !cashAmount ||
                        isNaN(Number.parseFloat(cashAmount)) ||
                        Number.parseFloat(cashAmount) < cartTotal * 1.08
                      }
                    >
                      Complete Sale
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

