import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function IntroSection() {
  return (
    <section id="hero">
      <div className="w-full max-w-2xl space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <motion.h1
              className="font-serif text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm Omar
            </motion.h1>
            <motion.p
              className="max-w-[600px] md:text-xl text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Full-Stack Dev meeting AI. I craft scalable applications and solve real-world problems
              with modern tech.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shrink-0 "
          >
            <Avatar className="size-28 border">
              <AvatarImage alt="John Doe" src="/image.webp" />
              <AvatarFallback>OR</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
