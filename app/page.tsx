/* eslint-disable @next/next/no-img-element -- local static portrait, no remote optimization needed */
import CyberChallenge from "./CyberChallenge";
import ScrollAnimations from "./ScrollAnimations";

const skills = [
  {
    title: "Web & API",
    index: "01",
    items: ["OWASP Top 10", "IDOR", "XSS", "SQL Injection", "SSRF", "JWT Security"],
  },
  {
    title: "Testing stack",
    index: "02",
    items: ["Burp Suite", "Nmap", "Metasploit", "OWASP ZAP", "Nessus", "MobSF"],
  },
  {
    title: "Systems",
    index: "03",
    items: ["Linux", "Android", "TCP/IP", "DNS", "HTTP/S", "Privilege Escalation"],
  },
  {
    title: "Methods",
    index: "04",
    items: ["NIST CSF", "MITRE ATT&CK", "SANS CSC", "Cyber Kill Chain", "OSINT", "Reporting"],
  },
];

const projects = [
  {
    id: "CASE_01",
    title: "Independent VAPT Assessment",
    subtitle: "Farchase Solutions · 2026",
    description:
      "Identified and documented nine vulnerabilities—including four critical findings—across access control and input-handling surfaces.",
    outcomes: ["Privilege escalation", "IDOR", "Stored XSS", "Formal VAPT report"],
    href: "./Ramkumar-M-Sanitized-VAPT-Case-Study.pdf",
    linkLabel: "View proof brief",
    accent: "critical",
  },
  {
    id: "BUILD_02",
    title: "Linux Vulnerability Scanner",
    subtitle: "Python · CVE analysis · Docker",
    description:
      "An offline-first auditing tool that detects outdated packages, unsafe permissions, exposed Docker sockets, SUID files, and configuration drift.",
    outcomes: ["CVE signatures", "Baseline diff", "Prioritized findings", "System hardening"],
    href: "https://github.com/mike-rk/vuln-scanner/",
    linkLabel: "View source",
    accent: "tool",
  },
  {
    id: "BUILD_03",
    title: "Passive OSINT Domain Enumerator",
    subtitle: "Python · DNS · crt.sh · SSL",
    description:
      "Automates passive subdomain discovery, certificate intelligence, WHOIS lookups, and DNS record collection with structured JSON and CSV output.",
    outcomes: ["A / MX / TXT / NS", "Certificate intel", "WHOIS", "JSON & CSV"],
    href: "https://github.com/mike-rk/frexion/",
    linkLabel: "View source",
    accent: "recon",
  },
  {
    id: "WRITE_04",
    title: "Technical Security Write-ups",
    subtitle: "Medium · CTFs · Offensive methodology",
    description:
      "I publish structured security write-ups that explain reconnaissance, exploitation decisions, lessons learned, and practical remediation—not just the final flag.",
    outcomes: ["CTF write-ups", "Attack reasoning", "Web security", "Lessons learned"],
    href: "https://medium.com/@raamkz900",
    linkLabel: "Read write-ups",
    accent: "writeup",
  },
];

