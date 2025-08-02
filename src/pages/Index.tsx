import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import Analytics from "@/components/Analytics";
import ReceiptScanner from "@/components/ReceiptScanner";
import type { Transaction } from "@/pages/Index";

const Index = () => {
  // All transactions for dashboard, analytics, recents, etc
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Paginated transactions for transaction list page only
  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState("dashboard");

  // Fetch all transactions (for dashboard/analytics)
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions?limit=10000")
      .then((res) => res.json())
      .then((data) => {
        const allTxs = Array.isArray(data) ? data : data.transactions || [];
        setTransactions(allTxs);
      })
      .catch(() => setTransactions([]));
  }, []);

  // Fetch paginated transactions (for paged transaction list)
  useEffect(() => {
    fetch(`http://localhost:5000/api/transactions?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPaginatedTransactions(Array.isArray(data.transactions) ? data.transactions : []);
        setTotal(Number(data.total) || 0);
      })
      .catch(() => {
        setPaginatedTransactions([]);
        setTotal(0);
      });
  }, [page, limit]);

  // Add transaction handler
  const addTransaction = async (tx: Omit<Transaction, "id">) => {
    try {
      const res = await fetch("http://localhost:5000/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh full list and paginated list after adding
        fetch("http://localhost:5000/api/transactions?limit=10000")
          .then((res) => res.json())
          .then((data) => {
            const allTxs = Array.isArray(data) ? data : data.transactions || [];
            setTransactions(allTxs);
          });
        setPage(1); // reset pagination page to 1 after add
      }
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onPageChange={setCurrentPage} recentTransactions={transactions.slice(0, 4)} />;
      case "add-transaction":
        return <AddTransaction addTransaction={addTransaction} />;
      case "transactions":
        return (
          <TransactionList
            transactions={paginatedTransactions}
            page={page}
            setPage={setPage}
            limit={limit}
            total={total}
          />
        );
      case "analytics":
        return <Analytics transactions={transactions} />;
      case "receipts":
        return <ReceiptScanner addTransaction={addTransaction} />;
      default:
        return <Dashboard onPageChange={setCurrentPage} recentTransactions={transactions.slice(0, 4)} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
