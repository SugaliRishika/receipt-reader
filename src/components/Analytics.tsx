// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { 
//   BarChart3, 
//   PieChart, 
//   TrendingUp, 
//   Calendar,
//   ArrowUp,
//   ArrowDown
// } from "lucide-react";
// import { useState } from "react";

// const Analytics = () => {
//   const [timeRange, setTimeRange] = useState("30days");

//   // Mock data for charts - replace with real data later
//   const expensesByCategory = [
//     { category: "Food", amount: 450, percentage: 35, color: "hsl(var(--warning))" },
//     { category: "Transportation", amount: 280, percentage: 22, color: "hsl(var(--primary))" },
//     { category: "Entertainment", amount: 200, percentage: 15, color: "hsl(var(--accent))" },
//     { category: "Utilities", amount: 180, percentage: 14, color: "hsl(var(--success))" },
//     { category: "Shopping", amount: 120, percentage: 9, color: "hsl(var(--destructive))" },
//     { category: "Other", amount: 70, percentage: 5, color: "hsl(var(--muted-foreground))" }
//   ];

//   const monthlyTrend = [
//     { month: "Oct", income: 4800, expenses: 3200 },
//     { month: "Nov", income: 5200, expenses: 3450 },
//     { month: "Dec", income: 5500, expenses: 3800 },
//     { month: "Jan", income: 5200, expenses: 3450 }
//   ];

//   const insights = [
//     {
//       title: "Top Spending Category",
//       value: "Food",
//       amount: "$450",
//       trend: "up",
//       percentage: "12%",
//       description: "from last month"
//     },
//     {
//       title: "Biggest Expense Day",
//       value: "January 14th",
//       amount: "$320",
//       trend: "neutral",
//       percentage: "",
//       description: "Grocery shopping & gas"
//     },
//     {
//       title: "Savings Rate",
//       value: "34%",
//       amount: "$1,750",
//       trend: "up",
//       percentage: "5%",
//       description: "above target"
//     },
//     {
//       title: "Average Daily Spending",
//       value: "$111",
//       amount: "",
//       trend: "down",
//       percentage: "8%",
//       description: "from last month"
//     }
//   ];

//   return (
//     <div className="space-y-6 animate-slide-up">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
//           <p className="text-muted-foreground">Analyze your financial patterns and trends</p>
//         </div>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Select time range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="7days">Last 7 days</SelectItem>
//             <SelectItem value="30days">Last 30 days</SelectItem>
//             <SelectItem value="3months">Last 3 months</SelectItem>
//             <SelectItem value="6months">Last 6 months</SelectItem>
//             <SelectItem value="1year">Last year</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Key Insights */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {insights.map((insight, index) => (
//           <Card key={index} className="gradient-card shadow-card transition-smooth hover:shadow-elegant">
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="space-y-2">
//                   <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
//                   <p className="text-2xl font-bold text-foreground">{insight.value}</p>
//                   {insight.amount && (
//                     <p className="text-lg font-semibold text-primary">{insight.amount}</p>
//                   )}
//                   <div className="flex items-center gap-1 text-xs">
//                     {insight.trend === "up" && (
//                       <>
//                         <ArrowUp className="w-3 h-3 text-success" />
//                         <span className="text-success">{insight.percentage}</span>
//                       </>
//                     )}
//                     {insight.trend === "down" && (
//                       <>
//                         <ArrowDown className="w-3 h-3 text-destructive" />
//                         <span className="text-destructive">{insight.percentage}</span>
//                       </>
//                     )}
//                     <span className="text-muted-foreground">{insight.description}</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Charts Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Expenses by Category */}
//         <Card className="gradient-card shadow-card">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <PieChart className="w-5 h-5 text-primary" />
//               Expenses by Category
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {expensesByCategory.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div 
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: item.color }}
//                     />
//                     <span className="font-medium text-foreground">{item.category}</span>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-foreground">${item.amount}</p>
//                     <p className="text-sm text-muted-foreground">{item.percentage}%</p>
//                   </div>
//                 </div>
//               ))}
//               <div className="pt-4 border-t border-border">
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold text-foreground">Total Expenses</span>
//                   <span className="font-bold text-lg text-destructive">
//                     ${expensesByCategory.reduce((sum, item) => sum + item.amount, 0)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Monthly Trend */}
//         <Card className="gradient-card shadow-card">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BarChart3 className="w-5 h-5 text-accent" />
//               Income vs Expenses Trend
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {monthlyTrend.map((month, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium text-foreground">{month.month}</span>
//                     <div className="text-right">
//                       <p className="text-sm text-success">+${month.income.toLocaleString()}</p>
//                       <p className="text-sm text-destructive">-${month.expenses.toLocaleString()}</p>
//                     </div>
//                   </div>
//                   <div className="space-y-1">
//                     <div className="flex gap-1">
//                       <div 
//                         className="h-2 bg-success rounded-sm"
//                         style={{ width: `${(month.income / 6000) * 100}%` }}
//                       />
//                       <div className="h-2 bg-muted rounded-sm flex-1" />
//                     </div>
//                     <div className="flex gap-1">
//                       <div 
//                         className="h-2 bg-destructive rounded-sm"
//                         style={{ width: `${(month.expenses / 6000) * 100}%` }}
//                       />
//                       <div className="h-2 bg-muted rounded-sm flex-1" />
//                     </div>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     Net: ${(month.income - month.expenses).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Spending Patterns */}
//       <Card className="gradient-card shadow-card">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-warning" />
//             Spending Patterns & Recommendations
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h3 className="font-semibold text-foreground">Key Observations</h3>
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
//                   <TrendingUp className="w-5 h-5 text-success mt-0.5" />
//                   <div>
//                     <p className="font-medium text-success">Great savings rate!</p>
//                     <p className="text-sm text-muted-foreground">You're saving 34% of your income</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
//                   <Calendar className="w-5 h-5 text-warning mt-0.5" />
//                   <div>
//                     <p className="font-medium text-warning">Food spending increased</p>
//                     <p className="text-sm text-muted-foreground">12% higher than last month</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
//                   <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
//                   <div>
//                     <p className="font-medium text-primary">Consistent income</p>
//                     <p className="text-sm text-muted-foreground">Stable monthly earnings</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <h3 className="font-semibold text-foreground">Recommendations</h3>
//               <div className="space-y-3">
//                 <div className="p-3 bg-background rounded-lg border border-border">
//                   <p className="font-medium text-foreground">🍕 Food Budget</p>
//                   <p className="text-sm text-muted-foreground">Consider meal planning to reduce food expenses by 15-20%</p>
//                 </div>
//                 <div className="p-3 bg-background rounded-lg border border-border">
//                   <p className="font-medium text-foreground">💰 Emergency Fund</p>
//                   <p className="text-sm text-muted-foreground">You're on track! Continue building your emergency fund</p>
//                 </div>
//                 <div className="p-3 bg-background rounded-lg border border-border">
//                   <p className="font-medium text-foreground">📊 Investment</p>
//                   <p className="text-sm text-muted-foreground">Consider investing 10% of your savings for long-term growth</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Analytics;

// src/components/Analytics.tsx
// src/components/Analytics.tsx

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  BarChart3,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import type { Transaction } from "@/pages/Index";

type TimeRange = "7days" | "30days" | "3months" | "6months" | "1year";

interface AnalyticsProps {
  transactions: Transaction[];
}

const Analytics: React.FC<AnalyticsProps> = ({ transactions }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");

  // Filter transactions by selected time range
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let fromDate = new Date();
    switch (timeRange) {
      case "7days":
        fromDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        fromDate.setDate(now.getDate() - 30);
        break;
      case "3months":
        fromDate.setMonth(now.getMonth() - 3);
        break;
      case "6months":
        fromDate.setMonth(now.getMonth() - 6);
        break;
      case "1year":
        fromDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    return transactions.filter(
      (tx) =>
        new Date(tx.date) >= fromDate && new Date(tx.date) <= now
    );
  }, [transactions, timeRange]);

  // Calculate savingsRate TOP-LEVEL so it's available throughout
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Math.abs(b.amount), 0);
  const savingsRate = totalIncome
    ? ((totalIncome - totalExpenses) / totalIncome) * 100
    : 0;

  // Expenses by category calculation
  const expensesByCategory = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredTransactions.forEach((tx) => {
      if (tx.type === "expense") {
        totals[tx.category] = (totals[tx.category] || 0) + Math.abs(tx.amount);
      }
    });
    const totalExpensesCalc = Object.values(totals).reduce(
      (a, b) => a + b,
      0
    );
    const colors = [
      "hsl(var(--warning))",
      "hsl(var(--primary))",
      "hsl(var(--accent))",
      "hsl(var(--success))",
      "hsl(var(--destructive))",
      "hsl(var(--muted-foreground))",
    ];
    return Object.entries(totals).map(([category, amount], idx) => ({
      category,
      amount,
      percentage: totalExpensesCalc ? Math.round((amount / totalExpensesCalc) * 100) : 0,
      color: colors[idx % colors.length],
    }));
  }, [filteredTransactions]);

  // Monthly trend: income vs expenses over last few months
  const monthlyTrend = useMemo(() => {
    const months: { [key: string]: { income: number; expenses: number } } = {};
    const monthLabels: string[] = [];
    let dateCursor = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(dateCursor.getFullYear(), dateCursor.getMonth() - i, 1);
      const key = d.toISOString().slice(0, 7); // "YYYY-MM"
      months[key] = { income: 0, expenses: 0 };
      monthLabels.push(d.toLocaleString("en-US", { month: "short" }));
    }
    filteredTransactions.forEach((tx) => {
      const monthKey = tx.date.slice(0, 7);
      if (months[monthKey]) {
        if (tx.type === "income") months[monthKey].income += tx.amount;
        else if (tx.type === "expense")
          months[monthKey].expenses += Math.abs(tx.amount);
      }
    });
    return monthLabels.map((label, idx) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - idx));
      const key = d.toISOString().slice(0, 7);
      return {
        month: label,
        income: months[key] ? months[key].income : 0,
        expenses: months[key] ? months[key].expenses : 0,
      };
    });
  }, [filteredTransactions]);

  // Key insights calculation:
  const insights = useMemo(() => {
    if (filteredTransactions.length === 0) return [];
    // Top spending category
    const topCategory = expensesByCategory.length > 0 ?
      expensesByCategory.reduce(
        (prev, current) => current.amount > prev.amount ? current : prev,
        expensesByCategory[0]
      ) :
      { category: "N/A", amount: 0 };
    // Biggest expense day
    const dailyExpenses: Record<string, number> = {};
    filteredTransactions.forEach((tx) => {
      if (tx.type === "expense") {
        dailyExpenses[tx.date] = (dailyExpenses[tx.date] || 0) + Math.abs(tx.amount);
      }
    });
    const topDayEntry = Object.entries(dailyExpenses).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const topDay = topDayEntry ? topDayEntry[0] : "N/A";
    const topDayAmount = topDayEntry ? topDayEntry[1] : 0;
    // Average daily spending (expenses only)
    const uniqueDays = new Set(filteredTransactions.map((t) => t.date));
    const avgDailySpend = uniqueDays.size
      ? totalExpenses / uniqueDays.size
      : 0;
    return [
      {
        title: "Top Spending Category",
        value: topCategory.category,
        amount: `₹${topCategory.amount.toLocaleString("en-IN")}`,
        trend: "up",
        percentage: "12%",
        description: "from last month",
      },
      {
        title: "Biggest Expense Day",
        value: new Date(topDay).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        amount: `₹${topDayAmount.toLocaleString("en-IN")}`,
        trend: "neutral",
        percentage: "",
        description: "Highest daily expenses",
      },
      {
        title: "Savings Rate",
        value: `${savingsRate.toFixed(1)}%`,
        amount: `₹${(totalIncome - totalExpenses).toLocaleString("en-IN")}`,
        trend: "up",
        percentage: "5%",
        description: "above target",
      },
      {
        title: "Average Daily Spending",
        value: `₹${avgDailySpend.toFixed(2)}`,
        amount: "",
        trend: "down",
        percentage: "8%",
        description: "from last month",
      },
    ];
  }, [filteredTransactions, expensesByCategory, totalIncome, totalExpenses, savingsRate]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header and Time Range Selector */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Analyze your financial patterns and trends</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
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
        {insights.map((insight, idx) => (
          <Card key={idx} className="gradient-card shadow-card transition">
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                  <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                  {insight.amount && (
                    <p className="text-lg font-semibold text-primary">{insight.amount}</p>
                  )}
                  <div className="flex items-center gap-1 text-xs">
                    {insight.trend === "up" && (
                      <>
                        <ArrowUp className="w-4 h-4 text-success" />
                        <span className="text-success">{insight.percentage}</span>
                      </>
                    )}
                    {insight.trend === "down" && (
                      <>
                        <ArrowDown className="w-4 h-4 text-destructive" />
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
        {/* Expenses By Category */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Expenses by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expensesByCategory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-foreground">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">
                    Total Expenses
                  </span>
                  <span className="font-bold text-lg text-destructive">
                    ₹
                    {expensesByCategory
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString("en-IN")}
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
            {monthlyTrend.map((month, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{month.month}</span>
                  <div className="text-right">
                    <p className="text-sm text-success">
                      +₹{month.income.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-destructive">
                      -₹{month.expenses.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div
                    className="h-2 bg-success rounded-sm"
                    style={{ width: `${(month.income / 6000) * 100}%` }}
                  />
                  <div className="h-2 bg-muted rounded-sm flex-1" />
                </div>
                <div className="flex gap-1 mt-1">
                  <div
                    className="h-2 bg-destructive rounded-sm"
                    style={{ width: `${(month.expenses / 6000) * 100}%` }}
                  />
                  <div className="h-2 bg-muted rounded-sm flex-1" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Net: ₹{(month.income - month.expenses).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights and Recommendations */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-warning" />
            Spending Patterns & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Observations */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Key Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                  <TrendingUp className="w-6 h-6 text-success" />
                  <p>Great savings rate! You're saving {savingsRate.toFixed(1)}%</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <Calendar className="w-6 h-6 text-warning" />
                  <p>Food spending increased compared to last month.</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <p>Consistent income over the last months.</p>
                </div>
              </div>
            </div>
            {/* Recommendations */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p>🍕 Food Budget: Try meal planning to cut down expenses.</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p>💰 Emergency Fund: Keep building your buffer for rainy days.</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p>📈 Investment: Consider long-term investing for growth.</p>
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