export default function Home() {
  return (
    <main>
      <ScrollAnimations />
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Ramkumar M home">
          <span className="brand-mark" aria-hidden="true">RM</span>
          <span className="brand-name">Ramkumar M</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#arsenal">Arsenal</a>
          <a href="#credentials">Credentials</a>
          <a href="#challenge">Challenge</a>
          <a href="#about">About</a>
          <a href="#value">My value</a>
        </div>
        <a className="nav-cta" href="mailto:raamk575@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse-dot" /> Seeking entry-level VAPT and penetration-testing roles</p>
          <h1>
            I find the gap
            <span>before attackers do.</span>
          </h1>
          <p className="hero-intro">
            I&apos;m <strong className="name-inline">Ramkumar M</strong>, an offensive-security practitioner
            specializing in web, API, mobile application, and network VAPT. I manually validate attack paths and turn them into actionable remediation.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="button button-ghost" href="./Ramkumar-M-VAPT-Resume.pdf" download>
              Download My Resume
            </a>
          </div>
        </div>

        <aside className="signal-card" aria-label="Current security profile summary">
          <div className="signal-head">
            <span>PROFILE_INTEL</span>
            <span className="live-label"><i /> LIVE</span>
          </div>
          <div className="profile-visual">
            <img
              src="./ramkumar-profile.webp"
              alt="Portrait of Ramkumar M"
              width={900}
              height={900}
              loading="eager"
              decoding="async"
            />
            <span className="profile-badge">OFFENSIVE SECURITY</span>
          </div>
          <dl className="signal-data">
            <div><dt>SPECIALTY</dt><dd>Web / API / Mobile VAPT</dd></div>
            <div><dt>TARGET</dt><dd>VAPT Analyst / Junior Pentester</dd></div>
            <div><dt>STATUS</dt><dd className="accent-text">Available immediately</dd></div>
          </dl>
        </aside>

        <div className="hero-metrics" aria-label="Key achievements">
          <div><strong>TOP 3%</strong><span>TryHackMe globally</span></div>
          <div><strong>80+</strong><span>hands-on security labs</span></div>
          <div><strong>9 / 4</strong><span>findings / critical</span></div>
          <div><strong>25+</strong><span>page technical report</span></div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <p className="section-kicker">01 / SELECTED OPERATIONS</p>
          <h2>Evidence over claims.</h2>
          <p>Projects built around real attack surfaces, repeatable testing, and useful reporting.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className={`project-card ${project.accent}`} key={project.id}>
              <div className="project-index">0{index + 1}</div>
              <div className="project-main">
                <p className="project-id">{project.id}</p>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <ul className="tag-list" aria-label={`${project.title} highlights`}>
                  {project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ul>
              </div>
              {project.href ? (
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  {project.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="project-link report-label">Assessment report</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section arsenal-section" id="arsenal">
        <div className="section-heading split-heading">
          <div>
            <p className="section-kicker">02 / TECHNICAL ARSENAL</p>
            <h2>Built for the full attack path.</h2>
          </div>
          <p>From reconnaissance and manual validation to exploitation evidence and remediation guidance.</p>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <div className="skill-title"><span>{skill.index}</span><h3>{skill.title}</h3></div>
              <ul>
                {skill.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="method-strip">
          <p>My testing loop</p>
          <ol>
            <li><span>01</span> Map</li>
            <li><span>02</span> Validate</li>
            <li><span>03</span> Exploit</li>
            <li><span>04</span> Report</li>
            <li><span>05</span> Retest</li>
          </ol>
        </div>
      </section>

      <section className="section credentials-section" id="credentials" aria-labelledby="credentials-title">
        <div className="credential-heading">
          <div>
            <p className="section-kicker">03 / TRAINING &amp; CREDENTIALS</p>
            <h2 id="credentials-title">Learning that leaves evidence.</h2>
          </div>
          <p>Formal foundations reinforced through consistent, hands-on practice.</p>
        </div>
        <div className="credential-grid">
          <article className="credential-proof credential-cisco">
            <span className="credential-code">CISCO_01</span>
            <p>Verified course completion</p>
            <h3>Introduction to Cybersecurity</h3>
            <span className="credential-org">Cisco Networking Academy · May 2026</span>
            <a
              className="credential-link"
              href="./Ramkumar-M-Cisco-Introduction-to-Cybersecurity.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View certificate <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="credential-proof credential-google">
            <span className="credential-code">GOOGLE_02</span>
            <p>Verified course completion</p>
            <h3>Foundations of Cybersecurity</h3>
            <span className="credential-org">Google · Coursera · June 2026</span>
            <a
              className="credential-link"
              href="./Ramkumar-M-Google-Foundations-of-Cybersecurity.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View certificate <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="credential-proof credential-simplilearn">
            <span className="credential-code">SIMPLILEARN_03</span>
            <p>Verified course completion</p>
            <h3>Ethical Hacking 101</h3>
            <span className="credential-org">Simplilearn SkillUp · June 2025</span>
            <a
              className="credential-link"
              href="./Ramkumar-M-Simplilearn-Ethical-Hacking-101.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View certificate <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="credential-proof">
            <span className="credential-code">SHADOWFOX_04</span>
            <p>Verified internship completion</p>
            <h3>Cyber Security Internship</h3>
            <span className="credential-org">ShadowFox · June 2026</span>
            <a
              className="credential-link"
              href="./Ramkumar-M-ShadowFox-Internship-Certificate.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View certificate <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="credential-highlight">
            <span className="credential-code">PRACTICE_05</span>
            <p>Global lab ranking</p>
            <h3>Top 3%</h3>
            <span className="credential-org">TryHackMe · 80+ labs</span>
          </article>
        </div>
        <div className="lab-profile-grid" aria-label="Public hands-on security lab profiles">
          <a
            className="lab-profile-card tryhackme-profile"
            href="https://tryhackme.com/p/raamk575/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Ramkumar's TryHackMe profile"
          >
            <div className="lab-profile-top">
              <span>TRYHACKME_PROFILE</span>
              <span className="profile-verified"><i /> PUBLIC</span>
            </div>
            <div className="lab-profile-main">
              <strong>TOP 3%</strong>
              <div>
                <h3>TryHackMe</h3>
                <p>80+ hands-on labs spanning web exploitation, networking, Linux, and offensive-security fundamentals.</p>
              </div>
            </div>
            <span className="lab-profile-action">View verified activity <span aria-hidden="true">↗</span></span>
          </a>

          <a
            className="lab-profile-card htb-profile"
            href="https://profile.hackthebox.com/profile/019f455f-fa7c-73f5-b966-3dbe3c82c079"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Ramkumar's Hack The Box profile"
          >
            <div className="lab-profile-top">
              <span>HTB_PROFILE</span>
              <span className="profile-verified"><i /> PUBLIC</span>
            </div>
            <div className="lab-profile-main">
              <strong>ACTIVE</strong>
              <div>
                <h3>Hack The Box</h3>
                <p>Ongoing offensive-security practice through lab machines and CTF-style technical challenges.</p>
              </div>
            </div>
            <span className="lab-profile-action">View public profile <span aria-hidden="true">↗</span></span>
          </a>
        </div>
      </section>

      <section className="section challenge-section" id="challenge">
        <div className="challenge-copy">
          <p className="section-kicker">04 / INTERACTIVE CHALLENGE</p>
          <h2>Think like an attacker.</h2>
          <p>
            Read the intelligence brief and identify the vulnerability. You get
            three attempts before the answer is declassified.
          </p>
          <div className="challenge-rule">
            <span aria-hidden="true">!</span>
            <p><strong>Rules of engagement</strong><br />No hints. No penalties. Three clean attempts.</p>
          </div>
        </div>
        <CyberChallenge />
      </section>

      <section className="section about-section" id="about">
        <div className="about-statement">
          <p className="section-kicker">05 / FIELD NOTES</p>
          <h2>Curiosity, made operational.</h2>
          <p>
            I&apos;m a recent BCA graduate who learns by breaking assumptions in controlled environments—and documenting how to make them safer.
          </p>
        </div>
        <div className="timeline" aria-label="Experience and education timeline">
          <article>
            <div className="timeline-date">JUN 2026</div>
            <div>
              <p className="timeline-type">EXPERIENCE</p>
              <h3>Cyber Security Intern</h3>
              <p className="timeline-org">ShadowFox · Virtual internship</p>
              <p>Simulated 5+ penetration-testing scenarios, uncovered 10+ vulnerabilities and misconfigurations, and authored structured remediation documentation.</p>
              <a
                className="timeline-proof-link"
                href="./Ramkumar-M-ShadowFox-Internship-Certificate.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Verified completion certificate <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article>
            <div className="timeline-date">2023 — 2026</div>
            <div>
              <p className="timeline-type">EDUCATION</p>
              <h3>Bachelor of Computer Applications</h3>
              <p className="timeline-org">Karan Arts &amp; Science College · CGPA 7.27</p>
              <p>Built a foundation in programming and systems, then applied it through offensive-security labs and independent tooling.</p>
            </div>
          </article>
          <article>
            <div className="timeline-date">ONGOING</div>
            <div>
              <p className="timeline-type">COMMUNITY</p>
              <h3>Security labs &amp; CTFs</h3>
              <p className="timeline-org">TryHackMe · Hack The Box · PortSwigger Academy</p>
              <p>Active in practical labs, DEF CON Group Coimbatore sessions, and CTF challenges spanning web security, OSINT, cryptography, reverse engineering, and forensics.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section value-section" id="value">
        <div className="value-heading">
          <div>
            <p className="section-kicker">06 / WHAT I BRING</p>
            <h2>Security findings your team can act on.</h2>
          </div>
          <div className="target-role-box">
            <span>ROLES I&apos;M PURSUING</span>
            <strong>VAPT Analyst</strong>
            <strong>Junior Penetration Tester</strong>
            <strong>Application Security Analyst</strong>
          </div>
        </div>
        <p className="value-intro">
          If you hire me, I will bring a disciplined attacker mindset—not just run scanners. I will map your attack surface, manually verify exploitable weaknesses, communicate business impact clearly, and work with developers to confirm effective fixes.
        </p>
        <div className="value-grid">
          <article>
            <span>01</span>
            <h3>Map the attack surface</h3>
            <p>Identify exposed assets, APIs, roles, trust boundaries, and high-risk paths before testing deeper.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Validate real risk</h3>
            <p>Separate scanner noise from exploitable findings and safely test how weaknesses can be chained.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Report for developers</h3>
            <p>Provide reproducible evidence, impact, severity, and practical remediation that engineering teams can use.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Retest and automate</h3>
            <p>Verify fixes, document residual risk, and build lightweight Python or Bash tooling for repeatable checks.</p>
          </article>
        </div>
      </section>

      <section className="contact-section">
        <div>
          <p className="section-kicker">OPEN CHANNEL</p>
          <h2>Have an attack surface worth testing?</h2>
        </div>
        <div className="contact-actions">
          <a className="button button-dark" href="mailto:raamk575@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
          <a href="tel:+919787857867">+91 97878 57867</a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">RM</span><span><span className="footer-name">Ramkumar M</span><br /><small>VAPT Engineer</small></span></div>
        <div className="footer-links">
          <a href="https://linkedin.com/in/ram-kumar45/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/mike-rk" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://medium.com/@raamkz900" target="_blank" rel="noreferrer">Medium ↗</a>
          <a href="https://tryhackme.com/p/raamk575/" target="_blank" rel="noreferrer">TryHackMe ↗</a>
          <a href="https://profile.hackthebox.com/profile/019f455f-fa7c-73f5-b966-3dbe3c82c079" target="_blank" rel="noreferrer">HTB ↗</a>
          <a href="mailto:raamk575@gmail.com">Email ↗</a>
        </div>
        <p>© 2026 Ramkumar M. Built with intent.</p>
      </footer>
    </main>
  );
}
