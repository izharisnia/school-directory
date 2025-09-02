import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/schools")
      .then(res => res.json())
      .then(data => setSchools(data.slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>
            Welcome to <span style={{ color: "var(--accent)" }}>EduConnect</span>
          </h1>
          <p>
            Discover schools around you. Browse, explore, and connect with the
            best institutions in your city with ease.
          </p>
          <div className="cta-row">
            <Link href="/addSchool" className="btn primary">Add a School</Link>
            <Link href="/showSchools" className="btn">Browse Schools</Link>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="container" style={{ marginTop: "48px" }}>
        <h2>Featured Schools</h2>
        <p className="subtitle">
          A quick look at some of the recently added institutions.
        </p>

        <div className="grid">
          {schools.map((school) => (
            <div className="card" key={school.id}>
              <img
                src={school.image}
                className="card-img"
                alt={school.name}
              />
              <div className="card-body">
                <h3 className="card-title">{school.name}</h3>
                <p className="card-sub">
                  {school.city}, {school.state}
                </p>
                <Link
                  href={`/school/${school.id}`}
                  className="btn primary"
                  style={{ marginTop: "12px", display: "inline-block" }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA for spacing balance */}
      <section className="container">
        <div className="cta-bottom">
          <h2>Ready to explore?</h2>
          <p className="subtitle">Use filters to find exactly what you need.</p>
          <div className="cta-row">
            <Link href="/showSchools" className="btn primary">Open Directory</Link>
            <Link href="/addSchool" className="btn">Add Your School</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
