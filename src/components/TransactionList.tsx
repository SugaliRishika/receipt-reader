import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowUpDown,
  Calendar as CalendarIcon,
  DollarSign,
} from "lucide-react";
import type { Transaction } from "@/pages/Index";
import { cn } from "@/lib/utils";

type TransactionListProps = {
  transactions?: Transaction[];  // defensive default
  page: number;
  setPage: (page: number) => void;
  limit: number;
  total: number;
};

const TransactionList = ({
  transactions = [],
  page,
  setPage,
  limit,
  total,
}: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Salary: "bg-success/20 text-success",
      Freelance: "bg-accent/20 text-accent",
      Investment: "bg-primary/20 text-primary",
      Food: "bg-warning/20 text-warning",
      Transportation: "bg-muted",
      Entertainment: "bg-destructive/20 text-destructive",
      Utilities: "bg-secondary/20 text-secondary-foreground",
      Housing: "bg-accent/20 text-accent",
      Healthcare: "bg-primary/20 text-primary",
      Shopping: "bg-warning/20 text-warning",
      Education: "bg-success/20 text-success",
      Travel: "bg-accent/20 text-accent",
      Insurance: "bg-muted",
      Business: "bg-primary/20 text-primary",
      Gift: "bg-success/20 text-success",
      Other: "bg-muted",
    };
    return colors[category] || "bg-muted";
  };

  // Filter and sort on current page data
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "all" || transaction.type === filterType;
      const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
      const transactionDate = new Date(transaction.date);
      const afterStartDate = startDate ? transactionDate >= new Date(startDate) : true;
      const beforeEndDate = endDate ? transactionDate <= new Date(endDate) : true;

      return matchesSearch && matchesType && matchesCategory && afterStartDate && beforeEndDate;
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

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage your financial transactions</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48"
              aria-label="Search transactions"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {/* Add your categories */}
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              {/* ... */}
            </SelectContent>
          </Select>

          <Label htmlFor="start-date" className="sr-only">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined}
          />

          <Label htmlFor="end-date" className="sr-only">End Date</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Transactions ({filteredTransactions.length} / {total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground">No transactions found.</p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border-b border-border last:border-none"
              >
                <div className="flex items-center gap-4 truncate">
                  <div
                    className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-full",
                      transaction.type === "income"
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    )}
                  >
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="truncate max-w-xs">
                    <p className="font-medium truncate">{transaction.description}</p>
                    <p className="text-sm truncate text-muted-foreground">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <p
                    className={cn(
                      "text-lg font-semibold whitespace-nowrap",
                      transaction.type === "income"
                        ? "text-success"
                        : "text-destructive"
                    )}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          aria-label="Previous Page"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next Page"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionList;
