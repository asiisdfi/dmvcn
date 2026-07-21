# Content Audit Round 1

Date: 2026-07-03

## Scope

- 48 unique official-source URLs extracted from `src/data/content.ts`.
- 30 core content pages: 10 state overview pages, 10 state REAL ID pages, 10 topic pages.
- This round checks source availability and obvious launch risk. It does not yet certify every factual sentence.

## Result Summary

Most federal, California, New York, Florida, Washington, New Jersey, Pennsylvania, Georgia, Texas.gov, TSA, DHS, and USA.gov URLs responded successfully.

Mass.gov returned `403` to `curl`, but Chrome browser verification returned `200` for key pages:

- `https://www.mass.gov/info-details/massachusetts-identification-id-requirements`
- `https://www.mass.gov/how-to/renew-your-drivers-license`

Texas DPS deep links timed out in automated checks, while Texas.gov fallback pages returned `200`.

- Keep Texas.gov as the main user path.
- Keep DPS links only as secondary official references until manual browser verification on a normal user browser.

Illinois Secretary of State URLs returned `403` in both `curl` and headless Chrome checks. Google indexes the official URLs, but they are blocked in this environment.

- Do not treat Illinois pages as fully launch-cleared yet.
- Before public launch, manually open the Illinois links in a regular browser on the deployment/user network.
- If they still block, replace public-facing Illinois buttons with the Secretary of State home page plus a short note telling users to search `Illinois REAL ID Secretary of State` from the official site.

## High-Risk Source Flags

### Illinois

Flagged URLs:

- `https://www.ilsos.gov/content/realid/us/en.html`
- `https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_x173.pdf`
- `https://www.ilsos.gov/departments/drivers/drivers-license/renewonline.html`
- `https://apps.ilsos.gov/dlexamcheck/`

Reason: access denied in automated and headless-browser checks.

Action before launch:

- Manually test in a normal browser.
- If normal browser also fails, downgrade Illinois from "ready" to "needs manual official-site navigation".

### Texas DPS

Flagged URLs:

- `https://www.dps.texas.gov/section/driver-license/federal-real-id-act`
- `https://www.dps.texas.gov/section/driver-license/driver-license-services-appointments`

Reason: timeout in automated and headless-browser checks.

Mitigation already present:

- `https://www.texas.gov/driver-services/texas-real-id/` works and is the main Texas REAL ID link.
- `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/` works and is the online eligibility link.

## Next QA Pass

The next pass should score each of the 30 core pages against:

- Official source coverage.
- Sentence-level factual risk.
- Whether the page says "must" where it should say "usually", "may", or "check official source".
- Whether the page has a real user path, not just a summary.
- Whether the page needs a warning banner before public launch.

Suggested order:

1. Federal REAL ID topic pages.
2. California, New York, Texas.
3. Florida, Washington, New Jersey, Massachusetts.
4. Pennsylvania, Georgia.
5. Illinois last because source accessibility is unresolved.

## Round 2 Changes

Date: 2026-07-03

### Federal REAL ID Language

Sources checked:

- `https://www.usa.gov/real-id`
- `https://www.tsa.gov/realid`
- `https://www.tsa.gov/travel/security-screening/identification`

Changes made:

- Reframed REAL ID as a requirement for using a state driver license or state ID for certain federal identity purposes, not as something every user must obtain.
- Added clearer 18+ TSA airport checkpoint language.
- Kept passport and other TSA-accepted IDs as alternatives.

Status: provisionally acceptable for MVP, but should be rechecked before AdSense submission.

### Massachusetts Deep Review

Sources checked in Chrome:

- `https://www.mass.gov/info-details/massachusetts-identification-id-requirements`
- `https://www.mass.gov/how-to/renew-your-drivers-license`
- `https://www.mass.gov/how-to/change-your-address-with-the-rmv`
- `https://www.mass.gov/orgs/massachusetts-registry-of-motor-vehicles`

Findings:

- Mass.gov identification requirements are split by credential type: REAL ID driver's license or REAL Mass ID, Standard permit, Standard driver's license, Standard Mass ID, CDL, and Liquor ID.
- The RMV address-change page says users need to inform RMV within 30 days after an address change.
- Mass.gov notices indicate many MyRMV individual online services have changed access flow and some now require MyMassGov.

Changes made:

- Added Massachusetts-specific notes to the state overview and REAL ID pages.
- Replaced generic "many online services" wording with MyRMV/MyMassGov-aware wording.
- Added the 30-day address-change point.
- Reduced risk around online renewals and first-time REAL ID document verification.

Status: stronger than MVP draft. Still requires a final sentence-level pass before public launch.

### Texas Source Priority

Sources checked:

- `https://www.texas.gov/driver-services/texas-real-id/`
- `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/`
- Texas DPS deep links listed in Round 1.

Changes made:

- Made Texas.gov the explicit main user path.
- Added a state note that DPS deep links timed out in automated and headless-browser checks.
- Avoided making DPS deep links the only route to appointments or REAL ID information.

Status: usable with Texas.gov as primary path; DPS deep links need manual browser verification.

### Illinois Risk Correction

Sources checked:

- Illinois Secretary of State links listed in Round 1.

Changes made:

- Removed the incorrect claim that Illinois links can be opened normally in a browser.
- Added an explicit state note that Illinois Secretary of State links returned Access Denied in both curl and headless Chrome.
- Marked Illinois as not launch-cleared until ordinary-browser/manual verification.

Status: not launch-cleared.

## Round 3 Changes

Date: 2026-07-05

### California Deep Review

Sources checked:

- `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/`
- `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/`
- `https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/`
- `https://www.dmv.ca.gov/portal/make-an-appointment/`

Findings:

- California DMV REAL ID page recommends using the interactive document checklist, completing the application online, uploading documents, saving the confirmation code, and bringing original documents to the office visit.
- The Change of Address page says to complete address change before applying for or renewing other DMV products and services, and says processing may take up to 3 days.
- The appointment page says some routine services are not handled at the counter and must be done online, at a kiosk, through a business partner, or by mail.

Changes made:

- Added California-specific editor notes to overview and REAL ID pages.
- Reframed online upload as a time-saving step, not a substitute for bringing originals.
- Added address-change-before-renewal wording and 3-day processing note.
- Reduced office-visit assumptions for routine services.

Status: stronger than MVP draft. Good candidate for early launch after final sentence-level pass.

### New York Deep Review

Sources checked:

- `https://dmv.ny.gov/driver-license/enhanced-or-real-id`
- `https://dmv.ny.gov/driver-license/get-learner-permit`
- `https://dmv.ny.gov/records/change-your-address`
- `https://dmv.ny.gov/contact-us/office-locations`

Findings:

- Headless Chrome was blocked by Cloudflare for NY DMV pages, but `curl` with a browser user agent could read official page text.
- NY DMV differentiates Standard, REAL ID, and Enhanced documents. Enhanced can be used instead of a passport for land/sea return to the U.S. from Canada, Mexico, and some Caribbean countries, but not for air travel between those countries.
- NY DMV address-change guidance says users must change address within 10 days of moving.
- NY DMV office page says appointments/reservations are encouraged and may be required during long waits, but not every office supports appointments.
- REAL ID has no additional fee beyond normal transaction fees; Enhanced has an additional fee.

Changes made:

- Added New York-specific editor notes.
- Added 10-day address-change wording.
- Clarified Enhanced vs REAL ID vs Standard.
- Reduced overbroad appointment wording.

Status: source text accessible through curl, but normal browser verification should be repeated before public launch because Cloudflare blocked headless Chrome.

### Texas Deep Review

Sources checked:

- `https://www.texas.gov/driver-services/texas-real-id/`
- `https://www.texas.gov/driver-services/`
- `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/`
- `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/`
- Texas DPS deep links listed in Round 1.

Findings:

- Texas.gov REAL ID page is stable and should remain the main public path.
- Texas.gov says a current Texas DL/ID is REAL ID-compliant if it has a star in the top right corner.
- Texas.gov says users without a star may get one on next renewal or replacement.
- New REAL ID-compliant Texas DL/ID application points to an in-person DPS path.
- Online renewal, replacement, upgrade, or address-change eligibility is determined by DPS; Texas.gov Help Desk cannot answer eligibility status questions.
- DPS deep links still time out in automated checks.

Changes made:

- Replaced Texas DPS deep-link action buttons with stable Texas.gov driver service and renewal/replacement pages.
- Kept Texas DPS references only as secondary source context where needed.
- Strengthened wording around DPS eligibility checks and avoiding online-service promises.

Status: usable with Texas.gov as primary path; DPS deep links still require manual browser verification if reintroduced.

### Per-Page Review Dates

Changes made:

- Added optional per-state `reviewedAt` field.
- State and REAL ID pages now display state-specific review dates when available.
- California, New York, and Texas show `2026-07-05`.
- Massachusetts remains `2026-07-03`.
- Illinois shows `2026-07-05` because source-risk status was reviewed, but the page is still not launch-cleared.

## Round 4 Changes

Date: 2026-07-07

### Florida Deep Review

Sources checked:

- `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/`
- `https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/`
- `https://www.flhsmv.gov/locations/`
- `https://services.flhsmv.gov/VirtualOffice/`

Access note:

- Official page text was readable through web retrieval and used for the content review.
- Local command-line fetch and the in-app browser returned `403 Access Denied` for FLHSMV pages in this environment. Before launch, click Florida public action links once from a normal browser/network.

Findings:

- FLHSMV says Florida began issuing REAL ID-compliant credentials on January 1, 2010, and star marking is the key user-facing signal.
- First in-office issuance after January 1, 2010, non-star credentials at expiration, and legal name changes trigger original document review for identity, SSN, and residential address.
- Florida driver license or ID credentials are renewed every 8 years; driver licenses can be renewed up to 18 months early and ID cards up to 12 months early.
- FLHSMV offers online renewal/replacement/address update through MyDMV Portal, but online convenience renewal is generally every other renewal period and SSN verification can affect eligibility.
- Florida address changes must be updated on the credential within 30 days.
- FLHSMV locations are county/location dependent and many offices require appointments.

Changes made:

- Added Florida `reviewedAt: 2026-07-07` and state-specific editor notes.
- Replaced generic material wording with star-marking, 2010 first in-office issuance, name-change chain, and online eligibility guidance.
- Added 30-day address-change and every-other-online-renewal risk notes.
- Added MyDMV Portal as a source, not just an action link.

Status: stronger than MVP draft. Good candidate for early launch after final sentence-level pass.

### Washington Deep Review

Sources checked:

- `https://dol.wa.gov/id-cards/real-id`
- `https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl`
- `https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/get-enhanced-driver-license-edl`
- `https://dol.wa.gov/driver-licenses-and-permits`
- `https://dol.wa.gov/appointments-and-locations`
- `https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices`

Access note:

- Official page text was readable through web retrieval and used for the content review.
- Local command-line fetch and the in-app browser returned `403 Forbidden` for WA DOL pages in this environment. Before launch, click Washington public action links once from a normal browser/network.

Findings:

- Washington's REAL ID-compliant state credential is the Enhanced Driver License or Enhanced ID, not a standard star-marked REAL ID card.
- DOL says EDL/EID uses a U.S. flag marking, while standard licenses and ID cards do not meet REAL ID federal requirements.
- EDL/EID requires U.S. citizenship, SSN, proof of citizenship, proof of identity, and Washington residency.
- EDL can be used for domestic air travel and land/sea re-entry to the U.S. from Canada, Mexico, Bermuda, and the Caribbean, but not for international air travel.
- Driver licensing offices and vehicle licensing offices are separate. Appointments are strongly encouraged; some testing services require appointment handling.
- The EDL application page provides an enhanced document tool and printable checklists, including Chinese-language checklist links.

Changes made:

- Added Washington `reviewedAt: 2026-07-07` and editor notes focused on EDL/EID distinction.
- Removed star-card assumptions from Washington wording.
- Added warnings for non-citizens, office-type confusion, temporary EDL limitations, and international air travel limits.
- Added WA REAL ID, EDL application, and driver licensing office pages as sources.

Status: stronger than MVP draft. Good candidate for early launch after final sentence-level pass.

### New Jersey Deep Review

Sources checked:

- `https://www.nj.gov/mvc/realid/`
- `https://www.nj.gov/mvc/realid/selector.html`
- `https://www.nj.gov/mvc/license/6pointid.htm`
- `https://www.nj.gov/mvc/online-services.html`
- `https://www.nj.gov/mvc/drivertopics/addchange.htm`
- `https://telegov.njportal.com/njmvc/AppointmentWizard`

Access note:

- All New Jersey source URLs returned `200` in local command-line checks.

Findings:

- NJ MVC frames REAL ID as optional unless the user needs a state license/ID for domestic flights or certain federal facilities and lacks another accepted ID.
- The REAL ID document selector uses a practical `2 + 1 + 6` structure: two proofs of residential address, one proof of full SSN, and six points from primary/secondary identity documents.
- NJ MVC 6 Points page says REAL ID requires two proofs of residency while Standard License/ID requires one.
- Identity documents must be originals or certified copies where applicable, and documents in non-English languages need certified translation.
- Address changes must be conducted online.
- Appointment Wizard distinguishes REAL ID appointments from renewal appointments; users eligible for renewal within the next 3 months should use the renewal appointment path.

Changes made:

- Added New Jersey `reviewedAt: 2026-07-07` and editor notes.
- Reframed the page around decision tool first, Document Selector second, appointment category third.
- Added `2 + 1 + 6`, certified/original documents, name-match, address-change, and renewal-appointment cautions.
- Added Document Selector, 6 Points of ID, and Appointment Wizard as official sources.

Status: stronger than MVP draft. Good candidate for early launch after final sentence-level pass.

### Per-Page Review Dates

Changes made:

- Florida, Washington, and New Jersey now show `2026-07-07` on state and REAL ID pages.
- California, New York, Texas, Florida, Washington, New Jersey, and Massachusetts have now had focused state-level reviews.

## Round 5 Changes

Date: 2026-07-07

### Pennsylvania Deep Review

Sources checked:

- `https://www.pa.gov/agencies/dmv/driver-services/real-id`
- `https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check`
- `https://www.pa.gov/services/dmv/apply-for-real-id-pre-verification`
- `https://www.pa.gov/agencies/dmv/online-services-dvs`
- `https://www.pa.gov/agencies/dmv/find-a-location/real-id-center-locations`

Access note:

- All Pennsylvania source URLs returned `200` in local command-line checks.
- The older PennDOT pre-verification URL redirects to the newer `pa.gov/services/dmv/apply-for-real-id-pre-verification` page; public action links now use the newer URL.

Findings:

- PennDOT frames REAL ID as optional; standard credentials can still be used for driving, voting, hospitals, post offices, federal courts, and federal benefits.
- PennDOT separates user paths: already pre-verified online ordering, renewing and getting REAL ID, applying for REAL ID now, non-U.S. citizens, and CDL holders.
- Users who first received a Pennsylvania license, permit, or photo ID after September 2003 may already have documents on file, but this should be checked rather than assumed.
- REAL ID document requirements still apply even if the user already has a Pennsylvania driver license or photo ID.
- PennDOT requires original or certified documents, proof of SSN with current legal name and full nine digits, and two physical Pennsylvania residency documents.
- Same-Day REAL ID Centers can issue a REAL ID onsite; ordinary Driver License Centers can process applications but the credential is mailed, with a 15-business-day timeframe stated by PennDOT.

Changes made:

- Added Pennsylvania `reviewedAt: 2026-07-07` and state-specific editor notes.
- Reframed Pennsylvania around pre-verification and service-path selection instead of a generic material checklist.
- Added warnings about physical residency documents, CDL in-person handling, and same-day vs mailed credential differences.
- Added the new pre-verification service page and online services page as public action/source paths.

Status: stronger than MVP draft. Good candidate for early launch after final sentence-level pass.

### Georgia Deep Review

Sources checked:

- `https://dds.georgia.gov/georgia-licenseid/real-id`
- `https://dds.georgia.gov/georgia-licenseid`
- `https://dds.georgia.gov/georgia-licenseid/new-licenseid/new-georgia-residents-and-out-state-license-transfers`
- `https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-renew-license-or-id`
- `https://dds.georgia.gov/locations/customer-service-center`

Access note:

- All Georgia source URLs returned `200` in local command-line checks.

Findings:

- Georgia DDS presents REAL ID under its Secure ID initiative. Georgia licenses and IDs issued after 2012 are generally REAL ID-compliant and marked by a gold or black star.
- DDS says TSA does not accept temporary or interim licenses/IDs, which matters for users changing or renewing credentials close to travel.
- U.S. citizens who already hold a REAL ID-compliant Georgia license or ID generally do not need to resubmit identity documents unless changing name, changing gender marker, or completing another identity-verifying transaction.
- Users without a Georgia REAL ID, non-U.S. citizens, and out-of-state or foreign credential transfers need original or certified identity/legal-status documents.
- Georgia residency proof generally requires two documents from separate sources or accounts, showing current residential address; P.O. Boxes do not satisfy residency.
- New Georgia residents must apply for a Georgia driver license within 30 days of becoming a resident.
- DDS Customer Service Center pages list services by location, so users should confirm the exact location supports their needed service.

Changes made:

- Added Georgia `reviewedAt: 2026-07-07` and state-specific editor notes.
- Replaced generic REAL ID wording with Secure ID, star marking, temporary credential, and existing REAL ID holder distinctions.
- Added new-resident 30-day transfer guidance, online renewal timing cautions, and customer-service-center service matching.
- Updated Georgia REAL ID source URL to the current `georgia-licenseid/real-id` page and added new-resident and renewal pages.

Status: stronger than MVP draft. Good candidate for early launch after final sentence-level pass.

### Per-Page Review Dates

Changes made:

- Pennsylvania and Georgia now show `2026-07-07` on state and REAL ID pages.
- California, New York, Texas, Florida, Washington, New Jersey, Massachusetts, Pennsylvania, and Georgia have now had focused state-level reviews.
- Illinois remains the only MVP state that is intentionally not launch-cleared because official-source access still requires ordinary-browser manual verification.

## Round 6 Changes

Date: 2026-07-07

### Launch Readiness: Topic Pages

Scope:

- 10 cross-state topic pages.
- Topic template review.
- Topic source URL check.

Changes made:

- Added optional topic-level `reviewedAt` field.
- Topic pages now display topic-specific review dates through `ReviewBadge`.
- Added optional topic-level `editorNotes` field.
- Topic pages now render a public `使用提醒` panel when editorial notes exist.
- Added `reviewedAt: 2026-07-07` and `editorNotes` to all 10 topic pages.
- Updated the global default review date to `2026-07-07` for index, quality, and other non-detail pages.
- Reworked topic reminders so cross-state pages are framed as direction-setting pages, not nationwide universal checklists.
- Replaced the old Georgia REAL ID source URL in the non-citizen topic with `https://dds.georgia.gov/georgia-licenseid/real-id`.
- Replaced the generic Georgia driver license source in the moving-state topic with the more specific new-resident/out-of-state transfer page.

Findings:

- Topic pages previously displayed only the global review date, which made topic freshness less transparent than state pages.
- Several topic pages were factually cautious but still read like generic advice. The new use reminders make the state-specific boundary more visible to users.
- The old Georgia REAL ID URL timed out in local checks; the current Georgia DDS REAL ID URL returned `200`.
- Topic source check covered 19 unique topic URLs. 17 returned `200`; FLHSMV and WA DOL returned `403` in local command-line checks, matching the known access limitation from Round 4.
- `https://www.dhs.gov/real-id` followed to `https://www.tsa.gov/realid` in local fetch checks. TSA and USA.gov remain available as user-facing federal sources.

Status:

- The 10 topic pages are stronger launch candidates after this pass.
- Remaining launch blockers are not topic-template issues: Illinois official-source access, ordinary-browser click checks for Florida and Washington official links, real contact email, production domain, analytics/ads privacy wording, and final human spot-check.

## Round 7 Changes

Date: 2026-07-09

### Search Mining and Homepage Redesign

Sources sampled:

- `https://www.usa.gov/state-motor-vehicle-services`
- `https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/`
- `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-license-id-card-online-renewal/`
- `https://www.texas.gov/driver-services/`
- `https://www.texas.gov/driver-services/texas-real-id/`
- `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/`
- `https://www.nj.gov/mvc/drivertopics/addchange.htm`
- `https://www.nj.gov/mvc/license/licrenew.htm`

Findings:

- High-intent DMV tasks cluster around REAL ID travel use, address changes before renewal/replacement, online eligibility, new-resident transfers, and non-citizen document paths.
- Official pages repeatedly push users toward service selection or eligibility checks before visiting an office.
- Address-change timing and order are a major practical failure point: California, Texas, New Jersey, and other states each expose different rules and online paths.

Changes made:

- Reworked the homepage first screen into a more compact `DMV 办事柜台` experience.
- Replaced the soft image-background hero with a clearer desk/grid layout, using the existing document-desk image as a visible supporting asset.
- Added a four-lane task board for high-intent scenarios: domestic travel, address/renewal order, moving states, and non-citizen materials.
- Changed the homepage visual language toward a public-service ledger: stronger borders, neutral grid background, red/blue accents, denser status blocks, and fewer marketing-style cards.
- Corrected homepage status wording from a broad deep-review claim to `候选州 9/10`, while keeping Illinois / Florida / Washington as visible manual-check items.

Verification:

- `npm run build` passed and generated 40 pages plus sitemap.
- Homepage desktop and mobile browser checks passed: no horizontal overflow, image loaded, 4 task lanes rendered, and no console errors.
- Finder form verified from homepage to `/states/california/real-id/`.

Status:

- Homepage is now more task-oriented and less AI/marketing-like.
- This is a meaningful design iteration, not the final completion of the full long-running goal. Remaining work includes deeper content expansion, Illinois ordinary-browser verification, production domain/contact setup, and at least one broader visual pass across index/list pages.

## Round 8 Changes

Date: 2026-07-09

### Registry Style Extension

Sources sampled:

- `https://www.usa.gov/state-motor-vehicle-services`
- `https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/`
- `https://www.texas.gov/driver-services/`
- `https://www.nj.gov/mvc/drivertopics/addchange.htm`

Findings:

- Official DMV entry points usually group tasks by service type, not by long article narratives.
- Users need quick status signals: which state, which task, whether the page has official sources, when it was reviewed, and whether a manual official-link check remains.
- The previous state/topic index pages still looked like a generic card directory after the homepage redesign.

Changes made:

- Rebuilt `/states/` as a registry table with state, agency, review date, source count, launch-readiness status, and direct overview/REAL ID actions.
- Rebuilt `/topics/` as a registry table with topic type, review date, source count, related-state count, and direct topic action.
- Added registry summary strips to state and topic index pages.
- Added `page-ledger` status strips to state overview pages, state REAL ID pages, and topic detail pages.
- Tuned detail-page heading scale and fixed a desktop visual gap in the `page-ledger`.

Verification:

- `npm run build` passed and generated 40 pages plus sitemap.
- Browser checks covered `/states/`, `/topics/`, `/states/new-jersey/`, `/states/georgia/real-id/`, and `/topics/renewal-replacement-address/` on desktop and mobile.
- Checks passed for registry rows, summary blocks, page ledgers, no horizontal overflow, and no console errors.

Status:

- The homepage, index pages, and detail page headers now share the same public-service registry style.
- Remaining work toward the long-running goal: continue expanding content beyond the first 10 states, ordinary-browser verification for Illinois/Florida/Washington official links, production config, and final launch audit.

## Round 9 Changes

Date: 2026-07-09

### Regional Expansion: MD / VA / NC / MI / OH

Sources checked or sampled:

- `https://mva.maryland.gov/licenses-ids`
- `https://mva.maryland.gov/licenses-ids/renew-license-or-id`
- `https://mva.maryland.gov/licenses-ids/update-name-address-or-other-license-info`
- `https://mva.maryland.gov/appointments-online-services`
- `https://health.maryland.gov/vsa/Pages/realid.aspx`
- `https://www.dmv.virginia.gov/licenses-ids/real-id`
- `https://www.dmv.virginia.gov/licenses-ids/real-id/faq`
- `https://www.dmv.virginia.gov/records/personal-information-updates`
- `https://www.dmv.virginia.gov/moving/moves-virginia`
- `https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/default.aspx`
- `https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/requirements.aspx`
- `https://www.ncdot.gov/dmv/license-id/Pages/license-renewal.aspx`
- `https://www.ncdot.gov/dmv/help/moving/Pages/default.aspx`
- `https://www.ncdot.gov/dmv/license-id/driver-license-appointments/Pages/default.aspx`
- `https://www.michigan.gov/sos/license-id/real-id`
- `https://www.michigan.gov/sos/license-id/license-and-id`
- `https://www.michigan.gov/sos/all-services/license-or-id-renewal`
- `https://www.michigan.gov/sos/all-services/change-of-address`
- `https://www.bmv.ohio.gov/dl-real-id.aspx`
- `https://www.bmv.ohio.gov/dl-identity-documents.aspx`
- `https://bmvonline.dps.ohio.gov/`
- `https://www.bmv.ohio.gov/new-to-ohio.aspx`
- `https://www.bmv.ohio.gov/dl-renewal-current.aspx`
- `https://www.usa.gov/real-id`

Findings:

- Maryland MVA makes the state REAL ID status check and document guide the right starting point; the content now warns users not to assume their personal record is compliant just because statewide compliance is high.
- Virginia DMV gives a strong anti-fraud warning: REAL ID applications may be started online, but DMV does not ask users to upload document scans from home through third-party sites.
- North Carolina explicitly requires the first REAL ID to be handled in person at a driver license office so documents can be scanned into the NCDMV record; later renewals may follow standard renewal paths.
- Michigan SOS separates online renewal/address services from REAL ID conversion and first-time document verification; documents may need issuing-agency verification and may not be approved the same day.
- Ohio BMV frames REAL ID as a Compliant Card and requires proof of full legal name, date of birth, SSN, Ohio residency, and legal presence; public content now warns users to plan for mailed credentials.
- USA.gov was last updated on 2026-04-06 and now mentions TSA ConfirmID as an identity-verification option for travelers without REAL ID or another acceptable ID.

Changes made:

- Added five state overview pages and five state REAL ID pages: Maryland, Virginia, North Carolina, Michigan, and Ohio.
- Added state-specific action links, source lists, document highlights, common mistakes, recommended steps, and editor notes for each new state.
- Updated `real-id-basics` and `airport-travel-after-real-id` to `reviewedAt: 2026-07-09`.
- Added TSA ConfirmID language to federal travel topics while clearly framing it as a TSA identity-verification fallback, not a DMV credential replacement.
- Updated README scope from 10 states / 20 state pages to 15 states / 30 state pages.

Access notes:

- Virginia, North Carolina, Ohio BMV, and USA.gov pages returned `200` in local user-agent checks.
- Michigan pages were readable through web/browser sampling but returned `403` in local `curl` checks, so Michigan should be ordinary-browser click-tested before production launch.
- Maryland MVA pages returned `403` in local `curl` checks while a Maryland state health page for REAL ID vital-records context returned `200`; Maryland MVA links should be ordinary-browser click-tested before production launch.
- Illinois remains not launch-cleared. Florida and Washington still need ordinary-browser official-link click checks because prior local automation returned `403`.

Status:

- Static content coverage has expanded from 30 core pages to 40 core pages: 15 state overviews, 15 state REAL ID pages, and 10 topic pages.
- This is a larger MVP corpus, but not a final launch certification. Remaining work: manual official-link click test for blocked states, real contact email, production domain, Search Console setup, analytics/ads privacy wording, and final sentence-level audit.

## Round 10 Changes

Date: 2026-07-09

### Repeatable Official Link Audit

Tooling added:

- Added `scripts/audit-official-links.mjs`.
- Added `npm run audit:links`.
- The script extracts official URLs from `src/data/content.ts`, deduplicates them, checks each URL with `curl` using a browser user agent, and groups results as `ok`, `watch`, or `fail`.

Audit result:

- Checked: 82 unique official URLs.
- OK: 55.
- Watch: 27.
- Fail: 0.
- Timeout setting: 12 seconds.

Watch groups:

- Florida FLHSMV links returned `403` in automated checks.
- Washington DOL links returned `403` in automated checks.
- Massachusetts Mass.gov links returned `403` in automated checks, but earlier browser verification reached key Mass.gov pages, so Massachusetts is not treated as a current public-link blocker.
- Illinois Secretary of State links returned `403`; Illinois remains not launch-cleared.
- Maryland MVA links returned `403`; Maryland remains an ordinary-browser click-test item.
- Michigan SOS links returned `403`; Michigan remains an ordinary-browser click-test item.

Changes made:

- Added README instructions for `npm run audit:links`.
- Updated the public `/sources/` page copy to explain that some government sites block automated checks and that users should rely on official pages they can open.

Status:

- No hard failed official URLs were found in this audit.
- The next launch-readiness pass should use a normal browser to manually click IL, FL, WA, MD, and MI official links and decide whether any public buttons need fallback wording or replacement with higher-level official home/search pages.

## Round 11 Changes

Date: 2026-07-09

### Ordinary-Browser Official Link Check

Scope:

- Florida action links: What to Bring, Renew or Replace, MyDMV Portal, Locations.
- Washington action links: REAL ID, Enhanced Driver License, Driver Licenses and Permits, Appointments and Locations, Driver Licensing Offices.
- Illinois action links: REAL ID, document requirements PDF, online renewal, appointments.
- Maryland action links: Licenses & IDs, renewal, update name/address, appointments/online services, new residents.
- Michigan action links: REAL ID, license/ID information, renewal, address change, online services.
- Fallback checks: FLHSMV home, WA DOL home, Illinois Secretary of State home, Maryland MVA home, USA.gov state motor vehicle services.
- Massachusetts sanity check because Mass.gov appeared in automated `watch` results.

Findings:

- Michigan official links opened successfully in the in-app browser. Michigan can move out of the public `待点验` group.
- Massachusetts official links opened successfully in the in-app browser, confirming the automated `403` was not a public-link blocker in this browser check.
- Florida FLHSMV links and FLHSMV home still returned Access Denied in this browser environment.
- Washington DOL links and DOL home still returned `403 Forbidden` in this browser environment.
- Illinois Secretary of State links and home still returned Access Denied in this browser environment.
- Maryland MVA links and home triggered a Cloudflare block in this browser environment.
- USA.gov state motor vehicle services opened successfully and is the best official fallback directory for blocked state motor-vehicle domains.

Changes made:

