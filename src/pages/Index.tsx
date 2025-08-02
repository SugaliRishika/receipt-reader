
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

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data: Transaction[]) => setTransactions(data))
      .catch(() => setTransactions([]));
  }, []);

  // Add transaction: send to backend, then update state
  const addTransaction = async (tx: Omit<Transaction, "id">) => {
    try {
      const res = await fetch("http://localhost:5000/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });
      const data = await res.json();
      if (data.success) {
        // You can re-fetch all transactions here for strong consistency,
        // or optimistically add the new transaction to state:
        setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
      }
    } catch {
      // handle errors if needed
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onPageChange={setCurrentPage} recentTransactions={transactions.slice(0, 4)} />;
      case "add-transaction":
        return <AddTransaction addTransaction={addTransaction} />;
      case "transactions":
        return <TransactionList transactions={transactions} />;
      case "analytics":
        return <Analytics />;
      case "receipts":
        // Pass the addTransaction prop here
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

