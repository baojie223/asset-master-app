"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/types";
import { supabase } from "@/lib/supbase";
import { toast } from "sonner";

const formSchema = z.object({
  asset_id: z.number().min(1, "请选择资产"),
  category_id: z.number().min(1, "请选择类别"),
  amount: z.number().min(0.01, "请输入金额"),
  occurred_at: z.string().min(1, "请选择日期"),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

interface EditTransactionDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
  onSuccess,
}: EditTransactionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset_id: transaction.asset_id,
      category_id: transaction.category_id,
      amount: transaction.amount,
      occurred_at: transaction.occurred_at,
      notes: transaction.notes,
      tags: transaction.tags,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("transactions")
        .update({
          // ...values,
          amount: Number(values.amount),
          // occurred_at: values.occurred_at || transaction.occurred_at,
        })
        .eq("id", transaction.id);

      if (error) {
        throw error;
      }

      toast.success("交易记录已更新");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
      toast.error("更新交易记录失败");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑交易</DialogTitle>
          <DialogDescription>
            修改交易记录。填写完成后点击保存。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form 
            onSubmit={(e) => {
              console.log("Form submit event triggered");
              console.log("Form errors:", form.formState.errors);
              form.handleSubmit(onSubmit)(e);
            }} 
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="asset_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>资产</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择资产" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">现金</SelectItem>
                      <SelectItem value="2">银行卡</SelectItem>
                      <SelectItem value="3">支付宝</SelectItem>
                      <SelectItem value="4">微信</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>类别</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类别" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">餐饮</SelectItem>
                      <SelectItem value="2">交通</SelectItem>
                      <SelectItem value="3">购物</SelectItem>
                      <SelectItem value="4">娱乐</SelectItem>
                      <SelectItem value="5">住房</SelectItem>
                      <SelectItem value="6">医疗</SelectItem>
                      <SelectItem value="7">教育</SelectItem>
                      <SelectItem value="8">其他</SelectItem>
                      <SelectItem value="999">转账</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>金额</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="输入金额"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occurred_at" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>日期</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>备注</FormLabel>
                  <FormControl>
                    <Input placeholder="输入备注（可选）" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标签</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="输入标签，用逗号分隔"
                      value={field.value ? field.value.join(',') : ''}
                      onChange={e => field.onChange(
                        e.target.value
                          .split(',')
                          .map(tag => tag.trim())
                          .filter(tag => tag.length > 0)
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isLoading}
                onClick={() => console.log("Button clicked")}
              >
                {isLoading ? "保存中..." : "保存"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 