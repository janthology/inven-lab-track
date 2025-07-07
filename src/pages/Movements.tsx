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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Download
} from "lucide-react";

const movements = [
  {
    id: 1,
    itemName: "Sodium Chloride",
    laboratory: "Chemistry Lab A",
    movementType: "usage",
    quantity: 250,
    unit: "g",
    date: "2024-01-22T14:30:00",
    handledBy: "Dr. Sarah Wilson",
    remarks: "Used for titration experiment",
    batchCode: "SC-2024-001"
  },
  {
    id: 2,
    itemName: "Microscope Slides",
    laboratory: "Biology Lab B",
    movementType: "restock",
    quantity: 100,
    unit: "units",
    date: "2024-01-22T10:15:00",
    handledBy: "Lab Tech John",
    remarks: "Monthly restock from supplier",
    batchCode: "MS-2024-015"
  },
  {
    id: 3,
    itemName: "Ethanol 95%",
    laboratory: "Chemistry Lab B",
    movementType: "usage",
    quantity: 500,
    unit: "ml",
    date: "2024-01-22T09:45:00",
    handledBy: "Dr. Michael Chen",
    remarks: "Cleaning solution preparation",
    batchCode: "ET-2024-008"
  },
  {
    id: 4,
    itemName: "Petri Dishes",
    laboratory: "Microbiology Lab",
    movementType: "breakage",
    quantity: 5,
    unit: "units",
    date: "2024-01-21T16:20:00",
    handledBy: "Lab Tech Mary",
    remarks: "Accidentally dropped during experiment",
    batchCode: "PD-2024-022"
  },
  {
    id: 5,
    itemName: "Hydrochloric Acid",
    laboratory: "Chemistry Lab A",
    movementType: "adjustment",
    quantity: 75,
    unit: "ml",
    date: "2024-01-21T13:10:00",
    handledBy: "Dr. Emily Rodriguez",
    remarks: "Inventory correction after audit",
    batchCode: "HCL-2024-003"
  },
  {
    id: 6,
    itemName: "Test Tubes",
    laboratory: "Biology Lab B",
    movementType: "restock",
    quantity: 50,
    unit: "units",
    date: "2024-01-21T11:30:00",
    handledBy: "Lab Manager Jane",
    remarks: "Emergency restock for urgent experiment",
    batchCode: "TT-2024-012"
  }
];

const getMovementIcon = (type: string) => {
  switch (type) {
    case "restock":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "usage":
      return <TrendingDown className="h-4 w-4 text-primary" />;
    case "breakage":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "adjustment":
      return <Activity className="h-4 w-4 text-warning" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
};

const getMovementBadge = (type: string) => {
  switch (type) {
    case "restock":
      return <Badge variant="outline" className="bg-success/10 text-success border-success">Restock</Badge>;
    case "usage":
      return <Badge variant="outline" className="bg-primary/10 text-primary border-primary">Usage</Badge>;
    case "breakage":
      return <Badge variant="destructive">Breakage</Badge>;
    case "adjustment":
      return <Badge variant="secondary" className="bg-warning text-warning-foreground">Adjustment</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function Movements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.laboratory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.handledBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || movement.movementType === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ["all", "usage", "restock", "breakage", "adjustment"];

  const totalMovements = movements.length;
  const todayMovements = movements.filter(m => 
    new Date(m.date).toDateString() === new Date().toDateString()
  ).length;
  const usageMovements = movements.filter(m => m.movementType === "usage").length;
  const restockMovements = movements.filter(m => m.movementType === "restock").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Movements</h1>
          <p className="text-muted-foreground">
            Track and record all inventory movements across laboratories
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            Record Movement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Movements
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovements}</div>
            <p className="text-xs text-muted-foreground">
              All time movements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Movements
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{todayMovements}</div>
            <p className="text-xs text-muted-foreground">
              Recorded today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usage Records
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{usageMovements}</div>
            <p className="text-xs text-muted-foreground">
              Items consumed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Restock Records
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{restockMovements}</div>
            <p className="text-xs text-muted-foreground">
              Items restocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Movement History</CardTitle>
          <CardDescription>
            Complete record of all inventory movements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items, laboratories, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Type: {selectedType === "all" ? "All" : selectedType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {types.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setSelectedType(type)}
                  >
                    {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Laboratory</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Handled By</TableHead>
                  <TableHead>Batch Code</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">{movement.itemName}</TableCell>
                    <TableCell>{movement.laboratory}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.movementType)}
                        {getMovementBadge(movement.movementType)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">
                        {movement.movementType === "usage" || movement.movementType === "breakage" ? "-" : "+"}
                        {movement.quantity}
                      </span> {movement.unit}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(movement.date).toLocaleString()}
                    </TableCell>
                    <TableCell>{movement.handledBy}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {movement.batchCode}
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
                            Edit Movement
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Movement
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