"use client";

import * as React from "react";
import { Check, Loader2, X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

/** Shared classes for the underlined fields — no boxes, one hairline each. */
const fieldClass =
  "w-full border-b border-white/15 bg-transparent pb-2.5 text-[15px] leading-snug text-white transition-colors duration-200 ease-expo placeholder:text-white/25 hover:border-white/30 focus:border-white focus:outline-none";

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, optional, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between text-[10.5px] tracking-[0.14em] text-white/40 uppercase"
      >
        {label}
        {optional ? (
          <span className="tracking-[0.06em] text-white/25 normal-case">
            Optional
          </span>
        ) : null}
      </label>
      <div className="mt-3">{children}</div>
      {error ? <p className="mt-2 text-[11px] text-amber">{error}</p> : null}
    </div>
  );
}

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
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3">
          <span className="block text-[10.5px] tracking-[0.16em] text-white/40 uppercase">
            Technical enquiry
          </span>
          <DialogTitle className="text-[clamp(1.4rem,2.2vw,1.75rem)] leading-tight font-medium tracking-[-0.02em] text-white">
            {isSuccess ? "Enquiry received" : "Tell us what you're building"}
          </DialogTitle>
          <DialogDescription className="max-w-[38ch] text-[13.5px] leading-relaxed text-white/50">
            {isSuccess
              ? "Our technical specialists will respond within one business day."
              : "Share the application and we'll come back with the specification, not a brochure."}
          </DialogDescription>
        </div>

        <DialogClose
          aria-label="Close"
          className="-mt-1 -mr-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-white/50 transition-colors duration-200 ease-expo hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
        >
          <X className="size-4" strokeWidth={1.5} />
        </DialogClose>
      </div>

      {isSuccess ? (
        <div className="mt-10 flex flex-col items-start border-t border-white/10 pt-10">
          <span className="grid size-11 place-items-center rounded-full border border-white/20 text-white">
            <Check className="size-4.5" strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[10.5px] tracking-[0.14em] text-white/40 uppercase">
            Reference
          </p>
          <p className="tnum mt-1.5 text-[22px] font-light tracking-[-0.01em] text-white">
            {referenceNumber}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-9 cursor-pointer text-[13px] text-white/60 underline underline-offset-[5px] decoration-white/25 transition-colors hover:text-white hover:decoration-white"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-7">
          <Field id="enquiry-name" label="Full name" error={errors.name}>
            <input
              id="enquiry-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Elena Rostova"
              className={fieldClass}
            />
          </Field>

          <Field id="enquiry-email" label="Work email" error={errors.email}>
            <input
              id="enquiry-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="elena@organization.com"
              className={fieldClass}
            />
          </Field>

          <Field id="enquiry-company" label="Company" optional>
            <input
              id="enquiry-company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Apex Facades Ltd"
              className={fieldClass}
            />
          </Field>

          <Field id="enquiry-message" label="Requirements" error={errors.message}>
            <textarea
              id="enquiry-message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Application, substrate, and any regulatory requirements"
              className={cn(fieldClass, "resize-none")}
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group/submit mt-2 inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white pr-2 pl-6 text-[13.5px] font-medium text-ink transition-[background-color,opacity] duration-250 ease-expo hover:bg-white/90 disabled:cursor-default disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" strokeWidth={1.6} />
                Sending
              </>
            ) : (
              <>
                Send enquiry
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-ink/8 transition-transform duration-250 ease-expo group-hover/submit:rotate-45"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[13px] fill-none stroke-current stroke-[1.6]"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </>
            )}
          </button>

          <p className="text-center text-[11.5px] text-white/35">
            We reply within one business day.
          </p>
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
      <DialogContent
        showCloseButton={false}
        className="w-[min(92vw,30rem)] max-h-[88vh] overflow-y-auto rounded-[24px] border border-white/10 bg-[#0b0c11]/92 p-8 text-white shadow-[0_60px_140px_-30px_rgb(0_0_0/0.8)] backdrop-blur-2xl sm:p-10"
      >
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
