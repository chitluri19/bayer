import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const PorterDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [records, setRecords] = useState([]);
  const [tip, setTip] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const q = query(collection(db, "users"), where("role", "==", "patient"));
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(users);
    };
    fetchPatients();
  }, []);

  const handlePatientClick = async (id) => {
    setSelectedPatientId(id);
    const recordsSnapshot = await getDocs(
      collection(db, "patients", id, "healthRecords")
    );
    const recordsData = recordsSnapshot.docs.map((doc) => doc.data());
    setRecords(recordsData);
  };

  const handleSubmitTip = async () => {
    if (!selectedPatientId || !tip) return;
    try {
      const ref = collection(db, "patients", selectedPatientId, "healthTips");
      await addDoc(ref, {
        tip,
        porterId: "porter_" + Date.now(),
        timestamp: serverTimestamp(),
      });
      alert("Tip submitted!");
      setTip("");
    } catch (err) {
      alert("Error submitting tip: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Porter Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Patients</h5>
            <ul className="list-group">
              {patients.map((p) => (
                <li
                  key={p.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {p.email}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handlePatientClick(p.id)}
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card p-3 shadow-sm">
            <h5>Health Records</h5>
            {records.length === 0 ? (
              <p>No records to show</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Sugar</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, idx) => (
                    <tr key={idx}>
                      <td>{r.sugar}</td>
                      <td>{r.weight}</td>
                      <td>{r.height}</td>
                      <td>
                        {r.timestamp?.toDate
                          ? r.timestamp.toDate().toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <hr />
            <div>
              <h6>Add Health Tip</h6>
              <textarea
                className="form-control mb-2"
                rows={3}
                value={tip}
                onChange={(e) => setTip(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleSubmitTip}>
                Submit Tip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorterDashboard;
