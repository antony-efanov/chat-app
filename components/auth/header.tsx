import { cn } from "@/lib/cn";

interface Props {
  label: string;
}

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-sans font-bold")}>Meow!</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
