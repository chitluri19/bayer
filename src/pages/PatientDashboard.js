import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import HealthChart from "../components/HealthChart";

const PatientDashboard = () => {
  const [form, setForm] = useState({ sugar: "", weight: "", height: "" });
  const [records, setRecords] = useState([]);
  const [tips, setTips] = useState([]);
  const userId = auth.currentUser.uid;

  const fetchRecords = async () => {
    const ref = collection(db, "patients", userId, "healthRecords");
    const snapshot = await getDocs(ref);
    const docs = snapshot.docs.map((doc) => doc.data());
    setRecords(docs);

    const tipRef = collection(db, "patients", userId, "healthTips");
    const tipSnap = await getDocs(tipRef);
    const tipsData = tipSnap.docs.map((doc) => doc.data());
    setTips(tipsData);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "patients", userId, "healthRecords");
    await addDoc(ref, {
      ...form,
      timestamp: serverTimestamp(),
    });
    setForm({ sugar: "", weight: "", height: "" });
    fetchRecords();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Patient Dashboard</h2>

      {/* Form */}
      <div className="card p-4 mb-4">
        <h5>Enter Health Data</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Sugar (mg/dL)</label>
            <input
              type="number"
              className="form-control"
              name="sugar"
              value={form.sugar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Height (cm)</label>
            <input
              type="number"
              className="form-control"
              name="height"
              value={form.height}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>

      {/* Chart */}
      <div className="card p-4 shadow-sm">
        <HealthChart records={records} />
      </div>

      {/* Health Tips */}
      <div className="card p-4 shadow-sm mt-4">
        <h5>Porter Health Tips</h5>
        {tips.length === 0 ? (
          <p>No tips added yet.</p>
        ) : (
          <ul className="list-group">
            {tips.map((t, i) => (
              <li key={i} className="list-group-item">
                📝 {t.tip} <br />
                <small className="text-muted">
                  {t.timestamp?.toDate
                    ? new Date(t.timestamp.toDate()).toLocaleString()
                    : ""}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
