"use client";

import { FormEvent, useRef, useState } from "react";

type Challenge = {
  code: string;
  brief: string;
  answer: string;
  accepted: string[];
};

const challenges: Challenge[] = [
  {
    code: "SOCIAL_VECTOR_01",
    brief: "An attacker impersonates a trusted service and sends a convincing login link to steal credentials.",
    answer: "phishing",
    accepted: ["phishing", "credential phishing"],
  },
  {
    code: "ACCESS_CONTROL_02",
    brief: "Changing /invoice/1042 to /invoice/1043 exposes another customer's private record without authorization.",
    answer: "IDOR",
    accepted: ["idor", "insecure direct object reference"],
  },
  {
    code: "INPUT_ATTACK_03",
    brief: "A crafted quote character changes a database query and returns records the user should never see.",
    answer: "SQL injection",
    accepted: ["sql injection", "sqli"],
  },
  {
    code: "SESSION_ATTACK_04",
    brief: "A logged-in user's browser is tricked into submitting an unwanted state-changing request to a trusted site.",
    answer: "CSRF",
    accepted: ["csrf", "cross site request forgery", "cross-site request forgery"],
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function CyberChallenge() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"playing" | "won" | "revealed">("playing");
  const [message, setMessage] = useState("Awaiting your analysis.");
  const inputRef = useRef<HTMLInputElement>(null);
  const challenge = challenges[challengeIndex];
  const attemptsLeft = 3 - attempts;

  function submitGuess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "playing") return;

    const candidate = normalize(guess);
    if (!candidate) {
      setMessage("Enter a security term before submitting.");
      inputRef.current?.focus();
      return;
    }

    if (challenge.accepted.some((answer) => normalize(answer) === candidate)) {
      setAttempts((current) => current + 1);
      setStatus("won");
      setMessage(`Access granted. ${challenge.answer} is correct.`);
      return;
    }

    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);
    setGuess("");

    if (nextAttempt >= 3) {
      setStatus("revealed");
      setMessage(`Attempts exhausted. The correct answer is ${challenge.answer}.`);
    } else {
      const remaining = 3 - nextAttempt;
      setMessage(`Incorrect. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`);
      inputRef.current?.focus();
    }
  }

  function restart() {
    setChallengeIndex((current) => (current + 1) % challenges.length);
    setGuess("");
    setAttempts(0);
    setStatus("playing");
    setMessage("New brief loaded. Awaiting your analysis.");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div className={`game-card status-${status}`}>
      <div className="game-head">
        <div>
          <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>THREAT_TERMINAL</span>
        </div>
        <span>CASE {String(challengeIndex + 1).padStart(2, "0")}/{String(challenges.length).padStart(2, "0")}</span>
      </div>

      <div className="game-body">
        <div className="intel-label"><span>INTEL BRIEF</span><span>{challenge.code}</span></div>
        <p className="intel-brief">“{challenge.brief}”</p>

        <form onSubmit={submitGuess} noValidate>
          <label htmlFor="security-guess">Identify the attack or vulnerability</label>
          <div className="guess-row">
            <span aria-hidden="true">&gt;_</span>
            <input
              ref={inputRef}
              id="security-guess"
              name="security-guess"
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value.slice(0, 40))}
              placeholder={status === "playing" ? "enter security term" : challenge.answer}
              disabled={status !== "playing"}
              maxLength={40}
              autoComplete="off"
              spellCheck="false"
              aria-describedby="game-feedback"
            />
            <button type="submit" disabled={status !== "playing"}>Execute</button>
          </div>
        </form>

        <div className="attempt-line">
          <span>ATTEMPTS</span>
          <div className="attempt-pips" aria-label={`${attemptsLeft} of 3 attempts remaining`}>
            {[0, 1, 2].map((pip) => <i key={pip} className={pip < attempts ? "spent" : ""} />)}
          </div>
          <span>{attempts}/3 USED</span>
        </div>

        <div className="game-feedback" id="game-feedback" aria-live="polite" role="status">
          <span aria-hidden="true">{status === "won" ? "✓" : status === "revealed" ? "!" : "›"}</span>
          <p>{message}</p>
        </div>

        {status !== "playing" && (
          <button className="restart-button" type="button" onClick={restart}>
            Load next challenge <span aria-hidden="true">↻</span>
          </button>
        )}
      </div>
    </div>
  );
}
