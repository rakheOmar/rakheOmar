import { motion } from "framer-motion";
import { Download04Icon, MailOpen02Icon, Tick02Icon } from "hugeicons-react";
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
      <motion.div
        className="w-full max-w-3xl mx-auto bg-linear-to-br from-primary/90 to-primary/60 rounded-2xl p-6 py-8 text-primary-foreground flex flex-col items-center text-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block rounded-lg bg-primary-foreground/10 text-primary-foreground px-3 py-1 text-xs backdrop-blur-sm border border-primary-foreground/20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Contact
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Get in Touch</h2>
          <p className="text-primary-foreground/80 text-sm md:text-base max-w-[500px] mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to
            say hi, feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
            {isCopied ? <Tick02Icon className="size-4" /> : <MailOpen02Icon className="size-4" />}
            {isCopied ? "Copied!" : "Copy Email"}
          </Button>

          <a href="/Resume.pdf" download="Omar_Rakhe_Resume.pdf" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full min-w-[140px] border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
            >
              <Download04Icon className="size-4" />
              Download Resume
            </Button>
          </a>
        </motion.div>

        <motion.p
          className="text-[10px] text-primary-foreground/60 mt-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          or email me at{" "}
          <a
            href="mailto:rakheomar@outlook.com"
            className="text-primary-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            rakheomar@outlook.com
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
