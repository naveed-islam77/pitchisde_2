"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Mail } from "lucide-react";

interface ConfirmEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  onResendEmail?: () => void;
  onClose?: () => void;
}

export function ConfirmEmailModal({
  open,
  onOpenChange,
  email = "your email",
}: ConfirmEmailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Confirm Your Email
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            We've sent a confirmation link to{" "}
            <span className="font-medium text-foreground">{email}</span>. Please
            check your inbox and click the link to verify your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Check your spam folder</p>
                <p className="text-xs text-muted-foreground">
                  Sometimes confirmation emails end up in spam or junk folders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
