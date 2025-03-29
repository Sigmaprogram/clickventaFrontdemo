"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Package, Plus, Search, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    category: "clothing",
    stock: 45,
    sku: "CLO-001",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Eco-Friendly Water Bottle",
    price: 15.99,
    category: "accessories",
    stock: 78,
    sku: "ACC-001",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Handmade Ceramic Mug",
    price: 12.99,
    category: "home",
    stock: 12,
    sku: "HOM-001",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Recycled Paper Notebook",
    price: 8.99,
    category: "stationery",
    stock: 34,
    sku: "STA-001",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Bamboo Toothbrush",
    price: 4.99,
    category: "health",
    stock: 56,
    sku: "HEA-001",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Reusable Produce Bags",
    price: 9.99,
    category: "home",
    stock: 23,
    sku: "HOM-002",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Natural Soy Candle",
    price: 18.99,
    category: "home",
    stock: 18,
    sku: "HOM-003",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Organic Lip Balm",
    price: 3.99,
    category: "health",
    stock: 67,
    sku: "HEA-002",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Stainless Steel Straw Set",
    price: 11.99,
    category: "accessories",
    stock: 42,
    sku: "ACC-002",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Hemp Backpack",
    price: 49.99,
    category: "accessories",
    stock: 15,
    sku: "ACC-003",
    image: "/placeholder.svg",
  },
]

// Product categories
const categories = ["all", "clothing", "accessories", "home", "stationery", "health"]

export default function InventoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<(typeof mockProducts)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    description: "",
  })

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

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      sku: "",
      description: "",
    })
    setEditingProduct(null)
  }

  // Open edit dialog
  const openEditDialog = (product: (typeof mockProducts)[0]) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      sku: product.sku,
      description: "",
    })
    setIsAddProductOpen(true)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct = {
      id: editingProduct ? editingProduct.id : products.length + 1,
      name: formData.name,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      stock: Number.parseInt(formData.stock),
      sku: formData.sku,
      image: "/placeholder.svg",
    }

    if (editingProduct) {
      // Update existing product
      setProducts((prev) => prev.map((product) => (product.id === editingProduct.id ? newProduct : product)))
    } else {
      // Add new product
      setProducts((prev) => [...prev, newProduct])
    }

    resetForm()
    setIsAddProductOpen(false)
  }

  // Delete product
  const deleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product.id !== id))
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <div className="flex items-center space-x-2">
            <Dialog
              open={isAddProductOpen}
              onOpenChange={(open) => {
                setIsAddProductOpen(open)
                if (!open) resetForm()
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                  <DialogDescription>
                    {editingProduct
                      ? "Update the product details below."
                      : "Fill in the product details to add it to your inventory."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" name="sku" value={formData.sku} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((c) => c !== "all")
                            .map((category) => (
                              <SelectItem key={category} value={category} className="capitalize">
                                {category}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetForm()
                        setIsAddProductOpen(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">{editingProduct ? "Update Product" : "Add Product"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Products</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="object-cover w-full h-full"
                              width={40}
                              height={40}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-medium ${
                              product.stock <= 10 ? "text-red-500" : product.stock <= 20 ? "text-amber-500" : ""
                            }`}
                          >
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            {userRole === "admin" && (
                              <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {new Set(products.map((p) => p.category)).size} categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <Badge variant="destructive">{products.filter((p) => p.stock <= 15).length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter((p) => p.stock <= 15).length}</div>
              <p className="text-xs text-muted-foreground">Items with 15 or fewer units</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
              <span className="text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${products.reduce((total, product) => total + product.price * product.stock, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Based on current stock levels</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <span className="text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(products.reduce((total, product) => total + product.price, 0) / products.length).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Across all products</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

