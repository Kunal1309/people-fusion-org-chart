import { NextRequest, NextResponse } from "next/server";
import { MOCK_CHART } from "@/lib/mockData";

const API_BASE_URL = "https://worksync.global/api";

const DEV_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImRhbmllbCIsImNvbXBhbnlfaWQiOjEsImVtcGxveWVlX2lkIjo1LCJ1c2VyX2ZpcnN0bmFtZSI6IkRhbmllbCIsInVzZXJfbGFzdG5hbWUiOiJZZWJvYWgiLCJ1c2VyX2VtYWlsIjoiIiwidXNlcl9waG9uZSI6bnVsbCwidXNlcl9zdGF0dXMiOiJBQ1RJVkUiLCJ1c2VyX3BpYyI6bnVsbCwidXNlcl90aHVtYiI6bnVsbCwicGFzc3dvcmRfcmVzZXQiOm51bGwsInJvbGVfdmlldyI6ZmFsc2UsInJvbGVfZWRpdCI6ZmFsc2UsImdyb3VwX3ZpZXciOmZhbHNlLCJncm91cF9lZGl0IjpmYWxzZSwiY291bnRyeSI6bnVsbCwidGltZXpvbmUiOm51bGwsInByZWZlcnJlZF9sYW5ndWFnZSI6bnVsbCwiaXNfbWFzdGVyIjpmYWxzZSwibG9ja2VkIjpmYWxzZSwidXBkYXRlZF9ieSI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwic2Vzc2lvbl9pZCI6MzAwNiwiZ3JvdXBzIjpbMiw3LDMxLDQ4LDU1XSwicm9sZXMiOlszLDIwLDgsOSwxOSwxMCwxLDE4LDZdLCJwcm9maWxlX3BpYyI6ImVtcGxveWVlcy8xL2QyNzQzZjUyLTk2NjQtNDQ1YS05NDk5LTFkNjk4MWMxYzBjOC5wbmcifQ.SKa1Q0ObZMQI9jIp0qvJG2goPLkTL6xs2RFc5K_6b5U";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get("employeeId");

  if (!employeeId) {
    return NextResponse.json({ error: "employeeId is required" }, { status: 400 });
  }

  const id = parseInt(employeeId, 10);

  // ── Try the real API first ──────────────────────────────────────────────
  try {
    const res = await fetch(
      `${API_BASE_URL}/relationship/people_chart/${employeeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${DEV_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // Short timeout — fail fast and fall through to mock
        signal: AbortSignal.timeout(5000),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Real API unreachable — fall through to mock data below
    console.warn(`[org-chart] Real API unavailable, serving mock data for id=${id}`);
  }

  // ── Fall back to mock data ──────────────────────────────────────────────
  const mockNode = MOCK_CHART[id];

  if (!mockNode) {
    return NextResponse.json(
      { error: `No data found for employee ${id}` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: "success",
    data: mockNode,
    _source: "mock", // lets you see in DevTools that mock data is being used
  });
}
