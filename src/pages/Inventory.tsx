import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  AlertTriangle,
  Package
} from "lucide-react";

const inventoryItems = [
  {
    id: 1,
    name: "Sodium Chloride",
    category: "Chemical Reagents",
    supplier: "ChemCorp Ltd",
    unit: "g",
    criticalLevel: 500,
    totalStock: 1250,
    storageLocation: "Chemical Storage A-3",
    batchCode: "SC-2024-001",
    expirationDate: "2025-12-31",
    status: "normal"
  },
  {
    id: 2,
    name: "Microscope Slides",
    category: "Lab Equipment",
    supplier: "LabSupply Inc",
    unit: "units",
    criticalLevel: 100,
    totalStock: 45,
    storageLocation: "Equipment Room B-2",
    batchCode: "MS-2024-015",
    expirationDate: null,
    status: "low"
  },
  {
    id: 3,
    name: "Ethanol 95%",
    category: "Solvents",
    supplier: "ChemCorp Ltd",
    unit: "ml",
    criticalLevel: 1000,
    totalStock: 250,
    storageLocation: "Solvent Cabinet C-1",
    batchCode: "ET-2024-008",
    expirationDate: "2026-06-15",
    status: "critical"
  },
  {
    id: 4,
    name: "Petri Dishes",
    category: "Lab Equipment",
    supplier: "BioLab Solutions",
    unit: "units",
    criticalLevel: 50,
    totalStock: 120,
    storageLocation: "Equipment Room B-1",
    batchCode: "PD-2024-022",
    expirationDate: null,
    status: "normal"
  },
  {
    id: 5,
    name: "Hydrochloric Acid",
    category: "Chemical Reagents",
    supplier: "AcidChem Co",
    unit: "ml",
    criticalLevel: 500,
    totalStock: 125,
    storageLocation: "Acid Storage D-1",
    batchCode: "HCL-2024-003",
    expirationDate: "2025-09-30",
    status: "critical"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "low":
      return <Badge variant="secondary" className="bg-warning text-warning-foreground">Low Stock</Badge>;
    case "normal":
      return <Badge variant="outline" className="bg-success/10 text-success border-success">Normal</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(inventoryItems.map(item => item.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage and track all laboratory items and supplies
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {inventoryItems.filter(item => item.status === "low").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Critical Items
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {inventoryItems.filter(item => item.status === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.length - 1}
            </div>
            <p className="text-xs text-muted-foreground">
              Item categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            View and manage all laboratory inventory items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items, categories, or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Category: {selectedCategory === "all" ? "All" : selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Total Stock</TableHead>
                  <TableHead>Critical Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      {item.totalStock} {item.unit}
                    </TableCell>
                    <TableCell>
                      {item.criticalLevel} {item.unit}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.storageLocation}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}