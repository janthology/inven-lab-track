import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Package, Calendar, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Batch {
  id: string;
  batchNumber: string;
  receivedDate: string;
  expiryDate: string;
  status: "active" | "expired";
  remarks: string;
}

const mockBatches: Batch[] = [
  {
    id: "1",
    batchNumber: "BTH001",
    receivedDate: "2024-01-15",
    expiryDate: "2024-12-31",
    status: "active",
    remarks: "High quality batch from Supplier A"
  },
  {
    id: "2",
    batchNumber: "BTH002",
    receivedDate: "2023-06-10",
    expiryDate: "2024-01-15",
    status: "expired",
    remarks: "Expired batch - dispose properly"
  },
  {
    id: "3",
    batchNumber: "BTH003",
    receivedDate: "2024-02-20",
    expiryDate: "2025-02-20",
    status: "active",
    remarks: "Large batch for Q1 requirements"
  }
];

export default function Batches() {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [formData, setFormData] = useState({
    batchNumber: "",
    receivedDate: "",
    expiryDate: "",
    status: "active" as "active" | "expired",
    remarks: ""
  });

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch = batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.remarks.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeBatches = batches.filter(b => b.status === "active").length;
  const expiredBatches = batches.filter(b => b.status === "expired").length;
  const totalBatches = batches.length;

  const resetForm = () => {
    setFormData({
      batchNumber: "",
      receivedDate: "",
      expiryDate: "",
      status: "active",
      remarks: ""
    });
  };

  const handleAdd = () => {
    if (!formData.batchNumber || !formData.receivedDate || !formData.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newBatch: Batch = {
      id: Date.now().toString(),
      ...formData
    };

    setBatches([...batches, newBatch]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Batch added successfully"
    });
  };

  const handleEdit = (batch: Batch) => {
    setSelectedBatch(batch);
    setFormData({
      batchNumber: batch.batchNumber,
      receivedDate: batch.receivedDate,
      expiryDate: batch.expiryDate,
      status: batch.status,
      remarks: batch.remarks
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.batchNumber || !formData.receivedDate || !formData.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setBatches(batches.map(batch => 
      batch.id === selectedBatch?.id 
        ? { ...batch, ...formData }
        : batch
    ));
    setIsEditDialogOpen(false);
    setSelectedBatch(null);
    resetForm();
    toast({
      title: "Success",
      description: "Batch updated successfully"
    });
  };

  const handleDelete = (id: string) => {
    setBatches(batches.filter(batch => batch.id !== id));
    toast({
      title: "Success",
      description: "Batch deleted successfully"
    });
  };

  const getStatusBadge = (status: "active" | "expired") => {
    return status === "active" 
      ? <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      : <Badge variant="destructive">Expired</Badge>;
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysDiff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Batch Management</h1>
          <p className="text-muted-foreground">
            Track and manage product batches with expiry monitoring
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Batch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Batch</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                  placeholder="Enter batch number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="receivedDate">Received Date *</Label>
                  <Input
                    id="receivedDate"
                    type="date"
                    value={formData.receivedDate}
                    onChange={(e) => setFormData({...formData, receivedDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "expired") => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  placeholder="Additional notes or comments"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">Add Batch</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBatches}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeBatches}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Batches</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredBatches}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {batches.filter(b => isExpiringSoon(b.expiryDate)).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search batches..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Batches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Batches ({filteredBatches.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Number</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.batchNumber}</TableCell>
                  <TableCell>{new Date(batch.receivedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {new Date(batch.expiryDate).toLocaleDateString()}
                      {isExpiringSoon(batch.expiryDate) && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(batch.status)}</TableCell>
                  <TableCell className="max-w-xs truncate">{batch.remarks}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(batch)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Batch</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete batch {batch.batchNumber}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(batch.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editBatchNumber">Batch Number *</Label>
              <Input
                id="editBatchNumber"
                value={formData.batchNumber}
                onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                placeholder="Enter batch number"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editReceivedDate">Received Date *</Label>
                <Input
                  id="editReceivedDate"
                  type="date"
                  value={formData.receivedDate}
                  onChange={(e) => setFormData({...formData, receivedDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editExpiryDate">Expiry Date *</Label>
                <Input
                  id="editExpiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editStatus">Status</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "expired") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editRemarks">Remarks</Label>
              <Textarea
                id="editRemarks"
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                placeholder="Additional notes or comments"
              />
            </div>
            <Button onClick={handleUpdate} className="w-full">Update Batch</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}