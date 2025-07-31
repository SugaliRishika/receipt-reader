import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import Analytics from "@/components/Analytics";
import ReceiptScanner from "@/components/ReceiptScanner";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onPageChange={setCurrentPage} />;
      case "add-transaction":
        return <AddTransaction />;
      case "transactions":
        return <TransactionList />;
      case "analytics":
        return <Analytics />;
      case "receipts":
        return <ReceiptScanner />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
