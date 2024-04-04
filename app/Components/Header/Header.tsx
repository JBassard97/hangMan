import "./Header.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className="full-header">
      <ul>
        <Link href="/" className="navLink">
          Play
        </Link>

        <Link href="/records" className="navLink">
          Records
        </Link>
      </ul>
    </div>
  );
}
