import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function IntroSection() {
  return (
    <section id="hero">
      <div className="w-full max-w-2xl space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <h1 className="font-serif text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
              Hi, I'm Omar
            </h1>
            <p className="max-w-[600px] md:text-xl text-foreground">
              Full-Stack Dev meeting AI. I craft scalable applications and solve real-world problems
              with modern tech.
            </p>
          </div>
          <div className="shrink-0 ">
            <Avatar className="size-28 border">
              <AvatarImage alt="John Doe" src="/portfolio_pfp.webp" />
              <AvatarFallback>OR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
}
