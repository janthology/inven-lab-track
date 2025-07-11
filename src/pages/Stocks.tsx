import { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  Plus,
  Edit,
  History,
  Package,
  Minus,
  MoreHorizontal,
  Eye,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data - replace with API calls
const mockStocks = [
  {
    id: 1,
    itemName: "Sodium Chloride",
    category: "Chemicals",
    laboratory: "Chemistry Lab A",
    currentStock: 5.5,
    criticalLevel: 10.0,
    unit: "kg",
    lastUpdated: "2024-01-15 14:30",
    status: "low",
    supplier: "ChemCorp Ltd",
    storageLocation: "Cabinet A-1",
    batchCode: "SC-2024-001",
    expirationDate: "2025-06-30",
  },
  {
    id: 2,
    itemName: "Hydrochloric Acid",
    category: "Acids",
    laboratory: "Chemistry Lab A",
    currentStock: 25.0,
    criticalLevel: 15.0,
    unit: "L",
    lastUpdated: "2024-01-14 09:15",
    status: "adequate",
    supplier: "AcidSupply Co",
    storageLocation: "Acid Cabinet B-2",
    batchCode: "HCL-2024-003",
    expirationDate: "2024-12-31",
  },
  {
    id: 3,
    itemName: "Microscope Slides",
    category: "Glassware",
    laboratory: "Biology Lab",
    currentStock: 50,
    criticalLevel: 20,
    unit: "pcs",
    lastUpdated: "2024-01-16 11:45",
    status: "adequate",
    supplier: "LabGlass Inc",
    storageLocation: "Storage Room 1",
    batchCode: "MS-2024-005",
    expirationDate: "N/A",
  },
  {
    id: 4,
    itemName: "Ethanol 95%",
    category: "Solvents",
    laboratory: "Biology Lab",
    currentStock: 2.0,
    criticalLevel: 5.0,
    unit: "L",
    lastUpdated: "2024-01-13 16:20",
    status: "critical",
    supplier: "SolventPro",
    storageLocation: "Solvent Cabinet",
    batchCode: "ETH-2024-002",
    expirationDate: "2026-01-15",
  },
  {
    id: 5,
    itemName: "Petri Dishes",
    category: "Consumables",
    laboratory: "Microbiology Lab",
    currentStock: 150,
    criticalLevel: 50,
    unit: "pcs",
    lastUpdated: "2024-01-16 08:30",
    status: "adequate",
    supplier: "MicroSupplies",
    storageLocation: "Storage Shelf C-3",
    batchCode: "PD-2024-007",
    expirationDate: "2025-12-31",
  },
];

const mockLaboratories = [
  { id: 1, name: "Chemistry Lab A" },
  { id: 2, name: "Biology Lab" },
  { id: 3, name: "Microbiology Lab" },
  { id: 4, name: "Physics Lab" },
];

export default function Stocks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [adjustmentData, setAdjustmentData] = useState({
    type: "adjustment",
    quantity: "",
    remarks: "",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Critical</Badge>;
      case "low":
        return <Badge variant="secondary" className="gap-1"><TrendingDown className="h-3 w-3" />Low</Badge>;
      case "adequate":
        return <Badge variant="default" className="gap-1"><TrendingUp className="h-3 w-3" />Adequate</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredStocks = mockStocks.filter((stock) => {
    const matchesSearch = stock.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.batchCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLab = selectedLab === "all" || stock.laboratory === selectedLab;
    const matchesStatus = stockFilter === "all" || stock.status === stockFilter;
    
    return matchesSearch && matchesLab && matchesStatus;
  });

  const stockSummary = {
    total: mockStocks.length,
    critical: mockStocks.filter(s => s.status === "critical").length,
    low: mockStocks.filter(s => s.status === "low").length,
    adequate: mockStocks.filter(s => s.status === "adequate").length,
  };

  const handleAdjustStock = () => {
    console.log("Adjusting stock:", selectedStock, adjustmentData);
    setIsAdjustDialogOpen(false);
    setSelectedStock(null);
    setAdjustmentData({ type: "adjustment", quantity: "", remarks: "" });
  };

  const openAdjustDialog = (stock: any) => {
    setSelectedStock(stock);
    setIsAdjustDialogOpen(true);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
          <p className="text-muted-foreground">Monitor and manage inventory levels across all laboratories</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Stock Entry
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockSummary.total}</div>
            <p className="text-xs text-muted-foreground">Across all laboratories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stockSummary.critical}</div>
            <p className="text-xs text-muted-foreground">Immediate attention required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stockSummary.low}</div>
            <p className="text-xs text-muted-foreground">Below recommended levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adequate Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stockSummary.adequate}</div>
            <p className="text-xs text-muted-foreground">Within safe levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Inventory</CardTitle>
          <CardDescription>View and manage stock levels across laboratories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search items, categories, or batch codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedLab} onValueChange={setSelectedLab}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select laboratory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Laboratories</SelectItem>
                  {mockLaboratories.map((lab) => (
                    <SelectItem key={lab.id} value={lab.name}>
                      {lab.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="adequate">Adequate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stock Table */}
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Laboratory</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Critical Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{stock.itemName}</div>
                        <div className="text-sm text-muted-foreground">
                          {stock.category} • {stock.batchCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{stock.laboratory}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {stock.currentStock} {stock.unit}
                      </div>
                    </TableCell>
                    <TableCell>
                      {stock.criticalLevel} {stock.unit}
                    </TableCell>
                    <TableCell>{getStatusBadge(stock.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {stock.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openAdjustDialog(stock)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Adjust Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="mr-2 h-4 w-4" />
                            View Movements
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Restock
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Minus className="mr-2 h-4 w-4" />
                            Mark Usage
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

      {/* Stock Adjustment Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock Level</DialogTitle>
            <DialogDescription>
              Adjust the stock level for {selectedStock?.itemName} in {selectedStock?.laboratory}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="movement-type">Movement Type</Label>
              <Select
                value={adjustmentData.type}
                onValueChange={(value) => setAdjustmentData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restock">Restock</SelectItem>
                  <SelectItem value="usage">Usage</SelectItem>
                  <SelectItem value="adjustment">Adjustment</SelectItem>
                  <SelectItem value="breakage">Breakage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity ({selectedStock?.unit})</Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                value={adjustmentData.quantity}
                onChange={(e) => setAdjustmentData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="Enter quantity"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={adjustmentData.remarks}
                onChange={(e) => setAdjustmentData(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="Optional remarks..."
              />
            </div>
            {selectedStock && (
              <div className="rounded-lg bg-muted p-3">
                <div className="text-sm">
                  <div className="font-medium">Current Stock: {selectedStock.currentStock} {selectedStock.unit}</div>
                  <div className="text-muted-foreground">Critical Level: {selectedStock.criticalLevel} {selectedStock.unit}</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustStock}>
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}