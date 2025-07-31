import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30days");

  // Mock data for charts - replace with real data later
  const expensesByCategory = [
    { category: "Food", amount: 450, percentage: 35, color: "hsl(var(--warning))" },
    { category: "Transportation", amount: 280, percentage: 22, color: "hsl(var(--primary))" },
    { category: "Entertainment", amount: 200, percentage: 15, color: "hsl(var(--accent))" },
    { category: "Utilities", amount: 180, percentage: 14, color: "hsl(var(--success))" },
    { category: "Shopping", amount: 120, percentage: 9, color: "hsl(var(--destructive))" },
    { category: "Other", amount: 70, percentage: 5, color: "hsl(var(--muted-foreground))" }
  ];

  const monthlyTrend = [
    { month: "Oct", income: 4800, expenses: 3200 },
    { month: "Nov", income: 5200, expenses: 3450 },
    { month: "Dec", income: 5500, expenses: 3800 },
    { month: "Jan", income: 5200, expenses: 3450 }
  ];

  const insights = [
    {
      title: "Top Spending Category",
      value: "Food",
      amount: "$450",
      trend: "up",
      percentage: "12%",
      description: "from last month"
    },
    {
      title: "Biggest Expense Day",
      value: "January 14th",
      amount: "$320",
      trend: "neutral",
      percentage: "",
      description: "Grocery shopping & gas"
    },
    {
      title: "Savings Rate",
      value: "34%",
      amount: "$1,750",
      trend: "up",
      percentage: "5%",
      description: "above target"
    },
    {
      title: "Average Daily Spending",
      value: "$111",
      amount: "",
      trend: "down",
      percentage: "8%",
      description: "from last month"
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Analyze your financial patterns and trends</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="gradient-card shadow-card transition-smooth hover:shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                  <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                  {insight.amount && (
                    <p className="text-lg font-semibold text-primary">{insight.amount}</p>
                  )}
                  <div className="flex items-center gap-1 text-xs">
                    {insight.trend === "up" && (
                      <>
                        <ArrowUp className="w-3 h-3 text-success" />
                        <span className="text-success">{insight.percentage}</span>
                      </>
                    )}
                    {insight.trend === "down" && (
                      <>
                        <ArrowDown className="w-3 h-3 text-destructive" />
                        <span className="text-destructive">{insight.percentage}</span>
                      </>
                    )}
                    <span className="text-muted-foreground">{insight.description}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Expenses by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expensesByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-foreground">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${item.amount}</p>
                    <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Expenses</span>
                  <span className="font-bold text-lg text-destructive">
                    ${expensesByCategory.reduce((sum, item) => sum + item.amount, 0)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Income vs Expenses Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {monthlyTrend.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{month.month}</span>
                    <div className="text-right">
                      <p className="text-sm text-success">+${month.income.toLocaleString()}</p>
                      <p className="text-sm text-destructive">-${month.expenses.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <div 
                        className="h-2 bg-success rounded-sm"
                        style={{ width: `${(month.income / 6000) * 100}%` }}
                      />
                      <div className="h-2 bg-muted rounded-sm flex-1" />
                    </div>
                    <div className="flex gap-1">
                      <div 
                        className="h-2 bg-destructive rounded-sm"
                        style={{ width: `${(month.expenses / 6000) * 100}%` }}
                      />
                      <div className="h-2 bg-muted rounded-sm flex-1" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Net: ${(month.income - month.expenses).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Patterns */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-warning" />
            Spending Patterns & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Key Observations</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                  <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Great savings rate!</p>
                    <p className="text-sm text-muted-foreground">You're saving 34% of your income</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <Calendar className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">Food spending increased</p>
                    <p className="text-sm text-muted-foreground">12% higher than last month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Consistent income</p>
                    <p className="text-sm text-muted-foreground">Stable monthly earnings</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="font-medium text-foreground">🍕 Food Budget</p>
                  <p className="text-sm text-muted-foreground">Consider meal planning to reduce food expenses by 15-20%</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="font-medium text-foreground">💰 Emergency Fund</p>
                  <p className="text-sm text-muted-foreground">You're on track! Continue building your emergency fund</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="font-medium text-foreground">📊 Investment</p>
                  <p className="text-sm text-muted-foreground">Consider investing 10% of your savings for long-term growth</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;