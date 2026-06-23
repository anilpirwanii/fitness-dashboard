import React, { useState } from 'react';
import { Camera, X, Loader2, Check } from 'lucide-react';

export function BarcodeScanner({ onScan }) {
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (barcode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/product/${barcode}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      onScan(data);
      setIsScanning(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsScanning(true)}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90"
      >
        <Camera className="w-4 h-4" />
        Scan Barcode
      </button>

      {isScanning && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">Scan Product Barcode</h3>
              <button onClick={() => setIsScanning(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 flex flex-col items-center gap-6">
              <div className="w-64 h-64 border-2 border-dashed rounded-3xl flex items-center justify-center bg-muted/50">
                {loading ? <Loader2 className="w-12 h-12 animate-spin text-primary" /> : <Camera className="w-12 h-12 text-muted-foreground" />}
              </div>
              {error && <p className="text-destructive text-sm font-medium bg-destructive/10 px-3 py-1 rounded-full">{error}</p>}
              <p className="text-sm text-muted-foreground text-center">Position the barcode within the frame to automatically scan nutrition info.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}