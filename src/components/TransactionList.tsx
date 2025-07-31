import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Calendar,
  DollarSign,
  Edit,
  Trash2
} from "lucide-react";

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Mock data - replace with real data later
  const transactions = [
    { 
      id: 1, 
      description: "Monthly Salary", 
      amount: 5200.00, 
      type: "income", 
      date: "2024-01-15", 
      category: "Salary",
      notes: "Regular monthly payment"
    },
    { 
      id: 2, 
      description: "Grocery Shopping - Whole Foods", 
      amount: -120.50, 
      type: "expense", 
      date: "2024-01-14", 
      category: "Food",
      notes: "Weekly groceries"
    },
    { 
      id: 3, 
      description: "Netflix Subscription", 
      amount: -15.99, 
      type: "expense", 
      date: "2024-01-13", 
      category: "Entertainment",
      notes: "Monthly subscription"
    },
    { 
      id: 4, 
      description: "Freelance Web Design", 
      amount: 800.00, 
      type: "income", 
      date: "2024-01-12", 
      category: "Freelance",
      notes: "Client project completion"
    },
    { 
      id: 5, 
      description: "Gas Station - Shell", 
      amount: -45.20, 
      type: "expense", 
      date: "2024-01-11", 
      category: "Transportation",
      notes: "Car fuel"
    },
    { 
      id: 6, 
      description: "Coffee Shop", 
      amount: -6.50, 
      type: "expense", 
      date: "2024-01-10", 
      category: "Food",
      notes: "Morning coffee"
    },
    { 
      id: 7, 
      description: "Investment Dividend", 
      amount: 150.00, 
      type: "income", 
      date: "2024-01-09", 
      category: "Investment",
      notes: "Quarterly dividend payment"
    },
    { 
      id: 8, 
      description: "Electric Bill", 
      amount: -89.30, 
      type: "expense", 
      date: "2024-01-08", 
      category: "Utilities",
      notes: "Monthly utility bill"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Salary": "bg-success/20 text-success",
      "Freelance": "bg-accent/20 text-accent",
      "Investment": "bg-primary/20 text-primary",
      "Food": "bg-warning/20 text-warning",
      "Transportation": "bg-muted",
      "Entertainment": "bg-destructive/20 text-destructive",
      "Utilities": "bg-secondary/20 text-secondary-foreground",
      "Housing": "bg-accent/20 text-accent",
      "Healthcare": "bg-primary/20 text-primary",
      "Shopping": "bg-warning/20 text-warning",
      "Education": "bg-success/20 text-success",
      "Travel": "bg-accent/20 text-accent",
      "Insurance": "bg-muted",
      "Business": "bg-primary/20 text-primary",
      "Gift": "bg-success/20 text-success",
      "Other": "bg-muted"
    };
    return colors[category] || "bg-muted";
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || transaction.type === filterType;
      const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return Math.abs(b.amount) - Math.abs(a.amount);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage your financial transactions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-lg font-bold text-success">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-lg font-bold text-destructive">${totalExpenses.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="lg:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="lg:w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="lg:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            Transaction History ({filteredTransactions.length} results)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found matching your criteria</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:shadow-soft transition-smooth">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      <DollarSign className={`w-5 h-5 ${
                        transaction.type === 'income' ? 'text-success' : 'text-destructive'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <Badge className={getCategoryColor(transaction.category)}>
                          {transaction.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        {transaction.notes && (
                          <span className="truncate max-w-[200px]">{transaction.notes}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-lg font-semibold ${
                      transaction.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionList;