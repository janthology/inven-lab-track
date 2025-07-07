import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Building2,
  Activity,
  CheckCircle,
  XCircle
} from "lucide-react";

const statsCards = [
  {
    title: "Total Items",
    value: "2,847",
    change: "+12%",
    icon: Package,
    trend: "up"
  },
  {
    title: "Low Stock Alerts",
    value: "23",
    change: "-8%",
    icon: AlertTriangle,
    trend: "down",
    urgent: true
  },
  {
    title: "Active Laboratories",
    value: "8",
    change: "0%",
    icon: Building2,
    trend: "neutral"
  },
  {
    title: "Monthly Movements",
    value: "1,284",
    change: "+24%",
    icon: Activity,
    trend: "up"
  }
];

const recentMovements = [
  {
    id: 1,
    item: "Sodium Chloride",
    lab: "Chemistry Lab A",
    type: "usage",
    quantity: "250g",
    time: "2 hours ago",
    user: "Dr. Smith"
  },
  {
    id: 2,
    item: "Microscope Slides",
    lab: "Biology Lab B",
    type: "restock",
    quantity: "100 units",
    time: "4 hours ago",
    user: "Lab Tech John"
  },
  {
    id: 3,
    item: "Ethanol 95%",
    lab: "Chemistry Lab B",
    type: "usage",
    quantity: "500ml",
    time: "6 hours ago",
    user: "Dr. Johnson"
  },
  {
    id: 4,
    item: "Petri Dishes",
    lab: "Microbiology Lab",
    type: "breakage",
    quantity: "5 units",
    time: "8 hours ago",
    user: "Lab Tech Mary"
  }
];

const lowStockItems = [
  {
    id: 1,
    name: "Hydrochloric Acid",
    currentStock: "125ml",
    criticalLevel: "500ml",
    lab: "Chemistry Lab A",
    status: "critical"
  },
  {
    id: 2,
    name: "Test Tubes",
    currentStock: "15 units",
    criticalLevel: "50 units",
    lab: "Biology Lab B",
    status: "low"
  },
  {
    id: 3,
    name: "Litmus Paper",
    currentStock: "8 strips",
    criticalLevel: "25 strips",
    lab: "Chemistry Lab B",
    status: "critical"
  }
];

const getMovementIcon = (type: string) => {
  switch (type) {
    case "restock":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "usage":
      return <TrendingUp className="h-4 w-4 text-primary" />;
    case "breakage":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStockStatusBadge = (status: string) => {
  switch (status) {
    case "critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "low":
      return <Badge variant="secondary" className="bg-warning text-warning-foreground">Low</Badge>;
    default:
      return <Badge variant="outline">Normal</Badge>;
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Laboratory inventory overview and quick insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className={`transition-all hover:shadow-card ${stat.urgent ? 'border-destructive/50' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${
                stat.urgent ? 'text-destructive' : 'text-primary'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-success' : 
                stat.trend === 'down' ? 'text-destructive' : 
                'text-muted-foreground'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Movements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Movements
            </CardTitle>
            <CardDescription>
              Latest inventory movements across all laboratories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  {getMovementIcon(movement.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{movement.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.lab} • {movement.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {movement.time} by {movement.user}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {movement.type}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Movements
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.lab}</p>
                    <p className="text-xs text-muted-foreground">
                      Current: {item.currentStock} | Critical: {item.criticalLevel}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStockStatusBadge(item.status)}
                    <Button size="sm" variant="outline" className="text-xs">
                      Restock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-sm">Add Item</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-sm">Record Usage</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="text-sm">Restock Items</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm">Manage Users</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}