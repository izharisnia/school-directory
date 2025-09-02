import Link from "next/link";

export default function SchoolCard({ school }) {
  return (
    <div className="card">
      <img
        src={`http://localhost:4000/${school.image}`}
        alt={school.name}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{school.name}</h3>
        <p className="card-sub">
          {school.city}, {school.state}
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
  );
}
