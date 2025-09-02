import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ShowSchools() {
  const router = useRouter();
  const initialCity = typeof router.query.city === 'string' ? router.query.city : '';

  const [schools, setSchools] = useState([]);

  // Filters
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState("");
  const [board, setBoard] = useState("");
  const [hostel, setHostel] = useState("");
  const [type, setType] = useState("");
  const [medium, setMedium] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/schools")
      .then(res => res.json())
      .then(data => setSchools(data));
  }, []);

  // Apply filters safely
  const filtered = useMemo(() => {
    return schools.filter((s) =>
      (!city || (s.city || '').toLowerCase().includes(city.toLowerCase())) &&
      (!state || (s.state || '').toLowerCase().includes(state.toLowerCase())) &&
      (!board || (s.board || '') === board) &&
      (!hostel || (s.hostel || '') === hostel) &&
      (!type || (s.type || '') === type) &&
      (!medium || (s.medium || '') === medium)
    );
  }, [schools, city, state, board, hostel, type, medium]);

  const clearFilters = () => {
    setCity(""); setState(""); setBoard(""); setHostel(""); setType(""); setMedium("");
    router.replace('/showSchools', undefined, { shallow: true });
  };

  return (
    <div className="page">
      <h1 className="page-title">School Directory</h1>

      {/* Filters - compact card */}
      <div className="filter-card" style={{ maxWidth: 1100, margin: "0 auto 12px" }}>
        <h3 className="filter-title">Refine your search</h3>
        <div className="filter-grid">
          <label>
            City
            <input className="input" placeholder="e.g. Dehradun" value={city} onChange={(e)=>setCity(e.target.value)} />
          </label>
          <label>
            State
            <input className="input" placeholder="e.g. Uttarakhand" value={state} onChange={(e)=>setState(e.target.value)} />
          </label>
          <label>
            Board
            <select className="input" value={board} onChange={(e)=>setBoard(e.target.value)}>
              <option value="">Any</option>
              <option>CBSE</option>
              <option>ICSE</option>
              <option>State Board</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Hostel
            <select className="input" value={hostel} onChange={(e)=>setHostel(e.target.value)}>
              <option value="">Any</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
          <label>
            Type
            <select className="input" value={type} onChange={(e)=>setType(e.target.value)}>
              <option value="">Any</option>
              <option>All Girls</option>
              <option>All Boys</option>
              <option>Co-education</option>
            </select>
          </label>
          <label>
            Medium
            <select className="input" value={medium} onChange={(e)=>setMedium(e.target.value)}>
              <option value="">Any</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Regional Language</option>
              <option>Bilingual</option>
            </select>
          </label>
        </div>
        <div className="cta-row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="btn" onClick={clearFilters}>Clear</button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {filtered.map((school) => (
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
              <p className="card-sub">
                {(school.board || '—')} • {(school.type || '—')} • {(school.medium || '—')}
              </p>
              <Link
                href={`/school/${school.id}`}
                className="btn primary"
                style={{ marginTop: "8px", display: "inline-block" }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="subtitle" style={{ gridColumn: '1/-1', textAlign: 'center' }}>
            No schools match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
