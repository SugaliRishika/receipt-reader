
// import { useState, useEffect } from "react";
// import Layout from "@/components/Layout";
// import Dashboard from "@/components/Dashboard";
// import AddTransaction from "@/components/AddTransaction";
// import TransactionList from "@/components/TransactionList";
// import Analytics from "@/components/Analytics";
// import ReceiptScanner from "@/components/ReceiptScanner";
// import type { Transaction } from "@/pages/Index";

// const Index = () => {
//   const [currentPage, setCurrentPage] = useState("dashboard");
//   const [transactions, setTransactions] = useState<Transaction[]>([]); // Start empty

//   // Fetch transactions on load
//   useEffect(() => {
//     fetch("http://localhost:5000/api/transactions")
//       .then((res) => res.json())
//       .then((data: Transaction[]) => setTransactions(data))
//       .catch(() => {
//         // Optionally handle error or load default values
//         setTransactions([]);
//       });
//   }, []);

//   // Add transaction: send to backend, then update state
//   const addTransaction = async (tx: Omit<Transaction, "id">) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/transaction", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(tx),
//       });
//       const data = await res.json();
//       if (data.success) {
//         // After save, re-fetch or append new transaction with a temporary ID (ID should come from backend ideally)
//         setTransactions((prev) => [
//           { ...tx, id: Date.now() }, 
//           ...prev,
//         ]);
//       } else {
//         // handle failure (optional)
//       }
//     } catch {
//       // handle error (optional)
//     }
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case "dashboard":
//         return (
//           <Dashboard
//             onPageChange={setCurrentPage}
//             recentTransactions={transactions.slice(0, 4)}
//           />
//         );
//       case "add-transaction":
//         return <AddTransaction addTransaction={addTransaction} />;
//       case "transactions":
//         return <TransactionList transactions={transactions} />;
//       case "analytics":
//         return <Analytics />;
//       case "receipts":
//         return <ReceiptScanner />;
//       default:
//         return (
//           <Dashboard
//             onPageChange={setCurrentPage}
//             recentTransactions={transactions.slice(0, 4)}
//           />
//         );
//     }
//   };

//   return (
//     <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
//       {renderPage()}
//     </Layout>
//   );
// };

// export default Index;
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import Analytics from "@/components/Analytics";
import ReceiptScanner from "@/components/ReceiptScanner";
import type { Transaction } from "@/pages/Index";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  // Fetch transactions once on mount, sort descending by date
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        // Sort by date descending (newest first)
        data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransactions(data);
      })
      .catch(() => setTransactions([]));
  }, []);

  // Single addTransaction function with sorting and id assignment
  const addTransaction = async (tx: Omit<Transaction, "id">) => {
    try {
      const res = await fetch("http://localhost:5000/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });
      const data = await res.json();
      if (data.success) {
        const newTx = {
          ...tx,
          id: data.transaction?.id || Date.now(),
          date: tx.date ?? new Date().toISOString().split("T")[0],
        };
        setTransactions((prev) => {
          const newList = [newTx, ...prev];
          newList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return newList;
        });
      }
    } catch (error) {
      // handle errors if needed
      console.error("Failed to add transaction", error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        // Pass recent 4 transactions to Dashboard (newest first)
        return <Dashboard onPageChange={setCurrentPage} recentTransactions={transactions.slice(0, 4)} />;
      case "add-transaction":
        return <AddTransaction addTransaction={addTransaction} />;
      case "transactions":
        return <TransactionList transactions={transactions} />;
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
