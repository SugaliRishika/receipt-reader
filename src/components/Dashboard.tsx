import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target,
  DollarSign,
  Plus,
  Receipt
} from "lucide-react";

interface DashboardProps {
  onPageChange: (page: string) => void;
}

const Dashboard = ({ onPageChange }: DashboardProps) => {
  // Mock data - replace with real data later
  const stats = {
    totalBalance: 15750.50,
    monthlyIncome: 5200.00,
    monthlyExpenses: 3450.75,
    savingsGoal: 10000.00,
    currentSavings: 8500.00
  };

  const recentTransactions = [
    { id: 1, description: "Salary Payment", amount: 5200.00, type: "income", date: "2024-01-15", category: "Salary" },
    { id: 2, description: "Grocery Shopping", amount: -120.50, type: "expense", date: "2024-01-14", category: "Food" },
    { id: 3, description: "Netflix Subscription", amount: -15.99, type: "expense", date: "2024-01-13", category: "Entertainment" },
    { id: 4, description: "Freelance Project", amount: 800.00, type: "income", date: "2024-01-12", category: "Freelance" },
  ];

  const savingsProgress = (stats.currentSavings / stats.savingsGoal) * 100;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
          <p className="text-muted-foreground">Track your financial progress and manage your money</p>
        </div>
        <Button onClick={() => onPageChange("add-transaction")} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <Wallet className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${stats.totalBalance.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
            <TrendingUp className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${stats.monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
            <TrendingDown className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${stats.monthlyExpenses.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3" />
              -5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings Goal</CardTitle>
            <Target className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{savingsProgress.toFixed(0)}%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500" 
                style={{ width: `${savingsProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${stats.currentSavings.toLocaleString()} of ${stats.savingsGoal.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="gradient-card shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onPageChange("transactions")}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                  }`}>
                    <DollarSign className={`w-5 h-5 ${
                      transaction.type === 'income' ? 'text-success' : 'text-destructive'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${
                  transaction.type === 'income' ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant cursor-pointer" onClick={() => onPageChange("add-transaction")}>
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <Plus className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Add Transaction</h3>
            <p className="text-sm text-muted-foreground">Record a new income or expense</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant cursor-pointer" onClick={() => onPageChange("analytics")}>
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <TrendingUp className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">View Analytics</h3>
            <p className="text-sm text-muted-foreground">Analyze your spending patterns</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card transition-smooth hover:shadow-elegant cursor-pointer" onClick={() => onPageChange("receipts")}>
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <Receipt className="w-12 h-12 text-warning mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Scan Receipt</h3>
            <p className="text-sm text-muted-foreground">Extract expenses from receipts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;