- Removed Michigan from homepage and state-list `待点验` status.
- Updated the launch-candidate count from 10/15 to 11/15 through the shared state-status logic.
- Added USA.gov state motor vehicle services to `federalSources`.
- Added USA.gov state motor vehicle services as a fallback action link for Florida, Washington, Illinois, and Maryland.
- Added state editor notes explaining the 2026-07-09 browser-blocking result and fallback path for Florida, Washington, Illinois, and Maryland.
- Updated README current-status language.

Status:

- Remaining public-link risk states: Illinois, Florida, Washington, Maryland.
- These states still have official content paths, but launch copy should keep the fallback visible until tested from the final deployment region and from a normal U.S. consumer browser.

## Round 12 Changes

Date: 2026-07-09

### Data-Driven Link Risk Display

Problem:

- Homepage and state-list launch status were previously hardcoded around a state ID list.
- Risk-state overview pages had fallback action links, but REAL ID detail pages still emphasized the first official deep link and did not surface the fallback path clearly enough.

Changes made:

- Added optional `accessStatus` data to state records.
- Moved Florida, Washington, Illinois, and Maryland public-link risk status into `src/data/content.ts`.
- Homepage and `/states/` now compute launch-candidate counts and pending-check state labels from state data instead of hardcoded lists.
- State overview pages now render an `官方入口状态` panel when `accessStatus` exists.
- State REAL ID pages now render the same `官方入口状态` panel before the official REAL ID entry.
- Added styles for watch/risk access panels that match the existing ledger design.

Status:

- Remaining public-link risk states are still Illinois, Florida, Washington, and Maryland.
- Michigan remains launch-candidate status in public navigation because ordinary-browser checks opened its official pages.
- The user-facing path for blocked state domains is now visible on the relevant state and REAL ID pages, not only in audit notes.

## Round 13 Changes

Date: 2026-07-09

### Western / Northeast State Expansion

Scope:

- Added Arizona, Colorado, Nevada, Oregon, and Connecticut state overview pages.
- Added matching REAL ID pages for all five states through the shared state template.
- Increased core state coverage from 15 states / 30 state pages to 20 states / 40 state pages.

Primary official sources sampled:

- Arizona: ADOT MVD Arizona Travel ID, New to Arizona, Change Your Address, Change Your Name, and Travel ID document checklist PDF.
- Colorado: Colorado DMV REAL ID and Colorado, New to Colorado, renewal, address-change, and driver-license FAQ pages.
- Nevada: Nevada DMV REAL ID, proof-of-identity/residency, new resident, online services, and driver license renewal pages.
- Oregon: Oregon DMV REAL ID Traveler, REAL ID, Change of Address, and DMV2U pages.
- Connecticut: CT DMV Get REAL ID, Renew Driver License, Transfer Out-of-State License, Change Driver License, and online change-of-address service.

Content findings added:

- Arizona Travel ID is explained as Arizona's REAL ID-compliant credential naming, with emphasis on identity/legal presence, SSN, and two Arizona address proofs.
- Colorado pages now emphasize new-resident appointment/preregistration, identity/lawful-status/residency/SSN document groups, and address-change/new-card distinctions.
- Nevada pages now warn that first REAL ID / first license / first ID cannot be completed online, and highlight original/certified documents plus DMV-approved translations.
- Oregon pages now highlight that temporary paper ID is not accepted by TSA and that REAL ID cards may take up to about 3 weeks to arrive.
- Connecticut pages now distinguish ordinary online renewal from first REAL ID, non-citizen, CDL, suspended, Drive-only, and expired-over-two-years cases; address changes should be handled before renewal.

Access notes:

- AZDOT / Arizona MVD deep links returned CloudFront `403` in automated checks and a JavaScript/cookie security challenge in browser checks. Arizona has an `accessStatus` warning and USA.gov state motor vehicle services fallback.
- Colorado pages were readable in web source sampling, but automated link audit and in-app browser checks returned CloudFront `403` / country-block behavior from this environment. Colorado now has an `accessStatus` warning and USA.gov state motor vehicle services fallback.
- Nevada official pages opened in browser sampling.
- Oregon official pages responded in automated source/link checks; one in-app browser navigation ended at `about:blank`, so Oregon should get one more manual click test from a normal browser before production launch.
- Connecticut pages were readable in web source sampling, but automated link audit and in-app browser checks returned request-blocked / service-unavailable behavior from this environment. Connecticut now has an `accessStatus` warning and USA.gov state motor vehicle services fallback.
- Existing public-link risk states remain Florida, Washington, Illinois, and Maryland, all with USA.gov fallback panels.

Status:

- Build generated 60 static pages after the expansion.
- Official link audit after expansion checked 108 URLs: 66 OK, 42 watch, 0 fail.
- The new five-state corpus is stronger than placeholder content but should still receive sentence-level human review before paid traffic or broad launch.
- Browser checks confirmed homepage/state-list counts, the new state pages, and the new REAL ID pages render without console errors or horizontal overflow.

## Round 14 Changes

Date: 2026-07-09

### Route-Board Usability Pass

Problem:

- State and topic pages had valid sources and useful sections, but the first read still felt like a generated information dump.
- A user with one concrete task had to read multiple panels before knowing which official entry to use.

Changes made:

- Added a route board to every state overview page with three practical paths: REAL ID, new resident / moving, and renewal / replacement / address.
- Added a three-step decision board to every state REAL ID page: decide whether REAL ID is necessary, jump to materials, then open the official or fallback entry.
- Added a quick-read board to topic pages using the first three recommended steps.
- Rewrote high-traffic topic copy for REAL ID basics, moving to a new state, and renewal/replacement/address order so the language reads more like a practical办事 note and less like generic reference text.

Fact boundary:

- This round did not introduce new unsourced DMV facts. It reorganized existing sourced content and kept federal REAL ID / TSA language tied to DHS, TSA, and USA.gov sources.
- USA.gov REAL ID was rechecked on 2026-07-09 for the current public explanation of REAL ID, state documentation categories, alternate TSA-accepted IDs, and ConfirmID context.
- Replaced the public Nevada REAL ID button/source from `GetRealNevada.com` to the Nevada DMV `dmv.nv.gov/realid.htm` page after `GetRealNevada.com` timed out in link audit; the DMV page returned `200` in direct header check.
- Adjusted `npm run audit:links` classification so automated `curl` timeouts / empty replies are `watch` instead of hard `fail`; these are government-site access uncertainty signals that require ordinary-browser point checks, not confirmed broken URLs.

Status:

- Build still generates 60 static pages after the template changes.
- Final link audit for this round checked 107 URLs: 66 OK, 41 watch, 0 fail.
- Browser QA checked desktop and mobile rendering for a state overview, a REAL ID page with fallback status, and two topic pages. Route boards rendered with three cards, no console errors, and no horizontal overflow.

## Round 15 Changes

Date: 2026-07-09

### Midwest / Utah Expansion and Link Cleanup

Scope:

- Added Minnesota, Indiana, Tennessee, Wisconsin, and Utah state overview pages.
- Added matching REAL ID pages for all five states through the shared state template.
- Increased core state coverage from 20 states / 40 state pages to 25 states / 50 state pages.

Primary official sources sampled:

- Minnesota: DPS/DVS REAL ID document requirements PDF and Minnesota online services entry.
- Indiana: BMV REAL ID overview, licenses/permits/IDs, online services / BMV Connect, and branch locations.
- Tennessee: TN.gov Driver Services REAL ID, new residents, online services, and Driver Services Center locations.
- Wisconsin: WisDOT DMV REAL ID, out-of-state license, online services, and service center pages.
- Utah: DLD required documents, regular original / out-of-state path, address change, and regular renewal pages.

Content findings added:

- Minnesota now separates Standard, REAL ID, and Enhanced credential paths, and warns that old DPS/DVS deep links and the short REALID domain have migration risk.
- Indiana now separates REAL ID upgrade, new resident / transfer, online services, and branch-location paths.
- Tennessee now separates REAL ID, Class D / new resident, online services, and Driver Services Center paths.
- Wisconsin now emphasizes REAL ID vs ordinary driving use, out-of-state transfer, service centers, and online-services eligibility.
- Utah now uses current DLD path names for required documents, regular original / out-of-state, address change, and renewal.

Fixes made:

- Replaced Wisconsin URLs that returned hard 404 with current WisDOT paths: `ooslicense.aspx` and `external/dmv.aspx`.
- Replaced Utah URLs that returned hard 404 with current DLD paths: `required-documents`, `regular-original`, and `address-change-regular`.
- Removed Minnesota's `realid.dps.mn.gov` short domain from public action/source links after it resolved to a 404 path in automated checks.
- Added Minnesota `accessStatus` with USA.gov state motor vehicle services fallback.
- Fixed stale related-topic slugs from `non-citizen-id` and `airport-travel` to the current topic slugs.

Access notes:

- Minnesota official PDF and online services returned `403` in automated checks, so Minnesota remains in `watch` with a visible USA.gov fallback.
- Tennessee TN.gov Driver Services pages timed out in automated checks and remain `watch`; these are not classified as hard failures.
- Indiana, Wisconsin, and Utah links did not produce hard failures in the final audit.
- Existing public-link risk states remain visible through data-driven `accessStatus` panels where applicable.

Status:

- Build generated 70 static pages after the expansion.
- Final link audit for this round checked 125 URLs: 78 OK, 47 watch, 0 fail.
- Browser QA checked homepage, state list, Minnesota overview, and Minnesota/Indiana/Tennessee/Wisconsin/Utah REAL ID pages in desktop and mobile widths. The tested pages had no console errors, no horizontal overflow, visible update markers, and the expected route or decision boards.

## Round 16 Changes

Date: 2026-07-09

### Content Quality Gate and Central / Southern Expansion

Scope:

- Added `npm run audit:content` to check content structure before launch or expansion.
- Added Missouri, Iowa, Kansas, South Carolina, and Kentucky state overview pages.
- Added matching REAL ID pages for all five states through the shared state template.
- Increased core state coverage from 25 states / 50 state pages to 30 states / 60 state pages.

Content quality gate:

- `scripts/audit-content-quality.mjs` parses `src/data/content.ts`.
- It checks state IDs, topic slugs, reviewed dates, minimum material/checklist/step counts, official action links, official sources, and related topic/state references.
- The script caught Minnesota having only two source entries after earlier link migration cleanup.
- Added the official Minnesota license/permit/ID application PDF as a third Minnesota source.

Primary official sources sampled:

- Missouri: DOR REAL ID, required documents checklist, driver license page, license office locator, and REAL ID acceptable documents PDF.
- Iowa: Iowa DOT REAL ID, New to Iowa, renewal, change information, schedule appointment, and DMV location pages.
- Kansas: KDOR REAL ID, required documents / appointment scheduling, driver license information, online services, and REAL ID FAQ.
- South Carolina: SCDMV driver license, Moving to SC, renewals, address/name change, online transaction list, and Form MV-93 checklist.
- Kentucky: DRIVE REAL ID, What You Need, New To Kentucky, renewal, update/replace, and driver services pages.

Content findings added:

- Missouri now explains REAL ID as optional for state driving use, separates federal-use needs from ordinary driving, and highlights the 10-15 day card mailing window.
- Iowa now emphasizes two printed current Iowa residential address proofs and distinguishes New to Iowa, renewal, duplicate, and change-information paths.
- Kansas now emphasizes two Kansas address proofs, recent-address evidence, and the warning that junk mail or personal letters are not valid address proof.
- South Carolina now separates REAL ID vs standard license choice, Moving to SC, address/name change, and Form MV-93 checklist preparation.
- Kentucky now emphasizes original/certified documents, the 30-day new-resident license timing, vision screening for renewal, and that REAL ID upgrades cannot be completed online or by mail.

Access notes:

- Missouri DOR returned `403` in automated checks; Missouri has an `accessStatus` warning and USA.gov fallback.
- Iowa DOT returned Akamai `403` in automated checks; Iowa has an `accessStatus` warning and USA.gov fallback.
- Kansas KDOR timed out in automated checks; Kansas has an `accessStatus` warning and USA.gov fallback.
- South Carolina SCDMV returned CloudFront `403` or timed out in automated checks; South Carolina has an `accessStatus` warning and USA.gov fallback.
- Kentucky DRIVE pages returned `200` in direct checks and final audit.

Status:

- Content audit after expansion checked 30 states and 10 topics: 0 errors.
- Build generated 80 static pages after the expansion.
- Final link audit for this round checked 151 URLs: 83 OK, 68 watch, 0 fail.
- Browser QA checked homepage, state list, Missouri/Iowa/Kansas/South Carolina/Kentucky overview pages, and all five matching REAL ID pages in desktop and mobile widths. The tested pages had no console errors, no horizontal overflow, visible update markers, and the expected route or decision boards.

## Round 17 Changes

Date: 2026-07-09

### South and Southwest Expansion

Scope:

- Added Louisiana, Oklahoma, Alabama, Arkansas, and New Mexico state overview pages.
- Added matching REAL ID pages for all five states through the shared state template.
- Increased core state coverage from 30 states / 60 state pages to 35 states / 70 state pages.
- Updated `README.md` to reflect the 35-state coverage set.

Primary official sources sampled:

- Louisiana: OMV REAL ID, License Renewal, License Transfers, Duplicate / Replacement / Reconstructed Cards, and Online Services pages.
- Oklahoma: Service Oklahoma REAL ID checklist, required documents, out-of-state transfer, renew/replace, and address update pages.
- Alabama: ALEA STAR ID, STAR ID document list, document requirements and fees, license/ID cards, and driver license offices pages.
- Arkansas: DFA Real ID, Driver Services, Online Driver Services, MyDMV, and USA.gov state motor vehicle services fallback.
- New Mexico: NM REAL ID microsite, REAL ID acceptable documents PDF, MVD licenses/IDs, renewal, and address change pages.

Content findings added:

- Louisiana now emphasizes two original Louisiana street-address residence documents from independent sources, SSN verbal/SSOLV verification, and renewal checks for vision, insurance, and residency.
- Oklahoma now emphasizes that a physical SSN card is not required, two residency proofs are needed for REAL ID, all name changes since birth must be documented, and temporary paper credentials are not accepted by TSA.
- Alabama now uses the state-specific STAR ID naming, separates first-time STAR ID at ALEA Driver License exam offices from county renewals/duplicates, and highlights four document groups with no photocopies.
- Arkansas now distinguishes Arkansas's Social Security Card requirement from states that only verify SSN, and adds practical notes on Revenue Office appointments, online driver services, and DFA access fallback.
- New Mexico now separates REAL ID from Standard Driver License / ID, including Standard credential rules that do not require SSN or fingerprints, plus certified translation and original/certified copy requirements for REAL ID.

Access notes:

- Louisiana OMV ExpressLane pages returned `200` in direct checks during source review.
- Oklahoma Service Oklahoma pages returned `200` in direct checks during source review.
- Alabama ALEA pages returned `200` or normal redirect-to-200 behavior in direct checks during source review.
- Arkansas DFA pages may return `403` in automated checks; Arkansas has an `accessStatus` warning and USA.gov fallback.
- New Mexico REAL ID microsite returned `200`; some MVD main-site deep links may return `403`, so New Mexico has an `accessStatus` warning and USA.gov fallback.

Status:

- Content audit after expansion checked 35 states and 10 topics: 0 errors.
- Build generated 90 static pages after the expansion.
- Final link audit for this round checked 175 URLs: 104 OK, 71 watch, 0 fail.
- In-app browser control timed out while opening a fresh tab, so visual browser QA could not be completed in this round. Static DOM QA checked homepage, state list, Louisiana/Oklahoma/Alabama/Arkansas/New Mexico overview pages, and all five matching REAL ID pages: generated HTML present, expected route/decision card counts present, review dates present, official-link counts present, Arkansas/New Mexico access panels present, 35-state count visible, and no stale 30-state count found.

## Round 18 Changes

Date: 2026-07-09

### Northeast Small-State and Hawaii Expansion

Scope:

- Added Delaware, Rhode Island, New Hampshire, Maine, and Hawaii state overview pages.
- Added matching REAL ID pages for all five states through the shared state template.
- Increased core state coverage from 35 states / 70 state pages to 40 states / 80 state pages.
- Changed the state-list lead from "首批覆盖" to "当前覆盖" so the site reads less like a temporary draft.
- Updated `README.md` to reflect the 40-state coverage set.

Primary official sources sampled:

- Delaware: SecureID / federally compliant DL/ID, general requirements, new resident transfer, license renewal, name/address change, and online services pages.
- Rhode Island: RI DMV REAL ID, Document Checklist PDF, license renewal, out-of-state/country transfer, and name/address change pages.
- New Hampshire: NH DMV REAL ID, REAL ID required documents PDF, renewal, transfer from another state, update personal information, and online renewals pages.
- Maine: BMV REAL ID, BMV home, online renewal / replacement, online renewal FAQ, and BMV appointment system pages.
- Hawaii: HIDOT driver license FAQ, Honolulu REAL ID, Hawaii acceptable documents PDF, Honolulu driver license, and Honolulu driver licensing center pages.

Content findings added:

- Delaware now emphasizes original/certified document revalidation, two separate Delaware residence proofs, the 60-day new-resident license timing, 180-day renewal window, 30-day address notice, and SSA-first name-change timing.
- Rhode Island now emphasizes the LI-1 form, one identity document, SSN / SSA ineligibility, two RI residency proofs, out-of-state transfer evidence, and P.O. Box restrictions.
- New Hampshire now emphasizes the 60-day new-resident transfer timing, 30-day address-update timing, REAL ID required-documents PDF, name matching, and RIN/renewal-notice online-renewal dependency.
- Maine now distinguishes initial REAL ID in-person applications from existing REAL ID online renewal / duplicate eligibility, and highlights SSN-card-not-required, P.O. Box restrictions, and online service exclusions.
- Hawaii now explains the state-level HIDOT guidance plus county-administered offices, the one-REAL-ID-compliant-card rule, temporary-card travel limitation, original/certified document rules, SSN documentation optionality, and county-specific appointment paths.

Access notes:

- Delaware DMV pages returned `200` in direct checks during source review.
- Rhode Island DMV pages and PDF returned `403` in automated checks; Rhode Island has an `accessStatus` warning and USA.gov fallback.
- New Hampshire DMV pages and PDF returned `403` in automated checks; New Hampshire has an `accessStatus` warning and USA.gov fallback.
- Maine BMV and Maine online renewal pages returned `200` in direct checks during source review.
- HIDOT and Honolulu official pages returned `200`; some county-level Hawaii pages returned `403`, so Hawaii has an `accessStatus` warning and HIDOT fallback.

Status:

- Content audit after expansion checked 40 states and 10 topics: 0 errors.
- Build generated 100 static pages after the expansion.
- Final link audit for this round checked 200 URLs: 118 OK, 82 watch, 0 fail.
- Static DOM QA checked homepage, state list, Delaware/Rhode Island/New Hampshire/Maine/Hawaii overview pages, and all five matching REAL ID pages: generated HTML present, expected route/decision card counts present, review dates present, official-link counts present, Rhode Island/New Hampshire/Hawaii access panels present, 40-state count visible, and no stale 35-state or 30-state count found.

## Round 19 Changes

Date: 2026-07-09

### 50-State Coverage Completion

Scope:

- Added Alaska, Idaho, Mississippi, Montana, Nebraska, North Dakota, South Dakota, Vermont, West Virginia, and Wyoming state overview pages.
- Added matching REAL ID pages for all ten states through the shared state template.
- Increased core state coverage from 40 states / 80 state pages to 50 states / 100 state pages.
- Updated `README.md` from a round-by-round coverage list to a concise 50-state coverage statement.

Primary official sources sampled:

- Alaska: DMV REAL ID Update, REAL ID Checklist, Credential Services, Changing Identification Details, and Online DMV.
- Idaho: ITD Star Card, Star Card acceptable documents, Add the Star Tool, Idaho DMV, and ITD DMV.
- Mississippi: Driver Service Bureau home, Required Documents, Renew Driver License / ID, Identification Cards, Non-U.S. Citizen Information, and name-change FAQ.
- Montana: MVD REAL ID, REAL ID Checklist PDF, Required Documents, Renew License / ID, Address Change, and Drivers New to Montana.
- Nebraska: Driver License, Document Verification Requirements, New Nebraska Resident Driver Licensing, Renewals, and Change of Address.
- North Dakota: NDDOT REAL ID Information, REAL ID Checklist PDF, Requirements Transferring License, Driver License, and Driver License Renewal.
- South Dakota: Required Documents, Renew or Replace Online, Appointment Information, Applications and Forms, and SD DPS landing page.
- Vermont: REAL ID, Enhanced Driver License / ID, New License, Renew License, Transfer, and Change Address official DMV pages.
- West Virginia: REAL ID, Driver Licenses / ID Cards, Online Renewal, Skip the Trip, and REAL ID brochure PDF.
- Wyoming: Driver License, Lost / Renewal, Add / Change Information, Notice of Change of Address PDF, Driver Services, and REAL ID compliance notice.

Content findings added:

- Alaska now emphasizes lawful-status proof, SSN or SSA ineligibility, two Alaska residency documents, certified name-change documents, and the 30-day name/address notice rule.
- Idaho now uses the state-specific Star Card naming and highlights that an out-of-state REAL ID license cannot by itself prove identity, plus the one-year / physical-address / different-source residency rules.
- Mississippi now emphasizes the 60-month expired-license renewal rule, original identity and full-SSN documents, two residency proofs, and no P.O. boxes / junk mail / envelopes / handwritten documents.
- Montana now emphasizes two Montana residency documents, P.O. Box restrictions, online renewal eligibility, address-record updates vs reissued card, and state-official-source priority over third-party MVD Express pages.
- Nebraska now emphasizes one-time citizenship/lawful-status verification, two Nebraska principal address documents, SSN verification or exemption, and the 30-day new-resident license timing.
- North Dakota now uses the official four-category REAL ID structure: identification/legal presence, name change, full SSN proof, and two physical residence documents.
- South Dakota now separates Section 1/2/3 required-document paths and adds the distinctive full-time traveler / personal mailbox requirements.
- Vermont now distinguishes REAL ID from Enhanced Driver License / ID and flags the 60-day new-resident transfer timing.
- West Virginia now emphasizes that online renewal cannot upgrade a Not for Federal Use license to REAL ID / For Federal Use, while REAL ID HeadStart can reduce office time.
- Wyoming now emphasizes the state's broad REAL ID compliance, two Wyoming residency documents no more than 45 days old, the once-every-10-years in-person renewal rule, and oneWYO address-update limits.

Access notes:

- Alaska, Mississippi, Nebraska, North Dakota, South Dakota, West Virginia, and Wyoming official pages returned `200` in direct checks during source review.
- Idaho ITD / DMV pages timed out in automated checks; Idaho has an `accessStatus` warning and USA.gov fallback.
- Montana MVD pages returned `403` in automated checks; Montana has an `accessStatus` warning and USA.gov fallback.
- Vermont DMV pages returned `403` in automated checks; Vermont has an `accessStatus` warning and USA.gov fallback.

Status:

- Content audit after expansion checked 50 states and 10 topics: 0 errors.
- Build generated 120 static pages after the expansion.
- Final link audit for this round checked 250 URLs: 153 OK, 97 watch, 0 fail.
- Static DOM QA checked homepage, state list, Alaska/Idaho/Mississippi/Montana/Nebraska/North Dakota/South Dakota/Vermont/West Virginia/Wyoming overview pages, and all ten matching REAL ID pages: generated HTML present, expected route/decision card counts present, review dates present, official-link counts present, Idaho/Montana/Vermont access panels present, 50-state wording visible, and no stale 40-state count found.

## Round 20 Changes

Date: 2026-07-09

### Launch Polish and SEO Signal Pass

Scope:

- Replaced public-facing internal project labels such as "candidate" / "MVP" style status language with reader-facing status labels.
- Updated homepage, state list, topic list, state detail pages, REAL ID pages, and the quality page to use clearer Chinese section labels instead of template-like English eyebrows.
- Added a shared `getStatePublicStatus` helper so state status copy is consistent across pages.
- Added optional JSON-LD and modified-time support to the base layout.
- Added Article + BreadcrumbList schema to all 50 state overview pages.
- Added Article + BreadcrumbList schema to all 50 state REAL ID pages.
- Added Article + FAQPage + BreadcrumbList schema to all 10 topic detail pages.
- Added `npm run audit:seo` to check built HTML for titles, descriptions, canonicals, JSON-LD, modified time, sitemap output, stale state counts, and internal wording.
- Expanded short meta descriptions on Contact, Privacy, Terms, Quality, and 404 pages.
- Updated `README.md` with the SEO audit step.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 120 static pages.
- SEO audit checked 120 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Official link audit checked 250 URLs: 152 OK, 98 watch, 0 fail.
- Static DOM QA checked homepage, state list, California/Massachusetts/Wyoming overview pages, matching REAL ID pages, and a topic FAQ page: 50-state wording present, no stale front-end project wording found, 50 state rows present, route/decision cards present, Article schema present on state pages, FAQPage schema present on topic pages, and article modified time present.

## Round 21 Changes

Date: 2026-07-09

### Public Quality Ledger and Launch Gate

Scope:

- Expanded `/quality/` from a principles page into a public maintenance ledger showing 50-state coverage, 110 core content pages, official URL count, reviewed state/topic counts, and states that need ordinary-browser checks because government sites block automation.
- Expanded `/sources/` from a flat source list into a source directory with federal, state, official agency, official action-link, and topic source metadata.
- Added `npm run audit:launch` to check real `PUBLIC_SITE_URL`, non-placeholder contact email, built homepage canonical URL, robots.txt, sitemap output, and ad/privacy configuration warnings.
- Updated `README.md` with launch configuration audit commands.
- Kept the visual treatment aligned with the existing ledger / registry system: bordered rows, status chips, compact summaries, and no new marketing-style sections.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 120 static pages.
- SEO audit checked 120 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static DOM QA checked `/quality/` and `/sources/`: coverage counts, browser-check explanation, source directory heading, source count chip, federal metadata, and state action-link metadata present.
- Stale front-end template wording check found no matches in `src` or `dist`.
- Launch configuration audit intentionally failed until production configuration is supplied: missing `PUBLIC_SITE_URL`, placeholder `SITE.contactEmail`, built example-domain canonical URL, built example-domain robots sitemap URL. It also warned that AdSense / analytics privacy copy must be updated when those integrations are configured.

## Round 22 Changes

Date: 2026-07-09

### Entry Directory Pages

Scope:

- Added `/directories/` as a public "入口表" hub.
- Added `/directories/real-id/` as a 50-state REAL ID / Star Card / Travel ID official-entry table with search and status filters.
- Added `/directories/dmv-services/` as a 50-state DMV service-entry table with search and status filters for agency, REAL ID, renewal, address, appointment, online services, and other official action links.
- Added the "入口表" link to the main navigation and footer.
- Added a homepage "入口查表" section linking to the REAL ID table, DMV service table, official source library, and maintenance ledger.
- Added CollectionPage / ItemList schema to the directory pages.
- Updated README scope to include the three directory pages.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 123 static pages.
- SEO audit checked 123 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static DOM QA verified homepage directory links, updated 113-page homepage count, directory hub cards, CollectionPage schema, REAL ID table 50 rows / 50 state badges / filters / ItemList schema, and DMV services table 50 rows / 50 state badges / 50 service-link grids / filters / ItemList schema.
- Stale front-end template wording check found no matches in `src` or `dist`.
- Local dev server returned 200 for `/directories/`, `/directories/real-id/`, and `/directories/dmv-services/`.
- Official link audit was not rerun because this round introduced no new external URLs; the directory pages reuse existing `states` action links.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, placeholder `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL.

## Round 23 Changes

Date: 2026-07-09

### State Page FAQ and Comparison Depth

Scope:

- Added a "三类入口怎么分" comparison table to all 50 state overview pages.
- Added a generated FAQ section to all 50 state overview pages.
- Added FAQPage schema to all 50 state overview pages.
- Added a "REAL ID、标准证件和护照怎么选" comparison table to all 50 state REAL ID pages.
- Added a generated FAQ section to all 50 state REAL ID pages.
- Added FAQPage schema to all 50 state REAL ID pages.
- Added shared comparison-table styling that follows the existing ledger / panel design and collapses cleanly on mobile.
- Strengthened `npm run audit:seo` so state content pages fail if they lose FAQPage schema or comparison tables.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 123 static pages.
- SEO audit checked 123 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- State FAQ / comparison static QA checked all 50 overview pages and all 50 REAL ID pages: 402 checks, 0 failures.
- Local dev server returned 200 for `/states/california/`, `/states/massachusetts/real-id/`, and `/directories/real-id/`.
- Stale front-end template wording check found no matches in `src` or `dist`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, placeholder `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL.

## Round 24 Changes

Date: 2026-07-09

### Contact Placeholder Cleanup

Scope:

- Removed the public placeholder contact email string from `SITE.contactEmail`.
- Updated the Contact page to render a real `mailto:` link only when a valid contact email is configured.
- Replaced visible prelaunch placeholder copy with neutral maintenance copy that does not expose fake/internal values.
- Updated the launch audit contact-email parsing so an empty email is detected and reported as `SITE.contactEmail is not configured.`
- Reworded public state notes that said "公开上线前" into reader-facing "使用前/办理前" language.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 123 static pages.
- SEO audit checked 123 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Contact static QA verified the built contact page title is localized, maintenance copy is present, no placeholder contact email is exposed, no stale prelaunch wording remains, and no `mailto:` link is rendered while the email is unconfigured.
- Stale placeholder wording check found no matches in `src` or `dist` for `上线前替换`, `真实邮箱`, `公开上线前`, `上线前待配置`, `State Guides`, `Sources & Updates`, `Route Board`, or `Quick Read`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that AdSense / analytics privacy copy must be updated when those integrations are configured.

## Round 25 Changes

Date: 2026-07-09

### Public Compliance Wording Cleanup

Scope:

- Rewrote the Privacy page to remove public `MVP` / prelaunch replacement language.
- Clarified that the site currently does not provide account, comment, or upload features, and that ads / analytics are not enabled until explicitly configured.
- Updated the Contact page fallback copy so it no longer mentions placeholder handling.
- Reworded the New Hampshire source-review note from launch-language to reader-facing browser-check language.
- Localized About, Privacy, Terms, and footer labels from English utility labels to Chinese public labels.
- Updated the launch configuration audit warning to match the new privacy wording when AdSense / analytics are not enabled.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 123 static pages.
- SEO audit checked 123 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Public wording scan found no matches in `src` or `dist` for `MVP`, `上线前`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, or `ipsum`.
- Static compliance-page QA verified `/about/`, `/contact/`, `/privacy/`, and `/terms/` have localized titles, Chinese footer links, and no internal project wording.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 26 Changes

Date: 2026-07-09

### New Resident Directory and Ledger-Style Polish

Source scan:

- USA.gov state motor vehicle services confirms the federal public directory pattern for state DMV / motor vehicle services: `https://www.usa.gov/state-motor-vehicle-services`.
- California DMV has a New California Resident portal: `https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/`.
- NY DMV has moving / out-of-state exchange pages that state the 30-day new-resident exchange path: `https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state` and `https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license`.
- Florida FLHSMV has a New Resident page covering the 30-day driver-license path and 10-day vehicle title/registration path: `https://www.flhsmv.gov/new-resident/`.
- Texas DPS / TxDMV official pages confirm the 90-day new-resident driver-license path: `https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids` and `https://www.txdmv.gov/motorists/new-to-texas`.
- NJ MVC has a Moving To New Jersey page covering out-of-state license and vehicle title/registration transfer: `https://www.nj.gov/mvc/drivertopics/movetonj.htm`.
- Mass.gov has New to Massachusetts and out-of-state license transfer pages: `https://www.mass.gov/new-to-massachusetts` and `https://www.mass.gov/how-to/transfer-your-real-or-standard-out-of-state-drivers-or-motorcycle-license-to-massachusetts`.
- Washington DOL has a Moving to Washington driver-license page: `https://dol.wa.gov/moving-washington/get-driver-license`.

Scope:

- Added `/directories/new-residents/` as a 50-state "搬到新州后 DMV 办事入口表".
- The new directory maps each state to a reader-facing moving cue, first-step note, official new-resident / transfer / address / driver-license links, and a Chinese state overview link.
- Rows are generated from the existing `states` official-source data rather than hand-coded page copy; states without a dedicated transfer link fall back to the strongest DMV / driver-license official entries.
- Added search and status filters to the new directory.
- Added CollectionPage + ItemList schema to the new directory.
- Added the new directory to the directory hub and homepage "入口查表" section.
- Updated homepage count from 113/123-era directory assumptions to the current 114 content-resource count.
- Adjusted the homepage hero wording and task grid CSS toward a tighter ledger/tool style: shorter headline, shorter supporting copy, auto-fit task lanes, and auto-fit directory cards.
- Updated README scope to include four directory pages.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 124 static pages.
- SEO audit checked 124 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static directory QA verified `/directories/new-residents/` title, 50 real data rows, CollectionPage schema, ItemList schema, homepage link, directory hub link, and no internal project wording.
- Browser QA loaded `http://127.0.0.1:4321/directories/new-residents/`: title, H1, 50 rows, search placeholder, status options, CollectionPage / ItemList schema, no internal wording, and no console errors.
- Browser filter QA verified searching `Texas` reduces the directory to one visible TX row; after reload, the filter value is empty and all 50 rows are visible.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 27 Changes

Date: 2026-07-09

### DMV Deadline Table and High-Traffic State Deadline Pass

Source scan:

- California DMV official pages confirm address-change timing and processing reminders: `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/changing-replacing-and-renewing-your-drivers-license/` and `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/`.
- NY DMV official address page confirms the 10-day address-change rule: `https://dmv.ny.gov/records/change-your-address`.
- Texas DPS official change-information page confirms the 30-day driver license / ID address-change rule: `https://www.dps.texas.gov/section/driver-license/how-change-information-your-driver-license-or-id-card`.
- Florida FLHSMV official pages confirm 30-day name/address update and new-resident timing paths: `https://www.flhsmv.gov/name-and-address-changes/` and `https://www.flhsmv.gov/new-resident/`.
- NJ MVC official pages confirm the 60-day new-resident transfer path and 7-day address-change reminder: `https://www.nj.gov/mvc/drivertopics/movetonj.htm` and `https://www.nj.gov/mvc/about/email.htm`.
- Mass.gov confirms the 30-day RMV address-change rule: `https://www.mass.gov/how-to/change-your-address-with-the-rmv`.
- Washington DOL confirms the 10-day driver license / ID address-change rule: `https://dol.wa.gov/driver-licenses-and-permits/update-driver-license-information/change-your-name-or-address-your-driver-license`.

Scope:

- Added `/directories/deadlines/` as a 50-state "DMV 期限提醒表".
- The new directory automatically extracts deadline-like reminders from state data, categorizes them as moving/address, renewal/expiration, processing/mailing, material freshness, or general deadline reminders, and falls back to a clear official-check prompt when no fixed deadline is extracted.
- Added search and status filters to the deadline directory.
- Added CollectionPage + ItemList schema to the deadline directory.
- Added the deadline directory to the directory hub and homepage "入口查表" section.
- Updated homepage resource count to 115 and build page count to 125.
- Updated README scope to include five directory pages.
- Enriched high-traffic state data with official deadline reminders:
  - California: 10-day DMV address notification plus 3-day address-change processing reminder.
  - Texas: 30-day driver license / ID address update.
  - Florida: 30-day driver license timing for new residents and name/address updates.
  - Washington: 10-day driver license / ID address update.
  - New Jersey: 60-day new-resident transfer path and 7-day address-change reminder.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 125 static pages.
- SEO audit checked 125 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static deadline directory QA verified `/directories/deadlines/` title, 50 real data rows, CollectionPage schema, ItemList schema, homepage link, directory hub link, homepage 115-resource count, California 10-day reminder, Texas 30-day reminder, New Jersey 7-day reminder, and no internal project wording.
- Public wording scan found no matches in `dist` for `MVP`, `上线前`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, or `ipsum`.
- Browser QA loaded `http://127.0.0.1:4321/directories/deadlines/`: title, H1, 50 rows, search placeholder, CollectionPage / ItemList schema, California / Texas / New Jersey deadline reminders, no internal wording, and no console errors.
- Browser filter QA verified searching `10 天` reduces the directory to three visible rows: CA, NY, and WA.
- Local dev server returned 200 for `/directories/deadlines/`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 28 Changes

Date: 2026-07-09

### DMV Material Rules Table and Proof-Document Pass

Source scan:

- California DMV REAL ID checklist confirms identity-document examples and California residency document path: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/`.
- Texas DPS residency requirement confirms two printed Texas residency documents with name and residential address: `https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards`.
- Florida FLHSMV What to Bring and U.S. Citizen material pages confirm original identity / SSN / residential-address document paths and two Florida residential-address documents: `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/` and `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/`.
- Washington DOL enhanced-driver-license guide and checklist confirm citizenship, identity, residency, SSN, and no-PO-Box residency requirements for EDL/EID paths: `https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/guide-enhanced-driver-licenses-edl`.
- Mass.gov identification requirements confirm originals, name matching, SSN, residency, and REAL ID document distinctions: `https://www.mass.gov/info-details/massachusetts-identification-id-requirements`.
- NJ MVC 6 Points of ID confirms 2 proofs of address, SSN / ITIN / affidavit, 6 Points of ID, paper/hard-copy ID requirements, and certified translation: `https://www.nj.gov/mvc/license/6pointid.htm`.
- Wyoming DOT, Rhode Island DMV, and Mississippi DSB official pages confirm high-value material pitfalls: 45-day Wyoming residency documents, Rhode Island 60-day / P.O. Box constraints, and Mississippi no-photocopy / full-SSN / P.O. Box restrictions.

Scope:

- Added `/directories/document-rules/` as a 50-state "DMV 材料规则表".
- The new directory automatically extracts material-like reminders from state data, categorizes them as address proof, SSN, name chain, original/certified copy, non-citizen materials, checklist entry, or general material rule, and falls back to an official-check prompt when no clear material rule is extracted.
- Added search and status filters to the material-rules directory.
- Added CollectionPage + ItemList schema to the material-rules directory.
- Added the material-rules directory to the directory hub and homepage "入口查表" section.
- Updated homepage content-resource count to 116 and build page count to 126.
- Updated README scope to include six directory pages.
- Enriched high-traffic state data with official material reminders:
  - California: REAL ID checklist link and two California residency document reminder.
  - Texas: Texas residency requirement link and two printed residency-document reminder.
  - Florida: U.S. Citizen material link and two residential-address document / 60-day document-date reminder.
  - Washington: EDL guide link and two WA residency documents / no PO Box reminder.
  - Massachusetts: REAL ID lawful presence, full SSN, two Massachusetts residency, and name-match reminder.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 126 static pages.
- SEO audit checked 126 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static material-rules directory QA verified `/directories/document-rules/` has 50 real data rows, CollectionPage schema, ItemList schema, homepage link, directory hub link, homepage 116-content-resource count, P.O. Box / SSN / certified text, and search placeholder.
- Public wording scan found no matches in `dist` for `MVP`, `上线前`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, or `ipsum`.
- Browser QA loaded `http://127.0.0.1:4321/directories/document-rules/`: title, H1, 50 rows, search placeholder, CollectionPage schema, Texas residency reminder, P.O. Box / SSN text, and no console errors.
- Browser filter QA verified searching `P.O. Box` reduces the directory to 9 visible related rows and keeps the empty state hidden.
- Local dev server returned 200 for `/directories/document-rules/`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 29 Changes

Date: 2026-07-09

### Material Rule Depth Pass and Quick Filters

Source scan:

- NY DMV Enhanced or REAL ID page and Document Guide confirm full legal name, pre-screening, and document-preparation paths: `https://dmv.ny.gov/driver-license/enhanced-or-real-id` and `https://dmv.ny.gov/more-info/dmv-document-guide`.
- NY DMV ID-44 PDF confirms REAL ID / Enhanced residency proof count, P.O. Box limits, SSN ineligibility letter timing, certified translation, and name-chain expectations: `https://dmv.ny.gov/forms/id44.pdf`.
- Indiana BMV REAL ID overview and Documentation Checklist confirm TWO printed Indiana residency documents, full SSN proof, original/certified document expectations, and P.O. Box limits: `https://www.in.gov/bmv/licenses-permits-ids/real-id-overview/` and `https://www.in.gov/bmv/files/BMV_Documentation_List.pdf`.
- Indiana BMV New Indiana Residents page confirms transfer/new-resident document path and 60-day timing examples for some address documents: `https://www.in.gov/bmv/licenses-permits-ids/new-indiana-residents`.
- Wisconsin DMV documentation and residency pages confirm REAL ID two-residency-proof requirement, current Wisconsin address expectations, printout acceptance for some electronic documents, and proof needed for each name change: `https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/documentation.aspx` and `https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/residency.aspx`.
- Michigan SOS first-time license / ID and document-requirements FAQ confirm legal presence, SSN, identity, Michigan residency, name change, English translation, and original/certified document expectations: `https://www.michigan.gov/sos/all-services/first-time-license-or-id` and `https://www.michigan.gov/sos/faqs/license-and-id/license-and-id-document-requirements`.

Scope:

- Enriched New York data with ID-44 material PDF, Document Guide, two-residency-proof reminder, P.O. Box exclusion, same-source caution, SSA 30-day ineligibility-letter reminder, and certified translation note.
- Enriched Indiana data with official Documentation Checklist PDF, New Indiana Residents link, TWO printed residency documents, P.O. Box exclusion, full-SSN, and 60-day address-document reminder.
- Enriched Wisconsin data with driver-license documentation and proof-of-residency links, REAL ID two-residency-proof reminder, current-address requirement, printout acceptance, and proof-for-each-name-change reminder.
- Enriched Michigan data with first-time license / ID and document-requirements FAQ links, original/certified document rule, no photocopy/fax reminder, and English-translation reminder.
- Added quick-filter buttons to `/directories/document-rules/` for P.O. Box, SSN, two address proofs, certified documents, name chain, 60-day timing, and non-citizen material categories.
- Kept the page in the existing ledger/tool style: compact border grid, direct actions, and no new long-form prose.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 126 static pages.
- SEO audit checked 126 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static material-rules QA verified quick-filter markup and the newly linked NY, Indiana, Wisconsin, and Michigan official material sources in `dist/directories/document-rules/index.html`.
- Public wording scan found no matches in `dist` for `MVP`, `上线前`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, or `ipsum`.
- Browser QA loaded `http://127.0.0.1:4321/directories/document-rules/`: title, H1, 50 rows, 7 quick filters, NY ID-44, Indiana PDF, Wisconsin residency page, Michigan document-requirements page, and no console errors.
- Browser quick-filter QA verified clicking `P.O. Box` reduces the directory to 11 visible rows and clicking `certified` reduces it to 10 visible rows.
- Mobile browser QA at 390px width verified the quick filters, search filter, and directory rows collapse to one column with no horizontal overflow detected.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 30 Changes

Date: 2026-07-09

### DMV Online/In-Person Path Splitter

Source scan:

- California DMV homepage and appointment pages confirm that many DMV tasks can start or finish online, and that some routine renewal / record / replacement services should not be handled as counter-service visits: `https://www.dmv.ca.gov/portal/` and `https://www.dmv.ca.gov/portal/appointments/`.
- Texas DPS / Texas.gov pages confirm the driver-services entry path, renewal / replacement path, online-eligibility checks, and the age 79+ in-person renewal reminder: `https://www.dps.texas.gov/section/driver-license`, `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/`, and `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/`.
- NY DMV official pages confirm online renewal when keeping the same document type, and office / document-guide paths for REAL ID / Enhanced upgrades: `https://dmv.ny.gov/driver-license/renew-a-driver-license` and `https://dmv.ny.gov/driver-license/enhanced-or-real-id`.
- NJ MVC pages confirm online renewal paths, REAL ID Licensing Center appointment flow, and AppointmentWizard service-type distinctions: `https://www.nj.gov/mvc/license/licrenew.htm`, `https://www.nj.gov/mvc/realid/`, and `https://telegov.njportal.com/njmvc/AppointmentWizard`.
- Mass.gov pages confirm REAL ID / Standard renewal paths, Online Service Center renew-or-replace wording, and RMV material / service-center distinctions: `https://www.mass.gov/info-details/real-id-in-massachusetts`, `https://www.mass.gov/how-to/renew-your-real-or-standard-passenger-class-d-or-motorcycle-class-m-drivers-license`, and `https://www.mass.gov/info-details/massachusetts-identification-id-requirements`.
- Virginia, Florida, and Michigan official pages were checked as additional path-shape examples for online start, service-center verification, location lookup, and first-time license / ID flows: `https://www.dmv.virginia.gov/licenses-ids/real-id`, `https://www.flhsmv.gov/locations/`, and `https://www.michigan.gov/sos/all-services/first-time-license-or-id`.

Scope:

- Added `/directories/service-paths/` as a 50-state "DMV 线上/现场分流表".
- The new directory extracts service-path cues from appointment notes, recommended steps, editor notes, summaries, and common mistakes, then groups them into online-first, in-person verification, appointment, address-first, REAL ID / first-time, renewal / replacement, and mailing/card reminders.
- Added quick-filter buttons for `先线上查`, `必须现场`, `预约`, `地址先改`, `续期`, `补证`, and `REAL ID`.
- Added CollectionPage + nested ItemList schema to the service-path directory.
- Added the service-path directory to the directory hub and homepage "入口查表" section.
- Updated homepage content-resource count to 117, README scope to seven directory pages, and build page count to 127.
- Added source-backed path notes for California, Texas, New York, New Jersey, and Massachusetts.
- Refined the directory-note ranking so official path instructions and high-value official phrases such as `most DMV business`, `online eligibility`, `Online Service Center`, `counter service`, `Document Guide`, and `AppointmentWizard` surface before generic mistakes.
- Enforced a four-note maximum per state row to keep the directory readable on desktop and mobile.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 127 static pages.
- SEO audit checked 127 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static service-path QA verified 50 real data rows, four notes per row, CollectionPage schema, nested ItemList schema, 7 quick filters, homepage link, directory hub link, homepage 117-content-resource count, California official-start note, Texas online-eligibility note, and Massachusetts Online Service Center note.
- Public wording scan found no matches in `dist` for `MVP`, `上线前`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, or `ipsum`.
- Browser QA loaded `http://127.0.0.1:4321/directories/service-paths/`: title, H1, 50 rows, 7 quick filters, CollectionPage / ItemList schema, California / Texas / Massachusetts high-value path notes, and no console errors.
- Browser quick-filter QA verified clicking `线上` reduces the directory to 35 visible rows and clicking `预约` reduces it to 35 visible rows.
- Mobile browser QA at 390px width verified 50 rows, 7 quick filters, four notes in the first row, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 31 Changes

Date: 2026-07-09

### DMV Cost, Payment, and Card Timing Table

Source scan:

- California DMV official pages confirm driver license / ID fees, payment options, card status, and estimated DL/ID processing windows: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/` and `https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/`.
- NY DMV official pages confirm replacement / amend / Enhanced fees, MCTD fee, office / mail / online payment methods, and replacement mailing-address rules: `https://dmv.ny.gov/driver-license/fees-refunds` and `https://dmv.ny.gov/driver-license/replace-a-license-or-permit`.
- Texas.gov and Texas DPS official pages confirm fee-table routing, online eligibility, temporary permit validity, mailing-status checks, and card-mail timing examples: `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/`, `https://www.dps.texas.gov/section/driver-license/driver-license-fees`, `https://www.dps.texas.gov/section/driver-license/faq/section-3-issuing-temporary-permit`, and `https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card`.
- FLHSMV official pages confirm online renewal / replacement eligibility, MyDMV Portal 2-3 week credential mailing, $2 online processing fee, and office-only cases: `https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/` and `https://www.flhsmv.gov/driver-licenses-id-cards/fees/`.
- NJ MVC official pages confirm same-day online renewal, 2-4 week mailed credential window, $24 standard agency renewal fee, accepted payment types, and no in-person license / ID printing after the 2020 security change: `https://www.nj.gov/mvc/license/licrenew.htm` and `https://www.nj.gov/mvc/license/liclost.htm`.
- Mass.gov official pages confirm RMV fee-table entries and Online Service Center / replacement paths: `https://www.mass.gov/info-details/massachusetts-registry-of-motor-vehicles-fees`, `https://www.mass.gov/info-details/real-id-in-massachusetts`, and `https://www.mass.gov/how-to/replace-your-massachusetts-id-card`.
- Washington DOL and Michigan SOS official pages confirm renewal fee logic, late-fee / office-visit triggers, temporary license / credential handling, duplicate fees, payment methods, and mail-status checks: `https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license`, `https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18`, `https://www.michigan.gov/sos/all-services/license-id-or-permit-replacement`, and `https://www.michigan.gov/sos/faqs/license-and-id/licenses-and-id`.

Scope:

- Added `/directories/costs-timing/` as a 50-state "DMV 费用和拿证时间表".
- The new directory extracts cost, payment, temporary credential, mailing/card, and processing-time cues from state data.
- Added quick-filter buttons for `费用`, `付款`, `邮寄`, `临时凭证`, `处理时间`, `收据`, and `状态查询`.
- Added CollectionPage + nested ItemList schema to the cost/timing directory.
- Added the cost/timing directory to the directory hub and homepage "入口查表" section.
- Updated homepage content-resource count to 118, README scope to eight directory pages, and build page count to 128.
- Enriched California, New York, Texas, Florida, New Jersey, Massachusetts, Washington, and Michigan data with source-backed fee, payment, temporary credential, mailing, and status-check reminders.
- Kept each state row to a maximum of four notes and preserved official links rather than copying full fee schedules into the site.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 128 static pages.
- SEO audit checked 128 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static cost/timing QA verified 50 real data rows, one to four notes per row, CollectionPage schema, nested ItemList schema, 7 quick filters, homepage link, directory hub link, homepage 118-content-resource count, California fee/processing notes, Florida $2 / 2-3 week note, New Jersey $24 / 2-4 week note, and Michigan duplicate-fee / temporary-credential note.
- Public wording scan found no matches in `dist` or `src` for `MVP`, `上线前`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/directories/costs-timing/`: title, H1, 50 rows, 7 quick filters, CollectionPage / ItemList schema, California / Florida / New Jersey / Michigan high-value notes, and no console errors.
- Browser quick-filter QA verified clicking `邮寄` reduces the directory to 34 visible rows and clicking `费用` reduces it to 16 visible rows.
- Mobile browser QA at 390px width verified 50 rows, 7 quick filters, four notes in the first row, no console errors, and no horizontal overflow.
- Local dev server returned 200 for `/directories/costs-timing/`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 32 Changes

Date: 2026-07-09

### DMV SSN and Identity-Status Splitter

Source scan:

- California DMV official AB 60 page confirms the separate driver-license path for applicants who cannot provide proof of legal presence, and that AB 60 is not a REAL ID path: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/`.
- Texas DPS official temporary-visitors page confirms lawful-presence review and `Limited Term` driver license / ID handling for qualifying temporary visitors: `https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors`.
- FLHSMV official Non-Immigrant materials page confirms non-immigrant document branch, legal-status verification, and the 60-day temporary paper permit / credential-mailing note: `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/`.
- NJ MVC official 6 Points page and no-SSN/ITIN affidavit form confirm Standard license / ID number-proof alternatives, while REAL ID still follows the full-SSN-proof material structure: `https://www.nj.gov/mvc/license/6pointid.htm` and `https://www.nj.gov/mvc/pdf/license/affidavit.pdf`.
- NY DMV official ID-44 and no-SSN / ineligibility pages confirm SSA ineligibility letter and Standard-vs-REAL-ID differences: `https://dmv.ny.gov/forms/id44.pdf` and `https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility`.
- Washington DOL official identity-documents and EDL pages confirm standard identity / SSN handling and separate EDL/EID U.S.-citizenship expectations: `https://dol.wa.gov/driver-licenses-and-permits/documents-proof-identity` and `https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl`.

Scope:

- Added `/directories/identity-ssn/` as a 50-state "DMV SSN 和身份类别分流表".
- The new directory extracts SSN, no-SSN, SSA ineligibility, ITIN, affidavit, lawful-presence, non-citizen, non-immigrant, temporary-visitor, immigration-document, EDL/EID, and AB 60 cues from state data.
- Added quick-filter buttons for `SSN`, `无 SSN`, `SSA letter`, `ITIN`, `lawful presence`, `非公民`, and `I-94 / visa`.
- Added CollectionPage + nested ItemList schema to the identity/SSN directory.
- Added the new directory to the directory hub and homepage "入口查表" section.
- Updated homepage content-resource count to 119, README scope to nine directory pages, and build page count to 129.
- Enriched California, New York, Texas, Florida, Washington, and New Jersey data with source-backed identity / SSN / non-citizen branches and direct official links.
- Tightened the `SSA` text matcher after browser QA found that broad substring matching could confuse `Massachusetts` with SSA. The page now treats `SSA` as an independent term and uses `ineligibility` for the quick filter.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 129 static pages.
- SEO audit checked 129 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static identity/SSN QA verified 50 real data rows, CollectionPage schema, nested ItemList schema, 7 quick filters, homepage link, directory hub link, homepage 119-content-resource count, California AB 60 cue, Texas Limited Term cue, Florida Non-Immigrant / 60-day cue, and New Jersey ITIN / affidavit / 6 Points cue.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/directories/identity-ssn/`: title, H1, 50 rows, 7 quick filters, CollectionPage / ItemList schema, California AB 60, Texas Limited Term, Florida Non-Immigrant, New Jersey ITIN / affidavit, and no console errors.
- Browser quick-filter QA verified clicking `SSA letter` reduces the directory to 5 visible rows and searching `AB 60` reduces it to California only.
- Mobile browser QA at 375px width verified 50 rows, 7 quick filters, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 33 Changes

Date: 2026-07-10

### DMV Appointment and Office Type Table

Source scan:

- California DMV appointments and locations pages confirm service-selection before visiting, appointment entry points, and that many DMV tasks can start or finish online: `https://www.dmv.ca.gov/portal/appointments/` and `https://www.dmv.ca.gov/portal/locations/`.
- NY DMV Enhanced / REAL ID and office-locations pages confirm the DMV-office visit path, county reservation instructions, and View Details service checks: `https://dmv.ny.gov/driver-license/enhanced-or-real-id` and `https://dmv.ny.gov/contact-us/office-locations`.
- NJ MVC Appointment Wizard confirms the REAL ID appointment flow by appointment type, location, date/time, and applicant information: `https://telegov.njportal.com/njmvc/AppointmentWizard`.
- PennDOT REAL ID and location pages confirm Same-Day REAL ID Centers, Driver License Center alternatives, and 15-business-day mailing when applying outside a Same-Day REAL ID Center: `https://www.pa.gov/agencies/dmv/driver-services/real-id`, `https://www.pa.gov/agencies/dmv/find-a-location/real-id-center-locations`, and `https://www.pa.gov/agencies/dmv/find-a-location`.
- FLHSMV locations page confirms many offices require appointments and that Tax Collector Offices / License Plate Agents can have their own appointment rules: `https://www.flhsmv.gov/locations/`.
- Washington DOL renewal and appointments / locations materials confirm driver licensing office routing and that appointments can be preferred while some walk-in service remains possible: `https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license` and `https://dol.wa.gov/appointments-and-locations`.
- Georgia DDS customer service center pages confirm location-specific services and the need to verify each center's hours and services: `https://dds.georgia.gov/locations/customer-service-center` and `https://dds.georgia.gov/find-location/customer-service-center`.
- NCDMV official appointment and office-location pages confirm driver license office appointments, seven-day release timing, and that license plate agencies are not driver license offices: `https://www.ncdot.gov/dmv/license-id/driver-license-appointments/Pages/default.aspx` and `https://www.ncdot.gov/dmv/offices-services/locate-dmv-office/Pages/dmv-offices.aspx`.

Scope:

- Added `/directories/appointments/` as a 50-state "DMV 预约和办公室入口表".
- The new directory extracts appointment, reservation, scheduler, office, branch, service center, driver license office, customer service center, county / tax collector, walk-in, same-day REAL ID, location, and online-first cues from state data.
- Added quick-filter buttons for `预约`, `REAL ID Center`, `walk-in`, `driver office`, `县 / 承办点`, `先线上查`, and `当天/邮寄`.
- Added CollectionPage + nested ItemList schema to the appointment / office directory.
- Added the new directory to the directory hub and homepage "入口查表" section.
- Updated homepage content-resource count to 120, README scope to ten directory pages, and build page count to 130.
- Enriched California, Pennsylvania, and North Carolina data with source-backed official location links.
- Kept the page in the existing compact ledger style, with four-note maximum per state row and direct official links instead of long explanatory prose.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 130 static pages.
- SEO audit checked 130 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static appointment QA verified 50 real data rows, CollectionPage schema, nested ItemList schema, 7 quick filters, homepage link, directory hub link, homepage 120-content-resource count, California locations cue, NY office reservation cue, PA same-day REAL ID cue, Florida appointment cue, and North Carolina driver-office cue.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/directories/appointments/`: title, H1, 50 rows, 7 quick filters, California online/location notes, PA Same-Day REAL ID notes, and no console errors.
- Browser quick-filter QA verified clicking `REAL ID Center` reduces the directory to Pennsylvania only and searching `Florida` reduces it to Florida only.
- Mobile browser QA at 375px width verified 50 rows, 7 quick filters, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 34 Changes

Date: 2026-07-10

### DMV Knowledge Test, Road Test, and Learner Permit Table

Source scan:

- California DMV instruction permit, knowledge test, sample test, and driving test pages confirm the permit / knowledge / drive-test route and online preparation entries: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/`, `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/`, and `https://www.dmv.ca.gov/portal/handbook/driving-test-criteria/dmv-driving-test/`.
- NY DMV permit-test, learner-permit, road-test, and road-test-location pages confirm the permit test / road test path and online-permit-result review timing: `https://dmv.ny.gov/driver-license/get-learner-permit`, `https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test`, `https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test`, and `https://dmv.ny.gov/contact-us/road-test-locations`.
- Texas DPS pages confirm the written knowledge and practical driving-skills path, DPS driving-test appointments, and third-party skills testing program: `https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license`, `https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment`, `https://www.dps.texas.gov/section/driver-license/third-party-skills-testing-program`, and `https://www.dps.texas.gov/section/driver-license/choosing-driver-education-course`.
- FLHSMV Class E exam and driver-license-exam pages confirm the Class E knowledge / skills-test structure; Florida exam-language policy should be checked against the current Driver License Exams page before relying on older multilingual page copy: `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/`, `https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/`, and `https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/`.
- Washington DOL driver training / testing and learner permit pages confirm the 40-question / 32-correct knowledge test cue and driver-training-school / testing-location route: `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing`, `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test`, `https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit`, `https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/get-your-learner-permit`, and `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-training-schools-and-testing-locations`.
- NJ MVC first-license, knowledge-test, test-prep, and road-test pages confirm the GDL / first-license route and retest / road-test sequence: `https://www.nj.gov/mvc/license/firstlic.htm`, `https://www.nj.gov/mvc/license/testprep.htm`, `https://www.nj.gov/mvc/license/knowledgetest.htm`, and `https://www.nj.gov/mvc/license/roadtest.htm`.
- Mass.gov first-time-driver, Class D learner permit, and road-test pages confirm the learner-permit exam and Class D road-test route: `https://www.mass.gov/guides/first-time-driver-start-here`, `https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit`, `https://www.mass.gov/how-to/schedule-your-road-test`, and `https://www.mass.gov/registry-of-motor-vehicles-rmv-road-tests`.
- PennDOT learner-permit, driver-test scheduling, driver-license, and practice-question pages confirm the permit / test / scheduling path: `https://www.pa.gov/services/dmv/get-a-learners-permit`, `https://www.pa.gov/services/dmv/schedule-drivers-test`, `https://www.pa.gov/services/dmv/get-a-driver-license`, and `https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/test-your-knowledge`.
- Georgia DDS test, road-test, practice-test, and appointment pages confirm the Road Rules / Road Signs split, 15/20 passing cues, and road-test appointment path: `https://dds.georgia.gov/testing-and-training/test-and-exams-information`, `https://dds.georgia.gov/testing-and-training/road-test`, `https://dds.georgia.gov/testing-and-training/practice-test`, and `https://dds.georgia.gov/appointments`.
- NCDMV driver-license-test and learner-permit pages confirm written knowledge, traffic signs, vision, driving skills, and in-person license / learner permit material requirements: `https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx` and `https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/license-learner-permit.aspx`.
- Michigan SOS new-driver, driver-testing-business, and online-knowledge-test news pages confirm adult TIP, online / in-office knowledge-test options, 30 days of supervised driving before the skills test, and approved driver testing businesses: `https://www.michigan.gov/sos/license-id/new-drivers-18-older`, `https://www.michigan.gov/sos/license-id/new-drivers-under-18`, `https://www.michigan.gov/sos/industry-services/driver-testing-businesses-and-examiners`, and `https://www.michigan.gov/sos/resources/news/2025/07/02/michigan-secretary-of-state-now-offers-online-drivers-license-testing-for-adults`.

