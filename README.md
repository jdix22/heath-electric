# Heath Electric (demo)

Independent electrical contractor, client of JDiX. Logo = round badge in Jamaican flag colours
(green #009B3A, gold #FED100, black), chosen by the owner 2026-11-17 from the logo canvas.

- Source: this folder (plain static: `index.html`, `assets/css/site.css`, `assets/js/site.js`, `favicon.svg`, `assets/og.png`)
- Private demo: https://demo.jdix.ca/heath-electric-10d9d8/ (jdix-demos, noindex)
- Preview server: `heath-electric`, port 8836
- Bump `?v=` on the CSS/JS links on every change.

## Point of view

- **Who they are to customers:** the one electrician who quotes the job, does the job and answers the phone afterwards. No hand-offs.
- **What customers worry about:** is it safe, will it pass inspection, will the price change, will they leave a mess, and "is this an emergency?"
- **Guiding word:** *Grounded.* Calm, certain and safe, like a properly grounded circuit.
- **Signature details:** the breaker panel (each breaker is a service; flipping it on lights it, shows what the job involves and adds it to the quote form) and the "Something wrong right now?" safety guide (first steps and urgency for six common problems, then a one-tap prefilled message).
- **Must not look like:** a generic trades template with a hard hat stock photo, a blue-and-orange "lightning" theme, or a software landing page. Steel, copper bus bar, panel labels and the badge's green, gold and black only.

## Waiting on the owner (every spot is marked "awaiting" on the page)

Fill these in `assets/js/site.js` → `CONFIG`; the page updates itself:

| Key | Where it shows |
|---|---|
| `PHONE` | hero call button, safety guide, quote side, footer |
| `EMAIL` | quote form sends here (mailto) |
| `HOURS`, `AREA` | quote side, About, FAQ |
| `LICENCE`, `INSURANCE` | About |
| `FORM_ENDPOINT` | optional, sends the form without opening an email app |

Photos to swap in:
- **Before/after slider** (`#ba` in `index.html`): replace the two Unsplash filler photos, then delete the yellow "Filler photos" banner and write the job caption.
- **Recent jobs** (`.frames`): six "Awaiting photo" frames → real job photos with a one-line caption each.
- **About photo**: replace the badge placeholder with a photo of the owner on site.
- Service card photos are Unsplash stock (tagged "Stock photo"); swap for his own where he has them.

## Questions for the owner

1. Owner's name, and does he want it on the site? (The copy says "Heath Electric", never a person's name.)
2. ECRA/ESA licence number (Ontario Licensed Electrical Contractor?) and insurance.
3. Service area and hours; does he take emergency calls?
4. Homes only, or commercial too? Copy currently leans residential.
5. Are the promises right: one electrician start to finish, written quote before work, every panel labelled, floors covered?
6. Any services to add or drop (generators, knob-and-tube replacement, commercial fit-outs)?
7. Free estimates? Any prices he's happy to show?
8. Instagram/Facebook/Google profile links.
9. Domain he wants for launch.

## Launch checklist (when approved)

Move to its own project on his domain: remove `noindex`, point canonicals/og at the domain, add robots.txt, sitemap.xml, 404.html, add `telephone`/`email`/`areaServed`/`address` to the JSON-LD, IndexNow. Footer credit stays "Website designed by jdix.ca".
