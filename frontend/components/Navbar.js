import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [q, setQ] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/showSchools',
      query: { city: q }
    });
  };

  return (
    <nav className="navbar">
      {/* Logo → home */}
      <div className="brand">
        <Link href="/" style={{ display: 'inline-block' }}>
          EduConnect
        </Link>
      </div>

      {/* Left links */}
      <div className="nav-links">
        <Link href="/addSchool">Add School</Link>
        <Link href="/showSchools">Directory</Link>
      </div>

      {/* Right: search + theme */}
      <div className="nav-right">
        <form onSubmit={onSearch} className="search-box">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city…"
            aria-label="Search schools"
          />
        </form>
        <ThemeToggle />
      </div>
    </nav>
  );
}