Scope:

- Added `/directories/tests-permits/` as a 50-state "DMV 笔试、路考和 learner permit 入口表".
- The new directory extracts learner / instruction permit, knowledge / written test, road / skills test, first license, GDL / teen driver, practice test / handbook, testing location, third-party testing, vision, signs, and appointment/material cues from state data.
- Added quick-filter buttons for `learner permit`, `笔试 / knowledge`, `路考 / road test`, `首次驾照`, `GDL / teen`, `practice test`, and `third-party`.
- Added CollectionPage + nested ItemList schema to the tests / permits directory.
- Added the new directory to the directory hub, homepage "入口查表" section, sitemap, and README scope.
- Updated homepage content-resource count to 121, README scope to eleven directory pages, and build page count to 131.
- Enriched North Carolina and Michigan data with source-backed learner permit, driver tests, TIP, online knowledge test, GDL, and driver-testing-business links.
- Tightened handbook/manual extraction after QA found a California address-change handbook note being pulled into the test directory; handbook/manual cues now need test, practice, study, or new-driver context.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 131 static pages.
- SEO audit checked 131 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static tests/permits QA verified 50 real data rows, 7 quick filters, CollectionPage schema, nested ItemList schema, homepage link/count, directory hub link, sitemap entry, California instruction/knowledge-test links, NY permit/road-test links, FLHSMV Class E links, Washington DOL test link, Georgia 15/20 road-test cue, NCDMV driver-test links, and Michigan TIP / driver-testing-business cue.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/directories/tests-permits/`: title, H1, 50 rows, 7 quick filters, California / North Carolina / Michigan high-value notes, no console errors, and no horizontal overflow.
- Browser quick-filter QA verified clicking `road test` reduces the directory to 6 visible rows and searching `Michigan` reduces it to Michigan only.
- Mobile browser QA at 375px effective width verified 50 visible rows, 7 quick filters, single-column row layout, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 35 Changes

Date: 2026-07-10

### DMV Language Access, Translation, and Interpreter Table

Source scan:

- California DMV Online Learning confirms eLearning for eligible renewal noncommercial Class C applicants, including English, Spanish, Traditional Chinese, and Mandarin audio; California DMV also states that English webpages are the official source when machine translation differs: `https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/`.
- NY DMV permit-test guidance confirms Class D permit tests are available in 20 languages including Chinese, and the DMV language-assistance page is now linked for language support context: `https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test` and `https://dmv.ny.gov/more-info/language-assistance`.
- Texas DPS Testing in Other Languages confirms driver license knowledge testing is limited to English or Spanish and notes CDL interpreter restrictions: `https://www.dps.texas.gov/section/driver-license/testing-other-languages`.
- FLHSMV pages have conflicting live language signals, so the Florida copy now frames exam language as a current-policy check rather than a simple yes/no: `https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/`, `https://www.flhsmv.gov/driver-licenses-id-cards/general-information/`, and `https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/`.
- Washington DOL confirms knowledge tests in 12 languages including Traditional Chinese and Chinese Simplified, plus driver guides in multiple languages: `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test`.
- NJ MVC confirms written tests in Chinese (Mandarin), interpreter scheduling for unavailable native-language tests, and CDL / Hazmat language limits: `https://www.nj.gov/mvc/license/knowledgetest.htm`.
- Mass.gov confirms Class D/M learner permit exam language availability and links RMV translated documents: `https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit` and `https://www.mass.gov/lists/rmv-translated-documents`.
- PennDOT driver manual confirms knowledge-test written/audio language availability including Chinese (Mandarin): `https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bdl/bdl-manuals/pa-drivers-manual-non-commercial/english/pub%2095.pdf`.
- Georgia DDS confirms Road Rules and Road Signs sections of the non-commercial knowledge exam are available in 26 languages including Chinese: `https://dds.georgia.gov/list-languages`.
- NCDMV confirms written knowledge tests in different languages and oral tests upon request: `https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx`.
- Michigan SOS confirms adult knowledge-test language / audio options and a Chinese Mandarin driver manual entry: `https://www.michigan.gov/sos/license-id/new-drivers-18-older` and `https://www.michigan.gov/sos/resources/forms/what-every-driver-must-know`.

Scope:

- Added `/directories/language-access/` as a 50-state "DMV 考试语言、翻译和口译入口表".
- The new directory extracts exam-language, Chinese / Mandarin, interpreter, oral-test, audio, certified-translation, translated-document, manual / guide, Google Translate, English-only, CDL, and Hazmat restriction cues from state data.
- Added quick-filter buttons for `中文考试`, `多语言笔试`, `文件翻译`, `口译 / 口试`, `手册 / 资料`, `English-only`, and `CDL 限制`.
- Added CollectionPage + nested ItemList schema to the language-access directory.
- Added the new directory to the directory hub, homepage "入口查表" section, sitemap, and README scope.
- Updated homepage content-resource count to 122, README scope to twelve directory pages, and build page count to 132.
- Enriched California, New York, Texas, Florida, Washington, New Jersey, Massachusetts, Pennsylvania, Georgia, North Carolina, and Michigan data with source-backed language, translation, interpreter, and handbook links.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 132 static pages.
- SEO audit checked 132 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static language-access QA verified 50 real data rows, 7 quick filters, CollectionPage schema, nested ItemList schema, homepage link/count, directory hub link, sitemap entry, and key California / New York / Texas / Florida / Washington / New Jersey / Massachusetts / Pennsylvania / Georgia / North Carolina / Michigan language cues.
- Official link audit checked 334 official URLs: 196 OK, 138 watch, 0 fail. Watch results are government-site 403/timeout cases already handled by public status notes and fallback guidance where relevant.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/directories/language-access/`: title, H1, 50 rows, 7 quick filters, California / NJ / Florida / Georgia high-value notes, no console errors, and no horizontal overflow.
- Browser quick-filter QA verified clicking `English-only` reduces the directory to 3 visible rows and searching `Georgia` reduces it to Georgia only.
- Mobile browser QA at 375px effective width verified 50 visible rows, 7 quick filters, single-column row layout, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 36 Changes

Date: 2026-07-10

### DMV Foreign License, Out-of-State Transfer, and IDP Table

Source scan:

- California DMV driver-license and Fast Facts materials confirm the 10-day resident rule, visitor driving with a valid home-state/country license, and that foreign-license applicants follow the out-of-state path but still need a California drive test: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/` and `https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/`.
- NY DMV Drivers from Other Countries confirms foreign-license driving before residency, the NY written-test / 5-hour-course / road-test path, surrender of the foreign license after passing, and IDP or certified translation requirements for non-English licenses: `https://dmv.ny.gov/driver-license/drivers-from-other-countries`.
- Texas DPS Moving to Texas and Driving Privilege Reciprocity materials confirm foreign-license driving up to one year and reciprocity / waiver references for France, Germany, South Korea, UAE, and Taiwan: `https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids` and `https://www.dps.texas.gov/section/driver-license/driving-privilege-reciprocity`.
- FLHSMV visitor and What to Bring materials confirm valid foreign-license visitor use, the 30-day resident license requirement, out-of-state exchange exam handling, and temporary-permit fallback conditions: `https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/` and `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/frequently-asked-questions/`.
- Washington DOL moving and testing pages confirm out-of-state / British Columbia / Germany / South Korea test-waiver paths, Taiwan / Japan office-check routing, translated certification requirements, old-license hole-punch / return handling, and 45-day temporary licenses: `https://dol.wa.gov/moving-washington/get-driver-license` and `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test`.
- NJ MVC Moving to New Jersey confirms out-of-state transfer, knowledge / road-test waivers for valid non-provisional out-of-state licenses, surrender of the old license, IDP visitor guidance, and Taiwan / South Korea reciprocity: `https://www.nj.gov/mvc/drivertopics/movetonj.htm`.
- Mass.gov foreign-license transfer and conversion pages confirm that an IDP cannot be converted to a Massachusetts permit/license by itself, foreign-license transfer requires specific country handling, and certified driving records can be required: `https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country` and `https://www.mass.gov/info-details/information-for-converting-certain-foreign-drivers-licenses`.
- PennDOT driver-license FAQ and manual confirm the one-year foreign-license driving window, IDP recommendation, France / Germany / Korea / Taiwan reciprocity, vision-test requirement, and out-of-state / Canada surrender handling: `https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/driver-and-licensing-miscellaneous-faqs` and `https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit`.
- Georgia DDS Drivers From Other Nations confirms resident vs non-resident handling, South Korea and Taiwan reciprocity / exemption references, and written / road / vision testing for non-reciprocity countries: `https://dds.georgia.gov/georgia-licenseid/new-licenseid/drivers-other-nations`.
- NCDMV new-resident guidance confirms out-of-state waiver handling and that North Carolina law enforcement does not recognize international driver licenses as a license substitute: `https://www.ncdot.gov/dmv/help/moving/Pages/new-residents.aspx`.
- Michigan SOS first-time-license and SOS-428 materials confirm U.S. state / territory / Canada transfer, English translation requirements, IDP / English translation for foreign driver licenses, and the warning that a foreign driver license is driving-experience proof only, not legal-presence or identity proof: `https://www.michigan.gov/sos/all-services/first-time-license-or-id` and `https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa`.

Scope:

- Added `/directories/foreign-license/` as a 50-state "DMV 外国/外州驾照转入和 IDP 入口表".
- The new directory extracts foreign / out-of-country license, out-of-state transfer, Canada transfer, International Driving Permit, reciprocity / waived-test, written / road / vision-test, certified translation, surrender / hole-punch / return, new-resident deadline, identity / legal-presence, and CDL restriction cues from state data.
- Added quick-filter buttons for `外国驾照`, `外州转入`, `互惠 / 免考`, `IDP`, `翻译要求`, `交旧证`, and `路考/笔试`.
- Added CollectionPage + nested ItemList schema to the foreign-license directory.
- Added the new directory to the directory hub, homepage "入口查表" section, sitemap, and README scope.
- Updated homepage content-resource count to 123, README scope to thirteen directory pages, and build page count to 133.
- Enriched California, New York, Texas, Florida, Washington, New Jersey, Massachusetts, Pennsylvania, Georgia, North Carolina, and Michigan data with source-backed foreign-license, out-of-state-transfer, IDP, reciprocity, translation, and surrender / return links.

Status:

- Content audit checked 50 states and 10 topics: 0 errors.
- Build generated 133 static pages.
- SEO audit checked 133 HTML pages, 100 state content pages, and 10 topic content pages: 0 errors.
- Static foreign-license QA verified 50 real data rows, 7 quick filters, CollectionPage schema, nested ItemList schema, homepage link/count, directory hub link, sitemap entry, and key California / New York / Texas / Florida / Washington / New Jersey / Massachusetts / Pennsylvania / Georgia / North Carolina / Michigan foreign-license cues.
- Official link audit checked 353 official URLs: 205 OK, 148 watch, 0 fail. Watch results are government-site 403/timeout cases and are retained for manual spot checks rather than treated as dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/directories/foreign-license/`: title, H1, 50 rows, 7 quick filters, California 10-day / drive-test cue, Texas reciprocity cue, Michigan foreign-license proof limitation, no console errors, and no horizontal overflow.
- Browser quick-filter QA verified clicking `reciprocity` reduces the directory to 2 visible rows and searching `Michigan` reduces it to Michigan only.
- Mobile browser QA at 390px width verified 50 rows, 7 quick filters, single-column row layout, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 37 Changes

Date: 2026-07-10

### Foreign License / IDP Explanatory Topic

Source scan:

- USA.gov confirms that IDP requirements vary by state, foreign visitors must get an IDP before traveling if needed, the U.S. does not issue IDPs to foreign visitors, IDPs for U.S. use are valid for one year, and visitors may need both the home-country license and IDP for rental-car situations: `https://www.usa.gov/non-citizen-driving`.
- California DMV Fast Facts 5 confirms that visitors over 18 with a valid home-state or home-country license may drive in California while that license remains valid, and that California residents must get a California DL within 10 days: `https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/`.
- California DMV driver-license guidance confirms that foreign-license applicants follow the out-of-state-license path but still need a driving test, and that a valid foreign license applicant needs an accompanying driver to and from the drive test: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/`.
- NY DMV driving guidance confirms that residents must get a NY license within 30 days, that U.S./Canada exchanges differ from other foreign licenses, and that non-residents may drive with a valid foreign license; NY also explains that an IDP is helpful but not required for foreign-license visitors: `https://dmv.ny.gov/driver-license/driving-in-new-york-state`.
- NY DMV Drivers from Other Countries confirms IDP or certified translation requirements for non-English licenses at the road test and lists required translation contents: `https://dmv.ny.gov/driver-license/drivers-from-other-countries`.
- NJ MVC Moving to New Jersey confirms Taiwan / Korea reciprocity context, valid foreign license with translation, NJ residency, SSN, lawful presence, and exemption from knowledge / road tests if all criteria are met: `https://www.nj.gov/mvc/drivertopics/movetonj.htm`.
- PennDOT's foreign-license page confirms that an IDP is not required for eligible drivers in Pennsylvania, that a valid foreign license can be sufficient, and that an IDP must be carried with the original license because it is not valid on its own: `https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license`.
- Washington DOL testing guidance confirms no-test transfer paths for selected jurisdictions, translated certification for Taiwan / Japan routing, and the rule that unlisted countries or Canadian provinces must complete first-license steps: `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test`.
- Michigan SOS-428 confirms foreign-document translation, IDP or English translation for foreign driver licenses, and that foreign driver licenses are proof of driving experience only, not identity or legal-presence proof: `https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa`.

Scope:

- Added the new cross-state topic `/topics/foreign-license-idp-transfer/` with title "中国/外国驾照、IDP 和美国州驾照怎么衔接".
- The topic explains the difference between visitor driving, becoming a state resident, converting to a state driver license, IDP / certified-translation use, reciprocity / waived-test paths, and legal-presence / identity documents.
- Added four FAQ entries covering China / foreign license + IDP, whether IDP can be used to convert directly, road-test requirements, and non-English-license translation formats.
- Added 9 official sources and 6 related states to the topic.
- Added optional `relatedDirectory` support to topic data and topic templates, then linked this topic to `/directories/foreign-license/` for the 50-state practical table.
- Added a homepage "外国驾照 / IDP" task entry and updated README from 10 to 11 cross-state topics.
- Homepage content-resource count now resolves to 124 pages; build page count is 134.

Status:

- Content audit checked 50 states and 11 topics: 0 errors.
- Build generated 134 static pages.
- SEO audit checked 134 HTML pages, 100 state content pages, and 11 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, Article schema, FAQPage schema, official USA.gov citation, 50-state directory sidebar link, Michigan foreign-license identity/legal-presence warning, homepage task entry, 124-page homepage count, topic registry 11/11 count, and sitemap entry.
- Official link audit checked 356 official URLs: 208 OK, 148 watch, 0 fail. Watch results remain government-site 403/timeout cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/topics/foreign-license-idp-transfer/`: title, H1, 2026-07-10 date, 9 official sources, 4 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, USA.gov source link, directory sidebar link, Michigan proof limitation warning, no console errors, and no horizontal overflow.
- Browser session reset while navigating from the topic to the homepage during a secondary navigation check; homepage and topic-registry coverage for this round is therefore recorded from built static HTML assertions rather than browser navigation.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 38 Changes

Date: 2026-07-10

### First Driver License / Permit / Road Test Explanatory Topic

Source scan:

- California DMV instruction-permit and test-preparation pages confirm instruction-permit routing, knowledge-test preparation, and drive-test preparation context: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/` and `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/`.
- NY DMV learner-permit materials confirm the permit / first-license route and permit-test preparation entry: `https://dmv.ny.gov/driver-license/get-learner-permit`.
- Texas DPS apply-for-driver-license page confirms the Texas driver-license application route, which remains a watch-status source in automated checks because the DPS site often times out or blocks scripts: `https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license`.
- FLHSMV Class E page confirms the Class E knowledge-exam and driving-skills-test path: `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/`.
- Washington DOL 18+ first-license page confirms that adult applicants should choose between getting a permit for practice or skipping permit practice depending on their readiness and DOL rules: `https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18`.
- NJ MVC first-license page confirms the first driver license / GDL path, with separate knowledge-test and road-test official pages already used elsewhere in the site: `https://www.nj.gov/mvc/license/firstlic.htm`.
- PennDOT learner-permit service page confirms the Pennsylvania learner-permit path for first-time drivers: `https://www.pa.gov/services/dmv/get-a-learners-permit`.
- Georgia DDS test-and-exams page confirms Road Rules / Road Signs knowledge exam context and connects to road-test routing: `https://dds.georgia.gov/testing-and-training/test-and-exams-information`.
- NCDMV driver-license-test page confirms knowledge, signs, vision, and driving-skills test categories: `https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx`.
- Michigan SOS new-drivers 18+ page confirms adult Temporary Instruction Permit, knowledge-test, supervised practice, and skills-test routing: `https://www.michigan.gov/sos/license-id/new-drivers-18-older`.

Scope:

- Added the new cross-state topic `/topics/first-driver-license-road-test/` with title "第一次在美国考驾照：permit、笔试和路考顺序".
- The topic explains how first-time applicants should separate identity / residency documents, permit or instruction permit, knowledge test, supervised practice or course requirements, road / skills test, and road-test vehicle / accompanying-driver checks.
- Added four FAQ entries covering whether adults need learner permits, whether experienced drivers can directly schedule a road test, Chinese / multilingual written-test availability, and road-test vehicle preparation.
- Added 11 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/tests-permits/`, the 50-state learner permit / knowledge test / road test directory.
- Added a homepage "第一次考驾照" task entry and updated README from 11 to 12 cross-state topics.
- Homepage content-resource count now resolves to 125 pages; build page count is 135.

Status:

- Content audit checked 50 states and 12 topics: 0 errors.
- Build generated 135 static pages.
- SEO audit checked 135 HTML pages, 100 state content pages, and 12 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, Article schema, FAQPage schema, California and Michigan official citations, 50-state tests/permits directory sidebar link, permit cross-state warning, road-test vehicle/insurance warning, homepage task entry, 125-page homepage count, topic registry 12/12 count, and sitemap entry.
- Official link audit checked 356 official URLs: 191 OK, 165 watch, 0 fail. Watch results are government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Browser QA loaded `http://127.0.0.1:4321/topics/first-driver-license-road-test/`: title, H1, 2026-07-10 date, 11 official sources, 4 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, tests/permits directory sidebar link, permit cross-state warning, vehicle/insurance warning, Michigan TIP cue, no console errors, and no horizontal overflow.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 39 Changes

Date: 2026-07-10

### Online / Office / Appointment Decision Topic

Source scan:

- USA.gov state motor vehicle directory remains the fallback official routing page when state government deep links are blocked, moved, or unstable: `https://www.usa.gov/state-motor-vehicle-services`.
- California DMV appointment and locations pages support the distinction between online / kiosk / business partner / mail paths and office services: `https://www.dmv.ca.gov/portal/appointments/` and `https://www.dmv.ca.gov/portal/locations/`.
- NY DMV office locations page confirms the need to check office services and reservation context by location: `https://dmv.ny.gov/contact-us/office-locations`.
- Texas.gov online eligibility page supports the point that opening an online renewal / replacement entry is not the same as being personally eligible: `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/`.
- FLHSMV renew / replace and locations pages support the Florida split between MyDMV / online services, county or service-center routing, and appointment-by-location decisions: `https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/` and `https://www.flhsmv.gov/locations/`.
- Washington DOL appointment / locations and driver licensing office pages support the distinction between driver licensing offices, vehicle licensing offices, and testing / training locations: `https://dol.wa.gov/appointments-and-locations` and `https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices`.
- NJ MVC online services and appointment wizard support the warning that online, renewal, REAL ID, and appointment categories are not interchangeable: `https://www.nj.gov/mvc/online-services.html` and `https://telegov.njportal.com/njmvc/AppointmentWizard`.

Scope:

- Added the new cross-state topic `/topics/online-office-appointment/` with title "DMV 业务先线上办还是预约到办公室".
- The topic explains how to decide between online services, kiosk, mail, third-party / partner channels, office visit, appointment, road-test scheduling, and location-type checks.
- Added four FAQ entries covering walk-ins, online eligibility, appointment category mistakes, and whether a temporary paper credential can be used for travel.
- Added 11 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/service-paths/`, the 50-state online / in-person path table.
- Added a homepage "要不要去 DMV" task entry and updated README from 12 to 13 cross-state topics.
- Updated the site-wide review date to `2026-07-10`.
- Fixed one hard failing Arkansas official link by replacing the old `https://www.dfa.arkansas.gov/office/driver-services/` deep link, which returned 500 in the link audit, with the working official Online Driver Services entry: `https://www.dfa.arkansas.gov/online-services/drivers/`.
- Homepage content-resource count now resolves to 126 pages; build page count is 136.

Status:

- Content audit checked 50 states and 13 topics: 0 errors.
- Build generated 136 static pages.
- SEO audit checked 136 HTML pages, 100 state content pages, and 13 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, Article schema, FAQPage schema, official USA.gov and Texas.gov citations, 50-state service-path directory sidebar link, Washington office-type warning, temporary-paper-credential warning, homepage task entry, 126-page homepage count, topic registry 13/13 count, and sitemap entry.
- Arkansas static QA verified the state now uses `https://www.dfa.arkansas.gov/online-services/drivers/` and no longer renders the old 500-returning `office/driver-services/` URL.
- Official link audit checked 355 official URLs: 207 OK, 148 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 40 Changes

Date: 2026-07-10

### Fees / Mailing / Temporary Credential Topic

Source scan:

- California DMV official pages confirm licensing-fee and payment-routing context plus processing-time estimates by online, kiosk, mail, and other paths: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/` and `https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/`.
- NY DMV official pages confirm fees / refunds, office / mail / online payment methods, and replacement-license mailing-address risks: `https://dmv.ny.gov/driver-license/fees-refunds` and `https://dmv.ny.gov/driver-license/replace-a-license-or-permit`.
- Texas.gov official renewal / replacement page remains a stable user-facing entry for Texas online driver license and ID renewal / replacement context: `https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/`.
- FLHSMV official renew / replace and fee pages support the MyDMV Portal path, the 2-3 week credential mailing window, and the online processing-fee warning; the FLHSMV domain still returns 403 in automated checks but remains the official source: `https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/` and `https://www.flhsmv.gov/driver-licenses-id-cards/fees/`.
- NJ MVC official renewal and duplicate pages confirm same-day online renewal context, 2-4 week mailed credential timing, agency renewal fee / payment context, and the warning that license / ID renewals or duplicates are no longer printed in person: `https://www.nj.gov/mvc/license/licrenew.htm` and `https://www.nj.gov/mvc/license/liclost.htm`.
- Washington DOL renewal guidance supports the fee / late-fee / office-visit trigger examples; the domain returns 403 in automated checks but remains an official source: `https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license`.
- Michigan SOS replacement guidance supports duplicate-fee, payment-method, replacement path, and temporary credential reminders: `https://www.michigan.gov/sos/all-services/license-id-or-permit-replacement`.
- Oregon DMV REAL ID Traveler and TSA Identification pages support the travel-risk framing around temporary / paper credentials and acceptable identification: `https://www.oregon.gov/odot/dmv/pages/realidtraveler.aspx` and `https://www.tsa.gov/travel/security-screening/identification`.

Scope:

- Added the new cross-state topic `/topics/dmv-fees-mailing-temporary-license/` with title "DMV 费用、邮寄时间和临时证件怎么查".
- The topic explains how to check DMV fees, online processing fees, payment methods, mailing address, permanent-card delivery timing, temporary credentials, and TSA travel-risk decisions.
- Added four FAQ entries covering whether listed fees are final, how long online renewal / replacement cards may take, temporary paper license travel risk, and address-change-before-replacement logic.
- Added 13 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/costs-timing/`, the 50-state fee / payment / temporary credential / card-mailing directory.
- Added a homepage "费用和多久拿证" task entry and updated README from 13 to 14 cross-state topics.
- Homepage content-resource count now resolves to 127 pages; build page count is 137.

Status:

- Content audit checked 50 states and 14 topics: 0 errors.
- Build generated 137 static pages.
- SEO audit checked 137 HTML pages, 100 state content pages, and 14 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, Article schema, FAQPage schema, California processing-time citation, NJ duplicate citation, Oregon REAL ID Traveler citation, TSA citation, 50-state costs/timing directory sidebar link, temporary-paper-credential warning, FLHSMV $2 processing fee warning, homepage task entry, 127-page homepage count, topic registry 14/14 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/dmv-fees-mailing-temporary-license/`: title, H1, 2026-07-10 date, 13 official sources, 4 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, costs/timing directory sidebar link, temporary-paper travel warning, service-fee warning, NJ 2-4 week mailing cue, Oregon source link, no console errors, and no horizontal overflow.
- Official link audit checked 355 official URLs: 207 OK, 148 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 41 Changes

Date: 2026-07-10

### Test Language / Translation / Interpreter Topic

Source scan:

- California DMV Online Learning and Tests confirms online-learning / testing context and multilingual cues including Traditional Chinese / Mandarin audio for eligible paths: `https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/`.
- NY DMV permit-test and language-assistance pages confirm permit-test language context and DMV language support entry points: `https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test` and `https://dmv.ny.gov/more-info/language-assistance`.
- Texas DPS Testing in Other Languages remains an official source for English / Spanish knowledge-test and CDL interpreter-limit warnings, though the DPS domain is still timeout/watch in automated checks: `https://www.dps.texas.gov/section/driver-license/testing-other-languages`.
- FLHSMV's 2026 official announcement remains the source for the English-only exam policy warning; FLHSMV continues to return 403 in automated checks: `https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/`.
- Washington DOL testing and driver-guide pages remain official sources for Chinese / multilingual knowledge-test and study-material cues, though the DOL domain returns 403 in automated checks: `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test` and `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides`.
- NJ MVC Knowledge Test confirms Chinese (Mandarin), interpreter scheduling context, and commercial / Hazmat language limits: `https://www.nj.gov/mvc/license/knowledgetest.htm`.
- PennDOT Driver Manual testing guidance, Georgia DDS list of languages, NCDMV driver-license tests / interpreter services, and Michigan SOS new-driver / driver-manual pages confirm additional state language, oral-test, interpreter, and Chinese manual cues: `https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing`, `https://dds.georgia.gov/list-languages`, `https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx`, `https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx`, `https://www.michigan.gov/sos/license-id/new-drivers-18-older`, and `https://www.michigan.gov/sos/resources/forms/what-every-driver-must-know`.

Scope:

- Added the new cross-state topic `/topics/dmv-test-language-translation-interpreter/` with title "DMV 中文笔试、文件翻译和口译怎么判断".
- The topic separates webpage / manual language, knowledge-test language, road-test / oral-test / interpreter rules, CDL / Hazmat limits, and non-English document translation requirements.
- Added four FAQ entries covering whether U.S. driver-license written tests always have Chinese, whether Chinese manuals imply Chinese exams, whether a friend can interpret during a road test, and whether Chinese-file translation has a single national format.
- Added 14 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/language-access/`, the 50-state exam language / translation / interpreter directory.
- Added a homepage "中文笔试 / 翻译" task entry and updated README from 14 to 15 cross-state topics.
- Homepage content-resource count now resolves to 128 pages; build page count is 138.

Status:

- Content audit checked 50 states and 15 topics: 0 errors.
- Build generated 138 static pages.
- SEO audit checked 138 HTML pages, 100 state content pages, and 15 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, Article schema, FAQPage schema, California / Texas / NJ / NCDMV interpreter citations, 50-state language-access directory sidebar link, road-test interpreter warning, CDL / Hazmat warning, homepage task entry, 128-page homepage count, topic registry 15/15 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/dmv-test-language-translation-interpreter/`: title, H1, 2026-07-10 date, 14 official sources, 4 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, language-access directory sidebar link, Chinese-manual-vs-test warning, interpreter FAQ, CDL / Hazmat warning, Texas source link, NCDMV interpreter source link, no console errors, and no horizontal overflow.
- Official link audit checked 356 official URLs: 208 OK, 148 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 43 Changes

Date: 2026-07-10

### Standard License / Driving Privilege / No Lawful Status Topic

Source scan:

- DHS REAL ID remains the federal source for REAL ID framing and lawful-status-sensitive identity use: `https://www.dhs.gov/real-id`.
- California DMV AB 60, NY DMV Green Light Law / standard-license-without-SSN, NJ MVC 6 Points of ID, Illinois SOS non-citizen / TVDL information, Maryland MVA noncompliant licenses, Colorado DMV standard licenses and IDs, Connecticut DMV drive-only license, Utah DLD Driving Privilege Card, Delaware DMV Driving Privilege Card, New Mexico MVD driver licenses and IDs, and Washington DOL REAL ID were reviewed for state-specific non-REAL-ID / driving-only pathways.
- The strongest content distinction is that REAL ID / Enhanced / CDL rules cannot be merged with standard, noncompliant, drive-only, AB 60, or Driving Privilege Card rules.
- Official state pages support writing this as a state-by-state DMV document and usage-limit guide, not as immigration advice. The page therefore emphasizes card limits, TSA / federal-use limits, identity / address / SSN-or-affidavit requirements, and state-specific naming.

Scope:

- Added the new cross-state topic `/topics/standard-license-driving-privilege-no-lawful-status/` with title "没有 lawful status，驾照、REAL ID 和 Driving Privilege Card 怎么分".
- The topic explains the difference between REAL ID, standard license, noncompliant license, drive-only license, AB 60, Driving Privilege Card, and state driving-only paths.
- Added five FAQ entries covering whether no lawful status always blocks a license, whether these documents can be used for air travel, card-face markers such as Federal Limits Apply / Not for Federal Identification, ITIN / affidavit limits, and immigration-status misconceptions.
- Added 13 official sources and 11 related states to the topic.
- Linked the topic sidebar to `/directories/identity-ssn/`, the 50-state SSN / identity-category directory.
- Added a homepage "不能办 REAL ID" task entry and updated README from 16 to 17 cross-state topics.
- Homepage content-resource count now resolves to 130 pages; build page count is 140.

Status:

