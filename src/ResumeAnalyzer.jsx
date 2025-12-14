import { useState } from "react";

const BACKEND_URL = "https://resume-screening-re.onrender.com";

export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);

  const handleAnalyze = async () => {
    if (!resumeFile || !jd) {
      alert("Please upload a resume and paste a job description.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
     
      const formData = new FormData();
      formData.append("file", resumeFile);

      const resumeRes = await fetch(`${BACKEND_URL}/parse-resume`, {
        method: "POST",
        body: formData,
      });

      if (!resumeRes.ok) {
        throw new Error("Resume parsing failed");
      }

      const resumeData = await resumeRes.json();

      
      const improveRes = await fetch(`${BACKEND_URL}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeData.cleaned_resume_text,
          job_description: jd,
        }),
      });

      if (!improveRes.ok) {
        throw new Error("Resume improvement failed");
      }

      const improveData = await improveRes.json();
      setResult(improveData);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
  const startDrag = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth;

    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = startWidth + (delta / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
          rows={6}
          placeholder="Paste the job description here..."
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
              Original Score:{" "}
              <span className="score bad">{result.original_score}</span>
            </p>
            <p>
              Improved Score:{" "}
              <span className="score good">{result.improved_score}</span>
            </p>
            <p>Improvement: +{result.score_delta}</p>
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
            <h2>Improved Resume (Text ↔ LaTeX)</h2>

            <div className="split-container">
            
              <div
                className="split-panel split-left"
                style={{ width: `${leftWidth}%` }}
              >
                <div className="panel-header">
                  <span>Readable Resume</span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(result.improved_resume)
                    }
                  >
                    Copy
                  </button>
                </div>
                {result.improved_resume}
              </div>

            
              <div className="divider" onMouseDown={startDrag} />

             
              <div
                className="split-panel split-right"
                style={{ width: `${100 - leftWidth}%` }}
              >
                <div className="panel-header">
                  <span>LaTeX Source</span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(result.latex_resume)
                    }
                  >
                    Copy
                  </button>
                </div>
                {result.latex_resume}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
