# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projektkontext

Landing Page für das **Schutzkonzept gegen Gewalt und sexuellen Missbrauch** der Heinrich-Emanuel-Merck-Schule (HEMS) Darmstadt. Das Konzept ist gesetzlich vorgeschrieben (Abgabe bis Sommer) und soll Lehrkräften Orientierung und konkrete Handlungsmöglichkeiten geben.

Die Seite ist ein "lebendes Dokument" — Inhalte müssen durch Berechtigte direkt editierbar sein, ohne Code-Kenntnisse.

## Quelldokument

`Schutzkonzept_HEMS_03-05-26-v2.pdf` — das vollständige Konzept mit folgender Struktur:

1. **Vorgehen bei Verdacht** — Definitionen, Verdachtsentstehung, Erstgespräch, Interventionsplan (4 Fälle A–D), eigenes Verhalten
2. **Schulische Handlungsmöglichkeiten** — Unschuldsvermutung, Opferschutz, Trennung
3. **Verhaltenskodex** — 9 Unterpunkte (Sprache, Nähe/Distanz, Vier-Augen, Geschenke, Sport, Aufsicht, Kommunikation, Fotos, Klassenfahrten)
4. **Schulische Ansprechpersonen** — interne Beratung + Schulamt (Frau Kremer)
5. **Kooperationspartner** — Pro Familia, Wildwasser, Kinderschutzbund, Darmstädter Hilfe, Frauenhaus, Hilfe-Telefon, Mäander

## Technische Anforderungen

**Must-have (Phase 1):**
- Vollständiger Inhalt des PDFs als editierbare Web-Inhalte
- Einfache Editierbarkeit für Nicht-Entwickler (CMS oder Markdown-basiert)
- Klare Navigation durch die 5 Hauptkapitel
- Responsives Design (Lehrkräfte nutzen Mobilgeräte)

**Geplant (Phase 2 — noch nicht umsetzen):**
- Audio-Szenarien in drei Formaten:
  - **Format A**: Gespielte Szene (3–5 Min.) + Einordnung durch Schutzbeauftragten
  - **Format B**: Fiktiver Erfahrungsbericht aus Ich-Perspektive (2–3 Min.)
  - **Format C**: Fiktives Beratungsgespräch (5 Min.)
- Jedes Audio braucht: **Triggerwarnung** davor, **Transkript** darunter, **nativen Web-Player** (kein Spotify/Apple Podcasts)

## Wichtige Design-Entscheidungen

- **Kein externes Hosting für Audio** — Player direkt auf der Seite, Nutzer verlassen die Seite nicht
- **Barrierefreiheit**: Transkripte als Text-Alternative zu jedem Audio
- **Sensibles Thema**: Triggerwarnungen vor Audio-Inhalten sind Pflicht
- **Editierbarkeit hat Priorität** — Inhalte werden sich weiterentwickeln (lebendes Dokument)

## Vault / Obsidian

`core -> /home/norbert/Dokumente/core` (Symlink auf Norberts globalen Vault)

**Projektbeschreibung:** `core/02 Projekte/SchulkonzeptHems.md`

## Farbpalette (aus HEMS_Bild.webp)

| Token | Hex | Bedeutung |
|---|---|---|
| `hems-navy` | `#1a1d21` | Anthrazit-Schwarz (Metallfassade) |
| `hems-blue` | `#2d6fa8` | Stahlblau — Primär-Akzent |
| `hems-sky` | `#6aadc8` | Hellblau (Himmel im Glas) |
| `hems-steel` | `#4a6070` | Stahlgrau — Sekundär-Akzent |
| `hems-glass` | `#8da8b8` | Glasgrau (Spiegelton) |
| `hems-bg` | `#f0f3f5` | Kühles Silberweiß |
| `hems-muted` | `#68808c` | Kühles Grau |
