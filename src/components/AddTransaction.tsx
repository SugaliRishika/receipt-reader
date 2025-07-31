import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, DollarSign } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AddTransaction = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    notes: ""
  });

  const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"];
  const expenseCategories = ["Food", "Transportation", "Housing", "Utilities", "Entertainment", 
                           "Healthcare", "Shopping", "Education", "Travel", "Insurance", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.amount || !formData.category || !formData.description || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Transaction Added",
      description: `${formData.type === 'income' ? 'Income' : 'Expense'} of $${formData.amount} has been recorded`,
    });

    // Reset form
    setFormData({
      type: "",
      amount: "",
      category: "",
      description: "",
      notes: ""
    });
    setDate(undefined);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Add Transaction</h1>
        <p className="text-muted-foreground mt-2">Record a new income or expense</p>
      </div>

      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value, category: ""})}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      Income
                    </div>
                  </SelectItem>
                  <SelectItem value="expense">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      Expense
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
                disabled={!formData.type}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={formData.type ? "Select category" : "Select transaction type first"} />
                </SelectTrigger>
                <SelectContent>
                  {(formData.type === 'income' ? incomeCategories : expenseCategories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                placeholder="Brief description of the transaction"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="h-11"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this transaction..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setFormData({
                    type: "",
                    amount: "",
                    category: "",
                    description: "",
                    notes: ""
                  });
                  setDate(undefined);
                }}
              >
                Clear Form
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                variant={formData.type === 'income' ? 'success' : 'default'}
              >
                Add {formData.type === 'income' ? 'Income' : 'Expense'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTransaction;