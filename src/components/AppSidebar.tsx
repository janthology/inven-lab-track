import { useState } from "react";
import { 
  LayoutDashboard, 
  FlaskConical, 
  Package, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut,
  PackageCheck,
  ClipboardList,
  Building2,
  UserCheck,
  History,
  Truck,
  Package2
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Laboratories", url: "/laboratories", icon: Building2 },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Stock Management", url: "/stocks", icon: PackageCheck },
  { title: "Movements", url: "/movements", icon: ClipboardList },
  { title: "Suppliers", url: "/suppliers", icon: Truck },
  { title: "Batches", url: "/batches", icon: Package2 },
];

const managementItems = [
  { title: "Categories", url: "/categories", icon: FlaskConical },
  { title: "Units", url: "/units", icon: TrendingUp },
  { title: "Users", url: "/users", icon: UserCheck },
  { title: "Audit Trail", url: "/audit", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r bg-sidebar`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">LabInventory</h2>
              <p className="text-xs text-sidebar-foreground/60">Management System</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getNavCls}>
                <Settings className="h-4 w-4" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex w-full items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md p-2 transition-colors">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {!collapsed && (
          <div className="mt-4 p-2">
            <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent p-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  Lab Technician
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}