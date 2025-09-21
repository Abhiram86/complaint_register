import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-10">
      <h1 className="text-lg text-center font-bold">
        Welcome to our Complaint Management System
      </h1>
      <div className="flex flex-row gap-1 items-center justify-center">
        <p>register a complaint in</p>
        <Link className="text-blue-500 underline" href="/help">
          help
        </Link>
      </div>
    </div>
  );
}
