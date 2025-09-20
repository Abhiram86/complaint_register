import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <header className="p-1 border-b border-zinc-200">
      <nav className="px-2 flex items-center justify-between">
        <h1 className="font-bold">Logo</h1>
        <ul className="min-h-[48px] flex text-sm items-center font-medium gap-2">
          {links.map((link) => (
            <Link className="text-black" key={link.name} href={link.href}>
              <li>{link.name}</li>
            </Link>
          ))}
          <AuthButton />
        </ul>
      </nav>
    </header>
  );
}

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Help",
    href: "/help",
  },
];