- Content audit checked 50 states and 17 topics: 0 errors.
- Build generated 140 static pages.
- SEO audit checked 140 HTML pages, 100 state content pages, and 17 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 13 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, identity-ssn directory sidebar link, REAL ID / lawful status warning, TSA-use warning, card-marker FAQ, immigration-status caution, homepage task entry, 130-page homepage count, topic registry 17/17 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/standard-license-driving-privilege-no-lawful-status/`: title, H1, 2026-07-10 date, 13 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, identity-ssn directory sidebar link, REAL ID / lawful status / TSA warnings, card-marker FAQ, no console errors, and no horizontal overflow.
- Mobile browser QA at 390px width confirmed the long H1 wraps without horizontal overflow and the page keeps 13 official sources / 5 FAQ items.
- Official link audit checked 363 official URLs: 210 OK, 153 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 42 Changes

Date: 2026-07-10

### Special Residency Proof / No Bills / P.O. Box Topic

Source scan:

- California DMV REAL ID Checklist, NY DMV ID-44, NJ MVC 6 Points of ID, FLHSMV What to Bring, PennDOT REAL ID Document Requirements, Washington DOL EDL guide, Iowa DOT REAL ID, Kansas REAL ID, SCDMV Form MV-93, Mississippi Required Documents, and Oregon REAL ID were reviewed for current address-proof framing.
- The strongest cross-state pattern is that DMV pages distinguish residential / physical / residence address from mailing address, and many REAL ID / Enhanced / first-license paths require two address proofs.
- Official sources repeatedly treat P.O. Box, PMB, campus mailbox, junk mail, personal letters, envelopes, or documents not in the applicant's name as high-risk or unacceptable unless a state-specific exception, affidavit, certification, or special traveler path applies.
- Pennsylvania and Iowa support the page's warning about physical / printed documents; Oregon, Washington, Iowa, Kansas, South Carolina, Mississippi, New York, and New Jersey support the P.O. Box / physical-address caution.

Scope:

- Added the new cross-state topic `/topics/residency-proof-no-bills-po-box/` with title "没有自己账单、住亲友家或宿舍，地址证明怎么准备".
- The topic covers 住亲友家、室友家、学校宿舍、sublease、短租、P.O. Box、PMB、campus mailbox、mailing address and no-bill scenarios.
- Added five FAQ entries covering no utility bill, using a household member's bill, P.O. Box / PMB / school mailbox, same-bank / same-source documents, and phone PDF / electronic statement risk.
- Added 11 official sources and 11 related states to the topic.
- Linked the topic sidebar to `/directories/document-rules/`, the 50-state material-rules directory.
- Added a homepage "没有自己账单" task entry and updated README from 15 to 16 cross-state topics.
- Homepage content-resource count now resolves to 129 pages; build page count is 139.

Status:

- Content audit checked 50 states and 16 topics: 0 errors.
- Build generated 139 static pages.
- SEO audit checked 139 HTML pages, 100 state content pages, and 16 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 11 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, document-rules directory sidebar link, P.O. Box / physical-address warning, no-bill FAQ, same-source FAQ, homepage task entry, 129-page homepage count, topic registry 16/16 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/residency-proof-no-bills-po-box/`: title, H1, 2026-07-10 date, 11 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, document-rules directory sidebar link, P.O. Box warning, no-bill FAQ, same-bank FAQ, no console errors, and no horizontal overflow.
- Mobile browser QA at 390px width confirmed the long H1 wraps without horizontal overflow and the page keeps 11 official sources / 5 FAQ items.
- Official link audit checked 356 official URLs: 208 OK, 148 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 44 Changes

Date: 2026-07-10

### Vehicle Title / Registration / Insurance / Plates Topic

Source scan:

- California DMV Vehicle Registration and Title Transfers and Changes pages support the distinction between vehicle registration and title transfer: `https://www.dmv.ca.gov/portal/vehicle-registration/` and `https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/`.
- NY DMV Register and Title a Vehicle plus Buy, Sell, or Transfer Vehicle Ownership pages support the combined registration / title-transfer framing and private-sale caution: `https://dmv.ny.gov/registration/register-and-title-a-vehicle` and `https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership`.
- FLHSMV New Resident, NJ MVC Moving To New Jersey, and NJ MVC Vehicle Registration pages support the new-resident and vehicle-registration sequence warnings: `https://www.flhsmv.gov/new-resident/`, `https://www.nj.gov/mvc/drivertopics/movetonj.htm`, and `https://www.nj.gov/mvc/vehicles/reginitial.htm`.
- Texas DMV Buying or Selling a Vehicle and Vehicle Registration pages support dealer / private party and vehicle-registration distinctions: `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle` and `https://www.txdmv.gov/motorists/register-your-vehicle`.
- Washington DOL, PennDOT, NCDMV, Massachusetts RMV, and Virginia DMV official pages support state-specific title, registration, plates, out-of-state transfer, and vehicle-titling cues: `https://dol.wa.gov/moving-washington/vehicle-registration-and-plates`, `https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle`, `https://www.ncdot.gov/dmv/title-registration/Pages/default.aspx`, `https://www.mass.gov/how-to/transfer-your-registration-and-title-from-out-of-state`, and `https://www.dmv.virginia.gov/vehicles/title`.
- The first link-audit pass caught two dead official URL variants. They were replaced with current California and New York official URLs before the final audit.

Scope:

- Added the new cross-state topic `/topics/vehicle-title-registration-insurance-after-move/` with title "买车或搬州后，车辆 title、registration、保险和车牌先办哪个".
- The topic explains the order and distinction among title, registration, insurance, inspection / emissions, license plates, driver license, dealer purchase, private-party purchase, new-resident transfer, and old-state plate return.
- Added five FAQ entries covering license-vs-vehicle order after moving, title vs registration, dealer代办, private-sale bill of sale limits, and old-state plate return.
- Added 14 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/new-residents/`, the 50-state new-resident / out-of-state-transfer directory.
- Added a homepage "车辆登记 / 车牌" task entry and updated README from 17 to 18 cross-state topics.
- Homepage content-resource count now resolves to 131 pages; build page count is 141.

Status:

- Content audit checked 50 states and 18 topics: 0 errors.
- Build generated 141 static pages.
- SEO audit checked 141 HTML pages, 100 state content pages, and 18 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 14 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, new-residents directory sidebar link, title / registration distinction, dealer / private-party warning, old-state plate warning, homepage task entry, 131-page homepage count, topic registry 18/18 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/vehicle-title-registration-insurance-after-move/`: title, H1, 2026-07-10 date, 14 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, new-residents directory sidebar link, title / registration distinction, dealer / private-party warning, plate-return warning, no console errors, and no horizontal overflow.
- Mobile browser QA at 390px width confirmed the long H1 wraps without horizontal overflow and the page keeps 14 official sources / 5 FAQ items.
- Official link audit checked 375 official URLs: 221 OK, 154 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 45 Changes

Date: 2026-07-10

### Sold Car / Release of Liability / Plates / Insurance Topic

Source scan:

- California DMV Notice of Transfer and Release of Liability and Title Transfers pages support the seller-side NRL framing, including the point that notice protects the seller but does not replace buyer title transfer: `https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/` and `https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/`.
- NY DMV plate-surrender and insurance pages support the warning that plates / registration and insurance cancellation order matters: `https://dmv.ny.gov/registration/surrender-return-or-turn-in-your-vehicle-plates-and-registration` and `https://dmv.ny.gov/insurance/change-reinstate-or-cancel-insurance-coverage`.
- FLHSMV Selling a Vehicle, NJ MVC ownership-transfer / surrender-registration pages, and Texas DMV Buying or Selling a Vehicle support seller plate removal, title-transfer, and transfer-notification cautions: `https://www.flhsmv.gov/safety-center/consumer-education/selling-vehicle-florida/`, `https://www.nj.gov/mvc/vehicles/transowner.htm`, `https://www.nj.gov/mvc/vehicles/surrenderreg.htm`, and `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle`.
- Washington DOL Sell a Vehicle supports the Report of Sale / plate-removal / dealer-confirmation framing: `https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/sell-vehicle`.
- PennDOT insurance-letter guidance, NCDMV insurance / vehicle-title pages, Virginia DMV buy-sell and license-plate surrender pages, Oregon DMV vehicle information, Arizona MVD Selling Your Vehicle, and Mass.gov RMV cancellation page support insurance lapse, plate return, sold notice, and cancellation warnings across additional states: `https://www.pa.gov/agencies/dmv/vehicle-services/insurance-overview/types-of-insurance-letters-from-penndot`, `https://www.ncdot.gov/dmv/title-registration/insurance-requirements/Pages/default.aspx`, `https://www.ncdot.gov/dmv/title-registration/vehicle/Pages/default.aspx`, `https://www.dmv.virginia.gov/vehicles/buy-sell`, `https://www.dmv.virginia.gov/vehicles/license-plates/surrender`, `https://www.oregon.gov/odot/dmv/pages/online_quick_tips/vehicle_information.aspx`, `https://azdot.gov/mvd/services/registration-plates-title/selling-vehicle`, and `https://www.mass.gov/how-to/cancel-your-vehicle-registration-license-plates`.

Scope:

- Added the new cross-state topic `/topics/sold-car-release-liability-plates-insurance/` with title "卖车、捐车或报废后，DMV 责任解除、车牌和保险怎么收尾".
- The topic explains seller-side DMV cleanup after private sale, dealer trade-in, donation, junk / destroyed vehicle, insurance total loss, out-of-state sale, or moving out of state.
- Added five FAQ entries covering whether signed title is enough, dealer / trade-in responsibility, whether insurance can be canceled first, whether plates can stay with the buyer, and what to do after receiving renewal / ticket / toll notices.
- Added 17 official sources and 12 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "卖车 / 退牌" task entry and updated README from 18 to 19 cross-state topics.
- Homepage content-resource count now resolves to 132 pages; build page count is 142.

Status:

- Content audit checked 50 states and 19 topics: 0 errors.
- Build generated 142 static pages.
- SEO audit checked 142 HTML pages, 100 state content pages, and 19 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 17 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, NRL / Report of Sale / Vehicle Transfer Notification concepts, CA / WA / TX / OR / AZ deadline examples, plate / insurance warning, homepage task entry, 132-page homepage count, topic registry 19/19 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/sold-car-release-liability-plates-insurance/`: title, H1, 2026-07-10 date, 17 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, dmv-services directory sidebar link, seller notice concepts, dealer / trade-in warning, plate / insurance warning, no console errors, and no horizontal overflow.
- Mobile browser QA at 390px width confirmed the long H1 wraps without horizontal overflow and the page keeps 17 official sources / 5 FAQ items.
- Official link audit checked 390 official URLs: 232 OK, 158 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 46 Changes

Date: 2026-07-10

### Tickets / Tolls / Insurance Lapse / Registration Hold Topic

Source scan:

- California DMV parking / toll violation and owner-responsibility citation procedure pages support the registration-renewal hold framing for parking, toll, and owner-responsibility citation records: `https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/parking-toll-violations-on-record/` and `https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/owner-responsibility-citations-on-record/`.
- NY DMV toll-suspension, insurance-lapse, and payment-plan pages support the distinction among toll holds, insurance lapse, registration suspension, driver license suspension, and ticket payment-plan routing: `https://dmv.ny.gov/registration/registration-suspensions-for-failure-to-pay-tolls`, `https://dmv.ny.gov/insurance/insurance-lapses`, and `https://dmv.ny.gov/tickets/payment-plans`.
- FLHSMV traffic-citation / court-suspension, insurance, toll-by-plate, and scam-alert pages support the Florida split among county traffic court, insurance compliance, toll agency routing, and fraud warnings: `https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/traffic-citations-court-suspensions/`, `https://www.flhsmv.gov/insurance/`, `https://www.flhsmv.gov/toll-by-plate-information/`, and `https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/`.
- NJ MVC suspension / restoration and insurance-requirements pages support insurance and suspension-routing cautions: `https://www.nj.gov/mvc/license/suspension.htm` and `https://www.nj.gov/mvc/vehicles/insurancerequirements.htm`.
- Texas DPS FTA/FTP FAQ and the TxDMV registration manual support failure-to-appear / failure-to-pay and registration-renewal-denial routing: `https://www.dps.texas.gov/section/driver-license/faq/section-8-failure-appear-and-failure-pay-ftaftp` and `https://www.txdmv.gov/sites/default/files/body-files/Motor_Vehicle_Registration_Manual_Book_298.pdf`.
- PennDOT toll, parking-ticket, and financial-responsibility pages support unpaid-toll, unpaid-parking, and insurance-lapse suspension warnings: `https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-tolls`, `https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-parking-tickets`, and `https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/financial-responsibility-faqs`.
- Virginia DMV registration-denial, insurance-requirements, and toll-scam pages plus Mass.gov non-renewal / non-motor-vehicle suspension pages support local-fee, insurance, toll, parking, and scam-warning routing: `https://www.dmv.virginia.gov/vehicles/registration/denials`, `https://www.dmv.virginia.gov/vehicles/insurance-requirements`, `https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam`, `https://www.mass.gov/info-details/non-renewal-program`, and `https://www.mass.gov/info-details/non-motor-vehicle-suspensions`.

Scope:

- Added the new cross-state topic `/topics/tickets-tolls-insurance-lapse-registration-hold/` with title "罚单、toll、保险 lapse 或 registration hold，先查 DMV 还是法院".
- The topic explains how to distinguish driver license suspension, vehicle registration suspension / denial, toll hold, parking ticket hold, court suspension, insurance lapse, local tax / municipality non-renewal, and scam alerts.
- Added five FAQ entries covering whether DMV can clear a hold, why insurance lapse affects registration / license, why payment may not immediately restore DMV records, scam text-message warnings, and post-sale toll / parking notices.
- Added 21 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "罚单 / toll / hold" task entry and updated README from 19 to 20 cross-state topics.
- Homepage content-resource count now resolves to 133 pages; build page count is 143.

Status:

- Content audit checked 50 states and 20 topics: 0 errors.
- Build generated 143 static pages.
- SEO audit checked 143 HTML pages, 100 state content pages, and 20 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 21 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, driver-license-vs-registration distinction, insurance-lapse warning, court / toll / parking routing, scam warning, homepage task entry, 133-page homepage count, topic registry 20/20 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/tickets-tolls-insurance-lapse-registration-hold/`: title, H1, 2026-07-10 date, 21 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, dmv-services directory sidebar link, hold distinction, insurance-lapse warning, court / toll / parking routing, scam warning, no console errors, and no horizontal overflow.
- Mobile browser QA at 390px width confirmed the long H1 wraps without horizontal overflow and the page keeps 21 official sources / 5 FAQ items.
- Official link audit checked 411 official URLs: 246 OK, 165 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 47 Changes

Date: 2026-07-10

### Vehicle Inspection / Emissions / Smog / VIN Check Topic

Source scan:

- California DMV Smog Inspections and California BAR Smog Check Program pages support the California-specific smog framing, including vehicle registration and renewal relevance: `https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/` and `https://www.bar.ca.gov/consumer/smog-check-program`.
- NY DMV Inspections and Inspection Requirements pages support the distinction between safety inspection and emissions inspection in New York's inspection system: `https://dmv.ny.gov/inspections` and `https://dmv.ny.gov/inspection/inspection-requirements`.
- Texas DPS Vehicle Safety Inspection Program Changes, Texas DMV Register Your Vehicle, and TCEQ Vehicle Inspection and Maintenance Program pages support the 2025 Texas nuance: most non-commercial annual safety inspections were eliminated, while emissions requirements still apply in covered areas / vehicles: `https://www.dps.texas.gov/news/dps-reminds-texans-vehicle-safety-inspection-changes`, `https://www.txdmv.gov/motorists/register-your-vehicle`, and `https://www.tceq.texas.gov/airquality/mobilesource/vim/overview.html`.
- NJ MVC inspection pages support the New Jersey vehicle-inspection and authorized-station routing: `https://www.nj.gov/mvc/inspection/aboutinsp.htm` and `https://www.nj.gov/mvc/inspection/inspecthow.htm`.
- PennDOT safety / emission inspection pages were checked on their current migrated paths after older URL variants returned 404: `https://www.pa.gov/agencies/dmv/vehicle-services/inspection-and-safety-requirements/safety-inspection-program` and `https://www.pa.gov/agencies/dmv/vehicle-services/inspection-and-safety-requirements/emission-inspections-program`.
- Virginia DMV emissions and Virginia State Police safety-inspection pages support the split between DMV registration/emissions routing and state-police safety inspection: `https://www.dmv.virginia.gov/vehicles/registration/emissions` and `https://vsp.virginia.gov/safety-and-enforcement/vehicle-safety-inspection/`.
- Mass.gov, NCDMV, FLHSMV, Arizona MVD / myAZcar, Colorado DMV, and Oregon DEQ official pages support additional cross-state examples for safety inspection, emissions, VIN / odometer verification, and regional inspection programs: `https://www.mass.gov/info-details/vehicle-inspections`, `https://www.ncdot.gov/dmv/title-registration/emissions-safety/Pages/default.aspx`, `https://www.flhsmv.gov/new-resident/`, `https://www.flhsmv.gov/pdf/forms/82042.pdf`, `https://azdot.gov/mvd/services/vehicle-services/vehicle-registration/emissions`, `https://www.myazcar.com/`, `https://dmv.colorado.gov/emissions`, and `https://www.oregon.gov/deq/Vehicle-Inspection/Pages/default.aspx`.

Scope:

- Added the new cross-state topic `/topics/vehicle-inspection-emissions-smog-vin-check/` with title "车辆年检、emissions、smog 和 VIN inspection，registration 卡住怎么办".
- The topic explains the distinction among safety inspection, emissions / smog check, VIN verification, road-test vehicle check, and registration hold.
- Added five FAQ entries covering whether U.S. vehicle inspection is nationally uniform, smog / emissions / safety differences, new-resident out-of-state vehicles, failed inspections and registration renewal, and VIN inspection vs emissions inspection.
- Added 21 official sources and 12 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "车检 / 排放" task entry and updated README from 20 to 21 cross-state topics.
- Homepage content-resource count now resolves to 134 pages; build page count is 144.

Status:

- Content audit checked 50 states and 21 topics: 0 errors.
- Build generated 144 static pages.
- SEO audit checked 144 HTML pages, 100 state content pages, and 21 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 21 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, Texas 2025 inspection nuance, safety / emissions / VIN distinction, homepage task entry, 134-page homepage count, topic registry 21/21 count, and sitemap entry.
- Browser QA loaded `http://127.0.0.1:4321/topics/vehicle-inspection-emissions-smog-vin-check/`: title, H1, 2026-07-10 date, 21 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, Texas 2025 nuance, no console errors, and no horizontal overflow.
- Mobile browser QA at 390px width confirmed the long H1 wraps without horizontal overflow, no text clipping candidates were found, and the page keeps 21 official sources / 5 FAQ items.
- Homepage browser QA confirmed the "车检 / 排放" task entry, one link to the new topic, 134-page homepage count, and no horizontal overflow.
- Official link audit checked 430 official URLs: 260 OK, 170 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 48 Changes

Date: 2026-07-10

### Student / Temporary Resident / Nonresident License and Vehicle Registration Topic

Source scan:

- USA.gov confirms that non-citizen driving and IDP requirements vary by state and that foreign visitors need to check the state where they plan to drive: `https://www.usa.gov/non-citizen-driving`.
- California DMV New to California, Fast Facts 5, nonresident vehicle privileges, and California Driver Handbook vehicle-registration pages support the distinction among visitor driving, becoming a California resident, nonresident vehicles, and California registration requirements: `https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/`, `https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/`, `https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/nonresident-vehicles/privileges-of-nonresidents/`, and `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/vehicle-registration-requirements/`.
- NY DMV Driving in New York State, Moving to or from New York State, and Resources for Non-US Citizens pages support the page's central warning: students from other states or countries are usually not considered New York residents, but residents must follow New York licensing rules: `https://dmv.ny.gov/driver-license/driving-in-new-york-state`, `https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state`, and `https://dmv.ny.gov/driver-license/resources-for-non-us-citizens`.
- FLHSMV visitor, new-resident, and non-immigrant materials support the split between visiting Florida, becoming a Florida resident, and non-immigrant document requirements: `https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/`, `https://www.flhsmv.gov/new-resident/`, and `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/`.
- Texas DMV New to Texas / Register Your Vehicle and Texas DPS Temporary Visitors / Moving to Texas Guide support the distinction among vehicle registration, new-resident handling, temporary visitor lawful-presence review, and Limited Term license / ID framing: `https://www.txdmv.gov/motorists/new-to-texas`, `https://www.txdmv.gov/motorists/register-your-vehicle`, `https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors`, and `https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids`.
- Washington DOL moving, driver-license, and vehicle-registration pages support the warning that driver license and vehicle registration may be separate paths: `https://dol.wa.gov/moving-washington`, `https://dol.wa.gov/moving-washington/get-driver-license`, and `https://dol.wa.gov/moving-washington/vehicle-registration-and-plates`.
- Mass.gov foreign-license pages, PennDOT foreign-license / relocation / vehicle-transfer pages, Georgia DDS / DOR pages, and NJ MVC moving / first-time FAQ pages support additional state examples for foreign drivers, non-citizen documents, new residents, and vehicle registration: `https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license`, `https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country`, `https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license`, `https://www.pa.gov/agencies/dmv/resources/relocation/moving-to-pennsylvania`, `https://www.pa.gov/services/dmv/transfer-vehicle-registration-from-another-state`, `https://dds.georgia.gov/georgia-licenseid/new-licenseid/drivers-other-nations`, `https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens`, `https://dor.georgia.gov/when-where-register-your-vehicle`, `https://www.nj.gov/mvc/drivertopics/movetonj.htm`, and `https://www.nj.gov/mvc/pdf/license/FAQ_firsttime.pdf`.

Scope:

- Added the new cross-state topic `/topics/student-temporary-resident-license-registration/` with title "留学生、访问学者和短期工作，算不算 resident，要不要换驾照或注册车".
- The topic explains the difference among immigration status, state residency, visitor / non-resident / temporary visitor status, driver-license eligibility, lawful-presence document timing, and vehicle-registration requirements.
- Added five FAQ entries covering whether students always avoid state licenses, temporary visitor / Limited Term license handling, foreign license + IDP limits, out-of-state student vehicle registration, and school international-office advice.
- Added 28 official sources and 9 related states to the topic.
- Linked the topic sidebar to `/directories/identity-ssn/`, the SSN / identity-category directory.
- Added a homepage "学生 / 非居民" task entry and updated README from 21 to 22 cross-state topics.
- Homepage content-resource count now resolves to 135 pages; build page count is 145.

Status:

- Content audit checked 50 states and 22 topics: 0 errors.
- Build generated 145 static pages.
- SEO audit checked 145 HTML pages, 100 state content pages, and 22 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 28 official sources, 5 FAQ items, Article / FAQPage / BreadcrumbList schema, identity-SSN directory sidebar link, NY student / non-resident nuance, vehicle-registration distinction, homepage task entry, 135-page homepage count, topic index entry, and sitemap entry.
- Chrome browser QA loaded `http://127.0.0.1:4321/topics/student-temporary-resident-license-registration/`: title, H1, 2026-07-10 date, 28 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, identity-SSN directory sidebar link, NY student nuance, vehicle-registration distinction, no console errors, and no horizontal overflow.
- Mobile Chrome QA at 390px width confirmed the long H1 wraps without horizontal overflow, no text clipping candidates were found, and the page keeps 28 official sources / 5 FAQ items.
- Homepage Chrome QA confirmed the "学生 / 非居民" task entry, one link to the new topic, 135-page homepage count, and no horizontal overflow.
- The in-app browser connection was attempted first, but the webview did not attach; Chrome extension QA was used as the browser verification fallback.
- Official link audit checked 439 official URLs: 268 OK, 171 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 49 Changes

Date: 2026-07-10

### Driver License Suspension / Reinstatement / SR-22 Topic

Source scan:

- California DMV suspension, reissue-fee, insurance-requirement, and financial-responsibility handbook pages support the general warning that a suspended driving privilege is not restored merely by buying insurance or paying one item: `https://www.dmv.ca.gov/portal/suspensions/`, `https://www.dmv.ca.gov/portal/dmv-virtual-office/reissue-fees/`, `https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/`, and `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/financial-responsibility-insurance-requirements-and-collisions/`.
- NY DMV suspension / revocation, license-status, suspension-termination-fee, and revocation-restoration pages support the distinction between suspended and revoked, plus the warning that revocation may require DMV approval, reapplication, payment, or testing: `https://dmv.ny.gov/points-and-penalties/suspensions-and-revocations`, `https://dmv.ny.gov/driver-license/check-license-or-driving-privilege-status`, `https://dmv.ny.gov/points-and-penalties/pay-a-suspension-termination-fee`, and `https://dmv.ny.gov/points-and-penalties/request-restoration-after-a-driver-license-revocation`.
- FLHSMV suspension / revocation, other-suspension, insurance-letter, and financial-responsibility manual sources support Florida-specific handling for license suspension reasons, insurance monitoring, and proof of financial responsibility: `https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/`, `https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/other-suspensions-revocations/`, `https://www.flhsmv.gov/insurance/received-a-letter/`, and `https://www.flhsmv.gov/pdf/frmanual/ftp-procedure-manual.pdf`.
- Texas DPS reinstatement, suspension / reinstatement, License Eligibility, and reinstatement-fee / special-license FAQ sources support the status-first and eligibility-first workflow: `https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege`, `https://www.dps.texas.gov/section/driver-license/suspensions-reinstatements`, `https://texas.gov/licenseeligibility`, and `https://www.dps.texas.gov/section/driver-license/faq/section-7-reinstatement-fees-and-special-licenses`.
- NJ MVC, Mass.gov, Washington DOL, Georgia DDS, PennDOT, and Virginia DMV sources support additional cross-state examples for restoration, hearings / classes, suspended-license status, reinstatement fees, restoration requirement letters, SR-22 / FR-44 / FR-46 certifications, and payment-plan routing: `https://www.nj.gov/mvc/license/suspension.htm`, `https://www.mass.gov/how-to/reinstate-your-drivers-license`, `https://www.mass.gov/info-details/required-classes-and-programs-to-reinstate-your-drivers-license`, `https://www.mass.gov/guides/suspension-hearings-information`, `https://dol.wa.gov/driver-licenses-and-permits/suspended-driver-license`, `https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations`, `https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations/reinstatement-fees-and-payment`, `https://www.pa.gov/agencies/dmv/online-services-dvs/license-and-vehicle-restoration-services`, `https://www.pa.gov/services/dmv/request-a-driver-license-restoration-requirements-letter`, `https://www.dmv.virginia.gov/licenses-ids/license/reinstate`, `https://www.dmv.virginia.gov/businesses/insurance/certifications`, and `https://www.dmv.virginia.gov/licenses-ids/payment-plan-program`.

Scope:

- Added the new cross-state topic `/topics/driver-license-suspension-reinstatement-sr22/` with title "驾照被 suspend 或 revoke 后，恢复驾驶资格先做什么".
- The topic explains suspension, revocation, cancellation, denial, reinstatement / restoration, court clearance, proof of financial responsibility, SR-22 / FR-44, courses, testing, restricted / hardship / conditional license paths, and out-of-state suspension cautions.
- Added five FAQ entries covering suspended vs revoked, why a paid reinstatement fee may not restore status, SR-22 / FR-44 meaning, restricted / hardship / conditional licenses, and out-of-state suspended-license transfer risks.
- Added 28 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "恢复驾照" task entry and updated README from 22 to 23 cross-state topics.
- Added a small CSS fix for the homepage state list so long English agency names shrink correctly on mobile instead of overflowing their row.
- Homepage content-resource count now resolves to 136 pages; build page count is 146.

Status:

- Content audit checked 50 states and 23 topics: 0 errors.
- Build generated 146 static pages.
- SEO audit checked 146 HTML pages, 100 state content pages, and 23 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 28 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, suspension / revocation / cancellation / denial distinction, SR-22 / FR-44 financial-responsibility nuance, "do not drive before restored" warning, homepage task entry, 136-page homepage count, topic index entry, and sitemap entry.
- Chrome browser QA loaded `http://127.0.0.1:4321/topics/driver-license-suspension-reinstatement-sr22/`: title, H1, 2026-07-10 date, 28 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, dmv-services directory sidebar link, suspension / revocation distinction, SR-22 / FR-44 nuance, do-not-drive warning, no console errors, and no horizontal overflow.
- Mobile Chrome QA at 390px width confirmed the new topic has no horizontal overflow or text clipping candidates and keeps 28 official sources / 5 FAQ items.
- Homepage Chrome QA confirmed the "恢复驾照" task entry, one link to the new topic, 136-page homepage count, no console errors, and no horizontal overflow after the long-agency-name CSS fix.
- Official link audit checked 466 official URLs: 284 OK, 182 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 50 Changes

Date: 2026-07-10

### Used Car Title / Lien / Salvage / Odometer Buyer-Check Topic

Source scan:

- California DMV private-party registration, branded-title, and duplicate-title pages support the title-owner, seller-authority, salvage / brand, and replacement-title cautions: `https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/registering-a-vehicle-purchased-from-a-private-party/`, `https://www.dmv.ca.gov/portal/vehicle-registration/titles/branded-titles/`, and `https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/transfers/duplicate-titles/`.
- NY DMV Let the Buyer Be Aware, Driver Manual ownership chapter, and vehicle-ownership transfer page support the private-seller, lien-release, mileage, dealer-rule, and buyer-risk framing: `https://dmv.ny.gov/brochure/let-the-buyer-be-aware`, `https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle`, and `https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership`.
- Texas DMV title-check, buying / selling, salvage-brand, and odometer-brand pages support the "look before you buy" workflow, title / VIN / odometer comparison, no-title caution, and salvage / rebuilt brand warnings: `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy`, `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle`, `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/salvage-brands`, and `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/odometer-brands`.
- Washington DOL buy-and-register and title-fraud pages support pre-purchase history checks, NMVTIS, independent inspection, odometer / curbstoning risk, title transfer timing, lien verification, and trip-permit reminders: `https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle` and `https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/title-fraud`.
- NJ MVC, FLHSMV, PennDOT, Virginia DMV, Oregon DMV, and NCDMV official pages support additional cross-state examples for ownership transfer, salvage / rebuilt vehicles, odometer fraud, title applications, NMVTIS, and vehicle titling: `https://www.nj.gov/mvc/vehicles/transowner.htm`, `https://www.nj.gov/mvc/vehicles/salvage.htm`, `https://www.flhsmv.gov/safety-center/consumer-education/`, `https://www.flhsmv.gov/pdf/mv/mv_fraud.pdf`, `https://www.flhsmv.gov/pdf/forms/82040.pdf`, `https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle`, `https://www.dmv.virginia.gov/vehicles/nmvtis`, `https://www.dmv.virginia.gov/vehicles/title`, `https://www.oregon.gov/odot/dmv/pages/vehicle/titlereg.aspx`, and `https://www.ncdot.gov/dmv/title-registration/vehicle/Pages/default.aspx`.
- Federal / consumer sources support the national layer: NMVTIS consumer and approved-provider pages for title-brand, insurance-loss, salvage and odometer data; NHTSA for odometer fraud; FTC for dealer Used Car Rule / Buyers Guide and online used-car scams: `https://vehiclehistory.bja.ojp.gov/nmvtis_consumers`, `https://vehiclehistory.bja.ojp.gov/nmvtis_vehiclehistory`, `https://www.nhtsa.gov/vehicle-safety/odometer-fraud`, `https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule`, and `https://consumer.ftc.gov/consumer-alerts/2024/07/what-know-when-buying-used-car-online`.

