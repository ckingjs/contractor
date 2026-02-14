import { useMemo, useState } from "react";
import type { TimeEntryPayload } from "@contractor/shared";

type AuthUser = {
  id: string;
  email: string;
  role: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

type ApiEntry = {
  id: string;
  type: string;
  timestamp: string;
  distance_from_site: number;
  is_within_geofence: boolean;
};

const projectId = "550e8400-e29b-41d4-a716-446655440000";

export function App() {
  const [apiUrl, setApiUrl] = useState("http://localhost:4000");
  const [email, setEmail] = useState("worker@contractor.local");
  const [password, setPassword] = useState("pass1234");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState("Ready to sign in.");
  const [latestEntry, setLatestEntry] = useState<ApiEntry | null>(null);

  const canClock = useMemo(() => token.length > 0, [token]);

  async function login() {
    setStatus("Signing in...");

    const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setStatus("Login failed. Check credentials and API URL.");
      return;
    }

    const data = (await response.json()) as AuthResponse;
    setToken(data.token);
    setUser(data.user);
    setStatus(`Signed in as ${data.user.email} (${data.user.role}).`);
  }

  async function sendClockEvent(type: TimeEntryPayload["type"]) {
    if (!canClock) {
      setStatus("Login required before clock actions.");
      return;
    }

    setStatus("Collecting location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const payload: TimeEntryPayload = {
          project_id: projectId,
          type,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          },
          timestamp: new Date().toISOString()
        };

        const response = await fetch(`${apiUrl}/api/v1/time-entries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
          setStatus(data.message ?? "Clock request failed.");
          return;
        }

        setLatestEntry(data as ApiEntry);
        setStatus(`Saved ${type.replace("_", " ")} at ${new Date(data.timestamp).toLocaleTimeString()}.`);
      },
      () => setStatus("Unable to read location. Enable browser location permissions.")
    );
  }

  return (
    <main className="page">
      <header>
        <p className="eyebrow">Contractor Management · Stage 2</p>
        <h1>Authenticated clock in/out workflow</h1>
        <p className="subtext">Vertical slice for login, geolocation capture, and geofence-backed time entries.</p>
      </header>

      <section className="panel">
        <h2>API Connection</h2>
        <label>
          API base URL
          <input value={apiUrl} onChange={(event) => setApiUrl(event.target.value)} />
        </label>
      </section>

      <section className="panel">
        <h2>Sign In</h2>
        <div className="form-grid">
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </div>
        <button onClick={login}>Sign In</button>
      </section>

      <section className="panel">
        <h2>Clock Actions</h2>
        <p className="status">{status}</p>
        <div className="actions">
          <button disabled={!canClock} onClick={() => sendClockEvent("clock_in")}>
            Clock In
          </button>
          <button disabled={!canClock} onClick={() => sendClockEvent("clock_out")}>
            Clock Out
          </button>
        </div>

        <div className="meta">
          <p>
            <strong>User:</strong> {user?.email ?? "Not signed in"}
          </p>
          <p>
            <strong>Project:</strong> {projectId}
          </p>
        </div>

        {latestEntry ? (
          <article className="entry-card">
            <h3>Latest Entry</h3>
            <p>Type: {latestEntry.type}</p>
            <p>Timestamp: {new Date(latestEntry.timestamp).toLocaleString()}</p>
            <p>Distance from site: {latestEntry.distance_from_site} m</p>
            <p>Within geofence: {latestEntry.is_within_geofence ? "Yes" : "No"}</p>
          </article>
        ) : null}
      </section>
    </main>
  );
}
