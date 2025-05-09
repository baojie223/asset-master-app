"use client";

import { useState, useCallback } from "react";
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
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadTransactionsDialogProps {
  onSuccess?: () => void;
  type: 'zfb' | 'wx';
}

export function UploadTransactionsDialog({ onSuccess, type }: UploadTransactionsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getDialogTitle = () => {
    return type === 'zfb' ? '上传支付宝账单' : '上传微信账单';
  };

  const getDialogDescription = () => {
    return type === 'zfb' 
      ? '请选择要上传的支付宝账单CSV文件。'
      : '请选择要上传的微信账单CSV文件。';
  };

  const getButtonText = () => {
    return type === 'zfb' ? '上传支付宝账单' : '上传微信账单';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'text/csv') {
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(event);
    } else {
      toast.error('请上传CSV文件');
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      // 根据类型调用不同的接口
      const { data: parseData, error: parseError } = await supabase.functions.invoke(
        type === 'zfb' ? 'parse-csv-zfb' : 'parse-csv-wx',
        {
          body: formData
        }
      );

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
        <Button variant="outline">{getButtonText()}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                拖放文件到这里，或点击选择文件
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                仅支持 .csv 文件
              </p>
            </div>
          </div>
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