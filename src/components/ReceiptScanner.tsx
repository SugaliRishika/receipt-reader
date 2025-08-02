// import { useState, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { 
//   Upload, 
//   Camera, 
//   FileText, 
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   Receipt,
//   Scan
// } from "lucide-react";
// import type { Transaction } from "@/pages/Index";

// type ReceiptScannerProps = {
//   addTransaction: (tx: Omit<Transaction, "id">) => void;
// };

// const ReceiptScanner = ({ addTransaction }: ReceiptScannerProps) => {
//   const { toast } = useToast();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [extractedData, setExtractedData] = useState<any>(null); // For images
//   const [parsedTransactions, setParsedTransactions] = useState<Transaction[]>([]); // For PDFs

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//     if (!validTypes.includes(file.type)) {
//       toast({ title: "Invalid File Type", description: "Please upload a JPG, PNG, or PDF file", variant: "destructive" });
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       toast({ title: "File Too Large", description: "Please upload a file smaller than 10MB", variant: "destructive" });
//       return;
//     }
//     setUploadedFile(file);
//     if(file.type === 'application/pdf') {
//       processPdf(file);
//       setExtractedData(null);
//     } else {
//       processReceipt(file);
//       setParsedTransactions([]);
//     }
//   };

//   const processPdf = async (file: File) => {
//     setIsProcessing(true);
//     setParsedTransactions([]);
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await fetch('http://localhost:5000/api/upload-pdf', { method: 'POST', body: formData });
//       if (!res.ok) throw new Error("PDF extract failed");
//       const data = await res.json();
//       if (Array.isArray(data.transactions)) {
//         setParsedTransactions(data.transactions);
//         toast({ title: "PDF Parsed Successfully", description: `Extracted ${data.transactions.length} transactions` });
//       } else {
//         toast({ title: "No transactions found", description: "Could not find any transactions in this PDF", variant: "destructive" });
//         setParsedTransactions([]);
//       }
//     } catch (error) {
//       toast({ title: "Processing Failed", description: "Failed to extract data from PDF. Please try again.", variant: "destructive" });
//       setParsedTransactions([]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const processReceipt = async (file: File) => {
//     setIsProcessing(true);
//     setExtractedData(null);    
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await fetch('http://localhost:5000/api/receipt', { method: 'POST', body: formData });
//       if (!res.ok) throw new Error("Receipt extract failed");
//       const data = await res.json();
//       setExtractedData(data);
//       toast({ title: "Receipt Processed Successfully", description: `Extracted total: ${data.total}` });
//     } catch (error) {
//       toast({ title: "Processing Failed", description: "Failed to extract data from receipt. Please try again.", variant: "destructive" });
//       setExtractedData(null);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleSaveTransactions = async () => {
//     if(extractedData) {
//       try {
//         await addTransaction({
//           description: `Receipt: ${extractedData.merchantName}`,
//           amount: -Math.abs(extractedData.total),
//           type: "expense",
//           date: extractedData.date,
//           category: "Food",
//           notes: extractedData.rawText?.slice(0, 100) || "",
//         });
//         if (Array.isArray(extractedData.items)) {
//           for (const item of extractedData.items) {
//             await addTransaction({
//               description: item.description,
//               amount: -Math.abs(item.amount),
//               type: "expense",
//               date: extractedData.date,
//               category: item.category || "Food",
//               notes: "",
//             });
//           }
//         }
//         toast({ title: "Transactions Saved", description: "Receipt expense(s) have been added to your account" });
//         setUploadedFile(null);
//         setExtractedData(null);
//         if (fileInputRef.current) fileInputRef.current.value = '';
//       } catch (error) {
//         toast({ title: "Save Failed", description: "Failed to save transactions. Please try again.", variant: "destructive" });
//       }
//       return;
//     }
//     if (parsedTransactions.length > 0) {
//       try {
//         for (const tx of parsedTransactions) {
//           await addTransaction({
//             description: tx.description,
//             amount: Number(tx.amount),
//             type: Number(tx.amount) < 0 ? "expense" : "income",
//             date: tx.date,
//             category: tx.category || "Other",
//             notes: tx.notes || "",
//           });
//         }
//         toast({ title: "Transactions Saved", description: `Saved ${parsedTransactions.length} transactions from PDF` });
//         setUploadedFile(null);
//         setParsedTransactions([]);
//         if (fileInputRef.current) fileInputRef.current.value = '';
//       } catch (error) {
//         toast({ title: "Save Failed", description: "Failed to save transactions from PDF. Please try again.", variant: "destructive" });
//       }
//       return;
//     }
//     toast({ title: "No Data", description: "No receipt or PDF data to save", variant: "destructive" });
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-foreground">Receipt & PDF Scanner</h1>
//         <p className="text-muted-foreground mt-2">
//           Upload receipts (images) or transaction history (PDF) files to extract expenses.
//         </p>
//       </div>
//       <Card className="gradient-card shadow-card">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Receipt className="w-5 h-5 text-primary" />
//             Upload Receipt or PDF
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
//             {!uploadedFile ? (
//               <>
//                 <div className="flex justify-center">
//                   <Upload className="w-12 h-12 text-muted-foreground" />
//                 </div>
//                 <div>
//                   <p className="text-lg font-medium text-foreground">Upload your receipt or PDF</p>
//                   <p className="text-muted-foreground">Supports JPG, PNG, PDF files up to 10MB</p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Button 
//                     onClick={() => fileInputRef.current?.click()}
//                     className="gap-2"
//                   >
//                     <FileText className="w-4 h-4" />
//                     Choose File
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     className="gap-2"
//                     onClick={() => {
//                       toast({
//                         title: "Camera Feature",
//                         description: "Camera capture would be available in the mobile app",
//                       });
//                     }}
//                   >
//                     <Camera className="w-4 h-4" />
//                     Take Photo
//                   </Button>
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*,.pdf"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//               </>
//             ) : (
//               <div className="space-y-4">
//                 <div className="flex justify-center">
//                   {isProcessing ? (
//                     <Loader2 className="w-12 h-12 text-primary animate-spin" />
//                   ) : extractedData || parsedTransactions.length > 0 ? (
//                     <CheckCircle className="w-12 h-12 text-success" />
//                   ) : (
//                     <Scan className="w-12 h-12 text-primary" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-lg font-medium text-foreground">
//                     {uploadedFile.name}
//                   </p>
//                   <p className="text-muted-foreground">
//                     {isProcessing ? "Processing file..." : 
//                      extractedData || parsedTransactions.length > 0 ? "File processed successfully" : "Ready to process"}
//                   </p>
//                 </div>
//                 {!isProcessing && !extractedData && parsedTransactions.length === 0 && (
//                   <Button 
//                     onClick={() => {
//                       if(uploadedFile) {
//                         if(uploadedFile.type === 'application/pdf'){
//                           processPdf(uploadedFile);
//                         } else {
//                           processReceipt(uploadedFile);
//                         }
//                       }
//                     }}
//                     className="gap-2"
//                   >
//                     <Scan className="w-4 h-4" />
//                     Process File
//                   </Button>
//                 )}
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//       {extractedData && (
//         <Card className="gradient-card shadow-card">
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-success" />
//                 Extracted Receipt Data
//               </div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border border-border">
//               <div>
//                 <p className="text-sm text-muted-foreground">Merchant</p>
//                 <p className="font-semibold text-foreground">{extractedData.merchantName || "Unknown"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Date</p>
//                 <p className="font-semibold text-foreground">{extractedData.date || "N/A"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Total</p>
//                 <p className="font-semibold text-destructive">${extractedData.total ?? "0.00"}</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">
//                 Items ({Array.isArray(extractedData?.items) ? extractedData.items.length : 0})
//               </h3>
//               <div className="space-y-2">
//                 {Array.isArray(extractedData?.items) && extractedData.items.length > 0 ? (
//                   extractedData.items.map((item: any, index: number) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
//                       <div className="flex-1">
//                         <p className="font-medium text-foreground">{item.description}</p>
//                         <p className="text-sm text-muted-foreground">Category: {item.category}</p>
//                       </div>
//                       <p className="font-semibold text-destructive">${item.amount}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-muted-foreground">No items found in receipt.</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//       {parsedTransactions.length > 0 && (
//         <Card className="gradient-card shadow-card">
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-success" />
//                 Parsed Transactions from PDF
//               </div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {parsedTransactions.map((tx, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
//                 <div className="flex-1">
//                   <p className="font-medium text-foreground">{tx.description}</p>
//                   <p className="text-sm text-muted-foreground">{tx.category} • {tx.date}</p>
//                 </div>
//                 <p className={`font-semibold ${tx.amount < 0 ? "text-destructive" : "text-success"}`}>
//                   ${Math.abs(tx.amount).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}

