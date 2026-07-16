"""Generate a public-safe evidence brief from the confidential VAPT report."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "Ramkumar-M-Sanitized-VAPT-Case-Study.pdf"
PAGE_WIDTH, PAGE_HEIGHT = A4

INK = colors.HexColor("#090A0D")
PANEL = colors.HexColor("#13161B")
PAPER = colors.HexColor("#F1F1E9")
MUTED = colors.HexColor("#A5A8AF")
LINE = colors.HexColor("#33373F")
ACID = colors.HexColor("#D8FF5F")
VIOLET = colors.HexColor("#B8A7FF")
ORANGE = colors.HexColor("#FF9C60")

pdfmetrics.registerFont(TTFont("PortfolioSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("PortfolioSansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("PortfolioMono", "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"))
pdfmetrics.registerFont(TTFont("PortfolioMonoBold", "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"))


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, PAGE_HEIGHT - 16 * mm, PAGE_WIDTH - 18 * mm, PAGE_HEIGHT - 16 * mm)
    canvas.setFont("PortfolioMonoBold", 7)
    canvas.setFillColor(ACID)
    canvas.drawString(18 * mm, PAGE_HEIGHT - 12 * mm, "RM / PUBLIC EVIDENCE BRIEF")
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_WIDTH - 18 * mm, PAGE_HEIGHT - 12 * mm, f"PAGE {doc.page}")

    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 14 * mm, PAGE_WIDTH - 18 * mm, 14 * mm)
    canvas.setFont("PortfolioMono", 6.5)
    canvas.drawString(18 * mm, 9.5 * mm, "SANITIZED FOR PORTFOLIO USE - CLIENT IDENTIFIERS AND POC DATA OMITTED")
    canvas.restoreState()


styles = getSampleStyleSheet()
title = ParagraphStyle(
    "Title",
    parent=styles["Title"],
    fontName="PortfolioSansBold",
    fontSize=26,
    leading=27,
    textColor=PAPER,
    alignment=TA_LEFT,
    spaceAfter=7 * mm,
)
kicker = ParagraphStyle(
    "Kicker",
    parent=styles["Normal"],
    fontName="PortfolioMonoBold",
    fontSize=8,
    leading=11,
    textColor=ACID,
    spaceAfter=4 * mm,
)
heading = ParagraphStyle(
    "Heading",
    parent=styles["Heading2"],
    fontName="PortfolioSansBold",
    fontSize=14,
    leading=16,
    textColor=PAPER,
    spaceBefore=1 * mm,
    spaceAfter=2 * mm,
)
body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="PortfolioSans",
    fontSize=8.6,
    leading=12,
    textColor=MUTED,
    spaceAfter=2 * mm,
)
small = ParagraphStyle(
    "Small",
    parent=body,
    fontName="PortfolioMono",
    fontSize=7.2,
    leading=10,
    textColor=MUTED,
)
card_label = ParagraphStyle(
    "CardLabel",
    parent=small,
    fontName="PortfolioMonoBold",
    textColor=VIOLET,
)
card_title = ParagraphStyle(
    "CardTitle",
    parent=body,
    fontName="PortfolioSansBold",
    fontSize=10,
    leading=12,
    textColor=PAPER,
    spaceAfter=1.5 * mm,
)
stat_number = ParagraphStyle(
    "StatNumber",
    parent=body,
    fontName="PortfolioSansBold",
    fontSize=24,
    leading=25,
    textColor=INK,
    spaceAfter=1 * mm,
)
stat_label = ParagraphStyle(
    "StatLabel",
    parent=small,
    fontName="PortfolioMonoBold",
    fontSize=6.8,
    leading=9,
    textColor=INK,
)


def stat_cell(number, label, background):
    return Table(
        [[Paragraph(number, stat_number)], [Paragraph(label, stat_label)]],
        colWidths=[48 * mm],
        rowHeights=[11 * mm, 8 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
            ]
        ),
    )


def finding_card(code, name, detail):
    content = [
        Paragraph(code, card_label),
        Spacer(1, 2.5 * mm),
        Paragraph(name, card_title),
        Paragraph(detail, body),
    ]
    return Table(
        [[content]],
        colWidths=[78 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        ),
    )


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=24 * mm,
        bottomMargin=20 * mm,
        title="Sanitized VAPT Case Study - Ramkumar M",
        author="Ramkumar M",
        subject="Public-safe evidence brief for an independent web application VAPT assessment",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="evidence", frames=[frame], onPage=draw_page)])

    story = [
        Spacer(1, 2 * mm),
        Paragraph("CASE STUDY / JUNE 2026", kicker),
        Paragraph("Independent Web Application VAPT Assessment", title),
        Paragraph(
            "A sanitized evidence brief documenting the methodology, validated risk, and remediation output from an authorized CRM security challenge. Client identifiers, infrastructure details, customer data, exploit payloads, and screenshots have been intentionally omitted.",
            body,
        ),
        Spacer(1, 3 * mm),
        Table(
            [[
                stat_cell("09", "VALIDATED FINDINGS", ACID),
                stat_cell("04", "CRITICAL SEVERITY", VIOLET),
                stat_cell("05", "HIGH SEVERITY", ORANGE),
            ]],
            colWidths=[58 * mm, 58 * mm, 58 * mm],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]),
        ),
        Spacer(1, 4 * mm),
        Paragraph("Scope and method", heading),
        Paragraph(
            "A multi-tenant CRM was tested through black-box assessment and JavaScript source review. Coverage included authentication, authorization, tenant isolation, input validation, API exposure, and information disclosure. Workflow: Map - Validate - Exploit - Report - Retest.",
            body,
        ),
        Spacer(1, 3 * mm),
        Paragraph("Finding themes", heading),
        Table(
            [[
                [Paragraph("THEME_01", card_label), Paragraph("Broken access control", card_title), Paragraph("Privilege escalation and cross-tenant object access.", body)],
                [Paragraph("THEME_02", card_label), Paragraph("Authentication and API gaps", card_title), Paragraph("Sensitive routes lacked consistent server-side enforcement.", body)],
            ], [
                [Paragraph("THEME_03", card_label), Paragraph("Stored cross-site scripting", card_title), Paragraph("Persistent input was rendered without safe output encoding.", body)],
                [Paragraph("THEME_04", card_label), Paragraph("Information disclosure", card_title), Paragraph("A debug surface revealed internal security configuration.", body)],
            ]],
            colWidths=[87 * mm, 87 * mm],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1 * mm),
                ]
            ),
        ),
        Spacer(1, 4 * mm),
        Paragraph("Security value delivered", heading),
        Table(
            [[
                Paragraph("<b>REPRODUCIBLE</b><br/>Manual validation with clear steps and impact.", small),
                Paragraph("<b>ACTIONABLE</b><br/>Prioritized remediation tied to each root cause.", small),
                Paragraph("<b>RETESTABLE</b><br/>A practical verification plan for corrected controls.", small),
            ]],
            colWidths=[58 * mm, 58 * mm, 58 * mm],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 3.5 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5 * mm),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            ),
        ),
        Spacer(1, 4 * mm),
        Table(
            [[Paragraph("PUBLIC-SAFE DISCLOSURE", card_label), Paragraph("The source report remains private because it is classified confidential and contains engagement-specific infrastructure, customer data, and proof-of-concept material. This brief demonstrates the work without exposing sensitive data.", small)]],
            colWidths=[48 * mm, 126 * mm],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                    ("BOX", (0, 0), (-1, -1), 0.8, ACID),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 5 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5 * mm),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            ),
        ),
        Spacer(1, 4 * mm),
        Paragraph("Prepared by Ramkumar M", card_title),
        Paragraph("VAPT Engineer | Web, API, Mobile Application and Network Security | raamk575@gmail.com", small),
    ]
    doc.build(story)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
