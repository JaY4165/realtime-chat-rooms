import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-[80vh] flex-col items-center justify-center space-y-4 p-24">
      <h1 className="text-6xl font-bold text-black">Welcome to ChatMaster</h1>
      <p className="text-center text-lg">
        Get started by creating account and joining rooms
      </p>
      <div className="flex gap-5">
        <Button size={"lg"} variant={"outline"}>
          <Link href={"/sign-up"}>SignUp</Link>
        </Button>
        <Button size={"lg"} variant={"default"}>
          <Link href={"/sign-in"}>SignIn</Link>
        </Button>
      </div>
    </main>
  );
}
