# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **design asset and specification repository** for a BINUS x RevoU "Applied AI, Analytics & Automation Program" landing page. It contains no source code — only visual design references and image assets intended for implementing the page.

## Repository Structure

- **`images/`** — All visual assets needed to build the page: program/partner logos (BINUS, RevoU, Grab, BliBli, Mekari, XL Axiata, IBM, Sunday, World Economic Forum), instructor headshot photos (5 instructors), and section illustration images.
- **`section screenshot/`** — 12 PNG mockups showing the full page design section-by-section, from hero (Section 1) through closing CTA (Section 12). These serve as the visual specification for implementation.

## Page Architecture (12 Sections)

1. **Hero** — Program title, tagline, enrollment CTA
2. **Instructors** — "Best of Both Worlds" grid with Industry Leads and Academic Liaisons
3. **Certificate** — Credential from BINUS (Indonesia's #1 private university)
4. **Why Choose This Program** — Value propositions
5. **Curriculum Overview** — 5-phase, 12-week journey: Problem Framing → Data Intelligence → Generative AI Mastery → Agentic Automation → Capstone Residency
6. **Capstone Project** — End-to-end solution build
7. **The Learning Experience** — Live online sessions, hybrid moments, peer network
8. **Who This Program Is For** — Target audience profiles
9. **Program Details** — Logistics (schedule, pricing, format)
10. **Why This Beats Other AI Programs** — Competitive comparison
11. **FAQ** — Accordion-style frequently asked questions
12. **Closing CTA** — Final enrollment call-to-action

## Design Notes

- The design source is likely in **Figma** (Figma web fetch is pre-authorized in `.claude/settings.local.json`)
- Color palette: primarily white backgrounds with blue accents, orange/yellow CTA buttons, and colorful phase indicators in the curriculum section
- Typography: clean, modern sans-serif
- Layout: single-column, full-width sections with card-based components for instructors and features

## Working in This Project

There are no build commands, tests, or linting — this is a static asset repository. When implementing the page from these designs:
- Reference `section screenshot/` PNGs as the source of truth for layout and styling
- All required images are pre-exported in `images/`
- Instructor photos appear in both "Industry Leads" and "Academic Liaisons" rows in Section 2
