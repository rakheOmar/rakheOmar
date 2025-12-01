import { Download04Icon, MailOpen02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("rakheomar@outlook.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact">
      <div className="w-full max-w-3xl mx-auto bg-linear-to-br from-primary/90 to-primary/60 rounded-2xl p-6 py-8 text-primary-foreground flex flex-col items-center text-center gap-4">
        <div className="inline-block rounded-lg bg-primary-foreground/10 text-primary-foreground px-3 py-1 text-xs backdrop-blur-sm border border-primary-foreground/20">
          Contact
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Get in Touch</h2>
          <p className="text-primary-foreground/80 text-sm md:text-base max-w-[500px] mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to
            say hi, feel free to reach out!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
          <Button
            onClick={handleCopy}
            size="sm"
            className={cn(
              "gap-2 min-w-[140px] font-semibold transition-all duration-300",
              isCopied
                ? "bg-green-500 text-white hover:bg-green-600 border-none"
                : "bg-background text-foreground hover:bg-background/90"
            )}
          >
            {isCopied ? (
              <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={1.5} />
            ) : (
              <HugeiconsIcon icon={MailOpen02Icon} size={16} strokeWidth={1.5} />
            )}
            {isCopied ? "Copied!" : "Copy Email"}
          </Button>

          <a href="/Resume.pdf" download="Omar_Rakhe_Resume.pdf" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full min-w-[140px] border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
            >
              <HugeiconsIcon icon={Download04Icon} size={16} strokeWidth={1.5} />
              Download Resume
            </Button>
          </a>
        </div>

        <p className="text-[10px] text-primary-foreground/60 mt-1">
          or email me at{" "}
          <a
            href="mailto:rakheomar@outlook.com"
            className="text-primary-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            rakheomar@outlook.com
          </a>
        </p>
      </div>
    </section>
  );
}
