import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SchoolDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [school, setSchool] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/schools/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSchool(data);


          // fetch related schools from same city
          fetch("/api/schools")
            .then((res) => res.json())
            .then((all) =>
              setRelated(
                all.filter((s) => s.city === data.city && s.id !== data.id)
              )
            );
        })
        .catch((err) => console.error("Error fetching school:", err));
    }
  }, [id]);

  if (!school) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      {/* Main Detail Section */}
      <div className="detail">
        <img
          src={school.image}
          alt={school.name}
          className="detail-img"
        />

        <div className="detail-info">
          <h2>{school.name}</h2>
          <p>{school.address}</p>
          <p>
            {school.city}, {school.state}
          </p>

          {/* Highlight Contact Box */}
          <div className="contact-box">
            <h3>Contact Info</h3>
            <p>📞 {school.contact}</p>
            <p>✉️ {school.email_id}</p>
            <p>🏫 Board: {school.board}</p>
            <p>🏠 Hostel: {school.hostel}</p>
            <p>👥 Type: {school.type}</p>
            <p>🗣 Medium: {school.medium}</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{ marginTop: "40px" }}>
        <h3>Location Map</h3>
        <iframe
          width="100%"
          height="350"
          style={{
            borderRadius: "12px",
            border: "1px solid var(--stroke)",
            marginTop: "12px",
          }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            school.address + ", " + school.city + ", " + school.state
          )}&output=embed`}
        ></iframe>
      </div>

      {/* Related Schools */}
      {related.length > 0 && (
        <div className="related">
          <h3>Related Schools</h3>
          <div className="grid">
            {related.map((s) => (
              <div className="card" key={s.id}>
                <img
                  src={s.image}
                  className="card-img"
                  alt={s.name}
                />
                <div className="card-body">
                  <h3 className="card-title">{s.name}</h3>
                  <p className="card-sub">
                    {s.city}, {s.state}
                  </p>
                  <Link
                    href={`/school/${s.id}`}
                    className="btn primary"
                    style={{ marginTop: "8px", display: "inline-block" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
