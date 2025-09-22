import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function SubmitButton({
  text,
  className,
  loading,
  variant,
}: {
  text: string;
  className?: string;
  loading: boolean;
  variant?: string;
}) {
  return (
    <Button
      disabled={loading}
      className={`w-full flex gap-2 ${className}`}
      type="submit"
      variant={(variant as any) ?? "default"}
    >
      <p>{text}</p>
      {loading && <LoaderCircle className="animate-spin" size={8} />}
    </Button>
  );
}
