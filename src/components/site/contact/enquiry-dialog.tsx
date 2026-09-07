"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface EnquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTopic?: string;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  topic: "general",
  message: "",
};

interface EnquiryFormProps {
  defaultTopic: string;
  onClose: () => void;
}

function EnquiryForm({ defaultTopic, onClose }: EnquiryFormProps) {
  const [form, setForm] = React.useState<FormState>({
    ...INITIAL_FORM,
    topic: defaultTopic,
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [referenceNumber, setReferenceNumber] = React.useState<number | null>(null);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid work email";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate high-speed network request
    await new Promise((resolve) => setTimeout(resolve, 850));
    setIsSubmitting(false);
    setReferenceNumber(Math.floor(100000 + Math.random() * 900000));
  };

  const isSuccess = referenceNumber !== null;

  return (
    <>
      <div className="mb-4 space-y-1.5 pr-12">
        <DialogTitle className="text-xl font-medium tracking-tight text-white">
          {isSuccess ? "Enquiry Received" : "Submit Your Enquiry"}
        </DialogTitle>
        <DialogDescription className="text-sm text-white/60">
          {isSuccess
            ? "Thank you for reaching out. Our technical specialists will respond within 24 hours."
            : "Connect with our global chemical specification and distribution team."}
        </DialogDescription>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/10 text-emerald-400">
            <CheckCircle2 className="size-7" />
          </div>
          <p className="mt-4 text-sm text-white/80">
            Reference #{referenceNumber}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-xs font-semibold tracking-wide text-black transition-colors hover:bg-neutral-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label htmlFor="enquiry-name" className="block text-xs font-medium text-white/70">
              Full Name *
            </label>
            <input
              id="enquiry-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Elena Rostova"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="enquiry-email" className="block text-xs font-medium text-white/70">
              Work Email *
            </label>
            <input
              id="enquiry-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="elena@organization.com"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="enquiry-company" className="block text-xs font-medium text-white/70">
              Company / Organization
            </label>
            <input
              id="enquiry-company"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="e.g. Apex Facades Ltd"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-medium text-white/70">
              Requirements / Message *
            </label>
            <textarea
              id="enquiry-message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Specify your application, substrate, or regulatory requirements..."
              className="mt-1.5 w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:bg-neutral-200 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  Send Enquiry
                  <Send className="size-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export function EnquiryDialog({
  open,
  onOpenChange,
  defaultTopic = "general",
}: EnquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-white/12 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-2xl sm:max-w-[480px]">
        {open && (
          <EnquiryForm
            key={defaultTopic}
            defaultTopic={defaultTopic}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
