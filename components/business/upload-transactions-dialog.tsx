"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import { supabase } from "@/lib/supbase";

interface UploadTransactionsDialogProps {
  onSuccess?: () => void;
}

export function UploadTransactionsDialog({ onSuccess }: UploadTransactionsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv") {
        setError("请上传 CSV 文件");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("请选择文件");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // 读取文件内容
      const fileContent = await file.text();

      // 调用 Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("parse-csv", {
        body: { csvContent: fileContent },
      });

      console.log(data);

      if (error) {
        throw new Error(error.message);
      }

      setOpen(false);
      setFile(null);
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
      setError("上传失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-20 right-20 h-14 w-14 rounded-full shadow-lg md:bottom-8 md:right-24"
        >
          <UploadIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>上传交易记录</DialogTitle>
          <DialogDescription>
            上传 CSV 文件导入交易记录。请确保文件格式正确。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpload}
              disabled={isLoading || !file}
            >
              {isLoading ? "上传中..." : "上传"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
} 