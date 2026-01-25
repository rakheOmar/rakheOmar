"use client";

import {
  Download04Icon,
  MailOpen02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("rakheomar@outlook.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-lg border bg-card p-4 text-center">
        <div className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground text-xs">
          Contact
        </div>

        <div className="space-y-1">
          <h2 className="font-semibold text-xl tracking-tight">Get in Touch</h2>
          <p className="max-w-md text-muted-foreground text-xs">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            className={cn(
              "min-w-[120px] gap-1.5 text-xs",
              isCopied ? "bg-green-500 text-white hover:bg-green-600" : ""
            )}
            onClick={handleCopy}
            size="sm"
          >
            {isCopied ? (
              <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2} />
            ) : (
              <HugeiconsIcon icon={MailOpen02Icon} size={14} strokeWidth={2} />
            )}
            {isCopied ? "Copied!" : "Copy Email"}
          </Button>

          <a
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-full min-w-[120px] gap-1.5 text-xs sm:w-auto"
            )}
            download="Omar_Rakhe_Resume.pdf"
            href="/Resume.pdf"
          >
            <HugeiconsIcon icon={Download04Icon} size={14} strokeWidth={2} />
            Download Resume
          </a>
        </div>

        <p className="text-[10px] text-muted-foreground">
          or email me at{" "}
          <a
            className="text-foreground underline underline-offset-2 hover:opacity-80"
            href="mailto:rakheomar@outlook.com"
          >
            rakheomar@outlook.com
          </a>
        </p>
      </div>
    </section>
  );
}
