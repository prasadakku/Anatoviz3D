// parser/reportParser.ts
export type Severity = "NORMAL" | "MILD" | "MODERATE" | "SEVERE";

export type MuscleFinding = {
  meshName: string;
  severity: Severity;
};

export type ParsedReport = {
  system: "full" | "muscular" | "skeletal" | "nerves";
  findings: MuscleFinding[];
  patientText: string;
};

function severityToRisk(severity: Severity): string {
  switch (severity) {
    case "NORMAL":
      return "0–10% (Normal)";
    case "MILD":
      return "20–35% (Low risk)";
    case "MODERATE":
      return "45–65% (Moderate risk)";
    case "SEVERE":
      return "75–90% (High risk)";
    default: {
      const _exhaustive: never = severity;
      return _exhaustive;
    }
  }
}

function hasAny(text: string, list: string[]) {
  return list.some((s) => text.includes(s));
}

// Decide severity based on nearby words
function inferSeverity(text: string, levelToken: string): Severity {
  const windowSize = 80;
  const idx = text.indexOf(levelToken);
  if (idx === -1) return "MILD";

  const from = Math.max(0, idx - windowSize);
  const to = Math.min(text.length, idx + windowSize);
  const window = text.slice(from, to);

  if (hasAny(window, ["severe", "marked", "high grade"])) return "SEVERE";
  if (hasAny(window, ["moderate", "mod."])) return "MODERATE";
  if (hasAny(window, ["mild", "early"])) return "MILD";
  return "MILD";
}

// Extract findings for C/T/L/Sacrum/Coccyx based on tokens like c4, t7, l4-5, sacrum, coccyx
function extractVertebraFindings(t: string): MuscleFinding[] {
  const findings: MuscleFinding[] = [];

  const pushOnce = (meshName: string, severity: Severity) => {
    if (!findings.some((f) => f.meshName === meshName)) {
      findings.push({ meshName, severity });
    }
  };

  // CERVICAL C1–C7
  const cervicalPatterns: [string, string, string][] = [
    ["c1", "C1_CervicalVertebra", "c1"],
    ["c2", "C2_CervicalVertebra", "c2"],
    ["c3", "C3_CervicalVertebra", "c3"],
    ["c4", "C4_CervicalVertebra", "c4"],
    ["c5", "C5_CervicalVertebra", "c5"],
    ["c6", "C6_CervicalVertebra", "c6"],
    ["c7", "C7_CervicalVertebra", "c7"],
  ];

  cervicalPatterns.forEach(([token, meshName, levelToken]) => {
    if (hasAny(t, [token])) {
      const severity = inferSeverity(t, levelToken);
      pushOnce(meshName, severity);
    }
  });

  // THORACIC T1–T12
  const thoracicPatterns: [string, string, string][] = Array.from(
    { length: 12 },
    (_, i) => {
      const level = i + 1;
      const token = `t${level}`;
      const meshName = `T${level}_ThoracicVertebra`;
      return [token, meshName, token];
    }
  );

  thoracicPatterns.forEach(([token, meshName, levelToken]) => {
    if (hasAny(t, [token])) {
      const severity = inferSeverity(t, levelToken);
      pushOnce(meshName, severity);
    }
  });

  // LUMBAR L1–L5
  const lumbarPatterns: [string, string, string][] = Array.from(
    { length: 5 },
    (_, i) => {
      const level = i + 1;
      const token = `l${level}`;
      const meshName = `L${level}_LumbarVertebra`;
      return [token, meshName, token];
    }
  );

  lumbarPatterns.forEach(([token, meshName, levelToken]) => {
    if (hasAny(t, [token])) {
      const severity = inferSeverity(t, levelToken);
      pushOnce(meshName, severity);
    }
  });

  // Sacrum & coccyx
  if (hasAny(t, ["sacrum", "s1"])) {
    const severity = inferSeverity(t, "s1");
    pushOnce("Sacrum", severity);
  }
  if (hasAny(t, ["coccyx", "tailbone"])) {
    const severity = inferSeverity(t, "coccyx");
    pushOnce("Coccyx", severity);
  }

  return findings;
}

export function parseReportText(text: string): ParsedReport {
  const t = text.toLowerCase();

  const findings = extractVertebraFindings(t);
  const hasSkeletal = findings.length > 0;

  if (hasSkeletal) {
    const bulletLines = findings
      .map(
        (f) =>
          `• ${f.meshName}: ${f.severity} → Risk ${severityToRisk(f.severity)}`
      )
      .join("\n");

    return {
      system: "skeletal",
      findings,
      patientText: `Spine MRI Analysis:\n\n${bulletLines}`,
    };
  }

  return {
    system: "full",
    findings: [],
    patientText: "No significant abnormality detected in this scan.",
  };
}
