import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="">
      Tanmay
      <Button>Click me</Button>
      <UserButton />
    </div>
  );
}
