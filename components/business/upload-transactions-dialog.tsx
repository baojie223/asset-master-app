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
import { supabase } from "@/lib/supbase";
import { toast } from "sonner";

interface UploadTransactionsDialogProps {
  onSuccess?: () => void;
}

export function UploadTransactionsDialog({ onSuccess }: UploadTransactionsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      
      // 上传文件到Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('transactions')
        .upload(`${Date.now()}-${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }
      const formData = new FormData();
      formData.append('filePath', uploadData.path);
      // 调用parse-csv接口
      const { data: parseData, error: parseError } = await supabase.functions.invoke('parse-csv', {
        body: formData,
      });

      console.log(parseData);

      if (parseError) {
        throw parseError;
      }

      toast.success('CSV文件上传并解析成功');
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('上传文件失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">上传CSV</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>上传交易记录</DialogTitle>
          <DialogDescription>
            请选择要上传的CSV文件。文件应包含以下列：日期、类型、金额、分类、标签、备注。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isLoading}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 