Scope:

- Added the new cross-state topic `/topics/used-car-title-lien-salvage-odometer-check/` with title "买二手车前，title、lien、salvage 和 odometer 怎么查".
- The topic focuses on buyer-side risk before payment: VIN matching, title owner, seller authority, title brand, lien release, odometer disclosure, NMVTIS, vehicle history reports, independent inspection, dealer vs private sale, online sale risk, and no-title / bill-of-sale-only warning.
- Added five FAQ entries covering no-title / bill-of-sale-only vehicles, clean-title limits, seller name not on title, mileage discrepancies, and dealer vs private seller protections.
- Added 27 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "买二手车查 title" task entry and updated README from 23 to 24 cross-state topics.
- Replaced two dead / migrated official URLs found by the link audit: Vermont DMV's old change-address deep link now uses the working official Vermont myDMV entry `https://mydmv.vermont.gov/?Check=1`; Washington DOL's moved vehicle-registration-and-plates page now uses `https://dol.wa.gov/moving-washington/vehicle-registration-and-plates`.
- Homepage content-resource count now resolves to 137 pages; build page count is 147.

Status:

- Content audit checked 50 states and 24 topics: 0 errors.
- Build generated 147 static pages.
- SEO audit checked 147 HTML pages, 100 state content pages, and 24 topic content pages: 0 errors.
- Static topic QA verified the new topic title, 2026-07-10 review date, 27 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, title / lien warning, NMVTIS / brand-washing nuance, odometer / NHTSA warning, dealer-vs-private-seller distinction, no-title FAQ, homepage task entry, 137-page homepage count, topic index entry, and sitemap entry.
- Chrome browser QA loaded `http://127.0.0.1:4321/topics/used-car-title-lien-salvage-odometer-check/`: title, H1, 2026-07-10 date, 27 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, dmv-services directory sidebar link, lien / NMVTIS / odometer / private-seller / no-title cues, no console errors, and no horizontal overflow.
- Mobile Chrome QA at 390px width confirmed the new topic has no horizontal overflow or text clipping candidates and keeps 27 official sources / 5 FAQ items.
- Homepage Chrome QA confirmed the "买二手车查 title" task entry, one link to the new topic, 137-page homepage count, no console errors, and no horizontal overflow.
- Official link audit checked 487 official URLs: 366 OK, 121 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.

## Round 51 Changes

Date: 2026-07-10

### Disabled Parking Placard / Plates / Temporary Permit Topic

Source scan:

- California DMV disabled-person placard / plate, online application, renewal, replacement, and REG 195 pages support the placard-vs-plate distinction, medical certification, permanent / temporary / travel placard, misuse, renewal, replacement, and parking-privilege limits: `https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/`, `https://www.dmv.ca.gov/portal/dmv-virtual-office/dpp-application/`, `https://www.dmv.ca.gov/portal/dmv-virtual-office/dpp-renewal/`, `https://www.dmv.ca.gov/portal/dmv-virtual-office/dpp-replacement/`, and `https://www.dmv.ca.gov/portal/uploads/2020/12/reg195.pdf`.
- NY DMV parking-for-people-with-disabilities pages and MV-664.1 support the local-government permit vs DMV plate split, healthcare-provider statement route, one-set plate limit, locality parking rules, NYC curbside nuance, and fines for unauthorized reserved-space parking: `https://dmv.ny.gov/more-info/parking-for-people-with-disabilities`, `https://dmv.ny.gov/parking-for-people-with-disabilities-the-law`, and `https://dmv.ny.gov/forms/mv6641.pdf`.
- Texas DMV disabled parking and disabled veteran sources support the county-tax-office route, VTR-214 / VTR-615 application forms, medical-provider statement, placard / plate workflow, and the important warning that DV plates without the International Symbol of Access do not authorize disabled-space parking: `https://www.txdmv.gov/motorists/disabled-parking-placards-plates`, `https://www.txdmv.gov/sites/default/files/form_files/VTR-214.pdf`, `https://www.txdmv.gov/sites/default/files/body-files/Disabled-Persons-Placard-Brochure.pdf`, and `https://www.txdmv.gov/sites/default/files/form_files/VTR-615.pdf`.
- FLHSMV disabled parking pages and HSMV 83039 support the long-term / short-term categories, Florida visitor permits, wheelchair plate route, temporary-permit fee framing, permanent-permit renewal, and FAQ handling: `https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/`, `https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/permanent-disabled-person-parking-permits/`, `https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/temporary-disabled-person-parking-permits/`, `https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/disabled-person-parking-permits-for-florida-visitors/`, `https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/wheelchair-license-plate/`, `https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/frequently-asked-questions/`, and `https://www.flhsmv.gov/pdf/forms/83039.pdf`.
- PennDOT placard / plate pages, FAQ, and MV-145A support the no-fee placard note, two-placard or one-placard-plus-one-plate limit, online renewal / address-change route, use-only-when-disabled-person-is-in-vehicle warning, 50-state recognition, and replacement handling: `https://www.pa.gov/services/dmv/apply-for-or-renew-a-persons-with-disability-parking-placard`, `https://www.pa.gov/agencies/dmv/resources/persons-with-disabilities-placards-plates`, `https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/placard-faqs`, and `https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-145a.pdf`.
- Mass.gov disability placard / plate pages and application form support Massachusetts-specific resident, primary-owner, provider-certification, renewal, replacement, and abuse-reporting routes. The automated link audit returns 403 watch for Mass.gov pages, but search indexing confirms the official pages are present: `https://www.mass.gov/how-to/apply-for-a-disability-placard-or-license-plate`, `https://www.mass.gov/disability-plates-and-placards`, `https://www.mass.gov/info-details/eligibility-for-disability-plates-and-placards`, `https://www.mass.gov/how-to/renew-your-temporary-disability-placard`, `https://www.mass.gov/how-to/replace-your-disability-placard`, `https://www.mass.gov/how-to/report-disability-parking-abuse`, and `https://www.mass.gov/doc/application-for-disabled-parking/download`.
- Washington DOL disabled parking pages and forms support the permanent / temporary / organizational split, vehicle-owner requirement for plates/tabs, original prescription / electronic authorization route, vehicle licensing office / mail submission, 5-year permanent placard renewal, replacement, and misuse warnings: `https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits`, `https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits/disabled-parking-eligibility`, `https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits/using-disabled-parking`, `https://dol.wa.gov/forms/view/420073/download?inline=`, and `https://dol.wa.gov/forms/view/420076/download?inline=`.
- Virginia DMV disability pages and MED 10 support the parking-placard / plate program, application, plate assistance, renewal / replacement, privileges, placard and plate descriptions, and customer-assistance routing: `https://www.dmv.virginia.gov/licenses-ids/disability`, `https://www.dmv.virginia.gov/licenses-ids/disability/apply-assist`, `https://www.dmv.virginia.gov/licenses-ids/disability/plates-assist`, `https://www.dmv.virginia.gov/licenses-ids/disability/renewal`, `https://www.dmv.virginia.gov/licenses-ids/disability/rights`, `https://www.dmv.virginia.gov/licenses-ids/disability/descrip`, and `https://www.dmv.virginia.gov/sites/default/files/forms/med10.pdf`.
- Federal sources support the national layer: ADA.gov explains accessible parking spaces, access aisles, van-accessible spaces, and facility obligations; USA.gov provides the state motor-vehicle-services directory for state-specific follow-up: `https://www.ada.gov/resources/restriping-parking-spaces/` and `https://www.usa.gov/state-motor-vehicle-services`.

Scope:

- Added the new cross-state topic `/topics/disabled-parking-placard-plates/` with title "残疾人停车 placard、disabled plates 和临时停车证怎么申请".
- The topic explains placard vs disabled plate / tab, permanent vs temporary permit, travel / visitor permits, medical-provider certification, dependent / caregiver use, vehicle-owner requirements, local-government vs DMV routing, replacement, renewal, address changes, cross-state use, meter / curb / campus / airport cautions, access-aisle limits, misuse, and disabled-veteran plate nuance.
- Added five FAQ entries covering placard vs plate choice, out-of-state placard use, family-member misuse, temporary medical conditions, and disabled veteran plate parking privileges.
- Added 44 official sources and 8 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "残疾停车牌" task entry and updated README from 24 to 25 cross-state topics.
- Homepage content-resource count now resolves to 138 pages; build page count is 148.

Status:

- Content audit checked 50 states and 25 topics: 0 errors.
- Build generated 148 static pages.
- SEO audit checked 148 HTML pages, 100 state content pages, and 25 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 44 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, local-government vs DMV nuance, placard-follows-person warning, disabled veteran / ISA nuance, access-aisle limitation, cross-state / local-rule caution, misuse FAQ, homepage task entry, 138-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/disabled-parking-placard-plates/`.
- Official link audit checked 530 official URLs: 403 OK, 127 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.

## Round 52 Changes

Date: 2026-07-10

### State ID / Non-Driver ID / REAL ID ID Card Topic

Source scan:

- Federal sources support the national travel layer: DHS REAL ID, TSA identification, and USA.gov state motor-vehicle-services pages anchor the distinction between state credentials, REAL ID use, passport alternatives, and state-specific follow-up: `https://www.dhs.gov/real-id`, `https://www.tsa.gov/travel/security-screening/identification`, and `https://www.usa.gov/state-motor-vehicle-services`.
- California DMV ID Card, DL/ID Online Application, and REAL ID pages support the core distinction that an ID card proves identity or age but does not authorize driving, plus the REAL ID / standard ID split, online application start, office visit, mail timing, senior ID, reduced-fee, and no-fee paths: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/`, `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl-44/`, and `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/`.
- NY DMV non-driver ID pages support non-driver ID eligibility, office application, lawful-status note, exchange from a New York license or permit, renewal window, replacement limits, and mobile ID as a companion to the physical credential: `https://dmv.ny.gov/non-driver-id-card`, `https://dmv.ny.gov/non-driver-id/get-a-non-driver-id`, `https://dmv.ny.gov/non-driver-id/exchange-driver-license-non-driver-id`, `https://dmv.ny.gov/non-driver-id/renew-a-non-driver-id`, and `https://dmv.ny.gov/non-driver-id/replace-a-non-driver-id`.
- Texas DPS sources support the Texas ID-card workflow, required proof groups, appointment / application steps, temporary ID, mail timing, replacement path, and the rule that a person with a driver license is generally not eligible for an ID card unless surrendering the license under the stated path: `https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card`, `https://www.dps.texas.gov/section/driver-license/identification-requirements`, and `https://www.dps.texas.gov/section/driver-license/replace-your-driver-license-commercial-driver-license-or-id-card`.
- FLHSMV driver license / ID card, What to Bring, REAL ID, and renew-or-replace pages support Florida's shared document checklist for licenses and ID cards, REAL ID star framing, first in-office proof requirements, domestic-air-travel caution after May 7, 2025, and renewal / replacement routing: `https://www.flhsmv.gov/driver-licenses-id-cards/`, `https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/`, `https://www.flhsmv.gov/driver-licenses-id-cards/real-id/`, and `https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/`.
- Washington DOL sources support standard ID vs Enhanced ID, no minimum age, parent involvement for minors applying for EID, standard ID limits for border crossing, EID land/sea reentry framing, temporary ID limitation, 7-10 day mailing window, proof-of-identity routing, REAL ID page, and reduced / no-cost ID help for unhoused residents: `https://dol.wa.gov/id-cards/get-id-card`, `https://dol.wa.gov/driver-licenses-and-permits/documents-proof-identity`, `https://dol.wa.gov/id-cards/real-id`, `https://dol.wa.gov/id-cards/enhanced-id-card-eid/get-enhanced-id-card-eid`, and `https://dol.wa.gov/id-cards/id-help-unhoused`.
- Pennsylvania Photo ID, renew, replace, and REAL ID pages support the age-10 resident rule, photo ID as non-license ID, form / proof / Social Security / address / fee workflow, free-ID route for people experiencing homelessness, and REAL ID cross-link: `https://www.pa.gov/services/dmv/get-a-photo-id`, `https://www.pa.gov/services/dmv/renew-a-photo-id`, `https://www.pa.gov/services/dmv/replace-a-photo-id`, and `https://www.pa.gov/agencies/dmv/driver-services/real-id`.
- Virginia DMV adult / child ID, replacement, and REAL ID pages support the rule that a Virginia resident may hold either a driver license or an ID card but not both, exchange / surrender handling, document groups, original-document caution, validity, USPS non-forwarding caution, child ID, and REAL ID in-person document verification: `https://www.dmv.virginia.gov/licenses-ids/id-cards/get-id`, `https://www.dmv.virginia.gov/licenses-ids/id-cards/adult-id`, `https://www.dmv.virginia.gov/licenses-ids/id-cards/child-id`, `https://www.dmv.virginia.gov/licenses-ids/id-cards/replacement-id`, and `https://www.dmv.virginia.gov/licenses-ids/real-id`.
- Georgia DDS sources support Georgia State ID application, identity / residency / citizenship or lawful-presence proof groups, full SSN on the application, two residency documents, P.O. Box limitation, and non-US-citizen follow-up: `https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-id-card`, `https://dds.georgia.gov/georgia-licenseid/new-licenseid/apply-id-card`, and `https://dds.georgia.gov/georgia-licenseid/real-id`.
- New Jersey MVC sources support non-driver ID framing, 6 Points of ID, application form BA-208, and replacement handling: `https://www.nj.gov/mvc/license/nondriverid.htm`, `https://www.nj.gov/mvc/license/6pointid.htm`, `https://www.nj.gov/mvc/pdf/license/BA-208.pdf`, and `https://www.nj.gov/mvc/license/liclost.htm`.
- Massachusetts RMV sources support Mass ID application, RMV-issued ID-card framing, document requirements, appointment / service-center workflow, and fee framing. The automated link audit returns 403 watch for Mass.gov pages, but search indexing confirms the official pages are present: `https://www.mass.gov/how-to/apply-for-a-massachusetts-identification-card-mass-id`, `https://www.mass.gov/rmv-issued-identification-cards`, and `https://www.mass.gov/info-details/massachusetts-identification-id-requirements`.

Scope:

- Added the new cross-state topic `/topics/state-id-non-driver-id-real-id-card/` with title "不考驾照，只办 State ID / non-driver ID 怎么准备".
- The topic explains State ID / non-driver ID as an identity credential, not a driving privilege; standard ID vs REAL ID ID card; Enhanced ID / EID; passport and TSA alternatives; mobile ID as a companion credential; age rules; lawful-status / SSN / residency / name-change document groups; driver-license surrender / exchange issues; temporary ID and mail timing; reduced-fee / no-fee / unhoused programs; and when to choose a driver license instead.
- Added five FAQ entries covering whether a person can apply without taking a driving test, whether a State ID can be used for domestic flights, whether a person can hold a driver license and ID card at the same time, whether a mobile ID replaces the physical card, and whether people without bills or stable housing can still apply.
- Added 42 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/document-rules/`, the document-rule directory.
- Added a homepage "只办州 ID" task entry and updated README from 25 to 26 cross-state topics.
- Replaced two migrated / dead official URLs found by the link audit: Tennessee's old REAL ID page now uses `https://www.tn.gov/safety/driver-services/helpful-information/real-id.html`; NY DMV's old exchange-license-for-non-driver-ID page now uses `https://dmv.ny.gov/non-driver-id/exchange-driver-license-non-driver-id`.
- Homepage content-resource count now resolves to 139 pages; build page count is 149.

Status:

- Content audit checked 50 states and 26 topics: 0 errors.
- Build generated 149 static pages.
- SEO audit checked 149 HTML pages, 100 state content pages, and 26 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 42 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, document-rules directory sidebar link, identity-not-driving warning, REAL ID ID-card distinction, Enhanced ID / Mobile ID cues, Texas / Virginia surrender nuance, temporary ID and unhoused-program cues, homepage task entry, 139-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/state-id-non-driver-id-real-id-card/`.
- Official link audit checked 557 official URLs: 414 OK, 143 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.

## Round 53 Changes

Date: 2026-07-10

### Gift / Inherited Vehicle / Deceased Owner Title Transfer Topic

Source scan:

- Federal / directory source: USA.gov state motor vehicle services anchors the need to return to each state vehicle agency for title, registration, and plate rules: `https://www.usa.gov/state-motor-vehicle-services`.
- California DMV title-transfer, deceased-person, transfer-on-death beneficiary, REG 256, and REG 227 sources support the California-specific distinctions among family transfer, gift, inheritance, TOD beneficiary, statement of facts, duplicate title, and transfer-without-standard-title handling: `https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/`, `https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/special-circumstances/handling-a-deceased-persons-dmv-matters/`, `https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/transfers/transfer-on-death-tod-beneficiary/`, `https://dmv.ca.gov/portal/file/statement-of-facts-reg-256-pdf/`, and `https://dmv.ca.gov/portal/form/application-for-duplicate-or-transfer-of-title-reg-227`.
- NY DMV vehicle ownership and deceased-family-member sources support the New York split between ordinary ownership transfer, deceased owner transfer, surviving spouse, minor child, next of kin, executor / administrator, and official MV-843 / MV-349 / MV-349.1 form paths: `https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership`, `https://dmv.ny.gov/more-info/if-a-family-member-has-passed-away`, `https://dmv.ny.gov/forms/mv843.pdf`, `https://dmv.ny.gov/forms/mv349.pdf`, and `https://dmv.ny.gov/forms/mv3491.pdf`.
- Texas DMV probate FAQ, heirship affidavit, gift affidavit, beneficiary designation, and county-tax-office sources support the Texas workflow for title transfers after death, gift transfer tax form routing, beneficiary designation, and county-level title submission: `https://www.txdmv.gov/faqs?field_faq_category_target_id=All&find=probate`, `https://www.txdmv.gov/sites/default/files/form_files/VTR-262.pdf`, `https://www.txdmv.gov/sites/default/files/form_files/14-317.pdf`, `https://www.txdmv.gov/sites/default/files/form_files/VTR-121.pdf`, and `https://www.txdmv.gov/tax-assessor-collectors/county-tax-offices`.
- Washington DOL buy-and-register, use tax, release-of-interest, affidavit-of-inheritance, and vehicle-title-application sources support the gift / use-tax caution, inherited-vehicle paperwork, title application, and loss / release-of-interest handling: `https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle`, `https://dol.wa.gov/vehicles-and-boats/vehicles/taxes-and-fees/use-tax`, `https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs/affidavit-lossrelease-interest`, `https://dol.wa.gov/forms/view/420041/download?inline=`, and `https://dol.wa.gov/forms/view/420001/download?inline=`.
- FLHSMV liens-and-titles, FAQ, HSMV 82040, HSMV 82152, TL-08, and HSMV 82050 sources support Florida title application, surviving-spouse title transfer, lien / duplicate title routing, sales/use-tax transfer cautions, and notice-of-sale / bill-of-sale separation: `https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/`, `https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/faqs/`, `https://www.flhsmv.gov/pdf/forms/82040.pdf`, `https://www.flhsmv.gov/pdf/forms/82152.pdf`, `https://www.flhsmv.gov/pdf/proc/tl/tl-08.pdf`, and `https://www.flhsmv.gov/pdf/forms/82050.pdf`.
- PennDOT and Pennsylvania Revenue sources support the ordinary buying / selling path, vehicle transfer after death, MV-39 deceased-owner transfer, MV-13ST gift affidavit, title fee / plate-transfer nuance, and the warning that a claimed gift with assumed debt may still have taxable value: `https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle`, `https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-fact-sheets/fs-vehtrans.pdf`, `https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-39.pdf`, `https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-13st.pdf`, and `https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/motor-vehicle-understated-value-program`.
- Virginia DMV transfer-ownership, transfer-registration, beneficiary-designation, family guide, and VSA 24 sources support the distinction between vehicle ownership/title transfer, registration transfer, beneficiary title designation, surviving family workflows, and certification authority to transfer title: `https://www.dmv.virginia.gov/records/family-deceased/transfer-ownership`, `https://www.dmv.virginia.gov/records/family-deceased/transfer-registration`, `https://www.dmv.virginia.gov/vehicles/title/designative-beneficiary`, `https://www.dmv.virginia.gov/sites/default/files/forms/dmv105.pdf`, and `https://www.dmv.virginia.gov/sites/default/files/forms/vsa24.pdf`.
- New Jersey MVC ownership-transfer, tax-exempt, beneficiary-transfer, and FAQ sources support gifting, sales-tax exemption, TOD beneficiary, lien caution, and Vehicle Center routing: `https://www.nj.gov/mvc/vehicles/transowner.htm`, `https://www.nj.gov/mvc/vehicletopics/taxexempt.htm`, `https://www.nj.gov/mvc/pdf/vehicles/beneficiary_transfer_form.pdf`, and `https://nj.gov/mvc/about/faq.htm`.
- Massachusetts RMV / DOR sources support surviving spouse / heirship / inheritance, family / gift transfers, affidavit of surviving spouse, and MVU-26 family transfer exemption. The automated link audit returns 403 watch for Mass.gov pages, consistent with the existing Mass.gov automation-blocking pattern: `https://www.mass.gov/info-details/surviving-spouseheirshipinheritance`, `https://www.mass.gov/info-details/familygift-transfers`, `https://www.mass.gov/doc/affidavit-of-surviving-spouse/download`, and `https://www.mass.gov/doc/form-mvu-26-affidavit-in-support-of-a-claim-for-exemption-from-sales-or-use-tax-for-a-motor-vehicle-transferred-within-a-family/download`.
- Georgia DOR ownership-transfer, estate / inheritance, Georgia-title transfer, T-20 affidavit of inheritance, joint ownership / joint tenants, and MV-1 title application sources support Georgia-specific warnings that an inherited vehicle may need to be titled to the heir before it can be sold, plus tag-office, inheritance-affidavit, replacement-title, survivorship, and application routing: `https://dor.georgia.gov/how-do-i-transfer-ownership-vehicle`, `https://dor.georgia.gov/vehicle-inherited-or-purchased-estate`, `https://dor.georgia.gov/transfer-vehicle-titled-georgia`, `https://dor.georgia.gov/document/form/form-t-20-affidavit-inheritance/download`, `https://dor.georgia.gov/title-application-disclosing-joint-ownership-or-joint-tenants`, and `https://dor.georgia.gov/mv-1-dor-motor-vehicle-titletag-application`.

Scope:

- Added the new cross-state topic `/topics/gift-inherited-vehicle-title-transfer/` with title "亲属赠车、继承车辆和车主去世后，title 怎么转".
- The topic explains gift, family transfer, deceased-owner transfer, estate / probate, executor / administrator, heirship, surviving spouse, minor child, TOD beneficiary, joint owner survivorship, duplicate title, lien release, odometer disclosure, tax exemption / use tax, registration, plates, and insurance as separate decision points.
- Added five FAQ entries covering whether writing "gift" on title is enough, whether heirs can sell before DMV title transfer, how two-owner title wording changes the process, lien / loan handling, and whether registration / plates can continue after death.
- Added 51 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "赠车 / 继承车" task entry and updated README from 26 to 27 cross-state topics.
- Increased the official-link audit owner attribution window from 260 to 900 lines so long source lists remain attributed to their topic instead of showing `unknown` in the audit table.
- Homepage content-resource count now resolves to 140 pages; build page count is 150.

Status:

- Content audit checked 50 states and 27 topics: 0 errors.
- Build generated 150 static pages.
- SEO audit checked 150 HTML pages, 100 state content pages, and 27 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 51 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, gift / tax nuance, death-owner authority-to-sign warning, TOD beneficiary distinction, lien / duplicate-title cues, registration / plate / insurance split, homepage task entry, 140-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/gift-inherited-vehicle-title-transfer/`.
- Official link audit checked 601 official URLs: 461 OK, 140 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.

## Round 54 Changes

Date: 2026-07-10

### Teen Driver Permit / Parent Consent / GDL Topic

Source scan:

- Federal source: NHTSA Teen Driving supports the national frame that teen driving safety and Graduated Driver Licensing are state-specific, and that parents should understand the state GDL law and set rules for new teen drivers: `https://www.nhtsa.gov/road-safety/teen-driving`.
- California DMV learner permit, driver license, handbook, driver training school, teen roadmap, and parent/teen training guide sources support the California examples for age 15 1/2, parent/guardian application signature, driver education / driver training, permit holding, 50 practice hours, 10 night hours, 25+ supervising driver for minors, and parent training guidance: `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/`, `https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/`, `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/getting-an-instruction-permit-and-drivers-license/`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/driver-training-schools/`, `https://www.dmv.ca.gov/portal/teen-drivers/`, and `https://www.dmv.ca.gov/portal/uploads/2020/06/dl603_compressed.pdf`.
- NY DMV learner permit, permit restrictions, Graduated License Law, younger-driver resources, and out-of-state-permit pages support the New York examples for age 16, 21+ supervising driver, under-18 GDL phases, region-specific restrictions, and out-of-state permit cautions: `https://dmv.ny.gov/driver-license/get-learner-permit`, `https://dmv.ny.gov/driver-license/learner-permit-restrictions`, `https://dmv.ny.gov/driver-license/younger-driver/the-graduated-license-law`, `https://dmv.ny.gov/driver-license/younger-driver`, and `https://dmv.ny.gov/driver-license/younger-driver/drive-in-new-york-state-with-an-out-of-state-permit`.
- Texas DPS teen learner, teen provisional, GDL / hardship, Impact Texas Drivers, and driver education course sources support the Texas examples for learner license, provisional license, six-month holding period, teen driver education, ITTD / ITAD distinction, and minor driver education choices: `https://www.dps.texas.gov/section/driver-license/texas-learners-license-teen`, `https://www.dps.texas.gov/section/driver-license/texas-provisional-license-teen`, `https://www.dps.texas.gov/section/driver-license/graduated-driver-license-gdl-and-hardship-license`, `https://www.dps.texas.gov/section/driver-license/impact-texas-drivers-itd-program`, and `https://www.dps.texas.gov/section/driver-license/choosing-driver-education-course`.
- FLHSMV teen licensing, traffic laws, Class E exam, forms, FAQ, and teen-driver safety pages support Florida examples for age 15 learner license, notarized parental consent under 18, DETS / TLSAE, vision / hearing, Class E knowledge test, 12-month learner period, 50 practice hours, 10 night hours, road-test vehicle registration / insurance / inspection, and age 16 / 17 curfews: `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/`, `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/traffic-laws-florida-teens/`, `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/`, `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/required-forms-teens/`, `https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/frequently-asked-questions/`, and `https://www.flhsmv.gov/safety-center/driving-safety/teen-drivers/`.
- Washington DOL first-license, ages 16-17, driver guide, fees, and pre-apply pages support Washington examples for approved driver training, learner permit, 40 daylight / 10 night hours, no online self-paced or parent-taught courses, out-of-state traffic-safety-education review, parent online permission / notarized affidavit, and temporary-license limits: `https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit`, `https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-16-17`, `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides/washington-state-driver-guide-text-only`, `https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-fees`, and `https://dol.wa.gov/pre-apply-online`.
- New Jersey MVC first-license, GDL, testing, fee, supervised-driving certification, and 2025 announcement sources support New Jersey examples for special learner permit age 16, GDL permit / probationary stages, under-21 decal requirements, passenger / night / phone restrictions, permit fees, and the 50-hour / 10-darkness supervised-driving certification implemented in 2025: `https://www.nj.gov/mvc/license/firstlic.htm`, `https://www.nj.gov/mvc/about/gdlsafety.htm`, `https://www.nj.gov/mvc/license/testprep.htm`, `https://www.nj.gov/mvc/license/licfees.htm`, `https://www.nj.gov/mvc/pdf/license/BA-CSD.pdf`, and `https://nj.gov/mvc/press/archives/2025/01312025.htm`.
- PennDOT teen-driver, learner-permit, driver-license, young-driver, driver manual, and junior permit guide sources support Pennsylvania examples for age 16 learner permit, DL-180 / DL-180TD, health care provider section, junior driver's license, 65 supervised hours, junior-to-senior upgrade, young-driver suspensions, and approved driver training: `https://www.pa.gov/agencies/dmv/driver-services/teen-drivers`, `https://www.pa.gov/services/dmv/get-a-learners-permit`, `https://www.pa.gov/services/dmv/get-a-driver-license`, `https://www.pa.gov/agencies/penndot/traveling-in-pa/safety/traffic-safety-driver-topics/young-driver`, `https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit`, and `https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bdl/bdl-publications/pub%20178.pdf`.
- Virginia DMV learner permit, driver education, teen resources, restrictions, homeschool, and driver training school sources support Virginia examples for age 15 years 6 months, parent / guardian consent, 21+ supervising driver or 18+ guardian / sibling, under-18 driver education, 9-month permit holding, 45 practice hours, 15 after sunset, 90-minute parent / teen course, and 2027 first-time-driver requirement changes: `https://www.dmv.virginia.gov/licenses-ids/learners/apply`, `https://www.dmv.virginia.gov/licenses-ids/learners/ed-reqs`, `https://www.dmv.virginia.gov/licenses-ids/learners/teen`, `https://www.dmv.virginia.gov/licenses-ids/learners/restrictions`, `https://www.dmv.virginia.gov/licenses-ids/learners/homeschool`, and `https://www.dmv.virginia.gov/licenses-ids/training/driver-training-schools`.
- Georgia DDS teen-driver, learner-permit, Class D, Joshua's Law, teen-driving FAQ, and driver-education FAQ sources support Georgia examples for TADRA, Class CP at 15, Class D at 16 / 17 after 1 year and 1 day, Joshua's Law, 30 classroom hours, 6 behind-the-wheel or Parent/Teen Guide options, 40 supervised hours, 6 night hours, school enrollment, curfew, passenger restrictions, and out-of-state course caution: `https://dds.georgia.gov/teen-drivers`, `https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-learners-permit`, `https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-class-d`, `https://dds.georgia.gov/georgia-licenseid/new-licenseid/joshuas-law-requirements`, `https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/teen-driving-laws-faqs`, and `https://dds.georgia.gov/driver-education-faqs`.
- Massachusetts RMV teen-driver, JOL requirements, learner-permit, driver education, road-test, and JOL-violation sources support Massachusetts examples for learner permit at 16, Junior Operator License rules, adult supervisor requirements, driver education program, passenger road-test requirements, and stricter junior operator violation consequences. The automated link audit returns 403 watch for Mass.gov pages, consistent with the existing Mass.gov automation-blocking pattern: `https://www.mass.gov/info-details/teen-drivers`, `https://www.mass.gov/info-details/junior-operator-license-jol-requirements`, `https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit`, `https://www.mass.gov/info-details/drivers-education-programs`, `https://www.mass.gov/info-details/passenger-class-d-road-tests`, and `https://www.mass.gov/info-details/junior-operator-violations`.