//       {(extractedData || parsedTransactions.length > 0) && (
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button onClick={handleSaveTransactions} variant="success" className="flex-1 gap-2">
//             <CheckCircle className="w-4 h-4" />
//             Save All Transactions
//           </Button>
//           <Button onClick={() => {
//             setUploadedFile(null);
//             setExtractedData(null);
//             setParsedTransactions([]);
//             if (fileInputRef.current) {
//               fileInputRef.current.value = '';
//             }
//           }} variant="outline" className="flex-1">
//             Upload Another File
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReceiptScanner;

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Camera, 
  FileText, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Receipt,
  Scan
} from "lucide-react";
import type { Transaction } from "@/pages/Index";

type ReceiptScannerProps = {
  addTransaction: (tx: Omit<Transaction, "id">) => void;
};

const ReceiptScanner = ({ addTransaction }: ReceiptScannerProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [parsedTransactions, setParsedTransactions] = useState<Transaction[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({ title: "Invalid File Type", description: "Please upload a JPG, PNG, or PDF file", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File Too Large", description: "Please upload a file smaller than 10MB", variant: "destructive" });
      return;
    }
    setUploadedFile(file);
    if(file.type === 'application/pdf') {
      processPdf(file);
      setExtractedData(null);
    } else {
      processReceipt(file);
      setParsedTransactions([]);
    }
  };

  const processPdf = async (file: File) => {
    setIsProcessing(true);
    setParsedTransactions([]);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://localhost:5000/api/upload-pdf', { method: 'POST', body: formData });
      if (!res.ok) throw new Error("PDF extract failed");
      const data = await res.json();
      if (Array.isArray(data.transactions)) {
        setParsedTransactions(data.transactions);
        toast({ title: "PDF Parsed Successfully", description: `Extracted ${data.transactions.length} transactions` });
      } else {
        toast({ title: "No transactions found", description: "Could not find any transactions in this PDF", variant: "destructive" });
        setParsedTransactions([]);
      }
    } catch (error) {
      toast({ title: "Processing Failed", description: "Failed to extract data from PDF. Please try again.", variant: "destructive" });
      setParsedTransactions([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const processReceipt = async (file: File) => {
    setIsProcessing(true);
    setExtractedData(null);    
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://localhost:5000/api/receipt', { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Receipt extract failed");
      const data = await res.json();
      setExtractedData(data);
      toast({ title: "Receipt Processed Successfully", description: `Extracted total: ${data.total}` });
    } catch (error) {
      toast({ title: "Processing Failed", description: "Failed to extract data from receipt. Please try again.", variant: "destructive" });
      setExtractedData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveTransactions = async () => {
    if(extractedData) {
      try {
        await addTransaction({
          description: `Receipt: ${extractedData.merchantName}`,
          amount: -Math.abs(extractedData.total),
          type: "expense",
          date: extractedData.date,
          category: "Food",
          notes: extractedData.rawText?.slice(0, 100) || "",
        });
        if (Array.isArray(extractedData.items)) {
          for (const item of extractedData.items) {
            await addTransaction({
              description: item.description,
              amount: -Math.abs(item.amount),
              type: "expense",
              date: extractedData.date,
              category: item.category || "Food",
              notes: "",
            });
          }
        }
        toast({ title: "Transactions Saved", description: "Receipt expense(s) have been added to your account" });
        setUploadedFile(null);
        setExtractedData(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) {
        toast({ title: "Save Failed", description: "Failed to save transactions. Please try again.", variant: "destructive" });
      }
      return;
    }
    if (parsedTransactions.length > 0) {
      try {
        for (const tx of parsedTransactions) {
          await addTransaction({
            description: tx.description,
            amount: Number(tx.amount),
            type: Number(tx.amount) < 0 ? "expense" : "income",
            date: tx.date,
            category: tx.category || "Other",
            notes: tx.notes || "",
          });
        }
        toast({ title: "Transactions Saved", description: `Saved ${parsedTransactions.length} transactions from PDF` });
        setUploadedFile(null);
        setParsedTransactions([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) {
        toast({ title: "Save Failed", description: "Failed to save transactions from PDF. Please try again.", variant: "destructive" });
      }
      return;
    }
    toast({ title: "No Data", description: "No receipt or PDF data to save", variant: "destructive" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Receipt & PDF Scanner</h1>
        <p className="text-muted-foreground mt-2">
          Upload receipts (images) or transaction history (PDF) files to extract expenses.
        </p>
      </div>
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Upload Receipt or PDF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
            {!uploadedFile ? (
              <>
                <div className="flex justify-center">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Upload your receipt or PDF</p>
                  <p className="text-muted-foreground">Supports JPG, PNG, PDF files up to 10MB</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Choose File
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => {
                      toast({
                        title: "Camera Feature",
                        description: "Camera capture would be available in the mobile app",
                      });
                    }}
                  >
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isProcessing ? (
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  ) : extractedData || parsedTransactions.length > 0 ? (
                    <CheckCircle className="w-12 h-12 text-success" />
                  ) : (
                    <Scan className="w-12 h-12 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    {uploadedFile.name}
                  </p>
                  <p className="text-muted-foreground">
                    {isProcessing ? "Processing file..." : 
                     extractedData || parsedTransactions.length > 0 ? "File processed successfully" : "Ready to process"}
                  </p>
                </div>
                {!isProcessing && !extractedData && parsedTransactions.length === 0 && (
                  <Button 
                    onClick={() => {
                      if(uploadedFile) {
                        if(uploadedFile.type === 'application/pdf'){
                          processPdf(uploadedFile);
                        } else {
                          processReceipt(uploadedFile);
                        }
                      }
                    }}
                    className="gap-2"
                  >
                    <Scan className="w-4 h-4" />
                    Process File
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {extractedData && (
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Extracted Receipt Data
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Merchant</p>
                <p className="font-semibold text-foreground">{extractedData.merchantName || "Unknown"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground">{extractedData.date || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-semibold text-destructive">
                  ₹{Number(extractedData.total ?? 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Items ({Array.isArray(extractedData?.items) ? extractedData.items.length : 0})
              </h3>
              <div className="space-y-2">
                {Array.isArray(extractedData?.items) && extractedData.items.length > 0 ? (
                  extractedData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.description}</p>
                        <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                      </div>
                      <p className="font-semibold text-destructive">
                        ₹{Number(item.amount).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No items found in receipt.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {parsedTransactions.length > 0 && (
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Parsed Transactions from PDF
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {parsedTransactions.map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{tx.category} • {tx.date}</p>
                </div>
                <p className={`font-semibold ${tx.amount < 0 ? "text-destructive" : "text-success"}`}>
                  ₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {(extractedData || parsedTransactions.length > 0) && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleSaveTransactions} variant="success" className="flex-1 gap-2">
            <CheckCircle className="w-4 h-4" />
            Save All Transactions
          </Button>
          <Button onClick={() => {
            setUploadedFile(null);
            setExtractedData(null);
            setParsedTransactions([]);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }} variant="outline" className="flex-1">
            Upload Another File
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReceiptScanner;
