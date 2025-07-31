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

const ReceiptScanner = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG, PNG, or PDF file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    processReceipt(file);
  };

  const processReceipt = async (file: File) => {
    setIsProcessing(true);
    setExtractedData(null);

    try {
      // Simulate OCR processing with mock data
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock extracted data - replace with actual OCR service
      const mockData = {
        merchantName: "SuperMart Grocery Store",
        date: "2024-01-15",
        total: 127.45,
        items: [
          { description: "Organic Bananas", amount: 3.99, category: "Food" },
          { description: "Whole Wheat Bread", amount: 4.50, category: "Food" },
          { description: "Chicken Breast", amount: 12.99, category: "Food" },
          { description: "Greek Yogurt", amount: 5.99, category: "Food" },
          { description: "Orange Juice", amount: 6.99, category: "Food" },
          { description: "Tax", amount: 2.99, category: "Tax" }
        ],
        confidence: 0.92
      };

      setExtractedData(mockData);
      
      toast({
        title: "Receipt Processed Successfully",
        description: `Extracted ${mockData.items.length} items with ${(mockData.confidence * 100).toFixed(0)}% confidence`,
      });

    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to extract data from receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveTransactions = () => {
    if (!extractedData) return;

    // Here you would save each item as a transaction
    toast({
      title: "Transactions Saved",
      description: `${extractedData.items.length} transactions have been added to your account`,
    });

    // Reset the component
    setUploadedFile(null);
    setExtractedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Receipt Scanner</h1>
        <p className="text-muted-foreground mt-2">Upload receipts to automatically extract expense data</p>
      </div>

      {/* Upload Area */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Upload Receipt
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
                  <p className="text-lg font-medium text-foreground">Upload your receipt</p>
                  <p className="text-muted-foreground">Supports JPG, PNG, and PDF files up to 10MB</p>
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
                      // Simulate camera capture - would open camera in real app
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
                  ) : extractedData ? (
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
                    {isProcessing ? "Processing receipt..." : 
                     extractedData ? "Receipt processed successfully" : "Ready to process"}
                  </p>
                </div>
                {!isProcessing && !extractedData && (
                  <Button 
                    onClick={() => processReceipt(uploadedFile)}
                    className="gap-2"
                  >
                    <Scan className="w-4 h-4" />
                    Process Receipt
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Extracted Data */}
      {extractedData && (
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Extracted Data
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="font-semibold text-success">
                  {(extractedData.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Receipt Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Merchant</p>
                <p className="font-semibold text-foreground">{extractedData.merchantName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground">{extractedData.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-semibold text-destructive">${extractedData.total}</p>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Items ({extractedData.items.length})</h3>
              <div className="space-y-2">
                {extractedData.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.description}</p>
                      <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                    </div>
                    <p className="font-semibold text-destructive">${item.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
              <Button 
                onClick={handleSaveTransactions}
                className="flex-1 gap-2"
                variant="success"
              >
                <CheckCircle className="w-4 h-4" />
                Save All Transactions
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setUploadedFile(null);
                  setExtractedData(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                Upload Another Receipt
              </Button>
            </div>

            {/* Note */}
            <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-warning">Review Before Saving</p>
                <p className="text-sm text-muted-foreground">
                  Please review the extracted data for accuracy before saving. You can edit any items if needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Info */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">1. Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo or PDF of your receipt from any device
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Scan className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">2. Process</h3>
              <p className="text-sm text-muted-foreground">
                Our AI extracts merchant, date, items, and amounts automatically
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">3. Save</h3>
              <p className="text-sm text-muted-foreground">
                Review and save the transactions to your account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiptScanner;