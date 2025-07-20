import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Ruler } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Unit {
  id: number;
  unit_name: string;
  abbreviation: string;
  created_at: string;
}

const Units = () => {
  const { toast } = useToast();
  const [units, setUnits] = useState<Unit[]>([
    {
      id: 1,
      unit_name: "Kilogram",
      abbreviation: "kg",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      unit_name: "Gram",
      abbreviation: "g",
      created_at: "2024-01-15"
    },
    {
      id: 3,
      unit_name: "Liter",
      abbreviation: "L",
      created_at: "2024-01-16"
    },
    {
      id: 4,
      unit_name: "Milliliter",
      abbreviation: "mL",
      created_at: "2024-01-16"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState({
    unit_name: "",
    abbreviation: ""
  });

  const resetForm = () => {
    setFormData({
      unit_name: "",
      abbreviation: ""
    });
    setEditingUnit(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.unit_name.trim() || !formData.abbreviation.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingUnit) {
      // Update existing unit
      setUnits(units.map(unit => 
        unit.id === editingUnit.id 
          ? { ...unit, ...formData }
          : unit
      ));
      toast({
        title: "Success",
        description: "Unit updated successfully",
      });
    } else {
      // Add new unit
      const newUnit: Unit = {
        id: Math.max(...units.map(u => u.id), 0) + 1,
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setUnits([...units, newUnit]);
      toast({
        title: "Success",
        description: "Unit added successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit);
    setFormData({
      unit_name: unit.unit_name,
      abbreviation: unit.abbreviation
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setUnits(units.filter(unit => unit.id !== id));
    toast({
      title: "Success",
      description: "Unit deleted successfully",
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Ruler className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Units Management</h1>
            <p className="text-muted-foreground">Manage measurement units and their abbreviations</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUnit ? "Edit Unit" : "Add New Unit"}
              </DialogTitle>
              <DialogDescription>
                {editingUnit 
                  ? "Update the unit information below."
                  : "Enter the details for the new unit."
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="unit_name">Unit Name</Label>
                  <Input
                    id="unit_name"
                    value={formData.unit_name}
                    onChange={(e) => setFormData({ ...formData, unit_name: e.target.value })}
                    placeholder="e.g., Kilogram, Liter"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="abbreviation">Abbreviation</Label>
                  <Input
                    id="abbreviation"
                    value={formData.abbreviation}
                    onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
                    placeholder="e.g., kg, L"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingUnit ? "Update" : "Add"} Unit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{units.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight Units</CardTitle>
            <Badge variant="secondary">Mass</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {units.filter(u => ['kg', 'g', 'mg'].includes(u.abbreviation.toLowerCase())).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Units</CardTitle>
            <Badge variant="secondary">Volume</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {units.filter(u => ['l', 'ml', 'cl'].includes(u.abbreviation.toLowerCase())).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Units Table */}
      <Card>
        <CardHeader>
          <CardTitle>Units Directory</CardTitle>
          <CardDescription>
            Complete list of all measurement units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Unit Name</TableHead>
                <TableHead>Abbreviation</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">#{unit.id}</TableCell>
                  <TableCell>{unit.unit_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{unit.abbreviation}</Badge>
                  </TableCell>
                  <TableCell>{unit.created_at}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(unit)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(unit.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Units;