Scope:

- Added the new cross-state topic `/topics/teen-driver-permit-gdl-parent-guide/` with title "未成年人考驾照：parent consent、driver education 和 GDL 限制怎么准备".
- The topic explains teen permit age, parent / guardian consent, official driver education, supervised practice hours, night-driving hours, permit holding periods, road-test vehicle / insurance requirements, GDL restrictions, curfews, passenger limits, decals, phone restrictions, out-of-state permit / course transfer, and violations as separate decision points.
- Added five FAQ entries covering whether a 15-year-old can start, whether parent-taught driving can replace a driving school, whether practice hours should be logged, whether a provisional / junior / probationary license is unrestricted, and whether out-of-state permits or driver education can transfer after a move.
- Added 58 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/tests-permits/`, the permit / test / road-test directory.
- Added a homepage "青少年驾照" task entry and updated README from 27 to 28 cross-state topics.
- Homepage content-resource count now resolves to 141 pages; build page count is 151.

Status:

- Content audit checked 50 states and 28 topics: 0 errors.
- Build generated 151 static pages.
- SEO audit checked 151 HTML pages, 100 state content pages, and 28 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 58 official sources, 5 FAQ items, WebSite / Article / FAQPage / BreadcrumbList schema, tests-permits directory sidebar link, parent-consent cue, official-driver-education cue, supervised-hours cue, GDL restriction cue, out-of-state permit/course transfer cue, homepage task entry, 141-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/teen-driver-permit-gdl-parent-guide/`.
- Official link audit checked 653 official URLs: 509 OK, 144 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.

## Round 55 Changes

Date: 2026-07-10

### Older Driver Renewal / Vision / Medical Review Topic

Source scan:

- Federal sources: NHTSA older-driver materials support the national frame that safe-driving decisions should focus on vision, physical fitness, reflexes, medical conditions, medications, attention, reaction time, family conversation, vehicle adaptation, and transportation alternatives rather than age alone: `https://www.nhtsa.gov/road-safety/older-drivers`, `https://www.nhtsa.gov/older-drivers/driving-safely-while-aging-gracefully`, and `https://www.nhtsa.gov/older-drivers/how-understand-and-influence-older-drivers`.
- California DMV senior-driver, driver-safety, medical-condition, dementia, deteriorated-driving-skill, handbook, and DS-326 sources support the California distinctions among senior resources, medical / mental / physical conditions, driver reexamination, Supplemental Driving Performance Evaluation, Area Driving Performance Evaluation, restrictions, and medical evaluation forms: `https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/senior-drivers/`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/maintaining-driving-independence-and-safety/`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/deteriorated-driving-skill/`, `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/seniors-and-driving/`, `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/driver-safety/`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/medical-conditions-and-driving/`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/medical-conditions-and-driving/dementia/`, and `https://www.dmv.ca.gov/portal/uploads/2020/06/DS326.pdf`.
- New York DMV older-driver, renewal, vision, online-vision-registry, medical-review, medical-condition reporting, re-evaluation, and DS-7 sources support the New York examples for renewal timing, vision requirements, physician reports, non-medical reports, age-alone caution, evaluation interview, eye / written / road tests, and possible suspension or revocation: `https://dmv.ny.gov/driver-license/older-driver/driving`, `https://dmv.ny.gov/driver-license/renew-a-driver-license`, `https://dmv.ny.gov/driver-license/vision-requirements-and-restrictions`, `https://dmv.ny.gov/driver-license/online-vision-registry`, `https://dmv.ny.gov/driver-license/dmv-medical-review-program`, `https://dmv.ny.gov/report-a-medical-condition`, `https://dmv.ny.gov/driver-re-evaluation-program`, and `https://dmv.ny.gov/forms/ds7.pdf`.
- Texas DPS senior-driver, medical-evaluation, Medical Advisory Board FAQ, and DL-76 sources support the Texas examples for age-79-or-older in-person renewal, medical evaluation, physician questionnaire, and examination request routing. The automated link audit returns `000` watch for Texas DPS pages, consistent with the existing Texas automated-access pattern: `https://www.dps.texas.gov/section/driver-license/senior-drivers-age-79-or-older`, `https://www.dps.texas.gov/section/driver-license/texas-medical-evaluation-process-driver-licensing`, `https://www.dps.texas.gov/section/driver-license/faq/section-11-medical-advisory-board-mab`, and `https://www.dps.texas.gov/internetforms/Forms/DL-76.pdf`.
- Florida FLHSMV older-driver renewal, vision standards, forms, medical-review, review-process, FAQ, and HSMV 72119 sources support the Florida examples for Class E renewal cycles, age-80 vision testing, Mature Driver Vision Test form, eye-specialist referral, medical review not being age-based, reporting concerns, and Medical Review decision flow: `https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/driver-license-renewal-requirements-options-older-drivers/`, `https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/vision-standards/`, `https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/forms-for-older-drivers/`, `https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/`, `https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/the-medical-review-process/`, `https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/medical-review-frequently-asked-questions/`, and `https://www.flhsmv.gov/pdf/forms/72119.pdf`.
- Washington DOL unsafe-driver and driver-guide sources support the Washington examples for specific personal-observation reports, age not being a factor, medical / vision certificate requests, knowledge and skills retesting, adaptive equipment, possible cancellation, and report confidentiality limits: `https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers`, `https://dol.wa.gov/forms/view/500008/download?inline=`, and `https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides/washington-state-driver-guide-text-only`.
- New Jersey MVC concern-reporting, medical-review, process, and physician / law-enforcement reporting sources support the New Jersey examples for family / professional referrals, no anonymous reports, physician reporting duties for recurrent seizure / unconsciousness / motor-coordination impairment, Medical Review Unit screening, physician forms, and possible restrictions: `https://www.nj.gov/mvc/drivertopics/reportconcern.htm`, `https://www.nj.gov/mvc/drivertopics/medwhy.htm`, `https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm`, and `https://www.nj.gov/mvc/drivertopics/lawmedreport.htm`.
- Pennsylvania PennDOT mature-driver, medical-reporting, FAQ, drivers-and-families, medically-impaired-driver-law, and older-driver-safety sources support the Pennsylvania examples for mature-driver resources, mandatory health-care-personnel reporting, medical criteria, driver/family resources, and older-driver safety guidance: `https://www.pa.gov/agencies/dmv/driver-services/mature-drivers`, `https://www.pa.gov/agencies/dmv/resources/medical-reporting`, `https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/medical-reporting-faqs`, `https://www.pa.gov/agencies/dmv/resources/medical-reporting/pa-drivers-and-families`, `https://www.pa.gov/agencies/dmv/resources/laws-and-regulations/medically-impaired-driver-law`, and `https://www.pa.gov/agencies/penndot/traveling-in-pa/safety/traffic-safety-driver-topics/older-driver`.
- Virginia DMV mature-driver, mature-driver-safety, impaired-driver, medical-review, restriction, vision, and cognitive-impairment sources support the Virginia examples for age-75 in-person renewal / vision screening, Medical Review Services, medical / visual conditions, MED forms, driver rehabilitation, knowledge / road skills testing, special restrictions, vision rules, and cognitive impairment policy: `https://www.dmv.virginia.gov/licenses-ids/mature`, `https://www.dmv.virginia.gov/safety/programs/mature-driver`, `https://www.dmv.virginia.gov/licenses-ids/license/medical/impaired-hp`, `https://www.dmv.virginia.gov/licenses-ids/license/medical/review`, `https://www.dmv.virginia.gov/licenses-ids/license/medical/spec-restrict`, `https://www.dmv.virginia.gov/licenses-ids/license/medical/vision`, and `https://www.dmv.virginia.gov/licenses-ids/license/medical/cognitive`.
- Georgia DDS drivers-64-and-over, medical-review-process, DDS-270, and test/exam sources support the Georgia examples for age-64 vision screening at every renewal, minimum non-commercial vision standard, Request for Driver Review, medical / vision forms, 30-day compliance warning, retesting, Medical Advisory Board review, and driver rehabilitation evaluation: `https://dds.georgia.gov/georgia-licenseid/drivers-64-and-over`, `https://dds.georgia.gov/medical-review-process`, `https://dds.georgia.gov/document/document/request-driver-review-dds-270/download`, and `https://dds.georgia.gov/testing-and-training/test-and-exams-information`.
- Massachusetts RMV older-driver, medically-impaired-driver reporting, Class D/M medical standards, Your Health and Driving Safely, and RMV forms sources support the Massachusetts examples for older-driver resources, self-reporting / medical standards, Request for Medical Evaluation, medical-condition reporting, and form routing. The automated link audit returns 403 watch for Mass.gov pages, consistent with the existing Mass.gov automation-blocking pattern: `https://www.mass.gov/info-details/massachusetts-rmv-information-for-older-drivers`, `https://www.mass.gov/how-to/report-a-medically-impaired-driver`, `https://www.mass.gov/info-details/medical-standards-for-passenger-class-d-and-motorcycle-class-m-drivers-licenses`, `https://www.mass.gov/doc/your-health-and-driving-safely-0/download`, and `https://www.mass.gov/lists/rmv-forms-and-applications`.

Scope:

- Added the new cross-state topic `/topics/older-driver-license-renewal-medical-review/` with title "老人/高龄驾驶人续驾照、视力测试和医疗审查怎么处理".
- The topic explains older / mature driver renewal, age-triggered vision rules, medical review, driver re-evaluation, unsafe-driver reporting, doctor / health-care mandatory reporting, family concerns, confidentiality differences, road skills tests, restrictions, State ID alternatives, and deadline risk as separate decision points.
- Added five FAQ entries covering age-alone suspension myths, family unsafe-driver reports, physician reports, vision-test failure, and how to respond to a medical review / re-evaluation letter.
- Added 59 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "高龄驾驶" task entry and updated README from 28 to 29 cross-state topics.
- Homepage content-resource count now resolves to 142 pages; build page count is 152.

Status:

- Content audit checked 50 states and 29 topics: 0 errors.
- Build generated 152 static pages.
- SEO audit checked 152 HTML pages, 100 state content pages, and 29 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 59 official sources, 5 FAQ schema items, 5 visible FAQ questions, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, age-alone cue, vision cue, medical-review cue, family / unsafe-driver cue, 64 / 75 / 80 age-threshold cues, road-skills-test cue, homepage task entry, 142-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/older-driver-license-renewal-medical-review/`.
- Official link audit checked 709 official URLs: 551 OK, 158 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.

## Round 56 Changes

Date: 2026-07-10

### Driving Record / Points / Traffic School Topic

Source scan:

- California DMV and California Courts sources support the page's distinction between online driver record requests, reportable convictions / departmental actions / accidents, traffic school eligibility, 18-month traffic school timing, negligent-operator point thresholds, and NOTS hearing routing: `https://www.dmv.ca.gov/portal/customer-service/records-request/online-driver-record-request/`, `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/laws-and-rules-of-the-road-cont2/`, `https://www.dmv.ca.gov/portal/vehicle-industry-services/occupational-licensing/occupational-license-lookup/traffic-school-list/`, `https://selfhelp.courts.ca.gov/traffic/traffic-school`, `https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/negligence/negligent-operator-actions/`, and `https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/negligence/negligent-operator-treatment-system-nots-hearings/`.
- New York DMV sources support the driving-record abstract / lifetime record distinction, Driver Responsibility Assessment risk, PIRP point-reduction limits, insurance-reduction rules, course-sponsor routing, and online / alternative course delivery options: `https://dmv.ny.gov/records/get-my-own-driving-record-abstract`, `https://dmv.ny.gov/driver-license-points-and-penalties`, `https://dmv.ny.gov/points-and-penalties/point-and-insurance-reduction-program`, `https://dmv.ny.gov/points-and-penalties/pirp-and-ipirp`, and `https://dmv.ny.gov/points-and-penalties/online-and-alternative-delivery-method-courses`.
- Texas DPS / Texas.gov sources support the record-type warning, especially Type 3A for defensive driving, plus the warning that the old Driver Responsibility Program / surcharge-point logic is obsolete after repeal: `https://www.dps.texas.gov/section/driver-license/how-order-driver-record`, `https://txapps.texas.gov/tolapp/txldrcdr/TXDPSLicenseeManager`, `https://txapps.texas.gov/apps/dps/txldr/html/faq.html`, `https://txapps.texas.gov/apps/dps/txldr/html/recordTypes.html`, `https://www.dps.texas.gov/section/driver-license/driver-responsibility-program`, `https://www.dps.texas.gov/news/driver-responsibility-program-repealed`, and `https://www.dps.texas.gov/section/driver-license/faq/driver-responsibility-program-surcharge-repeal-faqs`.
- Florida FLHSMV sources support the distinction between driving records, point suspensions, BDI / driver improvement school election, electronic course reporting, out-of-state citation caution, and completion checks: `https://www.flhsmv.gov/driver-licenses-id-cards/general-information/questions-about-driving-records/`, `https://www.flhsmv.gov/driver-licenses-id-cards/driving-record-history/`, `https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/points-point-suspensions/`, `https://www.flhsmv.gov/driver-licenses-id-cards/education-courses/driver-improvement-schools/`, `https://www.flhsmv.gov/driver-licenses-id-cards/education-courses/`, and `https://services.flhsmv.gov/trafficschoolcompletioncheck/studentsearchpage.aspx`.
- Washington DOL, New Jersey MVC, PennDOT, Virginia DMV, Georgia DDS, and Mass.gov sources support additional cross-state examples for MVR / abstract types, employer / insurance records, point thresholds, driver-improvement clinics, safe driving points, defensive-driving point reduction, SDIP / surcharge points, and reinstatement-class routing: `https://dol.wa.gov/driver-licenses-and-permits/driving-records/guide-driving-records`, `https://www.nj.gov/mvc/license/driverhist.htm`, `https://www.nj.gov/mvc/license/points-schedule.htm`, `https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/pennsylvanias-point-system`, `https://www.dmv.virginia.gov/licenses-ids/improvement`, `https://www.dmv.virginia.gov/licenses-ids/improvement/points/system`, `https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations/points-and-points-reduction`, `https://dds.georgia.gov/defensive-driving-program-faqs`, `https://www.mass.gov/how-to/request-a-driving-record`, and `https://www.mass.gov/info-details/safe-driver-insurance-plan-sdip`.

Scope:

- Added the new cross-state topic `/topics/driving-record-points-traffic-school/` with title "驾照记录、points 和 traffic school：怎么查、怎么影响保险和停牌".
- The topic explains driving record / MVR / abstract / license-status differences, DMV points versus insurance-company points, traffic school / PIRP / BDI / defensive driving / driver improvement limits, employer and insurance record types, out-of-state ticket risk, CDL / commercial-driver exceptions, and Texas Driver Responsibility Program repeal.
- Added five FAQ entries covering whether traffic school removes a ticket, which driving record / MVR to buy, DMV points versus insurance impact, out-of-state ticket effects, and CDL / commercial-driver course limits.
- Added 55 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "驾照记录 / 扣分" task entry and updated README from 29 to 30 cross-state topics.
- Homepage content-resource count now resolves to 143 pages; build page count is 153.

Status:

- Content audit checked 50 states and 30 topics: 0 errors.
- Build generated 153 static pages.
- SEO audit checked 153 HTML pages, 100 state content pages, and 30 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 55 official sources, 5 FAQ schema items, 5 visible FAQ questions, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, driving record / MVR / points / traffic school / driver improvement / insurance / employer / CDL / commercial-driver cues, Texas Driver Responsibility Program repeal cue, 18-month cue, 12 points cue, safe driving points cue, homepage task entry, 143-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/driving-record-points-traffic-school/`.
- Official link audit checked 760 official URLs: 593 OK, 167 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `fake`, `lorem`, `ipsum`, or `搜索结果`.

## Round 57 Changes

Date: 2026-07-10

### DMV Scam Text / Fake Ticket / Phishing Topic

Source scan:

- Federal sources support the general scam-reporting and recovery flow: FTC ReportFraud and spam-text guidance, FTC unpaid-toll scam guidance, IdentityTheft.gov recovery steps, FTC identity-theft reporting, FBI IC3 smishing guidance for road-toll texts, and FCC unwanted text / robocall guidance: `https://reportfraud.ftc.gov/`, `https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages`, `https://consumer.ftc.gov/consumer-alerts/2025/01/got-text-about-unpaid-tolls-its-probably-scam`, `https://www.identitytheft.gov/`, `https://www.identitytheft.gov/Info-Lost-or-Stolen`, `https://www.ftc.gov/news-events/topics/identity-theft/report-identity-theft`, `https://www.ic3.gov/PSA/2024/PSA240412`, and `https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts`.
- California DMV sources support the warnings about fraudulent toll-payment texts, REAL ID update communications, discounted-registration advertisements, and the need to avoid links requesting payment or personal / financial information: `https://www.dmv.ca.gov/portal/dmv-scam-alert/`, `https://www.dmv.ca.gov/portal/news-and-media/dmv-warns-of-fraudulent-text-scam-asking-for-toll-payments/`, `https://www.dmv.ca.gov/portal/news-and-media/dmv-notifies-customers-who-need-to-update-their-real-ids/`, `https://www.dmv.ca.gov/portal/news-and-media/news-releases/dmv-warns-of-fraudulent-advertisements-on-discounted-vehicle-registration/`, and `https://www.dmv.ca.gov/portal/customer-service/report-an-issue-or-complaint/`.
- New York DMV, Florida FLHSMV, Washington DOL, New Jersey MVC, PennDOT, Virginia DMV, Georgia DDS, TxDMV, Texas DPS, Mass.gov, Maryland MVA, and Illinois DOT sources support the state examples for copied logos / fake DMV content, toll / ticket / REAL ID / unpaid-fine text scams, no-text-payment warnings, reporting fraud, identity-theft routing, and official-entry verification: `https://dmv.ny.gov/more-info/phishing-attacks`, `https://dmv.ny.gov/more-info/phishing-examples`, `https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/`, `https://dol.wa.gov/about/privacy-center/scam-alerts`, `https://www.nj.gov/mvc/press/archives/2023/111523.htm`, `https://www.pa.gov/agencies/dmv/alerts`, `https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-text-scam`, `https://dds.georgia.gov/fake-text-scams`, `https://www.txdmv.gov/sites/default/files/body-files/2026-03-25_Beware_of_Scam_Text_Messages.pdf`, `https://www.dps.texas.gov/section/driver-license/failure-appearfailure-pay-program`, `https://www.mass.gov/news/massachusetts-rmv-cautions-public-to-beware-of-text-scams`, `https://mva.maryland.gov/privacy-security`, and `https://idot.illinois.gov/about-idot/contact-us/report-a-problem/text-scam-alert.html`.

Scope:

- Added the new cross-state topic `/topics/dmv-scam-text-fake-ticket-toll-real-id-phishing/` with title "DMV 诈骗短信、假罚单和假官网怎么识别".
- The topic explains how to identify unsolicited DMV / toll / ticket / REAL ID texts, fake payment links, copied DMV logos, third-party advertisements, urgent threats, sensitive-information requests, and the difference between DMV, court, toll agency, and official transaction platforms.
- Added five FAQ entries covering whether to click a DMV / toll text link, how to verify real tickets or tolls, whether REAL ID can be expedited by text payment, what to do after entering DL / SSN / card data, and how to think about third-party DMV websites.
- Added 44 official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "诈骗短信 / 假官网" task entry and updated README from 30 to 31 cross-state topics.
- Homepage content-resource count now resolves to 144 pages; build page count is 154.

Status:

- Content audit checked 50 states and 31 topics: 0 errors.
- Build generated 154 static pages.
- SEO audit checked 154 HTML pages, 100 state content pages, and 31 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 44 official sources, 5 FAQ schema items, 5 visible FAQ questions, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, ReportFraud / 7726 / IC3 / IdentityTheft.gov cues, unpaid toll / ticket / REAL ID / suspension / driver license number / SSN / court / toll agency cues, Georgia "State Department of Motor Vehicles" warning, homepage task entry, 144-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/dmv-scam-text-fake-ticket-toll-real-id-phishing/`.
- Official link audit checked 802 official URLs: 631 OK, 171 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `lorem`, `ipsum`, or `搜索结果`. The word `fake` is intentionally present in this scam topic slug, official source titles, and official URLs, so it is no longer a useful placeholder-scan term for this site.

## Round 58 Changes

Date: 2026-07-10

### Lost / Stolen License or ID Replacement and Identity Theft Topic

Source scan:

- Federal sources support the identity-theft recovery and travel-identification boundaries: USA.gov state motor vehicle services, IdentityTheft.gov lost / exposed information guidance, FTC identity-theft reporting, USA.gov identity-theft recovery, TSA acceptable identification, TSA forgot-ID guidance, and TSA ConfirmID: `https://www.usa.gov/state-motor-vehicle-services`, `https://www.identitytheft.gov/`, `https://www.identitytheft.gov/Info-Lost-or-Stolen`, `https://consumer.ftc.gov/identity-theft-and-online-security/identity-theft`, `https://www.ftc.gov/news-events/topics/identity-theft/report-identity-theft`, `https://www.usa.gov/identity-theft`, `https://www.tsa.gov/travel/security-screening/identification`, `https://www.tsa.gov/travel/frequently-asked-questions/i-forgot-my-identification-can-i-still-proceed-through-security`, and `https://www.tsa.gov/tsaconfirm-id`.
- California, New York, Texas, Florida, Washington, New Jersey, PennDOT, Virginia, Georgia, Mass.gov, Illinois SOS, and Maryland MVA sources support the state-by-state split between ordinary replacement / duplicate, stolen-card police-report handling, fraud / identity-theft review, address-before-replacement, temporary credential limits, REAL ID / Enhanced ID nuance, out-of-state replacement or transfer requirements, and what to do if the old credential is found later.
- The California fraud-review source was corrected during QA from a 404 page URL to the official INV 35 PDF: `https://www.dmv.ca.gov/portal/uploads/2020/07/inv35.pdf`.

Scope:

- Added the new cross-state topic `/topics/lost-stolen-license-id-replacement-identity-theft/` with title "驾照或 State ID 丢失/被盗后，补证、报案和身份盗用怎么处理".
- The topic separates ordinary lost / damaged replacement from stolen credential, identity theft, driver license fraud, address change, name / photo / legal-presence review, REAL ID / Enhanced ID upgrade, travel, mobile ID, out-of-state, and old-card disposal scenarios.
- Added five FAQ entries covering whether to file a police report, whether replacement changes the driver license number, whether a changed address can receive the replacement card, whether receipts / temporary credentials work for TSA travel, and whether a found old license can be kept as backup.
- Added 58 unique official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "驾照 / ID 丢了" task entry and updated README from 31 to 32 cross-state topics.
- Homepage content-resource count now resolves to 145 pages; build page count is 155.

Status:

- Content audit checked 50 states and 32 topics: 0 errors.
- Build generated 155 static pages.
- SEO audit checked 155 HTML pages, 100 state content pages, and 32 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 58 official sources, 5 FAQ schema items, 5 visible FAQ questions, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, replacement / duplicate / identity theft / driver license number / police report / MV-78B / fraud alert / credit freeze / IdentityTheft.gov / TSA / ConfirmID / REAL ID / Enhanced ID / mobile ID / out-of-state / MVR / destroy cues, homepage task entry, 145-page homepage count, topic index entry, sitemap entry, and corrected California INV 35 PDF source.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/lost-stolen-license-id-replacement-identity-theft/`.
- Official link audit checked 837 official URLs: 653 OK, 184 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `lorem`, `ipsum`, or `搜索结果`.

## Round 59 Changes

Date: 2026-07-10

### Lost / Stolen License Plates, Registration Card, Sticker / Decal / Tab Topic

Source scan:

- California DMV sources support the page's split between replacement plates, registration stickers, registration cards, REG 156, stolen-plate police reports, surrendering remaining plates, current-registration limits, mailed-but-not-received replacement handling, and sticker/card mailing timelines: `https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/replacement-license-plates-and-stickers/`, `https://www.dmv.ca.gov/portal/vehicle-registration/online-replacement-sticker-or-registration-card/`, `https://www.dmv.ca.gov/portal/vehicle-registration/replace-your-registration-card/`, and `https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/duplicates-and-substitutes/application-for-replacement-plates-stickers-documents-reg-156-form/`.
- New York DMV sources support the MV-78B / police-report distinction for stolen plates, registration document / windshield sticker replacement, peeling / damaged plate handling, old-plate destruction, registration status tracking, and plate surrender evidence: `https://dmv.ny.gov/plates/lost-stolen-or-destroyed-plates`, `https://dmv.ny.gov/registration/replace-registration`, `https://dmv.ny.gov/registrations`, `https://dmv.ny.gov/plates/peeling-and-damaged-license-plates`, `https://dmv.ny.gov/registration/where-is-my-registration`, and `https://dmv.ny.gov/registration/surrender-return-or-turn-in-your-vehicle-plates-and-registration`.
- Texas, Florida, Washington, New Jersey, PennDOT, Virginia, Georgia, Mass.gov, Illinois SOS, and North Carolina DMV sources support cross-state differences in VTR-60, HSMV 83146, Washington tabs, NJ lost registration / plate agency paths, PennDOT MV-44, Virginia VSA 14 / registration card replacement, Georgia MV-7, Mass.gov plate decal / replacement plate routing, Illinois replacement fees / in-person stolen-plate path, and North Carolina MVR-18 / duplicate registration card limits.

Scope:

- Added the new cross-state topic `/topics/lost-stolen-license-plates-registration-card-sticker/` with title "车牌、registration card 或 sticker 丢失/被盗后怎么补办".
- The topic explains the difference between license plate, registration card, windshield sticker, sticker / decal / tab, inspection sticker, title, disabled placard, temporary permit, police report, toll / parking / insurance hold, and plate surrender / destruction evidence.
- Added five FAQ entries covering whether stolen plates require a police report, whether sticker-only replacement is possible, whether a stolen plate can keep the same number, whether missing mailed stickers require another fee, and what to do if the old plate / sticker is found later.
- Added 43 unique official sources and 12 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "车牌 / sticker 丢了" task entry and updated README from 32 to 33 cross-state topics.
- Homepage content-resource count now resolves to 146 pages; build page count is 156.

Status:

- Content audit checked 50 states and 33 topics: 0 errors.
- Build generated 156 static pages.
- SEO audit checked 156 HTML pages, 100 state content pages, and 33 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-10 review date, 43 official sources, 5 FAQ schema items, 5 visible FAQ questions, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, license plate / registration card / sticker / decal / tab / inspection sticker / police report / MV-78B / new configuration / VTR-60 / HSMV 83146 / REG 156 / MV-44 / VSA 14 / MVR-18 / toll / insurance lapse / surrender / destroy / deface cues, homepage task entry, 146-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/lost-stolen-license-plates-registration-card-sticker/`.
- Official link audit checked 875 official URLs: 676 OK, 199 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `lorem`, `ipsum`, or `搜索结果`.

## Round 60 Changes

Date: 2026-07-11

### Temporary Tag, Trip Permit, Dealer Plate Topic

Source scan:

- California DMV supports the split between Temporary Operating Permit, one-time 30-day / 60-day / 90-day TOP, one-day vehicle moving permit, one-trip permit, smog, VIN / CHP, specialty plate, insurance, and fee boundaries: `https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/temporary-operating-permits/`, `https://www.dmv.ca.gov/portal/vehicle-registration/registration-fees/`, and `https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/`.
- TxDMV sources support the temporary permit family, VTR-66, Vehicle Transit Permit, 72/144-hour permits, One-Trip Permit, 30-Day Permit, insurance / inspection / display limits, and July 1, 2025 HB 718 metal-plate transition for dealer transactions: `https://www.txdmv.gov/motorists/register-your-vehicle/temporary-permits`, `https://www.txdmv.gov/sites/default/files/form_files/VTR-66.pdf`, `https://permit.txdmv.gov/Permit/VTPermit`, `https://permit.txdmv.gov/Permit/Eligibility#nbb`, `https://www.txdmv.gov/dealers/HB718`, and `https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle`.
- New York DMV sources support in-transit vehicle permits / temporary registrations, MV-82ITP, ownership proof, identity, insurance, and registration routing: `https://dmv.ny.gov/registration/in-transit-vehicle-permits-temporary-registrations`, `https://dmv.ny.gov/forms/mv82itp.pdf`, and `https://dmv.ny.gov/registrations`.
- Florida, Washington, Oregon, Virginia, Georgia, Colorado, and Mass.gov official pages support cross-state differences in temporary license plates, dealer ETR, trip permit duration and limits, one-state-only permit validity, dealer TOP extension limits, county motor vehicle office routing, registration transfer grace periods, and non-resident short-term registration paths.

Scope:

- Added the new cross-state topic `/topics/temporary-tag-trip-permit-dealer-plate/` with title "临时牌照、temporary tag 和 trip permit：买车、搬州或没牌上路怎么办".
- The topic explains the difference between temporary tag, temporary operating permit, trip permit, transit permit, one-trip permit, dealer temporary tag, metal plates, title transfer, insurance, inspection / smog, VIN verification, and permanent registration.
- Added five FAQ entries covering whether a newly purchased vehicle can be driven home without permanent plates, whether the English permit names mean the same thing, whether a temporary plate can cross state lines, whether dealer temp tags replace title / registration responsibility, and what to do when a permit expires.
- Added 35 unique official sources and 10 related states to the topic.
- Linked the topic sidebar to `/directories/dmv-services/`, the 50-state DMV service-entry directory.
- Added a homepage "临时牌照 / trip permit" task entry and updated README from 33 to 34 cross-state topics.
- Homepage content-resource count now resolves to 147 pages; build page count is 157.

Status:

