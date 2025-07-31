import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Plus, 
  List, 
  BarChart3, 
  Receipt, 
  Menu,
  X,
  Wallet
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "add-transaction", name: "Add Transaction", icon: Plus },
    { id: "transactions", name: "Transactions", icon: List },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "receipts", name: "Receipt Scanner", icon: Receipt },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-soft border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">FinanceTracker Pro</h1>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(item.id)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <Card className="fixed top-0 left-0 w-64 h-full shadow-elegant">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary-foreground" />
                </div>
                <h2 className="font-bold text-foreground">FinanceTracker Pro</h2>
              </div>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                      onClick={() => {
                        onPageChange(item.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </Card>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;