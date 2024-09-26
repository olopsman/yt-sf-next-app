import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href="/username-password">Username Password</Link>
        </li>
        <li>
          <Link href="/username-password-flow">
            Username Password OAuth2 Flow
          </Link>
        </li>
        <li>
          <Link href="/webserver-flow">Web Server OAuth2 Flow</Link>
        </li>
      </ul>
    </div>
  );
}