- Content audit checked 50 states and 34 topics: 0 errors.
- Build generated 157 static pages.
- SEO audit checked 157 HTML pages, 100 state content pages, and 34 topic content pages: 0 errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical URL, and example-domain robots sitemap URL. It also warns that privacy copy must be updated when AdSense / analytics are actually configured.
- Static topic QA verified the new topic title, 2026-07-11 review date, 35 unique official sources in data, 5 FAQ schema items, 5 visible FAQ questions, WebSite / Article / FAQPage / BreadcrumbList schema, DMV-services directory sidebar link, temporary tag / trip permit / temporary operating permit / dealer / registration / insurance / smog / one-trip permit / one-day vehicle moving permit / Vehicle Transit Permit / 30-Day Permit / MV-82ITP / VTR-66 / TOP / out-of-state / salvage / metal plates cues, homepage task entry, 147-page homepage count, topic index entry, and sitemap entry.
- Local preview returned `200 OK` for `http://127.0.0.1:4321/topics/temporary-tag-trip-permit-dealer-plate/`.
- Official link audit checked 902 official URLs with expedited timeout settings: 658 OK, 244 watch, 0 fail. Watch results remain government-site 403/timeout/empty-response cases and do not indicate hard dead links.
- Public wording scan found no matches in `dist`, `src`, or `README.md` for `MVP`, `占位`, `候选`, `AI`, `人工智能`, `ChatGPT`, `TODO`, `prelaunch`, `dummy`, `lorem`, `ipsum`, or `搜索结果`.

## Round 61 Changes

Date: 2026-07-13

### Full-Site Content Governance Review

Scope:

- Kept the existing scope at 50 states, 34 cross-state topics, 13 directory pages, and 157 built pages. This round focused on clarity, factual routing, source usability, and maintenance controls rather than adding another topic.
- Split the jobs of the two state templates: state overviews now focus on task routing, agency entry points, appointment / service decisions, and selected state details; REAL ID pages retain document highlights, steps, common mistakes, FAQs, and sources. The previous repeated state arrays are no longer rendered on both pages.
- Removed topic `editorNotes` from the public template. State pages and generated directories now use a stricter `getPublicEditorialNotes()` filter so browser-check notes, access errors, writing instructions, expansion ideas, and other production language cannot appear as reader guidance.
- Replaced the old public status label `可直接使用` with `内容已核对`; fallback states now use reader-facing labels and instructions without exposing internal HTTP, bot, or browser-check details.
- Reworked the state overview route-card selector to rank action-link labels by task intent. New-resident cards now prefer explicit new-resident / out-of-state transfer links, while renewal / replacement / address cards prefer those exact services and fall back to the agency homepage instead of an unrelated list position.
- Tightened the foreign-license directory so it only publishes strong foreign-license, out-of-state transfer, reciprocity, or IDP matches. Wyoming now displays an explicit confirmation-needed row instead of unrelated renewal / address facts; West Virginia no longer repeats a generic mistake as a transfer rule.
- Removed duplicate California and Arkansas action URLs, changed topic sidebars from the first five global topics to relevance-ranked topics, and rewrote public authorial phrases such as `本页帮你`, `这页故意`, `后续扩展`, and `抽取线索`.
- Updated the Florida exam-language fact: beginning February 6, 2026, Florida driver-license knowledge and skills exams are English-only and exam translation services are not allowed. The state page and language topic now state this directly and identify the older General Information language list as historical.
- Replaced the retired Wisconsin DMV homepage with the current official DMV information page: `https://wisconsindot.gov/Pages/online-srvcs/external/dmv.aspx`.
- Numbered official sources and collapsed sources after the first 12 into an accessible details block, preserving every citation while making long topic pages easier to scan.
- Rebuilt the official-link audit around imported structured data. It now includes federal sources, all state agency homepages, state actions, state sources, and topic sources; labels containing either quote style are no longer missed.
- Extended content and SEO audits to reject duplicate state action URLs and public internal/editorial wording.

Status:

- Content audit checked 50 states, 34 topics, and 5 federal sources: 0 errors.
- Build generated 157 static pages and a sitemap index.
- SEO audit checked 157 HTML pages, 100 state content pages, and 34 topic pages: 0 errors.
- Official link audit checked 940 unique official URLs: 674 OK, 266 watch, 0 fail. The watch group consists of government-site 403, timeout, and empty-response cases under the five-second audit limit.
- Browser QA confirmed the Florida state page shows the 2026-07-13 review date, the English-only exam rule, no stale `还要核对` note, no internal access wording, and correct new-resident / renewal route links.
- Browser QA confirmed the foreign-license directory renders 50 rows, gives Wyoming an explicit confirmation-needed state, keeps useful West Virginia transfer facts, and logs no console errors.
- Browser QA confirmed the language / translation topic shows the 2026-07-13 review date and Florida English-only policy, hides all editorial notes, uses the collapsed source list, and logs no console errors.
- Launch configuration audit remains intentionally blocked on production settings: missing `PUBLIC_SITE_URL`, unconfigured `SITE.contactEmail`, example-domain canonical / robots URLs, and the future AdSense / analytics privacy update.

## Round 62 Changes

Date: 2026-07-13

### Road-Test Day Topic and Claim-Level Source Mapping

Source scan:

- California DMV, New York DMV, Texas DPS, FLHSMV, Washington DOL, New Jersey MVC, Mass.gov RMV, PennDOT, Virginia DMV, and Georgia DDS official road-test pages were checked for applicant documents, accompanying-driver rules, vehicle registration and insurance, inspection items, rental vehicles, temporary plates, passengers, interpreters, driver-assistance systems, arrival timing, test results, and retest rules.
- California confirms the permit / accompanying-driver / insurance / registration / rental-contract requirements and pre-drive checks for windows, mirrors, lights, tires, brakes, horn, signals, wipers and belts: `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/`.
- New York confirms physical permit and course documents, accompanying-driver ages, current registration / insurance / inspection, permanent plates, no in-transit permits, after-6-p.m. results, interim-license handling and a 14-day retest wait: `https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test`.
- Texas confirms current liability insurance, registration / plates, rental authorization, road-test contract limits and recent-purchase alternatives: `https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment` and `https://www.dps.texas.gov/section/driver-license/faq/section-2-scheduling-road-test`.
- Washington, New Jersey, Massachusetts, Pennsylvania, Virginia and Georgia provide additional state-specific boundaries for rental cars, accessible parking brakes, sponsors, original or paper documents, temporary tags, interpreters, advanced driver assistance, failed-test waits and attempt limits.

Scope:

- Added `/topics/road-test-day-vehicle-sponsor-insurance-rental-retest/` with the title "路考当天带什么：车辆、陪同人、保险、租车和失败重约".
- The topic separates applicant eligibility from vehicle inspection and covers permits, course / practice forms, accompanying drivers, registration, insurance, inspection, rental and driving-school vehicles, temporary tags, recently purchased vehicles, passengers, interpreters, recording, driver-assistance systems, late arrival, results, interim licenses and retesting.
- Added 10 checklist items, 7 steps, 7 FAQs, 14 official sources and 10 related states. The homepage now contains a dedicated "路考当天" task entry, and the topic links to the 50-state tests / permits directory.
- Added optional `factChecks` to the topic data model and a public "重点事实与官方依据" section. Each claim links to its numbered sources and uses the same numbering as the full source list.
- Added claim-level source mapping to six high-risk topics: REAL ID basics, airport travel, DMV fees / mailing / temporary credentials, test language / translation / interpreters, renewal / replacement / address changes, and the new road-test topic.
- Added 27 total fact checks. The source mapping covers federal REAL ID boundaries, TSA alternatives, ConfirmID, processing and mailing examples, temporary-credential travel limits, Florida English-only exams, Texas / Washington / New Jersey / North Carolina language rules, state address deadlines, online eligibility, and road-test-day requirements.
- Replaced the content audit's source-text parser with structured imports. The audit now validates source labels and URLs, duplicate state action URLs, related IDs / slugs, FAQ quality, fact-check text, non-empty source references, duplicate fact-check references, and whether every referenced URL exists in that topic's own source list.
- Updated the public quality ledger and README to show 35 topics, 6 fact-checked topics and 27 claim-level source mappings.

Status:

- Content audit checked 50 states, 35 topics, 5 federal sources, 6 fact-checked topics and 27 fact checks: 0 errors.
- Build generated 158 static pages and an updated sitemap index.
- SEO audit checked 158 HTML pages, 100 state content pages and 35 topic pages: 0 errors.
- Official link audit checked 947 unique official URLs: 674 OK, 273 watch, 0 fail. Watch responses remain government-site 403, timeout and empty-response cases under the five-second limit.
- Static QA confirmed all 27 fact-check blocks render, every referenced URL is present on the page, and the new topic appears on the homepage and sitemap.
- Browser QA confirmed the new topic has one H1, one hero, one article, 7 fact checks, 34 claim-to-source links, 14 source-list links and 7 FAQ items; it has no horizontal overflow or console errors.
- Browser QA at 390 x 844 confirmed a 34px wrapping H1, readable claim/source rows, no horizontal overflow and no overlapping interface elements. The viewport override was reset after testing.
- Local development returned `200 OK` for `http://127.0.0.1:4321/topics/road-test-day-vehicle-sponsor-insurance-rental-retest/`.
- Launch configuration audit remains intentionally blocked only on production inputs: `PUBLIC_SITE_URL`, `SITE.contactEmail`, production canonical / robots URLs, and the future AdSense / analytics privacy update.

## Round 63 Changes

Date: 2026-07-13

### Lost Vehicle Title, Electronic Title, Lien and Sale-Readiness Topic

Source scan:

- California DMV and TxDMV official pages support the rule that a replacement starts with the state holding the title record, not simply the state where the vehicle is now located. California also separates a missing title from correction / transfer work, while Texas calls its replacement a Certified Copy of Title and documents owner, ID, signature and lien-release requirements.
- New York DMV supports online / mail / office replacement, address-first handling, secure-facility mailing, original-title invalidation and the distinction between duplicate title, lien removal and information changes.
- FLHSMV supports the electronic-title / paper-title split, no-lien paper conversion, private-sale and Florida-dealer trade-in differences, duplicate paper-title requirements and invalidation of a recovered original.
- Washington DOL, New Jersey MVC, Mass.gov RMV and Virginia DMV support the page's lienholder, notarization, owner-signature, damaged-title, mailing, quick-title, replacement-versus-substitute and address-update boundaries.
- Georgia DOR and Illinois Secretary of State support the buyer / seller boundary: when a title is still in the previous owner's name and is lost before transfer, the record owner must obtain the replacement before the ownership transfer is completed.
- Arizona MVD provides an additional official example that a simple duplicate keeps owner, legal-status, lienholder and vehicle information unchanged.

Scope:

- Added `/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/` with the title "车辆 title 丢了怎么办：补证、电子 title 和 lien".
- The topic separates title from registration and covers the issuing state, record owner, mailing address, paper / electronic status, lender-held titles, lien release, duplicate invalidation, damaged or lost-in-transit documents, seller / buyer responsibilities, corrections, out-of-state moves and sale readiness.
- Added 5 audience cases, 10 key facts, 10 checklist items, 8 steps, 8 FAQs, 19 official sources and 11 related states.
- Added 8 claim-level source mappings. The site now has 7 fact-checked topics and 35 total claim-to-source mappings.
- Added a homepage "车辆 title 丢了" task entry and backlinks from all 11 related state overview pages. The topic also links to the 50-state DMV services directory.
- Shortened the initial H1 after browser QA so the Chinese phrase no longer breaks awkwardly on desktop and the mobile title occupies two lines instead of three.
- Updated README from 35 to 36 cross-state topics and synchronized the public fact-check totals.

Status:

- Content audit checked 50 states, 36 topics, 5 federal sources, 7 fact-checked topics and 35 fact checks: 0 errors.
- Build generated 159 static pages and an updated sitemap index.
- SEO audit checked 159 HTML pages, 100 state content pages and 36 topic pages: 0 errors.
- Official link audit checked 963 unique official URLs: 690 OK, 273 watch, 0 fail. The three new watch results are the same expected 403 behavior from Mass.gov, Illinois SOS and Arizona MVD; their official pages were also verified through indexed official content.
- Static QA confirmed the title, review date, all 8 fact-check rows, every fact/source URL, all 8 FAQs, Article / FAQPage / BreadcrumbList structured data, homepage entry, topic index, sitemap, public quality totals and all 11 state backlinks.
- Public wording QA found none of the new private editor notes or placeholder / production terms in built HTML.
- Browser QA at 1280 x 720 and 390 x 844 confirmed a single H1, 8 fact checks, 21 fact-to-source links, 8 visible FAQs, no horizontal overflow and no console errors. The temporary mobile viewport was reset before finalization.
- Local development returned `200 OK` for `http://127.0.0.1:4321/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/`.
- Launch configuration remains intentionally pending only on production inputs: `PUBLIC_SITE_URL`, `SITE.contactEmail`, production canonical / robots URLs and the eventual AdSense / analytics privacy update.

## Round 64 Changes

Date: 2026-07-13

### Vehicle Registration Renewal, Expired Tags and Non-Operation Topic

Source scan:

- California DMV supports the page's no-grace-period warning, exact expiration-date check, address-first online renewal, electronic insurance / smog requirements, incomplete-renewal distinction and strict Planned Nonoperation limits.
- New York DMV supports renewal without a notice, printable temporary registration, 12-month inspection requirement and the change from renewal to a new registration when a record has been expired for more than one year.
- TxDMV supports the 90-days-before / conditional 12-months-after online window, current insurance, county emissions requirements, VIR manual verification and renewal without a notice.
- FLHSMV, Washington DOL, Mass.gov RMV, PennDOT, Virginia DMV and Georgia DOR support insurance verification, registration stops, reminder / address handling, digital or printable credentials, mail delivery, plate deactivation / surrender, county emissions and online / kiosk / office routing.
- NCDMV supports the current 15-day valid-through versus late-fee distinction, inspection-before-renewal, renewal without a notice, continuous insurance, plate return order and Tag & Tax Together handling.

Scope:

- Added `/topics/vehicle-registration-renewal-expired-tags-non-operation/` with the title "车辆 registration 续期：过期、车检和停驶".
- The topic separates driver-license renewal from vehicle registration renewal and covers expiration dates, missing notices, address changes, insurance verification, safety / emissions records, registration stops, payment-versus-completion, official temporary credentials, long-expired registrations and state-specific non-operation paths.
- Added 5 audience cases, 12 key facts, 10 checklist items, 8 steps, 8 FAQs, 24 official sources and 10 related states.
- Added 9 claim-level source mappings. The site now has 8 fact-checked topics and 44 total claim-to-source mappings.
- Added a homepage "车辆 registration 续期" task entry and backlinks from all 10 related state overview pages. The topic links to the 50-state DMV services directory.
- Kept inspection, renewal holds, temporary permits and replacement stickers in their existing dedicated topics so the new page remains a renewal decision flow instead of duplicating those guides.
- Reworded one reader-facing step after the SEO audit caught an editorial-sounding phrase, then rebuilt successfully.
- Browser QA identified an awkward desktop title break; the H1 was shortened while insurance remained in the description, checklist and fact-source section.
- The first official-link run exposed a cached NCDMV vehicle-property-tax URL that now returned 404. It was replaced with the current official URL discovered through the live NCDMV tax navigation.
- Updated README from 36 to 37 cross-state topics and synchronized the public fact-check totals.

Status:

- Content audit checked 50 states, 37 topics, 5 federal sources, 8 fact-checked topics and 44 fact checks: 0 errors.
- Build generated 160 static pages and an updated sitemap index.
- SEO audit checked 160 HTML pages, 100 state content pages and 37 topic pages: 0 errors.
- Final official-link audit checked 979 unique official URLs: 710 OK, 269 watch, 0 fail. Watch responses remain government-site 403, timeout and empty-response cases under the five-second audit limit.
- Static QA confirmed the final title, review date, all 9 fact-check rows, every fact/source URL, all 8 FAQs, Article / FAQPage / BreadcrumbList structured data, homepage entry, topic index, sitemap, public quality totals and all 10 state backlinks.
- Public wording QA found none of the new private editor notes, the corrected editorial phrase or placeholder / production terms in built HTML.
- Browser QA at 1280 x 720 and 390 x 844 confirmed one H1, 9 fact checks, 32 fact-to-source links, 8 visible FAQs, no horizontal overflow and no console errors. The mobile viewport was reset to the 1280 x 720 default.
- Local development returned `200 OK` for `http://127.0.0.1:4321/topics/vehicle-registration-renewal-expired-tags-non-operation/`.

### Content Freeze Recommendation

- Recommend freezing the initial content set at 50 state overviews, 50 state REAL ID pages, 37 cross-state topics and 13 directory pages.
- The original MVP requirement of at least 30 high-quality content pages is exceeded, and the current set covers identity / REAL ID, first licensing, language / non-citizen paths, renewals / loss / suspension and the main vehicle title / registration lifecycle.
- Further broad expansion before launch is unlikely to improve readiness as much as deploying, submitting the sitemap and using Search Console query data to choose the next pages.
- Remaining launch work is configuration, not content production: set `PUBLIC_SITE_URL`, configure `SITE.contactEmail`, choose analytics / AdSense timing, update privacy disclosures, rebuild against the production domain and submit the sitemap.

## Round 65 Changes

Date: 2026-07-13

### Platform-Neutral Deployment Preparation

Scope:

- Kept the launch content frozen at 50 state overviews, 50 state REAL ID pages, 37 cross-state topics and 13 directory pages. No new article was added in this round.
- Replaced the source-code-only contact email setting with `PUBLIC_CONTACT_EMAIL`. Both the production domain and public mailbox can now be configured on the hosting platform without editing content data.
- Added `.env.example` with deliberately invalid example values, expanded `.gitignore` to cover local environment files while retaining the template, and added `DEPLOYMENT.md` with static-hosting settings, verification commands and post-launch steps.
- Added `npm run verify:launch`, which runs content audit, production build, SEO audit and launch configuration audit in one command.
- Strengthened `audit:launch` so it rejects HTTP, local, reserved and common placeholder origins; rejects invalid or placeholder email domains; and verifies the built homepage canonical, Contact mailto link, robots sitemap and sitemap-index origin against the configured values.
- Changed the initial privacy-mode result from a launch warning to an explicit informational note. Launching without analytics or ads is intentional; the disclosure must be revised when either service is actually connected.
- Corrected the Privacy page so Google Search Console is no longer grouped with browser-side analytics or advertising services. Search Console submission does not require adding a tracking script to the site.

Validation:

- Default local build generated 160 static pages. Content audit checked 50 states, 37 topics, 5 federal sources, 8 fact-checked topics and 44 fact checks: 0 errors.
- Default SEO audit checked 160 HTML pages, 100 state content pages and 37 topic pages: 0 errors.
- The unconfigured launch audit now fails only for the two genuinely missing production inputs: `PUBLIC_SITE_URL` and `PUBLIC_CONTACT_EMAIL`. It reports 2 errors and 0 warnings.
- A simulated production run used `https://dmv-cn-prelaunch.pages.dev` and `qa@dmv-cn-prelaunch.pages.dev` only as isolated test values. `npm run verify:launch` completed with content, build, SEO and launch checks all passing; launch configuration reported 0 errors and 0 warnings.
- Static inspection confirmed the simulated origin appeared in the homepage canonical, Contact page metadata, robots sitemap line and sitemap index, while the simulated mailbox appeared in the Contact `mailto:` link.

Remaining external inputs:

- A chosen production domain or hosting-platform domain.
- A monitored public contact mailbox.
- A hosting choice and account access for the actual deployment.
- Search Console verification data generated after the production URL exists.
- Optional GA4 and AdSense identifiers only when those services are ready; the initial launch can proceed without them.

### Launch Boundary

The repository is now content-frozen and configuration-ready. The next productive step is an actual production deployment with the user's real domain and mailbox, followed by live URL checks and Search Console sitemap submission. Additional broad content production should wait for real search-query and indexing evidence.

## Round 66 Changes

Date: 2026-07-13

### Full-Site Integrity Gate and Final Homepage Polish

Scope:

- Kept all DMV and REAL ID article content frozen. This round added a release-quality gate rather than another topic.
- Added `parse5` as a development-only HTML parser and created `scripts/audit-site-integrity.mjs`.
- Added `npm run audit:site` and inserted it into `npm run verify:launch` after the static build.
- The integrity audit parses every generated HTML document and verifies internal navigation targets, local assets, fragments, `for` / ARIA / header ID references, duplicate IDs, one H1 and one main landmark per page, image alt text and intrinsic dimensions, canonical route paths, canonical-origin consistency, OG image files, parseable WebSite JSON-LD and reachability from the homepage.
- Replaced the homepage's internal-sounding `可直接用 30/50` and `需点验 20 州` ledger with reader-facing completion and fallback information: `州指南 50/50`, `专题复核 37/37` and `备用入口 20 州`.
- Added the homepage hero image's real `1672 x 941` intrinsic dimensions, high fetch priority and asynchronous decoding so the layout reserves the correct image space before loading.
- Browser QA exposed an orphaned final character in the 390px homepage H1. Shortened the visible H1 from `先选州，再走官方入口` to `选州，直达官方入口`, preserving the task meaning while fitting on one mobile line.

First audit result and fix:

- The first integrity run checked 160 HTML pages, 5,184 internal navigation references, 481 local resource references, 161 fragment references and 308 element-ID references.
- All 159 non-404 pages were reachable from the homepage, and every link, resource, fragment and ID reference resolved.
- The only error was the homepage hero image missing explicit width and height. After adding the real dimensions, the complete integrity audit passed with 0 errors.

Final validation:

- Static build generated 160 pages and 167 total files.
- Content audit checked 50 states, 37 topics, 5 federal sources, 8 fact-checked topics and 44 fact checks: 0 errors.
- Site integrity audit checked 159 reachable non-404 pages, 5,184 internal navigation references, 481 resources, 161 fragments, 308 element-ID references, 160 canonical URLs and 584 JSON-LD blocks: 0 errors.
- SEO audit checked 160 HTML pages, 100 state content pages and 37 topic pages: 0 errors.
- A complete simulated production `npm run verify:launch` passed content, build, site integrity, SEO and launch configuration with 0 errors and 0 warnings.
- Browser QA at 1280 x 720 confirmed the hero image loaded at its intended framed size, the new ledger reads `50/50`, `37/37`, `20 州`, the page has one H1 and no horizontal overflow.
- Browser QA at 390 x 844 confirmed the revised 38px H1 occupies one 45px line, the hero image loads, Contact and Privacy have one H1 each, and all tested pages have no horizontal overflow.
- Browser logs contained only normal Vite development connection messages and no warnings or errors. The temporary mobile viewport was reset to 1280 x 720 and the QA tab was closed.
- The simulated production values were removed by rebuilding without them. A final search found no simulated domain or mailbox in `dist`.
- The final unconfigured launch audit again reports exactly two expected errors and no warnings: missing `PUBLIC_SITE_URL` and missing `PUBLIC_CONTACT_EMAIL`.

### Final External Boundary

The codebase now has automated evidence for content structure, SEO, internal navigation, page reachability, accessibility references, production URL propagation and static output. No further local preparation has higher launch value than deploying with a real domain and monitored public mailbox. GA4 and AdSense remain optional post-launch integrations.

## Round 67 Changes

Date: 2026-07-21

### Delaware Driver License, SecureID and DPC Deep Review

Source scan:

- Opened and checked the current Delaware DMV Driver Services hub, SecureID guide, required-document table, noncitizen / SAVE page, adult transfer, first adult license, examination, written-test, sample-test, road-test, DPC, renewal, name / address, fee chart, online services, appointment scheduler, locations, wait times and July 2025 Driver Manual, plus TSA's current acceptable-identification page.
- Confirmed that a valid U.S. out-of-state license is normally transferred without written and road exams, while foreign licenses normally require both exams; only Germany, Taiwan (Republic of China) and France receive the Class D reciprocity exception. Mainland China is not Taiwan for this rule.
- Confirmed the DPC route requires SBI fingerprint validation, the prior two years' Delaware tax-filing certification, in-person DMV documents and testing. The current brochure lists a $20 DPC fee plus a $72 SBI fee and warns that out-of-state acceptance is not guaranteed.
- Confirmed that the public sample-test portal currently lists English, Spanish and Haitian, while the manual offers an audio test on request. No official source was found that promises a Chinese knowledge exam, so the page tells readers to confirm assistance with the selected office instead of inventing availability.
- Used the DMV fee chart updated for October 2025 for current $50 Class D issuance / renewal, $10 late renewal, $20 duplicate, $10 name change and no-charge address change. The page explicitly warns against budgeting from the older July 2025 manual fee table.

Scope:

- Rewrote both `/states/delaware/` and `/states/delaware/real-id/` with current task routing, 60-day transfer deadline, U.S. versus foreign-license paths, first-adult permit and exam steps, road-test vehicle rules, SecureID / non-compliant distinctions, one-time source-document revalidation, SAVE handling, DPC eligibility and process, renewal, name / address changes and current fees.
- Expanded the Delaware source list from 5 to 22 checked official sources and registered all 112 unique claims as AI-assisted explicit mappings. The two rendered pages expose 118 evidence rows and 218 official-source links without representing the work as human or professional approval.
- Updated the public editorial update log and README quality totals. Delaware also increased inherited explicit mappings in the five high-risk directories.

Validation:

- Delaware official-link audit: 22 checked, 22 OK, 0 watch, 0 fail.
- State evidence audit: 3,915 claims, 6,873 official links, 3,610 AI-assisted explicit mappings across 78 pages, 0 errors.
- Directory evidence audit: 704 claims, 609 inherited explicit mappings, 95 automated semantic mappings, 0 errors.
- Full production-configured `verify:launch`: content, practice tests, build, directory evidence, state evidence, E-E-A-T, site integrity, SEO and launch configuration all passed with 0 errors and 0 warnings.
- E-E-A-T inventory: 166 indexable pages, 95 passed, average score 97, 0 pages below 85, 0 evidence-review pending, 54 automated-source pages and 17 high-risk human approvals still honestly pending.
- Site integrity audit: 166/166 indexable HTML pages reachable from the homepage, 7,518 internal navigation references, 836 local resources, 637 fragment references, 788 element-ID references, 167 images, 167 canonical URLs and 766 JSON-LD blocks, 0 errors.
- Browser QA at 1280 x 720 and 390 x 844 confirmed 58 overview evidence rows and 60 REAL ID evidence rows, expected Delaware transfer and DPC guidance, normal title wrapping and no horizontal overflow. Browser logs contained no page warnings or errors.
- Search Console priority reports were regenerated. No parseable `reports/search-console-export.csv` was available, so query-based prioritization remains non-blocking and pending real export data.

## Round 68 Changes

Date: 2026-07-21

### Rhode Island License, REAL ID, Foreign-Language Exam and DPC Deep Review

Source scan:

- Opened and checked the current Rhode Island DMV licenses / permits / IDs hub, REAL ID guidance, identity and residency list, License/ID/Permit checklist, LI-1, out-of-state transfer, new-resident / out-of-country route, permit, knowledge-exam, road-test, road-test checklist and guide, Driver Manual, DPC, renewal, name / address, fee, reservation, locations and online-service pages, plus the Rhode Island Division of Taxation DPC guidance, current adult-permit statute and TSA identification page.
- Confirmed that a new resident must transfer within 30 days; a valid U.S. out-of-state license or one expired less than five years uses the transfer route, while an adult with an out-of-country license must apply for an instruction permit at Cranston, pass the knowledge exam and hold the permit at least 30 days before the road test.
- Confirmed that normal computerized knowledge exams are offered in English, Spanish and Portuguese. Other languages use a separate printed-exam request after the applicant first obtains the correct transaction reservation; the page does not promise a Chinese exam without DMV confirmation.
- Confirmed the DPC path for applicants unable to establish lawful presence: prior-tax-year Rhode Island resident-return verification, original identity documents, certified English translations where required and two residence proofs. A qualifying state / territory license or recent certified driving record can change the testing path.
- Found an official conflict that was absent from the old page: the DMV permit page still says two additional one-year renewals, while R.I. Gen. Laws § 31-10-7, effective June 6, 2025, says the one-year adult permit may be renewed only once. The page now discloses the conflict and tells renewal applicants to confirm current execution.
- Confirmed current posted amounts for the adult instructional permit, road test, first license, transfer, five-year renewal and out-of-window REAL ID upgrade, including the separate credit-card service fee.

Scope:

- Rewrote both `/states/rhode-island/` and `/states/rhode-island/real-id/` with six-path routing, 30-day transfer timing, U.S. versus foreign-license rules, adult permit and test steps, foreign-language exam workflow, road-test vehicle restrictions, REAL ID originals and residence rules, DPC tax verification, renewal, name / address changes, reservations and current fees.
- Expanded the Rhode Island source list from 5 to 26 checked official sources and registered all 69 unique claims as AI-assisted explicit mappings. The two rendered pages expose 71 evidence rows without representing the work as human or professional approval.
- Restored a reader-facing access note because 25 Rhode Island government URLs currently return a security challenge to automated checks. They remain registered official URLs, current indexed bodies and downloadable government documents; none returned a hard failure.
- Updated the public editorial update log, README quality totals, quality workbook and Search Console priority reports.

Validation:

- Rhode Island official-link audit: 26 checked, 1 direct OK, 25 security-challenge / timeout watch, 0 fail.
- State evidence audit: 3,958 claims, 7,037 official links, 3,681 AI-assisted explicit mappings across 80 pages, 0 errors.
- Directory evidence audit: 711 claims, 626 inherited explicit mappings, 85 automated semantic mappings, 0 errors.
- Full production-configured `verify:launch`: content, practice tests, build, directory evidence, state evidence, E-E-A-T, site integrity, SEO and launch configuration all passed with 0 errors and 0 warnings.
- E-E-A-T inventory: 166 indexable pages, 97 passed, average score 97, 0 pages below 85, 0 evidence-review pending, 52 automated-source pages and 17 high-risk human approvals still honestly pending.
- Site integrity audit: 166/166 indexable HTML pages reachable from the homepage, 7,536 internal navigation references, 836 local resources, 637 fragment references, 788 element-ID references, 167 images, 167 canonical URLs and 766 JSON-LD blocks, 0 errors.
- Browser QA at 1280 x 720 and 390 x 844 confirmed 20 overview evidence rows and 51 REAL ID evidence rows, visible transfer / DPC / language / fee / permit-conflict guidance, normal title wrapping and no horizontal overflow. Browser logs contained no page warnings or errors.
- Quality workbook: 52 semantic-review pages and 69 blocked pages remain; weak-intent pages remain 0.
- Search Console priority reports were regenerated. No parseable `reports/search-console-export.csv` was available, so query-based prioritization remains non-blocking and pending real export data.
