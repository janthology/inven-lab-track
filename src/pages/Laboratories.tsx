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
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Building2,
  Users,
  Package
} from "lucide-react";

const laboratories = [
  {
    id: 1,
    name: "Chemistry Lab A",
    location: "Building A, Floor 2",
    capacity: "25 students",
    supervisor: "Dr. Sarah Wilson",
    itemCount: 156,
    activeUsers: 8,
    status: "active",
    lastInventory: "2024-01-15"
  },
  {
    id: 2,
    name: "Biology Lab B",
    location: "Building B, Floor 1",
    capacity: "30 students",
    supervisor: "Prof. Michael Chen",
    itemCount: 243,
    activeUsers: 12,
    status: "active",
    lastInventory: "2024-01-10"
  },
  {
    id: 3,
    name: "Physics Lab C",
    location: "Building C, Floor 3",
    capacity: "20 students",
    supervisor: "Dr. Emily Rodriguez",
    itemCount: 89,
    activeUsers: 5,
    status: "maintenance",
    lastInventory: "2024-01-08"
  },
  {
    id: 4,
    name: "Microbiology Lab",
    location: "Building A, Floor 3",
    capacity: "15 students",
    supervisor: "Dr. James Thompson",
    itemCount: 312,
    activeUsers: 15,
    status: "active",
    lastInventory: "2024-01-20"
  },
  {
    id: 5,
    name: "Chemistry Lab B",
    location: "Building A, Floor 2",
    capacity: "25 students",
    supervisor: "Dr. Lisa Anderson",
    itemCount: 178,
    activeUsers: 6,
    status: "inactive",
    lastInventory: "2023-12-15"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>;
    case "maintenance":
      return <Badge variant="secondary" className="bg-warning text-warning-foreground">Maintenance</Badge>;
    case "inactive":
      return <Badge variant="outline" className="bg-muted text-muted-foreground">Inactive</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function Laboratories() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLabs = laboratories.filter(lab =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = laboratories.reduce((sum, lab) => sum + lab.itemCount, 0);
  const activeLabs = laboratories.filter(lab => lab.status === "active").length;
  const totalUsers = laboratories.reduce((sum, lab) => sum + lab.activeUsers, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Laboratory Management</h1>
          <p className="text-muted-foreground">
            Manage laboratory spaces and their inventory
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4 mr-2" />
          Add New Laboratory
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Laboratories
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laboratories.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all buildings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Labs
            </CardTitle>
            <Building2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeLabs}</div>
            <p className="text-xs text-muted-foreground">
              Currently operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all laboratories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Currently using labs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Laboratory List */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratories</CardTitle>
          <CardDescription>
            View and manage all laboratory facilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search laboratories, supervisors, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Laboratory Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Active Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Inventory</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLabs.map((lab) => (
                  <TableRow key={lab.id}>
                    <TableCell className="font-medium">{lab.name}</TableCell>
                    <TableCell>{lab.location}</TableCell>
                    <TableCell>{lab.supervisor}</TableCell>
                    <TableCell>{lab.capacity}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{lab.itemCount}</span> items
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{lab.activeUsers}</span> users
                    </TableCell>
                    <TableCell>{getStatusBadge(lab.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(lab.lastInventory).toLocaleDateString()}
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
                            <Package className="mr-2 h-4 w-4" />
                            View Inventory
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Laboratory
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Laboratory
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