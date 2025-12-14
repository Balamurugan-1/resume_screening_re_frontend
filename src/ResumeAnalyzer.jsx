import { useState } from "react";

const BACKEND_URL = "https://resume-screening-re.onrender.com";

export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jd) {
      alert("Upload resume and enter JD");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Parse resume
      const formData = new FormData();
      formData.append("file", resumeFile);

      const resumeRes = await fetch(`${BACKEND_URL}/parse-resume`, {
        method: "POST",
        body: formData,
      });
      const resumeData = await resumeRes.json();

      // 2️⃣ Improve resume
      const improveRes = await fetch(`${BACKEND_URL}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeData.cleaned_resume_text,
          job_description: jd,
        }),
      });

      const improveData = await improveRes.json();
      setResult(improveData);

    }catch (err) {
    console.error("FULL ERROR:", err);
    alert(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <div className="card">
      <h2>1. Upload Resume</h2>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setResumeFile(e.target.files[0])}
      />
    </div>

    <div className="card">
      <h2>2. Job Description</h2>
      <textarea
        placeholder="Paste job description here..."
        rows={6}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
    </div>

    <button onClick={handleAnalyze} disabled={loading}>
      {loading ? "Analyzing..." : "Analyze Resume"}
    </button>

    {result && (
      <>
        <div className="card">
          <h2>Score Comparison</h2>
          <p>
            Original:{" "}
            <span className="score bad">{result.original_score}</span>
          </p>
          <p>
            Improved:{" "}
            <span className="score good">{result.improved_score}</span>
          </p>
          <p>Delta: +{result.score_delta}</p>
        </div>

        <div className="card">
          <h2>Missing Skills</h2>
          <ul>
            {result.missing_skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Improvement Suggestions</h2>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Improved Resume</h2>
          <pre>{result.improved_resume}</pre>
        </div>
      </>
    )}
  </>
);

}
