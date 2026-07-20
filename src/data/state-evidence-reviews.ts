export type ReviewedStateEvidence = {
  reviewedAt: string;
  reviewer: string;
  surfaces: ('overview' | 'real-id')[];
  sourceBodiesChecked: string[];
  scope: string;
  notes: string;
  claims: Record<string, string[]>;
};

const CA_REAL_ID =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/';
const CA_WHAT_IS_REAL_ID =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/what-is-real-id/';
const CA_REAL_ID_CHECKLIST =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/';
const CA_DOCUMENT_VERIFICATION =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl-44/document-verification-faqs/';
const CA_APPOINTMENTS = 'https://www.dmv.ca.gov/portal/appointments/';
const CA_ADDRESS =
  'https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/';
const CA_UPDATE_INFORMATION =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/';
const CA_FEES =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/';
const CA_PROCESSING =
  'https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/';
const CA_AB60 =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/';
const CA_LEARNER_PERMITS =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/';
const CA_ONLINE_LEARNING =
  'https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/';
const CA_FAST_FACTS =
  'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/';
const CA_DRIVER_LICENSES =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/';

const NY_REAL_ID = 'https://dmv.ny.gov/driver-license/enhanced-or-real-id';
const NY_DOCUMENT_GUIDE = 'https://dmv.ny.gov/more-info/dmv-document-guide';
const NY_ID44 = 'https://dmv.ny.gov/forms/id44.pdf';
const NY_NO_SSN =
  'https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility';
const NY_PERMIT_TEST =
  'https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test';
const NY_FOREIGN =
  'https://dmv.ny.gov/driver-license/drivers-from-other-countries';
const NY_OUT_OF_STATE =
  'https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license';
const NY_LANGUAGE = 'https://dmv.ny.gov/more-info/language-assistance';
const NY_ROAD_TEST =
  'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test';
const NY_RENEW =
  'https://dmv.ny.gov/driver-license/renew-a-driver-license';
const NY_ADDRESS = 'https://dmv.ny.gov/records/change-your-address';
const NY_FEES = 'https://dmv.ny.gov/driver-license/fees-refunds';
const NY_REPLACE =
  'https://dmv.ny.gov/driver-license/replace-a-license-or-permit';
const NY_OFFICES = 'https://dmv.ny.gov/contact-us/office-locations';

const TX_REAL_ID = 'https://www.texas.gov/driver-services/texas-real-id/';
const TX_ONLINE_ELIGIBILITY =
  'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/';
const TX_RESIDENCY =
  'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards';
const TX_DOCUMENT_CHECK = 'https://www.dps.texas.gov/apps/DriverLicense/RealID/';
const TX_APPLY =
  'https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license';
const TX_MOVING =
  'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids';
const TX_RECIPROCITY =
  'https://www.dps.texas.gov/section/driver-license/driving-privilege-reciprocity';
const TX_TESTING =
  'https://www.dps.texas.gov/section/driver-license/testing-other-languages';
const TX_ADDRESS =
  'https://www.dps.texas.gov/section/driver-license/how-change-information-your-driver-license-or-id-card';
const TX_FEES =
  'https://www.dps.texas.gov/section/driver-license/driver-license-fees';
const TX_TEMPORARY_VISITORS =
  'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors';
const TX_TEMPORARY_LICENSE =
  'https://www.dps.texas.gov/section/driver-license/faq/section-3-issuing-temporary-permit';
const TX_IDENTIFICATION_CARD =
  'https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card';
const TX_FAQ =
  'https://www.dps.texas.gov/section/driver-license/faq/section-1-applying-or-renewing-driver-license-identification-card-or';
const TX_LAWFUL_PRESENCE =
  'https://www.dps.texas.gov/section/driver-license/us-citizenship-or-lawful-presence-requirement';
const TX_SSN =
  'https://www.dps.texas.gov/section/driver-license/social-security-number-ssn';
const TX_CDL_TESTING =
  'https://www.dps.texas.gov/news/dps-announces-changes-cdl-knowledge-testing';
const TSA_IDENTIFICATION =
  'https://www.tsa.gov/travel/security-screening/identification';

const FL_WHAT_TO_BRING =
  'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/';
const FL_DRIVER_LICENSES =
  'https://www.flhsmv.gov/driver-licenses-id-cards/';
const FL_US_CITIZEN =
  'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/';
const FL_NON_IMMIGRANT =
  'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/';
const FL_RENEW_REPLACE =
  'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/';
const FL_CLASS_E =
  'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/';
const FL_DRIVER_EXAMS =
  'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/';
const FL_ENGLISH_ONLY =
  'https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/';
const FL_FEES =
  'https://www.flhsmv.gov/driver-licenses-id-cards/fees/';
const FL_LOCATIONS = 'https://www.flhsmv.gov/locations/';
const FL_MYDMV = 'https://services.flhsmv.gov/VirtualOffice/';
const FL_NEW_RESIDENT = 'https://www.flhsmv.gov/new-resident/';
const FL_VISITING =
  'https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/';
const FL_WHAT_TO_BRING_FAQ =
  'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/frequently-asked-questions/';
const FL_NAME_ADDRESS = 'https://www.flhsmv.gov/name-and-address-changes/';
const FL_NEW_CREDENTIAL_FAQ =
  'https://www.flhsmv.gov/driver-licenses-id-cards/newdl/faq/';

const WA_REAL_ID = 'https://dol.wa.gov/id-cards/real-id';
const WA_EDL =
  'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl';
const WA_EDL_GUIDE =
  'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/guide-enhanced-driver-licenses-edl';
const WA_GET_EDL =
  'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/get-enhanced-driver-license-edl';
const WA_EDL_CHECKLIST =
  'https://dol.wa.gov/media/pdf/5165/applying-enhanced-washington-license-or-idpdf/download?inline=';
const WA_PREAPPLY = 'https://dol.wa.gov/pre-apply-online';
const WA_DRIVER_LICENSES =
  'https://dol.wa.gov/driver-licenses-and-permits';
const WA_IDENTITY =
  'https://dol.wa.gov/driver-licenses-and-permits/documents-proof-identity';
const WA_RENEW =
  'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license';
const WA_FEES =
  'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-fees';
const WA_FIRST_LICENSE =
  'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18';
const WA_TRAINING =
  'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing';
const WA_TESTS =
  'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test';
const WA_MOVING = 'https://dol.wa.gov/moving-washington';
const WA_NEW_RESIDENT_LICENSE =
  'https://dol.wa.gov/moving-washington/get-driver-license';
const WA_DRIVER_GUIDES =
  'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides';
const WA_APPOINTMENTS = 'https://dol.wa.gov/appointments-and-locations';
const WA_OFFICES =
  'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices';
const WA_ADDRESS =
  'https://dol.wa.gov/driver-licenses-and-permits/update-driver-license-information/change-your-name-or-address-your-driver-license';

const NJ_REAL_ID = 'https://www.nj.gov/mvc/realid/';
const NJ_REAL_ID_FAQ = 'https://www.nj.gov/mvc/realid/faq.html';
const NJ_SELECTOR = 'https://www.nj.gov/mvc/realid/selector.html';
const NJ_NAME_MATCHES = 'https://www.nj.gov/mvc/realid/name-matches.html';
const NJ_SIX_POINTS = 'https://www.nj.gov/mvc/license/6pointid.htm';
const NJ_AFFIDAVIT = 'https://www.nj.gov/mvc/pdf/license/affidavit.pdf';
const NJ_ONLINE = 'https://www.nj.gov/mvc/online-services.html';
const NJ_RENEW = 'https://www.nj.gov/mvc/license/licrenew.htm';
const NJ_DUPLICATE = 'https://www.nj.gov/mvc/license/liclost.htm';
const NJ_ADDRESS = 'https://www.nj.gov/mvc/drivertopics/addchange.htm';
const NJ_ADDRESS_DETAILS = 'https://www.nj.gov/mvc/about/addchange.htm';
const NJ_MOVING = 'https://www.nj.gov/mvc/drivertopics/movetonj.htm';
const NJ_APPOINTMENT =
  'https://telegov.njportal.com/njmvc/AppointmentWizard';
const NJ_FIRST_LICENSE = 'https://www.nj.gov/mvc/license/firstlic.htm';
const NJ_KNOWLEDGE = 'https://www.nj.gov/mvc/license/knowledgetest.htm';
const NJ_MANUALS = 'https://www.nj.gov/mvc/about/manuals.htm';
const NJ_ROAD_TEST = 'https://www.nj.gov/mvc/license/roadtest.htm';

const MA_ID_REQUIREMENTS =
  'https://www.mass.gov/info-details/massachusetts-identification-id-requirements';
const MA_REAL_ID =
  'https://www.mass.gov/info-details/real-id-in-massachusetts';
const MA_REAL_ID_CHECKLIST =
  'https://www.mass.gov/doc/real-id-documents-checklist/download?os=fdf';
const MA_WFMA_LAW =
  'https://www.mass.gov/info-details/mass-general-laws-c90-ss-8';
const MA_DRIVER_MANUAL =
  'https://www.mass.gov/doc/english-drivers-manual/download?sync=true';
const MA_RENEW =
  'https://www.mass.gov/how-to/renew-your-real-or-standard-passenger-class-d-or-motorcycle-class-m-drivers-license';
const MA_REPLACE =
  'https://www.mass.gov/how-to/replace-your-drivers-license';
const MA_ADDRESS =
  'https://www.mass.gov/how-to/change-your-address-with-the-rmv';
const MA_PERMIT =
  'https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit';
const MA_FIRST_DRIVER =
  'https://www.mass.gov/guides/first-time-driver-start-here';
const MA_ROAD_TEST = 'https://www.mass.gov/how-to/schedule-your-road-test';
const MA_OUT_OF_STATE =
  'https://www.mass.gov/how-to/transfer-your-real-or-standard-out-of-state-drivers-or-motorcycle-license-to-massachusetts';
const MA_FOREIGN_TRANSFER =
  'https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country';
const MA_FOREIGN_CONVERSION =
  'https://www.mass.gov/info-details/information-for-converting-certain-foreign-drivers-licenses';
const MA_FOREIGN_DRIVING =
  'https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license';
const MA_TRANSLATED =
  'https://www.mass.gov/lists/rmv-translated-documents';
const MA_FEES =
  'https://www.mass.gov/info-details/massachusetts-registry-of-motor-vehicles-fees';
const MA_MYMASSGOV =
  'https://www.mass.gov/info-details/mymassgov-for-myrmv-services';

const IL_REAL_ID = 'https://www.ilsos.gov/content/realid/us/en.html';
const IL_DOCUMENT_REQUIREMENTS =
  'https://www.ilsos.gov/departments/drivers/drivers-license/document-requirements-to-obtain-drivers-license-or-state-id-card.html';
const IL_ACCEPTABLE_DOCUMENTS =
  'https://www.ilsos.gov/departments/drivers/drivers-license/document-requirements-to-obtain-drivers-license-or-state-id-card/acceptable-identification-documents.html';
const IL_CHECKLIST =
  'https://www.ilsos.gov/departments/drivers/drivers-license/accept-id-checklist.html';
const IL_NONCITIZEN =
  'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_tvdl22.pdf';
const IL_TVDL_CHANGE =
  'https://www.ilsos.gov/content/dam/news/2024/july/240701d1.pdf';
const IL_RENEW =
  'https://www.ilsos.gov/departments/drivers/drivers-license/renewonline.html';
const IL_DUPLICATE =
  'https://www.ilsos.gov/departments/drivers/drivers-license/duplicate-drivers-license-or-id-card.html';
const IL_ADDRESS = 'https://apps.ilsos.gov/addrchange/?s=1&vm=r';
const IL_NEW_RESIDENT = 'https://www.ilsos.gov/services/newresidents.html';
const IL_PERMIT =
  'https://www.ilsos.gov/departments/drivers/driver-education/instructpermit.html';
const IL_ADULT_ED =
  'https://www.ilsos.gov/departments/drivers/driver-education/ade.html';
const IL_RULES =
  'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_a112.pdf';
const IL_DRIVER_INFO =
  'https://www.ilsos.gov/departments/drivers/drivers_license/drlicid.html';
const IL_FEES = 'https://www.ilsos.gov/departments/drivers/basicfees.html';
const IL_APPOINTMENTS =
  'https://www.ilsos.gov/departments/drivers/appointments.html';
const IL_FACILITY =
  'https://apps.ilsos.gov/facilityfinder/facility?command=map';
const IL_OLDER_DRIVER_UPDATE =
  'https://www.ilsos.gov/news/2026/june-17-2026-giannoulias-ends-mandatory-road-tests-for-drivers-ages-79-86.html';

const PA_REAL_ID = 'https://www.pa.gov/agencies/dmv/driver-services/real-id';
const PA_APPLY_REAL_ID = 'https://www.pa.gov/services/dmv/apply-for-real-id';
const PA_REAL_ID_DOCUMENTS =
  'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check';
const PA_PREVERIFICATION =
  'https://www.pa.gov/services/dmv/apply-for-real-id-pre-verification';
const PA_NONCITIZEN_REAL_ID =
  'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-non-us-citizens';
const PA_CDL_REAL_ID =
  'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-cdl-holders';
const PA_REAL_ID_FAQ =
  'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/real-id-faqs';
const PA_NO_SSN_CARD =
  'https://www.pa.gov/agencies/dmv/driver-services/proof-of-identity-and-residency/customers-who-do-not-have-a-social-security-card';
const PA_ONLINE_SERVICES =
  'https://www.pa.gov/agencies/dmv/online-services-dvs';
const PA_RENEW = 'https://www.pa.gov/services/dmv/renew-a-drivers-license';
const PA_REPLACE = 'https://www.pa.gov/services/dmv/replace-a-drivers-license';
const PA_NAME_ADDRESS =
  'https://www.pa.gov/services/dmv/change-a-driver-license-name-or-address';
const PA_MOVING_WITHIN =
  'https://www.pa.gov/agencies/dmv/resources/relocation/moving-within-pa';
const PA_TRANSFER_LICENSE =
  'https://www.pa.gov/services/dmv/transfer-a-drivers-license-from-another-state';
const PA_TRANSFER_VEHICLE =
  'https://www.pa.gov/services/dmv/transfer-vehicle-registration-from-another-state';
const PA_PERMIT = 'https://www.pa.gov/services/dmv/get-a-learners-permit';
const PA_APPLYING_FOR_PERMIT =
  'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit';
const PA_TESTING =
  'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing';
const PA_SCHEDULE_TEST =
  'https://www.pa.gov/services/dmv/schedule-drivers-test';
const PA_FOREIGN_LICENSE =
  'https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license';
const PA_FOREIGN_FAQ =
  'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/driver-and-licensing-miscellaneous-faqs';
const PA_REAL_ID_CENTERS =
  'https://www.pa.gov/agencies/dmv/find-a-location/real-id-center-locations';
const PA_LOCATIONS = 'https://www.pa.gov/agencies/dmv/find-a-location';
const PA_FEES = 'https://www.pa.gov/agencies/dmv/resources/payments-and-fees';

const GA_REAL_ID = 'https://dds.georgia.gov/georgia-licenseid/real-id';
const GA_REAL_ID_FAQ =
  'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/real-id-faqs';
const GA_TRANSFER_OUT_OF_STATE =
  'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-transfer-out-state-drivers-licenseid';
const GA_NONCITIZEN =
  'https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens';
const GA_FOREIGN =
  'https://dds.georgia.gov/georgia-licenseid/new-licenseid/drivers-other-nations';
const GA_TRANSFER_FOREIGN =
  'https://dds.georgia.gov/transfer-unexpired-foreign-drivers-license';
const GA_RENEW =
  'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-renew-license-or-id';
const GA_RENEW_FAQ = 'https://dds.georgia.gov/renewals-faqs';
const GA_MAIL_RENEW = 'https://dds.georgia.gov/mail-renewals';
const GA_REPLACE =
  'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-replace-license';
const GA_REPLACE_FAQ =
  'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/replacements-faqs';
const GA_UPDATE =
  'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-update-license';
const GA_ADDRESS_FAQ =
  'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/address-change-faqs';
const GA_FEES = 'https://dds.georgia.gov/fees-and-terms';
const GA_LOCATIONS = 'https://dds.georgia.gov/locations/customer-service-center';
const GA_TESTS =
  'https://dds.georgia.gov/testing-and-training/test-and-exams-information';
const GA_ROAD_TEST =
  'https://dds.georgia.gov/how-do-i-make-road-test-appointment';
const GA_DRIVER_MANUAL_TESTS =
  'https://dds.georgia.gov/section-3-testing-information';
const GA_CLASS_C =
  'https://dds.georgia.gov/section-2-continued-class-c-license';

const MD_REAL_ID_LOOKUP =
  'https://mva.maryland.gov/Pages/realidlookup.aspx';
const MD_LICENSES_IDS =
  'https://mva.maryland.gov/licenses-ids?das_id=D0005110044_00000';
const MD_REAL_ID_FAQ =
  'https://mva.maryland.gov/Pages/realidfaq.aspx';
const MD_DOCUMENT_REQUIREMENTS =
  'https://mva.maryland.gov/documents/FO-150A.pdf';
const MD_FEES =
  'https://mva.maryland.gov/licenses-ids/license-id-fees';
const MD_RENEW =
  'https://mva.maryland.gov/licenses-ids/renew-license-or-id';
const MD_REPLACE =
  'https://mva.maryland.gov/licenses-ids/replace-license-or-id';
const MD_UPDATE =
  'https://mva.maryland.gov/licenses-ids/update-name-address-or-other-license-info';
const MD_NEW_RESIDENTS =
  'https://mva.maryland.gov/your-mva-guide/new-maryland-residents';
const MD_TRANSFER_LICENSE =
  'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/get-maryland-drivers-license-or-id-card';
const MD_TRANSFER_VEHICLE =
  'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/title-register-your-vehicle';
const MD_TESTS =
  'https://mva.maryland.gov/licenses-ids/prepare-drivers-license-test';
const MD_PERMIT =
  'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/learners-permit';
const MD_PROVISIONAL =
  'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/provisional-license';
const MD_DRIVER_ED =
  'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/drivers-education';
const MD_INTERNATIONAL =
  'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/international-movers';
const MD_NONCOMPLIANT =
  'https://mva.maryland.gov/licenses-ids/additional-driver-id-services/noncompliant-drivers-licenses-ids';
const MD_ID_CARD =
  'https://mva.maryland.gov/licenses-ids/get-new-license-permit-or-id/identification-id-card';
const MD_HOME = 'https://mva.maryland.gov/';

const VA_REAL_ID =
  'https://www.dmv.virginia.gov/licenses-ids/real-id';
const VA_REAL_ID_FAQ =
  'https://www.dmv.virginia.gov/licenses-ids/real-id/faq';
const VA_DOCUMENT_GUIDE =
  'https://www.dmv.virginia.gov/sites/default/files/forms/dmv141.pdf';
const VA_APPLY =
  'https://www.dmv.virginia.gov/licenses-ids/license/applying';
const VA_ELIGIBILITY =
  'https://www.dmv.virginia.gov/licenses-ids/license/applying/eligibility';
const VA_RENEW =
  'https://www.dmv.virginia.gov/licenses-ids/license/renewing';
const VA_REPLACE =
  'https://www.dmv.virginia.gov/licenses-ids/license/replace';
const VA_REPLACE_ONLINE =
  'https://www.dmv.virginia.gov/online-services/replace-license';
const VA_UPDATE =
  'https://www.dmv.virginia.gov/records/personal-information-updates';
const VA_NEW_RESIDENT =
  'https://www.dmv.virginia.gov/moving/new-virginia';
const VA_KNOWLEDGE =
  'https://www.dmv.virginia.gov/licenses-ids/exams/know-exam';
const VA_ROAD_TEST =
  'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test';
const VA_PERMIT =
  'https://www.dmv.virginia.gov/licenses-ids/learners/apply';
const VA_FOREIGN =
  'https://www.dmv.virginia.gov/licenses-ids/license/applying/exchange-foreign-dl';
const VA_PRIVILEGE =
  'https://www.dmv.virginia.gov/licenses-ids/license/driver-privilege-card';
const VA_LEGAL_PRESENCE =
  'https://www.dmv.virginia.gov/licenses-ids/id-cards/legal-presence';
const VA_FEES =
  'https://www.dmv.virginia.gov/sites/default/files/forms/dmv201.pdf';
const VA_APPOINTMENTS =
  'https://www.dmv.virginia.gov/appointments';
const VA_TRACK =
  'https://www.dmv.virginia.gov/licenses-ids/license/applying/tracking';
const VA_ONLINE =
  'https://www.dmv.virginia.gov/online-services-all';

const NC_REAL_ID =
  'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/default.aspx';
const NC_REAL_ID_REQUIREMENTS =
  'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/requirements.aspx';
const NC_REAL_ID_WIZARD =
  'https://www.ncdot.gov/dmv/real-id-wizard/Pages/default.aspx';
const NC_NEW_DRIVERS =
  'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/default.aspx';
const NC_TESTS =
  'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx';
const NC_INTERPRETER =
  'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx';
const NC_SCHOOL_ROAD_TESTS =
  'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-schools-road-tests.aspx';
const NC_RENEW =
  'https://www.ncdot.gov/dmv/license-id/Pages/license-renewal.aspx';
const NC_REPLACE =
  'https://www.ncdot.gov/dmv/license-id/Pages/license-id-replacement.aspx';
const NC_FEES =
  'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/licenses-fees.aspx';
const NC_LEGAL_PRESENCE =
  'https://www.ncdot.gov/dmv/help/Pages/proving-legal-presence.aspx';
const NC_SSN =
  'https://www.ncdot.gov/dmv/help/Pages/proving-social-security.aspx';
const NC_INSURANCE =
  'https://www.ncdot.gov/dmv/help/Pages/proving-insurance.aspx';
const NC_MOVING =
  'https://www.ncdot.gov/dmv/help/moving/Pages/default.aspx';
const NC_NEW_RESIDENTS =
  'https://www.ncdot.gov/dmv/help/moving/Pages/new-residents.aspx';
const NC_MOVING_WITHIN =
  'https://www.ncdot.gov/dmv/help/moving/Pages/moving-within-nc.aspx';
const NC_STATE_TO_STATE =
  'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/state-to-state-verification.aspx';
const NC_APPOINTMENTS =
  'https://www.ncdot.gov/dmv/license-id/driver-license-appointments/Pages/default.aspx';
const NC_OFFICES =
  'https://www.ncdot.gov/dmv/offices-services/locate-dmv-office/Pages/dmv-offices.aspx';
const NC_UPLOAD_UPDATE =
  'https://www.ncdot.gov/news/press-releases/Pages/2026/2026-06-02-ncdmv-document-upload-tool.aspx';
const NC_HANDBOOK =
  'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Documents/driver-handbook.pdf';

const MI_REAL_ID = 'https://www.michigan.gov/sos/license-id/real-id';
const MI_LICENSE_ID =
  'https://www.michigan.gov/sos/license-id/license-and-id';
const MI_FIRST_TIME =
  'https://www.michigan.gov/sos/all-services/first-time-license-or-id';
const MI_SOS428 =
  'https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa';
const MI_NEW_RESIDENTS =
  'https://www.michigan.gov/sos/resources/communities/new-mi-residents';
const MI_DOCUMENT_REQUIREMENTS =
  'https://www.michigan.gov/sos/faqs/license-and-id/license-and-id-document-requirements';
const MI_NEW_DRIVERS =
  'https://www.michigan.gov/sos/license-id/new-drivers-18-older';
const MI_RENEW =
  'https://www.michigan.gov/sos/all-services/license-or-id-renewal';
const MI_REPLACE =
  'https://www.michigan.gov/sos/all-services/license-id-or-permit-replacement';
const MI_ADDRESS =
  'https://www.michigan.gov/sos/all-services/change-of-address';
const MI_LICENSE_FAQ =
  'https://www.michigan.gov/sos/faqs/license-and-id/licenses-and-id';
const MI_APPOINTMENTS =
  'https://www.michigan.gov/sos/faqs/resources/scheduling-an-office-visit';
const MI_ENHANCED =
  'https://www.michigan.gov/sos/all-services/enhanced-license-and-id';
const MI_FOREIGN_TABLE =
  'https://www.michigan.gov/sos/-/media/Project/Websites/sos/10lawensn/Foreign_DL_countries_palm_card.pdf?hash=6F19225BE4943DB7003B1FD3DAE9A44D&rev=d519354f7c0948e5aeeea5109dfccd3c';
const MI_FOREIGN_GUIDANCE =
  'https://www.michigan.gov/-/media/Project/Websites/sos/10lawensn/Foreign_DL_Law_Enforcement.pdf?rev=9fde1916b25c4e48a9f004d516952945';
const MI_MANUAL =
  'https://www.michigan.gov/sos/resources/forms/what-every-driver-must-know';
const MI_LANGUAGE =
  'https://www.michigan.gov/sos/language-services';
const MI_DRIVER_TESTING =
  'https://www.michigan.gov/sos/industry-services/driver-testing-businesses-and-examiners';
const MI_ONLINE_TEST =
  'https://www.michigan.gov/sos/resources/news/2025/07/02/michigan-secretary-of-state-now-offers-online-drivers-license-testing-for-adults';

const OH_REAL_ID = 'https://www.bmv.ohio.gov/dl-real-id.aspx';
const OH_DOCUMENTS =
  'https://www.bmv.ohio.gov/dl-identity-documents.aspx';
const OH_COMPLIANT_PDF =
  'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv2430.pdf';
const OH_STANDARD_PDF =
  'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv2424.pdf';
const OH_FIRST_ISSUANCE = 'https://www.bmv.ohio.gov/dl-gdl.aspx';
const OH_MANUAL =
  'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/hsy7607.pdf';
const OH_NON_US =
  'https://www.bmv.ohio.gov/dl-non-permanent-resident.aspx';
const OH_RENEW =
  'https://www.bmv.ohio.gov/dl-renewal-current.aspx';
const OH_REPRINT =
  'https://www.bmv.ohio.gov/dl-reprint-duplicate.aspx';
const OH_ID_CARD = 'https://www.bmv.ohio.gov/dl-id-card.aspx';
const OH_FEES = 'https://www.bmv.ohio.gov/doc-fees.aspx';
const OH_ONLINE = 'https://bmvonline.dps.ohio.gov/';
const OH_NEW_RESIDENTS = 'https://www.bmv.ohio.gov/new-to-ohio.aspx';
const OH_FORMS = 'https://www.bmv.ohio.gov/doc-forms.aspx';
const OH_LAW_TERM =
  'https://codes.ohio.gov/ohio-revised-code/section-4507.09/9-30-2025';
const OH_LAW_NEW_RESIDENT =
  'https://codes.ohio.gov/ohio-revised-code/section-4507.213';
const OH_LAW_RECIPROCITY =
  'https://codes.ohio.gov/ohio-revised-code/section-4507.101';
const OH_LAW_ONLINE =
  'https://codes.ohio.gov/ohio-revised-code/section-4507.061';

const AZ_TRAVEL_ID =
  'https://azdot.gov/mvd/services/driver-services/arizona-travel-id';
const AZ_DOCUMENTS =
  'https://apps.azdot.gov/files/mvd/mvd-forms-lib/40-5144.pdf';
const AZ_RESIDENCY_AFFIDAVIT =
  'https://apps.azdot.gov/files/mvd/mvd-forms-lib/40-5143.pdf';
const AZ_NEW_RESIDENT =
  'https://azdot.gov/mvd/services/driver-license-ID/new-to-arizona';
const AZ_FOREIGN =
  'https://azdot.gov/mvd/services/driver-license-ID/driver-license-foreign-applicants';
const AZ_PERMIT =
  'https://azdot.gov/mvd/services/driver-license-ID/permit-test';
const AZ_ROAD_TEST =
  'https://azdot.gov/mvd/services/driver-services/tests-manuals-and-driving-schools/road-tests';
const AZ_MANUAL =
  'https://apps.azdot.gov/files/mvd/mvd-forms-lib/99-0117.pdf';
const AZ_FEES =
  'https://azdot.gov/mvd/services/driver-services/driver-license-information/fees-driver-license';
const AZ_RENEW =
  'https://azdot.gov/mvd/services/driver-services/driver-license-information/renew-your-license';
const AZ_FAQ = 'https://azdot.gov/mvd/drivers-faq';
const AZ_REPLACE =
  'https://azdot.gov/mvd/services/driver-license-ID/replace-your-license';
const AZ_ADDRESS =
  'https://azdot.gov/mvd/services/driver-license-ID/change-your-address';
const AZ_NAME =
  'https://azdot.gov/mvd/services/driver-license-ID/change-your-name';
const AZ_ATP =
  'https://azdot.gov/mvd/services/professional-services/authorized-third-party-services';
const AZ_ATP_LOCATIONS =
  'https://azdot.gov/mvd/services/driver-services/authorized-third-party-driver-license-locations';
const AZ_IDENTITY =
  'https://azdot.gov/mvd/services/driver-services/driver-license-information/proof-identification-age-and-authorized';
const AZ_LICENSE_INFO =
  'https://azdot.gov/mvd/services/driver-services/driver-license-and-identification-information';
const AZ_ID_CARD =
  'https://azdot.gov/mvd/services/driver-license-ID/id-card';
const AZ_PORTAL = 'https://azmvdnow.gov/';
const AZ_LAW_ADDRESS = 'https://www.azleg.gov/ars/28/00448.htm';
const AZ_LAW_RESIDENT = 'https://www.azleg.gov/ars/28/02001.htm';
const AZ_LAW_NONRESIDENT = 'https://www.azleg.gov/ars/28/03152.htm';
const AZ_LAW_APPLICATION = 'https://www.azleg.gov/ars/28/03158.htm';
const AZ_LAW_EXAM = 'https://www.azleg.gov/ars/28/03164.htm';
const AZ_LAW_TERM = 'https://www.azleg.gov/ars/28/03171.htm';
const AZ_LAW_RECIPROCITY = 'https://www.azleg.gov/ars/28/00413.htm';
const AZ_LAW_FEES = 'https://www.azleg.gov/ars/28/03002.htm';

const CO_REAL_ID = 'https://dmv.colorado.gov/real-id-and-colorado';
const CO_DOCUMENTS = 'https://dmv.colorado.gov/documents';
const CO_DR2300A =
  'https://dmv.colorado.gov/sites/dmv/files/documents/DR%202300A_e_wo.pdf';
const CO_STANDARD =
  'https://dmv.colorado.gov/drivers/standard-license-and-ID-cards';
const CO_DR2300B =
  'https://dmv.colorado.gov/sites/dmv/files/documents/DR%202300B_e_wo.pdf';
const CO_DR2300C =
  'https://dmv.colorado.gov/sites/dmv/files/documents/DR2300C.pdf';
const CO_AFFIDAVIT =
  'https://dmv.colorado.gov/sites/dmv/files/251DR2212A.pdf';
const CO_NEW = 'https://dmv.colorado.gov/new-to-colorado';
const CO_FOREIGN =
  'https://dmv.colorado.gov/new-colorado-another-country';
const CO_ADULT_PERMIT = 'https://dmv.colorado.gov/adult-permit';
const CO_ADULT_LICENSE = 'https://dmv.colorado.gov/adult-license';
const CO_HOME_TEST =
  'https://dmv.colorado.gov/home-driving-knowledge-tests';
const CO_APPOINTMENT =
  'https://dmv.colorado.gov/AppointmentScheduling';
const CO_FEES = 'https://dmv.colorado.gov/state-dmv-fees';
const CO_RENEW =
  'https://dmv.colorado.gov/renew-your-colorado-driver-license-permit-or-id-card';
const CO_ADDRESS = 'https://dmv.colorado.gov/change-your-address';
const CO_FAQ = 'https://dmv.colorado.gov/faq-driver-license';
const CO_STANDARD_FAQ = 'https://dmv.colorado.gov/sb251-co-rcsa-faqs';
const CO_REPLACE =
  'https://dmv.colorado.gov/replace-your-lost-stolen-or-destroyed-driver-license/permit/cdl/id';
const CO_ID = 'https://dmv.colorado.gov/identification-cards';

const NV_REAL_ID = 'https://dmv.nv.gov/realid.htm';
const NV_RESIDENCY = 'https://dmv.nv.gov/dlresidency.htm';
const NV_DAC = 'https://dmv.nv.gov/dac.htm';
const NV_NEW = 'https://dmv.nv.gov/newresident.htm';
const NV_LAW = 'https://www.leg.state.nv.us/nrs/nrs-483.html';
const NV_HANDBOOK = 'https://dmv.nv.gov/pdfforms/dlbook.pdf';
const NV_FIRST = 'https://dmv.nv.gov/nvdlfirst.htm';
const NV_ADULT = 'https://dmv.nv.gov/nvdladult.htm';
const NV_TESTING = 'https://dmv.nv.gov/dltesting.htm';
const NV_ROAD = 'https://dmv.nv.gov/roadtestadult.htm';
const NV_WAIVER = 'https://dmv.nv.gov/pdfforms/dmv015.pdf';
const NV_TRANSLATORS = 'https://dmv.nv.gov/translators.asp';
const NV_FEES = 'https://dmv.nv.gov/dlfees.htm';
const NV_RENEW = 'https://dmv.nv.gov/dlrenewal.htm';
const NV_DUPLICATE = 'https://dmv.nv.gov/dlduplicate.htm';
const NV_ADDRESS = 'https://dmv.nv.gov/addchange.htm';
const NV_QUICK = 'https://dmv.nv.gov/quickcards.htm';
const NV_APPOINTMENTS = 'https://dmv.nv.gov/appointments.htm';
const NV_LOCATIONS = 'https://dmv.nv.gov/locat.htm';
const NV_ONLINE = 'https://dmv.nv.gov/onlineservices.htm';
const NV_ID = 'https://dmv.nv.gov/idcards.htm';
const NV_FAQ = 'https://dmv.nv.gov/faqs.htm';

const OR_REAL_ID =
  'https://www.oregon.gov/odot/dmv/pages/realidtraveler.aspx';
const OR_REAL_ID_FAQ =
  'https://www.oregon.gov/odot/dmv/pages/real_id.aspx';
const OR_IDENTITY =
  'https://www.oregon.gov/odot/dmv/pages/driverid/idproof.aspx';
const OR_DRIVER_INFO =
  'https://www.oregon.gov/odot/dmv/pages/online_quick_tips/driver_information.aspx';
const OR_NEW =
  'https://www.oregon.gov/odot/dmv/pages/new2or/moving.aspx';
const OR_RESIDENCY =
  'https://www.oregon.gov/odot/dmv/pages/driverid/residency.aspx';
const OR_LICENSE =
  'https://www.oregon.gov/odot/dmv/pages/driverid/licenseget.aspx';
const OR_ONLINE_TEST =
  'https://www.oregon.gov/odot/dmv/pages/online_services/online_knowledge_testing.aspx';
const OR_MANUAL_TESTING =
  'https://www.oregon.gov/odot/dmv/pages/online_manual/testing.aspx';
const OR_DRIVE_TEST =
  'https://www.oregon.gov/odot/dmv/pages/form/what_to_expect_on_your_drive_test.aspx';
const OR_TESTING_BUSINESS =
  'https://www.oregon.gov/odot/dmv/pages/driverid/classctestingbusiness.aspx';
const OR_FEES =
  'https://www.oregon.gov/odot/dmv/pages/fees/driver.aspx';
const OR_ADDRESS =
  'https://www.oregon.gov/odot/dmv/pages/dv/chgaddress.aspx';
const OR_NAME =
  'https://www.oregon.gov/odot/dmv/pages/dv/chgname.aspx';
const OR_APPOINTMENTS =
  'https://www.oregon.gov/odot/dmv/pages/appointments.aspx';
const OR_OFFICES =
  'https://www.oregon.gov/odot/dmv/pages/offices/index.aspx';
const OR_ID_CARD =
  'https://www.oregon.gov/odot/dmv/pages/driverid/idget.aspx';
const OR_HB2015 =
  'https://olis.oregonlegislature.gov/liz/2019R1/Measures/Overview/HB2015';

const CT_REAL_ID =
  'https://portal.ct.gov/dmv/licenses-permits-ids/get-real-id';
const CT_REAL_ID_CHECKLIST =
  'https://portal.ct.gov/dmv/-/media/dmv/dmv-pdfs/selectidaccptdocs3pdf.pdf';
const CT_LICENSE =
  'https://portal.ct.gov/dmv/licenses-permits-ids/get-a-drivers-license-ct?page=1';
const CT_TRANSFER =
  'https://portal.ct.gov/dmv/licenses-permits-ids/transfer-out-of-state-license';
const CT_ADULT_PERMIT =
  'https://portal.ct.gov/dmv/licenses-permits-ids/get-learners-permit/adult-learners-permit';
const CT_TESTS =
  'https://portal.ct.gov/dmv/licenses-permits-ids/take-knowledge-vision-test';
const CT_ROAD_TEST =
  'https://portal.ct.gov/dmv/licenses-permits-ids/take-road-test';
const CT_FEES = 'https://portal.ct.gov/dmv/resources/dmv-fees';
const CT_RENEW =
  'https://portal.ct.gov/dmv/licenses-permits-ids/renew-driver-license';
const CT_DUPLICATE =
  'https://portal.ct.gov/dmv/licenses-permits-ids/request-duplicate-driver-license';
const CT_CHANGE =
  'https://portal.ct.gov/dmv/licenses-permits-ids/change-driver-license';
const CT_DRIVE_ONLY =
  'https://portal.ct.gov/dmv/licenses-permits-ids/get-drive-only-license';
const CT_DRIVE_ONLY_CHECKLIST =
  'https://portal.ct.gov/dmv/-/media/dmv/dmv-pdfs/di4pdf.pdf';
const CT_RENEW_DRIVE_ONLY =
  'https://portal.ct.gov/dmv/licenses-permits-ids/renew-drive-only-license';
const CT_TRANSLATORS =
  'https://portal.ct.gov/dmv/resources/approved-translators';
const CT_ID =
  'https://portal.ct.gov/dmv/licenses-permits-ids/get-non-driver-id';
const CT_CENTRAL =
  'https://portal.ct.gov/dmv/licenses-permits-ids/get-a-drivers-license-ct/protect-your-identity-central-issuance-ct';
const CT_APPOINTMENTS =
  'https://portal.ct.gov/dmv/resources/make-change-appointment';
const CT_LOCATIONS =
  'https://portal.ct.gov/dmv/resources/locations-office-hours';
const MN_DVS_CONTACT =
  'https://dps.mn.gov/divisions/dvs/contact';
const MN_DVS_CONTACT_FORMS =
  'https://dps.mn.gov/divisions/dvs/contact/driver-services-online-contact-forms';
const MN_DVS_ONLINE_SERVICES =
  'https://onlineservices.dps.mn.gov/EServices/_/';
const MN_REAL_ID_REQUIREMENTS =
  'https://dvsinfohub.dps.mn.gov/Documents/updated-REALID-identification-requirements.pdf';
const MN_REAL_ID_DOCS =
  'https://assets.dps.mn.gov/files/dvs/dvs-real-id-document-requirements.pdf';
const MN_SIDE_BY_SIDE =
  'https://dvsinfohub.dps.mn.gov/resources/Documents/FastDS/Side_by_Side_Requirements.pdf';
const MN_REAL_ID_INFOGRAPHIC =
  'https://dvsinfohub.dps.mn.gov/Documents/RealIDInfographic.pdf';
const MN_SAME_DAY =
  'https://dvsinfohub.dps.mn.gov/Documents/Elimination%20of%20Same-Day%20Standard%20Driver%20License%20-%20FAQ.pdf';
const MN_RENEW =
  'https://dps.mn.gov/divisions/dvs/license-and-id/common-transactions-all-dl-and-id-card-types/renew-your-dl-id-card';
const MN_ADDRESS =
  'https://dps.mn.gov/divisions/dvs/license-and-id/common-transactions-all-dl-and-id-card-types/change-your-address-your-dl-id-card';
const MN_ID_CARD =
  'https://dps.mn.gov/divisions/dvs/license-and-id/dl-and-id-card-information/id-id-card';
const MN_NEW_RESIDENT_VEHICLE =
  'https://dps.mn.gov/divisions/dvs/vehicle/vehicle-registration-new-mn-resident';
const MN_APP =
  'https://assets.dps.mn.gov/files/dvs/dvs-license-permit-id-application.pdf';
const MN_FAQ =
  'https://dvsinfohub.dps.mn.gov/Documents/DeputyRegistrarFAQ.pdf';
const MN_LAW_171_06 =
  'https://www.revisor.mn.gov/statutes/cite/171.06';
const MN_LAW_171_01 =
  'https://www.revisor.mn.gov/statutes/cite/171.01';
const IN_REAL_ID =
  'https://www.in.gov/bmv/licenses-permits-ids/real-id-overview/';
const IN_DOCS =
  'https://www.in.gov/bmv/files/BMV_Documentation_List.pdf';
const IN_NEW_RESIDENTS =
  'https://www.in.gov/bmv/licenses-permits-ids/new-indiana-residents';
const IN_OUT_COUNTRY =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/out-of-country-licenses';
const IN_DRIVER_LICENSE =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/drivers-license/';
const IN_RENEW =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/drivers-license/renewing-a-drivers-license-learners-permit-or-identification-card/';
const IN_REPLACE =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/drivers-license/replacing-a-drivers-license-learners-permit-or-identification-card';
const IN_AMEND =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/drivers-license/amending-your-drivers-license-or-identification-card';
const IN_BRANCH_VISITS =
  'https://www.in.gov/bmv/branch-locations-and-hours/preparing-for-branch-visits/';
const IN_MAIL =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/receiving-your-drivers-license-or-id-card-through-the-mail/';
const IN_DRIVER_MANUAL =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/learners-permit/drivers-manual/';
const IN_SAVE =
  'https://www.in.gov/bmv/licenses-permits-ids/real-id-overview/systematic-alien-verification-for-entitlements-save-program/';
const IN_SKILLS =
  'https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/drivers-license/driving-skill-examination';
const AK_NEW = 'https://dmv.alaska.gov/general-information/visiting-or-new-to-alaska/';
const AK_REAL_ID = 'https://dmv.alaska.gov/credential-services/realidupdate/';
const AK_REAL_ID_DOCS =
  'https://dmv.alaska.gov/media/ozwhxz3e/ak-real-id-checklist.pdf';
const AK_STANDARD_DOCS =
  'https://dmv.alaska.gov/media/1eyni4yh/standard-alaska-checklist.pdf';
const AK_REAL_ID_TOOL =
  'https://online.dmv.alaska.gov/RealIDChecklist/Home/Checklist';
const AK_FOREIGN =
  'https://dmv.alaska.gov/credential-services/new-to-alaska-from-another-country/';
const AK_IDP =
  'https://dmv.alaska.gov/credential-services/international-driving-permit/';
const AK_RENEW =
  'https://dmv.alaska.gov/credential-services/renew-your-alaska-driver-license/';
const AK_DUPLICATE =
  'https://dmv.alaska.gov/credential-services/duplicate-alaska-driver-license/';
const AK_CHANGE =
  'https://dmv.alaska.gov/credential-services/changing-identification-details/';
const AK_FEES = 'https://dmv.alaska.gov/credential-services/license-fees/';
const AK_LOCATIONS =
  'https://dmv.alaska.gov/locations/state-dmv-office-locations/';
const AK_PARTNERS = 'https://dmv.alaska.gov/locations/business-partners/';
const AK_RURAL =
  'https://dmv.alaska.gov/credential-services/guide-to-rural-driving-information/';
const AK_OUTREACH = 'https://dmv.alaska.gov/general-information/rural-outreach/';
const AK_TRANSLATION =
  'https://dmv.alaska.gov/media/nn3cydgn/translationpdf.pdf';
const AK_MANUAL = 'https://dmv.alaska.gov/media/t5ef5vi2/dlman.pdf';
const AK_ONLINE = 'https://online.dmv.alaska.gov/';
const AR_REAL_ID = 'https://www.dfa.arkansas.gov/real-id/';
const AR_REAL_ID_DOCS =
  'https://www.dfa.arkansas.gov/wp-content/uploads/Proof_ofLegalPresence_08142025.pdf';
const AR_WHAT_YOU_NEED = 'https://www.dfa.arkansas.gov/do-you-have-what-you-need/';
const AR_DRIVER_SERVICES = 'https://www.dfa.arkansas.gov/office/driver-services/';
const AR_NCL =
  'https://www.dfa.arkansas.gov/office/driver-services/licenses-ids-permits/non-commercial-information-ncl/';
const AR_FAQ =
  'https://www.dfa.arkansas.gov/office/motor-vehicle/faqs-for-dsmv/';
const AR_ONLINE = 'https://www.dfa.arkansas.gov/online-services/drivers/';
const AR_LOCATIONS =
  'https://www.dfa.arkansas.gov/all-county-offices/?_sft_office-location-category=revenue-office';
const AR_FORMS =
  'https://www.dfa.arkansas.gov/office/driver-services/driver-services-forms/';
const AR_ADDRESS =
  'https://www.dfa.arkansas.gov/wp-content/uploads/Address_Change_with_Voter_Information.pdf';
const AR_NAME_AFFIDAVIT =
  'https://www.dfa.arkansas.gov/wp-content/uploads/Affidavit_of_Legal_Name_Change_2019.pdf';
const AR_EXAM =
  'https://dps.arkansas.gov/law-enforcement/arkansas-state-police/services-programs/driver-examination/';
const AR_MANUAL =
  'https://dps.arkansas.gov/wp-content/uploads/Arkansas-DL-Manual-English.pdf';
const HI_HIDOT = 'https://hidot.hawaii.gov/driverslicense/';
const HI_DOCS_2024 =
  'https://www.honolulu.gov/csd/wp-content/uploads/sites/6/2024/03/Acceptable-Documents-for-a-REAL-ID-Compliant-Star-DL-SID-Print-Button-2024-03-13.pdf';
const HI_HON_REAL_ID = 'https://www.honolulu.gov/csd/real-id/';
const HI_HON_PROCEDURES =
  'https://www.honolulu.gov/csd/drivers-license-procedures/';
const HI_HON_FOREIGN =
  'https://www.honolulu.gov/csd/foreign-drivers-license/';
const HI_HON_REQUIREMENTS =
  'https://www.honolulu.gov/csd/drivers-license-requirements/';
const HI_HON_FAQ = 'https://www.honolulu.gov/csd/drivers-license-faq/';
const HI_HON_LOCATIONS =
  'https://www.honolulu.gov/csd/services-and-locations/';
const HI_MAUI_DMV = 'https://www.mauicounty.gov/1328/DMV';
const HI_MAUI_APPOINTMENTS = 'https://www.mauicounty.gov/2145';
const HI_MAUI_OFFICES = 'https://www.mauicounty.gov/2125/DMV-Wait-Times';
const HI_HAWAII_COUNTY_DRIVER =
  'https://www.vrl.hawaiicounty.gov/driver-s-licensing';
const HI_HAWAII_COUNTY_APPOINTMENTS =
  'https://www.vrl.hawaiicounty.gov/other-services/all-appointment-page';
const HI_HAWAII_COUNTY_TRANSFER =
  'https://www.vrl.hawaiicounty.gov/driver-s-licensing/out-of-state-transfers';
const HI_HAWAII_COUNTY_REAL_ID =
  'https://www.vrl.hawaiicounty.gov/driver-s-licensing/real-id-requirements';
const HI_KAUAI_DMV =
  'https://www.kauai.gov/Government/Departments-Agencies/Finance/Drivers-Licensing-and-Motor-Vehicles';
const HI_KAUAI_REAL_ID =
  'https://www.kauai.gov/Government/Departments-Agencies/Finance/Drivers-Licensing-and-Motor-Vehicles/REAL-ID';
const HI_KAUAI_TRANSFER =
  'https://www.kauai.gov/Government/Departments-Agencies/Finance/Drivers-Licensing-and-Motor-Vehicles/Out-of-State-License-Transfers';
const HI_KAUAI_RENEW =
  'https://www.kauai.gov/Government/Departments-Agencies/Finance/Drivers-Licensing-and-Motor-Vehicles/Hawaii-Drivers-License-Renewals';
const HI_COUNTY_HUBS = [
  HI_HON_LOCATIONS,
  HI_MAUI_DMV,
  HI_HAWAII_COUNTY_DRIVER,
  HI_KAUAI_DMV,
];
const HI_COUNTY_APPOINTMENTS = [
  HI_HON_LOCATIONS,
  HI_MAUI_APPOINTMENTS,
  HI_HAWAII_COUNTY_APPOINTMENTS,
  HI_KAUAI_DMV,
];
const WY_DRIVER =
  'https://www.dot.state.wy.us/home/driver_license_records/driver-license.html';
const WY_REAL_ID =
  'https://www.dot.state.wy.us/news/wyoming-driver-licenses-id-cards-are-real-id-compliant';
const WY_US_DOCS =
  'https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/Forms/Documents%20Required%20US%2020250922.pdf';
const WY_NON_US_DOCS =
  'https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/Forms/Documents%20Required%20non-US%2020250922.pdf';
const WY_TESTING =
  'https://www.dot.state.wy.us/home/driver_license_records/driver-license/testing.html';
const WY_RENEW =
  'https://www.dot.state.wy.us/home/driver_license_records/driver-license/lost--renewal.html';
const WY_CHANGE =
  'https://www.dot.state.wy.us/home/driver_license_records/add_or_change_information.html';
const WY_ONEWYO =
  'https://www.dot.state.wy.us/home/driver_license_records/onewyo.html';
const WY_FAQ =
  'https://www.dot.state.wy.us/home/driver_license_records/frequently-asked-questions.default.html';
const WY_DOC_HUB = 'https://www.dot.state.wy.us/DS-documents-1';
const WY_MANUALS =
  'https://dot.state.wy.us/home/driver_license_records/formsapplications/driver-manuals.html';
const WY_LOCATIONS =
  'https://wydot.maps.arcgis.com/apps/Shortlist/index.html?appid=f7834c5fa12c4090b07172d159dbfafd';
const WY_ADDRESS =
  'https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/Forms/Address%20Change%2020190715.pdf';
const TN_REAL_ID =
  'https://www.tn.gov/safety/driver-services/helpful-information/real-id.html';
const TN_NEW_RESIDENTS =
  'https://www.tn.gov/safety/driver-services/classd/dlnew.html';
const TN_ADULT_FIRST =
  'https://www.tn.gov/safety/driver-services/classd/new-drivers.html';
const TN_TYPES =
  'https://www.tn.gov/safety/driver-services/helpful-information/dlinfo.html';
const TN_ID_ONLY = 'https://www.tn.gov/safety/driver-services/idonly.html';
const TN_REGULAR = 'https://www.tn.gov/safety/driver-services/classd.html';
const TN_RENEW =
  'https://www.tn.gov/safety/driver-services/helpful-information/dlrenew.html';
const TN_REPLACE =
  'https://www.tn.gov/safety/driver-services/helpful-information/dlduplicate.html';
const TN_ADDRESS =
  'https://www.tn.gov/safety/driver-services/helpful-information/address-change.html';
const TN_RESIDENCY =
  'https://www.tn.gov/safety/driver-services/helpful-information/tnresidency.html';
const TN_NAME =
  'https://www.tn.gov/safety/driver-services/helpful-information/dlnamechange.html';
const TN_FEES =
  'https://www.tn.gov/safety/driver-services/helpful-information/fees.html';
const TN_MVR =
  'https://www.tn.gov/safety/driver-services/helpful-information/mvrverification.html';
const TN_LOCATIONS = 'https://www.tn.gov/safety/driver-services/locations.html';
const TN_MANUAL =
  'https://www.tn.gov/content/dam/tn/safety/documents/DL_Manual.pdf';
const ME_REAL_ID =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/real-id';
const ME_REAL_ID_PDF =
  'https://www.maine.gov/sos/sites/maine.gov.sos/files/content/assets/MVL-9Checklist-20Brochure-20Revised-207-2022.pdf';
const ME_HOME = 'https://www.maine.gov/sos/bmv';
const ME_ONLINE = 'https://apps1.web.maine.gov/online/bmv/dlr_v2/';
const ME_ONLINE_FAQ = 'https://www.maine.gov/online/bmv/dlr/faq.html';
const ME_NEW_RESIDENT =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/i-moved-to-from-a-different-state';
const ME_RENEW =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/update-my-current-license/renew-my-license';
const ME_UPDATE =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/update-my-current-license';
const ME_DUPLICATE =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/update-my-current-license/replacement-duplicate-license-identification-card';
const ME_EXAM =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/car-license/drivers-license-exam';
const ME_RESIDENCY =
  'https://www.maine.gov/sos/bmv/visit-your-bmv-branch/how-to-prove-maine-residency';
const ME_NONCITIZEN =
  'https://www.maine.gov/sos/bmv/visit-your-bmv-branch/how-to-prove-legal-presence-for-a-non-united-states-citizen';
const ME_CITIZEN =
  'https://www.maine.gov/sos/bmv/visit-your-bmv-branch/how-to-prove-united-states-citizenship';
const ME_FEES =
  'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/drivers-license-and-examination-fees';
const ME_BRANCHES =
  'https://www.maine.gov/sos/bmv/visit-your-bmv-branch/find-your-local-branch';
const ME_APPOINTMENTS = 'https://mainebmvappt.cxmflow.com/';
const MS_HOME = 'https://www.driverservicebureau.dps.ms.gov/';
const MS_REQUIRED = 'https://www.driverservicebureau.dps.ms.gov/node/303';
const MS_CLASS_R =
  'https://www.driverservicebureau.dps.ms.gov/Drivers/ClassR';
const MS_MANUAL =
  'https://www.driverservicebureau.dps.ms.gov/sites/default/files/2025-02/1.15.2025%20Revised%20MDPS%20Driver%27s%20Manual.pdf';
const MS_APPLICATION =
  'https://www.driverservicebureau.dps.ms.gov/sites/default/files/2025-02/DLapplication_2.6.2025.pdf';
const MS_RENEW = 'https://www.driverservicebureau.dps.ms.gov/node/298';
const MS_ONLINE = 'https://www.ms.gov/dps/license_renewal/';
const MS_ONLINE_LICENSE = 'https://www.ms.gov/dps/license_renewal/License';
const MS_CHANGE_ADDRESS =
  'https://www.ms.gov/dps/license_renewal/ChangeAddress';
const MS_DUPLICATE =
  'https://www.driverservicebureau.dps.ms.gov/Drivers/Duplicate_License';
const MS_ONLINE_DUPLICATE =
  'https://www.ms.gov/dps/license_renewal/Duplicate';
const MS_ID =
  'https://www.driverservicebureau.dps.ms.gov/Drivers/Identification_Cards';
const MS_NONCITIZEN =
  'https://www.driverservicebureau.dps.ms.gov/Drivers/Non_Citizen';
const MS_NONCITIZEN_VERIFY =
  'https://www.driverservicebureau.dps.ms.gov/Security/Non_US_Status_Verification';
const MS_LEARNER =
  'https://www.driverservicebureau.dps.ms.gov/Drivers/Learners_Permit';
const MS_INTERPRETER =
  'https://www.driverservicebureau.dps.ms.gov/sites/default/files/2025-03/MDPS%20-%20Interpreter%20Oath.pdf';
const MS_DRIVER_ED = 'https://www.driverservicebureau.dps.ms.gov/node/400';
const MS_FEES =
  'https://www.driverservicebureau.dps.ms.gov/Drivers/Driver_Service_Fees';
const MS_LOCATIONS =
  'https://www.driverservicebureau.dps.ms.gov/drivers/driver_license_locations';
const MS_APPOINTMENTS = 'https://telegov.egov.com/dps';
const MS_FAQ =
  'https://www.driverservicebureau.dps.ms.gov/frequently-asked-questions';

export const reviewedStateEvidence: Record<string, ReviewedStateEvidence> = {
  mississippi: {
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      MS_HOME,
      MS_REQUIRED,
      MS_CLASS_R,
      MS_MANUAL,
      MS_APPLICATION,
      MS_RENEW,
      MS_ONLINE,
      MS_ONLINE_LICENSE,
      MS_CHANGE_ADDRESS,
      MS_DUPLICATE,
      MS_ONLINE_DUPLICATE,
      MS_ID,
      MS_NONCITIZEN,
      MS_NONCITIZEN_VERIFY,
      MS_LEARNER,
      MS_INTERPRETER,
      MS_DRIVER_ED,
      MS_FEES,
      MS_LOCATIONS,
      MS_APPOINTMENTS,
      MS_FAQ,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Mississippi DSB 的 Class R、2025 Driver Manual / application、Required Documents、renewal、online renewal / duplicate / change address、State ID、non-citizen / SAVE、learner permit、interpreter oath、2026 driver-education update、fees、locations、appointment、FAQ 与 TSA 当前身份证件页面。',
    notes:
      '重写 Mississippi 两页并登记显式声明级来源；确认全州 credential 自动 Gold Star，拆分 first / transfer / renewal / duplicate / address / non-citizen / testing 路线，并公开标记过期外州证件考试门槛和旧 2023 REAL ID deadline 两组官方冲突。',
    claims: {
      'Mississippi 的路线与多数州不同：DSB FAQ 写明本州签发的 driver license 和 ID 都是 REAL ID compliant，并自动带 Gold Star，不需要另选 standard credential': [MS_FAQ],
      '首次申请、外州转入和非公民业务走 Driver Service station': [MS_CLASS_R, MS_MANUAL, MS_NONCITIZEN, MS_LOCATIONS],
      '符合条件的 U.S. citizen 可线上续期、补证或在续期/补证过程中改地址': [MS_ONLINE_LICENSE, MS_ONLINE_DUPLICATE, MS_CHANGE_ADDRESS],
      'Mississippi 不设普通驾照与 REAL ID 的升级二选一，州 FAQ 说明所有 Mississippi driver license / ID 自动为 Gold Star compliant credential': [MS_FAQ],
      '首次 credential 仍要准备 completed application、original 或 certified birth / identity document、SSN card 或显示完整九位号码的政府文件、两份带 physical Mississippi address 的 domicile documents，以及适用的 legal name-change papers': [MS_REQUIRED, MS_CLASS_R, MS_APPLICATION],
      '新居民按官方驾驶手册应在搬入后 60 天内取得 Mississippi license，并交回外州证件': [MS_MANUAL, MS_APPLICATION],
      '有效外州驾照通常免 computerized exam，但仍要 vision screening': [MS_MANUAL, MS_CLASS_R],
      '当前 Class R 页面把任何 expired out-of-state license 都列为要考 knowledge exam，而 2025 manual 写成过期超过 30 天，边界有冲突，应按当前业务页准备考试并在预约前向 DSB 确认': [MS_CLASS_R, MS_MANUAL, MS_APPOINTMENTS],
      'DSB 对所有申请人都强烈建议预约': [MS_CLASS_R, MS_RENEW, MS_NONCITIZEN, MS_APPOINTMENTS],
      '线上 renewal 只适用于 U.S. citizen 的有效 Class R / Class D，并允许最早到期前六个月、最迟过期一年内办理且不能连续两次 online': [MS_ONLINE_LICENSE, MS_RENEW],
      'non-U.S. citizen、过期超过十二个月、没有有效照片或需要立即拿 duplicate 的申请人应到 Driver Service station': [MS_NONCITIZEN, MS_RENEW, MS_ONLINE_LICENSE, MS_ONLINE_DUPLICATE, MS_DUPLICATE],
      'Mississippi FAQ 明确写着所有 Mississippi driver licenses 和 ID 都是 REAL ID compliant，并自动显示 Gold Star': [MS_FAQ],
      '线上续期同样会取得 Gold Star，不应再写成 standard 与 REAL ID 二选一': [MS_FAQ],
      'DSB FAQ 同一处仍保留“REAL ID deadline 延到 May 3, 2023”的旧答案': [MS_FAQ],
      '该日期已经失效，机场身份证件以 TSA 当前规则为准': [MS_FAQ, TSA_IDENTIFICATION],
      '新居民手册要求搬入 Mississippi 后 60 天内换驾照，交回所有外州证件': [MS_MANUAL, MS_APPLICATION],
      '外州证件遗失时要向 Driver License office 领取 Affidavit of Inability to Surrender，并对签名做 notarization': [MS_MANUAL],
      '有效外州驾照转入可免 Computerized Exam，但仍要 vision screening': [MS_MANUAL, MS_CLASS_R],
      '考试边界存在官方表述差异：当前 Class R 页面说 expired out-of-state license 要考，2025 manual 则写过期超过 30 天才考': [MS_CLASS_R, MS_MANUAL],
      '保守做法是过期证件都按需考准备并向 DSB 确认': [MS_CLASS_R, MS_MANUAL, MS_APPOINTMENTS],
      '首次 Class R 当前费用为 4 年 $24 或 8 年 $47': [MS_CLASS_R, MS_FEES],
      '申请人通常要 completed application、original birth certificate 或 acceptable document、完整九位 SSN 证明、两份不超过 60 天的 residency 和适用的 legal name-change documents': [MS_CLASS_R, MS_REQUIRED, MS_APPLICATION],
      '17 岁及以上首次申请人无需持 permit 12 个月，可在同一天完成 permit 与 license 路线，但要通过 knowledge 和 eye exam': [MS_CLASS_R, MS_LEARNER],
      '当前 Class R 页面还写明 regular license 暂不要求 skills / road test': [MS_CLASS_R],
      '16 岁申请人通常要持 learner permit 12 个月或直到 17 岁，以先到者为准，并准备 valid permit、更新的 school attendance form 和 Waiver of Road Testing Affidavit': [MS_CLASS_R, MS_LEARNER],
      'DSB 2026 年 6 月更新写明：自 2027 年 7 月 1 日起，所有 new driver 取得 regular license 都要完成 certified Driver Education': [MS_DRIVER_ED],
      '自 2026 年 7 月 1 日起，Hardship License 只接受 DPS 或 MDE certified instructor 完成的课程': [MS_DRIVER_ED],
      '需要考试口译时，申请人要自行携带 interpreter，并提交经过 notarization 的 Mississippi Interpreter Oath': [MS_CLASS_R, MS_INTERPRETER],
      '口译员只能准确翻译，不能给答案、提示或解释题意': [MS_INTERPRETER],
      '普通续期最早可在到期前六个月办理': [MS_RENEW, MS_ONLINE_LICENSE],
      '未过期超过 12 个月可 online 或到 station，超过 12 个月必须现场，过期续期加 $1 late fee': [MS_RENEW, MS_FEES],
      '线上续期只允许 every other renewal': [MS_RENEW],
      '上一次已 online renewal 的，本次要到 Driver Service station': [MS_RENEW],
      'online license renewal 还要求 U.S. citizen、有效 Class R / Class D、有效照片和本人办理': [MS_ONLINE_LICENSE],
      '续期页面说证件过期不超过 60 个月通常不要求文件，但 DSB 也提醒新 records system 可能没有完整历史材料': [MS_RENEW],
      '带 birth certificate、SSN 和两份 residency 可减少现场中断': [MS_RENEW, MS_REQUIRED],
      '超过 60 个月必须重交材料，driver license 还要重考 knowledge exam': [MS_RENEW, MS_CLASS_R],
      'non-U.S. citizen 必须在到期前 30 天内才可续期，必须本人带 Homeland Security immigration documents 到 station，不能 online renewal': [MS_NONCITIZEN, MS_RENEW],
      '证件期限按 authorized stay 决定且最长四年': [MS_NONCITIZEN],
      'non-U.S. citizen 的 lawful status 要经 SAVE 核验': [MS_NONCITIZEN, MS_NONCITIZEN_VERIFY],
      '不能即时验证时，官方提示制证可能延迟最多 30 天，并可能要求补件': [MS_NONCITIZEN],
      'SSN 只在 applicable 时提供，不要把公民材料清单原样套到所有移民类别': [MS_NONCITIZEN, MS_MANUAL],
      'duplicate driver license / ID 费用为 $11，可 online 申请': [MS_DUPLICATE, MS_FEES, MS_ONLINE_DUPLICATE],
      '需要立即取得证件或没有有效照片时应到 station，现场会重新拍照并填写 duplicate application': [MS_DUPLICATE, MS_ONLINE_DUPLICATE],
      '线上改地址不能单独免费完成：官方 portal 要求同时订 duplicate credential，或在符合资格的 online renewal 中修改': [MS_CHANGE_ADDRESS, MS_ONLINE_DUPLICATE, MS_ONLINE_LICENSE],
      '成品只寄到 credential 地址，不能寄 P.O. Box 或 alternate address': [MS_CHANGE_ADDRESS, MS_ONLINE_DUPLICATE, MS_ONLINE_LICENSE],
      '新 State ID 可由六岁及以上申请人办理，4 年 $17、8 年 $33': [MS_ID, MS_FEES],
      '材料仍包括申请表、原件或 certified identity、SSN 证明、两份 residency 和姓名变化法律文件': [MS_ID, MS_REQUIRED],
      'Completed and signed Mississippi Driver License / ID application': [MS_CLASS_R, MS_APPLICATION],
      '外州转入还要带 out-of-state credential，遗失时按 DSB 手册取得 notarized inability-to-surrender affidavit': [MS_MANUAL, MS_APPLICATION],
      'Date of birth / identity 使用带 state seal 和 certificate number 的 original 或 certified birth certificate，或 Certificate of Naturalization / Citizenship': [MS_REQUIRED],
      '普通 photocopy 不接受': [MS_REQUIRED, MS_ID, MS_LEARNER],
      'SSN 使用 Social Security Card，或显示申请人姓名与完整九位 SSN 的 official government correspondence，例如 returned W-2 / 1099、pay stub、DD-214 或 NGB-22': [MS_REQUIRED],
      '首次 Class R 的两份 Mississippi residency 应带本人姓名和 physical residence address，并且当前 Class R 页面要求不超过 60 天': [MS_CLASS_R, MS_REQUIRED],
      'P.O. Box、junk / soliciting mail、envelope、handwritten document / letter 和 blank check 不能作为 domicile proof': [MS_REQUIRED],
      '常见地址文件包括 utility / internet / phone bill、bank or credit-card statement、pay stub、lease、insurance、vehicle title / registration、tax / government document 或 property record': [MS_REQUIRED],
      '最终由 DSB 判断是否接受': [MS_REQUIRED],
      '21 岁以下可使用 parent / guardian domicile 文件': [MS_CLASS_R, MS_REQUIRED],
      '21 岁以上没有本人账单时，可用 spouse / parent 文件并以 marriage license 或 birth certificate 证明关系': [MS_REQUIRED],
      'roommate、landlord、parent 或 guardian 路线可用 official Proof of Domicile Affidavit，再配同址 driver license / ID 或一份合格 domicile document，凑足两份': [MS_REQUIRED],
      '姓名变化只接受 Marriage License、Divorce Decree、Adoption Order 或 Court Order': [MS_REQUIRED, MS_APPLICATION],
      '首次交易时 SSN card 不一定已改成新姓名，但 DSB 强烈建议续期前更新': [MS_REQUIRED],
      'non-U.S. citizen 根据身份准备 passport、I-94、valid visa、I-551、I-766、I-20、DS-2019、I-797 等当前类别要求': [MS_NONCITIZEN, MS_NONCITIZEN_VERIFY],
      '所有 supporting documents 上的姓名和出生日期要一致': [MS_NONCITIZEN],
      '以为 Mississippi 还要在 standard 与 REAL ID 之间选择，另外寻找不存在的升级流程': [MS_FAQ],
      '继续引用 DSB FAQ 内已经失效的 May 3, 2023 REAL ID deadline': [MS_FAQ, TSA_IDENTIFICATION],
      '外州证件已经过期，却只按 valid transfer 的免考路线准备，没有预留 knowledge exam': [MS_CLASS_R, MS_MANUAL],
      '把中国或其他外国驾照当作 U.S. out-of-state transfer': [MS_MANUAL, MS_CLASS_R, MS_NONCITIZEN],
      'DSB 公布的免考转入规则只写有效外州 license，非公民仍要走 original / lawful-status 与考试路线': [MS_CLASS_R, MS_NONCITIZEN],
      '地址证明使用 P.O. Box、信封、junk mail、手写信、blank check，或首次 Class R 文件已经超过 60 天': [MS_REQUIRED, MS_CLASS_R],
      'SSN 文件只显示后四位，或没有申请人姓名和完整九位号码': [MS_REQUIRED],
      '姓名变化只带普通复印件、姓名声明或翻译件，没有 marriage / divorce / adoption / court order 原件链': [MS_REQUIRED, MS_APPLICATION],
      '上次已经 online renewal，本次仍直接在线付款': [MS_RENEW],
      'Mississippi 只允许 every other renewal online': [MS_RENEW],
      'non-U.S. citizen 提前超过 30 天续期、尝试 online renewal，或没有带完整 Homeland Security documents': [MS_NONCITIZEN, MS_RENEW],
      '只在线提交独立地址更新': [MS_CHANGE_ADDRESS],
      'portal 要求把地址变更放进 renewal 或 duplicate，而且不会寄到 P.O. Box / alternate address': [MS_CHANGE_ADDRESS, MS_ONLINE_DUPLICATE, MS_ONLINE_LICENSE],
      '先选业务：first license、valid / expired out-of-state transfer、renewal、duplicate / address、State ID 或 non-U.S. citizen': [MS_CLASS_R, MS_MANUAL, MS_RENEW, MS_DUPLICATE, MS_ID, MS_NONCITIZEN],
      'Mississippi 不需要单独选择 REAL ID upgrade': [MS_FAQ],
      '首次或外州转入按 application、identity / birth、full-nine-digit SSN、two recent physical-address proofs、name-change chain 分组原件': [MS_CLASS_R, MS_REQUIRED, MS_APPLICATION],
      '新居民在 60 天内预约 station': [MS_MANUAL, MS_APPOINTMENTS],
      '带外州 credential，遗失时先取得 notarized inability-to-surrender affidavit': [MS_MANUAL, MS_APPLICATION],
      '证件过期则按 knowledge exam 路线准备': [MS_CLASS_R, MS_MANUAL],
      '首次申请前确认年龄路线：17 岁及以上准备 knowledge + eye exam': [MS_CLASS_R, MS_LEARNER],
      '16 岁路线另核对 12-month permit、school form 和 road-test waiver': [MS_CLASS_R, MS_LEARNER],
      '需要中文口译时下载 Interpreter Oath，提前找到 interpreter 并完成 notarization': [MS_CLASS_R, MS_INTERPRETER],
      '口译员不得解释或提示答案': [MS_INTERPRETER],
      '续期先核对是否 U.S. citizen、Class R / D、有效照片、过期未超一年，以及上一次是否 online': [MS_ONLINE_LICENSE, MS_RENEW],
      '任一不符就预约 station': [MS_RENEW, MS_ONLINE_LICENSE, MS_APPOINTMENTS],
      '续期即使未满 60 个月也带核心材料备份': [MS_RENEW, MS_REQUIRED],
      '超过 60 个月则必须按 first-credential 材料和 knowledge exam 准备': [MS_RENEW, MS_CLASS_R],
      'non-U.S. citizen 在到期前 30 天内预约现场，按具体 immigration category 整理原件，并为 SAVE 最多 30 天的追加核验留出时间': [MS_NONCITIZEN, MS_NONCITIZEN_VERIFY, MS_APPOINTMENTS],
      '改地址时选择 eligible online renewal 或 $11 duplicate': [MS_CHANGE_ADDRESS, MS_ONLINE_LICENSE, MS_DUPLICATE, MS_FEES],
      '先确认 USPS 会投递到 physical address，不能使用 P.O. Box 或 alternate mailing address': [MS_CHANGE_ADDRESS, MS_ONLINE_DUPLICATE, MS_ONLINE_LICENSE],
      '查看具体 Driver Service location 和 appointment confirmation': [MS_LOCATIONS, MS_APPOINTMENTS],
      '计划在 2027 年 7 月 1 日后首次领证的申请人还要检查 certified Driver Education 新要求': [MS_DRIVER_ED],
    },
  },
  maine: {
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      ME_REAL_ID,
      ME_REAL_ID_PDF,
      ME_HOME,
      ME_ONLINE,
      ME_ONLINE_FAQ,
      ME_NEW_RESIDENT,
      ME_RENEW,
      ME_UPDATE,
      ME_DUPLICATE,
      ME_EXAM,
      ME_RESIDENCY,
      ME_NONCITIZEN,
      ME_CITIZEN,
      ME_FEES,
      ME_BRANCHES,
      ME_APPOINTMENTS,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Maine BMV 当前 REAL ID、online transaction、renewal、update、duplicate、new-resident、residency、citizen / non-citizen legal-presence、exam / interpreter、fees、branch、appointment 与 TSA 身份证件页面，并把 2022 brochure 和旧 online FAQ 的冲突表述单独标记。',
    notes:
      '重写 Maine 两页并建立显式声明级来源；重点区分首次 / 升级 REAL ID、已有 REAL ID online / AAA、外州 transfer、非公民、地址变更、duplicate 和 interpreter 路线，旧文档只用于解释历史冲突，不作为当前渠道依据。',
    claims: {
      'Maine BMV 的办理路线在 2025 年 11 月后发生了重要变化：首次申请或从 standard credential 升级 REAL ID 仍要去 branch office 或 mobile unit': [ME_REAL_ID],
      '已经持有 Maine REAL ID 的部分 U.S. citizen 可按条件 online renewal / duplicate，或到 local AAA branch 续期': [ME_REAL_ID, ME_ONLINE],
      '外州新居民则要在成为 Maine resident 后 30 天内到 BMV 转证，不能把 online renewal 当成 transfer': [ME_NEW_RESIDENT, ME_ONLINE],
      'Maine REAL ID 只能作为 driver license 或 State ID 中的一张合规证件': [ME_REAL_ID],
      '首次申请要本人到 branch office 或 mobile unit，准备 identity / date of birth / lawful status、SSN 或不符合 SSN 资格证明、两份带 physical address 的 Maine residence，以及完整 name-change trail': [ME_REAL_ID, ME_RESIDENCY],
      'P.O. Box 不接受，文件要用未改动的原件或 issuing agency certified copy': [ME_REAL_ID, ME_RESIDENCY],
      '持美国州或加拿大省签发、当前有效或过期不超过五年的普通外州驾照者，可在 BMV office 申请 Maine Class C': [ME_NEW_RESIDENT],
      '要核对 legal presence、Maine residency、SSN、vision 和姓名连接文件，即使原证已经是 REAL ID 也仍有 Maine 附加材料': [ME_NEW_RESIDENT, ME_REAL_ID, ME_RESIDENCY],
      '自 2026 年 2 月 1 日起，Class C 笔试可免费申请 professional interpreter': [ME_EXAM],
      '中文不在八种数字考试语言名单内，预约翻译可能要四周或更久': [ME_EXAM],
      'BMV 当前提醒部分 branch 在高峰期 walk-in 等候可能超过三小时、达到容量后会限流，并可能在下午 4 点提前停止接待': [ME_HOME],
      'appointments 每日释放': [ME_HOME, ME_APPOINTMENTS],
      '现行 online service 不能修改证件资料且只寄到 BMV 在档地址，改地址先电话、邮件或 Contact Us，改姓名、需要 vision / medical review、非 U.S. citizen、CDL、外州证件或首次 REAL ID 都应走 office 路线': [ME_ONLINE, ME_UPDATE],
      'Maine 当前 REAL ID 页面写明：首次申请必须本人到 BMV branch office 或 mobile unit': [ME_REAL_ID],
      '从 2025 年 11 月 13 日起，已有 REAL ID 的部分申请人可 online renewal，或到 local AAA branch 续期': [ME_REAL_ID, ME_ONLINE],
      'Maine 仍在线的 2022 REAL ID brochure 写着 online renewal 和 AAA 都不可用，这一渠道信息已经过时': [ME_REAL_ID_PDF, ME_REAL_ID, ME_ONLINE],
      '材料类别仍可参考，但办理地点和线上资格应以当前 REAL ID 页面与 transaction portal 为准': [ME_REAL_ID_PDF, ME_REAL_ID, ME_ONLINE],
      '现行 online REAL ID renewal / duplicate 只面向 U.S. citizen、non-commercial driver license 或 State ID、无需 vision screening、不更改资料且当前照片年龄符合 federal guidelines 的申请人': [ME_ONLINE],
      '现行 online service 明确排除首次 REAL ID、外州驾照、CDL、name change、新增或变化的 medical condition、取消 corrective-lens restriction、非 U.S. citizen 和需要 vision screening 的申请人': [ME_ONLINE],
      '地址渠道存在新旧页面冲突：较旧 online FAQ 仍写可更新部分资料，但当前 transaction portal 和 BMV Update My Current License 页面都写明不能在线改地址': [ME_ONLINE_FAQ, ME_ONLINE, ME_UPDATE],
      '应先通过 207-624-9000 x 52114、BMV 邮箱或 Contact Us 更新，再订 duplicate / renewal': [ME_UPDATE, ME_DUPLICATE],
      '成为 Maine resident 后 30 天内要换证': [ME_NEW_RESIDENT],
      '美国州或加拿大省签发、当前有效或过期不超过五年的驾照可走 Class C conversion': [ME_NEW_RESIDENT],
      '要带原外州证件，遗失时用出具未满 30 天的 certified driving record': [ME_NEW_RESIDENT],
      '外州换证要核对 legal presence、Maine residency、SSN、vision 和费用': [ME_NEW_RESIDENT, ME_RESIDENCY, ME_FEES],
      'written / road test 可能豁免，但不是自动保证': [ME_NEW_RESIDENT, ME_EXAM],
      '原外州证即使已经是 REAL ID，申请 Maine REAL ID 仍要补 Maine 的附加材料': [ME_NEW_RESIDENT, ME_REAL_ID],
      'Maine 只允许一人持有一张 REAL ID-compliant credential，即 driver license 或 identification card 二选一': [ME_REAL_ID],
      '已有有效 passport 等 TSA 接受证件的人，不一定需要为了旅行升级': [ME_REAL_ID, TSA_IDENTIFICATION],
      '首次 REAL ID 要提供 SSN 或不符合 SSN 资格的证据': [ME_REAL_ID],
      'BMV 明确不要求出示实体 Social Security card': [ME_REAL_ID],
      '续期时 SSN 要在档，不能取得 SSN 者按 BMV 页面准备有效 immigration document 或 SSA written statement': [ME_RENEW],
      '非 U.S. citizen 申请或续期 Maine driver license / State ID 都要证明 legal presence': [ME_NONCITIZEN, ME_RENEW],
      '常见移民文件必须清晰、有效且未过期，证件有效期可能短于普通州证件': [ME_NONCITIZEN],
      '非 U.S. citizen 不能使用当前 online renewal portal': [ME_ONLINE],
      '首次 REAL ID 文件会被验证、扫描并保存': [ME_REAL_ID],
      '个人身份资料或 immigration status 没有变化时，后续现场续期通常只带将到期的 REAL ID，name change 或 status change 时要补相应文件': [ME_REAL_ID],
      '当前费用页把 Class C 分为：65 岁以下 standard 6 年 $30、REAL ID 6 年 $55': [ME_FEES, ME_REAL_ID],
      '65 岁及以上 standard 4 年 $20、REAL ID 4 年 $40': [ME_FEES, ME_REAL_ID],
      'REAL ID State ID original / renewal 和所有 REAL ID duplicate 均为 $30': [ME_REAL_ID, ME_DUPLICATE],
      'non-compliant duplicate 为 $5': [ME_DUPLICATE],
      'duplicate 有 online、branch/mobile unit、mail 三条路线': [ME_DUPLICATE],
      '现场补证要两份 identification，其中一份显示 date of birth、另一份带 written signature': [ME_DUPLICATE],
      'online 前要先把地址更新到 BMV record': [ME_DUPLICATE, ME_UPDATE, ME_ONLINE],
      '自 2026 年 2 月 1 日起，Maine 为 Class C basic knowledge test 提供免费 professional interpreter': [ME_EXAM],
      '数字系统只有 Arabic、Canadian French、English、French、Portuguese、Somali、Spanish、Swahili': [ME_EXAM],
      '普通话不在列表时可申请翻译，但官方提示安排可能需四周或更久': [ME_EXAM],
      'Class C knowledge test 共 30 题，至少答对 24 题': [ME_EXAM],
      '首次驾照还包括 vision screening 和 road test': [ME_EXAM],
      '外州有效驾照转入时 written / road test 可能被免除，应由 BMV 柜台确认': [ME_NEW_RESIDENT, ME_EXAM],
      'BMV 首页当前提醒 REAL ID 需求导致 branch 高客流，部分地点 walk-in 可能等候超过三小时、达到容量后限流或下午 4 点提前停止接待': [ME_HOME],
      'appointments 每日释放，近期旅行者被建议约提前两个月办理': [ME_HOME, ME_APPOINTMENTS],
      'Identity / lawful status 准备一份或相应组合的合格文件，例如有效 U.S. passport、issuing agency certified birth certificate、Certificate of Naturalization / Citizenship、Permanent Resident Card，或与 I-94、I-797、I-20、DS-2019 等配套的有效移民文件': [ME_REAL_ID, ME_CITIZEN, ME_NONCITIZEN],
      '提供 Social Security Number': [ME_REAL_ID],
      '实体 Social Security card 不是 Maine REAL ID 的必带件': [ME_REAL_ID],
      '不符合 SSN 资格者要准备 BMV 接受的 ineligibility evidence': [ME_REAL_ID, ME_RENEW],
      'REAL ID 准备两份写有姓名和 Maine physical residential address 的文件': [ME_REAL_ID, ME_RESIDENCY],
      'standard non-REAL ID 通常只需一份': [ME_RESIDENCY],
      'P.O. Box 不能代替 physical address': [ME_REAL_ID, ME_RESIDENCY],
      '常见 residence 文件包括 Maine vehicle registration、pay stub、tax bill / return、W-2、utility bill、insurance、financial statement、lease / lien 或政府文件': [ME_RESIDENCY],
      '以 current BMV list 为准': [ME_RESIDENCY],
      '没有常规地址文件时，可使用两名了解本人 Maine residence 的人分别签署 BMV residency affidavit': [ME_RESIDENCY],
      '未满 18 岁由 parent / guardian 签署时只需一份': [ME_RESIDENCY],
      '姓名变化要用 marriage license、divorce decree 或 court order 形成从 identity document 到当前姓名的完整 clear trail': [ME_REAL_ID],
      '外州转入带 current out-of-state license': [ME_NEW_RESIDENT],
      '证件遗失时，准备出具日期未满 30 天、能验证原驾照信息的 certified driving record': [ME_NEW_RESIDENT],
      '线上续期 / 补证准备 SSN、有效信用卡和 printer': [ME_ONLINE],
      '成品只寄到 BMV 当前在档地址': [ME_ONLINE],
      '旧地址先单独联系 BMV 更新，不要指望 transaction portal 在提交时改': [ME_UPDATE, ME_ONLINE],
      '现场续期已有 REAL ID 且姓名未变时，BMV FAQ 通常只要求带将到期的 credential': [ME_REAL_ID],
      'name、SSN 或 immigration status 改变时要补对应官方文件': [ME_REAL_ID, ME_RENEW],
      '第一次申请或从 standard credential 升级 Maine REAL ID 时尝试完全在线办理': [ME_REAL_ID, ME_ONLINE],
      '继续照 2022 brochure 判断“REAL ID 不能 online / AAA”，没有看到 2025 年 11 月后的 current page 更新': [ME_REAL_ID_PDF, ME_REAL_ID, ME_ONLINE],
      '以为外州 REAL ID 可以原样转入，忽略 Maine 仍要求本州 residence、legal presence、SSN 和其他附加材料': [ME_NEW_RESIDENT, ME_REAL_ID, ME_RESIDENCY],
      '在需要 vision、medical review、name change、非 U.S. citizen、CDL 或外州 transfer 时继续尝试 online service': [ME_ONLINE],
      '相信旧 online FAQ 可以直接改地址': [ME_ONLINE_FAQ, ME_UPDATE],
      '现行 portal 只寄到在档地址，地址应先通过 BMV 更新': [ME_ONLINE, ME_UPDATE],
      '以为必须带实体 Social Security card，或反过来以为没有 SSN 也不需要准备 ineligibility evidence': [ME_REAL_ID, ME_RENEW],
      '只带一份地址文件申请 REAL ID，或者用 P.O. Box 代替 Maine physical residence': [ME_REAL_ID, ME_RESIDENCY],
      '身份文件与当前姓名不一致，却没有带完整 marriage / divorce / court-order chain': [ME_REAL_ID],
      '把普通话当成数字考试内置语言，没有提前申请 free interpreter 并预留四周以上排期': [ME_EXAM],
      '直接 walk in 而不看 specific branch 状态': [ME_HOME, ME_BRANCHES],
      '高峰期可能限流、等候超过三小时或提前停止接待': [ME_HOME],
      '先选业务：首次 / 升级 REAL ID、已有 REAL ID renewal、standard renewal / duplicate、外州 transfer、首次考试或资料变更': [ME_REAL_ID, ME_ONLINE, ME_NEW_RESIDENT, ME_RENEW, ME_DUPLICATE, ME_EXAM],
      '不要从付款入口反推资格': [ME_REAL_ID, ME_ONLINE, ME_NEW_RESIDENT],
      '只为旅行时先查 TSA 接受证件': [TSA_IDENTIFICATION],
      '已有有效 passport 或其他替代证件，不必把临行前升级 REAL ID 当成唯一方案': [ME_REAL_ID, TSA_IDENTIFICATION],
      '首次或升级 REAL ID 按 identity / lawful status、SSN / ineligibility、two physical-residence documents、name-change trail 四组整理未改动原件或 certified copies': [ME_REAL_ID, ME_RESIDENCY],
      '已有 REAL ID 想线上续期时，逐项确认 U.S. citizen、non-commercial、无需 vision、不改资料、照片年龄合规': [ME_ONLINE],
      '任一项不符就转 office': [ME_ONLINE, ME_BRANCHES],
      '需要改地址时先电话、邮件或 Contact Us 更新 BMV record': [ME_UPDATE],
      'name change、medical condition 或 corrective-lens restriction 变化直接安排 office': [ME_ONLINE, ME_BRANCHES],
      '外州新居民在 30 天内去 BMV，带外州证件或未满 30 天 certified driving record，并准备 Maine residence、legal presence、SSN、vision 和费用': [ME_NEW_RESIDENT, ME_RESIDENCY, ME_FEES],
      '非 U.S. citizen 先打开 BMV legal-presence page 检查当前 immigration documents': [ME_NONCITIZEN],
      '不要使用 online renewal，疑难 status 在到场前联系 License Information': [ME_ONLINE, ME_NONCITIZEN],
      '需要中文笔试翻译时在 Class C exam application 上写明语言需求，并按至少四周排期准备': [ME_EXAM],
      '同时使用 Maine Motorist Handbook 学习': [ME_EXAM],
      '查看 specific branch 状态并预约': [ME_BRANCHES, ME_APPOINTMENTS],
      '有近期旅行时按 BMV 提示约提前两个月办理，同时携带 passport 等备用 TSA 证件': [ME_HOME, TSA_IDENTIFICATION],
      '线上办理后保存 receipt 和 temporary credential': [ME_ONLINE, ME_ONLINE_FAQ],
      '官方 FAQ 写明 temporary credential 有效 60 天，成品最多可能三周寄达': [ME_ONLINE_FAQ],
    },
  },
  hawaii: {
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      HI_HIDOT,
      HI_DOCS_2024,
      HI_HON_REAL_ID,
      HI_HON_PROCEDURES,
      HI_HON_FOREIGN,
      HI_HON_REQUIREMENTS,
      HI_HON_FAQ,
      HI_HON_LOCATIONS,
      HI_MAUI_DMV,
      HI_MAUI_APPOINTMENTS,
      HI_MAUI_OFFICES,
      HI_HAWAII_COUNTY_DRIVER,
      HI_HAWAII_COUNTY_APPOINTMENTS,
      HI_HAWAII_COUNTY_TRANSFER,
      HI_HAWAII_COUNTY_REAL_ID,
      HI_KAUAI_DMV,
      HI_KAUAI_REAL_ID,
      HI_KAUAI_TRANSFER,
      HI_KAUAI_RENEW,
    ],
    scope:
      '逐条打开并比对 HIDOT 州级 Driver License FAQ、Rev. 3/13/2024 acceptable-documents PDF，以及 Honolulu、Maui County、Hawaii County、Kauai County 的 REAL ID、驾照、外州/外国驾照、续期、考试、预约、office 和费用入口。',
    notes:
      '重写 Hawaii 两页并建立显式声明级来源；拆开州级规则与四县办理，更新失效 Honolulu/Hawaii County 入口，增加唯一 REAL ID credential 专属判断，并公开 SSN 统一材料表与县级 transfer 页面、China/Taiwan reciprocity、oral exam 和 6-8 周邮寄边界。',
    claims: {
      'Hawaii DOT 发布全州通用的 REAL ID、legal presence 和材料规则，但没有一个统一办理全州业务的 DMV 柜台': [
        HI_HIDOT,
      ],
      '预约、地点、费用、考试、续期和补证由四个县分别处理：Oahu 看 Honolulu，Maui、Molokai、Lanai 看 Maui County，Hawaii Island 看 Hawaii County，Kauai 看 Kauai County': [
        HI_HIDOT,
        ...HI_COUNTY_HUBS,
      ],
      '第一步不是先找“州 DMV”，而是先确认自己所在的县': [HI_HIDOT],
      'Oahu 的外州换证页把有效美国州、领地和 Canada 驾照列为 transfer 路径': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
      ],
      'Honolulu 另与 Japan、Korea、Taiwan 设有附条件 reciprocity，符合条件者可免 written 和 road test': [
        HI_HON_FOREIGN,
      ],
      '中国大陆驾照不在该三地名单中，不能自行套用 Taiwan 路线': [
        HI_HON_FOREIGN,
      ],
      '应按所在县确认 instruction permit、knowledge test 和 road test': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
        ...HI_COUNTY_HUBS,
      ],
      'Hawaii 只允许一人持有一张 REAL ID-compliant credential': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '选择星标 driver license 时，要交回星标 Hawaii State ID': [
        HI_HIDOT,
        HI_HON_REAL_ID,
      ],
      '选择星标 State ID 时，可以另行申请不具联邦用途的 Limited Purpose Driver License': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '2024 年 3 月 13 日材料表把首证分为 legal presence / legal name / date of birth、SSN 和 Hawaii principal residence address，并要求两份地址文件来自不同实体': [
        HI_DOCS_2024,
      ],
      '四县预约系统不同': HI_COUNTY_APPOINTMENTS,
      'Oahu 的到场业务使用 AlohaQ，且只在材料已在档、资料完全不变时提供驾照或 permit 的 online exact duplicate': [
        HI_HON_REAL_ID,
        HI_HON_PROCEDURES,
      ],
      'Maui County 使用自己的 Qmatic 入口，Class 3 road test 要按县页电话预约': [
        HI_MAUI_DMV,
        HI_MAUI_APPOINTMENTS,
      ],
      'Hawaii County 每个 appointment 只办一项业务且 walk-in 名额有限': [
        HI_HAWAII_COUNTY_APPOINTMENTS,
      ],
      'Kauai 的预约客户优先，Lihue walk-in ticket 会提前停止发放': [
        HI_KAUAI_DMV,
      ],
      'HIDOT 页面列出的县级分工是办理起点：Honolulu 处理 Oahu，Maui County 处理 Maui、Molokai、Lanai，Hawaii County 处理 Hawaii Island，Kauai County 处理 Kauai': [
        HI_HIDOT,
        ...HI_COUNTY_HUBS,
      ],
      '一人只能持有一张 REAL ID-compliant credential': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '以 driver license 作为星标证件时要交回星标 State ID': [
        HI_HIDOT,
        HI_HON_REAL_ID,
      ],
      '以 State ID 作为星标证件时，可申请 Limited Purpose Driver License 用于驾驶，但它不能用于 REAL ID 联邦用途': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '最新核对到的统一材料表修订日期是 2024 年 3 月 13 日': [
        HI_DOCS_2024,
      ],
      '地址要求明确为两份文件来自不同 entities，不应写成“不同 entities 或 accounts”': [
        HI_DOCS_2024,
      ],
      '2024 统一材料表写明自 2021 年 6 月 18 日起，出示 SSN documentation 是 optional': [
        HI_DOCS_2024,
      ],
      '但 Hawaii County 和 Kauai 的当前外州转入页仍列出 original Social Security card 或 SSN proof': [
        HI_HAWAII_COUNTY_TRANSFER,
        HI_KAUAI_TRANSFER,
      ],
      '办理人应以本县具体业务页和预约确认单为准，有卡时带上，不要只凭统一 PDF 推断柜台一定不看': [
        HI_DOCS_2024,
        HI_HAWAII_COUNTY_TRANSFER,
        HI_KAUAI_TRANSFER,
        HI_HON_LOCATIONS,
        HI_MAUI_APPOINTMENTS,
        HI_HAWAII_COUNTY_APPOINTMENTS,
      ],
      '首证文件必须是有效、未过期的原件或 issuing entity 签发的 certified copy': [
        HI_DOCS_2024,
      ],
      'notarized copy、fax 和普通复印件不等于 certified copy': [
        HI_HIDOT,
        HI_DOCS_2024,
      ],
      'U.S. citizen 或 permanent resident 以前已完成五类材料核验、且资料没变时，HIDOT 说明续期通常不必全部重交': [
        HI_HIDOT,
        HI_DOCS_2024,
        HI_HON_PROCEDURES,
      ],
      'temporary legal presence 申请人续期或补证要本人出示 continued legal presence，也不能走 mail renewal': [
        HI_HIDOT,
      ],
      'Hawaii 驾照最早可在到期前六个月续期': [
        HI_HIDOT,
        HI_HON_FAQ,
        HI_KAUAI_RENEW,
      ],
      '过期后已经不能合法驾驶': [HI_HON_FAQ, HI_KAUAI_RENEW],
      'Kauai 与 Honolulu 页面都说明 90 天内仍可续期，超过 90 天会产生 reactivation fee，超过一年通常按新申请处理': [
        HI_HON_FAQ,
        HI_KAUAI_RENEW,
      ],
      'Honolulu 的 Japan、Korea、Taiwan reciprocity 只适用于符合条件的有效驾照，并要求相应领事机构出具 notarized、translated、sealed verification letter': [
        HI_HON_FOREIGN,
      ],
      '过期外国驾照不能按该 transfer 路径免 written 和 road test': [
        HI_HON_FOREIGN,
      ],
      '中国大陆驾照不在 Honolulu 公布的 Japan、Korea、Taiwan reciprocity 名单中': [
        HI_HON_FOREIGN,
      ],
      '不要把 China 与 Taiwan 混写': [HI_HON_FOREIGN],
      '应按普通 foreign-license applicant 准备英文翻译、instruction permit、general knowledge test 和可能的 road test': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
        HI_HON_FOREIGN,
      ],
      '访客能否用外国驾照驾驶不是“有外国驾照就行”': [HI_HON_FAQ],
      'Honolulu 只写明 1949 Geneva Convention 缔约地的有效驾照可配合 passport 使用，驾驶人须至少 18 岁，并建议携带 IDP': [
        HI_HON_FAQ,
      ],
      '具体国别资格和停留期限应在出发前向所在县确认': [
        HI_HON_FAQ,
        ...HI_COUNTY_HUBS,
      ],
      'Oahu 对无法读写英文的申请人提供受限制的 oral examination 安排：Kapalama 可人工安排 phone translation 或 English oral classroom test，并另收 oral test fee': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
        HI_HON_REQUIREMENTS,
      ],
      '页面没有承诺任意日期都提供普通话': [HI_HON_FAQ],
      '临时卡或现场给的 temporary document 不能作为 REAL ID 旅行证件': [
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      'Honolulu 提醒永久卡通常需 6-8 周，Hawaii County 写明最多预留 8 周': [
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_DRIVER,
      ],
      '有近期出行计划应带护照等 TSA 接受证件': [HI_HON_REAL_ID],
      '费用、付款方式、笔试截止时间和 walk-in 规则由县决定': [
        HI_HON_REQUIREMENTS,
        HI_MAUI_OFFICES,
        HI_HAWAII_COUNTY_APPOINTMENTS,
        HI_KAUAI_DMV,
      ],
      'Honolulu 的 fee table、Maui 的 fee PDF、Hawaii County 的 License Fees 与 Kauai fee chart 不能互相替代': [
        HI_HON_REQUIREMENTS,
        HI_MAUI_DMV,
        HI_HAWAII_COUNTY_DRIVER,
        HI_KAUAI_DMV,
      ],
      'Legal presence、legal name 和 date of birth 用一份合格文件，例如认证 U.S. birth certificate、有效 U.S. passport、Certificate of Naturalization / Citizenship，或当前清单列出的 Permanent Resident Card、EAD、foreign passport + visa + approved I-94': [
        HI_DOCS_2024,
      ],
      'SSN 仍是首证核验类别，但 2024 统一清单把“出示 SSN documentation”标为 optional': [
        HI_DOCS_2024,
      ],
      '县级 transaction page 可能仍要求 original Social Security card、W-2、1099 或 pay stub，因此要再核对本县清单': [
        HI_DOCS_2024,
        HI_HAWAII_COUNTY_TRANSFER,
        HI_KAUAI_TRANSFER,
      ],
      '准备两份 Hawaii principal residence address 文件，必须来自不同 entities，并显示申请人的 full first and last name 与 Hawaii address': [
        HI_DOCS_2024,
      ],
      'P.O. Box 通常不能代替 principal residence，除非当地没有分配可投递的 street address': [
        HI_DOCS_2024,
      ],
      'utility bill、financial statement 或政府/医疗邮件通常要在两个月内': [
        HI_DOCS_2024,
      ],
      'payroll check / stub 可在六个月内': [HI_DOCS_2024],
      'lease 通常要覆盖六个月或以上，其他材料的日期窗口按 2024 清单逐项核对': [
        HI_DOCS_2024,
      ],
      '本人没有地址文件时，可向 county DMV 询问 Hawaii principal residence affidavit': [
        HI_DOCS_2024,
      ],
      '该表通常由同住者提供地址材料，并在公证员前签署或由柜台人员见证': [
        HI_DOCS_2024,
      ],
      '姓名不一致时准备完整 connecting chain，可用政府签发的 marriage / civil union certificate、带 court seal 的 adoption / divorce / name-change order、naturalization certificate 或 Hawaii Lieutenant Governor 的 certified name-change decree': [
        HI_DOCS_2024,
      ],
      '所有身份材料带有效原件或 issuing entity certified copy': [HI_DOCS_2024],
      '外国申请材料按 Honolulu 指引准备 English translation，并把译文与原文件一起带到现场': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
      ],
      '先按岛屿确定办理县：Oahu、Maui County、Hawaii County 或 Kauai County': [
        HI_HIDOT,
        ...HI_COUNTY_HUBS,
      ],
      '不要先在其他县的系统里抢 appointment': HI_COUNTY_APPOINTMENTS,
      '决定唯一 REAL ID credential 放在 driver license 还是 State ID 上': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '需要同时驾驶与保留星标 State ID 时，再核对 Limited Purpose Driver License': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '打开 Rev. 3/13/2024 acceptable documents list，按 identity / legal presence、SSN category、two residence documents、name chain 四组整理': [
        HI_DOCS_2024,
      ],
      '把两份地址材料按“不同 entities”重新检查，并确认 full first / last name、Hawaii physical address 和文件日期都符合清单': [
        HI_DOCS_2024,
      ],
      '再打开本县具体 transaction page': HI_COUNTY_HUBS,
      '若县页和统一材料表在 SSN、renewal documents 或 office 服务上表述不同，先联系本县 office 并保留回复或预约确认': [
        HI_DOCS_2024,
        HI_HAWAII_COUNTY_TRANSFER,
        HI_KAUAI_TRANSFER,
        HI_HON_LOCATIONS,
        HI_MAUI_APPOINTMENTS,
        HI_HAWAII_COUNTY_APPOINTMENTS,
      ],
      '外州有效驾照按本县 transfer 路径准备 surrender 与 vision screening': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
        HI_HAWAII_COUNTY_TRANSFER,
        HI_KAUAI_TRANSFER,
      ],
      'Japan、Korea、Taiwan 驾照另看 Honolulu reciprocity 条件': [
        HI_HON_FOREIGN,
      ],
      '中国大陆驾照按可能需要 permit、笔试和路考准备': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
        HI_HON_FOREIGN,
      ],
      '有外文材料时先完成 English translation': [
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
      ],
      'temporary legal presence 申请人把当前 USCIS / DHS 文件和 continued legal presence 一并带到现场': [
        HI_HIDOT,
        HI_DOCS_2024,
        HI_HON_PROCEDURES,
      ],
      '按县预约：Oahu 用 AlohaQ，Maui、Hawaii County、Kauai 使用各自系统': HI_COUNTY_APPOINTMENTS,
      'road test、普通柜台和 online duplicate 不是同一个入口': [
        HI_HON_REAL_ID,
        HI_HON_PROCEDURES,
        ...HI_COUNTY_APPOINTMENTS,
      ],
      '有六至八周内的出行计划时，不依赖 temporary document，随身准备有效护照或其他 TSA 接受证件': [
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_DRIVER,
      ],
      '把 HIDOT 当成统一柜台，或住在 Maui、Hawaii Island、Kauai 却只按 Honolulu 的预约、费用和 office 准备': [
        HI_HIDOT,
        ...HI_COUNTY_HUBS,
      ],
      '同时保留星标 driver license 和星标 State ID，或者取得 Limited Purpose Driver License 后仍把它当作联邦用途证件': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '把同一实体的不同 accounts 当成两份地址证明': [HI_DOCS_2024],
      '2024 表要求 different entities': [HI_DOCS_2024],
      '看到 SSN documentation optional 就什么都不带，没有注意县级 transfer 页面仍可能要求 Social Security card 或其他 SSN proof': [
        HI_DOCS_2024,
        HI_HAWAII_COUNTY_TRANSFER,
        HI_KAUAI_TRANSFER,
      ],
      '把 notarized copy、fax、手机照片或普通复印件当作 issuing entity certified copy': [
        HI_HIDOT,
        HI_DOCS_2024,
        HI_HAWAII_COUNTY_REAL_ID,
      ],
      '把中国大陆驾照当作 Taiwan reciprocity，或拿过期 Japan、Korea、Taiwan 驾照期待免笔试和路考': [
        HI_HON_FOREIGN,
        HI_HON_PROCEDURES,
        HI_HON_FAQ,
      ],
      '把 exact duplicate online service 当成首次 REAL ID、续期、改名或改地址入口': [
        HI_HON_REAL_ID,
        HI_HON_PROCEDURES,
      ],
      '资料有变化时通常要走另一条路径': [
        HI_HIDOT,
        HI_HON_REAL_ID,
        HI_HON_PROCEDURES,
      ],
      '拿 temporary card 去机场，或在六周内出行却没有准备护照等备用证件': [
        HI_HON_REAL_ID,
        HI_HAWAII_COUNTY_DRIVER,
      ],
    },
  },
  wyoming: {
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      WY_DRIVER,
      WY_REAL_ID,
      WY_US_DOCS,
      WY_NON_US_DOCS,
      WY_TESTING,
      WY_RENEW,
      WY_CHANGE,
      WY_ONEWYO,
      WY_FAQ,
      WY_DOC_HUB,
      WY_MANUALS,
      WY_LOCATIONS,
      WY_ADDRESS,
    ],
    scope:
      '逐条打开并比对 WYDOT 的新居民与首次驾照、REAL ID 当前公告、R03/25 公民与非公民材料表、Testing、Lost / Renewal、Add / Change、oneWYO、FAQ/费用、当前材料入口、manuals、exam station locations 和地址表。',
    notes:
      '重写 Wyoming 两页并建立显式声明级来源；纠正当前证件不存在 standard/REAL ID 二选一，补齐新居民五州/CDL 例外、中国大陆驾照无公开互惠清单、英文考试与口译、45 天且不同来源的住址材料、非公民每次服务、10 天改址改名、续补证限制、寄送和现行费用。',
    claims: {
      '搬到 Wyoming 后，新居民必须本人申请州驾照': [WY_DRIVER],
      '通常自建立 residency 起有一年取得证件': [WY_DRIVER],
      '若现持 Georgia、Massachusetts、Michigan、Tennessee、Wisconsin 驾照，或持 CDL，建立 residency 后就应申请': [
        WY_DRIVER,
      ],
      '首次 Wyoming 驾照或已过期的 Wyoming 驾照可先在 oneWYO 开始，但仍要到 exam station，交回外州驾照、拍照并做 vision screening': [
        WY_DRIVER,
      ],
      '实体卡预计签发后 4-6 周寄到': [WY_DRIVER],
      'Wyoming 笔试和驾驶手册只有英文': [WY_TESTING],
      '非商业笔试可使用 interpreter，自动考试系统也可通过电话朗读题目': [
        WY_TESTING,
      ],
      'WYDOT 的 Driver License、Testing 和 manuals 页面未发布外国驾照互惠或中国大陆驾照免考清单': [
        WY_DRIVER,
        WY_TESTING,
        WY_MANUALS,
      ],
      '中国大陆驾照用户不应自行假定可免笔试或路考，应先向 Driver Services 确认并按可能考试准备': [
        WY_DRIVER,
        WY_TESTING,
        WY_MANUALS,
      ],
      'Wyoming Driver Services 当前签发的所有 driver license 和 ID card 都是 REAL ID compliant': [
        WY_REAL_ID,
      ],
      '州方自 2011 年起按 REAL ID 标准签发，不提供普通版与 REAL ID 二选一': [
        WY_REAL_ID,
      ],
      '当前卡右上角有星标，2019 年由金色改为黑色，两者都合规': [WY_REAL_ID],
      '2010 年 1 月 1 日前签发、仍在流通的旧 ID card 应考虑续期': [WY_REAL_ID],
      'oneWYO 可处理符合资格的续期、补证、地址更新、driving record 和医疗/视力表上传': [
        WY_ONEWYO,
        WY_DRIVER,
      ],
      '首次 Wyoming 驾照或已过期续期仍需到 exam station': [WY_DRIVER],
      'Office hours and availability 按地点和日期变化，许多 skills test 要提前安排': [
        WY_FAQ,
        WY_TESTING,
      ],
      '先查官方 locations，再决定线上或到场': [WY_FAQ, WY_TESTING, WY_LOCATIONS],
      'Wyoming 州法要求驾照或 ID 持有人在姓名、mailing address 或 residence 改变后 10 天内通知 Driver Services': [
        WY_CHANGE,
      ],
      '只更新数据库不会自动寄新卡': [WY_CHANGE, WY_ADDRESS],
      '要让新地址显示在卡面，需按 renewal 路径本人申请并支付标准续期费': [
        WY_CHANGE,
      ],
      '新驾照有效 5 年、ID card 有效 8 年，官方称约 4 周寄到': [WY_CHANGE],
      '改名必须本人到场、交回现证并提交法律文件': [WY_CHANGE],
      '应先在 SSA 完成姓名更新，卡片约 4-6 周寄到': [WY_CHANGE],
      '驾照每 10 年只能使用 mail 或 online renewal 一次，也就是 every other renewal': [
        WY_RENEW,
      ],
      '每 10 年至少有一次需本人更新照片和通过 vision screening': [WY_RENEW],
      '普通驾照可提前一年续期': [WY_RENEW],
      'mail renewal 应预留 30 天处理，续期后再预留 4-6 周收卡': [WY_RENEW],
      '补证始终可本人办理': [WY_RENEW],
      'oneWYO 或 mail 只适用于上一张证件不是 mail/online renewal 的情况，沿用旧照片并需完成 vision section': [
        WY_RENEW,
      ],
      '临时在外、要求寄往当前 mailing address 之外时要提交 Forwarding Request': [
        WY_RENEW,
        WY_DRIVER,
      ],
      'state mail 不会由 USPS 自动转寄': [WY_RENEW],
      '非美国公民只有在 Wyoming 当前记录中被归类为 Permanent Resident 时才可 mail/online renewal': [
        WY_RENEW,
      ],
      '移民文件仍需在每次服务时出示': [WY_NON_US_DOCS, WY_RENEW],
      '当前费用表列出首次 Class C / permit $45、续期 Class C / permit $35、duplicate driver license $25、ID card $10': [
        WY_FAQ,
      ],
      '现金、check 和 money order 可用，部分 exam station 收卡但另有手续费': [WY_FAQ],
      '如果以前未提交过材料，美国公民按现行清单准备一份 legal presence 与一份 identity 证明': [
        WY_US_DOCS,
      ],
      '可选 state-certified birth certificate、valid unexpired U.S. passport / passport card、citizenship / naturalization certificate，以及州 DL/ID 等组合': [
        WY_US_DOCS,
      ],
      '非美国公民每次服务都要带 immigration documents': [WY_NON_US_DOCS],
      'identity 至少一份未过期 I-551、I-766 或 foreign passport，并带齐显示当前 legal presence 的适用文件，例如 visa、I-94、I-797、DS-2019 或 I-20': [
        WY_NON_US_DOCS,
      ],
      '准备两份 Wyoming residency document，必须显示本人姓名和 current physical residential address，不能只写 P.O. Box、PMB 或 mail drop': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '文件不得超过 45 天，而且不能来自同一 entity': [WY_US_DOCS, WY_NON_US_DOCS],
      '基础身份文件与当前全名不一致时带完整 name chain': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '新改名应先更新 SSA，marriage certificate 只能用于改变 last name，其他改名需要 court order': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
        WY_CHANGE,
      ],
      'SSN 必须填写在申请表上，但 SSN proof 是 recommended、not required': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '可带 Social Security card、W-2 或含姓名和完整 SSN 的政府文件': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '现行材料表要求未篡改的 certified original、certified amended original 或签发机构认证 true copy，并写明 photocopy、notarized document 和 online printout 不接受': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '电子账单或网上下载件应在到场前向 Driver Services 确认': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '官方材料表说明清单不是穷尽列表，Driver Services 可为核定年龄、identity 和 authorized presence 要求补充材料': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '先分清本次是新居民首证、续期、补证、改址还是改名': [
        WY_DRIVER,
        WY_RENEW,
        WY_CHANGE,
      ],
      'first-time 或 expired Wyoming license 仍按 exam station 路径准备': [WY_DRIVER],
      '新居民先核对期限：通常是一年，但 Georgia、Massachusetts、Michigan、Tennessee、Wisconsin 驾照和 CDL 持有人在建立 residency 后就应申请': [
        WY_DRIVER,
      ],
      '按公民身份打开 2025 年现行 U.S. citizen 或 non-U.S. citizen materials PDF，不用旧博客清单替代': [
        WY_DOC_HUB,
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '把材料分成 identity/legal presence、name chain、two residency within 45 days from different entities、SSN information 四组，并准备 certified documents': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '中国大陆驾照用户先联系 Driver Services 确认考试处理': [
        WY_DRIVER,
        WY_TESTING,
        WY_MANUALS,
      ],
      '笔试只有英文，但 non-commercial written test 可用 interpreter 和语音朗读': [
        WY_TESTING,
      ],
      '续期或补证先看上一张证件是否已走 mail/online，确认本次 oneWYO 资格、vision section 和是否需要本人更新照片': [
        WY_RENEW,
      ],
      '查看具体 exam station 的开放日和 skills-test 安排，并按业务准备 $45 首证、$35 续期、$25 duplicate 或 $10 ID 的当前费用': [
        WY_TESTING,
        WY_FAQ,
        WY_LOCATIONS,
      ],
      '提交后按约 4-6 周收实体卡': [WY_DRIVER, WY_RENEW],
      '寄往申请表地址之外时同时交 Forwarding Request，不依赖 USPS 转寄': [
        WY_DRIVER,
        WY_RENEW,
      ],
      '把 Wyoming 当成可选 standard 或 REAL ID 的州': [WY_REAL_ID],
      '当前 Driver Services 签发的驾照和 ID 都是 REAL ID compliant': [WY_REAL_ID],
      '两份地址证明超过 45 天、来自同一 entity，或只显示 P.O. Box / PMB / mail drop': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '持中国大陆驾照就假定能直接换证或免考': [WY_DRIVER, WY_TESTING, WY_MANUALS],
      'WYDOT 当前公开页面没有给出这项互惠': [WY_DRIVER, WY_TESTING, WY_MANUALS],
      '非美国公民只在首次申请时带移民文件': [WY_NON_US_DOCS, WY_RENEW],
      '现行材料表要求 immigration documents 每次服务都出示': [
        WY_NON_US_DOCS,
        WY_RENEW,
      ],
      '更新 address record 后以为卡面地址也自动改变，或错过姓名/地址变化后的 10 天通知期': [
        WY_CHANGE,
        WY_ADDRESS,
      ],
      '上一张证件已 mail/online renewal，这次仍直接尝试 oneWYO 或 mail 补证/续期': [
        WY_RENEW,
      ],
      '临时在州外却没有交 Forwarding Request': [WY_RENEW],
      'Wyoming state mail 不会由 USPS 自动转寄': [WY_RENEW],
      '新居民持 Georgia、Massachusetts、Michigan、Tennessee、Wisconsin 驾照或 CDL，却仍按普通一年期限等待': [
        WY_DRIVER,
      ],
      '直接带 photocopy、notarized document 或 online printout，未按现行清单准备 certified document 或先确认电子账单': [
        WY_US_DOCS,
        WY_NON_US_DOCS,
      ],
      '只看 2021 Class C manual 判断当前要求': [WY_MANUALS],
      'WYDOT 的 manuals 页面明确提醒手册内容可能已过时': [WY_MANUALS],
    },
  },
  alaska: {
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      AK_NEW,
      AK_REAL_ID,
      AK_REAL_ID_DOCS,
      AK_STANDARD_DOCS,
      AK_REAL_ID_TOOL,
      AK_FOREIGN,
      AK_IDP,
      AK_RENEW,
      AK_DUPLICATE,
      AK_CHANGE,
      AK_FEES,
      AK_LOCATIONS,
      AK_PARTNERS,
      AK_RURAL,
      AK_OUTREACH,
      AK_TRANSLATION,
      AK_MANUAL,
      AK_ONLINE,
    ],
    scope:
      '逐条打开并比对 Alaska DMV 的新居民/访客说明、REAL ID 与 standard 打印清单、非公民与外国驾照、续补证、改名改址、费用、办公地点、business partners、Rural Outreach、Off-Highway 指南及官方驾驶手册。',
    notes:
      '重写 Alaska 两页并建立显式声明级来源；补齐普通/CDL 转入期限、中国大陆驾照的路考边界、standard 与 REAL ID 材料/费用差异、外文翻译、SAVE 二次核验、州外补证、私人 partner 费用和偏远社区专用路径。',
    claims: {
      '搬到 Alaska 后，普通驾照应在成为居民后 90 天内转入，CDL 是 30 天': [
        AK_NEW,
      ],
      '转入普通驾照要通过 Alaska knowledge test 和 vision test': [AK_NEW],
      '只有最近 5 年持有美国州/领地、Canada 或 South Korea 驾照的人可免 road test': [
        AK_NEW,
      ],
      '中国大陆驾照不在这份免试清单': [AK_NEW],
      '访客可持有效外州或外国驾照在 Alaska 驾驶最多 90 天': [AK_NEW, AK_IDP],
      '外国驾照不是英文时，DMV 要求随身携带由使领馆提供的官方翻译，Alaska 不签发也不强制 IDP': [
        AK_IDP,
      ],
      '成为居民后不能继续按访客路线，外国驾照用户应按 first Alaska credential 准备笔试、视力和可能的路考': [
        AK_NEW,
        AK_FOREIGN,
      ],
      'Alaska 标准 DL/ID 与 REAL ID 都要求 identity / lawful status、完整 SSN 或近 90 天的 SSA ineligibility letter，以及适用的姓名连接文件': [
        AK_REAL_ID_DOCS,
        AK_STANDARD_DOCS,
      ],
      '主要差别是标准证件要一份 Alaska residence document，REAL ID 要两份': [
        AK_STANDARD_DOCS,
        AK_REAL_ID_DOCS,
      ],
      '当前费用表中非商用驾照为标准 $20、REAL ID $40': [AK_FEES],
      'Alaska 州办公室、contract agent 与私人 business partner 的服务不同': [
        AK_LOCATIONS,
        AK_PARTNERS,
      ],
      'business partner 可能处理 credential、考试和路考，但会另收服务费': [
        AK_PARTNERS,
      ],
      '州办公室的路考日期和截止考试时间按地点变化，应先查具体 location 再约': [
        AK_LOCATIONS,
      ],
      '偏远社区还可能适用 Mobile DMV 或 Off-Highway Driver License，不应直接套用 Anchorage 办事路径': [
        AK_OUTREACH,
        AK_RURAL,
      ],
      '首次 Alaska REAL ID 必须本人到场，即使以前已向 DMV 提交过 source documents 也要重新出示': [
        AK_REAL_ID,
      ],
      '标准证件与 REAL ID 都需要 identity / lawful status 和 SSN 路径，差别不是“有无身份材料”，而是居住证明数量、费用和联邦用途': [
        AK_STANDARD_DOCS,
        AK_REAL_ID_DOCS,
        AK_REAL_ID,
        AK_FEES,
      ],
      '所有清单文件要未篡改的认证原件、认证修订原件或签发机构认证的 true copy，并且当前有效': [
        AK_STANDARD_DOCS,
        AK_REAL_ID_DOCS,
      ],
      '外文身份文件要有认证英文翻译': [AK_STANDARD_DOCS, AK_REAL_ID_DOCS],
      'Alaska DMV 提供 Certificate of Accuracy of Translation 表格': [AK_TRANSLATION],
      '非公民首次申请或续期要携带有效未过期的 USCIS/DHS 文件和适用的 I-797 / I-94': [
        AK_FOREIGN,
      ],
      'SAVE 若转人工 secondary verification，DMV 说明约可需两个月': [AK_FOREIGN],
      '普通驾照可从到期前一年开始续期，但线上续期只在 21 岁生日后可用': [
        AK_RENEW,
      ],
      '21 岁证件在生日后 90 天到期，换水平版证件要完成 alcohol awareness test': [
        AK_RENEW,
      ],
      '线上补证可向州外申请人发电子临时证件，DMV 标注处理时间为 1 至 2 个工作日': [
        AK_DUPLICATE,
      ],
      '姓名或地址变化要在 30 天内通知 DMV': [AK_CHANGE],
      '线上更新地址不会收到确认通知，需要显示新地址的实体证件时还要另办 replacement': [
        AK_CHANGE,
      ],
      'Off-Highway Class D 只适用于不连接公路系统、无法使用 DMV 服务，且每年至少一次都没有 skills test 的社区居民': [
        AK_RURAL,
      ],
      'Identity / lawful status 带一份当前清单文件，例如有效 U.S. passport、认证 U.S. birth certificate、Certificate of Naturalization / Citizenship、有效 I-551 / I-766，或 foreign passport + valid U.S. visa + approved I-94': [
        AK_REAL_ID_DOCS,
        AK_REAL_ID_TOOL,
      ],
      '在申请表填写完整 SSN': [AK_REAL_ID_DOCS],
      '不符合 SSN 资格的申请人要带 SSA 在近 90 天签发的验证信': [
        AK_REAL_ID_DOCS,
      ],
      '标准 DL/ID 带一份 Alaska residence document，REAL ID 带两份': [
        AK_STANDARD_DOCS,
        AK_REAL_ID_DOCS,
      ],
      '文件要显示本人姓名和 current residence address，不能只有 P.O. Box 或 mail cache': [
        AK_REAL_ID_DOCS,
        AK_FOREIGN,
      ],
      'REAL ID 的两份居住文件可用 lease、utility bill、employment / insurance document、bank statement、voter confirmation、USPS change confirmation 等': [
        AK_REAL_ID_DOCS,
      ],
      '同一来源在同一月或 billing cycle 签发的文件不能算两份': [
        AK_REAL_ID_DOCS,
      ],
      '外国文件要有认证英文翻译，并随原始身份文件和 Certificate of Accuracy of Translation 一起准备': [
        AK_REAL_ID_DOCS,
        AK_TRANSLATION,
      ],
      '姓名不同时带完整连接链，可用认证 adoption document、marriage certificate、court order、divorce / dissolution document、amended birth certificate 或 naturalization / name-change certificate': [
        AK_REAL_ID_DOCS,
        AK_CHANGE,
      ],
      '非公民要带有效未过期的 USCIS/DHS 文件，延期通知 I-797 和需要时从 CBP 打印的 I-94 也要一起准备': [
        AK_FOREIGN,
      ],
      '先判断自己是 visitor 还是已成为 Alaska resident': [AK_NEW],
      '访客外国驾照和居民换证是两条不同路线': [AK_NEW, AK_IDP],
      '新居民按普通 90 天、CDL 30 天安排转入，并准备 knowledge test、vision test 和适用的 road test': [
        AK_NEW,
      ],
      '选 standard 还是 REAL ID：不需要用 Alaska 证件登机或进联邦设施时，可先比较标准证件、护照等替代证件和 $20 升级价差': [
        AK_REAL_ID,
        AK_FEES,
      ],
      '按 identity / lawful status、complete SSN 或近 90 天 SSA letter、one/two residency、name chain 四组整理认证原件': [
        AK_STANDARD_DOCS,
        AK_REAL_ID_DOCS,
      ],
      '有外文文件时先完成 certified English translation': [
        AK_STANDARD_DOCS,
        AK_REAL_ID_DOCS,
      ],
      '非公民再加入当前有效的 USCIS/DHS、I-797 和需要的 I-94': [AK_FOREIGN],
      '查 State DMV Office / Contract Agent Locations 的当日服务和考试截止时间': [
        AK_LOCATIONS,
      ],
      '选 business partner 时同时确认它是否办 credential / test 以及额外费用': [
        AK_PARTNERS,
      ],
      '不通公路的社区居民先查 Rural Outreach 和 Guide to Rural Driving，再确认 Mobile DMV、document pre-screening 或 Off-Highway Class D 是否适用': [
        AK_OUTREACH,
        AK_RURAL,
      ],
      '续期、补证、地址更新先用 Online DMV 判断线上资格': [
        AK_RENEW,
        AK_DUPLICATE,
        AK_CHANGE,
        AK_ONLINE,
      ],
      '姓名或地址改变不要超过 30 天通知期': [AK_CHANGE],
      '持中国大陆驾照就认为转入 Alaska 可免路考': [AK_NEW],
      '当前近五年免试列表只写美国州/领地、Canada 和 South Korea': [AK_NEW],
      '把游客可用外国驾照 90 天误解为成为 Alaska 居民后也能继续等 90 天以外': [AK_NEW],
      '申请 REAL ID 时两份地址文件来自同一来源、同一 billing cycle，或只显示 P.O. Box': [
        AK_REAL_ID_DOCS,
        AK_FOREIGN,
      ],
      '带普通复印件、手机截图或未认证的外文翻译': [
        AK_REAL_ID_DOCS,
        AK_TRANSLATION,
      ],
      '没有 SSN 时什么都不带，或 SSA ineligibility letter 已超过 90 天': [AK_REAL_ID_DOCS],
      '以为线上续期或补证入口可以完成首次 REAL ID': [AK_REAL_ID],
      '首次升级要本人出示 source documents': [AK_REAL_ID],
      '去私人 business partner 前没核对服务图标和额外费用': [AK_PARTNERS],
      '居住在不通公路的偏远社区，却没先查 Mobile DMV、rural guide 或 Off-Highway 资格': [
        AK_OUTREACH,
        AK_RURAL,
      ],
    },
  },
  arkansas: {
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      AR_REAL_ID,
      AR_REAL_ID_DOCS,
      AR_WHAT_YOU_NEED,
      AR_DRIVER_SERVICES,
      AR_NCL,
      AR_FAQ,
      AR_ONLINE,
      AR_LOCATIONS,
      AR_FORMS,
      AR_ADDRESS,
      AR_NAME_AFFIDAVIT,
      AR_EXAM,
      AR_MANUAL,
    ],
    scope:
      '逐条打开并比对 Arkansas DFA 的 REAL ID、当前打印材料表、首次与续期到场清单、Class D 费用、FAQ、线上服务、改名改址表，以及 Arkansas State Police 的考试入口和 June 2026 Driver License Study Guide。',
    notes:
      '重写 Arkansas 两页并建立显式声明级来源；拆开 State Police 考试与 DFA Revenue Office 签发流程，补齐新居民 30 天、外国驾照互惠、续补证和地址路径；公开标注 REAL ID 简介与当前打印清单/FAQ 对 Social Security Card 和 DD214 的表述差异，并移除由旧 Saturday 活动推导出的长期 walk-in 结论。',
    claims: {
      'Arkansas 驾照流程分成两站：Arkansas State Police 负责 knowledge / skills test，Department of Finance and Administration 的 Revenue Office 负责签发驾照或 ID': [
        AR_EXAM,
        AR_DRIVER_SERVICES,
      ],
      '成为 Arkansas 居民后仍要在州内开车的人，应在 30 个日历日内取得 Arkansas 驾照': [
        AR_MANUAL,
      ],
      '只是非居民但已在州内实际停留 6 个月的人也进入州驾照要求': [AR_MANUAL],
      '新居民转入时要带有效 hard-copy 外州驾照，现行手册要求其过期不得超过 30 个日历日': [
        AR_MANUAL,
      ],
      '签发 Arkansas 驾照或 ID 会取消其他州签发的驾照或 ID': [AR_REAL_ID_DOCS],
      '持外国驾照的人不要默认可以直接换证：2026 Arkansas Driver License Study Guide 只列 Manitoba、Germany、France、Taiwan 和 South Korea 为免试互惠地区，中国大陆不在清单中': [
        AR_MANUAL,
      ],
      '首次申请或不在互惠清单内的外国驾照持有人，应先按 State Police 流程准备考试，再到 Revenue Office 完成签发': [
        AR_MANUAL,
        AR_EXAM,
        AR_DRIVER_SERVICES,
      ],
      'Arkansas REAL ID 可以签发为 driver license、state ID 或 CDL，DFA 说明升级按同类证件费用办理': [
        AR_REAL_ID,
        AR_WHAT_YOU_NEED,
      ],
      '当前打印清单要求一份 legal presence、一份 identity、一份 SSN 证明和两份 Arkansas residency': [
        AR_REAL_ID_DOCS,
        AR_REAL_ID,
      ],
      '大多数居住文件须在 6 个月内，但清单对税表、选民登记等另有期限': [
        AR_REAL_ID_DOCS,
      ],
      'SSN 证明存在官方表述差异：REAL ID 简介写 Social Security Card must be provided，当前打印清单和 DSMV FAQ 同时接受 DD214': [
        AR_REAL_ID,
        AR_REAL_ID_DOCS,
        AR_FAQ,
      ],
      '使用 DD214 的申请人应携带打印清单并在到场前向 Revenue Office 确认': [
        AR_REAL_ID,
        AR_REAL_ID_DOCS,
        AR_FAQ,
      ],
      'State Police 考试预约和 DFA Revenue Office 办事预约不是同一个系统': [
        AR_EXAM,
        AR_ONLINE,
      ],
      'State Police 表示考试预约可保证日期和时间': [AR_EXAM],
      '非美国公民持移民文件预约考试时应选择对应 appointment type，而且并非每个考点都提供该加长时段': [
        AR_MANUAL,
        AR_EXAM,
      ],
      'DFA 的 REAL ID 简介里“recommended, not required”只对应旧的 April 26 Saturday 活动，不能据此推定所有办公室、所有日期都长期接受 walk-in': [
        AR_REAL_ID,
      ],
      'Arkansas State Police 现行手册要求新居民在成为 resident 后 30 个日历日内换证，并把非居民实际停留 6 个月列为另一条触发线': [
        AR_MANUAL,
      ],
      '全日制或交换学生只有在学费规则下仍被视为 nonresident 时才属于手册列出的学生例外': [
        AR_MANUAL,
      ],
      '首次笔试申请人不能只拿 DFA 的签发材料去考场': [
        AR_MANUAL,
        AR_WHAT_YOU_NEED,
      ],
      'State Police 的 18 岁以上 1-2-3 checklist 要求 two primary documents，或 one primary plus one secondary document，姓名不一致时还要带 marriage license、adoption decree、divorce decree 等连接文件': [
        AR_MANUAL,
      ],
      'State Police 当前说明称全州各县都有 driver license testing，预约可以保证考试日期和时间': [
        AR_EXAM,
      ],
      '2026 手册还提醒并非每个考点都提供 immigration-documents appointment feature': [
        AR_MANUAL,
      ],
      '21 岁及以上 Class D 当前费用为 40 美元、有效 8 年，可从到期前 90 天开始续期': [
        AR_NCL,
      ],
      '70 岁申请人可选 20 美元四年或 40 美元八年': [AR_NCL],
      '普通续期如不改名且不升级 REAL ID，DFA 的到场清单称无需额外材料，但仍要做 vision exam 和拍照': [
        AR_WHAT_YOU_NEED,
      ],
      'DFA FAQ 表示过期 Class D 续期不需要重新考试': [AR_FAQ],
      '这一结论不应套用到 CDL 或其他特殊资格': [AR_FAQ],
      '线上地址更新免费且不会自动签发新卡': [AR_ONLINE, AR_ADDRESS],
      '需要显示新地址的 replacement，可在线购买或到 Revenue Office 办理': [
        AR_ONLINE,
        AR_ADDRESS,
      ],
      'DFA 线上服务预计 replacement 通过邮寄在 3 至 5 个工作日收到': [AR_ONLINE],
      'Arkansas REAL ID 官方简介要求 Social Security Card': [AR_REAL_ID],
      '当前打印清单和 DSMV FAQ 同时列出 DD214': [AR_REAL_ID_DOCS, AR_FAQ],
      '两项当前官方材料有差异，使用 DD214 时应先向具体 Revenue Office 确认': [
        AR_REAL_ID,
        AR_REAL_ID_DOCS,
        AR_FAQ,
      ],
      'Legal presence 带一份原件或 certified document，例如 U.S. passport / passport card、U.S. birth certificate、naturalization / citizenship certificate，或适用的 foreign passport + valid U.S. visa + I-94、I-551、I-766': [
        AR_REAL_ID_DOCS,
      ],
      'birth card 和 hospital birth certificate 不接受': [AR_REAL_ID_DOCS],
      'Identity 带一份当前清单接受的文件，例如 current DL/ID、school ID、court order、近一年 tax return、marriage certificate、military ID、certified school record、Arkansas title / registration 或政府签发 ID': [
        AR_REAL_ID_DOCS,
      ],
      '若该 identity 文件显示住宅地址，可同时算一份 residency proof': [AR_REAL_ID_DOCS],
      'SSN 组按当前打印清单带 Social Security Card 或 DD214': [
        AR_REAL_ID_DOCS,
        AR_FAQ,
      ],
      'REAL ID 简介仍只写 Social Security Card，因此使用 DD214 时不要只看简介，先向办理办公室确认': [
        AR_REAL_ID,
        AR_REAL_ID_DOCS,
        AR_FAQ,
      ],
      'Arkansas residency 带两份': [AR_REAL_ID_DOCS, AR_REAL_ID],
      '通常须在 6 个月内，可用 utility bill、lease / mortgage、bank statement、telephone / cable / internet bill、current insurance、pay slip、medical bill 等，税表须少于一年，voter registration 须少于四年': [
        AR_REAL_ID_DOCS,
      ],
      'P.O. Box 或 business address 不接受为住宅地址': [AR_REAL_ID_DOCS, AR_ADDRESS],
      'DFA 清单说明从 online account 打印的文件可能接受，但最终仍须符合文件类型和日期要求': [
        AR_REAL_ID_DOCS,
      ],
      '未成年人可使用父母的 residency documents 并附 birth certificate': [AR_REAL_ID_DOCS],
      '配偶可使用另一方的 residency documents 并附 marriage certificate': [
        AR_REAL_ID_DOCS,
      ],
      '姓名、出生日期或 SSN 有变化时，要用 court order、marriage certificate、divorce decree、adoption document 等连接旧信息与新信息': [
        AR_REAL_ID_DOCS,
        AR_NAME_AFFIDAVIT,
      ],
      'Affidavit of Legal Name Change 只标注用于 linking documents 缺失的情况': [
        AR_NAME_AFFIDAVIT,
      ],
      '外州转入还要带 hard-copy 外州驾照或 ID': [AR_MANUAL, AR_REAL_ID_DOCS],
      'Arkansas 签发新驾照或 ID 后，其他州签发的同类证件会被取消': [
        AR_REAL_ID_DOCS,
      ],
      '先判断业务属于首次考试、新居民转入、外国驾照、普通续期、REAL ID 升级、replacement、name change 还是 address-only update': [
        AR_EXAM,
        AR_MANUAL,
        AR_NCL,
        AR_REAL_ID,
        AR_ONLINE,
        AR_FORMS,
      ],
      '新居民在成为 Arkansas resident 后 30 个日历日内开始换证': [AR_MANUAL],
      '带 hard-copy 外州驾照，并确认其是否已过期超过 30 天': [AR_MANUAL],
      '需要考试时先打开 State Police Driver Examination，下载 June 2026 Study Guide 和对应 1-2-3 checklist，再预约 knowledge / skills test': [
        AR_EXAM,
        AR_MANUAL,
      ],
      '非美国公民选择 immigration-documents appointment type': [AR_MANUAL, AR_EXAM],
      '申请 REAL ID 时按 legal presence、identity、SSN、two residency proofs 四组整理，并使用当前打印清单逐项核对日期和原件要求': [
        AR_REAL_ID_DOCS,
      ],
      '有姓名差异时带完整 linking documents': [AR_REAL_ID_DOCS],
      '如果确实缺失，再查看 DFA 的 Affidavit of Legal Name Change 是否适用': [
        AR_NAME_AFFIDAVIT,
      ],
      '在 Revenue Office locations 查具体地点和服务，再通过 DFA appointment 系统确认可约时段': [
        AR_LOCATIONS,
        AR_ONLINE,
      ],
      '不要依赖旧 Saturday 活动的 walk-in 说明': [AR_REAL_ID],
      'replacement、address update 或 application pre-registration 先看 DFA Online Driver Services': [
        AR_ONLINE,
      ],
      '地址更新免费但不发新卡，线上 replacement 预计邮寄 3 至 5 个工作日': [
        AR_ONLINE,
        AR_ADDRESS,
      ],
      '普通续期先核对 NCL 的费用、有效期和 90 天窗口': [AR_NCL],
      '不改名且不升级 REAL ID 时，按 DFA 当前到场清单准备 vision exam 和拍照': [
        AR_WHAT_YOU_NEED,
      ],
      '把 State Police 考试点和 DFA Revenue Office 当成同一个地方，到了 Revenue Office 才发现首次申请还没完成考试': [
        AR_EXAM,
        AR_DRIVER_SERVICES,
        AR_WHAT_YOU_NEED,
      ],
      '只按旧搜索摘要准备 SSN 文件': [AR_REAL_ID, AR_REAL_ID_DOCS, AR_FAQ],
      '当前打印清单列 Social Security Card 或 DD214，没有列 W-2、1099 或 pay stub': [
        AR_REAL_ID_DOCS,
      ],
      '只带一份 residency proof，或带超过当前期限的账单': [AR_REAL_ID_DOCS],
      '用 P.O. Box 或 business address 当住宅地址': [AR_REAL_ID_DOCS, AR_ADDRESS],
      '持中国大陆驾照就认为可以直接换证': [AR_MANUAL],
      '2026 互惠免试清单没有列 China mainland': [AR_MANUAL],
      '把旧 April 26 Saturday REAL ID 活动的“预约建议但非必需”当成永久、全州、所有业务通用规则': [
        AR_REAL_ID,
      ],
      '线上免费更新地址后，以为 DFA 会自动寄新卡': [AR_ONLINE, AR_ADDRESS],
      '免费服务只更新记录，需要新卡还要另办 replacement': [AR_ONLINE, AR_ADDRESS],
      '身份、SSN 或外州驾照上的姓名不同，却没有携带完整姓名连接文件': [
        AR_REAL_ID_DOCS,
        AR_NAME_AFFIDAVIT,
      ],
    },
  },
  tennessee: {
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      TN_REAL_ID,
      TN_NEW_RESIDENTS,
      TN_ADULT_FIRST,
      TN_TYPES,
      TN_ID_ONLY,
      TN_REGULAR,
      TN_RENEW,
      TN_REPLACE,
      TN_ADDRESS,
      TN_RESIDENCY,
      TN_NAME,
      TN_FEES,
      TN_MVR,
      TN_LOCATIONS,
      TN_MANUAL,
    ],
    scope:
      '逐条打开并比对 Tennessee Driver Services 的 REAL ID、新居民、成人首证、Regular 与 Temporary credential、证件类型、ID、居住证明、续补证、改名改址、费用、MVR、地点和现行驾驶手册正文。',
    notes:
      '重写 Tennessee 两页并建立显式声明级来源；移除返回 404 的旧 Temporary 页面，改用现行证件类型、Identification License、续期和手册入口；同时公开标注 New Residents 和 MVR Verification 对 Kentucky 是否需要 MVR 的当前页面差异。',
    claims: {
      '搬到 Tennessee 并持外州驾照的新居民，应在建立州内居住后 30 天内到 full-service Driver Services Center 换证': [
        TN_NEW_RESIDENTS,
      ],
      '申请前可以在 e-Services 上传材料预审，官方要求为预审预留最多 5 个工作日': [
        TN_NEW_RESIDENTS,
        TN_ADULT_FIRST,
      ],
      '到场时仍必须带原件或签发机构认证副本': [TN_NEW_RESIDENTS, TN_ADULT_FIRST],
      '新居民申请时要交回外州驾照，或在适用情形提交 driving record': [
        TN_NEW_RESIDENTS,
        TN_MVR,
      ],
      '外国驾照可以保留': [TN_NEW_RESIDENTS],
      '所有新居民都要做 vision screening，外州驾照过期超过 6 个月或持外国驾照的人还要通过 Tennessee knowledge 和 road skills tests': [
        TN_NEW_RESIDENTS,
      ],
      '持联邦授权 temporary legal presence 的申请人应核对 Types of Issued Licenses、Identification License 和现行手册中的 Temporary Driver License / XID 说明，不应套用只面向 Regular Class D 的资格段落': [
        TN_TYPES,
        TN_ID_ONLY,
        TN_MANUAL,
        TN_REGULAR,
      ],
      'Tennessee REAL ID 是可选证件': [TN_REAL_ID],
      '第一次申请必须本人到场': [TN_REAL_ID],
      '已有 Tennessee 驾照或 ID 的人可去 Driver Services Center 或参与办理的 County Clerk，没有 Tennessee credential 的人要去 full-service Driver Services Center': [
        TN_REAL_ID,
        TN_LOCATIONS,
      ],
      '核心组合是一份 U.S. citizenship 或 legal presence、一份显示完整 SSN 的证明或从未获发 SSN 时的宣誓书、两份 Tennessee residency，以及连接到身份文件原始姓名的完整改名链': [
        TN_REAL_ID,
        TN_NEW_RESIDENTS,
      ],
      '预约并非每个 Driver Services Center、每种业务都有': [TN_LOCATIONS],
      '当前 locations 页面要求预约者提前 15 分钟到场，迟到可能被取消并改按 walk-in': [
        TN_LOCATIONS,
      ],
      '新居民、首次申领、考试和首次 REAL ID 还要确认地点是否为 full-service center': [
        TN_LOCATIONS,
        TN_NEW_RESIDENTS,
        TN_ADULT_FIRST,
        TN_REAL_ID,
      ],
      'Tennessee 两个当前官方入口对 Kentucky 的 MVR 要求显示不一致：New Residents 说明列出 California、Connecticut、Illinois、Nevada 和 West Virginia，MVR Verification 的州别请求链接另含 Kentucky': [
        TN_NEW_RESIDENTS,
        TN_MVR,
      ],
      '来自这些州的申请人应在预约前打开 MVR Verification 入口确认': [
        TN_NEW_RESIDENTS,
        TN_MVR,
      ],
      '该入口要求记录在申请前 30 天内签发': [TN_MVR],
      'Regular Driver License 页把 regular credential 限定给 U.S. citizen 或 lawful permanent resident': [
        TN_REGULAR,
      ],
      'Types of Issued Licenses 和现行手册仍列出 Temporary Driver License，Identification License 页也保留 temporary legal presence 文件和 XID 说明': [
        TN_TYPES,
        TN_ID_ONLY,
        TN_MANUAL,
      ],
      '两条路径不是同一种 credential': [TN_REGULAR, TN_TYPES, TN_ID_ONLY, TN_MANUAL],
      '21 岁及以上 Tennessee 驾照或 ID 通常自签发日起有效 8 年': [TN_RENEW],
      '线上续期不是保证资格：每隔一个续期周期需要现场拍新照片，Temporary credential 和 CDL 续期也必须到场': [
        TN_RENEW,
      ],
      '地址变化后 10 天内要通知 Driver Services，通知 USPS 不能代替州记录更新': [
        TN_ADDRESS,
      ],
      '只更新档案不收费，也不会自动寄新卡': [TN_ADDRESS],
      'P.O. Box 不能作为 residential address': [TN_ADDRESS],
      '当前费用表列 Regular Class D 八年证件总费用为 28 美元，第一张普通 duplicate 为 8 美元、之后通常为 12 美元': [
        TN_FEES,
        TN_REPLACE,
      ],
      'County Clerk partner 对其提供的服务另收 4 美元行政费': [TN_FEES],
      '付款前仍应打开当前费用表确认': [TN_FEES],
      'U.S. citizenship、permanent resident 或适用 temporary legal presence 文件必须是原件或 certified copy，photocopy 不接受': [
        TN_REAL_ID,
        TN_NEW_RESIDENTS,
        TN_ID_ONLY,
      ],
      'Temporary legal presence 常见组合包括有效 foreign passport、visa 和 I-94': [
        TN_ID_ONLY,
      ],
      'F-1/F-2/M-1/M-2 还要带有效 I-20，J-1/J-2 还要带 DS-2019': [TN_ID_ONLY],
      '一份显示姓名和完整 SSN 的文件，例如 Social Security card、最近 12 个月的 W-2/1099 或 payroll stub': [
        TN_REAL_ID,
        TN_NEW_RESIDENTS,
      ],
      '从未获发 SSN 时可用在 examiner 或 notary 面前签署的 sworn affidavit': [
        TN_REAL_ID,
        TN_NEW_RESIDENTS,
        TN_ID_ONLY,
      ],
      '两份 Tennessee residency 证明': [TN_REAL_ID, TN_NEW_RESIDENTS, TN_RESIDENCY],
      '官方 New Residents 页面把“current”通常定义为最近 4 个月内，另有明确期限的文件按各自期限': [
        TN_NEW_RESIDENTS,
        TN_RESIDENCY,
      ],
      'Lease 只能作为一份居住证明，还要附最近 30 天内的 landlord letter，并另外准备第二份合格 residency 文件': [
        TN_NEW_RESIDENTS,
        TN_RESIDENCY,
      ],
      'Utility bill、bank statement、employer letter、含住宅地址的 pay stub、合格保险单、Tennessee registration/title 等可按当前清单使用': [
        TN_NEW_RESIDENTS,
        TN_RESIDENCY,
      ],
      'checks、checkbook、insurance wallet card 不接受': [TN_NEW_RESIDENTS, TN_RESIDENCY],
      '身份或 legal-presence 文件仍是旧姓名时，要带能从原始姓名连接到当前姓名的全部 marriage certificate、divorce decree 或 court order': [
        TN_REAL_ID,
        TN_NEW_RESIDENTS,
        TN_NAME,
      ],
      '外州换证带现有外州驾照': [TN_NEW_RESIDENTS],
      '若来自 MVR Verification 当前列出的州，还要按该页取得申请前 30 天内签发的 Motor Vehicle Record': [
        TN_NEW_RESIDENTS,
        TN_MVR,
      ],
      '先判断自己是 new resident、adult first-time driver、foreign-license holder、temporary-legal-presence applicant、REAL ID upgrade、renewal、duplicate、name change 还是 address-only update': [
        TN_NEW_RESIDENTS,
        TN_ADULT_FIRST,
        TN_ID_ONLY,
        TN_REAL_ID,
        TN_RENEW,
        TN_REPLACE,
      ],
      '新居民或首次申请人可先在 e-Services 上传材料预审，至少给系统预留 5 个工作日': [
        TN_NEW_RESIDENTS,
        TN_ADULT_FIRST,
      ],
      '预审通过也要把原件或 certified copies 带到 full-service center': [
        TN_NEW_RESIDENTS,
        TN_ADULT_FIRST,
      ],
      '申请 REAL ID 时按四组准备：citizenship/legal presence、完整 SSN 或适用 affidavit、两份 residency、完整姓名变更链': [
        TN_REAL_ID,
      ],
      '外州新居民确认驾照到期状态和 MVR 要求': [TN_NEW_RESIDENTS, TN_MVR],
      '所有外州新居民准备 vision screening，驾照过期超过 6 个月再准备 knowledge 与 road tests': [
        TN_NEW_RESIDENTS,
      ],
      '外国驾照持有人按 foreign new resident 路径准备三项考试': [TN_NEW_RESIDENTS],
      'temporary legal presence 申请人核对 Types of Issued Licenses、Identification License 和现行手册中的 XD/XID 材料': [
        TN_TYPES,
        TN_ID_ONLY,
        TN_MANUAL,
      ],
      '续期、补证、改名和改址分别打开对应页面': [
        TN_RENEW,
        TN_REPLACE,
        TN_NAME,
        TN_ADDRESS,
      ],
      '没有 DD number 不能在线补证，改名必须现场，地址变化要在 10 天内通知': [
        TN_REPLACE,
        TN_NAME,
        TN_ADDRESS,
      ],
      '在 locations 页面按服务筛选 full-service center，再查看是否有对应 appointment': [
        TN_LOCATIONS,
      ],
      '预约者提前 15 分钟到场': [TN_LOCATIONS],
      '交易完成后保存 paper interim 和回执': [TN_REAL_ID],
      '需要用 REAL ID 出行时，为 10 至 20 天的实体卡邮寄时间留余量': [TN_REAL_ID],
      '建立 Tennessee residency 超过 30 天仍没有走 new-resident transfer': [
        TN_NEW_RESIDENTS,
      ],
      '材料已经线上预审，就不再携带原件或 certified copies': [
        TN_NEW_RESIDENTS,
        TN_ADULT_FIRST,
      ],
      '只带一份地址证明，或把超过 4 个月且无特殊期限的账单当作 current document': [
        TN_NEW_RESIDENTS,
      ],
      '只带 lease，没有最近 30 天 landlord letter，也没有第二份不同的 residency proof': [
        TN_NEW_RESIDENTS,
      ],
      '身份文件是旧姓，却只带最后一次改名文件，没有连接完整姓名链': [
        TN_REAL_ID,
        TN_NAME,
      ],
      '持中国等外国驾照就认为可免考': [TN_NEW_RESIDENTS],
      'Tennessee 当前页面要求外国新居民通过 vision、knowledge 和 road skills tests': [
        TN_NEW_RESIDENTS,
      ],
      '外州驾照过期超过 6 个月，却没有为 knowledge 和 road skills tests 做准备': [
        TN_NEW_RESIDENTS,
      ],
      '以为首次 REAL ID 可以完全在线完成，或已有外州 REAL ID 就不用重新提交 Tennessee 所需材料': [
        TN_REAL_ID,
      ],
      '临近出行才办 REAL ID': [TN_REAL_ID],
      '现场先发 paper interim，官方预计 hard copy 需要 10 至 20 天，paper credential 可能不被 TSA 接受': [
        TN_REAL_ID,
      ],
      '只向 USPS 更新地址，却没有在 10 天内通知 Tennessee Driver Services': [
        TN_ADDRESS,
      ],
    },
  },
  indiana: {
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      IN_REAL_ID,
      IN_DOCS,
      IN_NEW_RESIDENTS,
      IN_OUT_COUNTRY,
      IN_DRIVER_LICENSE,
      IN_RENEW,
      IN_REPLACE,
      IN_AMEND,
      IN_BRANCH_VISITS,
      IN_MAIL,
      IN_DRIVER_MANUAL,
      IN_SAVE,
      IN_SKILLS,
    ],
    scope:
      '逐条打开并比对 Indiana BMV 的 REAL ID、Documentation List、新居民、外州与外国驾照、续补证、改名改址、branch、邮寄、SAVE、driver manual 和 skills test 正文。',
    notes:
      '重写 Indiana 两页并建立显式声明级来源；公开标注当前 New Resident/Driver License 页面与旧中央制证 FAQ 对有效外州驾照是否考 written test 的差异，中国大陆驾照不套用 Japan/Taiwan reciprocity。',
    claims: {
      'Indiana 新办驾照、permit 或 ID 的申请人要提交 identity、lawful status、SSN 和 residency 文件，BMV 会签发 REAL ID': [
        IN_REAL_ID,
      ],
      '只有已经持有 non-compliant credential 的居民才能继续维持非合规证件': [
        IN_REAL_ID,
      ],
      '持有效外州驾照的新居民应在搬入后 60 天内换 Indiana 驾照，名下外州车辆的 title 和 registration 也要另行转入': [
        IN_NEW_RESIDENTS,
      ],
      '年满 18 岁且持有效外州驾照的新居民到 branch 交回外州 credential，带原驾照、official driving record 或 verification letter 之一，再提交身份材料并通过 vision screening': [
        IN_NEW_RESIDENTS,
      ],
      '外州驾照已过期时要考 knowledge，过期超过五年或持有效外州驾照不足一年时还要考 driving skills': [
        IN_NEW_RESIDENTS,
      ],
      '持中国大陆等 out-of-country license 的居民通常要通过 vision、knowledge 和 skills exams': [
        IN_OUT_COUNTRY,
      ],
      'Japan 与 Taiwan 的合格驾照可按 reciprocity 免 skills exam，但不免 knowledge 和 vision': [
        IN_OUT_COUNTRY,
      ],
      '第一次取得 Indiana REAL ID 必须到 BMV branch': [IN_REAL_ID],
      '官方清单要求一份 identity、一份 lawful status、一份显示完整 SSN 的证明，以及两份印有姓名和 Indiana residential address 的纸质居住证明': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      '姓名或出生日期与 identity/lawful-status 文件不一致时，要用政府签发文件连接每次变化': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      'Knowledge exam 不要求预约，电脑考试应至少在关门前一小时到场，纸质考试至少提前 30 分钟': [
        IN_BRANCH_VISITS,
        IN_DRIVER_MANUAL,
      ],
      'Driving skills exam 必须预约，当前页面要求提前至少 48 小时、最多三周安排': [
        IN_SKILLS,
      ],
      '普通 branch 业务可以预约或 walk-in，且不必去居住县的 branch': [
        IN_BRANCH_VISITS,
      ],
      'Indiana 当前的 New Resident 和 Driver License 页面都说明：年满 18 岁并持有效外州驾照者不要求 knowledge exam': [
        IN_NEW_RESIDENTS,
        IN_DRIVER_LICENSE,
      ],
      '中央制证旧 FAQ 仍有“written test”字样': [IN_MAIL],
      '遇到过期证件、记录不足或系统要求时，以当前交易页和 branch 判断为准': [
        IN_NEW_RESIDENTS,
        IN_DRIVER_LICENSE,
        IN_BRANCH_VISITS,
      ],
      '在线续期不是通用入口': [IN_RENEW],
      '通常要是美国公民、Indiana resident、信息无变化、上次在 branch 续期、证件过期不超过 180 天且不触发考试、限制、停牌或积分条件': [
        IN_RENEW,
      ],
      '新居民、首次申领或证件已经到期时，branch 通常发 30 天 interim driver credential': [
        IN_MAIL,
      ],
      '永久卡在材料无问题时约 14 天寄到 mailing address，interim 不应当作普通 photo ID 使用': [
        IN_MAIL,
      ],
      'Temporary 或 permanent lawful status 申请人的材料会经 SAVE 核验，官方说明最长可能约两周': [
        IN_SAVE,
      ],
      '除 replacement 外，每次申请都可能要再次提供 lawful-status 文件': [
        IN_SAVE,
      ],
      '一份 original 或 issuing agency certified copy 的 identity 文件，例如符合条件的 U.S. birth certificate、unexpired U.S. passport 或适用的 foreign passport 组合': [
        IN_DOCS,
      ],
      '一份 lawful-status 文件': [IN_DOCS],
      '很多 identity 文件也能满足这一类别，但 non-citizen 要按本人身份准备 I-94、visa、I-20、DS-2019、I-551、I-766 等适用组合': [
        IN_REAL_ID,
        IN_DOCS,
        IN_SAVE,
      ],
      '一份显示姓名和完整九位 SSN 的原件，例如 Social Security card、W-2、SSA-1099、non-SSA-1099 或合格 pay stub': [
        IN_DOCS,
      ],
      '没有资格取得 SSN 时要提供 SSA ineligibility 证明': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      '两份不同的 printed Indiana residency 文件，必须显示本人姓名和 residential address': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      'P.O. Box 不能代替居住地址': [IN_DOCS],
      'Utility、credit-card、doctor 或 hospital bill，以及 bank statement/transaction receipt 通常要在申请前 60 天内': [
        IN_DOCS,
      ],
      'Insurance policy 可按清单使用一年内文件，W-2、税单或年度 benefit summary 可使用当前或紧邻前一年度': [
        IN_DOCS,
      ],
      '当前 legal name 或出生日期与 identity/lawful-status 文件不一致时，带 government-issued adoption、marriage、divorce、court order 或 amended birth certificate': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      '多次改名可能需要多份文件': [IN_REAL_ID, IN_DOCS],
      '外州转入带 current out-of-state license、official driving record 或 verification letter 之一，并带 identity、lawful status、SSN 和两份 Indiana residency': [
        IN_NEW_RESIDENTS,
      ],
      'Out-of-country license 必须是英文，或同时带可核验英文翻译或 IDP': [
        IN_OUT_COUNTRY,
      ],
      '外国驾照本身不能作为 Indiana identity proof': [IN_OUT_COUNTRY],
      '先确定自己是 new applicant、现有 non-compliant credential holder、out-of-state transfer、out-of-country applicant、renewal、replacement 还是 amendment': [
        IN_REAL_ID,
        IN_NEW_RESIDENTS,
        IN_OUT_COUNTRY,
        IN_RENEW,
        IN_REPLACE,
        IN_AMEND,
      ],
      '新办或升级 REAL ID 时，逐项对照 Indiana REAL ID overview 和 Documentation Checklist，分别准备 identity、lawful status、完整 SSN、两份 printed residency 和适用姓名链': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      '新居民确认搬入日期和外州驾照状态': [IN_NEW_RESIDENTS],
      '有效外州证通常只需 vision': [IN_NEW_RESIDENTS],
      '已过期、过期超过五年或持证不足一年会改变考试要求': [
        IN_NEW_RESIDENTS,
      ],
      '持外国驾照者先看 Out-of-Country Licenses 页面': [IN_OUT_COUNTRY],
      '中国大陆驾照按普通 foreign-license 路径准备，Taiwan 驾照再核对 reciprocity letter 和三年有效/过期窗口': [
        IN_OUT_COUNTRY,
      ],
      'Renewal 或 replacement 先逐条核对线上资格': [IN_RENEW, IN_REPLACE],
      '姓名、residential address、非公民材料、首次 REAL ID 或系统限制通常要去 branch': [
        IN_REAL_ID,
        IN_RENEW,
        IN_AMEND,
      ],
      '需要 knowledge exam 时按 branch 截止时间 walk in': [
        IN_BRANCH_VISITS,
        IN_DRIVER_MANUAL,
      ],
      '需要 driving skills exam 时用 myBMV 提前 48 小时至三周预约': [
        IN_SKILLS,
      ],
      '交易完成后保存 interim 和 receipt，在 myBMV 跟踪邮寄': [IN_MAIL],
      '14 天未收到永久卡时按 BMV mail 页面联系并核对 mailing address': [
        IN_MAIL,
      ],
      '新申请人按“REAL ID 可选”准备，到了 branch 才发现 Indiana 当前会给新 credential applicant 签发 REAL ID': [
        IN_REAL_ID,
      ],
      '只带一份地址证明、手机截图、P.O. Box，或账单超过清单允许的日期窗口': [
        IN_DOCS,
      ],
      'W-2 或 pay stub 只显示后四位 SSN，却把它当作要求完整九位号码的 SSN proof': [
        IN_DOCS,
      ],
      'identity 文件还是旧姓，只带最后一次改名文件，没有串起完整 legal-name chain': [
        IN_REAL_ID,
        IN_DOCS,
      ],
      '搬入超过 60 天仍未换驾照，或只换驾照却漏掉名下车辆的 Indiana title 和 registration': [
        IN_NEW_RESIDENTS,
      ],
      '把中国大陆驾照当作 reciprocity transfer': [IN_OUT_COUNTRY],
      'Indiana 当前列出的 reciprocal countries 是 Japan 和 Taiwan，中国大陆申请人通常仍需 skills exam': [
        IN_OUT_COUNTRY,
      ],
      '打开 myBMV 就认为一定能线上续期或补证，忽略 citizenship、上次续期方式、地址/姓名变化、到期时间、积分和 credential status 限制': [
        IN_RENEW,
        IN_REPLACE,
      ],
      '把 residential address 和 mailing address 当成同一项': [IN_AMEND],
      'Residential address 变化要在 30 天内到 branch 用两份证明更新，mailing address 才能单独在线修改': [
        IN_AMEND,
      ],
      '把 30 天 interim driver credential 当作永久 photo ID，或材料核验未完成就安排依赖实体卡的旅行和身份交易': [
        IN_MAIL,
        IN_SAVE,
      ],
    },
  },
  minnesota: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      MN_DVS_CONTACT,
      MN_DVS_CONTACT_FORMS,
      MN_DVS_ONLINE_SERVICES,
      MN_REAL_ID_REQUIREMENTS,
      MN_REAL_ID_DOCS,
      MN_SIDE_BY_SIDE,
      MN_REAL_ID_INFOGRAPHIC,
      MN_SAME_DAY,
      MN_RENEW,
      MN_ADDRESS,
      MN_ID_CARD,
      MN_NEW_RESIDENT_VEHICLE,
      MN_APP,
      MN_FAQ,
      MN_LAW_171_06,
      MN_LAW_171_01,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Minnesota DVS 的 REAL ID、Standard/Enhanced 分流、预约、材料、同日服务、地址更新、名称变更、非公民路径、车辆新居民以及州法条款，建立可追溯声明级来源。',
    notes:
      '明尼苏达官方站点存在可达性波动，内容中将可达性与政策结论分离，确保“政策事实”都保留到可核验官方来源，地址/同日服务等高风险点已做单条来源映射。',
    claims: {
      '明尼苏达驾照和 ID 分 Standard、REAL ID 与 Enhanced 三类用途，Standard 主要用于驾驶，REAL ID 与 Enhanced 更偏向联邦用途，是否需要哪类要先按出行或验证用途判断': [
        MN_SIDE_BY_SIDE,
        MN_REAL_ID_INFOGRAPHIC,
      ],
      'REAL ID 的核心材料通常包含身份和出生日期或 lawful presence 证明、Social Security 相关材料、两份 Minnesota 居住证明以及完整姓名链条，是否接受电子扫描、翻译件或替代形式需以当日 DVS 清单确认': [
        MN_REAL_ID_REQUIREMENTS,
        MN_REAL_ID_DOCS,
      ],
      '标准驾照和 ID 在无姓名、地址和证件类型变化时可先判断是否可在线续期，REAL ID、Enhanced、改名、改址或首次办理通常改走 DVS 现场流程': [
        MN_RENEW,
      ],
      '明尼苏达 DVS 的 office、exam station、deputy registrar 与 license agent 处理业务不同，先确认办理类型与服务点是否一致，可显著降低到错窗口率': [
        MN_DVS_CONTACT,
        MN_DVS_CONTACT_FORMS,
      ],
      '明尼苏达 Standard、REAL ID、Enhanced 要分开叙述，避免把 Enhanced 当作普通 Standard 或把 Standard 当作联邦出行通用证件': [
        MN_SIDE_BY_SIDE,
      ],
      '高风险事实重点是地址时效、居住证明文件数量与姓名链条，姓名不一致时必须逐段核对每一次法定变更文件': [
        MN_REAL_ID_REQUIREMENTS,
        MN_FAQ,
      ],
      'REAL ID 路径会因 lawful status、年龄和是否美国公民变化，材料清单与审批要求也会同步调整，需以当前官方页面时间戳为准': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '同日服务与入口页面有历史变更，不能把“同日可办”结论当成长期规律使用': [
        MN_SAME_DAY,
      ],
      '线上服务、office/agent 与外部目录可达性偶有波动，出现 403/404 时优先改用 DVS contact form/电话确认预约和业务': [
        MN_DVS_CONTACT,
        MN_DVS_CONTACT_FORMS,
      ],
      '《Minnesota Statutes 171.06》与 DVS 官方材料页可交叉确认 Standard、REAL ID、Enhanced 的适用场景、文书关系和基础资格要件': [
        MN_LAW_171_06,
        MN_DVS_CONTACT,
      ],
      'STANDARD、REAL ID、Enhanced 的用途不同，先确认目标后再决定是否要进行联邦身份升级': [
        MN_SIDE_BY_SIDE,
      ],
      'REAL ID 常见材料包括身份/出生日期、lawful presence、SSN、两份居住证明和姓名链条': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '居住证明应能支持 Minnesota 主居住地址，PO Box 常不足以单独承担主要居住用途': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '姓名变更链条若不完整，常见退件点会集中在姓名与历史文件不一致': [
        MN_REAL_ID_REQUIREMENTS,
        MN_FAQ,
      ],
      '改名、改址后建议同步更新全部相关记录，避免回执与数据库记录对不上': [
        MN_ADDRESS,
      ],
      '同日领证停止后，现场流程通常是收据/凭条加快递，取卡与邮寄信息需单独确认': [
        MN_SAME_DAY,
      ],
      '新居民车辆入籍有 60 天窗口，驾照和 ID 时效通常不能直接套用该期限': [
        MN_NEW_RESIDENT_VEHICLE,
        MN_RENEW,
      ],
      '部分身份材料和非英文证明件是否接受电子扫描或替代件需按 DVS 当前清单确认': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '费用、有效期和处理时效优先以官方页面与州法条款为准，避免复用历史表述': [
        MN_LAW_171_06,
        MN_LAW_171_01,
      ],
      '官方入口、DVS contact、在线表单和服务站三端建议同步核对，尤其在高峰期容易出现可达性差异': [
        MN_DVS_CONTACT,
        MN_DVS_CONTACT_FORMS,
      ],
      '非公民或特殊身份申请时，lawful presence 与 SSN 路径是关键核验点之一': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '把 Standard 当作 REAL ID 或把 Enhanced 当作普通驾照用途': [
        MN_SIDE_BY_SIDE,
      ],
      '认为 REAL ID 的材料要求和 Standard 的一致': [
        MN_SIDE_BY_SIDE,
        MN_REAL_ID_REQUIREMENTS,
      ],
      '用单份居住证明替代两份材料': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '用 PO Box 作为主要居住证明提交': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '姓名改动后只提交最后一份证明文件': [
        MN_FAQ,
      ],
      '在线申请通过后未保留原件去现场核验': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '把 2024 年前的同日领证经验直接带到当前流程': [
        MN_SAME_DAY,
      ],
      '把车辆新居民 60 天期限等同于驾照办理或改址期限': [
        MN_NEW_RESIDENT_VEHICLE,
      ],
      '把 receipt 当作长期可核验的永久身份证明': [
        MN_SAME_DAY,
      ],
      '未先确认 office/agent 是否支持所选业务': [
        MN_DVS_CONTACT,
      ],
      '过期文书、过旧 SSN/移民材料仍拿去做当前申请': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '看到 403/404 就放弃核验，而没改用 contact 或官方目录': [
        MN_DVS_CONTACT_FORMS,
      ],
      '在地址变更后未按官方时限更新，导致后续邮寄失败': [
        MN_ADDRESS,
      ],
      '把同一条材料要求应用到所有证件类型': [
        MN_SIDE_BY_SIDE,
      ],
      '先判断当前办事目标是普通驾驶、联邦出行还是边境用途': [
        MN_SIDE_BY_SIDE,
      ],
      '确认你是要办理 Standard、REAL ID 还是 Enhanced，并标注是否涉及首次身份核验': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '无姓名、地址、ID 类型变化时可先评估是否可以在线续期': [
        MN_RENEW,
      ],
      '涉及 REAL ID、Enhanced、改名、改址时优先按 DVS 现场路径准备材料': [
        MN_DVS_CONTACT,
      ],
      '通过 contact form 或电话确认 office、agent、appointment 与对应服务类型': [
        MN_DVS_CONTACT_FORMS,
      ],
      '按身份、SSN、居住、姓名链条四组建立材料清单，再按页面要求逐项核对': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '核验每份文件的姓名、出生日期、签发日期和主要住址字段是否一致': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '优先使用非 PO Box 的住址证明，并准备至少两份居住类文件': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '有非公民身份或移民文件变更时，优先确认 lawful status 证据链': [
        MN_REAL_ID_REQUIREMENTS,
      ],
      '姓名变化时按时间顺序准备 marriage certificate、court order、离婚判决等': [
        MN_FAQ,
      ],
      '确认是否需要改址后再提交改名或地址更新，避免先行提交产生对账冲突': [
        MN_ADDRESS,
      ],
      '首次或首次升级申请尽量在到场前完成线上预约与材料预审，保存确认码': [
        MN_DVS_CONTACT_FORMS,
      ],
      '到场时携带当前证件、确认码、支付凭证和所有原件文件': [
        MN_DVS_CONTACT,
      ],
      '同日取消后按 receipt + 邮寄流程追踪快递，避免把回执误用为长期替代件': [
        MN_SAME_DAY,
      ],
      '地址变更属于高频失败点，按官方时限尽快提交并检查邮寄地址': [
        MN_ADDRESS,
      ],
      '将车辆新居民和驾照新居民规则分开处理，别把期限混在同一套材料中': [
        MN_NEW_RESIDENT_VEHICLE,
        MN_RENEW,
      ],
    },
  },
  california: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      CA_REAL_ID,
      CA_WHAT_IS_REAL_ID,
      CA_REAL_ID_CHECKLIST,
      CA_DOCUMENT_VERIFICATION,
      CA_APPOINTMENTS,
      CA_ADDRESS,
      CA_UPDATE_INFORMATION,
      CA_FEES,
      CA_PROCESSING,
      CA_AB60,
      CA_LEARNER_PERMITS,
      CA_ONLINE_LEARNING,
      CA_FAST_FACTS,
      CA_DRIVER_LICENSES,
    ],
    scope:
      '逐条打开并比对 California DMV 的 REAL ID、材料、预约、地址、费用、处理时间、AB 60、考试、语言和外国驾照正文。',
    notes:
      '重写 REAL ID 材料与失败原因，更新当前费用，改用 learner permit 新路径，并把自动匹配错误改成显式来源；仍待真实人工签字。',
    claims: {
      '加州首次 REAL ID 可以先在线填写申请并上传材料，但最后仍要到 DMV office 出示原件和 confirmation code 才能完成申请': [
        CA_REAL_ID,
        CA_DOCUMENT_VERIFICATION,
      ],
      '标有 Federal Limits Apply 的普通加州驾照仍可用于驾驶，但不能用于 REAL ID 联邦用途': [
        CA_WHAT_IS_REAL_ID,
        CA_DRIVER_LICENSES,
      ],
      '如果你有有效美国护照、护照卡或其他联邦接受证件，不必只为国内航班办理 REAL ID': [
        CA_WHAT_IS_REAL_ID,
      ],
      '首次申请加州 REAL ID 需要一份身份证明、Social Security number（例外情况按官方说明）、两份不同的 California residency 证明，并亲自到 DMV office 完成文件核验': [
        CA_WHAT_IS_REAL_ID,
        CA_REAL_ID_CHECKLIST,
      ],
      '首次 REAL ID 必须到 DMV office': [CA_WHAT_IS_REAL_ID],
      '多数驾照或 ID 续期、replacement 和记录服务不提供柜台办理，应先用 online、kiosk、DMV business partner 或 mail': [
        CA_APPOINTMENTS,
      ],
      '加州法律要求地址变更后 10 天内通知 DMV，在线变更应在办理或续办其他 DMV 业务前最多预留 3 天处理': [
        CA_UPDATE_INFORMATION,
        CA_ADDRESS,
      ],
      'California DMV 当前费用页列出非商业 Class C 原办或续期 $46，replacement 或信息变更 $37，普通 ID card $40': [
        CA_FEES,
      ],
      '信用卡、借记卡和移动支付的 service fee 会因线上、办公室或 kiosk 渠道不同而变化，付款前应看费用页的最新表格': [
        CA_FEES,
      ],
      'California DMV 当前估算 DL/ID online 处理约 2 周、kiosk 实体卡邮寄约 2 周、mail 约 4 周，实际可能因额外审查延长': [
        CA_PROCESSING,
      ],
      '即时获得的 temporary driver license 不能当作身份证明使用': [CA_PROCESSING],
      '不能提供美国合法居留证明、但能提供身份和 California residency 并满足 DMV 要求的人，应走 AB 60 driver license 路径': [
        CA_AB60,
      ],
      'AB 60 不能升级为 REAL ID': [CA_WHAT_IS_REAL_ID],
      '加州 instruction permit 的 knowledge test 通常要求 80% 通过，办公室测试须在 4:30 p.m. 前开始': [
        CA_LEARNER_PERMITS,
      ],
      '符合条件的非商业 Class C 续期申请人可用 eLearning 满足 knowledge test 要求，课程提供 Traditional Chinese 和 Mandarin audio': [
        CA_ONLINE_LEARNING,
      ],
      '18 岁以上访客持有效本州或本国驾照时可在加州驾驶': [CA_FAST_FACTS],
      '成为 California resident 后须在 10 天内取得 California DL': [CA_FAST_FACTS],
      '持外国驾照申请 California DL 时按外州驾照流程办理并额外参加 driving test': [
        CA_DRIVER_LICENSES,
      ],
      '持有效外国驾照去参加 drive test 仍需 accompanying driver': [CA_LEARNER_PERMITS],
      'California DMV 明确英文网页才是官方准确来源，机器翻译差异不具有法律效力': [
        CA_REAL_ID,
      ],
      '准备一份身份证明原件或认证副本，文件要显示出生日期和 true full legal name': [
        CA_REAL_ID_CHECKLIST,
      ],
      '准备两份不同的打印版 California residency 文件，均要显示申请人的 first and last name，并与申请中的 mailing address 一致': [
        CA_REAL_ID_CHECKLIST,
      ],
      '使用 P.O. Box 时，一份居住文件必须同时显示 P.O. Box 和 physical residence address': [
        CA_REAL_ID_CHECKLIST,
      ],
      '身份文件姓名与当前法定姓名不一致时，要提交能够串起每次变更的 marriage certificate、court order 或其他法定姓名变更文件': [
        CA_REAL_ID_CHECKLIST,
      ],
      'REAL ID 申请中要提供 Social Security number，官方注明某些情况可能例外': [
        CA_WHAT_IS_REAL_ID,
      ],
      '在线上传文件后，去 DMV office 时仍要带原件和 confirmation code': [
        CA_REAL_ID,
        CA_DOCUMENT_VERIFICATION,
      ],
      '先判断自己是否要用加州驾照或 ID 处理联邦身份用途': [CA_WHAT_IS_REAL_ID],
      '有效美国护照、护照卡等联邦接受证件也可用于这些用途': [CA_WHAT_IS_REAL_ID],
      '打开 California DMV REAL ID checklist，逐项确认 identity、SSN、residency 和 name-change 文件': [
        CA_WHAT_IS_REAL_ID,
        CA_REAL_ID_CHECKLIST,
      ],
      '在线提交申请并上传文件后，保存 confirmation code': [CA_REAL_ID],
      '到 DMV office 完成首次申请，带齐上传过的原件和 confirmation code，并提前查看 wait times 或预约入口': [
        CA_REAL_ID,
        CA_DOCUMENT_VERIFICATION,
      ],
      '以为在线上传文件后，现场就不用带原件': [CA_DOCUMENT_VERIFICATION],
      '用 photocopy 或 informational copy 代替身份证明原件或认证副本': [
        CA_REAL_ID_CHECKLIST,
        CA_FAST_FACTS,
      ],
      '两份 residency 文件并非不同文件，或姓名和地址与申请不一致': [
        CA_REAL_ID_CHECKLIST,
      ],
      '当前姓名与身份文件不同，却没有带齐每一次法定姓名变更的证明': [
        CA_REAL_ID_CHECKLIST,
      ],
      '以为首次 REAL ID 可以只靠线上或邮寄续期完成': [CA_WHAT_IS_REAL_ID],
    },
  },
  'new-york': {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      NY_REAL_ID,
      NY_DOCUMENT_GUIDE,
      NY_ID44,
      NY_NO_SSN,
      NY_PERMIT_TEST,
      NY_FOREIGN,
      NY_OUT_OF_STATE,
      NY_LANGUAGE,
      NY_ROAD_TEST,
      NY_RENEW,
      NY_ADDRESS,
      NY_FEES,
      NY_REPLACE,
      NY_OFFICES,
    ],
    scope:
      '逐条打开并比对 New York DMV 的证件类型、ID-44、Social Security、预约、续期、地址、费用、补证、permit test、路考、语言、外国驾照和外州换证正文。',
    notes:
      '按办事路径重写纽约州总览与 REAL ID 清单，纠正线上 permit test 的未满 18 岁适用范围，并把费用、期限、材料和身份声明改为显式来源；仍待真实人工签字。',
    claims: {
      '纽约州有 Standard、REAL ID 和 Enhanced 三类照片证件': [NY_REAL_ID],
      '先按用途选证件，再用官方 pre-screening 生成材料清单': [
        NY_REAL_ID,
        NY_DOCUMENT_GUIDE,
      ],
      '从 Standard 升级为 REAL ID 或 Enhanced 必须到 DMV office': [
        NY_REAL_ID,
        NY_RENEW,
      ],
      'Standard 驾照仍可用于驾驶和普通照片 ID，但不能用于登美国国内航班或进入要求 REAL ID 的联邦场所': [
        NY_REAL_ID,
      ],
      '有效护照可替代 REAL ID': [NY_REAL_ID],
      'REAL ID 没有额外证件费，但正常交易费仍适用': [NY_REAL_ID],
      'Enhanced 仅面向美国公民和纽约州居民，并在普通交易费之外加收 $30': [
        NY_REAL_ID,
      ],
      '按城市或 ZIP 搜索办公室后，点 View Details 查看现场服务和预约入口': [
        NY_OFFICES,
      ],
      '并非所有办公室提供预约，且长等待时可能只允许有 reservation 的人进入': [
        NY_OFFICES,
      ],
      '搬家后必须在 10 天内更新 license、permit、non-driver ID 和 vehicle records': [
        NY_ADDRESS,
      ],
      'USPS 地址变更不会更新 DMV 记录': [NY_ADDRESS],
      '驾照可在到期前 1 年至到期后 2 年续期': [NY_RENEW],
      '已有 REAL ID 或 Enhanced，或保持 Standard 时可线上或邮寄续期，证件类型不变，Standard 升级要到办公室': [
        NY_RENEW,
        NY_REAL_ID,
      ],
      '常见 Class D 续期费为 $64.50，MCTD 地区为 $80.50': [NY_RENEW],
      'REAL ID 不额外收费，Enhanced 另加 $30': [NY_REAL_ID, NY_RENEW],
      'replacement driver license 或 permit 为 $17.50，amend 信息变更为 $12.50': [
        NY_FEES,
      ],
      '首次 license 或 permit 费用按年龄和居住地区计算': [NY_FEES],
      '线上补证只能保留原证件类型，且寄往下单时 DMV 记录地址': [
        NY_REPLACE,
      ],
      '搬家应先改地址，线上补证不能使用临时邮寄地址': [
        NY_REPLACE,
        NY_ADDRESS,
      ],
      'Class D permit test 提供 20 种语言，包括 Chinese': [NY_PERMIT_TEST],
      '线上 permit test 选项目前仅面向未满 18 岁申请人，在线通过后应至少留出 3 个工作日供 DMV 审核': [
        NY_PERMIT_TEST,
      ],
      '未满 18 岁的申请人从取得 learner permit 起至少等 6 个月才能预约 road test': [
        NY_ROAD_TEST,
      ],
      '路考前还需完成 5-hour pre-licensing course 或符合条件的 driver education course': [
        NY_ROAD_TEST,
      ],
      '持有效外国驾照可在成为纽约州居民前驾驶': [NY_FOREIGN],
      '申请纽约驾照需通过 written test、5-hour course 和 road test，路考通过时会交出 foreign license': [
        NY_FOREIGN,
      ],
      '外国驾照不是英文时，参加 road test 要带 International Driving Permit 或由领事馆、美国国务院或其他政府机构认证的翻译': [
        NY_FOREIGN,
      ],
      'NY DMV 提供免费语言协助，中文属于重要表格和文件覆盖的 12 种主要语言之一': [
        NY_LANGUAGE,
      ],
      '官方电话为 1-518-486-9786': [NY_LANGUAGE],
      '成为纽约居民后，应在 30 天内把美国其他州或领地、联邦特区或加拿大省份的合格驾照换成纽约驾照': [
        NY_OUT_OF_STATE,
      ],
      '换证仅可到办公室办理': [NY_OUT_OF_STATE],
      '先用 NY DMV pre-screening 生成个人清单，再以当前 ID-44（2/26）复核接受的文件和分值': [
        NY_DOCUMENT_GUIDE,
        NY_ID44,
      ],
      'REAL ID 需要 Social Security 证明、citizenship 或 lawful status、两份纽约州居住证明，以及累计 6 points 的姓名证明': [
        NY_ID44,
      ],
      '材料须为原件或签发机构认证副本': [NY_ID44],
      '除官方特别说明外，过期文件不接受': [NY_ID44],
      '两份居住证明都必须显示当前纽约州地址，P.O. Box 不接受': [
        NY_ID44,
        NY_REAL_ID,
      ],
      '电子 statement 或 e-bill 要打印，且同一来源或同一类型只能使用一份': [
        NY_ID44,
      ],
      '用于 REAL ID 的 Social Security ineligibility letter 必须由 SSA 在办公室访问前 30 天内签发，并同时带向 SSA 出示过的 DHS 文件': [
        NY_ID44,
        NY_NO_SSN,
      ],
      '身份证明姓名与当前法定姓名不同时，需用原件或认证副本串起每一次姓名变化': [
        NY_ID44,
        NY_REAL_ID,
      ],
      '非英文文件必须附 certified English translation': [NY_ID44],
      '先按用途判断：Standard 可用于驾驶和普通照片 ID，但不满足 REAL ID 联邦用途': [
        NY_REAL_ID,
      ],
      'REAL ID 解决联邦身份用途': [NY_REAL_ID],
      'Enhanced 另含限定的陆路或海路边境返美用途': [NY_REAL_ID],
      '打开 NY DMV pre-screening，选择申请、升级或换证场景并生成个人材料清单': [
        NY_DOCUMENT_GUIDE,
        NY_REAL_ID,
      ],
      '按当前 ID-44 逐项核对 Social Security、citizenship 或 lawful status、两份 residency 和 6-point name proof': [
        NY_ID44,
      ],
      '逐份检查姓名链、当前地址、签发日期、原件或认证副本以及英文翻译': [
        NY_ID44,
      ],
      '按城市或 ZIP 查办公室，打开 View Details 确认该地点的服务和 reservation 规则': [
        NY_OFFICES,
      ],
      '到办公室提交文件并领取 temporary document': [NY_REAL_ID],
      '官方提示新 REAL ID 或 Enhanced 通常约 2 周寄到': [NY_REAL_ID],
      '把 Enhanced 与 REAL ID 当作同一证件，或误以为 Enhanced 可替代加拿大、墨西哥和部分加勒比地区之间的航空旅行证件': [
        NY_REAL_ID,
      ],
      '只带一份居住证明，或用 P.O. Box、同一金融机构的 bank statement 与 credit card statement 凑两份': [
        NY_ID44,
        NY_REAL_ID,
      ],
      '姓名改过多次却只带最后一次改名文件': [NY_ID44, NY_REAL_ID],
      '认为网上 pre-screening 或上传审核完成后就不用到办公室提交文件': [
        NY_REAL_ID,
      ],
      '到办公室才发现非英文材料没有 certified English translation，或原件已经过期': [
        NY_ID44,
      ],
    },
  },
  texas: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      TX_REAL_ID,
      TX_ONLINE_ELIGIBILITY,
      TX_RESIDENCY,
      TX_DOCUMENT_CHECK,
      TX_APPLY,
      TX_MOVING,
      TX_RECIPROCITY,
      TX_TESTING,
      TX_ADDRESS,
      TX_FEES,
      TX_TEMPORARY_VISITORS,
      TX_TEMPORARY_LICENSE,
      TX_IDENTIFICATION_CARD,
      TX_FAQ,
      TX_LAWFUL_PRESENCE,
      TX_SSN,
      TX_CDL_TESTING,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Texas.gov、Texas DPS 和 TSA 的 REAL ID、线上资格、居住证明、个人化清单、首次申请、预约、费用、地址、身份核验、考试、临时证件、外国驾照与新居民正文。',
    notes:
      '重写 Texas 总览与 REAL ID 清单，纠正简版公民材料清单和车辆登记证明的适用范围，更新 2026 年 CDL 语言规则，并为费用、期限、身份和材料声明建立显式来源；仍待真实人工签字。',
    claims: {
      'Texas DPS 管理德州驾照和身份证': [TX_FAQ],
      '首次申请和外州换证必须到 driver license office': [TX_FAQ],
      '续期、补证、升级和改地址应先让官方系统判断线上资格': [
        TX_ONLINE_ELIGIBILITY,
      ],
      '首次申请德州驾照前，先用 DPS REAL ID Document Check 生成个人材料清单': [
        TX_DOCUMENT_CHECK,
        TX_APPLY,
      ],
      '申请人通常还要完成视力、knowledge 和 driving skills 测试，符合外州换证或互惠条件者可能免试': [
        TX_APPLY,
        TX_MOVING,
      ],
      '德州 REAL ID 合规驾照或 ID 的右上角有星标': [TX_REAL_ID],
      '当前有效但没有星标的德州证件仍可用于驾驶和非联邦身份用途': [
        TX_REAL_ID,
      ],
      '自 2025 年 5 月 7 日起，乘坐美国国内航班须使用带星标证件、有效护照、美国军人证或其他 TSA 接受证件': [
        TX_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'DPS 的现场驾照和 ID 服务以预约为主，部分办公室仅提供数量有限的 walk-in appointment': [
        TX_FAQ,
      ],
      '可在最多提前 180 天预约后前往任一 driver license office': [TX_FAQ],
      '续期、补证或改地址先检查线上资格': [TX_ONLINE_ELIGIBILITY],
      '多数 Texas driver license 和 ID 可在到期前两年至到期后两年内续期，但证件类型和个人状态可能改变办理方式': [
        TX_FAQ,
        TX_ONLINE_ELIGIBILITY,
      ],
      '79 岁及以上驾照持有人须现场续期，learner license 不能在线续期': [
        TX_ONLINE_ELIGIBILITY,
      ],
      '18 至 84 岁 Class A、B 或 C 驾照常见新办和续期费为 $33，replacement 为 $11': [
        TX_FEES,
      ],
      '59 岁及以下普通 ID 新办或续期费为 $16，60 岁及以上为 $6，replacement 为 $11': [
        TX_FEES,
      ],
      '地址变化后 30 天内要更新 driver license 或 ID，改地址和改姓名都按 replacement 办理并支付适用费用': [
        TX_ADDRESS,
        TX_FEES,
      ],
      'temporary driver license 自业务办理日起有效 60 天，正式驾照通常约 2 至 3 周邮寄到达': [
        TX_TEMPORARY_LICENSE,
        TX_APPLY,
      ],
      '符合要求的 temporary visitor 会收到标有 Limited Term 的驾照或 ID': [
        TX_TEMPORARY_VISITORS,
      ],
      '证件通常随 lawful presence 期限到期': [TX_TEMPORARY_VISITORS],
      '若身份期限为 duration of status，证件一年后到期': [
        TX_TEMPORARY_VISITORS,
      ],
      'DPS 会通过 DHS 核验 lawful presence，在核验完成前不能签发驾照或 ID': [
        TX_LAWFUL_PRESENCE,
      ],
      '需要额外核验时，申请人要按 DPS 指示继续处理': [TX_LAWFUL_PRESENCE],
      '非商业驾照 knowledge test 只提供 English 或 Spanish，翻译人员只能在考试前后协助，不能在考试过程中提供帮助': [
        TX_TESTING,
      ],
      '自 2026 年 6 月 1 日起，Texas CDL 和 CLP knowledge exams 只用 English，考试中禁止 interpreter': [
        TX_CDL_TESTING,
        TX_TESTING,
      ],
      '新居民持有效、未过期的美国其他州或领地、加拿大省份或符合条件国家驾照，可在搬到 Texas 后最多驾驶 90 天': [
        TX_MOVING,
      ],
      '交出有效的美国其他州、领地或加拿大驾照时，通常免 knowledge 和 skills exams': [
        TX_MOVING,
      ],
      'Texas 与 France、Germany、South Korea、United Arab Emirates 和 Taiwan 有驾照互惠': [
        TX_MOVING,
      ],
      '持有效未过期证件且交出外国驾照者可能免 knowledge 和 skills exams': [
        TX_MOVING,
      ],
      '外国驾照不是 English 或 Spanish 时，去办公室前要由翻译服务机构或领事馆完成翻译': [
        TX_MOVING,
      ],
      '持有效未过期外国驾照的非居民驾驶期限最多为一年或到成为 Texas resident 为止，以较早者为准': [
        TX_RECIPROCITY,
      ],
      '成为新居民后须在 90 天内申请 Texas license': [
        TX_RECIPROCITY,
        TX_MOVING,
      ],
      '先用 DPS REAL ID Document Check 回答申请类型、身份和现有材料问题，生成个人化清单': [
        TX_DOCUMENT_CHECK,
      ],
      '准备 citizenship 或 lawful presence、identity 和 Social Security number 对应文件': [
        TX_APPLY,
        TX_IDENTIFICATION_CARD,
      ],
      'DPS 会与联邦系统核验 SSN 和 lawful presence': [
        TX_SSN,
        TX_LAWFUL_PRESENCE,
      ],
      '准备两份打印的 Texas residency 文件，两份都要显示申请人姓名和 residential address': [
        TX_RESIDENCY,
      ],
      '通常至少一份要证明已在 Texas 居住 30 天': [TX_RESIDENCY],
      '交出有效未过期外州证件者和 CDL 申请人免除 30 天要求，但仍要交两份居住证明': [
        TX_RESIDENCY,
      ],
      '符合清单的电子 statement 可以打印提交': [TX_RESIDENCY],
      '同一来源仅在地方政府或提供多项住宅服务的机构分别出具不同服务账单时可算两份': [
        TX_RESIDENCY,
      ],
      '同一服务不同月份不能凑两份': [TX_RESIDENCY],
      '驾照申请中的 Texas vehicle registration 证明只适用于交出外州驾照的新居民': [
        TX_APPLY,
      ],
      '申请人还要提供本人拥有的每辆车的保险证明，或签署不拥有车辆的声明': [
        TX_APPLY,
      ],
      '身份文件与当前姓名不一致时，准备能够连接每次变更的法定姓名文件': [
        TX_DOCUMENT_CHECK,
        TX_ADDRESS,
      ],
      '非美国公民要按本人身份提供 lawful presence 文件，DPS 在 DHS 核验完成前不能签发证件': [
        TX_LAWFUL_PRESENCE,
      ],
      '符合 temporary visitor 定义者会收到标有 Limited Term 的证件': [
        TX_TEMPORARY_VISITORS,
      ],
      '先看现有证件右上角是否有星标，再判断是否需要用州证件乘坐国内航班或进入受管制联邦设施': [
        TX_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '已有 Texas DL 或 ID 的续期、补证、升级或改地址，先运行 online eligibility': [
        TX_ONLINE_ELIGIBILITY,
      ],
      '首次申请和外州换证直接准备现场路径': [TX_FAQ],
      '运行 REAL ID Document Check，并按结果准备原件、认证副本、打印的 residency 文件和完整姓名链': [
        TX_DOCUMENT_CHECK,
        TX_REAL_ID,
        TX_RESIDENCY,
        TX_ADDRESS,
      ],
      '需要现场办理时，用 Texas Scheduler 选择准确服务和办公室': [TX_FAQ],
      '首次申请或外州换证必须亲自办理': [TX_FAQ],
      '现场核对申请、材料、照片、指纹、费用和适用考试': [TX_APPLY],
      '常见 18 至 84 岁 Class A、B 或 C 新办或续期费为 $33，replacement 为 $11': [
        TX_FEES,
      ],
      '最终以当前 fee table 和个人业务为准': [TX_FEES],
      '领取 temporary driver license 后当场核对信息': [TX_APPLY],
      '临时驾照有效 60 天，正式卡通常约 2 至 3 周邮寄到达': [
        TX_TEMPORARY_LICENSE,
        TX_APPLY,
      ],
      '搬家后 30 天内更新驾照或 ID 地址': [TX_ADDRESS],
      '地址或姓名变更属于 replacement，并要支付适用费用': [
        TX_ADDRESS,
        TX_FEES,
      ],
      '把 Texas.gov 的简版公民材料示例当成所有申请人的通用清单，或没有运行 DPS REAL ID Document Check': [
        TX_REAL_ID,
        TX_DOCUMENT_CHECK,
        TX_LAWFUL_PRESENCE,
      ],
      '只带一份 residency 文件，或两份文件没有同时显示本人姓名和 Texas residential address': [
        TX_RESIDENCY,
      ],
      '用同一项服务不同月份的账单凑两份居住证明': [TX_RESIDENCY],
      '误以为所有续期、补证和改地址都能在线办理': [
        TX_ONLINE_ELIGIBILITY,
      ],
      'DPS 会按年龄、证件类型和状态、上次续期方式、SSN、身份核验、欠票或 warrant 等条件决定资格': [
        TX_ONLINE_ELIGIBILITY,
        TX_FAQ,
      ],
      '79 岁及以上驾照持有人须现场续期': [TX_ONLINE_ELIGIBILITY],
      '未预约就直接前往办公室，或没有确认所选服务和 appointment': [TX_FAQ],
      '只带最后一次改名文件，没有把出生姓名到当前法定姓名完整连接起来': [
        TX_DOCUMENT_CHECK,
        TX_ADDRESS,
      ],
      '默认普通 knowledge test 有中文版本': [TX_TESTING],
      '非商业驾照知识考试只提供 English 或 Spanish，翻译人员不能在考试过程中协助': [
        TX_TESTING,
      ],
    },
  },
  florida: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      FL_WHAT_TO_BRING,
      FL_DRIVER_LICENSES,
      FL_US_CITIZEN,
      FL_NON_IMMIGRANT,
      FL_RENEW_REPLACE,
      FL_CLASS_E,
      FL_DRIVER_EXAMS,
      FL_ENGLISH_ONLY,
      FL_FEES,
      FL_LOCATIONS,
      FL_MYDMV,
      FL_NEW_RESIDENT,
      FL_VISITING,
      FL_WHAT_TO_BRING_FAQ,
      FL_NAME_ADDRESS,
      FL_NEW_CREDENTIAL_FAQ,
    ],
    scope:
      '逐条打开并比对 FLHSMV 的 REAL ID、身份分支、居住证明、续期补证、MyDMV、费用、地址姓名、预约、考试、新居民、外国访客和外州换证正文。',
    notes:
      '重写 Florida 总览与 REAL ID 清单，补充 80 岁以上有效期、地址证明替代路径和外州证件边界，并用 2026 年 English-only 公告纠正旧考试页仍显示的历史语言列表；仍待真实人工签字。',
    claims: {
      '佛州驾照和 ID 由 FLHSMV 与各县 driver license service center 或 tax collector office 办理': [
        FL_DRIVER_LICENSES,
        FL_LOCATIONS,
      ],
      '首次 Florida 证件要走现场路径': [
        FL_RENEW_REPLACE,
        FL_NEW_RESIDENT,
      ],
      '续期、补证和改地址可先让 MyDMV Portal 判断线上资格': [
        FL_RENEW_REPLACE,
        FL_MYDMV,
      ],
      '公民和 immigrant 的 Class E 驾照在 80 岁以下通常有效 8 年，80 岁及以上通常有效 6 年': [
        FL_WHAT_TO_BRING_FAQ,
      ],
      '驾照最多提前 18 个月续期，ID 最多提前 12 个月': [FL_RENEW_REPLACE],
      '非移民证件期限按 USCIS 批准时间处理': [
        FL_WHAT_TO_BRING_FAQ,
        FL_NON_IMMIGRANT,
      ],
      'Florida 在 2010 年 1 月 1 日后开始签发 REAL ID-compliant 证件，右上角金色星标表示合规': [
        FL_DRIVER_LICENSES,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '证件没有星标时要到 driver license service center 或 tax collector office 完成 REAL ID 文件核验': [
        FL_RENEW_REPLACE,
        FL_NEW_CREDENTIAL_FAQ,
      ],
      '已经合规的证件通常可等到期或必须变更姓名、地址等信息时再换': [
        FL_NEW_CREDENTIAL_FAQ,
        FL_RENEW_REPLACE,
      ],
      'Florida 的预约和付款方式按县及地点变化，many offices require appointments': [
        FL_LOCATIONS,
      ],
      '先在 FLHSMV Locations 选择县，再进入该 tax collector 或 office 的网站确认服务、预约和附加费用': [
        FL_LOCATIONS,
        FL_FEES,
      ],
      'Florida online convenience renewal 通常只能隔一个 renewal period 使用一次，最终资格由 MyDMV Portal 判断': [
        FL_RENEW_REPLACE,
      ],
      'MyDMV Portal 完成交易后，证件通常在 2 至 3 周内邮寄，并在交易总额中加收 $2 processing fee': [
        FL_RENEW_REPLACE,
      ],
      '上次已在线续期、证件不符合 REAL ID、需要换照片或改名、首次办 Florida 证件、持 CDL 或证件印有 TEMPORARY 时，必须到办公室办理': [
        FL_RENEW_REPLACE,
      ],
      'Class E 驾照续期费为 $48，driver license replacement 和普通 ID 原办、续期或 replacement 通常为 $25': [
        FL_FEES,
        FL_WHAT_TO_BRING_FAQ,
      ],
      'tax collector office 还可能收 $6.25 service fee': [FL_FEES],
      '姓名或地址变化后 30 天内要同时更新 driver license 或 ID 以及 title 和 registration': [
        FL_NAME_ADDRESS,
      ],
      '改名要先更新 Social Security Administration 记录，并在等待 24 至 48 小时后再到 Florida 办证机构办理': [
        FL_NAME_ADDRESS,
        FL_US_CITIZEN,
      ],
      '自 2026 年 2 月 6 日起，所有 Florida driver license knowledge 和 skills exams 只用 English，考试中不再允许 language translation services': [
        FL_ENGLISH_ONLY,
      ],
      'FLHSMV 的旧 Class E 考试页仍显示历史语言列表': [FL_CLASS_E],
      '当前考试语言应以 2026 年 English-only 公告为准': [FL_ENGLISH_ONLY],
      'Class E Knowledge Exam 有 50 道选择题，答对 40 题或达到 80% 才通过': [
        FL_CLASS_E,
      ],
      '外国访客在 Florida 驾驶时，要随身携带居住国签发给本人的有效 driver license': [
        FL_VISITING,
      ],
      '成为 Florida resident 后须在 30 天内取得 Florida driver license': [
        FL_NEW_RESIDENT,
        FL_VISITING,
      ],
      '自有车辆通常还要在建立 residency 后 10 天内取得 Florida insurance 并办理 title 和 registration': [
        FL_NEW_RESIDENT,
      ],
      '有效 out-of-state driver license 可免 written 和 driving exams，但不能当作 primary identification，且申请人仍要做 vision test': [
        FL_WHAT_TO_BRING_FAQ,
      ],
      '新居民材料暂时不全时，如果 out-of-state license 仍有效或过期不超过 60 天，可能获得 60-day temporary permit': [
        FL_VISITING,
      ],
      '新居民的 driver license 或 ID 申请必须到提供 driver license services 的当地办公室现场办理': [
        FL_NEW_RESIDENT,
      ],
      '先进入 What to Bring，按 U.S. Citizen、Immigrant、Non-Immigrant 或 Canadian 选择身份分支': [
        FL_WHAT_TO_BRING,
      ],
      '现场 REAL ID 通常要一份可接受的 primary identification、SSN 证明和两份 Florida residential address 文件': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      'primary identification 要用官方列出的原件或认证文件，out-of-state driver license 不能替代这组身份证明': [
        FL_US_CITIZEN,
        FL_WHAT_TO_BRING_FAQ,
      ],
      'SSN 记录上的姓名要与 Florida 证件姓名一致': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      '改名时先更新 SSA，等待 24 至 48 小时，并用原件或认证文件连接出生姓名到当前姓名': [
        FL_NAME_ADDRESS,
        FL_US_CITIZEN,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '两份地址文件必须不同并显示 Florida residential address，当前 driver license 或 ID 不能用作地址证明': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      '符合清单的 printout 或 fax 可以提交，utility、bank、insurance、pay stub 和部分政府文件通常要在 60 天内': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      '地址文件不在本人名下时，可由同住人提交 Certification of Address 和两份配套地址证明': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      '同住人要到场，或在 notary 面前签署表格': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      'Non-Immigrant 身份文件通常要在签发日后仍有 30 天以上有效期': [
        FL_NON_IMMIGRANT,
      ],
      '首次申请 driver license 时会先取得无照片的 60-day temporary paper permit': [
        FL_NON_IMMIGRANT,
      ],
      '身份和 lawful status 核验通过后，正式证件在 60 天内邮寄': [
        FL_NON_IMMIGRANT,
      ],
      '先确认本次是首次申请、外州换证、续期、补证、改名还是改地址，并查看现有证件右上角是否有星标': [
        FL_RENEW_REPLACE,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '已有 Florida 证件且只需续期、补证或改地址时，先进入 MyDMV Portal 检查线上资格': [
        FL_RENEW_REPLACE,
        FL_MYDMV,
      ],
      '打开 What to Bring 的正确身份分支，逐项准备 primary identification、SSN、两份地址文件和完整姓名链': [
        FL_WHAT_TO_BRING,
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '需要现场办理时，在 Locations 选择县并打开具体 office 或 tax collector 网站，确认 appointment 和 service fee': [
        FL_LOCATIONS,
        FL_FEES,
      ],
      '到场提交原件或认证文件并完成照片、适用测试和付款': [
        FL_WHAT_TO_BRING,
        FL_DRIVER_EXAMS,
        FL_FEES,
      ],
      '常见 Class E 续期费为 $48，replacement 为 $25': [
        FL_FEES,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '最终金额以 fee table 和承办地点为准': [FL_FEES, FL_LOCATIONS],
      '新居民应在建立 residency 后 30 天内取得 Florida license': [
        FL_NEW_RESIDENT,
      ],
      '材料暂缺且外州驾照符合条件时，现场询问 60-day temporary permit': [
        FL_VISITING,
      ],
      '把 MyDMV Portal 能打开误解为本人一定有线上资格': [
        FL_RENEW_REPLACE,
      ],
      '上次已经用过 online convenience renewal，这次仍按线上续期准备': [
        FL_RENEW_REPLACE,
      ],
      '把有效 out-of-state license 当作 primary identification': [
        FL_WHAT_TO_BRING_FAQ,
      ],
      '它可能帮助免除考试，但不能替代身份原件': [
        FL_WHAT_TO_BRING_FAQ,
        FL_US_CITIZEN,
      ],
      '只带一份地址证明，或用当前 Florida driver license / ID 充当地址证明': [
        FL_US_CITIZEN,
        FL_NON_IMMIGRANT,
      ],
      '改名后没有先更新 SSA，或只带最后一次改名文件，无法连接完整法定姓名链': [
        FL_NAME_ADDRESS,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '只带照片、手机扫描件或普通复印件，而不是身份分支要求的原件或认证文件': [
        FL_US_CITIZEN,
        FL_WHAT_TO_BRING_FAQ,
      ],
      '看到旧 Class E 页面仍列 Chinese 或 Spanish，就认为 2026 年 2 月 6 日后考试仍提供这些语言': [
        FL_CLASS_E,
        FL_ENGLISH_ONLY,
      ],
      '没有进入所选县或 tax collector office 的网站确认 appointment、服务范围和付款方式': [
        FL_LOCATIONS,
      ],
    },
  },
  washington: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      WA_REAL_ID,
      WA_EDL,
      WA_EDL_GUIDE,
      WA_GET_EDL,
      WA_EDL_CHECKLIST,
      WA_PREAPPLY,
      WA_DRIVER_LICENSES,
      WA_IDENTITY,
      WA_RENEW,
      WA_FEES,
      WA_FIRST_LICENSE,
      WA_TRAINING,
      WA_TESTS,
      WA_MOVING,
      WA_NEW_RESIDENT_LICENSE,
      WA_DRIVER_GUIDES,
      WA_APPOINTMENTS,
      WA_OFFICES,
      WA_ADDRESS,
    ],
    scope:
      '逐条打开并比对 Washington DOL 的 REAL ID、EDL/EID、enhanced 材料清单、standard 身份文件、预申请、办公室、费用、续期、地址、考试语言、互惠驾照、新居民和临时证件正文。',
    notes:
      '重写 Washington 总览与 REAL ID 页面，删除已过时的 403 访问警告，分开 standard 与 EDL/EID 路径，并将资格、材料、费用、期限、考试和出行边界改为显式来源；仍待真实人工签字。',
    claims: {
      '华盛顿州同时签发 standard driver license / ID 和 Enhanced Driver License / ID（EDL/EID）': [
        WA_REAL_ID,
        WA_DRIVER_LICENSES,
      ],
      '普通驾照仍可驾驶，普通驾照或 ID 仍可作州内身份证明': [
        WA_REAL_ID,
      ],
      'EDL/EID 才是华盛顿州符合 REAL ID 的州证件': [
        WA_REAL_ID,
        WA_EDL_GUIDE,
      ],
      'Standard Washington driver license / ID 不表示持有人具备特定居住或合法身份状态': [
        WA_REAL_ID,
      ],
      '非美国公民可以按 standard 证件规则准备身份材料，但不能申请只向美国公民签发的 EDL/EID': [
        WA_REAL_ID,
        WA_IDENTITY,
        WA_EDL_GUIDE,
      ],
      '外国驾照、外州驾照和首次申领的考试要求不同，应先在 DOL 的 Do I need to take a test 表中匹配自己的情况': [
        WA_TESTS,
      ],
      '华盛顿州 EDL/EID 用美国国旗而不是星标表示 REAL ID 合规': [
        WA_REAL_ID,
      ],
      '自 2025 年 5 月 7 日起，standard Washington driver license / ID 不能作为国内航班安检证件': [
        WA_REAL_ID,
      ],
      '有效护照、绿卡等 TSA 接受证件仍可替代 EDL/EID': [
        WA_REAL_ID,
      ],
      '驾照与 ID 要去 driver licensing office，车辆 title / registration 要去 vehicle licensing office，knowledge / drive test 通常由 testing location 办理': [
        WA_NEW_RESIDENT_LICENSE,
        WA_TRAINING,
        WA_OFFICES,
      ],
      'EDL 页面写明预约优先但可接待 walk-in，新居民换证页则要求预约': [
        WA_GET_EDL,
        WA_NEW_RESIDENT_LICENSE,
      ],
      'EDL 申请最晚在办公室关门前 60 分钟受理，仍应按具体业务页面和地点确认预约': [
        WA_GET_EDL,
        WA_OFFICES,
      ],
      '首次申请 standard Washington driver license 的当前基础总费用为 6 年 $111 或 8 年 $131': [
        WA_FEES,
      ],
      'standard license 续期为 6 年 $61 或 8 年 $81': [
        WA_RENEW,
        WA_FEES,
      ],
      '首次同时申领 EDL 的当前总费用为 6 年 $153 或 8 年 $187': [
        WA_GET_EDL,
        WA_FEES,
      ],
      '把现有 WA driver license 升级为 EDL，按剩余期限收取 $7 至 $56': [
        WA_GET_EDL,
        WA_FEES,
      ],
      'Standard license 可提前 1 年续期，并可在过期后最多 8 年内续期': [
        WA_RENEW,
      ],
      '过期超过 60 天加收 $10，达到 8 年则不能续期而要重新开始申请': [
        WA_RENEW,
        WA_FEES,
      ],
      '70 岁及以上、需要 vision screening、需要新照片或上次已在线续期的人，必须到 driver licensing office 续期': [
        WA_RENEW,
      ],
      '搬家后 10 天内要更新 driver license / ID 地址': [WA_ADDRESS],
      '更新驾驶记录免费，立即领取显示新地址的新卡为 $20，vehicle registration 地址还要另外更新': [
        WA_ADDRESS,
        WA_FEES,
      ],
      'Standard 证件的身份规则允许按一份 stand-alone、两份 A-list、一份 A-list 加两份 B-list、或四份 B-list 组合证明身份': [
        WA_IDENTITY,
      ],
      'Standard 证件不接受复印、扫描或拍照文件': [WA_IDENTITY],
      '申请驾照者必须提供 SSN，没有 SSN 时可签署声明': [
        WA_IDENTITY,
      ],
      '普通 knowledge test 共 40 题，答对 32 题通过，合格成绩有效 2 年': [
        WA_TESTS,
      ],
      '考试有 12 种语言，包括简体中文和繁体中文，但要先向 testing location 确认所需语言是否提供': [
        WA_TESTS,
      ],
      '18 岁以上持有效美国其他州证件、British Columbia Class 5、德国或韩国驾照者通常免 knowledge 和 drive test': [
        WA_TESTS,
      ],
      '台湾或日本驾照路径需要联系指定办事处取得 translated certification': [
        WA_TESTS,
      ],
      '未列入 DOL 互惠表的外国或加拿大省份驾照要走首次申领步骤': [
        WA_TESTS,
      ],
      '仅来访者可持本国有效驾照在 Washington 驾驶最多 1 年': [
        WA_TESTS,
      ],
      '成为 Washington 新居民后 30 天内要取得 WA driver license，并且要先取得 WA license 才能登记车辆': [
        WA_MOVING,
        WA_NEW_RESIDENT_LICENSE,
      ],
      '新居民办证时带外州驾照等身份证明并完成适用测试': [
        WA_NEW_RESIDENT_LICENSE,
        WA_TESTS,
      ],
      'DOL 会打孔后退还外州证件，签发可驾驶 45 天的临时驾照，正式卡通常 7 至 10 天寄出': [
        WA_NEW_RESIDENT_LICENSE,
      ],
      'EDL/EID 仅向美国公民签发，申请时要证明美国公民身份、本人身份和 Washington residency，并提供 SSN': [
        WA_REAL_ID,
        WA_EDL_CHECKLIST,
      ],
      'EDL/EID 官方清单把美国公民身份证明和本人身份证明列为两个核对类别': [
        WA_EDL_CHECKLIST,
      ],
      '具体选哪些文件以 enhanced document tool 生成的个人清单为准': [
        WA_GET_EDL,
        WA_PREAPPLY,
      ],
      'EDL/EID 文件通常必须是未改动的认证原件、认证修订原件或签发机构认证的 true copy，只有清单明确注明时才接受 printout': [
        WA_EDL_CHECKLIST,
      ],
      '准备两份均显示本人 first and last name 与当前 WA residential address 的居住文件，P.O. Box 不能代替 residential address': [
        WA_EDL_CHECKLIST,
      ],
      '公民身份和身份证明上的姓名不一致时，要带足够的认证 marriage certificate、divorce decree、court order 或其他清单文件，把姓名变化完整连接起来': [
        WA_EDL_CHECKLIST,
      ],
      '申请人必须提供 SSN，但官方 EDL/EID 清单说明无需出示 Social Security card': [
        WA_EDL_CHECKLIST,
        WA_GET_EDL,
      ],
      'DOL 提供 enhanced document tool，以及简体中文和繁体中文 printable checklist': [
        WA_GET_EDL,
      ],
      '最终材料组合以个人化工具和申请时要求为准': [
        WA_GET_EDL,
        WA_PREAPPLY,
      ],
      'Temporary EDL 会在离开办公室前签发，但不能用于边境通行': [
        WA_GET_EDL,
      ],
      '正式 EDL 应按约 2 至 3 周预留邮寄时间': [
        WA_GET_EDL,
        WA_EDL_GUIDE,
      ],
      'EDL/EID 可用于国内航班，也可用于从加拿大、墨西哥、百慕大和加勒比经陆路或海路重新入境美国，但不能用于国际航空旅行': [
        WA_REAL_ID,
        WA_EDL_GUIDE,
      ],
      '先按用途判断是否需要 EDL/EID：只有驾驶或州内身份证明可选 standard，国内航班可先检查自己是否已有有效护照、绿卡或其他 TSA 接受证件': [
        WA_REAL_ID,
      ],
      '确认美国公民资格': [WA_REAL_ID, WA_EDL_CHECKLIST],
      '不符合 EDL/EID 资格者应选择 standard license / ID，并另用 TSA 接受证件处理联邦用途': [
        WA_REAL_ID,
        WA_IDENTITY,
      ],
      '没有 WDL number 时先在 License Express pre-apply，保存以 WDL 开头的号码，用于预约和后续申请': [
        WA_PREAPPLY,
      ],
      '运行 enhanced document tool，并用官方 printable checklist 复核 citizenship、identity、SSN、两份 residency 和完整姓名链': [
        WA_GET_EDL,
        WA_EDL_CHECKLIST,
      ],
      '预约 driver licensing office': [WA_GET_EDL, WA_OFFICES],
      'DOL 对 EDL 写明预约优先但非强制，并要求最晚在关门前 60 分钟提交申请': [
        WA_GET_EDL,
      ],
      '现场接受 document review 和 in-person interview，拍照并支付对应费用': [
        WA_GET_EDL,
        WA_FEES,
      ],
      '首次同时申领 EDL 当前为 6 年 $153 或 8 年 $187': [
        WA_GET_EDL,
        WA_FEES,
      ],
      '领取 temporary EDL 后当场核对信息，但不要把它用于边境通行': [
        WA_GET_EDL,
      ],
      '正式卡按约 2 至 3 周预留': [WA_GET_EDL, WA_EDL_GUIDE],
      '只找星标而误以为 WA EDL/EID 不合规': [WA_REAL_ID],
      '华盛顿州使用美国国旗标记': [WA_REAL_ID],
      '非美国公民按 EDL/EID 清单准备': [WA_REAL_ID, WA_EDL_GUIDE],
      '绿卡或工作签证不能满足 EDL/EID 的美国公民资格': [
        WA_EDL_GUIDE,
      ],
      '把 standard license 的身份文件组合套用到 EDL/EID，或把 EDL/EID 公民材料要求套到 standard license': [
        WA_IDENTITY,
        WA_EDL_CHECKLIST,
      ],
      '提交照片、普通复印件或未认证副本，而清单没有明确允许该格式': [
        WA_EDL_CHECKLIST,
      ],
      '只带一份地址文件，文件没有 first and last name，或只显示 P.O. Box': [
        WA_EDL_CHECKLIST,
      ],
      '身份和公民文件姓名不一致，却没有带齐连接每次姓名变化的认证文件': [
        WA_EDL_CHECKLIST,
      ],
      '把 vehicle licensing office 当成 driver licensing office，或临近关门才到场而错过 EDL 的 60 分钟受理截止时间': [
        WA_GET_EDL,
        WA_NEW_RESIDENT_LICENSE,
        WA_OFFICES,
      ],
      '把 temporary EDL 用于边境通行，或把正式 EDL 当作国际航班旅行证件': [
        WA_GET_EDL,
        WA_EDL_GUIDE,
      ],
    },
  },
  'new-jersey': {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      NJ_REAL_ID,
      NJ_REAL_ID_FAQ,
      NJ_SELECTOR,
      NJ_NAME_MATCHES,
      NJ_SIX_POINTS,
      NJ_AFFIDAVIT,
      NJ_ONLINE,
      NJ_RENEW,
      NJ_DUPLICATE,
      NJ_ADDRESS,
      NJ_ADDRESS_DETAILS,
      NJ_MOVING,
      NJ_APPOINTMENT,
      NJ_FIRST_LICENSE,
      NJ_KNOWLEDGE,
      NJ_MANUALS,
      NJ_ROAD_TEST,
    ],
    scope:
      '逐条打开并比对 NJMVC 的 REAL ID、2 + 1 + 6 selector、姓名匹配、Standard 6 Points、线上服务、续期补证、地址、预约、首次驾照、考试语言、路考、新居民和外国驾照互惠正文。',
    notes:
      '重写 New Jersey 总览与 REAL ID 页面，分开 Standard 与 REAL ID 的 point 和 residency 规则，补充当前 GDL 练车要求、预约类别、邮寄、地址及台湾/韩国互惠边界，并将所有高风险声明改为显式来源；仍待真实人工签字。',
    claims: {
      '新泽西同时签发 Standard driver license / non-driver ID 和带右上角星标的 REAL ID': [
        NJ_REAL_ID,
        NJ_REAL_ID_FAQ,
      ],
      'Standard driver license 仍可驾驶，Standard license / ID 也可作一般身份证明': [
        NJ_REAL_ID,
        NJ_REAL_ID_FAQ,
      ],
      '国内航班安检和部分联邦设施则要使用 REAL ID 或其他联邦接受证件': [
        NJ_REAL_ID,
        NJ_REAL_ID_FAQ,
      ],
      'Standard license / ID 通常要 6 Points of ID、一份 New Jersey residential address 证明，以及 SSN、ITIN 或无资格号码 affidavit': [
        NJ_SIX_POINTS,
        NJ_AFFIDAVIT,
      ],
      '非英文文件要附 certified translation': [NJ_SIX_POINTS],
      '搬入新泽西后要在 60 天内或现有 license / registration 到期前完成转入，以较早者为准': [
        NJ_MOVING,
      ],
      '新泽西 REAL ID 不是强制办理': [NJ_REAL_ID, NJ_REAL_ID_FAQ],
      '已有有效护照或其他联邦检查点接受证件的人可以继续使用 Standard 证件': [
        NJ_REAL_ID,
        NJ_REAL_ID_FAQ,
      ],
      '需要用州证件乘坐国内航班的人，再按 2 份地址证明 + 1 个可核验完整 SSN + 6 个 REAL ID identity points 准备': [
        NJ_REAL_ID_FAQ,
        NJ_SELECTOR,
      ],
      '首次 REAL ID 要在 Licensing Center 预约办理': [
        NJ_REAL_ID,
        NJ_REAL_ID_FAQ,
      ],
      '当前 Appointment Wizard 要求未来 3 个月内符合续期资格的人选择 Renewal: License or Non-Driver ID': [
        NJ_APPOINTMENT,
      ],
      '尚未进入续期窗口的人才选择 REAL ID': [NJ_APPOINTMENT],
      '外州或外国驾照转入则选择 Transfer From Out of State': [
        NJ_APPOINTMENT,
        NJ_MOVING,
      ],
      '首次 REAL ID 必须现场预约取得': [
        NJ_REAL_ID_FAQ,
        NJ_APPOINTMENT,
      ],
      '已经签发过 REAL ID 后，符合条件时才可在线或邮寄续期': [
        NJ_REAL_ID_FAQ,
        NJ_ONLINE,
      ],
      'NJMVC 当前列出的 Standard NJ license / ID 费用为 $24，REAL ID 为 $35': [
        NJ_REAL_ID_FAQ,
      ],
      'Same-Day Online Renewal 会立即续期并提供可打印收据，实体卡通常 2 至 4 周寄到': [
        NJ_RENEW,
      ],
      '即使 renewal form 写着到 agency，多数申请人仍可能符合 online renewal': [
        NJ_RENEW,
      ],
      'CDL 或 visa 即将到期者要到 Licensing Center 现场办理': [
        NJ_RENEW,
      ],
      '驾照过期超过 3 年不能直接续期，要按 first-time driver 重新开始': [
        NJ_RENEW,
        NJ_FIRST_LICENSE,
      ],
      '无论续期或补证是否在 agency 办理，NJMVC 都不再现场打印 license / ID，证件会邮寄': [
        NJ_RENEW,
        NJ_DUPLICATE,
      ],
      '搬家后一周内要向 MVC 报告地址变化': [NJ_ADDRESS_DETAILS],
      'online address change 会生成即时确认，显示新地址的 duplicate license 为 $11，duplicate registration 为 $5': [
        NJ_ADDRESS,
        NJ_ADDRESS_DETAILS,
      ],
      '首次驾照先预约购买 initial permit，并要在 permit 签发后 2 年内完成 knowledge、vision、practice、road test 和 probationary license 步骤': [
        NJ_FIRST_LICENSE,
      ],
      'Knowledge test 未通过可在 7 天后重考': [NJ_FIRST_LICENSE],
      '通过后 permit 才会验证并进入练车阶段': [NJ_FIRST_LICENSE],
      '21 岁以下通常要监督驾驶 6 个月并累计至少 50 小时，其中 10 小时在黑暗时段': [
        NJ_FIRST_LICENSE,
      ],
      '21 岁以上通常监督驾驶 3 个月': [
        NJ_FIRST_LICENSE,
        NJ_ROAD_TEST,
      ],
      'Road test 要在 knowledge 和 vision test 通过并完成适用练车期后预约': [
        NJ_FIRST_LICENSE,
        NJ_ROAD_TEST,
      ],
      '未通过至少等待 14 天才能重考': [NJ_ROAD_TEST],
      '普通 written knowledge test 提供 Chinese (Mandarin) 等 13 种语言': [
        NJ_KNOWLEDGE,
      ],
      '没有对应母语版本时，可在 permit appointment 请求 MVC 安排州合约 interpreter，通常等待 4 至 6 周': [
        NJ_KNOWLEDGE,
      ],
      '搬入新泽西的有效外州 non-provisional license 持有人通常免 knowledge 和 road tests，但 Hazmat endorsement 仍要 written test': [
        NJ_MOVING,
      ],
      '完成转入后要交回外州驾照': [NJ_MOVING],
      '外州 auto、motorcycle 或 CDL transfer permit 当前为 $10，auto license 加 motorcycle endorsement 另加 $5': [
        NJ_MOVING,
      ],
      '美国访客只有在 foreign license 同时配有居住国签发的 International Driving Permit 时，才可按 MVC 页面所述驾驶最多 1 年': [
        NJ_MOVING,
      ],
      '台湾和韩国与新泽西有 Class D 互惠路径，适用于 18 岁以上并满足驾照翻译、身份、NJ residency、SSN 和至少 12 个月 lawful presence 等文件条件的人': [
        NJ_MOVING,
      ],
      'REAL ID 使用 2 + 1 + 6：两份 NJ residential address 证明、一个可核验的完整 SSN、以及 primary / secondary 合计 6 个 REAL ID identity points': [
        NJ_REAL_ID_FAQ,
        NJ_SELECTOR,
      ],
      '地址证明可用官方清单列出的 electronic 或 paper 版本，但 identity 的 6 Points 要用 paper 或 hard copy': [
        NJ_SIX_POINTS,
        NJ_SELECTOR,
      ],
      '不同地址文件有 6 个月、1 年或 2 年等时效，必须按 Document Selector 对所选文件逐项核对': [
        NJ_SELECTOR,
      ],
      '完整 SSN 可以由 MVC 电子核验': [NJ_SELECTOR],
      '如果核验失败，要提交显示 full name 和完整 SSN 的 Social Security card、近期 W-2、pay stub 或 1099 等清单文件': [
        NJ_SELECTOR,
      ],
      'Primary 只能选择一份，secondary 中最多使用两份 1-point 文件，且 REAL ID point values 不等同于 Standard ID': [
        NJ_SELECTOR,
        NJ_REAL_ID_FAQ,
      ],
      'Identity 文件要是未覆膜原件或带州、市政印章的认证副本并使用英文': [
        NJ_SELECTOR,
      ],
      'Primary document 要显示 full legal name，secondary 文件不能与其冲突': [
        NJ_NAME_MATCHES,
      ],
      '现有 MVC、SSN 和 primary document 姓名不匹配时，可能需要认证婚姻、离婚或法院文件连接姓名': [
        NJ_NAME_MATCHES,
        NJ_SELECTOR,
      ],
      'Standard license / ID 与 REAL ID 不同：通常只要一份 residency，号码栏可用 SSN、ITIN 或 affidavit，身份 points 也要按 Standard 清单计算': [
        NJ_SIX_POINTS,
        NJ_AFFIDAVIT,
        NJ_REAL_ID_FAQ,
      ],
      '申请或续办 permit、driver license 或 non-driver ID 还要完成 BA-208 表': [
        NJ_SIX_POINTS,
      ],
      '先检查现有 NJ license / ID 右上角是否有星标，并判断是否已有有效护照或其他联邦接受证件': [
        NJ_REAL_ID,
        NJ_REAL_ID_FAQ,
      ],
      '需要 REAL ID 时运行 Document Selector，选齐两份 residency、一个 full SSN 路径和 6 个 REAL ID points，并打印最终清单': [
        NJ_SELECTOR,
      ],
      '打开 Name Matches 页面，逐项比较 primary、SSN、secondary 和 MVC 记录中的姓名，补齐适用的认证姓名变更文件': [
        NJ_NAME_MATCHES,
        NJ_SELECTOR,
      ],
      '地址变化时先在一周内完成 online address change并保存确认': [
        NJ_ADDRESS,
        NJ_ADDRESS_DETAILS,
      ],
      '需要显示新地址的实体卡时再订购 duplicate': [
        NJ_ADDRESS,
        NJ_ADDRESS_DETAILS,
      ],
      '按当前状态选择预约：续期窗口内选 Renewal，窗口外升级选 REAL ID，外州或外国驾照转入选 Transfer From Out of State': [
        NJ_APPOINTMENT,
        NJ_MOVING,
      ],
      '到 Licensing Center 带齐合规 identity hard copies、地址证明、SSN 路径、BA-208 和付款方式，完成拍照及文件核验': [
        NJ_SELECTOR,
        NJ_SIX_POINTS,
        NJ_RENEW,
      ],
      '首次 REAL ID 当前费用为 $35': [NJ_REAL_ID_FAQ],
      '现场不会打印正式卡，应按邮寄交付安排后续出行': [
        NJ_RENEW,
        NJ_DUPLICATE,
      ],
      '只凑够 6 points，却漏掉两份地址证明或一个可核验的完整 SSN': [
        NJ_REAL_ID_FAQ,
        NJ_SELECTOR,
      ],
      '沿用 Standard point values 计算 REAL ID，或选择超过一份 Primary、超过两份 1-point secondary': [
        NJ_REAL_ID_FAQ,
        NJ_SELECTOR,
      ],
      '把手机照片、扫描件或普通复印件当成 identity 文件，或者拿覆膜、缺少签发印章的文件': [
        NJ_SELECTOR,
      ],
      '把 NJ driver license 和 NJ vehicle registration 同时当作两份地址证明': [
        NJ_SELECTOR,
      ],
      'Document Selector 明确不允许两者组合使用': [NJ_SELECTOR],
      'primary、SSN 与 MVC 记录姓名冲突，却只带一张无法连接完整姓名变化的 marriage certificate': [
        NJ_NAME_MATCHES,
      ],
      '未来 3 个月内已符合续期资格，却选择普通 REAL ID appointment 而不是 Renewal appointment': [
        NJ_APPOINTMENT,
      ],
      '地址已经变化，却在续期前没有先完成 address change': [
        NJ_RENEW,
        NJ_ADDRESS,
      ],
      '外州搬入超过 60 天或等到现有证件先到期，仍未预约 Transfer From Out of State': [
        NJ_MOVING,
        NJ_APPOINTMENT,
      ],
    },
  },
  massachusetts: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      MA_ID_REQUIREMENTS,
      MA_REAL_ID,
      MA_REAL_ID_CHECKLIST,
      MA_WFMA_LAW,
      MA_DRIVER_MANUAL,
      MA_RENEW,
      MA_REPLACE,
      MA_ADDRESS,
      MA_PERMIT,
      MA_FIRST_DRIVER,
      MA_ROAD_TEST,
      MA_OUT_OF_STATE,
      MA_FOREIGN_TRANSFER,
      MA_FOREIGN_CONVERSION,
      MA_FOREIGN_DRIVING,
      MA_TRANSLATED,
      MA_FEES,
      MA_MYMASSGOV,
    ],
    scope:
      '逐条比对 Mass.gov 的 REAL ID、身份清单、WFMA 现行法、续期补证、地址、permit、road test、外州转入、外国驾照、Taiwan conversion、费用和 MyMassGov 正文。',
    notes:
      '重写 Massachusetts 总览与 REAL ID 页面，明确 Standard Class D/M 的 WFMA 边界，修正外国驾照记录期限，补充当前线上账户、邮寄、考试语言和台湾转换细节，并将所有声明改为显式来源；仍待真实人工签字。',
    claims: {
      '马萨诸塞州先分两条路：Standard Class D/M 驾照不作联邦身份证明，WFMA 允许无法提供 lawful presence 的州居民申请': [
        MA_WFMA_LAW,
        MA_DRIVER_MANUAL,
      ],
      '带星标的 REAL ID 可用于国内航班和部分联邦设施，但要走另一套身份材料和现场核验': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      'WFMA 只改变 Standard Class D/M 驾照或 learner’s permit 的身份要求，不覆盖 REAL ID、Standard Mass ID、CDL 或 Liquor ID': [
        MA_WFMA_LAW,
        MA_DRIVER_MANUAL,
      ],
      '无法提供 lawful presence 的申请人仍要证明身份、出生日期和 Massachusetts residency': [
        MA_WFMA_LAW,
      ],
      '非英文身份材料须附 certified English translation，并完成视力、permit exam 和 road test 等适用步骤': [
        MA_WFMA_LAW,
        MA_PERMIT,
        MA_ROAD_TEST,
      ],
      '18 岁以上旅客可用 REAL ID 或其他 TSA 接受证件完成国内航班安检，因此已有有效护照的人不一定要升级': [
        MA_REAL_ID,
        MA_ID_REQUIREMENTS,
      ],
      '申请马州 REAL ID 通常要准备 1 份 lawful presence、1 份完整 9 位 SSN 证明或合格的 SSA Denial Notice 路径、2 份 Massachusetts residency 证明': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID_CHECKLIST,
      ],
      '姓名与 lawful presence 文件不一致时，还要补完整的合法更名文件链': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      'REAL ID 可先在 myRMV 开始申请，但仍须预约 RMV Service Center 或会员 AAA branch 核验原件': [
        MA_REAL_ID,
      ],
      '外州驾照转入也只能先在线填表，最后必须预约到 RMV': [
        MA_OUT_OF_STATE,
      ],
      '多数个人 myRMV 服务现要求 MyMassGov Personal account，首次登录还可能要完成一次身份验证': [
        MA_MYMASSGOV,
      ],
      'WFMA 自 2023-07-01 起允许无法提供 lawful presence 的马州居民申请 Standard Class D/M 驾照，但仍须满足身份、出生日期、居住和考试要求': [
        MA_WFMA_LAW,
        MA_DRIVER_MANUAL,
      ],
      'WFMA 不适用于 REAL ID、Standard Mass ID、CDL 或 Liquor ID': [
        MA_DRIVER_MANUAL,
      ],
      '这些证件仍按各自清单核对 lawful presence': [
        MA_ID_REQUIREMENTS,
        MA_DRIVER_MANUAL,
      ],
      'Standard Class D/M 驾照和 REAL ID Class D/M 当前均为 $50，Standard / REAL Mass ID 为 $25': [
        MA_FEES,
      ],
      'learner permit 为 $30、road test 为 $35、replacement 为 $25': [
        MA_FEES,
      ],
      'Class D/M 驾照可在到期前 1 年内续期，也可在过期后 2 年内续': [
        MA_RENEW,
      ],
      '超过 2 年要重新参加 learner’s permit exam 和 road test': [
        MA_RENEW,
      ],
      '大多数 Standard 或 REAL ID 驾照可在线续期并在 10 至 14 个工作日寄到': [
        MA_RENEW,
      ],
      'limited-term 驾照续期和没有 SSN 的续期申请须现场办理': [
        MA_RENEW,
      ],
      '地址变化须在 30 天内通知 RMV': [MA_ADDRESS],
      '只改记录不必换卡，需要新地址实体卡时 replacement 费用为 $25': [
        MA_ADDRESS,
        MA_FEES,
      ],
      '遗失驾照最快可在线补办，也可电话申请': [MA_REPLACE],
      'RMV Service Center 当前不办理普通 replacement，AAA 会员可按页面预约，实体卡通常 10 至 14 天寄到': [
        MA_REPLACE,
      ],
      'Class D learner’s permit 最低申请年龄为 16 岁，未满 18 岁须有合格成年人书面同意': [
        MA_PERMIT,
      ],
      '考试 25 分钟 25 题，答对 18 题通过，permit fee 为 $30': [
        MA_PERMIT,
        MA_FEES,
      ],
      'Class D/M permit exam 提供 37 种语言，包括简体和繁体 Mandarin': [
        MA_PERMIT,
        MA_FIRST_DRIVER,
      ],
      '外语 oral exam 要事先联系 RMV Interpreter Services': [
        MA_PERMIT,
        MA_TRANSLATED,
      ],
      'Road test 可提前最多 60 天排期，费用为 $35': [
        MA_ROAD_TEST,
        MA_FEES,
      ],
      '通过后如未预付费用，要在 60 个日历日内付款并完成领证，否则须自费重考': [
        MA_ROAD_TEST,
      ],
      '有效或过期不足 1 年的外州驾照转入通常免 written 和 road test': [
        MA_OUT_OF_STATE,
      ],
      '过期超过 1 年要做 written、road 和 vision test，Class D 转入费为 $115': [
        MA_OUT_OF_STATE,
      ],
      '外国访客须年满 16 岁并随身携带有效原驾照': [
        MA_FOREIGN_DRIVING,
      ],
      '证件不是英文且没有英文翻译时，还要携带 IDP 或 RMV 接受的英文翻译，IDP 本身不授予驾驶资格': [
        MA_FOREIGN_DRIVING,
        MA_FOREIGN_TRANSFER,
      ],
      '外国驾照只有 Canada、Mexico、U.S. Territories、South Korea、Germany、France 和 Taiwan 等 RMV 列出的协议地区可走 conversion': [
        MA_FOREIGN_TRANSFER,
        MA_FOREIGN_CONVERSION,
      ],
      '其他来源地的马州居民要按首次申请路径参加 permit exam 和 road test': [
        MA_FOREIGN_TRANSFER,
      ],
      '转换材料必须按来源地核对，不能统一写成 30 天：Germany 和 France 等页面要求部分记录 30 天内，South Korea 和 Taiwan 的指定记录可为 60 天内': [
        MA_FOREIGN_CONVERSION,
      ],
      'Taiwan conversion 适用于年满 18 岁、持有效且未暂停或撤销的台湾驾照并居住马州的人': [
        MA_FOREIGN_CONVERSION,
      ],
      '要带身份与 SSN / Denial Notice 路径、台湾驾照及翻译、60 天内 certified driving record 及翻译、申请表和费用，并交回台湾驾照': [
        MA_FOREIGN_CONVERSION,
      ],
      '以 visa 证明身份的 Taiwan 或 South Korea conversion 申请人，官方页要求 authorized stay 至少 12 个月': [
        MA_FOREIGN_CONVERSION,
      ],
      '多数个人 myRMV 线上服务现用 MyMassGov Personal account': [
        MA_MYMASSGOV,
      ],
      '首次关联时要输入生日、姓氏、马州证件号以及 SSN 后四位、foreign passport number 或 Consular ID 之一，并可能需要 Letter ID': [
        MA_MYMASSGOV,
      ],
      '马州 REAL ID 右上角有星标': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      'Standard license / Mass ID 标注不用于联邦身份用途': [
        MA_ID_REQUIREMENTS,
      ],
      '首次或升级 REAL ID 通常带 1 份 lawful presence、1 份显示完整 9 位 SSN 的证明、2 份显示姓名和当前 Massachusetts residential address 的住址证明': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID_CHECKLIST,
      ],
      '住址证明不能只写 P.O. box，必须显示申请人的当前 residential address': [
        MA_REAL_ID_CHECKLIST,
      ],
      '没有 SSN 且符合官方路径时，可使用 60 天内 SSA Denial Notice，并同时提交 non-U.S. passport、visa 和 I-94': [
        MA_REAL_ID_CHECKLIST,
      ],
      'REAL ID 身份文件必须是原件且不可覆膜': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      '当前姓名须与 lawful presence 文件一致，不一致要带 marriage certificate、court document 等合法更名证明': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      '无法提供 lawful presence 而申请 Standard Class D/M 时，第一份身份文件须是有效外国护照或有效 consular identification': [
        MA_WFMA_LAW,
      ],
      '第二份从州法列明的出生证、外国身份证、外国驾照等类别中选': [
        MA_WFMA_LAW,
      ],
      '这两份 WFMA 身份文件合计须包含一张照片和一个出生日期': [
        MA_WFMA_LAW,
      ],
      '非英文文件须附 certified English translation': [
        MA_WFMA_LAW,
        MA_TRANSLATED,
      ],
      'Standard Mass ID 不是 WFMA Standard driver license，不能照搬后者的 lawful presence 例外': [
        MA_DRIVER_MANUAL,
        MA_ID_REQUIREMENTS,
      ],
      'REAL ID 和 Standard Class D/M driver license 当前同为 $50，选择 REAL ID 本身没有额外卡费': [
        MA_FEES,
      ],
      '先决定用途：有 TSA 接受的护照等证件且只需驾驶，可继续选择 Standard': [
        MA_REAL_ID,
        MA_ID_REQUIREMENTS,
      ],
      '需要州证件用于国内航班或部分联邦设施，再走 REAL ID': [
        MA_REAL_ID,
      ],
      '申请 Standard Class D/M 且无法提供 lawful presence 时，打开 WFMA / Standard checklist，按两份身份与出生日期文件、马州 residency 和翻译要求备件': [
        MA_WFMA_LAW,
        MA_ID_REQUIREMENTS,
      ],
      '申请 REAL ID 时先在 myRMV 填表，再用 checklist 选定 lawful presence、SSN / Denial Notice、两份 residency 和姓名变更文件': [
        MA_REAL_ID,
        MA_REAL_ID_CHECKLIST,
      ],
      '预约 RMV Service Center': [MA_REAL_ID],
      'AAA 会员可核对 AAA branch 资格，现场只带原件和符合要求的认证材料': [
        MA_REAL_ID,
      ],
      '续期先看窗口与资格：到期前 1 年可办，limited-term、无 SSN 或升级 REAL ID 等路径要按页面转现场': [
        MA_RENEW,
      ],
      '搬家后 30 天内先更新 residential 和 mailing address，再决定是否花 $25 订购显示新地址的卡': [
        MA_ADDRESS,
        MA_FEES,
      ],
      '首次驾照先办 $30 learner permit，选择简体或繁体 Mandarin 等考试语言': [
        MA_PERMIT,
        MA_FEES,
      ],
      '通过 permit 后再安排 $35 road test': [MA_ROAD_TEST, MA_FEES],
      '外国驾照先区分 visitor、协议 conversion 与无协议首次申请三条路，并按国家页面核对 30 天或 60 天 driving record、翻译和交回原证件要求': [
        MA_FOREIGN_DRIVING,
        MA_FOREIGN_TRANSFER,
        MA_FOREIGN_CONVERSION,
      ],
      '外州驾照转入先在线完成申请并预约 Service Center': [
        MA_OUT_OF_STATE,
      ],
      '原证有效或过期不足 1 年通常免 written / road test': [
        MA_OUT_OF_STATE,
      ],
      '把 Standard Class D/M 驾照与 Standard Mass ID 当成同一套 lawful presence 规则': [
        MA_WFMA_LAW,
        MA_ID_REQUIREMENTS,
      ],
      '已有有效护照仍以为国内航班必须再办 REAL ID': [
        MA_REAL_ID,
      ],
      '只带一份 Massachusetts residency，或住址文件只显示 P.O. box': [
        MA_REAL_ID_CHECKLIST,
      ],
      '拿手机照片、普通复印件或覆膜证件代替 REAL ID 原件': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      'lawful presence、SSN 与现有 RMV 记录姓名不一致，却没有带完整的更名证明链': [
        MA_ID_REQUIREMENTS,
        MA_REAL_ID,
      ],
      '在线开始 REAL ID 后，以为可以跳过 Service Center 或 AAA 的现场核验': [
        MA_REAL_ID,
      ],
      '地址已经变化，却在续期或补证前没有先更新 RMV 记录': [
        MA_ADDRESS,
        MA_RENEW,
        MA_REPLACE,
      ],
      '把 IDP 当成可转换的驾照，或当成脱离原外国驾照也能单独驾驶的证件': [
        MA_FOREIGN_DRIVING,
        MA_FOREIGN_TRANSFER,
      ],
      '按统一的 30 天记录期限准备外国驾照 conversion，忽略 Taiwan 和 South Korea 等路径的 60 天规则': [
        MA_FOREIGN_CONVERSION,
      ],
    },
  },
  illinois: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      IL_REAL_ID,
      IL_DOCUMENT_REQUIREMENTS,
      IL_ACCEPTABLE_DOCUMENTS,
      IL_CHECKLIST,
      IL_NONCITIZEN,
      IL_TVDL_CHANGE,
      IL_RENEW,
      IL_DUPLICATE,
      IL_ADDRESS,
      IL_NEW_RESIDENT,
      IL_PERMIT,
      IL_ADULT_ED,
      IL_RULES,
      IL_DRIVER_INFO,
      IL_FEES,
      IL_APPOINTMENTS,
      IL_FACILITY,
      IL_OLDER_DRIVER_UPDATE,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Illinois Secretary of State 的 REAL ID、A/B/C/D 文件组、VISA/NONVISA 与原 TVDL、续期补证、地址、新居民、permit、成人教育、费用、预约、2026 Rules of the Road 和老年驾驶新规。',
    notes:
      '重写 Illinois 总览与 REAL ID 页面，移除过时 TVDL 逻辑，补充当前 Chicago Supercenter、永久卡邮寄、TSA 临时纸卡边界、90 天新居民测试差异和 2026 年 87 岁 road test 起点，并将所有声明改为显式来源；仍待真实人工签字。',
    claims: {
      '伊利诺伊州先分 Standard 与 REAL ID：Standard license 可用于驾驶，移民申请路径自 2024-07-01 起已由 TVDL 改为四年 Standard license，并标注 Federal Limits Apply': [
        IL_NONCITIZEN,
        IL_TVDL_CHANGE,
      ],
      'REAL ID 可用于国内航班和受限联邦设施，但首次申请必须按 A/B/C/D 材料组现场办理': [
        IL_REAL_ID,
        IL_DOCUMENT_REQUIREMENTS,
      ],
      '走 VISA 或 NONVISA Standard credential 路径且当时无资格取得 SSN 的人，官方文件页说明可不提交 Group C，而是在现场签署 ineligibility declaration': [
        IL_DOCUMENT_REQUIREMENTS,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '该声明只解决这条申请路径的 Group C 栏，不能据此认定自己已满足 REAL ID': [
        IL_DOCUMENT_REQUIREMENTS,
        IL_ACCEPTABLE_DOCUMENTS,
        IL_REAL_ID,
      ],
      'REAL ID 仍要按实时清单另行核对 lawful status、SSN 和两份地址材料': [
        IL_REAL_ID,
        IL_DOCUMENT_REQUIREMENTS,
      ],
      '搬入伊州后通常有 90 天取得 Illinois credential：有效外州驾照转入通常只做 vision test，外国驾照转入则要 vision、written 和 road exams': [
        IL_NEW_RESIDENT,
      ],
      '首次申请 Illinois REAL ID 要准备一份 Group A written signature、一份 Group B date of birth / lawful status、一份 Group C 完整 SSN，以及两份 Group D Illinois residency': [
        IL_REAL_ID,
        IL_DOCUMENT_REQUIREMENTS,
      ],
      '即使已经持有 Standard Illinois license / ID，第一次升级 REAL ID 仍按 first-time REAL ID 处理': [
        IL_DOCUMENT_REQUIREMENTS,
      ],
      'Chicago REAL ID Supercenter 已延长开放至 2026 年底，工作日 7:30–17:00 接受 walk-in': [
        IL_REAL_ID,
      ],
      '其他 full-service DMV 有些必须预约，应先查 Facility Finder': [
        IL_REAL_ID,
        IL_FACILITY,
      ],
      '线上续期只适用于收到 renewal letter 和 PIN / authorization number 的申请人，升级 REAL ID 或需要考试、medical / vision report 时必须到 DMV': [
        IL_RENEW,
      ],
      '自 2024-07-01 起，Illinois 已用四年 Standard driver’s license 取代面向 undocumented immigrants 和部分无 SSN 非公民的 TVDL': [
        IL_NONCITIZEN,
        IL_TVDL_CHANGE,
      ],
      '新卡标注 Federal Limits Apply': [IL_TVDL_CHANGE],
      '第一张 REAL ID 的材料结构是 Group A written signature、Group B date of birth / lawful status、Group C full SSN 和两份 Group D residency': [
        IL_REAL_ID,
        IL_DOCUMENT_REQUIREMENTS,
      ],
      'REAL ID 与同类传统 license / ID 的卡费相同': [
        IL_REAL_ID,
        IL_FEES,
      ],
      '当前 basic driver’s license 为 $30，18–20 岁为 $5，Class D instruction permit 为 $20，corrected / duplicate driver’s license 为 $5': [
        IL_FEES,
      ],
      '在线续期要求 renewal letter 上的 PIN 或 authorization number': [
        IL_RENEW,
      ],
      '升级 REAL ID、需要 written / road test、更新 medical / vision report 或加入 P.O. Box 时不能线上续': [
        IL_RENEW,
      ],
      '线上续期、duplicate 和 REAL ID 正式卡通常在 15 个工作日内寄到': [
        IL_RENEW,
        IL_DUPLICATE,
        IL_REAL_ID,
      ],
      '线上 duplicate 不适用于 suspended / revoked / canceled credential、30 天内到期、此前线上改址、需要改信息或已达到补证次数上限等情况，而且不会提供 temporary credential': [
        IL_DUPLICATE,
      ],
      '地址变化后 10 天内必须通知 Secretary of State': [IL_ADDRESS],
      'driver license / ID 与 vehicle registration 要分别更新，线上改记录免费，但显示新地址的实体卡要现场办理并支付适用费用': [
        IL_ADDRESS,
        IL_FEES,
      ],
      '从外州搬入通常有 90 天办理 Illinois license，有效外州驾照一般只需 vision test': [
        IL_NEW_RESIDENT,
      ],
      '从外国搬入也有 90 天，但要参加 vision、written 和 road exams，并提供保险证明': [
        IL_NEW_RESIDENT,
      ],
      '18–20 岁首次申请且未上过认可 driver education 的人必须先完成至少 6 小时的州认证 Adult Driver Education Course，再做 vision、written 和 road tests': [
        IL_ADULT_ED,
      ],
      '15–17 岁 instruction permit 申请人要在认可 driver education 中就读或距开课 30 天内': [
        IL_PERMIT,
      ],
      '未满 18 岁的 permit 有效两年，并通常要持有至少 9 个月': [
        IL_PERMIT,
      ],
      'Illinois Class D written test 至少 35 题，答对 80% 才通过': [
        IL_RULES,
      ],
      '非 CDL 申请人可按可用语言或口试 / interpreter 规则向 facility 询问，CDL knowledge test 规则另行处理': [
        IL_RULES,
      ],
      '从 2026-07-01 起，单纯因年龄触发的 mandatory road test 起点由 79 岁提高到 87 岁': [
        IL_OLDER_DRIVER_UPDATE,
      ],
      '81–86 岁 license 通常两年有效，87 岁及以上每年续期': [
        IL_DRIVER_INFO,
        IL_OLDER_DRIVER_UPDATE,
      ],
      'Chicago REAL ID Supercenter 位于 191 N. Clark St.，已延长至 2026 年底，工作日 7:30–17:00 walk-in': [
        IL_REAL_ID,
      ],
      '州内许多 Driver Services location 仍标注 appointment required': [
        IL_FACILITY,
        IL_APPOINTMENTS,
      ],
      'REAL ID 申请现场发 temporary paper credential，永久卡通常 15 个工作日内邮寄': [
        IL_REAL_ID,
      ],
      'TSA 的接受证件页明确说明 temporary driver’s license 不是可接受身份证件': [
        TSA_IDENTIFICATION,
      ],
      'First-time REAL ID 要一份 Group A、一份 Group B、一份 Group C 和两份 Group D': [
        IL_DOCUMENT_REQUIREMENTS,
      ],
      '一份文件可以同时满足多个 group，但仍要覆盖全部要求': [
        IL_DOCUMENT_REQUIREMENTS,
      ],
      'Group B 的 REAL ID 文件要证明 full legal name、date of birth 和 citizenship / lawful status': [
        IL_REAL_ID,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      'Group C 文件要显示姓名和完整 SSN': [IL_ACCEPTABLE_DOCUMENTS],
      '只有持有效 Illinois license / ID 且此前已向州里提交并核验 Social Security card 时，REAL ID 页面才说明可免再次出示': [
        IL_REAL_ID,
      ],
      '两份 Group D 要显示 full name 和 current Illinois residence address': [
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '银行账单、utility bill 等 printed electronic documents 可以使用，但 account number 要清楚可见': [
        IL_REAL_ID,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '还要带一份 written signature 证明，例如当前 non-REAL ID license、信用卡或借记卡、passport 或 canceled check': [
        IL_REAL_ID,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '所有材料要在可接受时限内有效，REAL ID 只接受 original hard copies，不接受 photocopies': [
        IL_REAL_ID,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '现用姓名与 birth certificate 或 passport 不一致时，要用 certified marriage certificate、adoption document、civil union document 或 certified name change document 接起姓名链': [
        IL_REAL_ID,
      ],
      'VISA / NONVISA Standard credential 的无 SSN declaration 只解决该路径的 Group C 栏': [
        IL_DOCUMENT_REQUIREMENTS,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '是否符合 REAL ID 仍要另按 REAL ID 页面与实时清单核对 lawful status、SSN 和其他材料': [
        IL_REAL_ID,
        IL_DOCUMENT_REQUIREMENTS,
      ],
      '当前 Standard credential 仍可驾驶': [
        IL_NONCITIZEN,
        IL_TVDL_CHANGE,
      ],
      '没有 REAL ID 但持 passport 等 TSA 接受证件的人，也不必只为国内航班升级': [
        IL_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '先判断用途：有 passport 等 TSA 接受证件且只需驾驶，可继续用 Standard': [
        IL_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '需要州证件用于国内航班或受限联邦设施，再办 REAL ID': [
        IL_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '走 Standard VISA / NONVISA 路径时，先用 live Document Requirements 和 Acceptable Identification Documents 确认 A/B/D 以及无 SSN declaration': [
        IL_DOCUMENT_REQUIREMENTS,
        IL_ACCEPTABLE_DOCUMENTS,
        IL_NONCITIZEN,
      ],
      '办 REAL ID 时按 A/B/C/D 逐组定好文件，再核对姓名链、材料时限、原件和打印要求': [
        IL_REAL_ID,
        IL_DOCUMENT_REQUIREMENTS,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '选择地点：Chicago Supercenter 在 2026 年底前为工作日 walk-in，其他 DMV 先用 Facility Finder 看服务项目和 appointment 标记': [
        IL_REAL_ID,
        IL_FACILITY,
      ],
      '出行前至少预留一个月申请': [IL_REAL_ID],
      '现场先拿 temporary paper credential，永久卡通常在 15 个工作日内邮寄': [
        IL_REAL_ID,
      ],
      '续期先找 renewal letter 上的 PIN / authorization number': [
        IL_RENEW,
      ],
      '想升级 REAL ID 或被要求考试、medical / vision report 时改走现场': [
        IL_RENEW,
      ],
      '搬家后 10 天内分别更新 driver license / ID 和 vehicle registration record': [
        IL_ADDRESS,
      ],
      '需要显示新地址的卡，再到 DMV 申请 corrected credential': [
        IL_ADDRESS,
        IL_FEES,
      ],
      '新居民在 90 天窗口内办理：外州有效驾照通常只做 vision test，外国驾照准备 vision、written、road exam 和车辆保险证明': [
        IL_NEW_RESIDENT,
      ],
      '18–20 岁首次申请且从未完成认可 driver education 的人，先完成州认证的 6-hour Adult Driver Education Course': [
        IL_ADULT_ED,
      ],
      '还按旧 TVDL 路径准备，而没有查看当前 VISA / NONVISA Standard license 规则': [
        IL_NONCITIZEN,
        IL_TVDL_CHANGE,
      ],
      '已有 Standard Illinois license 就以为第一次 REAL ID 不再需要完整 A/B/C/D 材料': [
        IL_DOCUMENT_REQUIREMENTS,
      ],
      '只带一份 Illinois residency，或把手机里的电子账单当作可直接展示的文件而没有打印': [
        IL_REAL_ID,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '为了遮挡隐私把 residency document 的 account number 涂掉': [
        IL_REAL_ID,
      ],
      '拿 photocopy 代替 REAL ID original hard copy': [
        IL_REAL_ID,
        IL_ACCEPTABLE_DOCUMENTS,
      ],
      '只带一张改名文件，无法把 birth name 连到 current legal name': [
        IL_REAL_ID,
      ],
      '只看到 VISA / NONVISA 的 Group C declaration，就认定它自动等同于 REAL ID 的 SSN 豁免': [
        IL_DOCUMENT_REQUIREMENTS,
        IL_REAL_ID,
      ],
      '尝试用普通 online renewal 升级 REAL ID': [IL_RENEW],
      '拿 DMV 当天发的 temporary paper REAL ID 去机场': [
        IL_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'TSA 明确不接受 temporary driver’s license 作为有效身份件': [
        TSA_IDENTIFICATION,
      ],
      '地址变化只更新 driver license / ID file，却忘了 vehicle registration 是另一个系统': [
        IL_ADDRESS,
      ],
      '从外国搬入时误以为有效外国驾照可像有效外州驾照一样免 written 和 road exams': [
        IL_NEW_RESIDENT,
      ],
    },
  },
  pennsylvania: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      PA_REAL_ID,
      PA_APPLY_REAL_ID,
      PA_REAL_ID_DOCUMENTS,
      PA_PREVERIFICATION,
      PA_NONCITIZEN_REAL_ID,
      PA_CDL_REAL_ID,
      PA_REAL_ID_FAQ,
      PA_NO_SSN_CARD,
      PA_ONLINE_SERVICES,
      PA_RENEW,
      PA_REPLACE,
      PA_NAME_ADDRESS,
      PA_MOVING_WITHIN,
      PA_TRANSFER_LICENSE,
      PA_TRANSFER_VEHICLE,
      PA_PERMIT,
      PA_APPLYING_FOR_PERMIT,
      PA_TESTING,
      PA_SCHEDULE_TEST,
      PA_FOREIGN_LICENSE,
      PA_FOREIGN_FAQ,
      PA_REAL_ID_CENTERS,
      PA_LOCATIONS,
      PA_FEES,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 PennDOT 的 REAL ID、预验证、非公民与 CDL 分支、材料、费用、续期补证、姓名地址、新居民、permit、考试语言、外国驾照和台湾等互惠正文。',
    notes:
      '重写 Pennsylvania 总览与 REAL ID 页面，补充不上传证件的预验证边界、camera card、15/60/20 天期限、中文笔试、外国驾照与台湾互惠，并公开指出非公民 REAL ID 页与统一费用页的 duplicate 金额冲突；所有声明已改为显式来源，仍待真实人工签字。',
    claims: {
      '宾州先回答三个问题：是否需要用州证件完成联邦身份用途、PennDOT 是否已确认材料在档、是否需要当天拿卡': [
        PA_REAL_ID,
        PA_PREVERIFICATION,
        PA_REAL_ID_CENTERS,
      ],
      'Standard license 仍可驾驶': [PA_REAL_ID, PA_REAL_ID_FAQ],
      '已有 passport 等联邦接受证件的人不必只为国内航班升级': [
        PA_REAL_ID_FAQ,
        TSA_IDENTIFICATION,
      ],
      '只有收到 PennDOT 预验证通过确认的人才能线上订购 REAL ID': [
        PA_PREVERIFICATION,
        PA_REAL_ID_FAQ,
      ],
      '外州非商业驾照新居民要在建立 Pennsylvania residency 后 60 天内现场换证，交回仍有效或过期不超过 6 个月的外州驾照，完成 DL-180R、vision test 和身份材料': [
        PA_TRANSFER_LICENSE,
      ],
      '持有效外国驾照的合格访客可从入境美国起最多驾驶一年或到外国驾照到期，以较早者为准': [
        PA_APPLYING_FOR_PERMIT,
        PA_FOREIGN_FAQ,
      ],
      'IDP 只是翻译，不能单独驾驶': [PA_FOREIGN_LICENSE],
      '多数首次 Pennsylvania REAL ID 申请人要带一份 identity / lawful status、一份符合本人类别的 SSN 证明、两份 physical Pennsylvania residency 文件，以及适用的完整姓名变更链': [
        PA_REAL_ID_DOCUMENTS,
        PA_NONCITIZEN_REAL_ID,
      ],
      '预验证是在 PennDOT 旧记录里人工查档，不是上传证件': [
        PA_PREVERIFICATION,
        PA_APPLY_REAL_ID,
      ],
      '未获确认、非美国公民和 REAL ID CDL 申请人要按对应页面现场办理': [
        PA_PREVERIFICATION,
        PA_NONCITIZEN_REAL_ID,
        PA_CDL_REAL_ID,
      ],
      'Same-Day REAL ID Centers 当前周二至周六 8:30–16:15 开放，实时核验并当天签发': [
        PA_REAL_ID_CENTERS,
      ],
      '普通 Driver License Center 也能核验材料，但卡片在 15 个工作日内邮寄': [
        PA_REAL_ID,
        PA_REAL_ID_CENTERS,
      ],
      'Road test 要从官方 scheduling service 预约': [PA_SCHEDULE_TEST],
      '其他业务先用 location finder 核对地点、营业日和服务': [
        PA_LOCATIONS,
      ],
      '首次 REAL ID 收一次性 $30 REAL ID fee，再加适用的普通 renewal fee': [
        PA_REAL_ID,
        PA_REAL_ID_FAQ,
      ],
      '当前四年 non-commercial renewal 为 $39.50，因此官方示例合计 $69.50': [
        PA_REAL_ID_FAQ,
        PA_FEES,
      ],
      '首次 REAL ID 通常把当前证件剩余期限再加四年': [
        PA_REAL_ID,
        PA_REAL_ID_FAQ,
      ],
      '以后续期默认继续签发 REAL ID，除非选择 opt out，并且不再收额外 REAL ID fee': [
        PA_REAL_ID_FAQ,
      ],
      '当前统一费用页列出 initial permit + four-year license $45.50、四年续期 $39.50、65 岁以上可选两年续期 $27.50、duplicate / replacement license $42.50': [
        PA_FEES,
      ],
      'PennDOT 非公民 REAL ID 页面的 temporary-status 段落仍显示 $30.50 duplicate fee，而 Payments and Fees 页面列出 duplicate / replacement license $42.50，两份官方页面金额不一致': [
        PA_NONCITIZEN_REAL_ID,
        PA_FEES,
      ],
      '本站不把 $30.50 当作当前报价，并要求付款前同时查看实时费用页和交易金额': [
        PA_NONCITIZEN_REAL_ID,
        PA_FEES,
      ],
      '2003 年 9 月后首次取得 PA license、permit 或 photo ID 只代表可能有材料在档': [
        PA_PREVERIFICATION,
        PA_REAL_ID_DOCUMENTS,
      ],
      '预验证由 PennDOT 人工检查，最多可用 15 个工作日，收到通过确认后才可线上订购': [
        PA_PREVERIFICATION,
      ],
      'PennDOT 明确不接受在家上传 REAL ID 文件，并提示声称可上传证件的网站属于欺诈风险': [
        PA_APPLY_REAL_ID,
      ],
      '不符合预验证的人要携带原件或认证副本现场核验': [
        PA_PREVERIFICATION,
        PA_REAL_ID_DOCUMENTS,
      ],
      'Same-Day REAL ID Centers 当前周二至周六 8:30–16:15 营业': [
        PA_REAL_ID_CENTERS,
      ],
      '普通 Driver License Center 核验后，REAL ID 在 15 个工作日内邮寄': [
        PA_REAL_ID,
        PA_REAL_ID_CENTERS,
      ],
      '普通线上续期完成后 camera card 通常在 14 天内寄到，申请人还要拿 camera card 到 Photo License Center 拍照取新证': [
        PA_RENEW,
      ],
      '邮寄或现场续期的 camera card 通常在申请处理后 7 至 10 个工作日到达': [
        PA_RENEW,
      ],
      '有照片与签名在档时可在线申请 duplicate': [PA_REPLACE],
      '现场申请会先给 15 天有效的 interim license，当前 duplicate / replacement license 费用为 $42.50': [
        PA_REPLACE,
        PA_FEES,
      ],
      '搬家后 15 天内要通知 PennDOT，driver license / ID 与 vehicle registration 都要更新': [
        PA_MOVING_WITHIN,
        PA_NAME_ADDRESS,
      ],
      '非商业驾驶人线上改址免费，约 10 天收到必须随证携带的 update card': [
        PA_MOVING_WITHIN,
        PA_NAME_ADDRESS,
        PA_FEES,
      ],
      '新居民有 60 天换 PA non-commercial license，但车辆 title / registration 是 20 天期限，且车辆业务通常先要有效 Pennsylvania identification': [
        PA_TRANSFER_LICENSE,
        PA_TRANSFER_VEHICLE,
      ],
      '符合条件的外国驾照持有人可驾驶到入境美国满一年或外国驾照到期，以较早者为准': [
        PA_APPLYING_FOR_PERMIT,
        PA_FOREIGN_FAQ,
      ],
      'IDP 非必需但官方强烈建议，并且必须与原驾照一起使用': [
        PA_FOREIGN_LICENSE,
        PA_FOREIGN_FAQ,
      ],
      'France、Germany、Korea 和 Taiwan 的有效 non-commercial license 有互惠转入路径，可免 knowledge 和 road tests，但仍要做 vision test': [
        PA_APPLYING_FOR_PERMIT,
      ],
      '普通 knowledge test 有 18 道选择题，答对 15 题通过': [PA_TESTING],
      '所有 Driver License Centers 可按要求提供 written 或 audio test，并包含 Mandarin': [
        PA_TESTING,
      ],
      '未满 18 岁申请人取得 permit 后要至少等待 6 个月，并完成 65 小时练车，其中至少 10 小时夜间、5 小时恶劣天气': [
        PA_APPLYING_FOR_PERMIT,
      ],
      '每张 permit 有 3 次 road test 机会': [
        PA_APPLYING_FOR_PERMIT,
        PA_TESTING,
      ],
      'PennDOT Driver License Centers 接受 payment card、check 或 money order，但不收现金': [
        PA_FEES,
      ],
      'Riverfront Office Center Customer Counter 是单列的现金例外': [
        PA_FEES,
      ],
      '即使已经持有 PA driver’s license 或 ID，首次 REAL ID 仍要覆盖全部文件组': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '身份与 lawful-status 文件必须是 original 或 certified copy，普通 photocopy 不接受': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '美国公民常用 identity 文件包括政府签发并带 raised seal 的出生证、有效美国 passport / passport card、citizenship 或 naturalization certificate': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '通用 REAL ID 清单的 SSN 栏接受 Social Security card、W-2、SSA-1099、non-SSA-1099 或显示完整号码的 pay stub': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '文件要用 current legal name 并显示完整 9 位 SSN': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '没有 SSN 时，通用清单要求 original SSA ineligibility letter': [
        PA_REAL_ID_DOCUMENTS,
      ],
      'lawfully present non-U.S. citizen 还要按专页核对原始 Social Security card 或 ineligibility letter 及移民文件，不能只套用美国公民示例': [
        PA_NONCITIZEN_REAL_ID,
      ],
      '两份 residency 要是显示 Pennsylvania address 的 physical documents，而不是电子展示': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '例子包括 PA credential、vehicle registration、auto insurance、utility bill、W-2 / pay stub、tax record、lease、mortgage 或经过 USPS 投递的邮件': [
        PA_REAL_ID_DOCUMENTS,
      ],
      'passport 已显示 current legal name 时，PennDOT 不要求额外姓名变更文件': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '否则要用 certified marriage certificate、court order 或 amended birth certificate 串起全部变化，多次婚姻通常要逐段连接': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '2003 年 9 月后首次取得 PA credential、个人资料未变且与 PennDOT 记录一致的人，可以申请 pre-verification': [
        PA_PREVERIFICATION,
      ],
      '它只检查既有档案，不接受扫描或上传新文件': [
        PA_PREVERIFICATION,
        PA_APPLY_REAL_ID,
      ],
      'Standard non-REAL ID 的“没有 Social Security card”替代材料有单独页面，明确不适用于 REAL ID，不能把两个清单混用': [
        PA_NO_SSN_CARD,
      ],
      '外州驾照转入要带 identity、Pennsylvania residency、Social Security card 和 DL-180R': [
        PA_TRANSFER_LICENSE,
      ],
      '现有外州驾照要交回，并且必须仍有效或过期不超过 6 个月': [
        PA_TRANSFER_LICENSE,
      ],
      '非美国公民的移民文件必须反映 current name': [
        PA_NONCITIZEN_REAL_ID,
      ],
      'temporary immigration status 的首张 REAL ID 有效期会跟随移民文件到期日': [
        PA_NONCITIZEN_REAL_ID,
      ],
      '先决定是否需要 REAL ID：有有效 passport、military ID 或其他 TSA 接受证件的人，可继续用 Standard license 驾驶': [
        PA_REAL_ID_FAQ,
        TSA_IDENTIFICATION,
      ],
      '符合 2003 年 9 月后首次取得 PA credential、资料未变等条件时，先提交 pre-verification，并预留最多 15 个工作日等 PennDOT 确认': [
        PA_PREVERIFICATION,
      ],
      '没有通过确认或不符合资格时，按 identity / lawful status、SSN、two physical residency 和 name-change chain 四栏准备 original / certified documents': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '非美国公民先打开专用 REAL ID 页面，按 current immigration status 核对 identity、Social Security status、两份 residency 和证件有效期': [
        PA_NONCITIZEN_REAL_ID,
      ],
      '按时效选地点：需要当天拿卡去指定 Same-Day REAL ID Center': [
        PA_REAL_ID_CENTERS,
      ],
      '可等邮寄则到普通 Driver License Center，预留 15 个工作日': [
        PA_REAL_ID,
        PA_REAL_ID_CENTERS,
      ],
      '付款前同时核对 $30 one-time REAL ID fee 与当前 renewal / duplicate fee': [
        PA_REAL_ID_FAQ,
        PA_FEES,
      ],
      '遇到官方页面金额冲突，以实时费用页和交易报价重新确认': [
        PA_NONCITIZEN_REAL_ID,
        PA_FEES,
      ],
      '普通续期先判断线上资格并预留 camera card + Photo License Center 步骤': [
        PA_RENEW,
      ],
      '补证先确认 PennDOT 是否已有 photo 和 signature': [PA_REPLACE],
      '搬家后 15 天内分别更新 driver credential 和 vehicle registration': [
        PA_MOVING_WITHIN,
        PA_NAME_ADDRESS,
      ],
      '收到免费 update card 后与原证一起携带': [
        PA_MOVING_WITHIN,
        PA_NAME_ADDRESS,
      ],
      '外州新居民在 60 天内到 Driver License Center 交回有效或过期不超过 6 个月的外州证，完成 DL-180R、vision 和材料核验': [
        PA_TRANSFER_LICENSE,
      ],
      '有车的人同时盯住 20 天 title / registration 期限': [
        PA_TRANSFER_VEHICLE,
      ],
      '首次驾照申请人先让 health care provider 完成 DL-180': [
        PA_PERMIT,
        PA_APPLYING_FOR_PERMIT,
      ],
      '未满 18 岁补 DL-180TD、6 个月等待与 65 小时练车，再预约 road test': [
        PA_PERMIT,
        PA_APPLYING_FOR_PERMIT,
        PA_SCHEDULE_TEST,
      ],
      '持外国驾照的人先区分访客驾驶与居民换证': [
        PA_FOREIGN_LICENSE,
        PA_APPLYING_FOR_PERMIT,
      ],
      'France、Germany、Korea 或 Taiwan 驾照申请互惠转入时，仍要按 PennDOT 现场确认资格并完成 vision test': [
        PA_APPLYING_FOR_PERMIT,
      ],
      '把“2003 年 9 月后首次拿 PA credential”理解成已经 pre-verified，没有等 PennDOT 的通过确认': [
        PA_PREVERIFICATION,
      ],
      '向声称能上传 REAL ID 证件的网站提交出生证、SSN 或移民文件': [
        PA_APPLY_REAL_ID,
      ],
      '已有普通 PA license 就以为首次 REAL ID 可以免带身份、SSN 和两份地址文件': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '拿手机里的电子账单代替 PennDOT 要求的 two physical residency documents': [
        PA_REAL_ID_DOCUMENTS,
      ],
      'SSN 文件只显示后四位，或姓名仍是改名前版本': [
        PA_REAL_ID_DOCUMENTS,
      ],
      '非美国公民只看通用清单，没有核对 non-U.S. citizen 页面要求的 Social Security card / SSA letter 和移民文件': [
        PA_NONCITIZEN_REAL_ID,
      ],
      '多次改名只带最近一张 marriage certificate，无法连接出生证姓名到 current legal name': [
        PA_REAL_ID_DOCUMENTS,
      ],
      'non-U.S. citizen 或 REAL ID CDL holder 尝试走普通 online pre-verification 路径': [
        PA_PREVERIFICATION,
        PA_NONCITIZEN_REAL_ID,
        PA_CDL_REAL_ID,
      ],
      '到普通 Driver License Center 后误以为当天一定拿到 REAL ID': [
        PA_REAL_ID,
        PA_REAL_ID_CENTERS,
      ],
      'same-day issuance 只在指定 REAL ID Centers': [PA_REAL_ID_CENTERS],
      '把“当前 license 剩余期限 + 4 年”读成首张 REAL ID 只从申请日算固定四年': [
        PA_REAL_ID,
        PA_REAL_ID_FAQ,
      ],
      '完成普通 online renewal 后不等 camera card，也没有去 Photo License Center 完成照片步骤': [
        PA_RENEW,
      ],
      '搬家只更新 license / ID，却漏掉 vehicle registration，或没有随身携带免费 address update card': [
        PA_MOVING_WITHIN,
        PA_NAME_ADDRESS,
      ],
      '把 IDP 当成独立驾照，或在入境满一年、外国驾照过期后继续依赖外国驾照驾驶': [
        PA_FOREIGN_LICENSE,
        PA_APPLYING_FOR_PERMIT,
        PA_FOREIGN_FAQ,
      ],
      '用过期超过 6 个月的外州驾照直接换证，忽略此时要重新走 Pennsylvania learner permit 和考试路径': [
        PA_TRANSFER_LICENSE,
        PA_PERMIT,
      ],
    },
  },
  georgia: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      GA_REAL_ID,
      GA_REAL_ID_FAQ,
      GA_TRANSFER_OUT_OF_STATE,
      GA_NONCITIZEN,
      GA_FOREIGN,
      GA_TRANSFER_FOREIGN,
      GA_RENEW,
      GA_RENEW_FAQ,
      GA_MAIL_RENEW,
      GA_REPLACE,
      GA_REPLACE_FAQ,
      GA_UPDATE,
      GA_ADDRESS_FAQ,
      GA_FEES,
      GA_LOCATIONS,
      GA_TESTS,
      GA_ROAD_TEST,
      GA_DRIVER_MANUAL_TESTS,
      GA_CLASS_C,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Georgia DDS 的 Secure ID、身份与住址材料、外州转入、非公民、外国驾照、韩国与台湾互惠、续期补证、地址、费用、考试语言、Class C 和 road test 正文。',
    notes:
      '重写 Georgia 总览与 REAL ID 页面，补齐 30/60/150 天分界、当前费用、考试与外国驾照路径，并公开标注永久卡 30/45 天、第二次改址费用和 Chinese Road Signs 三组官方页面差异；所有声明已改为显式来源，仍待真实人工签字。',
    claims: {
      'Georgia DDS 把 REAL ID 项目称为 Secure ID': [GA_REAL_ID],
      'DDS 说明 2012 年后签发的 Georgia license/ID 是 REAL ID-compliant，但办事前仍应直接检查卡片右上角是否有 gold 或 black star': [
        GA_REAL_ID,
      ],
      '临时纸质 license/ID 不能用于 TSA 登机': [
        GA_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '成为 Georgia resident 后 30 天内要换领 Georgia driver’s license': [
        GA_TRANSFER_OUT_OF_STATE,
        GA_NONCITIZEN,
      ],
      '有效或过期不超过 2 年的外州非商业驾照通常要交回原证并通过视力检查，可免 knowledge 和 road tests': [
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '过期超过 2 年则要通过 knowledge、road 和 vision exams，并提交 certified driving record': [
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '普通 Class C 驾照有效 8 年，当前费用 $32，符合资格的线上交易可能减 $5': [
        GA_FEES,
      ],
      '没有星标、持外州或外国证件，或要首次取得 Georgia REAL ID 时，需要到 Customer Service Center 出示原件或认证文件，包括一份身份或 lawful-status 文件、完整 SSN 核验、两份 Georgia 居住证明，以及适用的姓名变更文件': [
        GA_REAL_ID,
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '已经持有带星 Georgia credential 的美国公民通常不用重交全套材料，但改名、更新 gender marker 或其他身份核验业务除外': [
        GA_REAL_ID,
      ],
      '只有 automobile、motorcycle 和 CDL behind-the-wheel road tests 需要预约，续期、改址等现场业务目前不要求预约': [
        GA_ROAD_TEST,
      ],
      'Knowledge exam 可直接到场，但非商业考试要在中心关门至少 30 分钟前开始': [
        GA_TESTS,
        GA_DRIVER_MANUAL_TESTS,
      ],
      '现场办理前都要先提交 Online License/ID/Permit Form，并按地点核对具体服务': [
        GA_TRANSFER_OUT_OF_STATE,
        GA_LOCATIONS,
      ],
      'Secure ID 是 Georgia 对 REAL ID 合规项目的称呼，不是另一种额外证件': [
        GA_REAL_ID,
      ],
      '金色星标和黑色星标都可表示 Georgia REAL ID，颜色差异来自卡片设计': [
        GA_REAL_ID,
        GA_REAL_ID_FAQ,
      ],
      '同一人只能有一张带 REAL ID 星标的实体 Georgia driver’s license 或 ID，但可以另有合规 digital license/ID': [
        GA_REAL_ID,
      ],
      'Georgia 非商业 knowledge exam 分为 Road Rules 和 Road Signs，两部分都要答对至少 15/20': [
        GA_TESTS,
      ],
      '当前 Test and Exams Information 把 Road Rules 和 Road Signs 都列为可用 26 种语言，包括 Chinese': [
        GA_TESTS,
      ],
      'DDS 的在线 Driver Manual 章节仍写 Road Signs 和实际路考只用英语，与当前考试专页不一致，依赖中文 Road Signs 考试前应向考点确认': [
        GA_TESTS,
        GA_DRIVER_MANUAL_TESTS,
      ],
      'Road Skills Test 只用英语，必须预约，并需要有效 permit、合规车辆、纸质 registration 和有效 insurance card': [
        GA_TESTS,
        GA_ROAD_TEST,
      ],
      '18 岁及以上首次 road test 申请人还要确认完成 40 小时 supervised driving，其中 6 小时在夜间，并由 21 岁以上持证驾驶人陪同': [
        GA_ROAD_TEST,
        GA_CLASS_C,
      ],
      '普通 Class C learner permit 当前为 2 年 $10，考试任一部分失败不退费，再次考试要重新付 permit fee': [
        GA_FEES,
      ],
      '续期最多可提前 150 天，当前专页说明 renewed license 最长有效 8 年，线上续期要求 Georgia resident、18 岁以上、美国公民并持带星 Georgia credential': [
        GA_RENEW,
      ],
      '非美国公民每次办理会签发 license、permit 或 ID 的业务，都要亲自出示原始移民文件，不能使用普通线上续期、补证或改址路径': [
        GA_NONCITIZEN,
        GA_RENEW,
        GA_UPDATE,
      ],
      '现场续期会先发 interim license，DDS 的 REAL ID 和 replacement 办理说明写永久卡可能在 30 天内寄到，但 renewal 与 replacement FAQ 使用 45 天窗口，安排行程时应按较长时间预留': [
        GA_REAL_ID,
        GA_RENEW,
        GA_RENEW_FAQ,
        GA_REPLACE,
        GA_REPLACE_FAQ,
      ],
      '补证在原证剩余至少 150 天时当前费用 $10，少于 150 天则按续期处理并支付 renewal fee': [
        GA_REPLACE,
        GA_FEES,
      ],
      '现有 Georgia credential 持有人搬家后有 60 天改地址，新居民转入则是 30 天期限': [
        GA_UPDATE,
        GA_ADDRESS_FAQ,
      ],
      '第一次 name/address change 在当前证件周期内免费，但 DDS 主说明写第二次起 $10，FAQ 则写第二次要续期并付 renewal fee，提交前要看在线交易报价或向 DDS 确认': [
        GA_UPDATE,
        GA_ADDRESS_FAQ,
        GA_FEES,
      ],
      'South Korea 驾照连同韩国领馆 License Certification Letter 可免 Georgia knowledge 和 road tests，但仍要通过 vision exam': [
        GA_FOREIGN,
      ],
      'DDS 只明确写 Georgia 与 Taiwan 有 reciprocity，没有在同一页公布 Taiwan 的具体免考文件与条件，不能直接套用韩国路径': [
        GA_FOREIGN,
      ],
      '没有互惠协议的外国驾照转入通常要通过 knowledge、road 和 vision exams': [
        GA_FOREIGN,
        GA_TRANSFER_FOREIGN,
      ],
      '非居民持有效外国驾照可在 Georgia 驾驶，但执法人员可能要求 passport 或 visa 核验驾照有效性，成为 resident 后则进入 30 天换证规则': [
        GA_FOREIGN,
        GA_NONCITIZEN,
      ],
      '大多数非美国公民可保留外国非商业驾照，但美国公民持外国辖区证件或申请 commercial license/permit 时有交回证件的例外': [
        GA_FOREIGN,
        GA_NONCITIZEN,
      ],
      '美国公民带一份身份文件原件或认证副本，常见选择包括带 raised seal 的政府出生证明、未过期美国 passport/passport card、Naturalization 或 Citizenship certificate': [
        GA_REAL_ID,
      ],
      '先在 Online License/ID/Permit Form 填完整 SSN，系统核验失败时再带显示姓名与完整号码的 Social Security card、SSA printout、W-2、1099 或 pay stub 等官方清单文件': [
        GA_REAL_ID,
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '两份 Georgia residency 文件必须来自不同来源或不同账户，并显示姓名和当前 residential address，P.O. Box 不能单独证明 residency': [
        GA_REAL_ID,
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '常见 residency 文件有近 6 个月的 utility/phone bill、USPS 实体投递邮件、lease/rent receipt，或当前或上一 calendar year 的政府、住房、就业、银行、学校或医疗记录': [
        GA_REAL_ID,
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '身份文件姓名与 current legal name 不同时要带完整 name-change history，已经持有有效 Georgia license/ID 的客户通常带支持最近一次变更的原件或认证文件': [
        GA_REAL_ID,
        GA_REAL_ID_FAQ,
      ],
      '非美国公民要按当前身份类别带 identity 和 lawful-status 原始移民文件，DDS 只会按移民文件上的精确姓名签发证件': [
        GA_REAL_ID,
        GA_NONCITIZEN,
      ],
      '没有资格取得 SSN 的申请人要在 Customer Service Center 填 DDS-351 Certification of Social Security Denial Status，具有 DHS work authorization 的非公民则必须申请 SSN': [
        GA_NONCITIZEN,
        GA_FOREIGN,
      ],
      'DDS 同时写明所有文件必须为 English，并且不接受 translated documents，原始文件不是英语时不要自行假定普通认证翻译可用，应先联系 DDS 确认可接受的原始英文文件': [
        GA_REAL_ID,
        GA_TRANSFER_FOREIGN,
      ],
      '先检查现有 Georgia credential 的 gold/black star，并判断是否会在永久卡寄到前乘机': [
        GA_REAL_ID,
      ],
      '没有星标或要从外州/外国转入时，按 identity/lawful status、SSN、two residency 和 name-change 四栏准备原件或认证文件': [
        GA_REAL_ID,
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '需要现场时先提交 Online License/ID/Permit Form，再从 Customer Service Center finder 核对地点和服务': [
        GA_TRANSFER_OUT_OF_STATE,
        GA_LOCATIONS,
      ],
      '外州新居民先按 30 天期限分流，原证有效或过期不超过 2 年走 surrender + vision 路径，超过 2 年则准备 certified MVR 和三项考试': [
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '普通续期先查线上资格并最多提前 150 天办理，补证则先看原证是否还剩至少 150 天': [
        GA_RENEW,
        GA_REPLACE,
      ],
      '首次 Class C 申请人先完成 $10 permit 和两部分 knowledge exam，再满足 40 小时练车要求并预约 English-only road test': [
        GA_FEES,
        GA_TESTS,
        GA_ROAD_TEST,
        GA_CLASS_C,
      ],
      '持 South Korea 或 Taiwan 驾照的人先打开 Drivers From Other Nations，韩国申请人准备领馆 License Certification Letter，台湾申请人向 DDS 确认未公开的互惠细节': [
        GA_FOREIGN,
      ],
      '遇到邮寄时限、第二次改址费用或中文 Road Signs 三组官方差异时，按更保守的时间和材料准备，并在提交付款或考试前向 DDS 确认': [
        GA_RENEW_FAQ,
        GA_REPLACE_FAQ,
        GA_UPDATE,
        GA_ADDRESS_FAQ,
        GA_TESTS,
        GA_DRIVER_MANUAL_TESTS,
      ],
      '看到黑色星标就以为不是 REAL ID，或认为实体 driver’s license 和实体 ID 可以同时带星': [
        GA_REAL_ID,
      ],
      '临近航班才改证，拿到 interim paper license 后误以为 TSA 会接受': [
        GA_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '只带一份地址文件、两份来自同一账户，或用 P.O. Box 代替 residential address': [
        GA_REAL_ID,
      ],
      'SSN 文件只显示后四位，或文件姓名与当前申请姓名不一致': [
        GA_REAL_ID,
      ],
      '非美国公民带翻译件代替 DDS 要求的原始移民文件，或忽略移民文件姓名必须精确匹配': [
        GA_REAL_ID,
        GA_NONCITIZEN,
      ],
      '把 Taiwan reciprocity 直接理解成与 South Korea 完全相同的领馆信和免考条件': [
        GA_FOREIGN,
      ],
      '只看 26-language 考试专页就默认 Road Signs 一定能选 Chinese，没有注意 DDS Driver Manual 仍写该部分只用英语': [
        GA_TESTS,
        GA_DRIVER_MANUAL_TESTS,
      ],
      '新居民超过 30 天才处理 Georgia license 转入': [
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '外州驾照过期超过 2 年仍按免 knowledge/road tests 的普通换证路径准备': [
        GA_TRANSFER_OUT_OF_STATE,
      ],
      '补证时没有检查剩余 150 天，到了交易环节才发现必须按续期付费': [
        GA_REPLACE,
        GA_FEES,
      ],
      '第二次改地址直接按固定 $10 预算，没有注意 DDS FAQ 与主说明对费用处理不一致': [
        GA_UPDATE,
        GA_ADDRESS_FAQ,
      ],
    },
  },
  maryland: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      MD_REAL_ID_LOOKUP,
      MD_LICENSES_IDS,
      MD_REAL_ID_FAQ,
      MD_DOCUMENT_REQUIREMENTS,
      MD_FEES,
      MD_RENEW,
      MD_REPLACE,
      MD_UPDATE,
      MD_NEW_RESIDENTS,
      MD_TRANSFER_LICENSE,
      MD_TRANSFER_VEHICLE,
      MD_TESTS,
      MD_PERMIT,
      MD_PROVISIONAL,
      MD_DRIVER_ED,
      MD_INTERNATIONAL,
      MD_NONCOMPLIANT,
      MD_ID_CARD,
      MD_HOME,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Maryland MVA 的 REAL ID Lookup、材料表、现行费用、续期补证、资料更新、新居民、考试、permit、驾驶教育、外国驾照、非合规证件和 Photo ID 正文。',
    notes:
      '重写 Maryland 总览与 REAL ID 页面，补齐 30/60 天、12 个月过期边界、考试语言、外国驾照与非公民路径，并公开标注旧 REAL ID FAQ 和当前费用表的 $20/$30 冲突；所有声明已改为显式来源，仍待真实人工签字。',
    claims: {
      'Maryland 的 REAL ID 办理第一步不是猜卡面，而是打开 MVA REAL ID Lookup 查询个人档案，因为即使卡上有星标或全州合规率很高，旧档案仍可能提示补交材料': [
        MD_REAL_ID_LOOKUP,
        MD_REAL_ID_FAQ,
        MD_LICENSES_IDS,
      ],
      '需要补交 Maryland REAL ID 材料时，通常要覆盖一份年龄与身份、Social Security 信息、两份 Maryland 实际住址证明和适用的完整姓名变更链，并把原件或签发机关认证件带到 MVA': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
      ],
      '新居民要在搬入 Maryland 后 60 天内转入普通外州驾照，CDL 的期限是 30 天': [
        MD_TRANSFER_LICENSE,
      ],
      '外州驾照已过期超过 12 个月时不能直接交换，申请人要重新通过视力、knowledge 和 skills tests': [
        MD_TRANSFER_LICENSE,
      ],
      '续期、补证和地址更新先查看 myMVA 线上资格，新居民转入、REAL ID 补材料、姓名变更和驾驶考试则按对应页面预约': [
        MD_RENEW,
        MD_REPLACE,
        MD_UPDATE,
        MD_NEW_RESIDENTS,
        MD_REAL_ID_FAQ,
        MD_TESTS,
      ],
      'Maryland MVA 说明有 60 多项常见业务可以线上处理，但是否可用仍取决于个人记录和通知': [
        MD_HOME,
        MD_RENEW,
      ],
      'Maryland MVA 公布全州 REAL ID 合规率超过 99%，这个比例不能替代个人 REAL ID Lookup 结果': [
        MD_LICENSES_IDS,
        MD_REAL_ID_LOOKUP,
      ],
      '旧 REAL ID FAQ 仍写升级费 $20，而 2025 年 9 月 1 日生效的当前 license fee 表把 duplicate 和 corrected license 都列为 $30，付款前应以当前费用表和交易报价再次确认': [
        MD_REAL_ID_FAQ,
        MD_FEES,
      ],
      '当前费用表列出普通驾照续期 $64 并对应最长 8 年，新申请人 21 岁及以上为 $88 或按每年 $11 计费': [
        MD_FEES,
      ],
      '当前费用表列出 Photo ID 新办或续期 $40、补发或更正 $30，65 岁及以上或有影响 major life activity 的 disability 可免 ID card fee': [
        MD_FEES,
      ],
      'limited-term driver license 的有效期只覆盖获准在美国停留的期限，费用会按该期限调整': [
        MD_FEES,
      ],
      '普通续期最多可提前一年，limited-term、过期至少一年或不符合线上和邮寄资格的人要到 MVA 办理': [
        MD_RENEW,
      ],
      '40 岁及以上续期需要两年内的 vision exam，邮寄续期只适用于收到相应通知的人并应至少提前 15 天寄出': [
        MD_RENEW,
      ],
      '续期后的卡通常在 7 至 10 个工作日寄出，45 天仍未收到时应联系 MVA 或通过 myMVA 申请 gratis product': [
        MD_RENEW,
      ],
      '普通补证不要求 police report，duplicate 会保留原 license number 和 expiration date，线上或 kiosk 申请后最多预留 10 个工作日收件': [
        MD_REPLACE,
      ],
      'Maryland 要求搬家后 30 天内更新驾照或 ID 地址，单纯更新记录免费并会寄出 Change of Address card，选择重印实体卡则要付 replacement fee': [
        MD_UPDATE,
        MD_FEES,
      ],
      '姓名变更要先在 SSA 更新并至少等待 72 小时，再带原件或认证的姓名变更文件预约到 MVA 办理': [
        MD_UPDATE,
      ],
      'Maryland 非商业 Class C knowledge test 有繁体中文，限时 20 分钟并要求至少 88% 才能通过': [
        MD_TESTS,
      ],
      '第一次 knowledge test 失败后最早可在下一个工作日重考，第二次及以后失败要等待至少 7 个日历日': [
        MD_TESTS,
      ],
      'Maryland learner permit 的最低申请年龄是 15 岁 9 个月，申请前应从 myMVA 完成 pre-application 并预约 full-service MVA office': [
        MD_PERMIT,
      ],
      '所有新驾驶人都要完成 30 小时课堂和 6 小时 behind-the-wheel 的 Maryland Driver Education Program': [
        MD_DRIVER_ED,
        MD_PROVISIONAL,
      ],
      '25 岁及以上首次驾驶人取得 permit 后至少等待 45 天，并完成 14 小时 supervised practice，其中 3 小时在夜间': [
        MD_PROVISIONAL,
      ],
      '持外国驾照转入通常要完成 3-Hour Roadway Safety Program、视力检查、knowledge test 和 skills test，符合互惠协议时才可能免除两项驾驶考试': [
        MD_INTERNATIONAL,
      ],
      'Maryland 与韩国、法国、德国、台湾和日本有非商业 Class C 驾照互惠协议，申请人仍要满足年龄、材料、视力、三小时课程和证件有效期条件': [
        MD_INTERNATIONAL,
      ],
      '没有有效 USCIS 文件的人可能申请 federally noncompliant license 或 ID，但要先有连续两年 Maryland income tax filing 并取得 Comptroller tax certification letter': [
        MD_NONCOMPLIANT,
      ],
      'federally noncompliant credential 不能代替 REAL ID 或其他 TSA 接受证件用于联邦身份用途': [
        MD_NONCOMPLIANT,
        TSA_IDENTIFICATION,
      ],
      '新居民如果有车辆，也要在搬入后 60 天内完成 Maryland title 和 registration，逾期会失去外州 titling tax credit 并可能收到 citation': [
        MD_TRANSFER_VEHICLE,
      ],
      '先用 REAL ID Lookup 判断 MVA 是否已收齐自己的文件，再用 Online Document Guide 生成与个人身份和业务对应的清单': [
        MD_REAL_ID_LOOKUP,
        MD_REAL_ID_FAQ,
      ],
      '年龄与身份文件应使用原件或签发机关认证件，普通 photocopy、手机照片和 digital scan 不被接受': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
        MD_TRANSFER_LICENSE,
      ],
      '美国公民常见的年龄与身份证明包括签发机关认证的出生证或有效美国 passport，非公民要按当前身份选择相应 lawful-status 文件': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
        MD_ID_CARD,
      ],
      'Social Security 材料要按 Online Document Guide 和个人通知准备，不要只凭旧 FAQ 推断可接受的文件或时效': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
        MD_RENEW,
      ],
      '准备两份印有本人姓名和 Maryland physical address 的住址材料，姓名与地址要和 MVA 记录一致': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
        MD_TRANSFER_LICENSE,
      ],
      '出生证或其他身份文件姓名与当前姓名不一致时，要用 marriage certificate、divorce decree 或 court order 串起完整变更历史': [
        MD_REAL_ID_FAQ,
        MD_UPDATE,
      ],
      '临时或其他非公民身份申请人应准备可由 DHS SAVE 核验的当前移民文件，证件期限可能受 lawful stay 限制': [
        MD_INTERNATIONAL,
        MD_ID_CARD,
        MD_FEES,
      ],
      '新居民应带当前外州驾照并在现场交回，卡片缺失时要提供原签发州出具且不超过 30 天的 certified driving record': [
        MD_TRANSFER_LICENSE,
      ],
      '40 岁及以上续期人的 vision exam 必须在两年内，并由 MVA-approved provider 电子提交或按邮寄表格完成': [
        MD_RENEW,
      ],
      '非英文外国驾照要附 international driver license 或 MVA approved translator 的英文翻译，遗失外国驾照时还要准备带 apostille 的 driving record 或使馆证明信': [
        MD_INTERNATIONAL,
      ],
      '因为卡上有星标或看到全州 99% 以上合规率，就跳过个人 REAL ID Lookup': [
        MD_LICENSES_IDS,
        MD_REAL_ID_LOOKUP,
        MD_REAL_ID_FAQ,
      ],
      '只带一份 Maryland 地址证明，或两份文件上的姓名和地址与 MVA 记录不一致': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
      ],
      '携带 photocopy、手机照片或自行公证件，误以为它们等同于签发机关认证副本': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
      ],
      '改过多次姓名却只带最近一次文件，无法连接出生姓名到 current legal name': [
        MD_REAL_ID_FAQ,
        MD_UPDATE,
      ],
      '沿用旧 REAL ID FAQ 或费用页下方旧表中的 $20 金额，没有查看 2025 年 9 月 1 日生效的当前 license fee 表': [
        MD_REAL_ID_FAQ,
        MD_FEES,
      ],
      '驾照过期至少一年仍尝试普通续期，忽略此时要按新申请人重新完成 vision、knowledge 和 skills tests': [
        MD_RENEW,
      ],
      '只向 USPS 提交转寄，没有先更新 MVA 地址，导致实体卡寄往旧地址且无法被 USPS forward': [
        MD_RENEW,
        MD_REPLACE,
      ],
      '外州新居民走 Maryland 普通续期入口，错过普通驾照 60 天或 CDL 30 天的转入期限': [
        MD_TRANSFER_LICENSE,
      ],
      '持非英文外国驾照却没有 approved translation 或 international driver license，也没有先完成三小时道路安全课程': [
        MD_INTERNATIONAL,
      ],
      '来自互惠国家就默认任何过期驾照都能免试，没有核对国家、证件过期时间和 surrender 规则': [
        MD_INTERNATIONAL,
      ],
      '把 federally noncompliant license 或 ID 当作 REAL ID，用它规划国内航班或进入需要联邦合规身份证件的设施': [
        MD_NONCOMPLIANT,
        TSA_IDENTIFICATION,
      ],
      '只处理驾照而漏掉车辆 title 和 registration 的 60 天期限，因而失去外州 titling tax credit 或面临 citation': [
        MD_TRANSFER_VEHICLE,
      ],
      '先判断业务属于 REAL ID 补材料、续期、补证、资料更正、首次驾照、外州转入还是外国驾照转入，不要混用入口': [
        MD_LICENSES_IDS,
        MD_NEW_RESIDENTS,
        MD_INTERNATIONAL,
      ],
      '涉及 REAL ID 时先运行 REAL ID Lookup，再根据结果打开 Online Document Guide，而不是直接照抄通用材料示例': [
        MD_REAL_ID_LOOKUP,
        MD_REAL_ID_FAQ,
      ],
      '逐项核对年龄与身份、Social Security、两份 residency、lawful status 和完整姓名链，并只准备原件或签发机关认证件': [
        MD_REAL_ID_FAQ,
        MD_DOCUMENT_REQUIREMENTS,
        MD_INTERNATIONAL,
      ],
      '姓名已变化时先完成 SSA 更新并等待至少 72 小时，再预约 MVA correction': [
        MD_UPDATE,
      ],
      '外州新居民从 myMVA 选择 New to Maryland appointment，普通驾照在 60 天内办理并按需把 license、title 和 registration 合并到一次预约': [
        MD_NEW_RESIDENTS,
      ],
      '普通续期、补证或地址更新先登录 myMVA 检查线上资格，并以 renewal notice 和账户提示为准': [
        MD_RENEW,
        MD_REPLACE,
        MD_UPDATE,
      ],
      '首次驾照申请人先取得 learner permit、完成 Driver Education 和规定练车时数，再预约 skills test': [
        MD_PERMIT,
        MD_DRIVER_ED,
        MD_PROVISIONAL,
        MD_TESTS,
      ],
      '需要考试时先确认 knowledge test 语言、等待期和车辆材料，繁体中文只适用于 noncommercial Class C knowledge test': [
        MD_TESTS,
      ],
      '付款前打开当前 License & ID Fees 表并查看实际交易报价，尤其不要把旧 FAQ 的 $20 当作现行 duplicate 或 corrected fee': [
        MD_FEES,
        MD_REAL_ID_FAQ,
      ],
      '交易完成后保留 receipt，并用 Product Tracking Tool 跟踪邮寄卡片，超过官方时限再联系 MVA': [
        MD_RENEW,
        MD_REPLACE,
      ],
      '有车的新居民同时安排 Maryland insurance、title、registration 和可能需要的 safety inspection，不要只完成驾照换领': [
        MD_TRANSFER_VEHICLE,
      ],
    },
  },
  virginia: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      VA_REAL_ID,
      VA_REAL_ID_FAQ,
      VA_DOCUMENT_GUIDE,
      VA_APPLY,
      VA_ELIGIBILITY,
      VA_RENEW,
      VA_REPLACE,
      VA_REPLACE_ONLINE,
      VA_UPDATE,
      VA_NEW_RESIDENT,
      VA_KNOWLEDGE,
      VA_ROAD_TEST,
      VA_PERMIT,
      VA_FOREIGN,
      VA_PRIVILEGE,
      VA_LEGAL_PRESENCE,
      VA_FEES,
      VA_APPOINTMENTS,
      VA_TRACK,
      VA_ONLINE,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Virginia DMV 的 REAL ID、材料表、驾照申请与资格、续期补证、姓名地址、新居民、knowledge 和 road tests、permit、外国驾照、Driver Privilege Card、legal presence、费用、预约与寄送正文。',
    notes:
      '重写 Virginia 总览与 REAL ID 页面，补齐 30/60 天、2027 年训练变化、中文考试、六国互惠与 Taiwan 特例、EAD I-766 限制和 2026 Driver Privilege Card 续期提示；所有声明已改为显式来源，仍待真实人工签字。',
    claims: {
      'Virginia REAL ID 是自愿升级，Standard license 仍可驾驶、投票和办理多数日常事务，但国内航班或特定联邦设施要改用 REAL ID 或 TSA 接受的其他身份证件': [
        VA_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '首次申请 Virginia REAL ID 要到 DMV customer service center，带一份 identity、两份 Virginia residency、一份 legal presence、Social Security 信息和适用的姓名变更链，并支付一次性 $10 REAL ID fee 加当前驾照或 ID 交易费': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
      ],
      '新居民要在搬入 Virginia 后 60 天内取得普通驾照，现有 CDL 要在 30 天内转入': [
        VA_NEW_RESIDENT,
        VA_ELIGIBILITY,
      ],
      '车辆 title 和 registration 采用另一条 30 天期限，不要和驾照期限混用': [
        VA_NEW_RESIDENT,
      ],
      'DMV 提供 50 多项线上交易，必须到场时可选周一至周五 appointment、同日 e-ticket 或营业时间内 walk-in': [
        VA_APPOINTMENTS,
        VA_ONLINE,
      ],
      'Knowledge 和 road skills walk-in 申请人要在周一至周五 4:30 p.m. 前或周六 11:30 a.m. 前到场': [
        VA_KNOWLEDGE,
        VA_ROAD_TEST,
      ],
      'Virginia REAL ID 可以先在线开始申请，但 DMV 不提供在家预扫或上传文件的流程，声称能代传 REAL ID 文件的网站不属于 Virginia DMV': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
      ],
      '从其他州搬入后，原州 REAL ID 不会自动转成 Virginia REAL ID，仍要按 Virginia 首次 REAL ID 路径提交材料': [
        VA_REAL_ID,
      ],
      '首次 REAL ID 必须本人到场，取得首张 REAL ID 后才可能按普通续期周期在线续办': [
        VA_REAL_ID_FAQ,
      ],
      '当前 REAL ID 一次性附加费是 $10，普通 8 年驾照为 $32，普通 replacement license 为 $20': [
        VA_REAL_ID,
        VA_APPLY,
        VA_REPLACE,
        VA_FEES,
      ],
      'REAL ID 身份材料必须是原件，允许清单内 online residency document 的打印件，但不接受 temporary documents 或普通 photocopies': [
        VA_REAL_ID,
        VA_DOCUMENT_GUIDE,
      ],
      '有效且姓名一致的美国 passport 或 passport card 可以同时覆盖 identity 和 legal presence，不一定必须使用出生证': [
        VA_REAL_ID_FAQ,
        VA_DOCUMENT_GUIDE,
      ],
      '有多次姓名变化时要为每一次变化提供 certified marriage certificate、divorce decree、court order 或 adoption record，形成完整姓名链': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
      ],
      '知道自己的 SSN 且 DMV 能电子核验时可以不出示纸质 SSN proof，CDL 申请人仍要按专用要求准备 Social Security 文件': [
        VA_REAL_ID,
        VA_ELIGIBILITY,
      ],
      'Virginia legal presence 页面明确不把 Employment Authorization Document I-766 单独接受为 REAL ID legal-presence proof，持有人应按身份表寻找其他可接受文件': [
        VA_LEGAL_PRESENCE,
      ],
      'temporary authorized applicant 的 REAL ID 有效期通常跟随 authorized stay，没有明确结束日时为一年，申请日剩余合法停留少于 30 天则不能取得 REAL ID permit': [
        VA_APPLY,
        VA_PERMIT,
      ],
      '普通驾照最多可提前一年续期，线上或邮寄通常只能隔一个 renewal cycle 使用一次，下一周期要本人到场更新照片和视力': [
        VA_RENEW,
      ],
      '普通续期后的卡最多预留 15 天邮寄，75 岁及以上的 renewed license 通常有效 5 年而不是 8 年': [
        VA_RENEW,
      ],
      'Virginia 驾照过期超过一年后不能走普通续期，要重考 vision、two-part knowledge 和 road skills': [
        VA_RENEW,
      ],
      '普通 replacement license 为 $20、replacement permit 为 $2，线上补证会沿用现有照片且新卡通过邮件寄送': [
        VA_REPLACE,
        VA_FEES,
      ],
      'USPS 不会转寄 Virginia license 或 ID，线上补证和续期前都应先确认 DMV 记录地址，并至少预留 15 天收件': [
        VA_REPLACE_ONLINE,
        VA_RENEW,
      ],
      '搬到新的 Virginia residence 后 30 天内要更新 DMV 地址，residence address 不能只填 P.O. box 或 business address': [
        VA_UPDATE,
      ],
      '姓名变更可先在线开始，但要带原始 marriage certificate、divorce decree 或 court order 到 customer service center 完成': [
        VA_UPDATE,
      ],
      'Knowledge exam 第一部分 10 道 road sign 必须全对，第二部分 30 道 general knowledge 至少答对 24 道': [
        VA_KNOWLEDGE,
      ],
      'Virginia knowledge exam 提供 Chinese/Mandarin 和 Chinese/Mandarin Traditional，CDL HAZMAT knowledge exam 例外为 English only': [
        VA_KNOWLEDGE,
      ],
      '未满 18 岁 knowledge exam 失败后要完整等待 15 天，18 岁及以上同一天只能考一次，任何年龄三次失败都要先完成规定课程': [
        VA_KNOWLEDGE,
      ],
      'Road skills test 在道路上以英语进行，需要语言协助时可自带至少 18 岁且持有效美国驾照的 translator 或 interpreter': [
        VA_ROAD_TEST,
      ],
      'Road test 自备车辆要有有效 safety inspection sticker、plates、registration card 和可工作的制动、安全带、喇叭、灯、转向灯、后视镜与 speedometer': [
        VA_ROAD_TEST,
      ],
      'Virginia learner permit 最低年龄是 15 岁 6 个月，普通驾照最低年龄是 16 岁 3 个月': [
        VA_ELIGIBILITY,
        VA_PERMIT,
      ],
      '在 2027 年 1 月 1 日之前，18 岁及以上从未持证者可选择持 permit 至少 60 天或在持 permit 时完成州批准驾驶教育': [
        VA_APPLY,
        VA_ELIGIBILITY,
        VA_PERMIT,
      ],
      '从 2027 年 1 月 1 日起，18 至 20 岁从未持证者要持 permit 至少 90 天并完成州批准驾驶教育，21 岁及以上仍保留 60 天或驾驶教育二选一': [
        VA_APPLY,
        VA_ELIGIBILITY,
        VA_PERMIT,
      ],
      'Virginia 的外国驾照互惠国家包括 Canada、France、Germany、Japan、South Korea 和 Taiwan，但 Taiwan 申请人仍要通过 vision 和 two-part knowledge exam': [
        VA_FOREIGN,
      ],
      'France、Germany、Japan、South Korea 和 Taiwan 驾照要先提交 DL 7 和驾照副本供 DMV 核验，验证最长可能需要 15 天，Canada 不走这一步': [
        VA_FOREIGN,
      ],
      '非互惠国家的有效外国驾照持有人通常要通过 two-part knowledge、road skills 和 vision，但可接受的外国驾照可能免 60 天 permit 和 driver education': [
        VA_FOREIGN,
      ],
      '不能满足 standard license legal-presence 要求的非美国公民可能申请 Driver Privilege Card，但要有过去 12 个月 Virginia-source income 或作为 Virginia tax return dependent 的记录': [
        VA_PRIVILEGE,
        VA_LEGAL_PRESENCE,
      ],
      'Driver Privilege Card 不是 REAL ID、不能用于相应联邦身份用途或申请 CDL，当前新办和续期均为 $50': [
        VA_PRIVILEGE,
        VA_FEES,
        TSA_IDENTIFICATION,
      ],
      '续办 2026 年 7 月 1 日前签发的 Driver Privilege Card 时要本人到场更新照片，并在适用时完成 vision screening': [
        VA_PRIVILEGE,
      ],
      '先用 Virginia DMV Online Document Guide 按 REAL ID、Standard license 或 Driver Privilege Card 生成对应清单，不要混用三套要求': [
        VA_REAL_ID,
        VA_DOCUMENT_GUIDE,
        VA_PRIVILEGE,
      ],
      'REAL ID 核心材料是 one identity、one legal presence、two Virginia residency、SSN 信息和适用的 certified name-change documents': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
        VA_DOCUMENT_GUIDE,
      ],
      '所有身份与 legal-presence 文件使用原件，普通 photocopy 和 temporary document 不被接受': [
        VA_REAL_ID,
        VA_DOCUMENT_GUIDE,
        VA_ELIGIBILITY,
      ],
      '清单明确接受的在线账单或其他 online residency document 可以打印后作为住址证明，但仍要准备两份': [
        VA_REAL_ID,
        VA_DOCUMENT_GUIDE,
      ],
      '两份 Virginia residency 文件要显示当前 residential street address，P.O. box 只能作为额外 mailing address，不能取代 residence address': [
        VA_APPLY,
        VA_DOCUMENT_GUIDE,
        VA_UPDATE,
      ],
      '文件上的姓名要使用 full legal name，不能用 nickname 或缩写，姓名不同就补齐每一段 certified change record': [
        VA_REAL_ID,
        VA_UPDATE,
        VA_DOCUMENT_GUIDE,
      ],
      '已经签发 SSN 的申请人要提供号码，DMV 能电子核验时可能免纸质证明，没有 SSN 的情形按 Document Guide 分流': [
        VA_REAL_ID,
        VA_ELIGIBILITY,
        VA_DOCUMENT_GUIDE,
      ],
      'temporary authorized applicant 要按当前身份准备 legal-presence 文件，EAD I-766 本身不能单独证明 REAL ID legal presence': [
        VA_LEGAL_PRESENCE,
      ],
      '外州换证应带 current out-of-state license，新居民同时申请 REAL ID 时仍要补齐 Virginia REAL ID 全套文件': [
        VA_ELIGIBILITY,
        VA_REAL_ID,
      ],
      '互惠外国驾照申请人先提交 DL 7 与清晰驾照副本，收到 approval letter 后再带身份、legal presence、两份住址、SSN 和 current foreign license 到 DMV': [
        VA_FOREIGN,
      ],
      'Driver Privilege Card 采用另一套材料，要有 two identity、two Virginia residency、SSN 或 ITIN、tax return documentation，并为外文文件附 professional translator 的 certified English translation': [
        VA_PRIVILEGE,
      ],
      '把在线 start application 误解成上传材料，把 passport、出生证或 SSN 图片交给声称能代办 REAL ID 的第三方网站': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
      ],
      '已有其他州 REAL ID 就以为换成 Virginia 驾照时可以跳过首次 REAL ID 材料核验': [
        VA_REAL_ID,
      ],
      '只带一份 Virginia residency，或用 P.O. box 代替 residential street address': [
        VA_REAL_ID,
        VA_APPLY,
        VA_UPDATE,
      ],
      '带 temporary document、普通 photocopy 或手机照片，忽略 DMV 要求原件和 certified name-change records': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
        VA_DOCUMENT_GUIDE,
      ],
      '文件使用 nickname、缩写或不一致姓名，却没有带完整姓名变更链': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
        VA_UPDATE,
      ],
      '只带 EAD I-766 就认定足够申请 REAL ID，没有核对 Virginia 的 Acceptable Documents by Status': [
        VA_LEGAL_PRESENCE,
      ],
      '把驾照 60 天期限和车辆 30 天期限混为一谈，导致 vehicle title 或 registration 逾期': [
        VA_NEW_RESIDENT,
      ],
      '搬家只向 USPS 更新地址，未在 30 天内改 DMV residence、mailing 和 vehicle registration records': [
        VA_UPDATE,
        VA_REPLACE_ONLINE,
      ],
      '临近到期或旅行才在线续期或补证，没有为不转寄的邮件至少预留 15 天': [
        VA_RENEW,
        VA_REPLACE_ONLINE,
      ],
      '拿 Federal Limits Apply 的 Standard license 去规划国内航班，没有准备 REAL ID、passport 或其他 TSA accepted ID': [
        VA_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '把 Taiwan reciprocity 当成 knowledge test 也免除，或在未取得 DMV verification approval 前直接到场换证': [
        VA_FOREIGN,
      ],
      '非互惠外国驾照持有人直接预约免试换证，没有准备 knowledge、road skills 和 vision tests': [
        VA_FOREIGN,
      ],
      '只看当前 60 天成人 permit 规则，没有注意 2027 年 1 月 1 日起 18 至 20 岁首次申请人改为 90 天加驾驶教育': [
        VA_APPLY,
        VA_ELIGIBILITY,
        VA_PERMIT,
      ],
      'Road skills test 自备车辆缺少 inspection sticker、registration、有效车牌或必要安全设备': [
        VA_ROAD_TEST,
      ],
      '先判断自己是否需要用州证件登机或进入受限联邦设施，有有效 passport 等替代证件时可继续保留 Standard license': [
        VA_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '需要 REAL ID 时只从 Virginia DMV 官方页启动申请，并用 Online Document Guide 生成个人清单，不上传任何证件图片': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
      ],
      '按 identity、legal presence、two residency、SSN 和 full name-change chain 五栏整理原件，再预约或到 customer service center': [
        VA_REAL_ID,
        VA_REAL_ID_FAQ,
        VA_DOCUMENT_GUIDE,
      ],
      '搬家或改名时先完成 30 天地址更新和必要的原始姓名文件核验，再续期、补证或申请 REAL ID': [
        VA_UPDATE,
        VA_RENEW,
        VA_REPLACE,
        VA_REAL_ID,
      ],
      '新居民把普通驾照 60 天、CDL 30 天和车辆 title/registration 30 天分别列入日历，并先处理保险、inspection 和车辆材料': [
        VA_NEW_RESIDENT,
      ],
      '续期先确认是否轮到本人到场，补证先检查线上排除条件，交易后打印 receipt 并预留至少 15 天收件': [
        VA_RENEW,
        VA_REPLACE,
        VA_REPLACE_ONLINE,
      ],
      '首次驾驶人按办理日期和年龄选择 permit 期限，尤其要区分 2027 年 1 月 1 日前后的 18 至 20 岁规则': [
        VA_APPLY,
        VA_ELIGIBILITY,
        VA_PERMIT,
      ],
      'Knowledge test 前用中文或繁体中文资料练习 10 道 signs 全对与 24/30 general knowledge 的通过线': [
        VA_KNOWLEDGE,
      ],
      'Road skills test 前核对 CSMA 140、permit、driver education 或 observation record，以及车辆 inspection、registration 和安全设备': [
        VA_ROAD_TEST,
      ],
      '外国驾照先判断是否属于六个互惠国家，Taiwan 申请人单独准备 knowledge test，其他互惠国家先完成 DL 7 verification': [
        VA_FOREIGN,
      ],
      '无法满足 legal-presence 要求的非美国公民先核对 Driver Privilege Card 的税务、身份和住址条件，不要把它当成 REAL ID': [
        VA_PRIVILEGE,
        VA_LEGAL_PRESENCE,
      ],
      '完成交易后使用 Track Your DMV Products 查看生产和寄送状态，地址错误或 USPS 退件时及时联系 DMV': [
        VA_TRACK,
      ],
    },
  },
  'north-carolina': {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      NC_REAL_ID,
      NC_REAL_ID_REQUIREMENTS,
      NC_REAL_ID_WIZARD,
      NC_NEW_DRIVERS,
      NC_TESTS,
      NC_INTERPRETER,
      NC_SCHOOL_ROAD_TESTS,
      NC_RENEW,
      NC_REPLACE,
      NC_FEES,
      NC_LEGAL_PRESENCE,
      NC_SSN,
      NC_INSURANCE,
      NC_MOVING,
      NC_NEW_RESIDENTS,
      NC_MOVING_WITHIN,
      NC_STATE_TO_STATE,
      NC_APPOINTMENTS,
      NC_OFFICES,
      NC_UPLOAD_UPDATE,
      NC_HANDBOOK,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 NCDMV 的 REAL ID、材料、legal presence、SSN、保险、首次驾照、考试与口译、road test、续期补证、费用、预约、外州证件注销、新居民与 2026 现场上传变化正文。',
    notes:
      '重写 North Carolina 总览与 REAL ID 页面，补齐 60/30 天路线、one-credential 风险、外国驾照与 IDP 边界、不同语言但不保证中文、7 天重考、certified school road test、连续线上续期和 secure upload 适用范围；所有声明已改为显式来源，仍待真实人工签字。',
    claims: {
      'North Carolina REAL ID 完全自愿，Standard license 或 ID 仍可用于驾驶、投票和多数日常事务，但国内航班及部分联邦设施要改用 REAL ID、passport 或 TSA 接受的其他身份证件': [
        NC_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '在 North Carolina 建立 permanent residence 后，计划驾驶者要在 60 天内取得本州驾照，通常应先完成 license/ID，再按就业开始日或原州 reciprocity 期限处理车辆 title/registration，车辆期限通常约 30 天且必须使用 North Carolina insurance': [
        NC_NEW_RESIDENTS,
      ],
      '首次 North Carolina REAL ID 必须到 driver license office，通常要带一份 identity/date of birth、一份显示完整 SSN 的证明、两份当前 North Carolina physical address、适用的 legal presence 与完整姓名变更链，申请驾照还要提供 North Carolina 认可的 liability insurance proof': [
        NC_REAL_ID,
        NC_REAL_ID_REQUIREMENTS,
        NC_INSURANCE,
      ],
      'Driver license office 预约最多提前 7 天，每个工作日释放新名额，收到链接后须在 15 分钟内确认': [
        NC_APPOINTMENTS,
      ],
      '所有 driver license offices 也接收营业时间内 walk-in，直到当日容量满，license plate agency 不提供这类预约，也不能代办驾照或 REAL ID': [
        NC_APPOINTMENTS,
        NC_NEW_DRIVERS,
        NC_OFFICES,
      ],
      '第一张 North Carolina REAL ID 不能在线取得，必须到 driver license office，所需文件会被扫描并永久保存在 NCDMV 记录中，已有 REAL ID 后才可能按续期资格在线办理': [
        NC_REAL_ID,
        NC_RENEW,
      ],
      'North Carolina REAL ID 本身没有额外附加费，到期前 6 个月内升级按 renewal 处理，超过 6 个月则按 $16.75 replacement 处理': [
        NC_REAL_ID,
        NC_REPLACE,
      ],
      '在 renewal window 外升级 REAL ID 要重新拍照但通常不重考，到期前 6 个月内升级则要做 vision test 并重新拍照': [
        NC_REAL_ID,
      ],
      'North Carolina 是 one-credential state，签发新的或 replacement license/ID 后，其他州的 noncommercial license 或 ID 会通过 State-to-State Verification 自动取消': [
        NC_STATE_TO_STATE,
        NC_REAL_ID,
      ],
      '即使只申请 North Carolina state ID，若它成为最近签发的州证件，也可能取消仍在使用的外州驾照，不想取消外州证件就不要完成 North Carolina credential 签发': [
        NC_STATE_TO_STATE,
      ],
      'REAL ID driver license 核心材料是一份 identity/date of birth、一份带 full SSN 的证明、两份 current physical address、适用的 legal presence 与每段姓名变更文件，另加 North Carolina liability insurance': [
        NC_REAL_ID_REQUIREMENTS,
        NC_INSURANCE,
      ],
      'REAL ID identification card 与 REAL ID driver license 的身份、SSN、两份住址、姓名链和 legal presence 规则相近，但 state ID 不要求 liability insurance': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      'Certified birth certificate 的普通 photocopy 不被接受，除非复印件由签发机构认证，美国 digital passport 也不能代替有效实体 passport': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      'REAL ID 的 SSN 证明必须显示 full Social Security number，Social Security card 不接受 photocopy、laminated card 或金属/塑料复制品': [
        NC_REAL_ID_REQUIREMENTS,
        NC_SSN,
      ],
      '1099、W-2 或 payroll record 可作为 REAL ID SSN 证明，但必须显示 full SSN，且姓名要和 identity document 对得上': [
        NC_REAL_ID_REQUIREMENTS,
        NC_SSN,
      ],
      '多次姓名变化要用多份 certified documents 串起每一段，国际 marriage license 要是 original 或 certified，并同时附 Name Change Affidavit': [
        NC_REAL_ID,
        NC_REAL_ID_REQUIREMENTS,
      ],
      'NCDMV 将 legal-presence 文件分成“可办 REAL ID”和“只能办非 REAL ID”两组，I-20、DS-2019、单独 I-94、部分 I-797 等不能因为可办 Standard credential 就自动用于 REAL ID': [
        NC_LEGAL_PRESENCE,
      ],
      '外国 passport 用作 North Carolina REAL ID 文件时，必须有效且未过期，并附有效美国 visa 与 I-94 Arrival/Departure Record': [
        NC_REAL_ID_REQUIREMENTS,
        NC_LEGAL_PRESENCE,
      ],
      '首次申请 driver license 的 liability insurance 必须来自获准在 North Carolina 营业的保险公司，并在证明上列出每位申请驾驶人，learner permit 不要求该保险证明': [
        NC_NEW_DRIVERS,
        NC_REAL_ID_REQUIREMENTS,
        NC_INSURANCE,
      ],
      '当前 NCDMV 允许带纸质保险证明，或在 driver license office 由工作人员引导安全上传 digital copy，直接展示普通手机图片不是同一办理路径': [
        NC_INSURANCE,
        NC_NEW_DRIVERS,
        NC_UPLOAD_UPDATE,
      ],
      '2026 年启用的 in-office upload tool 目前用于保险和住址材料，不能据此把 identity、SSN、legal presence 或姓名文件都改成手机照片': [
        NC_UPLOAD_UPDATE,
        NC_REAL_ID_REQUIREMENTS,
        NC_LEGAL_PRESENCE,
        NC_SSN,
      ],
      '18 岁及以上首次申请普通驾照者要本人到 driver license office，并完成 written knowledge、traffic signs、vision 和 driving skills 四类测试': [
        NC_NEW_DRIVERS,
        NC_TESTS,
      ],
      '普通 Class C knowledge 或 driving test 未通过后，要等 7 个 calendar days 才能重考': [
        NC_TESTS,
      ],
      '官方只说明 written knowledge test 提供不同语言并可按请求安排 oral test，没有在该页公开逐项语言清单，不要在未确认考点前保证一定有中文版本': [
        NC_TESTS,
      ],
      '不熟悉英语的居民可在线或致电 (919) 715-7000 请求 language interpreter 协助 DMV transaction，但该服务说明不等于允许口译员代译考试答案': [
        NC_INTERPRETER,
        NC_TESTS,
      ],
      '持 learner permit 的成人和申请 Level 2 的青少年可选择 NCDMV certified driver education school 完成 road test，学校自行定价，之后仍要到 NCDMV 完成最终发证交易': [
        NC_SCHOOL_ROAD_TESTS,
        NC_NEW_DRIVERS,
      ],
      '首次办证后会收到 60-day Temporary Driving Certificate，正式卡通常在 20 个 business days 内寄到，临时证只可用于驾驶，不能当作 photo identification': [
        NC_NEW_DRIVERS,
        NC_HANDBOOK,
      ],
      '普通 Class C 驾照当前为 $6.50 per year，18 至 65 岁通常签发 8 年，按现行费率合计 $52，66 岁及以上通常 5 年，合计 $32.50': [
        NC_FEES,
        NC_NEW_DRIVERS,
        NC_HANDBOOK,
      ],
      'Adult learner permit 当前为 $25.50，duplicate license/ID 为 $16.75，PayIt 线上交易另收每笔 $3 加 1.85% card processing fee': [
        NC_FEES,
        NC_REPLACE,
        NC_HANDBOOK,
      ],
      'Non-REAL ID license/ID 目前可连续两次 online renewal，REAL ID 要连续第二次线上续期，则上次续期后须有一次本人到场并拍新照片的交易': [
        NC_RENEW,
      ],
      '有美国政府签发的 legal-presence document、驾照暂停或欠款、普通 Class A/B、CDL、learner permit 或特定 restriction 的人不能走普通 online renewal': [
        NC_RENEW,
      ],
      '线上 replacement 要求 credential 仍为 active、NCDMV 照片不超过 5 年并知道 DL/ID number，持 legal-presence document、要首次升级 REAL ID、被暂停或欠款者须到场': [
        NC_REPLACE,
      ],
      '姓名变化后 60 天内要通知 NCDMV，先到 Social Security Administration 更新并至少等待 24 小时，再带 certified name-change proof 到 driver license office': [
        NC_REPLACE,
        NC_MOVING_WITHIN,
      ],
      'North Carolina 州内搬家后 60 天内要更新 physical address，并取得 replacement license/ID 与 replacement vehicle registration card，当前费用分别为 $16.75 和 $25.50': [
        NC_MOVING,
        NC_MOVING_WITHIN,
        NC_REPLACE,
      ],
      '新居民持有效其他美国州驾照时，written 和 road tests 可能获免，官方没有对外国驾照作同样免试承诺，不应预设外国驾照可直接换领': [
        NC_NEW_RESIDENTS,
        NC_NEW_DRIVERS,
        NC_TESTS,
      ],
      '在 North Carolina 合法驾驶需要美国州或其他国家政府签发的有效驾照，International Driving Permit 或所谓 international driver license 本身不被 North Carolina 执法机关承认为驾照': [
        NC_NEW_RESIDENTS,
      ],
      '新居民要先取得 North Carolina license/ID，再办理车辆，车辆登记通常要在开始 gainful employment 或原州 reciprocity 期限届满时完成，通常约 30 天，且不接受外州保险': [
        NC_NEW_RESIDENTS,
      ],
      '新居民首次登记车辆可以先不做 North Carolina inspection，但下一次 renewal 前必须完成检查': [
        NC_NEW_RESIDENTS,
      ],
      '先用 NCDMV REAL ID Document Wizard 生成个人清单，再回到 Requirements 页面逐项核对，向导结果不能替代柜台最终审核': [
        NC_REAL_ID_WIZARD,
        NC_REAL_ID_REQUIREMENTS,
      ],
      '按 identity/date of birth、full SSN、two residency、legal presence、name changes 和 liability insurance 六栏整理，state ID 不需要最后一栏': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      '所有文件都使用一致的 full legal name，不一致时先列出从出生姓名到当前姓名的完整变化顺序': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      '出生证明使用 issuing agency 签发的 certified copy，不带普通 photocopy，passport 使用有效实体证件而不是 digital version': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      'SSN 栏优先准备未覆膜的原始 Social Security card，或显示 full SSN 的 1099、W-2、payroll record': [
        NC_SSN,
        NC_REAL_ID_REQUIREMENTS,
      ],
      '两份 residency 都要显示当前 North Carolina physical address，可用政府文件、utility/cable bill、lease、mortgage、tax、preprinted financial statement、school record 等官方认可材料': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      'Driver license 的保险证明应显示申请人姓名、policy number、effective/expiration dates，并确认 insurer 获准在 North Carolina 营业': [
        NC_INSURANCE,
      ],
      '忘带保险或住址打印件时，只使用柜台提供的 secure upload 流程，不要把身份证明或移民文件上传给来历不明的链接': [
        NC_INSURANCE,
        NC_UPLOAD_UPDATE,
        NC_REAL_ID_REQUIREMENTS,
        NC_LEGAL_PRESENCE,
      ],
      '非美国公民申请 REAL ID 时，按 REAL ID legal-presence 清单准备 I-551、I-766、合规 foreign passport/visa/I-94 或其他列明文件': [
        NC_REAL_ID_REQUIREMENTS,
        NC_LEGAL_PRESENCE,
      ],
      '学生、交换访问者或其他临时身份先比较 legal-presence 页面两张表，能办 Standard credential 的 I-20、DS-2019 或 I-94 组合不一定能办 REAL ID': [
        NC_LEGAL_PRESENCE,
      ],
      '国际 marriage license 要有 raised seal 或 certifying ink stamp，并附 NCDMV Name Change Affidavit，多次改名继续补齐每一段文件': [
        NC_REAL_ID,
        NC_REAL_ID_REQUIREMENTS,
      ],
      '新居民带 current out-of-state license，另准备 SSN、North Carolina physical address、适用的 legal presence 和本州 liability insurance，同时申请 REAL ID 时仍要补足两份住址等升级材料': [
        NC_NEW_RESIDENTS,
        NC_NEW_DRIVERS,
        NC_REAL_ID_REQUIREMENTS,
        NC_INSURANCE,
      ],
      '先判断自己是否确实需要州证件用于国内航班或受限联邦设施，已有有效 passport 时，可继续使用 Standard license 并避免不必要的升级交易': [
        NC_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '需要第一张 REAL ID 时只从 NCDMV 官方页面进入 Document Wizard，并确认选择的是 driver license office 而不是 license plate agency': [
        NC_REAL_ID,
        NC_REAL_ID_WIZARD,
        NC_APPOINTMENTS,
        NC_OFFICES,
      ],
      '把 identity、full SSN、two physical-address proofs、legal presence、name chain 与 insurance 分栏，到场前逐项核对姓名和地址': [
        NC_REAL_ID_REQUIREMENTS,
        NC_INSURANCE,
      ],
      '非美国公民先在 legal-presence 页面判断文件属于 REAL ID 组还是 Standard-only 组，不根据签证类别自行推断': [
        NC_LEGAL_PRESENCE,
      ],
      '准备 North Carolina liability insurance 的纸质证明，临时忘带时只按柜台工作人员给出的 secure upload 流程操作': [
        NC_INSURANCE,
        NC_UPLOAD_UPDATE,
      ],
      '预约时选 First Time、Duplicate、Renewal 或 ID Card 对应业务，并在收到确认链接后 15 分钟内确认，没有名额时可评估 walk-in 容量': [
        NC_APPOINTMENTS,
      ],
      '新居民把 license 60 天和 vehicle registration 通常约 30 天分别记入日历，先取得 license/ID，再处理 North Carolina insurance、title 和 registration': [
        NC_NEW_RESIDENTS,
      ],
      '首次考试前按 knowledge、traffic signs、vision、road skills 四项准备，需要语言帮助时先向考点确认实际语言，并单独申请 transaction interpreter': [
        NC_TESTS,
        NC_INTERPRETER,
      ],
      '已经持成人 learner permit 时，可比较 NCDMV office 与 certified driver education school 的 road test 时间和价格，完成后仍回 NCDMV 办最终证件': [
        NC_SCHOOL_ROAD_TESTS,
        NC_NEW_DRIVERS,
      ],
      '完成交易后保留 60-day Temporary Driving Certificate，但另备 passport 等 photo ID，并为正式卡预留 20 个 business days': [
        NC_NEW_DRIVERS,
        NC_HANDBOOK,
        TSA_IDENTIFICATION,
      ],
      '续期或补证前先看 online eligibility，legal-presence、REAL ID 首次升级、暂停欠款或特殊 class/restriction 直接安排 office visit': [
        NC_RENEW,
        NC_REPLACE,
      ],
      '搬家或改名后在 60 天内更新，改名先完成 SSA 记录并等待至少 24 小时，再到 NCDMV 办 replacement': [
        NC_MOVING_WITHIN,
        NC_REPLACE,
      ],
      '以为第一次 REAL ID 可以在线申请，或在线续期时顺便上传文件完成首次升级': [
        NC_REAL_ID,
        NC_RENEW,
      ],
      '只带一份 North Carolina residency，或者材料显示 mailing address 而不是 current physical address': [
        NC_REAL_ID_REQUIREMENTS,
      ],
      '把 license plate agency 当成 driver license office，预约后才发现不能办理驾照、ID 或 REAL ID': [
        NC_APPOINTMENTS,
        NC_OFFICES,
      ],
      '把 2026 in-office upload tool 理解为所有证件都可用手机照片，缺少身份、SSN、legal presence 或姓名文件原件': [
        NC_UPLOAD_UPDATE,
        NC_REAL_ID_REQUIREMENTS,
        NC_LEGAL_PRESENCE,
        NC_SSN,
      ],
      'SSN 文件只显示 last four digits，或带 laminated Social Security card、普通 photocopy 和复制品': [
        NC_SSN,
        NC_REAL_ID_REQUIREMENTS,
      ],
      '当前姓名和 birth certificate、passport 或 SSN 文件不一致，却没有带完整 certified name-change chain': [
        NC_REAL_ID,
        NC_REAL_ID_REQUIREMENTS,
        NC_SSN,
      ],
      '持 I-20、DS-2019、单独 I-94 或部分 I-797 就认定一定符合 REAL ID，没有先看 legal-presence 的两组文件': [
        NC_LEGAL_PRESENCE,
      ],
      '直接向柜员展示保险截图，却没有纸质证明，也没有使用办公室提供的 secure upload 流程': [
        NC_INSURANCE,
        NC_UPLOAD_UPDATE,
        NC_NEW_DRIVERS,
      ],
      '看到“different languages”就断言某个考点一定提供中文，或把 transaction interpreter 当成可以代答或代译考试': [
        NC_TESTS,
        NC_INTERPRETER,
      ],
      '把 International Driving Permit 当作独立驾照，忽略 North Carolina 要求有效政府签发的国内或外国驾照': [
        NC_NEW_RESIDENTS,
      ],
      '把外州驾照的 possible test waiver 套到外国驾照上，未准备 knowledge、sign、vision 和可能的 road test': [
        NC_NEW_RESIDENTS,
        NC_NEW_DRIVERS,
        NC_TESTS,
      ],
      '持有 legal-presence document 仍直接尝试 online renewal 或 replacement，没有预留本人到场时间': [
        NC_RENEW,
        NC_REPLACE,
      ],
      '把 60-day Temporary Driving Certificate 当成可登机或开户的 photo ID，正式卡未到又没有其他身份证件': [
        NC_NEW_DRIVERS,
        NC_HANDBOOK,
        TSA_IDENTIFICATION,
      ],
      '把驾照 60 天期限和车辆通常约 30 天的期限混在一起，或用外州 insurance 去办 North Carolina registration': [
        NC_NEW_RESIDENTS,
      ],
      '外州学生只为银行或住房申请 North Carolina ID，却没意识到新签发 ID 可能自动取消仍要驾驶使用的外州 license': [
        NC_STATE_TO_STATE,
      ],
    },
  },
  michigan: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      MI_REAL_ID,
      MI_LICENSE_ID,
      MI_FIRST_TIME,
      MI_SOS428,
      MI_NEW_RESIDENTS,
      MI_DOCUMENT_REQUIREMENTS,
      MI_NEW_DRIVERS,
      MI_RENEW,
      MI_REPLACE,
      MI_ADDRESS,
      MI_LICENSE_FAQ,
      MI_APPOINTMENTS,
      MI_ENHANCED,
      MI_FOREIGN_TABLE,
      MI_FOREIGN_GUIDANCE,
      MI_MANUAL,
      MI_LANGUAGE,
      MI_DRIVER_TESTING,
      MI_ONLINE_TEST,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Michigan SOS 的 REAL ID、Standard/Enhanced 区别、首次与外州转入、材料、SAVE、外国驾照 treaty 规则、成人考试、TIP、路考、续期补证、费用、地址、预约和邮件状态正文。',
    notes:
      '重写 Michigan 总览与 REAL ID 页面，补齐首次申请默认 REAL ID 与已有证件转换的分流、SSA-L676 官方冲突、中国大陆/台湾 treaty 差异、线上知识考试、第三方路考、连续远程续期和新居民路径；所有声明已改为显式来源，仍待真实人工签字。',
    claims: {
      '密歇根驾照和州 ID 由 Secretary of State 管理，办事前先区分 Standard、REAL ID-compliant 与 Enhanced 三类证件，再判断自己是首次申请、外州转入、续期、补证还是已有标准证件升级': [
        MI_LICENSE_ID,
        MI_REAL_ID,
        MI_FIRST_TIME,
        MI_RENEW,
        MI_REPLACE,
      ],
      'Michigan license/ID 通常每 4 年在生日到期，可提前 1 年至到期后 4 年办理续期，但线上、邮寄或 self-service station 资格因照片、合法居留、既往续期方式和证件状态而异，多数居民约每 12 年仍需本人到场更新照片，驾驶人还要做视力检查': [
        MI_LICENSE_ID,
        MI_RENEW,
      ],
      'Michigan REAL ID 完全自愿，Standard license 或 ID 仍可用于驾驶和多数州内身份用途，但国内航班及受限联邦设施要使用带合规标志的 REAL ID、自动合规的 Enhanced credential、passport 或 TSA 接受的其他证件': [
        MI_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'Secretary of State office 可提前最多 6 个月预约，未预约到场者会被安排下一个可用时段，可能是当天稍后或下一个工作日，因此首次办证、REAL ID 转换和姓名更正宜先预申请并预约': [
        MI_APPOINTMENTS,
        MI_FIRST_TIME,
        MI_REAL_ID,
        MI_LICENSE_ID,
      ],
      '已有 Michigan Standard credential 的人必须到 Secretary of State office 才能转换 REAL ID，并带当前证件、美国公民或合法居留证明，以及姓名不一致时的完整姓名变更文件': [
        MI_REAL_ID,
      ],
      '在正常 renewal 或 replacement 同时转换 REAL ID 不加收升级费，其他时间转换按 correction 收取 driver license $9 或 state ID $10': [
        MI_REAL_ID,
      ],
      '首次满足 Michigan 驾照全部要求的申请人通常会获发 REAL ID-compliant license，除非主动选择退出，但首次 REAL ID 仍需要到场和额外文件核验': [
        MI_NEW_DRIVERS,
        MI_LICENSE_ID,
      ],
      'Enhanced license/ID 只适用于符合美国公民和 Michigan 居民条件者，必须到场申请，可用于从加拿大、墨西哥、百慕大或加勒比地区经陆路或海路返回美国，也自动符合 REAL ID，但不能替代国际航空所需 passport': [
        MI_ENHANCED,
        MI_REAL_ID,
      ],
      '非美国公民申请或续期时要通过联邦 SAVE 核验，官方当前提示多数延迟案例从受理到处理约 40 天，这只是动态估计而不是承诺时限': [
        MI_FIRST_TIME,
        MI_RENEW,
      ],
      'Michigan 当前合法居留清单不接受 B1、B2、WB 或 WT 作为办证依据，F 身份通常要随 foreign passport、visa 和 I-94 提交 I-20，J 身份还要提交 DS-2019': [
        MI_FIRST_TIME,
        MI_REAL_ID,
        MI_SOS428,
      ],
      '首次 license/ID 需要 legal presence、SSN、identity、两份 Michigan residency 和适用的姓名变更文件，license 申请人另做视力检查，18 岁及以上首次驾驶人还要完成知识与路考路径': [
        MI_FIRST_TIME,
        MI_NEW_DRIVERS,
      ],
      'SSA-L676 无 SSN 资格信的时效在官方材料间存在冲突，当前交易说明要求 60 天内签发，而 SOS-428 仍写一年，实际准备时应采用更严格的 60 天标准并在预约前确认': [
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      'Utility、credit-card bill 或 bank statement 用作住址证明时须为 90 天内文件，电子版本可接受，住址必须是 Michigan residential street address，P.O. Box 只能另作 mailing address': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      '姓名与出生或合法居留文件不一致时要用原始 marriage certificate、certified divorce decree 或美国法院命令串联，经历多次改名时可能需要多份文件': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      '18 岁及以上且过去 4 年没有 Michigan 或其他美国州驾照的首次驾驶人通常先通过知识和视力检查取得 $25 TIP，TIP 有效 180 天并要求至少 30 天由持照成人监督练习后才能路考': [
        MI_NEW_DRIVERS,
        MI_LICENSE_FAQ,
      ],
      '18 岁及以上可选择线上 knowledge test，当前总收费 $6.50，需带键盘和鼠标的电脑及 webcam，Operator 与 Signs 两部分约需 45 分钟和 15 分钟，办公室考试免费': [
        MI_NEW_DRIVERS,
        MI_ONLINE_TEST,
      ],
      '线上和办公室 knowledge test 提供多种外语及 audio/written 格式，官方另有 2025 年版中文驾驶手册，但中文手册的存在不等于每个考试渠道都保证中文，考试前应向实际入口或考点确认': [
        MI_NEW_DRIVERS,
        MI_MANUAL,
        MI_LANGUAGE,
      ],
      'Michigan 路考由获授权的独立 driver testing business 执行，第三方收费不受 Department of State 统一定价，预约前应询问初考、重考、取消和材料不合格费用': [
        MI_NEW_DRIVERS,
        MI_DRIVER_TESTING,
      ],
      '路考车辆要有安全设备、有效 registration、当年 plate tab 和 Michigan No-Fault insurance，口译员可翻译 examiner 指令，但考生不能使用笔记、手机或其他辅助设备': [
        MI_NEW_DRIVERS,
      ],
      '路考任一组成部分失败会终止当次考试，同一申请人 24 小时内只能参加一次 driving skills test，考官签发的 receipt 本身不是驾照': [
        MI_NEW_DRIVERS,
      ],
      '路考结果电子送达后可从 e-Services 获取 Temporary Operator License，24 小时后仍未显示结果时应带 test certificate、TIP 和身份文件到 office 处理': [
        MI_NEW_DRIVERS,
      ],
      'Michigan 新驾驶人取得 operator license 后至少有 3 年 probationary period，最后 10 个月出现责任事故、饮酒事故、暂停或交通定罪会延长该期限': [
        MI_NEW_DRIVERS,
      ],
      '临时合法居留者的 limited-term license 只签发到获准留美期限，身份核验或延期处理中不能依据旧卡自行推断新的有效期': [
        MI_NEW_DRIVERS,
      ],
      '当前普通 first-time driver license 为 $25，Standard ID 为 $10，Enhanced driver license 为 $45，Enhanced ID 为 $30': [
        MI_LICENSE_ID,
        MI_NEW_DRIVERS,
        MI_ENHANCED,
      ],
      '普通 driver license 续期为 $18，逾期通常为 $25，Enhanced license 为 $38 或逾期 $45，Standard ID 续期 $10，Enhanced ID 续期 $30': [
        MI_RENEW,
        MI_LICENSE_ID,
        MI_LICENSE_FAQ,
      ],
      'Self-service station 每个办理项目另收 $4.25 service fee，信用卡或借记卡在其他渠道也可能产生 additional fees': [
        MI_RENEW,
      ],
      '最近两次都用线上、邮寄或 station 续期、非美国公民需要复核合法居留、照片超过 12 年、线上改址未满 28 天、证件逾期超过 4 年或被暂停撤销者，通常不能继续走普通 online renewal': [
        MI_RENEW,
        MI_LICENSE_FAQ,
      ],
      '补证可从 online、仅限外州居民的 mail、self-service station 或 office 开始，Standard duplicate 通常 $9，Enhanced duplicate $24，station 可打印 temporary credential': [
        MI_REPLACE,
        MI_LICENSE_FAQ,
      ],
      '最近 28 天内改过地址或已经申请过 replacement 的人通常要到 office 提供 identity proof，不能反复在线补证': [
        MI_LICENSE_FAQ,
        MI_REPLACE,
      ],
      '线上改址需要 Michigan license/ID number 和 SSN 后四位，车辆地址另需 plate number，license/ID 与 vehicle registration 地址必须分别更新，除非线上流程同时选择两项': [
        MI_ADDRESS,
      ],
      'Standard credential 改址后会邮寄背面贴纸，Enhanced credential 会邮寄新卡，官方改址说明未列统一天数，但要求先完成 USPS change-of-address 以免证件和续期通知无法投递': [
        MI_ADDRESS,
      ],
      '姓名更正必须先更新 Social Security Administration 记录，再带当前 Michigan credential 和 legal name-change document 到 office，当前 correction fee 为 license $9、ID $10': [
        MI_LICENSE_ID,
        MI_LICENSE_FAQ,
      ],
      'Michigan 当前 treaty 表把 China 列为 non-treaty、把 China (Taiwan) 列为 treaty，因此中国大陆驾照访客除英文驾照或英文翻译外还须能出示美国合法居留证明，台湾驾照访客按 treaty 路径不要求该项州内证明': [
        MI_FOREIGN_TABLE,
        MI_FOREIGN_GUIDANCE,
      ],
      '外国访客可持有效本国驾照加英文文本或 English translation/IDP 驾驶，IDP 只是随原驾照携带的翻译，不能单独当作驾照': [
        MI_FOREIGN_GUIDANCE,
        MI_LICENSE_FAQ,
      ],
      '外国驾照在申请 Michigan credential 时只能证明 driving experience，不能作为 identity 或 legal presence，也不享有美国州、领地或加拿大有效驾照的直接 conversion 路径': [
        MI_SOS428,
        MI_FIRST_TIME,
        MI_NEW_RESIDENTS,
      ],
      '新居民持有效且未过期的其他美国州、美国领地或加拿大驾照，可预申请并到 office 提交原证件、合法居留、SSN、identity 和两份 Michigan residency 走 conversion，官方新居民说明没有公布统一的搬入后办证天数': [
        MI_NEW_RESIDENTS,
        MI_FIRST_TIME,
        MI_LICENSE_FAQ,
      ],
      '新居民办理 Michigan plate 通常要带原始 vehicle title、Michigan No-Fault insurance、license/ID 或有效 passport、适用的 lienholder 文件和费用，title photocopy 不被接受': [
        MI_NEW_RESIDENTS,
      ],
      'office 交易后领取的是 temporary paper credential，永久证件由安全设施制作并邮寄，可在 Online Services 的 View Credential Mail Status 查看 processed、mailed 或 USPS undeliverable 状态': [
        MI_LICENSE_FAQ,
      ],
      '已有 Michigan credential 转换 REAL ID 时，带当前 license/ID、一份美国公民或合法居留证明，以及从原姓名连接到当前姓名的适用文件': [
        MI_REAL_ID,
      ],
      '首次 license/ID 按 legal presence、SSN、identity、两份 Michigan residency 和 name-change chain 五组准备，申请驾照者另做 vision exam': [
        MI_FIRST_TIME,
      ],
      'Legal presence 与 identity 文件须用原件，所有非英文文件要附 English translation，只有列明的 residency 文件可使用电子版本': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      'SSN 可用 Social Security card、W-2、1099 或含姓名与 SSN 的 pay stub，无资格者按当前交易说明准备 60 天内 SSA-L676 并配合显示 non-work-authorized status 的 USCIS 文件': [
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      '两份 Michigan residency 都要有申请人姓名和 residential street address，90 天内 utility、credit-card bill 或 financial statement 可用电子版，P.O. Box 不能代替居住地址': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      '姓名变化文件要显示前后姓名并把每次变化串联，marriage certificate 用原件，divorce decree 用 certified copy，美国法院命令也可作为相应证明': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      '非美国公民常见组合包括有效 foreign passport、U.S. visa 与 I-94，F 身份另带 I-20，J 身份另带 DS-2019，B1/B2/WB/WT 不在当前可接受办证范围': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_REAL_ID,
      ],
      'Identity 通常用一份列明的美国或加拿大证件，无法走单文件路径时，foreign passport、I-94、EAD、I-571 或附 I-797 的过期移民文件等通常要按两份组合规则准备': [
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      'Enhanced credential 的 legal-presence 栏只列美国公民文件，申请还要 SSN、identity、两份 residency 和适用姓名文件，并必须本人到 office': [
        MI_ENHANCED,
      ],
      '外国驾照须附 IDP 或 English translation 才能作为 driving experience proof，不能替代 legal presence、identity 或 Michigan residency': [
        MI_SOS428,
      ],
      '先看现有卡面和旅行目的，只有国内航班或受限联邦设施需求时才在 REAL ID、Enhanced、passport 或其他 TSA accepted ID 中选择': [
        MI_REAL_ID,
        MI_ENHANCED,
        TSA_IDENTIFICATION,
      ],
      '首次申请者按 First-time License/ID 路径预申请，已有 Michigan Standard credential 者按 Convert to REAL ID 路径预约，不把两条流程混用': [
        MI_FIRST_TIME,
        MI_REAL_ID,
      ],
      '把材料分成 legal presence、SSN、identity、two residency、name chain 五栏，逐栏确认姓名、生日和地址一致': [
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      '使用 SSA-L676 时按当前交易说明采用 60 天内文件，并在预约前再次确认官方冲突是否已消除': [
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      '非美国公民先确认具体移民文件是否被接受，为 SAVE 预留延迟，不在现有卡到期前最后几天才开始': [
        MI_FIRST_TIME,
        MI_REAL_ID,
        MI_RENEW,
      ],
      '最多提前 6 个月预约 office，收到确认邮件后保留管理链接，walk-in 只作为可能排到当天稍后或下一工作日的备用方案': [
        MI_APPOINTMENTS,
      ],
      '新居民先预申请并准备两份 Michigan residency，外州、美国领地或加拿大有效驾照走 conversion，外国驾照走 first-time driver 判断': [
        MI_NEW_RESIDENTS,
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      '成人首次考试前比较 $6.50 线上知识考试与免费 office 考试，线上路径提前准备电脑、键盘鼠标、webcam 和约一小时不受打扰的环境': [
        MI_NEW_DRIVERS,
      ],
      '需要中文时先使用 2025 Chinese driver manual 学习，再向实际在线入口或 office 确认可选考试语言和 audio/written 格式': [
        MI_MANUAL,
        MI_NEW_DRIVERS,
        MI_LANGUAGE,
      ],
      '取得 TIP 后记录 180 天到期日和最早 30 天路考日，只向 authorized driver testing business 预约并先问清全部第三方费用': [
        MI_NEW_DRIVERS,
        MI_DRIVER_TESTING,
      ],
      '路考前逐项检查 TIP、安全车辆、Michigan No-Fault insurance、registration、plate/tab，并提前安排只翻译指令的口译员': [
        MI_NEW_DRIVERS,
      ],
      '通过路考后等待结果电子上传，再从 e-Services 获取 Temporary Operator License，24 小时仍无结果则带原始材料到 office': [
        MI_NEW_DRIVERS,
      ],
      '续期前先用官方 eligibility 判断 online、mail、station 或 office，非公民核验、旧照片、连续远程续期或异常状态直接预留到场时间': [
        MI_RENEW,
      ],
      '补证或改址时同时检查 license/ID 与 vehicle registration 两套地址，最近 28 天有相关操作时准备 identity proof 到 office': [
        MI_REPLACE,
        MI_ADDRESS,
        MI_LICENSE_FAQ,
      ],
      '交易后保留 temporary paper credential，并用 View Credential Mail Status 追踪制作、寄送和 USPS 退件状态': [
        MI_LICENSE_FAQ,
      ],
      '看到 Michigan Standard license 仍可驾驶，就误以为它也能直接通过国内航班安检': [
        MI_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'Enhanced credential 没有星标就重复申请 REAL ID，忽略 Enhanced 无论是否显示星标都自动合规': [
        MI_REAL_ID,
        MI_ENHANCED,
      ],
      '已有 Standard credential 却只做 online renewal，期待系统自动完成首次 REAL ID 转换': [
        MI_REAL_ID,
        MI_RENEW,
      ],
      '把扫描件、手机照片或普通 photocopy 当作 legal-presence 或 identity 原件': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      '使用超过 60 天的 SSA-L676，只依据较旧 SOS-428 的一年口径准备': [
        MI_FIRST_TIME,
        MI_SOS428,
      ],
      '只带一份 residency，或把 P.O. Box 当作 Michigan residential address': [
        MI_FIRST_TIME,
        MI_SOS428,
        MI_LICENSE_FAQ,
      ],
      '持 B1/B2、WB/WT 或待核验移民文件时，未先确认当前 legal-presence 资格和 SAVE 状态': [
        MI_FIRST_TIME,
        MI_REAL_ID,
      ],
      '看到官方中文驾驶手册就预设线上或指定 office 一定提供中文 knowledge test': [
        MI_MANUAL,
        MI_NEW_DRIVERS,
      ],
      '购买所谓 international driver license 后不携带本国原驾照，或把 IDP 当成独立驾驶资格': [
        MI_FOREIGN_GUIDANCE,
        MI_LICENSE_FAQ,
      ],
      '持外国驾照时照搬美国州或加拿大驾照 conversion 路径，遗漏知识考试、TIP、路考或身份材料': [
        MI_SOS428,
        MI_FIRST_TIME,
        MI_NEW_DRIVERS,
        MI_NEW_RESIDENTS,
      ],
      '驾驶资格已 suspended、revoked 或 denied 仍支付 $6.50 线上知识考试费，官方明确这种情况不退款也不能发证': [
        MI_NEW_DRIVERS,
      ],
      '路考时车辆缺 Michigan No-Fault insurance、有效 registration、当年 tab 或安全设备，导致考试在上路前取消': [
        MI_NEW_DRIVERS,
      ],
      '把 driver testing business 的签字 receipt 当作可驾驶证件，没有等待电子结果并取得 Temporary Operator License': [
        MI_NEW_DRIVERS,
      ],
      '连续使用非到场渠道续期后仍假定下一次一定可线上办理，未检查照片、合法居留和 28 天改址限制': [
        MI_RENEW,
      ],
    },
  },
  ohio: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      OH_REAL_ID,
      OH_DOCUMENTS,
      OH_COMPLIANT_PDF,
      OH_STANDARD_PDF,
      OH_FIRST_ISSUANCE,
      OH_MANUAL,
      OH_NON_US,
      OH_RENEW,
      OH_REPRINT,
      OH_ID_CARD,
      OH_FEES,
      OH_ONLINE,
      OH_NEW_RESIDENTS,
      OH_FORMS,
      OH_LAW_TERM,
      OH_LAW_NEW_RESIDENT,
      OH_LAW_RECIPROCITY,
      OH_LAW_ONLINE,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Ohio BMV 的 Compliant/Standard、可接受材料、首次申请、中文考试、TIPIC、成人与临时居民训练、外国驾照 reciprocity、SAVE、续期补证、费用、改址、新居民与邮寄正文，并交叉检查现行 Ohio Revised Code。',
    notes:
      '重写 Ohio 总览与 REAL ID 页面，补齐 exam station 与 deputy registrar 分工、费用页与旧 ID FAQ 差异、limited-term 新州法与旧页面命名冲突、中国大陆/台湾训练豁免差异、10/30/60/90 天判断路径；所有公开声明已改为显式来源，仍待真实人工签字。',
    claims: {
      '俄亥俄驾照和 ID 由 BMV 管理，但知识与路考通常由 Driver Exam Station 执行，证件签发则在 Deputy Registrar License Agency 完成': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '先区分 Standard、REAL ID Compliant、首次申请、外州转入和外国驾照路径': [
        OH_REAL_ID,
        OH_FIRST_ISSUANCE,
        OH_NEW_RESIDENTS,
        OH_LAW_RECIPROCITY,
        OH_RENEW,
      ],
      '当前或过期不足 6 个月的 Ohio driver license 可到 Deputy Registrar 续期，符合条件者也可线上续期': [
        OH_RENEW,
        OH_LAW_ONLINE,
      ],
      '过期超过 6 个月通常要重新取得 TIPIC 并完成规定测试，不能把它当作普通 late renewal': [
        OH_RENEW,
        OH_FIRST_ISSUANCE,
      ],
      'Ohio 把 REAL ID 合规证件称为 Compliant Card，与 Standard Card 收费相同但材料更多': [
        OH_REAL_ID,
        OH_DOCUMENTS,
      ],
      'Compliant 可用于国内航班和受限联邦设施，Standard 仍可驾驶和办理一般身份事务，但不能单独满足联邦旅行身份要求': [
        OH_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '知识考试可按资格在线或到指定 Deputy Registrar / Driver Exam Station，路考需从 BMV Online Services 预约': [
        OH_FIRST_ISSUANCE,
        OH_ONLINE,
      ],
      '签发业务可先用 Get In Line Online 排队，但它不等于路考预约': [
        OH_MANUAL,
        OH_ONLINE,
        OH_FIRST_ISSUANCE,
      ],
      'Compliant Card 是 Ohio 对 REAL ID 合规驾照或 ID 的称呼，完全可以选择 Standard': [
        OH_REAL_ID,
      ],
      '首次签发无论选哪种卡都要提交完整身份材料，已有 Standard 在普通续期时通常不需要额外材料': [
        OH_REAL_ID,
        OH_DOCUMENTS,
      ],
      '首次申领 Compliant credential 不能在线完成，必须到 Deputy Registrar': [
        OH_REAL_ID,
        OH_LAW_ONLINE,
      ],
      'Compliant 与 Standard 本身没有额外价差，但交易类型、4 年或 8 年期限仍会影响费用': [
        OH_REAL_ID,
        OH_FEES,
        OH_RENEW,
      ],
      'Compliant Card 需要证明 full legal name、date of birth、legal presence、SSN、两份来自不同来源的 Ohio street address，以及适用的完整姓名变化链': [
        OH_DOCUMENTS,
        OH_COMPLIANT_PDF,
      ],
      'Ohio BMV 2430 与 BMV 2424 要求身份材料使用原件或由签发机关认证的副本，普通复印件、认证副本的再次复印件不能替代': [
        OH_COMPLIANT_PDF,
        OH_STANDARD_PDF,
      ],
      'Compliant 卡不能替代 passport 做国际旅行': [
        OH_REAL_ID,
      ],
      'Standard 卡可继续作为驾驶资格和一般州内身份证明，但国内航班要另带 TSA 接受的证件': [
        OH_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '永久驾照或 ID 通常在到访 Deputy Registrar 后 10 个工作日内邮寄，28 天仍未收到应联系 BMV': [
        OH_REAL_ID,
      ],
      '现场发的 interim document 只是待制卡证明，不是通用身份证件': [
        OH_REAL_ID,
      ],
      'Interim driver license 或 TIPIC 文件可在等待期间用于驾驶非 CDL 车辆，但不能单独作为身份证明，也不能单独申请 CDL 或 CDL permit': [
        OH_REAL_ID,
      ],
      'BMV 当前总费用表列出 21 岁以上首次 operator license 4 年 $27.50、8 年 $54.00，普通续期 4 年 $30.25、8 年 $59.40，duplicate $29.00，operator TIPIC $26.50': [
        OH_FEES,
      ],
      '交易前再检查 Fees 页面页首的 Last Updated': [
        OH_FEES,
      ],
      'Ohio 当前费用总表与个别 ID FAQ 的旧数字并不完全一致，涉及州 ID 时应以中央 Fees 页面和实际交易报价为准，不根据旧 FAQ 承诺固定金额': [
        OH_FEES,
        OH_ID_CARD,
      ],
      '知识考试有 40 道选择题，至少答对 75%': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '中文与英语等语言提供文字和音频，其他语言可预约带自备口译员的监考考试，但考生仍须理解英文路标': [
        OH_FIRST_ISSUANCE,
      ],
      '知识考试失败后至少等 24 小时': [
        OH_FIRST_ISSUANCE,
      ],
      '线下考试没有次数上限，online knowledge test 在 6 个月内最多两次': [
        OH_FIRST_ISSUANCE,
      ],
      '成人取得 TIPIC 后只能在 21 岁或以上持照驾驶人陪同下练车，路考包括 driving 与 maneuverability 两部分并要求携带 TIPIC 和状况良好的车辆': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '21 岁及以上首次申请人第一次未通过 road 或 maneuverability test，且过去 12 个月没有完成认可课程时，第二次考试前必须完成 abbreviated adult driver training': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      'Abbreviated adult course 可选择 4 小时课堂或州认可线上课程，再配 4 小时驾校实车，或改为 24 小时由 21 岁以上持照人陪练': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '24 小时路径要提交 notarized BMV 5789': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
        OH_FORMS,
      ],
      '通过 driving 与 maneuverability tests 后应在 60 天内到 Deputy Registrar 购买 driver license，考试通过本身不会自动寄出驾照': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '21 岁以上 temporary resident 当前要完成 24 小时课堂或线上 instruction、8 小时驾校实车、50 小时陪练且含 10 小时夜间，并持 TIPIC 至少 14 天': [
        OH_MANUAL,
        OH_NON_US,
      ],
      '当前 Ohio Driver Manual 只对持有效加拿大、法国、德国、日本、韩国或台湾驾照的 21 岁以上 temporary resident 豁免上述训练要求': [
        OH_MANUAL,
      ],
      '中国大陆驾照不在这份明确名单中，不能自行推定可免考或直接换证': [
        OH_MANUAL,
        OH_LAW_RECIPROCITY,
      ],
      'Ohio 法律允许 BMV 与外国建立 reciprocity 并酌情免除考试，但官网没有给出可供用户自行扩张解释的完整实时名单，外国驾照持有人应让 BMV 按当前证件和身份确认': [
        OH_LAW_RECIPROCITY,
        OH_MANUAL,
      ],
      '非美国公民的证件姓名以 USCIS 文件为准，合法身份必须通过 SAVE': [
        OH_NON_US,
      ],
      'SAVE 尚未完成时 BMV 不能最终签发，pending application 也不等于当前已有驾驶资格': [
        OH_NON_US,
      ],
      '绿卡持有人提交有效 I-551、适用 SSN 和 Ohio residency 后可获普通 4 年或 8 年证件': [
        OH_NON_US,
      ],
      'temporary resident 则要在每次签发时重新提交当前 USCIS 文件和住址证明': [
        OH_NON_US,
      ],
      '现行 Ohio Revised Code 4507.09 自 2025-09-30 起允许 limited-term license 在到期前 90 天凭持续合法身份材料续期，但 BMV 页面仍把一类证件标作 Non-Renewable/Non-Transferable': [
        OH_LAW_TERM,
        OH_NON_US,
      ],
      '必须按卡面类型向 BMV 确认，本站不承诺一定可续': [
        OH_LAW_TERM,
        OH_NON_US,
      ],
      'Limited-term 证件最长不能超过获准停留截止日或 4 年': [
        OH_LAW_TERM,
        OH_NON_US,
      ],
      '若合法停留文件没有截止日，现行州法把签发上限设为 1 年': [
        OH_LAW_TERM,
      ],
      '使用 asylum I-94 申请时，BMV 提示文件核验可能需要最多 15 天': [
        OH_NON_US,
      ],
      'SAVE CaseCheck 只显示联邦核验状态，不替代 Ohio driving record 对驾驶资格的确认': [
        OH_NON_US,
        OH_ONLINE,
      ],
      '当前或过期不足 6 个月的 license 可续期，21 岁以上且未满 65 岁者按资格可选 4 年或 8 年': [
        OH_RENEW,
        OH_LAW_TERM,
      ],
      '65 岁及以上只能办 4 年且不符合普通线上续期': [
        OH_RENEW,
        OH_LAW_ONLINE,
      ],
      '线上续期通常要求当前证件曾在 Deputy Registrar 本人办理、是 4 年证件、签发时已满 21 岁、申请人未满 65 岁且为美国公民或永久居民，并且除地址外没有个人信息变化或需到场的医疗限制': [
        OH_LAW_ONLINE,
      ],
      '首次 Ohio credential、首次 Compliant credential、TIPIC、limited-term credential 和过期超过 6 个月的证件都不能套用普通 online renewal': [
        OH_LAW_ONLINE,
        OH_RENEW,
      ],
      'Ohio 驾驶人搬家后须在 10 天内通知 BMV': [
        OH_LAW_TERM,
      ],
      '线上或 BMV 5756 可更新记录，需要卡面显示新地址时再按 duplicate 路径处理': [
        OH_ONLINE,
        OH_FORMS,
        OH_REPRINT,
        OH_LAW_TERM,
      ],
      '有效且未过期、信息不变的遗失或损坏证件可在线购买一次 reprint': [
        OH_REPRINT,
        OH_ONLINE,
      ],
      '若要改姓名、地址等信息则需到 Deputy Registrar 购买 duplicate，两者都沿用原到期日': [
        OH_REPRINT,
        OH_DOCUMENTS,
      ],
      '未满 21 岁者在 21 岁生日之前 30 天内不能申请 reprint 或 duplicate，应按生日续期规则安排': [
        OH_REPRINT,
        OH_RENEW,
      ],
      'Ohio 把就业、签租约、买房或子女入学列为建立 residency 的常见触发点': [
        OH_NEW_RESIDENTS,
      ],
      '建立居民身份后 30 天内要转入驾照或 ID、车辆 title 与 registration': [
        OH_NEW_RESIDENTS,
        OH_LAW_NEW_RESIDENT,
      ],
      '持有效未过期外州非 CDL 驾照的新居民通常带原证件和完整材料到 Deputy Registrar 并完成 vision screening': [
        OH_NEW_RESIDENTS,
        OH_DOCUMENTS,
      ],
      '过期外州证件或首次驾驶人要走完整 testing path': [
        OH_NEW_RESIDENTS,
        OH_FIRST_ISSUANCE,
      ],
      '申请 Ohio ID 会取消申请人持有的外州 driver license，因此仍需驾驶的外州学生或临时居住者不要把州 ID 当作无影响的备用证件': [
        OH_ID_CARD,
      ],
      '外州车辆先在 County Clerk of Courts Title Office 办 Ohio title，再到 Deputy Registrar 注册': [
        OH_NEW_RESIDENTS,
      ],
      'BMV 本身不签发 vehicle title': [
        OH_NEW_RESIDENTS,
      ],
      '首次 Standard credential 要覆盖 full legal name、date of birth、legal presence、SSN 和一份 Ohio street address': [
        OH_DOCUMENTS,
        OH_STANDARD_PDF,
      ],
      'Compliant credential 把地址证明提高为两份且须来自不同来源': [
        OH_DOCUMENTS,
        OH_COMPLIANT_PDF,
      ],
      'Birth certificate、passport、I-551、EAD 或其他身份与合法居留文件按 BMV 2430/2424 对应栏位组合，不能只因一份文件有照片就假定覆盖全部五类要素': [
        OH_COMPLIANT_PDF,
        OH_STANDARD_PDF,
        OH_NON_US,
      ],
      'Social Security card、显示完整 SSN 的 W-2 或 1099 可作为常见 SSN 证据': [
        OH_COMPLIANT_PDF,
        OH_STANDARD_PDF,
      ],
      'BMV 5745 只有在 SSN 已经向 Ohio BMV 建档时才能单独用于这一栏': [
        OH_DOCUMENTS,
        OH_FORMS,
      ],
      'Compliant 住址材料常见可用 utility bill、bank statement、credit-card statement、pay stub、insurance policy、Ohio title/registration 等，其中标注时限的账单通常须在 12 个月内': [
        OH_COMPLIANT_PDF,
      ],
      '两份 Compliant residency 必须显示姓名和当前 Ohio street address': [
        OH_COMPLIANT_PDF,
        OH_DOCUMENTS,
      ],
      '同一 utility provider 的两张账单不算不同来源，但两个不同 utility provider 可分别计入': [
        OH_COMPLIANT_PDF,
      ],
      '依赖父母、配偶或 nursing home 地址的人可查看 BMV 2336 certified statement 路径，证明人仍要满足身份、关系和相应住址材料要求': [
        OH_COMPLIANT_PDF,
        OH_FORMS,
      ],
      '姓名与 birth certificate、passport 或 USCIS 文件不一致时，带 marriage certificate/license、certified divorce/dissolution/annulment decree 或 certified court order，把每次变化串联起来': [
        OH_DOCUMENTS,
        OH_COMPLIANT_PDF,
        OH_STANDARD_PDF,
      ],
      '非美国公民应带全部当前 legal-presence documents：学生常见 passport、visa、I-94、I-20 或 DS-2019': [
        OH_NON_US,
      ],
      '就业者常见有效 EAD，或 passport、visa、I-94 与可接受 case type 的 I-797': [
        OH_NON_US,
      ],
      '外州转入要带有效未过期的原州 license、完整身份材料并做 vision screening': [
        OH_NEW_RESIDENTS,
        OH_DOCUMENTS,
      ],
      '外州证件过期时不要预设能免知识或路考': [
        OH_NEW_RESIDENTS,
        OH_FIRST_ISSUANCE,
      ],
      '首次驾驶人先准备知识考试所需姓名、生日和适用 SSN 证据，再在购买 TIPIC 时补齐 Ohio residency 与 citizenship/legal presence': [
        OH_FIRST_ISSUANCE,
        OH_DOCUMENTS,
      ],
      '已有 Ohio ID 会在 TIPIC 签发时被取消': [
        OH_FIRST_ISSUANCE,
        OH_ID_CARD,
      ],
      '路考携带 TIPIC、状况良好的车辆和按年龄或身份适用的 BMV 5791': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
        OH_FORMS,
      ],
      '临时居民 21 岁以上也应核对 14 天持证、训练证书和 notarized fifty-hour affidavit': [
        OH_MANUAL,
        OH_NON_US,
        OH_FORMS,
      ],
      '先按用途选择 Standard 或 Compliant：有 passport 等 TSA accepted ID 且只需驾驶时，可比较是否值得多准备 REAL ID 材料': [
        OH_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '首次或首次 Compliant 申请把材料分成 legal name/date of birth、legal presence、SSN、Ohio street address 和 name-change chain，并用 BMV 2430 checklist 逐格核对': [
        OH_DOCUMENTS,
        OH_COMPLIANT_PDF,
      ],
      '两份 Compliant 地址证明先按 issuing source 去重，再检查姓名、street address 和 12 个月等时效，特殊家庭住址情形提前准备 BMV 2336': [
        OH_COMPLIANT_PDF,
        OH_FORMS,
      ],
      '非美国公民先把 passport、visa、I-94、I-20/DS-2019、EAD 或 I-797 按自己身份配齐，再用 SAVE CaseCheck 跟踪核验，但另行确认 Ohio driving privilege': [
        OH_NON_US,
      ],
      '21 岁以上 temporary resident 在报考前先核对自己是否属于六个当前训练豁免来源': [
        OH_MANUAL,
      ],
      '中国大陆驾照默认按不在明示豁免名单准备，直到 BMV 个案确认': [
        OH_MANUAL,
        OH_LAW_RECIPROCITY,
      ],
      '首次驾驶人先学习 Ohio Driver Manual，再选择 online 或 in-person knowledge test': [
        OH_MANUAL,
        OH_FIRST_ISSUANCE,
      ],
      '需要中文时确认 text/audio 选项并继续熟悉英文路标': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '通过知识和视力检查后购买 TIPIC，记录适用陪练、14 天或其他持证要求以及 60 天购买最终 license 的节点': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '路考前检查 TIPIC、车辆安全状况和适用 BMV 5791': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
        OH_FORMS,
      ],
      '第一次失败时先完成 abbreviated course，再安排第二次': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '续期先判断证件是否过期超过 6 个月，再检查 online eligibility': [
        OH_RENEW,
        OH_LAW_ONLINE,
      ],
      '首次 Compliant、limited-term、65 岁以上或信息变化直接预留到场路径': [
        OH_LAW_ONLINE,
        OH_RENEW,
        OH_NON_US,
      ],
      'Limited-term 持有人在到期前至少 90 天开始核对卡面、持续合法身份和 BMV 当前执行口径，保存 SAVE 与柜台答复，不依赖网页标题猜测': [
        OH_LAW_TERM,
        OH_NON_US,
      ],
      '补证前先区分 reprint 与 duplicate：信息完全不变才走一次性 online reprint，需要更正则带证明到 Deputy Registrar': [
        OH_REPRINT,
        OH_DOCUMENTS,
      ],
      '搬家后 10 天内分别更新 driver credential 与 vehicle record': [
        OH_LAW_TERM,
        OH_FORMS,
        OH_ONLINE,
      ],
      '新居民在 30 天内按 license/ID、County title、registration 三条线推进': [
        OH_NEW_RESIDENTS,
        OH_LAW_NEW_RESIDENT,
      ],
      '现场交易前使用 Get In Line Online，考试则使用专门的 Schedule a Driving or Skills Test 入口，不把两个队列混淆': [
        OH_ONLINE,
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '现场领取 interim document 后继续携带其他正式 photo ID，预留 10 个工作日邮寄窗口，并在 28 天未收到时联系 BMV': [
        OH_REAL_ID,
      ],
      '把 Compliant Card 当成另一种驾照类别，或误以为升级 REAL ID 必须多付一笔固定附加费': [
        OH_REAL_ID,
      ],
      '首次申请 Standard Card 时以为材料要求和普通续期一样，只带旧卡或一份姓名文件': [
        OH_REAL_ID,
        OH_DOCUMENTS,
        OH_STANDARD_PDF,
      ],
      '两份住址证明来自同一 bank account 或同一 utility provider，未满足 different sources': [
        OH_COMPLIANT_PDF,
      ],
      '带手机照片、普通复印件或 copy of certified copy 去证明 legal presence 或姓名变化': [
        OH_COMPLIANT_PDF,
        OH_STANDARD_PDF,
        OH_DOCUMENTS,
      ],
      '把 Deputy Registrar 发的 interim document 当成可登机、开户或证明身份的正式 photo ID': [
        OH_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '只看到“10 个工作日寄到”就按保证日期订旅行，28 天仍未收到也没有联系 BMV': [
        OH_REAL_ID,
      ],
      '看见中文 knowledge test 就以为可以不理解英文交通标志，或让口译员替自己回答': [
        OH_FIRST_ISSUANCE,
      ],
      '线上知识考试失败两次后继续反复尝试，忽略 6 个月两次上限和线下考试路径': [
        OH_FIRST_ISSUANCE,
      ],
      '21 岁以上第一次路考失败后直接预约第二次，没有先完成 abbreviated adult course 和适用 affidavit': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
        OH_FORMS,
      ],
      '通过路考后等待系统自动寄卡，错过 60 天内到 Deputy Registrar 购买 license 的步骤': [
        OH_FIRST_ISSUANCE,
        OH_MANUAL,
      ],
      '持中国大陆驾照就照搬台湾或其他 reciprocity 路径，遗漏 temporary-resident 训练、TIPIC 和考试要求': [
        OH_MANUAL,
        OH_LAW_RECIPROCITY,
        OH_FIRST_ISSUANCE,
      ],
      '把 SAVE pending 或手中的 USCIS receipt 当作 Ohio 已经确认可驾驶，未检查当前 driving privilege': [
        OH_NON_US,
      ],
      '只依据 BMV 页面上的 Non-Renewable 名称或只依据新州法就推定 limited-term 一定不能或一定可以续期，没有核对卡面和个案': [
        OH_NON_US,
        OH_LAW_TERM,
      ],
      '证件过期超过 6 个月仍在线支付普通 renewal，未准备 TIPIC 与重新测试': [
        OH_RENEW,
        OH_LAW_ONLINE,
        OH_FIRST_ISSUANCE,
      ],
      '搬家后只向 USPS 改地址，超过 10 天仍未更新 BMV 驾照和车辆记录': [
        OH_LAW_TERM,
        OH_FORMS,
        OH_ONLINE,
      ],
      '遗失证件同时要改姓名或地址却选择 online reprint，忽略 reprint 不能改信息且只有一次': [
        OH_REPRINT,
      ],
      '搬到 Ohio 后只转驾照，没有在 30 天路径中分别处理 County title office 与 Deputy Registrar registration': [
        OH_NEW_RESIDENTS,
        OH_LAW_NEW_RESIDENT,
      ],
      '仍要使用外州驾照的学生申请 Ohio ID，没意识到外州驾照会被取消': [
        OH_ID_CARD,
      ],
    },
  },
  arizona: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      AZ_TRAVEL_ID,
      AZ_DOCUMENTS,
      AZ_RESIDENCY_AFFIDAVIT,
      AZ_NEW_RESIDENT,
      AZ_FOREIGN,
      AZ_PERMIT,
      AZ_ROAD_TEST,
      AZ_MANUAL,
      AZ_FEES,
      AZ_RENEW,
      AZ_FAQ,
      AZ_REPLACE,
      AZ_ADDRESS,
      AZ_NAME,
      AZ_ATP,
      AZ_ATP_LOCATIONS,
      AZ_IDENTITY,
      AZ_LICENSE_INFO,
      AZ_ID_CARD,
      AZ_PORTAL,
      AZ_LAW_ADDRESS,
      AZ_LAW_RESIDENT,
      AZ_LAW_NONRESIDENT,
      AZ_LAW_APPLICATION,
      AZ_LAW_EXAM,
      AZ_LAW_TERM,
      AZ_LAW_RECIPROCITY,
      AZ_LAW_FEES,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条比对 Arizona MVD 的 Travel ID、R03/26 材料表、外国申请人、permit/road test、费用、续补证、改址改名、第三方网点与现行 Arizona Revised Statutes。',
    notes:
      '重写 Travel/Non-Travel 判断、明确中国大陆与 Taiwan 的免试差异，并补齐 SSN、authorized presence、resident triggers、考试、邮寄和第三方收费边界；仍待真实人工签字。',
    claims: {
      '亚利桑那先按用途选择 Non-Travel credential 或 Arizona Travel ID，再按首次申领、外州转入、外国驾照、续期或补证进入不同路径': [
        AZ_TRAVEL_ID,
        AZ_NEW_RESIDENT,
        AZ_FOREIGN,
        AZ_RENEW,
        AZ_REPLACE,
      ],
      '中国大陆驾照不在当前四个免知识与路考的来源地名单中，不能套用 Taiwan 路径': [
        AZ_FOREIGN,
        AZ_LAW_RECIPROCITY,
      ],
      'Non-Travel driver license 仍可用于合法驾驶，但卡面标注 NOT FOR FEDERAL IDENTIFICATION，不能单独用于 TSA 国内航班等 REAL ID 联邦用途': [
        AZ_LICENSE_INFO,
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '普通 Class D 费用按年龄为 $10 至 $25，Travel credential、limited-term 身份和其他交易另有期限或费用规则': [
        AZ_FEES,
        AZ_FOREIGN,
        AZ_LAW_FEES,
      ],
      'Arizona Travel ID 是该州 REAL ID 合规驾照或 ID，但不是每位居民都必须办理': [
        AZ_TRAVEL_ID,
      ],
      '首次或续期州费为 $25，通常要提交一份主要身份文件、完整 Social Security number，以及两份来自不同来源并显示姓名和当前 Arizona physical residential address 的证明': [
        AZ_TRAVEL_ID,
        AZ_DOCUMENTS,
        AZ_FEES,
      ],
      'New to Arizona 页面说明首次到访 MVD 可不预约，但 Travel ID 申请人应先让 AZ MVD Now 判断能否在线办理或预约': [
        AZ_NEW_RESIDENT,
        AZ_TRAVEL_ID,
        AZ_PORTAL,
      ],
      'road test 必须预约，Authorized Third Party 是私人机构，业务、营业时间和额外 convenience fee 要向具体地点确认': [
        AZ_ROAD_TEST,
        AZ_ATP,
        AZ_ATP_LOCATIONS,
      ],
      'Arizona Travel ID 带星标，可用于 TSA 国内航班和受限联邦设施': [
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '有效护照等 TSA 接受证件仍可替代，Travel ID 也不能替代 passport 做国际旅行': [
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '已有 Arizona credential 的居民应从 AZ MVD Now 查看自己能否在线申请 Travel ID': [
        AZ_TRAVEL_ID,
        AZ_PORTAL,
      ],
      '没有 Arizona driver license 或 ID 的申请人要到 MVD 或提供 driver-license 服务的 Authorized Third Party': [
        AZ_TRAVEL_ID,
        AZ_ATP_LOCATIONS,
      ],
      '当前 Arizona DL/ID Requirements 40-5144 标注 R03/26，要求文件为英文原件或由签发机关认证的副本': [
        AZ_DOCUMENTS,
      ],
      '手机照片、普通复印件和自行声明的副本不能代替': [AZ_DOCUMENTS],
      'Travel ID 通常最长有效 8 年': [AZ_TRAVEL_ID],
      '60 岁及以上通常为签发日起 5 年，58 或 59 岁签发者在 65 岁当年的相同月日到期，非美国公民不得超过所提交移民文件的到期日或 8 年': [
        AZ_TRAVEL_ID,
        AZ_FOREIGN,
      ],
      'Travel ID 页面估计实体卡最多约 2 周寄到，一般 DL/ID 页面提示最多预留 15 天': [
        AZ_TRAVEL_ID,
        AZ_LICENSE_INFO,
      ],
      '现场先发带照片的 temporary receipt，近期旅行仍应携带其他 TSA 接受的正式证件': [
        AZ_LICENSE_INFO,
        TSA_IDENTIFICATION,
      ],
      '当前费用页列出 Non-Travel Class D 年龄 16 至 39 岁 $25、40 至 44 岁 $20、45 至 49 岁 $15、50 岁及以上 $10': [
        AZ_FEES,
        AZ_LAW_FEES,
      ],
      'Travel DL/ID 首次或续期 $25、duplicate $12，instruction permit $7': [
        AZ_FEES,
      ],
      '从未持有美国驾照者不论年龄都要先通过 permit test 才能预约路考': [
        AZ_PERMIT,
      ],
      '笔试为 30 道选择题，至少 80% 通过': [AZ_PERMIT],
      'Permit Test @ Home 只面向未满 18 岁并由父母、法定监护人账户或参与项目的 Arizona Professional Driving School 监考的申请人': [
        AZ_PERMIT,
      ],
      '成人按现场路径准备': [AZ_PERMIT],
      '当前 permit test 提供 Mandarin 等语言，但 road test 的考官指令和交通标志理解要求使用英语': [
        AZ_PERMIT,
        AZ_ROAD_TEST,
      ],
      '会做中文笔试不等于可以忽略英文路考指令': [AZ_PERMIT, AZ_ROAD_TEST],
      '未满 18 岁者取得 instruction permit 后通常要持证 6 个月或直到满 18 岁，permit 本身有效 12 个月': [
        AZ_PERMIT,
      ],
      '18 岁以上者通过笔试后不适用未成年人 6 个月等待': [
        AZ_PERMIT,
        AZ_ROAD_TEST,
      ],
      'Road test 必须预约，每位申请人每天只能考一次': [AZ_ROAD_TEST],
      '车辆要能安全运行并带有效 registration 和 current liability insurance，外国保险不接受，租车还要把申请人列在 rental agreement 上': [
        AZ_ROAD_TEST,
      ],
      'Road test 累计 21 分或以上判为未通过': [AZ_ROAD_TEST],
      '每年 6 月 1 日至 9 月 22 日中午 12 点以后，没有空调的车辆不能用于 skills test': [
        AZ_ROAD_TEST,
      ],
      '持当前有效外州驾照通常可免知识和路考，但 MVD 保留个案要求测试的权力': [
        AZ_FAQ,
        AZ_DOCUMENTS,
      ],
      '当前 40-5144 还提示，用于免试的外州驾照或 MVR 不得过期满 1 年': [
        AZ_DOCUMENTS,
      ],
      '短期访客可随身携带有效本国驾照在 Arizona 驾驶': [
        AZ_FOREIGN,
        AZ_LAW_NONRESIDENT,
      ],
      'IDP 不是州法强制，但因有英文而受官方推荐，IDP 只是翻译辅助，不能替代原始外国驾照': [
        AZ_FOREIGN,
        AZ_FAQ,
        AZ_LAW_NONRESIDENT,
      ],
      '当前外国申请人页面只把 Canada、Germany、South Korea 和 Taiwan 列为知识与路考双免来源': [
        AZ_FOREIGN,
        AZ_LAW_RECIPROCITY,
      ],
      '中国大陆不在名单中，应按笔试、视力和路考路径准备，直到 MVD 依据当前证件确认': [
        AZ_FOREIGN,
        AZ_LAW_RECIPROCITY,
        AZ_LAW_EXAM,
      ],
      '所有申请人都要证明在美国的 authorized presence': [
        AZ_IDENTITY,
        AZ_LAW_APPLICATION,
      ],
      '常见文件包括 I-551、EAD 或 I-94，F-1 或 J-1 还要带 I-20 或 DS-2019': [
        AZ_FOREIGN,
        AZ_DOCUMENTS,
      ],
      'Arizona 一般 DL/ID 页面要求申请时提供 Social Security number，Travel ID 通常只需完整号码而不需 SSN 文件': [
        AZ_IDENTITY,
        AZ_TRAVEL_ID,
        AZ_LAW_APPLICATION,
      ],
      '外国申请人页面同时说明是否需要 SSN 取决于 class type，EAD 持有人必须提供 SSN 或 card': [
        AZ_FOREIGN,
      ],
      '没有 SSN 的非公民不要自行用 SSA denial letter 或宣誓书替代': [
        AZ_IDENTITY,
        AZ_FOREIGN,
        AZ_LAW_APPLICATION,
      ],
      '应让 MVD 按 I-94 class type 和当前 authorized-presence 文件确认是否存在可办路径': [
        AZ_FOREIGN,
        AZ_IDENTITY,
      ],
      '外国申请人的 Arizona license 通常与 authorized-presence 文件同日到期，身份延期后要带更新文件续期': [
        AZ_FOREIGN,
      ],
      '这类期限不能按普通居民或 Travel ID 的最大年限推算': [
        AZ_FOREIGN,
        AZ_TRAVEL_ID,
        AZ_LAW_TERM,
      ],
      'Arizona 的居民触发条件包括在州内工作、登记投票、按居民标准让子女入学、取得居民费率州证照或学费，以及一个日历年累计停留至少 7 个月': [
        AZ_NEW_RESIDENT,
        AZ_IDENTITY,
        AZ_LAW_RESIDENT,
      ],
      '不要把别州常见的 30 天宽限直接套到普通 Arizona 新居民': [
        AZ_NEW_RESIDENT,
        AZ_LAW_RESIDENT,
      ],
      '外州车辆应在成为 Arizona resident 后尽快注册': [
        AZ_NEW_RESIDENT,
        AZ_MANUAL,
      ],
      'Phoenix Metro 和 Tucson 部分车辆可能要先完成 emissions testing': [
        AZ_NEW_RESIDENT,
      ],
      '普通 Class D 驾照一般有效至 65 岁，60 岁以后按 5 年周期续期': [
        AZ_LAW_TERM,
      ],
      'Travel ID、非公民授权期限、limited license 和医疗限制可能更早到期': [
        AZ_TRAVEL_ID,
        AZ_FOREIGN,
        AZ_LAW_TERM,
      ],
      '驾照可在到期前 6 个月内续期且多数情况可在 AZ MVD Now 办理，但 MVD 可能要求到场更新照片、视力或身份文件': [
        AZ_RENEW,
      ],
      'Arizona 不发送正式 renewal notice，照片通常每 12 年更新一次': [
        AZ_FAQ,
      ],
      '遗失、被盗或损坏的 license/ID 可在 AZ MVD Now 申请 $12 replacement': [
        AZ_REPLACE,
        AZ_FEES,
      ],
      '要更新照片则到 MVD 或 driver-license ATP，从 Non-Travel 改成 Travel ID 属于新申请而非普通 replacement': [
        AZ_REPLACE,
        AZ_TRAVEL_ID,
      ],
      '地址变化后 10 天内必须通知 MVD，线上更新记录免费并会同步到申请人名下的 driver 与 vehicle records': [
        AZ_ADDRESS,
        AZ_LAW_ADDRESS,
      ],
      '需要新地址实体卡时另付 $12，官方提示最多约 2 周寄到': [
        AZ_ADDRESS,
        AZ_FEES,
      ],
      '法定姓名变化后 10 天内更新 MVD': [AZ_NAME, AZ_LAW_ADDRESS],
      '先向 SSA 改名并等 2 个工作日，再带同时连接旧名与新名的原件或认证副本到 MVD 或 ATP，不能只做在线地址变更': [
        AZ_NAME,
        AZ_DOCUMENTS,
      ],
      'Authorized Third Party 可办理的 driver license、Travel ID、knowledge test 或 road test 取决于授权范围': [
        AZ_ATP,
        AZ_ATP_LOCATIONS,
      ],
      '它们可在州费之外收 convenience fee，实体证件仍由系统邮寄而不是柜台当场制卡': [
        AZ_ATP,
        AZ_ATP_LOCATIONS,
      ],
      'Standard Arizona ID card 面向所有年龄，通常 $12': [AZ_ID_CARD, AZ_FEES],
      '65 岁及以上、符合 SSI 等特定资格者可能免费，但免费资格不适用于 Travel ID': [
        AZ_ID_CARD,
        AZ_TRAVEL_ID,
      ],
      '先下载当前 40-5144，按一份 primary identity、Social Security number、两份 Arizona physical residential address 和适用姓名变化文件分组': [
        AZ_DOCUMENTS,
      ],
      '要求可能变化，以表格修订号为准': [AZ_DOCUMENTS, AZ_IDENTITY],
      'Travel ID 常见 primary 可包括原件或认证出生证明、未过期美国护照/护照卡、未过期 I-551、EAD，或符合清单组合要求的 I-94、外国护照与美国签证': [
        AZ_DOCUMENTS,
        AZ_TRAVEL_ID,
        AZ_FOREIGN,
      ],
      '所有提交文件应为英文原件或由签发机关认证的副本': [AZ_DOCUMENTS],
      '中文文件不要自行翻译后直接假定可接受，应先向 MVD 确认可接受的英文或认证文件路径': [
        AZ_DOCUMENTS,
      ],
      '两份 residency 应来自不同来源，并同时显示申请人姓名和当前 Arizona physical residential address': [
        AZ_TRAVEL_ID,
        AZ_DOCUMENTS,
      ],
      'utility bill、bank/credit-card statement、insurance policy 或 government document 只是常见类别': [
        AZ_TRAVEL_ID,
        AZ_NEW_RESIDENT,
      ],
      '材料不足两份时，Arizona Residency Affidavit 只能作为其中一份 residency，仍须再带一份合格地址证明': [
        AZ_TRAVEL_ID,
        AZ_RESIDENCY_AFFIDAVIT,
      ],
      'Travel ID 申请通常提供完整 SSN 即可，不要求另带 SSN card': [
        AZ_TRAVEL_ID,
      ],
      'EAD 持有人和姓名变化等情形可能需要 SSN 或 card，应按 class type 与当前页面准备': [
        AZ_FOREIGN,
        AZ_NAME,
        AZ_NEW_RESIDENT,
      ],
      'primary identity 上姓名与当前姓名不同，先向 SSA 更新，再带 marriage license/certificate、divorce decree、adoption decree 或 court order 等原件或认证副本连接姓名变化': [
        AZ_NAME,
        AZ_DOCUMENTS,
      ],
      '非公民把全部 current authorized-presence 文件一起带齐': [
        AZ_FOREIGN,
        AZ_DOCUMENTS,
      ],
      'F-1/J-1 除 passport、visa、I-94 外还应准备 I-20/DS-2019，EAD 持有人同时核对 SSN 要求': [
        AZ_FOREIGN,
      ],
      '外州转入带 current driver license 或 ID、authorized-presence 证明、SSN 和适用 Arizona residency': [
        AZ_NEW_RESIDENT,
        AZ_DOCUMENTS,
      ],
      '若靠 MVR 或过期证件申请免试，先确认是否未过期满 1 年': [
        AZ_DOCUMENTS,
        AZ_FAQ,
      ],
      '外国驾照持有人同时带原始有效 foreign license': [
        AZ_FOREIGN,
        AZ_LAW_NONRESIDENT,
      ],
      '中国大陆申请人按 permit test、vision 和 road test 准备，不把 IDP 或 Taiwan 免试规则当作换证凭证': [
        AZ_FOREIGN,
        AZ_PERMIT,
        AZ_ROAD_TEST,
      ],
      'Road test 当天带有效身份证明、current vehicle registration、Arizona 接受的 liability insurance，并检查租车合同是否列出申请人及车辆是否满足安全和空调时段要求': [
        AZ_ROAD_TEST,
      ],
      '先按用途选择 Non-Travel 或 Travel ID': [AZ_LICENSE_INFO, AZ_TRAVEL_ID],
      '只需驾驶且已有 passport 等 TSA accepted ID 时，不必把 Travel ID 当成唯一方案': [
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '再判断自己属于首次美国驾照、外州转入、外国驾照、续期、replacement、地址变化还是姓名变化，避免套错免试与线上资格': [
        AZ_PERMIT,
        AZ_NEW_RESIDENT,
        AZ_FOREIGN,
        AZ_RENEW,
        AZ_REPLACE,
        AZ_NAME,
      ],
      '下载当前 40-5144，逐项核对修订号、primary identity、SSN、两份不同来源 Arizona address 和完整 name-change chain': [
        AZ_DOCUMENTS,
      ],
      '姓名不一致时先向 SSA 更新并等 2 个工作日，再准备原件或认证副本': [
        AZ_NAME,
        AZ_DOCUMENTS,
      ],
      '不要先预约一个材料无法通过的到访': [AZ_DOCUMENTS, AZ_NAME],
      '非公民按 I-551、EAD 或 I-94 class type 配齐文件，F-1/J-1 加 I-20/DS-2019': [
        AZ_FOREIGN,
        AZ_DOCUMENTS,
      ],
      '无 SSN 时先让 MVD 明确当前 class type 的要求': [
        AZ_FOREIGN,
        AZ_IDENTITY,
      ],
      '中国大陆驾照持有人按没有 reciprocity exemption 的路径学习 Arizona Driver License Manual，完成 30 题、80% permit test、vision 和 road test': [
        AZ_FOREIGN,
        AZ_MANUAL,
        AZ_PERMIT,
        AZ_ROAD_TEST,
      ],
      '18 岁以上通过笔试后再预约 road test': [AZ_PERMIT, AZ_ROAD_TEST],
      '未满 18 岁者记录 permit 签发日、6 个月持证期和监护人要求': [
        AZ_PERMIT,
      ],
      '路考前检查身份证明、registration、liability insurance、租车授权、车辆安全与夏季空调限制，并熟悉英文指令': [
        AZ_ROAD_TEST,
      ],
      '用官方 locations 列表比较 MVD 和 driver-license ATP': [AZ_ATP_LOCATIONS],
      '选择 ATP 前电话确认具体业务、预约方式和 convenience fee': [
        AZ_ATP,
        AZ_ATP_LOCATIONS,
      ],
      '成为 Arizona resident 后同时推进 driver credential 与车辆 registration，先检查 Phoenix/Tucson emissions requirement，不等待一个未由普通新居民页面给出的通用 30 天倒计时': [
        AZ_NEW_RESIDENT,
        AZ_LAW_RESIDENT,
      ],
      '续期前检查卡面到期日、authorized-presence 截止日和 12 年照片节点，再让 AZ MVD Now 判断能否 online renewal': [
        AZ_RENEW,
        AZ_FOREIGN,
        AZ_FAQ,
      ],
      '遗失损坏且信息不变时走 $12 replacement': [AZ_REPLACE, AZ_FEES],
      '需要 Travel ID、改照片、改姓名或 MVD 要求重新核验时改走相应新申请或到场路径': [
        AZ_REPLACE,
        AZ_TRAVEL_ID,
        AZ_NAME,
      ],
      '搬家后 10 天内免费更新 MVD records': [AZ_ADDRESS, AZ_LAW_ADDRESS],
      '法定姓名变化则先改 SSA、等 2 个工作日并到场提交姓名文件': [
        AZ_NAME,
        AZ_LAW_ADDRESS,
      ],
      '完成交易后核对 temporary receipt 上的姓名和地址，为邮寄预留最多约 15 天': [
        AZ_LICENSE_INFO,
      ],
      '临近飞行时继续准备 passport 等 TSA accepted ID': [
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '以为 Arizona Travel ID 是驾驶必办证件，已有 passport 等 TSA 接受证件仍在临行前仓促申请': [
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '拿 Non-Travel license 单独过 TSA，忽略卡面 NOT FOR FEDERAL IDENTIFICATION': [
        AZ_LICENSE_INFO,
        TSA_IDENTIFICATION,
      ],
      '只带一份地址证明，或两份都来自同一来源、没有当前 physical residential address': [
        AZ_TRAVEL_ID,
        AZ_DOCUMENTS,
      ],
      '带手机照片、普通复印件或自行翻译的中文材料，未满足英文原件或签发机关认证副本要求': [
        AZ_DOCUMENTS,
      ],
      '认为所有申请都必须出示 SSN card，或反过来认为任何非公民都可不提供 SSN，未按 class type 与文件类型核对': [
        AZ_TRAVEL_ID,
        AZ_FOREIGN,
        AZ_IDENTITY,
      ],
      '把中国大陆驾照当作 Taiwan 驾照，错误预期知识和路考双免': [
        AZ_FOREIGN,
        AZ_LAW_RECIPROCITY,
      ],
      '只携带 IDP 而没有随身携带原始有效外国驾照': [
        AZ_FOREIGN,
        AZ_FAQ,
        AZ_LAW_NONRESIDENT,
      ],
      '从未持有美国驾照就直接预约 road test，没有先通过 30 题、80% 门槛的 permit test': [
        AZ_PERMIT,
        AZ_ROAD_TEST,
      ],
      '通过 Mandarin 笔试后仍未准备 road test 的英文指令和英文交通标志': [
        AZ_PERMIT,
        AZ_ROAD_TEST,
      ],
      '借用没有当前 registration、合格 liability insurance 的车辆，或租车合同没有列出申请人': [
        AZ_ROAD_TEST,
      ],
      '夏季中午后用没有空调的车辆参加 road test，或同一天安排第二次考试': [
        AZ_ROAD_TEST,
      ],
      '把外州驾照通常免试的规则套给外国驾照，或用过期满 1 年的证件预期自动免试': [
        AZ_FAQ,
        AZ_DOCUMENTS,
        AZ_FOREIGN,
      ],
      '照搬其他州的 30 天期限，忽略 Arizona 的工作、投票、居民学费和一年 7 个月等 resident triggers': [
        AZ_NEW_RESIDENT,
        AZ_IDENTITY,
        AZ_LAW_RESIDENT,
      ],
      '默认 Authorized Third Party 与 MVD 同价、所有地点都做 road test，或期待柜台当场拿到塑料卡': [
        AZ_ATP,
        AZ_ATP_LOCATIONS,
      ],
      '只向 USPS 改地址，超过 10 天仍未更新 MVD driver 和 vehicle records': [
        AZ_ADDRESS,
        AZ_LAW_ADDRESS,
      ],
      '姓名变化后先去 MVD，未先向 SSA 更新并等 2 个工作日，也没有带连接旧名与新名的认证文件': [
        AZ_NAME,
        AZ_DOCUMENTS,
      ],
      '等待 renewal notice 才检查到期日，或忘记 12 年照片更新可能触发 office visit': [
        AZ_RENEW,
        AZ_FAQ,
      ],
      '把 temporary receipt 当成 TSA 保证接受的正式证件，未为实体卡预留约 2 周': [
        AZ_LICENSE_INFO,
        AZ_TRAVEL_ID,
        TSA_IDENTIFICATION,
      ],
      '非公民按普通最大期限推算到期日，忽略 license 会受 authorized-presence 文件截止日限制': [
        AZ_FOREIGN,
        AZ_TRAVEL_ID,
        AZ_LAW_TERM,
      ],
    },
  },
  colorado: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      CO_REAL_ID,
      CO_DOCUMENTS,
      CO_DR2300A,
      CO_STANDARD,
      CO_DR2300B,
      CO_DR2300C,
      CO_AFFIDAVIT,
      CO_NEW,
      CO_FOREIGN,
      CO_ADULT_PERMIT,
      CO_ADULT_LICENSE,
      CO_HOME_TEST,
      CO_APPOINTMENT,
      CO_FEES,
      CO_RENEW,
      CO_ADDRESS,
      CO_FAQ,
      CO_STANDARD_FAQ,
      CO_REPLACE,
      CO_ID,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Colorado DMV 的 REAL ID、DR 2300A/B/C、CO-RCSA、材料、预约、费用、新居民、外州与外国驾照、permit、考试语言、第三方路考、续期、改址改名、补证、ID 和邮寄正文。',
    notes:
      '重写身份分流与办事路径，纳入 2025-03-31 后 Standard 新规则，区分中国大陆与 Taiwan reciprocity，并把费用、期限、材料、考试和法律后果改为显式来源；仍待真实人工签字。',
    claims: {
      '科罗拉多先按身份与用途分流：符合联邦条件的申请人办理带星 REAL ID，undocumented 或多数 temporarily lawfully present 居民办理带黑色限制栏的 Standard credential': [
        CO_REAL_ID,
        CO_STANDARD,
      ],
      '成为 Colorado resident 后，驾照通常要在 30 天内转入，车辆由 county office 在 90 天内注册': [
        CO_NEW,
      ],
      'Colorado Standard driver license、permit 或 ID 是有效州身份证件，但不是 REAL ID，不能用于要求 REAL ID 的联邦用途': [
        CO_STANDARD,
        CO_REAL_ID,
      ],
      '现行 CO-RCSA 路径面向 undocumented 与 temporarily lawfully present 居民，通常有效 3 年，并按身份类别使用 DR 2300B 或 DR 2300C': [
        CO_STANDARD,
        CO_DR2300B,
        CO_DR2300C,
      ],
      '首次 Colorado REAL ID 或外州转入通常要按 DR 2300A 准备 identity 与 lawful-presence 文件、Social Security number、两份不同的 Colorado physical-address 证明和完整姓名变化链': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '外州卡即使已经有 REAL ID 星标，也不会免除 Colorado 的文件核验': [
        CO_DOCUMENTS,
        CO_REAL_ID,
      ],
      'State driver license office 主要实行预约制，首次申请和外州转入应先 pre-register 再预约': [
        CO_APPOINTMENT,
        CO_DOCUMENTS,
      ],
      '14 个 county office 的驾照服务、walk-in 和费用各自确认，车辆 title/registration 由 county 办理，普通 drive skills test 则直接向州批准的 third-party school 预约': [
        CO_APPOINTMENT,
      ],
      'Colorado 给符合 REAL ID 条件的居民签发带黑色或旧版金色星标的 credential': [
        CO_REAL_ID,
      ],
      '带黑色横幅并写有 NOT VALID FOR FEDERAL IDENTIFICATION, VOTING OR PUBLIC BENEFIT PURPOSES 的 Standard credential 不属于 REAL ID': [
        CO_REAL_ID,
        CO_STANDARD,
      ],
      'REAL ID 不是合法驾驶的额外许可': [CO_REAL_ID, CO_STANDARD],
      '18 岁以上旅客自 2025 年 5 月 7 日起进入 TSA checkpoint 时，可使用 REAL ID 或有效护照等 TSA 接受的替代证件': [
        CO_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'Colorado temporary paper credential 可以立即作为临时驾驶凭证，但 DMV 与 TSA 都提醒它本身不是可接受的 REAL ID 航空身份证件': [
        CO_DOCUMENTS,
        CO_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '美国公民、永久居民、Freely Associated States 公民和适用 CDL 申请人的首次 Colorado credential，应按 Required Documents 或 DR 2300A 路径证明 identity、lawful presence、SSN 和 Colorado address': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '身份与 lawful-presence 文件通常必须是未更改的原件或签发机关认证副本': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '普通复印件、手机照片、层压版本和仅经公证人认证的副本不能替代': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      'Required Documents 页面要求准备 SSN card、W-2、显示全名和完整 SSN 的 pay stub、SSA-1099 或其他 1099 之一': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      'Driver License FAQ 也说明可口头提供号码，但材料条件复杂时携带文件更稳妥': [
        CO_FAQ,
        CO_DOCUMENTS,
      ],
      'REAL ID 路径要带两份不同的 Colorado address 文件，两份都显示全名和当前 physical address、不得只有 P.O. Box，并在过去一年内出具': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '电子版地址证明可以在手机上出示': [CO_DOCUMENTS],
      'junk mail、手写收据、仅有 P.O. Box 或贴标签/手写改址的信封不接受': [
        CO_DOCUMENTS,
      ],
      '姓名与 identity、SSN 或旧 credential 不一致时，按身份类别准备能连接每次变化的认证文件': [
        CO_DOCUMENTS,
        CO_STANDARD,
      ],
      '普通 REAL ID 姓名变更还要先让 SSA 更新记录': [CO_FAQ],
      '自 2025 年 3 月 31 日起，undocumented 首次 Standard 申请人不再需要 SSN/ITIN、上一年度 Colorado income-tax filing 或过去两年居住打印证明': [
        CO_STANDARD,
      ],
      'Undocumented Standard 首次申请通常需要一份 home-country passport、consular card 或 military ID、一份过去一年内的当前 Colorado physical-address 证明，以及 CO-RCSA affidavit': [
        CO_STANDARD,
        CO_DR2300C,
        CO_AFFIDAVIT,
      ],
      '身份文件可未过期或过期不足 10 年': [
        CO_STANDARD,
        CO_DR2300C,
      ],
      'Temporarily lawfully present 申请人按 DR 2300B 提交 identity、当前 lawful-presence 文件和一份过去一年内的 Colorado physical-address 证明，并通过 SAVE 等适用核验': [
        CO_STANDARD,
        CO_DR2300B,
      ],
      'Standard credential 是有效 Colorado 身份证件但不是 REAL ID，通常自签发日起有效 3 年': [
        CO_STANDARD,
      ],
      '未成年人驾照为 3 年或 21 岁生日后 20 天，以较早者为准': [
        CO_STANDARD,
      ],
      '多数 temporarily lawfully present 居民即使原外州卡有 REAL ID 星标，转入 Colorado 后仍取得 Standard credential': [
        CO_STANDARD,
        CO_DR2300B,
        CO_REAL_ID,
      ],
      '不要把外州星标当作 Colorado REAL ID 资格证明': [
        CO_DOCUMENTS,
        CO_STANDARD,
      ],
      '当前费用表列 REAL ID driver license/renewal $32、instruction permit $19、未满 60 岁 ID $13': [
        CO_FEES,
      ],
      '超过 60 岁的普通 ID 免费': [CO_FEES, CO_ID],
      '当前 Standard 费用表列 driver license $34、instruction permit $21.50、ID $13.30': [
        CO_FEES,
      ],
      '首次 duplicate permit/license $12.30，后续 duplicate $16.40': [
        CO_FEES,
        CO_REPLACE,
      ],
      'Colorado resident 的触发条件包括在州内经营业务、在州内受雇，或连续居住 90 天': [
        CO_NEW,
      ],
      '建立 residency 后驾照转入期限为 30 天，车辆注册期限为 90 天': [
        CO_NEW,
      ],
      '持有效或过期不足 1 年的美国外州驾照转入时，应带原卡': [
        CO_NEW,
        CO_DOCUMENTS,
      ],
      '也可用 30 天内出具、显示该驾照仍有效或过期不足 1 年的 MVR，原外州卡会被打孔作废': [
        CO_NEW,
      ],
      '持有效美国外州驾照通常无需重新考试': [CO_FAQ, CO_NEW],
      '证件过期超过 1 年，或从未持证、驾照取消超过 12 个月，则应准备 written test、permit 和 drive test 路径': [
        CO_NEW,
        CO_ADULT_PERMIT,
        CO_RENEW,
      ],
      'Colorado 当前外国驾照 reciprocity 名单是 Canada、France、Germany、Republic of South Korea、Taiwan 和 Japan': [
        CO_FOREIGN,
      ],
      '符合国籍、永久居民和文件条件者可免 permit、written 与 drive tests': [
        CO_FOREIGN,
      ],
      'Taiwan 驾照还要 Denver Taipei Economic and Cultural Office 出具确认有效并含翻译的 official statement': [
        CO_FOREIGN,
      ],
      'Japan 路径限日本国民，并要带预约前 3 个月内由 Denver 日本总领馆签发的 VCDL': [
        CO_FOREIGN,
      ],
      '中国大陆驾照不在当前 reciprocity 名单中': [CO_FOREIGN],
      '持证人应按年龄和身份完成 Colorado permit、written test、vision 与 third-party drive test，不要套用 Taiwan 路径': [
        CO_FOREIGN,
        CO_ADULT_PERMIT,
        CO_ADULT_LICENSE,
      ],
      'Adult applicant 从未有驾照，或驾照 expired/canceled 超过 12 个月时必须先取得 permit': [
        CO_ADULT_PERMIT,
      ],
      '可在办公室或 @Home 完成 knowledge test': [
        CO_ADULT_PERMIT,
        CO_HOME_TEST,
      ],
      '@Home 与州办公室 knowledge test 目前只直接提供 English 和 Spanish': [
        CO_HOME_TEST,
        CO_ADULT_PERMIT,
      ],
      '需要其他口语翻译可按 office accommodation 路径自带 interpreter，interpreter 要出示未过期 driver license 或 ID，姓名和证件号会记入档案': [
        CO_ADULT_PERMIT,
        CO_STANDARD_FAQ,
        CO_DOCUMENTS,
      ],
      '@Home knowledge test 第一次总费用当前为 $6.50，之后每次 $17.65，每天最多两次': [
        CO_HOME_TEST,
      ],
      '通过后仍要预约 state office 完成 permit 签发': [
        CO_HOME_TEST,
        CO_ADULT_PERMIT,
      ],
      'State driver license offices 当前不做普通 drive skills test': [
        CO_ADULT_LICENSE,
        CO_APPOINTMENT,
      ],
      '申请人直接向 approved third-party testing school 预约，学校可另收自己的测试费': [
        CO_APPOINTMENT,
        CO_STANDARD_FAQ,
      ],
      'Drive test 车辆要有有效 registration、有效 insurance 并通过灯光等安全检查': [
        CO_STANDARD_FAQ,
      ],
      '州费表另列每次 written retest $11.50 和 drive-test retest $15.40': [
        CO_FEES,
      ],
      '办公室交易先发立即有效的 paper temporary credential，实体卡通常约 10 至 14 个工作日寄到，官方统一要求最多预留 30 天': [
        CO_DOCUMENTS,
        CO_ID,
      ],
      '成人 regular credential 符合条件时可线上续期': [CO_RENEW],
      '常见条件包括 21 岁以上、照片不足 10 年、过期不超过 1 年、无姓名或视力变化、无 active restriction，且过去 5 年没有 DUI': [
        CO_RENEW,
      ],
      '21 至 79 岁线上续期要确认过去一年做过 eye exam': [
        CO_RENEW,
      ],
      '80 岁及以上要上传过去 6 个月内由 optometrist/ophthalmologist 签署的 DR 2498': [
        CO_RENEW,
      ],
      'Undocumented 居民可按资格 online renewal，并重新提交 CO-RCSA affidavit': [
        CO_STANDARD,
        CO_RENEW,
      ],
      'temporarily lawfully present 居民只能到 office 续期，并带当前 lawful-presence 文件或 extension letter': [
        CO_STANDARD,
        CO_RENEW,
      ],
      '只更新地址可在线、邮寄或到 office 修改记录，再自行把新地址标签贴到卡背，DMV 不会因此自动寄新卡': [
        CO_ADDRESS,
        CO_FAQ,
      ],
      '要让新地址印在卡上需购买新 credential 或在续期中更新': [
        CO_ADDRESS,
      ],
      '普通姓名变更要先在 SSA 留档并至少等待 24 至 48 个工作小时，再预约 state office 带认证姓名文件': [
        CO_FAQ,
      ],
      'TLP 或 undocumented 的姓名证据必须按其 USCIS 或 home-country 文件规则处理，不能直接套用普通 marriage-certificate 路径': [
        CO_STANDARD,
        CO_DR2300B,
        CO_DR2300C,
      ],
      '遗失、被盗或严重损坏的 driver license/permit duplicate 不能在线办理，通常要预约并保留原到期日': [
        CO_REPLACE,
      ],
      '遗失 ID 则按 renewal 处理，是否可线上取决于照片和其他资格': [
        CO_REPLACE,
      ],
      '实体卡签发 30 天仍未收到时先查 Where is my Driver License/ID': [
        CO_REPLACE,
        CO_ID,
      ],
      '在签发后第 30 至 90 天到 state office 申请可能免费，超过 90 天通常要重新付 duplicate 费用': [
        CO_REPLACE,
      ],
      'Colorado 居民不能同时持有 Colorado driver license/permit 和 ID card': [
        CO_ID,
      ],
      '首次 ID 要预约并交相应身份文件，未满 21 岁通常由 legal guardian 陪同并证明 guardianship': [
        CO_ID,
        CO_DOCUMENTS,
      ],
      '先按身份选择正确清单：U.S. citizen/permanent resident/FAS/适用 CDL 用 Required Documents 或 DR 2300A': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      'temporarily lawfully present 用 DR 2300B': [
        CO_STANDARD,
        CO_DR2300B,
      ],
      'undocumented 用 DR 2300C': [CO_STANDARD, CO_DR2300C],
      'REAL ID 身份与 lawful-presence 材料带原件或签发机关认证副本': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '不要带手机照片、普通 photocopy、层压件或仅由 notary 认证的副本': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      'SSN 最稳妥的准备方式是带 signed Social Security card、W-2、显示全名和完整号码的 pay stub、SSA-1099 或其他 1099 之一': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '准备两份不同来源的 Colorado residency：两份都显示全名、当前 physical address、完整日期且不超过一年': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '电子版可在手机上展示，但不能只有 P.O. Box': [CO_DOCUMENTS],
      '身份文件与当前姓名不同，按每次变更准备 certified marriage/civil-union certificate、divorce decree 或 court order，并先完成适用的 SSA 或 USCIS/home-country 记录更新': [
        CO_DOCUMENTS,
        CO_FAQ,
        CO_STANDARD,
      ],
      'Undocumented Standard 首次申请带一份合格 home-country passport、consular card 或 military ID、一份当前 Colorado address 和 CO-RCSA affidavit': [
        CO_STANDARD,
        CO_DR2300C,
        CO_AFFIDAVIT,
      ],
      '不要再按 2025 年 3 月 31 日前的 SSN/ITIN、报税或两年居住旧清单准备': [
        CO_STANDARD,
      ],
      'Temporarily lawfully present 申请人带 DR 2300B 所列 current passport、I-94、I-766、I-797 或其他适用 USCIS 文件及一份当前地址证明': [
        CO_STANDARD,
        CO_DR2300B,
      ],
      '具体组合必须能通过 SAVE': [CO_DR2300B, CO_STANDARD],
      '外州转入带有效或过期不足 1 年的原驾照': [
        CO_NEW,
        CO_DOCUMENTS,
      ],
      '没有原卡时准备 30 天内出具并显示相同有效状态的 MVR，仍要另带 Colorado 身份、SSN 和地址材料': [
        CO_NEW,
        CO_DOCUMENTS,
      ],
      '外国驾照不要单独当 identity document': [
        CO_ADULT_PERMIT,
        CO_STANDARD,
      ],
      'reciprocity 申请人同时准备有效原驾照和该国家的附加证明，中国大陆申请人另备 knowledge、vision、permit 与 drive-test 文件': [
        CO_FOREIGN,
        CO_ADULT_PERMIT,
        CO_ADULT_LICENSE,
      ],
      '需要中文口头协助时提前确认 office interpreter 路径': [
        CO_ADULT_PERMIT,
        CO_STANDARD_FAQ,
      ],
      '自带 interpreter 要有未过期 driver license/ID，外文身份文件还要与满足 Colorado 固定声明格式的完整英文翻译一起提交': [
        CO_DOCUMENTS,
        CO_STANDARD,
        CO_STANDARD_FAQ,
      ],
      'Permit 签发带通过证明和身份材料': [
        CO_ADULT_PERMIT,
        CO_DOCUMENTS,
      ],
      'drive test 当天带 permit、有效 vehicle registration、insurance，并先确认第三方学校的车辆、安全检查和额外费用要求': [
        CO_ADULT_LICENSE,
        CO_STANDARD_FAQ,
        CO_APPOINTMENT,
      ],
      '先判断用途：只需驾驶或州内身份，还是需要 TSA/联邦用途': [
        CO_REAL_ID,
        CO_STANDARD,
      ],
      '有有效 passport 等 TSA accepted ID 时，不必把临行前办理 REAL ID 当作唯一方案': [
        CO_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '再判断身份清单：DR 2300A、DR 2300B 或 DR 2300C，只使用与自己当前身份相符的一套，不混用 REAL ID 与 Standard 要求': [
        CO_DOCUMENTS,
        CO_STANDARD,
      ],
      '确认交易类型：首次驾照、外州转入、外国驾照、permit、续期、duplicate、地址变更、姓名变更或 ID card': [
        CO_APPOINTMENT,
        CO_RENEW,
        CO_REPLACE,
      ],
      '首次和转入先完成 online pre-registration，再用 Appointment Scheduling 选择 First Time CO DL/Permit/ID': [
        CO_DOCUMENTS,
        CO_APPOINTMENT,
      ],
      '保存 confirmation email 和 appointment ID': [CO_APPOINTMENT],
      'REAL ID 按 identity/lawful presence、SSN、两份 current Colorado address、name-change chain 五组整理原件或认证副本': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      'Standard 申请人按 DR 2300B/2300C 准备 identity、适用 lawful presence、一份 current address 和 CO-RCSA affidavit，不提交已经取消的旧税表或两年居住要求': [
        CO_STANDARD,
        CO_DR2300B,
        CO_DR2300C,
        CO_AFFIDAVIT,
      ],
      '姓名不一致时先完成 SSA、USCIS 或 home-country document 更新，再准备对应认证文件': [
        CO_FAQ,
        CO_STANDARD,
      ],
      '普通姓名变更至少给 SSA 24 至 48 个工作小时同步': [CO_FAQ],
      '美国外州转入核对旧证是否有效或过期不足 1 年': [CO_NEW],
      '没有原卡时在到访前 30 天内取得合格 MVR': [CO_NEW],
      '外国驾照先检查六地 reciprocity 及附加条件': [CO_FOREIGN],
      '中国大陆驾照按无 reciprocity 路径准备 permit、English/Spanish knowledge test、vision 和 third-party drive test': [
        CO_FOREIGN,
        CO_ADULT_PERMIT,
        CO_ADULT_LICENSE,
      ],
      '需要 knowledge test 时选择 @Home、state office 或 driving school': [
        CO_HOME_TEST,
        CO_ADULT_PERMIT,
      ],
      '要中文口头翻译则提前确认 office interpreter 要求，不把 @Home 当作中文考试': [
        CO_HOME_TEST,
        CO_ADULT_PERMIT,
        CO_STANDARD_FAQ,
      ],
      '通过 permit test 后预约 state office 完成签发': [
        CO_HOME_TEST,
        CO_ADULT_PERMIT,
      ],
      '再直接联系 approved third-party school 做 drive test，核对 permit、registration、insurance、安全检查和学校收费': [
        CO_APPOINTMENT,
        CO_ADULT_LICENSE,
        CO_STANDARD_FAQ,
      ],
      'office 交易后核对 paper temporary credential 上的姓名和地址，并为实体卡预留 10 至 14 个工作日、最多 30 天': [
        CO_DOCUMENTS,
        CO_ID,
      ],
      '飞行时另带正式 TSA accepted ID': [
        CO_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '续期先让 myDMV 判断线上资格': [CO_RENEW],
      '照片满 10 年、姓名/视力/身份变化、TLP、过期超过 1 年等情形改走 office': [
        CO_RENEW,
      ],
      '只改地址时更新记录并贴自制地址标签': [CO_ADDRESS],
      '要新地址印在卡上、要改名或要 duplicate 时，按相应 office/renewal 路径付费办理': [
        CO_ADDRESS,
        CO_FAQ,
        CO_REPLACE,
      ],
      '签发 30 天仍未收到就立即查 delivery status': [
        CO_REPLACE,
        CO_ID,
      ],
      '在第 30 至 90 天窗口向 state office 处理可能的免费 replacement': [
        CO_REPLACE,
      ],
      '成为 resident 后同时安排 driver credential 与 county vehicle registration：驾照 30 天、车辆 90 天，不把 county title/registration 约到 state driver-license office': [
        CO_NEW,
        CO_APPOINTMENT,
      ],
      '外州驾照已有 REAL ID 星标，就以为 Colorado 不会重新核验 identity、lawful presence、SSN 和两份地址': [
        CO_DOCUMENTS,
        CO_REAL_ID,
      ],
      '用带黑色限制栏的 Standard credential 单独过 TSA，忽略它不是 REAL ID': [
        CO_STANDARD,
        CO_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '把 paper temporary credential 当作 TSA 接受的正式带星证件': [
        CO_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'REAL ID 只带一份地址证明，或文件超过一年、只有 P.O. Box、没有申请人全名': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '用普通复印件、手机照片、层压文件或 notary copy 代替签发机关认证副本': [
        CO_DOCUMENTS,
        CO_DR2300A,
      ],
      '看到 FAQ 可口头报 SSN，就完全不准备 Required Documents 页面列出的 SSN 文件': [
        CO_FAQ,
        CO_DOCUMENTS,
      ],
      '仍按旧 CO-RCSA 清单准备 SSN/ITIN、上一年度报税和过去两年 residency，反而漏掉当前 affidavit 与一份地址': [
        CO_STANDARD,
        CO_AFFIDAVIT,
      ],
      'Temporarily lawfully present 申请人拿外州 REAL ID 来期待 Colorado 继续签发 REAL ID，而没有按 DR 2300B 准备 Standard credential': [
        CO_STANDARD,
        CO_DR2300B,
        CO_REAL_ID,
      ],
      'Undocumented 或 TLP 直接用普通 marriage certificate 改名，没有先按 home-country 或 USCIS 记录规则更新': [
        CO_STANDARD,
        CO_DR2300B,
        CO_DR2300C,
      ],
      '把中国大陆驾照误当 Taiwan 驾照，缺少 written、permit 或 drive test': [
        CO_FOREIGN,
        CO_ADULT_PERMIT,
        CO_ADULT_LICENSE,
      ],
      '用外国驾照代替 Standard 申请所需的 passport、consular card 或 home-country military ID': [
        CO_STANDARD,
        CO_DR2300C,
      ],
      '在 Colorado state driver license office 预约普通 road test，而没有联系 approved third-party school': [
        CO_ADULT_LICENSE,
        CO_APPOINTMENT,
      ],
      '以为 @Home test 有中文界面，未提前安排 English/Spanish 或 office interpreter 路径': [
        CO_HOME_TEST,
        CO_ADULT_PERMIT,
      ],
      '驾照过期超过 1 年仍按普通 transfer/renewal 预约，没准备重新考 written 和 drive test': [
        CO_NEW,
        CO_RENEW,
        CO_ADULT_PERMIT,
      ],
      '首次申请或外州转入没有 pre-register，也没有 state-office appointment confirmation': [
        CO_DOCUMENTS,
        CO_APPOINTMENT,
      ],
      '把 driver license、vehicle registration 和 road test 都预约到同一个地点，忽略 state、county 与 third party 的分工': [
        CO_APPOINTMENT,
        CO_NEW,
      ],
      '只更新 DMV address record 后等待新卡寄来，未自行贴标签或另购印有新地址的 credential': [
        CO_ADDRESS,
      ],
      '先到 DMV 改名，没有先完成 SSA 更新和至少 24 至 48 个工作小时同步': [
        CO_FAQ,
      ],
      '尝试在线办理 duplicate driver license，忽略该业务通常需要 office appointment': [
        CO_REPLACE,
      ],
      '实体卡 30 天未到仍不查状态，错过签发后 30 至 90 天的可能免费 replacement 窗口': [
        CO_REPLACE,
      ],
      '同时保留 Colorado driver license/permit 和 Colorado ID card，忽略州规则只允许二者之一': [
        CO_ID,
      ],
    },
  },
  nevada: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      NV_REAL_ID,
      NV_RESIDENCY,
      NV_DAC,
      NV_NEW,
      NV_LAW,
      NV_HANDBOOK,
      NV_FIRST,
      NV_ADULT,
      NV_TESTING,
      NV_ROAD,
      NV_WAIVER,
      NV_TRANSLATORS,
      NV_FEES,
      NV_RENEW,
      NV_DUPLICATE,
      NV_ADDRESS,
      NV_QUICK,
      NV_APPOINTMENTS,
      NV_LOCATIONS,
      NV_ONLINE,
      NV_ID,
      NV_FAQ,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Nevada DMV 的 REAL ID、Standard、DAC、identity/residency、现行 NRS、2026 handbook、新居民、外国驾照、DMV 015、成人 permit、知识与路考、翻译、费用、续期、补证、改名改址、Quick Cards、预约、ID 和邮寄正文。',
    notes:
      '重写三类 credential 判断与办事路径，补齐 China/Taiwan/South Korea、无 SSN、Limited Term、口译和 current fee 边界，并公开标注 Taiwan waiver 年龄与 out-of-state REAL ID 模块的官方页面差异；仍待真实人工签字。',
    claims: {
      '内华达州先按用途和文件能力选择 REAL ID、Standard license/ID 或 Driver Authorization Card（DAC）：REAL ID 用于联邦身份场景，Standard 仍可州内驾驶和一般身份证明，DAC 只授予驾驶权限而不作为身份证明': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
      ],
      '成为 Nevada resident 后，如要在州内驾驶，现行 NRS 483.245 要求在 30 天内取得 Nevada 驾照': [
        NV_LAW,
        NV_HANDBOOK,
      ],
      '21 岁及以上持有效美国州、美国领地或 Canada 驾照的新居民，在没有不良记录等触发条件时通常只做 vision test': [
        NV_NEW,
        NV_FIRST,
        NV_TESTING,
      ],
      '外国证件不是自动免试依据': [NV_FIRST, NV_TESTING],
      '中国大陆驾照不在当前 DMV 015 reciprocity 名单中，成为 Nevada resident 后通常要按 foreign-country license 路径完成 vision、knowledge 和 skills tests': [
        NV_NEW,
        NV_FIRST,
        NV_TESTING,
        NV_WAIVER,
      ],
      '首次或升级 Nevada REAL ID 必须到 DMV office 出示一份合格 identity、一份显示完整 SSN 的证明、两份 Nevada residential-address 证明、完整姓名变化链及适用的 DMV-approved translation': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '有效外州 REAL ID 通常只能作为 Nevada Standard credential 的 identity 依据': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '要取得 Nevada REAL ID，专门 REAL ID 页面要求重新出示 foundational documents': [
        NV_REAL_ID,
      ],
      'Quick Cards 只能让符合条件的成人在线开始首次 license、ID、instruction permit 或 DAC 申请': [
        NV_QUICK,
      ],
      'conditional approval 后仍要预约办公室出示原件、付款和拍照': [
        NV_QUICK,
      ],
      'Nevada DMV 当前除牌照交回、逾期债务付款、部分 VIN inspection 和 Turbo Titles 文件交回外，其他 office 服务均要求预约': [
        NV_APPOINTMENTS,
      ],
      'Nevada REAL ID 是现有 driver license、permit 或 ID 的联邦合规版本，右上角有金色 Nevada 星标': [
        NV_REAL_ID,
      ],
      'Standard 卡标有 Not for Real ID Purposes，DAC 标有 Not Valid for ID': [
        NV_REAL_ID,
        NV_DAC,
      ],
      '18 岁以上旅客自 2025 年 5 月 7 日起进入 TSA checkpoint 时，要使用 REAL ID 或 passport 等 TSA 接受的替代证件': [
        NV_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'Standard Nevada license 仍可用于合法驾驶和州内一般用途，但不能单独用于要求 REAL ID 的国内航班或安全联邦设施': [
        NV_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'DAC 允许符合条件的 Nevada resident 驾驶、注册和投保车辆，但不能用来取得福利、执照或服务，也不能作为航空或联邦身份证件': [
        NV_DAC,
      ],
      'Nevada 一人只能持有一张有效 credential，升级 REAL ID 会替换 Standard credential，居民申领 Nevada license 或 DAC 时也必须交回外州 license/ID': [
        NV_REAL_ID,
        NV_DAC,
        NV_FAQ,
        NV_ID,
      ],
      'REAL ID identity 通常从未过期 U.S. passport、U.S. birth certificate、FS-240、N-550、N-560、I-551、合格 foreign passport/I-94 或 I-766 中选一份': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'Hospital birth certificate、军人证、外国驾照、外国出生证、border crossing card 和 consular ID 不能作为 Nevada REAL ID identity document': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'Identity 与姓名文件应是有效原件或签发机关认证副本，普通 photocopy、scan 或手机照片不能替代': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
      ],
      '姓名不同要用政府签发 marriage certificate、divorce decree、adoption record 或 court order 连起每一次变化': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'Social Security card 不能代替姓名变更文件': [NV_REAL_ID, NV_RESIDENCY],
      'SSN 证明可用 Social Security card、W-2、IRS 1099 或 printed pay stub，文件必须显示当前法定姓名和完整号码': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '已有合法身份但没有 SSN 的申请人可能取得 Standard license/ID': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '已申请但尚未收到 SSN 时，Nevada DMV 页面允许在申请表中作 attestation': [
        NV_RESIDENCY,
        NV_ADULT,
      ],
      'REAL ID 与 Standard 通常都要两份显示申请人姓名和 Nevada residential address 的证明，online account 的原始打印件可以接受': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'Lease、utility bill、bank statement、pay stub、court record 等常见地址材料通常要在前 60 天内出具': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'insurance、medical、tax、property-tax 或 mortgage 类材料按最近签发版本准备': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'REAL ID 卡面必须显示 physical address，Standard 与 DAC 可显示 physical 或 mailing address，但申请人仍要证明 Nevada residency': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '缺少本人名下地址材料时，可核对 DMV 005、DMV 115 或 DMV 116 是否符合自己的居住情形，不要自行写一封无对应表格的说明代替全部证据': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
      ],
      '任何非英文文件都要由 Nevada DMV approved translator 制作完整 typed/electronically printed translation，包含日期、translator number、姓名、签名和规定声明': [
        NV_TRANSLATORS,
        NV_RESIDENCY,
        NV_DAC,
      ],
      '摘要式翻译或把声明另放一页会被拒': [NV_TRANSLATORS],
      '以美国移民文件证明 identity 的 license/ID 会标为 Limited Term，通常跟随电子核验的 departure date，到期日为 D/S 时一般自签发日起一年': [
        NV_RENEW,
        NV_RESIDENCY,
        NV_HANDBOOK,
      ],
      'Standard identity 清单可接受有效外州 REAL ID，但 non-compliant 外州卡和 Limited Term 外州 REAL ID 不能单独替代所需移民文件': [
        NV_RESIDENCY,
        NV_REAL_ID,
      ],
      'DAC 不要求 SSN，identity 可按一份主文件、一份特定军人/部落文件，或两份外州/外国政府文件中的相应组合证明': [
        NV_DAC,
        NV_RESIDENCY,
      ],
      'DAC 的外国文件必须有效且用原件，外文材料仍需 DMV-approved translation，通常还要完整姓名变化链和两份 Nevada 地址证明': [
        NV_DAC,
        NV_TRANSLATORS,
        NV_RESIDENCY,
      ],
      '当前费用表列 64 岁及以下 original/renewal 8-year non-commercial license $41.50，4-year DAC 或 Limited Term license $22.50，instruction permit $22.50，duplicate license/DAC $17.50': [
        NV_FEES,
      ],
      '65 岁及以上 non-commercial license 的 original、duplicate、renewal 或 instruction permit 当前均为 $17.50': [
        NV_FEES,
      ],
      '首次 knowledge 与 skills testing fee 当前为 $25，之后每次 retest $10': [
        NV_TESTING,
        NV_FEES,
      ],
      'KnowToDrive online knowledge exam 另收每次 $6.75，DMV 的 $25 initial testing fee 仍会收取': [
        NV_TESTING,
      ],
      '单独把现有 Nevada driver license 升级 REAL ID 的页面费用为 $8.50，ID card 为 $7.50': [
        NV_REAL_ID,
        NV_ADDRESS,
      ],
      '首次签发或续期仍应按对应 license/ID transaction fee 判断总额': [
        NV_FEES,
        NV_REAL_ID,
      ],
      'Nevada resident 包括依法定居、在州内经营并保有车辆、在州内生活工作，或为取得仅居民可用权益而声明 residency 的人': [
        NV_RESIDENCY,
        NV_NEW,
      ],
      '成为 resident 后继续在 Nevada 驾驶，NRS 483.245 要求 30 天内取得 Nevada driver license': [
        NV_LAW,
        NV_HANDBOOK,
      ],
      '新居民车辆通常也要在 30 天内注册': [NV_NEW, NV_HANDBOOK],
      '有效美国州、美国领地或 Canada 驾照的 21+ 新居民通常只做 vision test，但证件遗失、年龄未满 21 岁、近年违规、DUI、停吊销或 restriction 可能触发 knowledge 或 skills test': [
        NV_NEW,
        NV_FIRST,
        NV_TESTING,
      ],
      'Nevada honor 合法外国政府签发的访客驾照，International Driver License/Permit 不是必须文件，也不能脱离原驾照单独使用': [
        NV_FAQ,
        NV_LAW,
      ],
      '游客不能取得 Nevada license/ID': [NV_RESIDENCY, NV_NEW, NV_ADULT],
      '成为居民后，持 China 等非 Canada 外国驾照者通常要 vision、knowledge 和 skills tests': [
        NV_NEW,
        NV_FIRST,
        NV_TESTING,
      ],
      'DMV 015（3/2025）把 South Korea 与 Republic of China（Taiwan）列为可申请 drive-test waiver 的 reciprocity 地区，但明确只免 skills test，其他材料和测试要求仍适用': [
        NV_WAIVER,
        NV_RESIDENCY,
      ],
      'Nevada 网页对 Taiwan 路径写 21+、有效 Class B license、Taiwan consular verification、vision 和 knowledge test，而 DMV 015 表格写 foreign national 18+': [
        NV_ADULT,
        NV_RESIDENCY,
        NV_WAIVER,
      ],
      '18 至 20 岁申请人应先向 DMV 确认是否可用 waiver': [
        NV_ADULT,
        NV_WAIVER,
      ],
      '中国大陆驾照不属于 DMV 015 的 South Korea/Taiwan 名单，不要把 China 与 Republic of China（Taiwan）混为同一 reciprocity 路径': [
        NV_WAIVER,
        NV_TESTING,
      ],
      'Class C knowledge test 有 25 道选择题，80% 通过，达到 20 题正确或 6 题错误时结束': [
        NV_TESTING,
      ],
      'Online 与 office knowledge test 直接提供 English 和 Spanish': [NV_TESTING],
      '需要其他语言的 non-commercial applicant 可按规则使用 interpreter': [
        NV_TESTING,
        NV_DAC,
      ],
      'Knowledge-test interpreter 要有政府机构、法院、教育机构或非营利倡导组织的 approval letter，每次提交 DLD 11，不得为家属口译，费用由申请人承担': [
        NV_TESTING,
        NV_DAC,
      ],
      'Skills test 不允许 interpreter 随车，考试车辆必须同级别、有效注册并投保，rental car 不能用于路考': [
        NV_TESTING,
        NV_ROAD,
      ],
      '18 岁及以上 beginning driver 的 instruction permit 可选': [NV_ADULT],
      '不办 permit 时不能线上预约 road test，要在通过 knowledge test 后到 office 由工作人员安排': [
        NV_ADULT,
        NV_APPOINTMENTS,
      ],
      'Quick Cards 适用于多数 18+ 首次 license、ID、instruction permit 或 DAC 申请，但 under 18、seasonal resident、CDL、alternate/confidential address 以及 renewal、duplicate、address change 不适用': [
        NV_QUICK,
      ],
      'Quick Cards 不是全线上签发，conditional approval 后仍须 office 核验原件、付款和拍照，之后先领 interim document，实体卡通常 7 至 14 个工作日邮寄': [
        NV_QUICK,
      ],
      '普通 online renewal 面向 16 至 70 岁、过期不超过 364 天且无姓名变化、停吊销、医学或 testing 障碍等符合条件的 Nevada resident': [
        NV_RENEW,
      ],
      'Instruction permit、CDL 与 DAC 必须到 office 续期，Limited Term resident 每次续期或变更姓名、生日等个人信息时要重新出示美国移民文件': [
        NV_RENEW,
        NV_DAC,
      ],
      '多数 65 岁以下 driver license 有效 8 年，65 岁及以上 license 与 DAC 通常有效 4 年': [
        NV_RENEW,
        NV_FEES,
      ],
      '使用 D/S 移民记录的 Limited Term credential 通常只签发 1 年': [
        NV_RENEW,
        NV_HANDBOOK,
      ],
      '普通驾照过期满 1 年要重新做 knowledge test，过期满 4 年还要做 skills test，现场逾期超过 30 天可能另收 $10 late fee': [
        NV_RENEW,
        NV_FEES,
        NV_TESTING,
      ],
      '地址变化包括永久搬离 Nevada 时都应在 30 天内更新，driver credential 与 vehicle registration 地址不会自动一起变化': [
        NV_ADDRESS,
        NV_FAQ,
      ],
      '改名要先在 SSA 更新并至少等待 2 个工作日，再到 office 带当前 credential 和授权改名的原始法律文件': [
        NV_ADDRESS,
      ],
      'updated Social Security card 本身不够': [NV_ADDRESS],
      'MyDMV 可补发多数遗失、被盗或损坏的 license、ID、permit 或 DAC，但卡片不能在未来 60 天内到期，驾驶权限也不能 suspended/revoked': [
        NV_DUPLICATE,
        NV_DAC,
      ],
      '所有 Nevada license 和 ID 均邮寄，online renewal 通常 7 至 10 个工作日，office transaction 通常 7 至 14 个工作日': [
        NV_RENEW,
        NV_QUICK,
        NV_ID,
      ],
      '30 天仍未收到应联系 DMV': [NV_RENEW, NV_ID],
      'Nevada resident 不能同时持有任何州的 driver license 与 Nevada ID card': [
        NV_ID,
        NV_FAQ,
      ],
      '普通 Nevada ID 最低申请年龄为 10 岁': [NV_ID],
      '先选卡种：要国内航班/联邦设施用 REAL ID，只需州内驾驶和一般 ID 可比较 Standard，无法满足 Standard identity/SSN 路径时再核对只用于驾驶的 DAC': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
      ],
      'REAL ID identity 带一份有效原件或签发机关认证副本，不要用 hospital birth record、foreign driver license、military ID、consular ID 或普通 photocopy': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'SSN 文件带 Social Security card、W-2、IRS 1099 或 printed pay stub 之一，确认显示当前法定姓名和完整 SSN': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '准备两份 Nevada residential-address 证明，常见账单/statement 检查是否在 60 天内，online account 要打印原始页面': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '姓名与 identity 或 SSN 不一致时，为每一次变化带 government-issued marriage certificate、divorce decree、adoption record 或 court order': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '非英文 identity/name 文件先从 Nevada DMV approved translator 名单找人，翻译必须完整打印并含日期、translator number、签名和规定声明': [
        NV_TRANSLATORS,
        NV_RESIDENCY,
      ],
      '以 immigration document 申请 REAL ID/Standard 时带当前 passport、I-94、I-766、I-797、I-20 或 DS-2019 等与本人 status 相符的组合，不照抄别人的清单': [
        NV_RESIDENCY,
        NV_RENEW,
      ],
      'DAC 申请人按官方三档 identity 方案准备一份主文件、一份指定军人/部落文件，或两份外州/外国政府文件，并另带两份 Nevada 地址证明': [
        NV_DAC,
        NV_RESIDENCY,
      ],
      '外州新居民带现有 state-issued license/permit/ID': [NV_NEW],
      '申领 Nevada credential 时原外州卡会打孔 VOID 后退回': [
        NV_DAC,
        NV_FAQ,
      ],
      '外国驾照持有人同时准备 Nevada identity/residency 文件和考试材料，China 申请人按 vision、knowledge、skills 三项准备': [
        NV_NEW,
        NV_FIRST,
        NV_TESTING,
        NV_WAIVER,
      ],
      'Taiwan 或 South Korea 申请 drive-test waiver 时带有效原驾照、适用 verification、DMV 015 和其他身份地址材料，不能把 waiver 当作免 knowledge test': [
        NV_WAIVER,
        NV_RESIDENCY,
        NV_ADULT,
      ],
      'Road test 带 permit 或 office 安排信息、同级别车辆、有效 registration 与 insurance，且不要使用 rental car': [
        NV_TESTING,
        NV_ROAD,
      ],
      '先判断用途：需要国内航班/联邦设施的带星 REAL ID，还是只需 Standard 驾照/ID': [
        NV_REAL_ID,
      ],
      '无法满足 Standard identity 路径且只需驾驶时再核对 DAC': [
        NV_DAC,
        NV_RESIDENCY,
      ],
      '确认 residency 时间点：一旦成为 Nevada resident 且继续驾车，把 30 天换证期限写入日历，并同时安排车辆注册': [
        NV_LAW,
        NV_NEW,
        NV_HANDBOOK,
      ],
      '选择 identity 路径：REAL ID、Standard 与 DAC 的清单不同，不把 DAC 可接受的 foreign birth certificate 或 consular ID 放进 REAL ID 文件组': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
      ],
      'REAL ID 按 identity、完整 SSN、两份 Nevada residential address、name-change chain、translation 五组整理原件或认证副本': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '没有 SSN 时先区分从未符合资格、已经申请尚未收到和有合法身份但无号码三种情况，再按 Standard 或 DAC 官方说明选择': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
        NV_ADULT,
      ],
      '逐份检查地址材料日期：lease/utility/bank/pay stub 等常见项目按 60 天窗口，insurance/tax/mortgage 等使用最近签发版本': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '所有中文文件在预约前交给 Nevada DMV approved translator，核对翻译日期、translator number、姓名、签名、完整正文和规定声明': [
        NV_TRANSLATORS,
      ],
      '新居民带现有外州 credential': [NV_NEW],
      '21+ 的 U.S./territory/Canada 驾照持有人先核对是否只有 vision test，违规、DUI、停吊销或 restriction 则按触发项目准备考试': [
        NV_NEW,
        NV_FIRST,
        NV_TESTING,
      ],
      '外国访客同时携带有效原驾照，IDP 只作翻译辅助': [NV_FAQ, NV_LAW],
      '成为 resident 后改走 Nevada credential 与 30 天路径': [NV_LAW, NV_NEW],
      '中国大陆驾照持有人按 vision、knowledge、skills tests 准备，不套用 Taiwan/South Korea 的 DMV 015 waiver': [
        NV_WAIVER,
        NV_TESTING,
        NV_NEW,
      ],
      'Taiwan/South Korea 申请人先读 DMV 015': [NV_WAIVER],
      'Taiwan 还核对网页列出的 21+、Class B 和 consular verification，年龄或文件有冲突时先联系 DMV': [
        NV_RESIDENCY,
        NV_ADULT,
        NV_WAIVER,
      ],
      'Knowledge test 先选 English/Spanish online 或 office': [NV_TESTING],
      '需要中文口译时提前找到合格非家属 interpreter，并准备 approval letter 与 DLD 11': [
        NV_TESTING,
      ],
      '18+ 新手决定是否办 instruction permit': [NV_ADULT],
      '要线上预约 road test 就先取得 permit，不办则通过笔试后到 office 安排': [
        NV_ADULT,
        NV_APPOINTMENTS,
        NV_TESTING,
      ],
      'Road test 前核对同级别车辆、registration、insurance 和安全状况，不用 rental car，也不安排 interpreter 随车': [
        NV_TESTING,
        NV_ROAD,
      ],
      '符合 Quick Cards 条件时先在线申请和上传文件，conditional approval 后预约选定 office，现场仍带全部原件、付款并拍照': [
        NV_QUICK,
      ],
      '办完保存 interim document 并注册 MyDMV 跟踪邮寄': [NV_QUICK, NV_RENEW],
      '7 至 14 个工作日是常见窗口，30 天未收到立即联系 DMV': [
        NV_QUICK,
        NV_RENEW,
        NV_ID,
      ],
      '续期先让 MyDMV 判断资格': [NV_RENEW],
      '71+、DAC、CDL、Limited Term、姓名变化、过期超过 364 天或需考试时改走相应 office/mail 路径': [
        NV_RENEW,
      ],
      '只改地址时同时检查 driver credential 与每辆车的 registration record，30 天内完成': [
        NV_ADDRESS,
      ],
      '改名则先更新 SSA 并等待至少 2 个工作日': [NV_ADDRESS],
      '遗失补证先确认卡片距到期超过 60 天且 privilege 正常，再决定 MyDMV 或 office': [
        NV_DUPLICATE,
      ],
      '临近到期应走 renewal': [NV_DUPLICATE, NV_RENEW],
      '把 Quick Cards 当作全线上 REAL ID，conditional approval 后没有预约 office 或没有带原件': [
        NV_QUICK,
      ],
      '拿有效外州 REAL ID 直接要求 Nevada REAL ID，没有重新准备 foundational identity、SSN 和两份地址证明': [
        NV_REAL_ID,
      ],
      '只带一份 Nevada address proof，或 60 天类账单已经过期、没有本人姓名或只写 P.O. Box': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '把 Standard license 当作 TSA 接受的 REAL ID，或把 DAC 当作身份证明': [
        NV_REAL_ID,
        NV_DAC,
        TSA_IDENTIFICATION,
      ],
      '用 foreign driver license、military ID、hospital birth record 或 consular ID 代替 REAL ID identity 文件': [
        NV_REAL_ID,
      ],
      '使用普通复印件、scan、手机照片或非签发机关认证的 copy 代替 identity/name 原件': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
      ],
      '姓名有多次变化却只带最后一张 marriage certificate，或用 Social Security card 代替姓名变化链': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      'SSN 文件只显示后四位、使用旧姓名，或以为报出号码就一定满足 REAL ID 文件要求': [
        NV_REAL_ID,
        NV_RESIDENCY,
      ],
      '合法身份但没有 SSN 时直接改办 DAC，没有先核对 Standard license/ID 的 no-SSN 路径和 attestation 条件': [
        NV_REAL_ID,
        NV_RESIDENCY,
        NV_DAC,
        NV_ADULT,
      ],
      '把自行翻译、公证翻译或只翻摘要的中文文件带到窗口，没有使用 Nevada DMV approved translator': [
        NV_TRANSLATORS,
      ],
      '把 China 与 Republic of China（Taiwan）混为一谈，误以为中国大陆驾照可以免 road test': [
        NV_WAIVER,
        NV_TESTING,
      ],
      'Taiwan 或 South Korea 申请人把 DMV 015 当成全面免试，漏掉 vision、knowledge 和其他材料': [
        NV_WAIVER,
        NV_ADULT,
        NV_TESTING,
      ],
      '外国访客只携带 International Driver License/Permit 而没有原政府驾照': [
        NV_FAQ,
        NV_LAW,
      ],
      '已经成为 Nevada resident 仍按游客身份长期使用外国或外州驾照，忽略 30 天换证期限': [
        NV_LAW,
        NV_NEW,
      ],
      '18+ beginning driver 不办 instruction permit，却仍尝试在线预约 road test': [
        NV_ADULT,
      ],
      '为 knowledge test 找家属口译，或没有 approval letter 和每次考试所需 DLD 11': [
        NV_TESTING,
        NV_DAC,
      ],
      '路考让 interpreter 随车、使用 rental car，或车辆 registration/insurance 无效': [
        NV_TESTING,
        NV_ROAD,
      ],
      '只看 KnowToDrive 的 $6.75，以为不会再收 DMV $25 initial testing fee': [
        NV_TESTING,
      ],
      '71 岁以上、DAC、CDL、Limited Term 或有 testing requirement 的申请人直接假定可以 online renewal': [
        NV_RENEW,
        NV_DAC,
      ],
      'Limited Term 用户续期或改个人信息时没有带当前 immigration documents': [
        NV_RENEW,
        NV_RESIDENCY,
      ],
      '驾照过期超过 1 年仍按普通线上续期，未准备 knowledge test': [
        NV_RENEW,
        NV_TESTING,
      ],
      '超过 4 年又未准备 skills test': [NV_RENEW, NV_TESTING],
      '搬家后只改 vehicle registration 或只改 driver credential，忽略另一套地址记录和 30 天期限': [
        NV_ADDRESS,
      ],
      '先到 DMV 改名，没有先让 SSA 更新并等待至少 2 个工作日': [
        NV_ADDRESS,
      ],
      '卡片将在 60 天内到期或驾驶权限 suspended/revoked 时仍尝试 online duplicate': [
        NV_DUPLICATE,
      ],
      'office 交易后把 interim paper 当作 TSA 接受的正式 REAL ID，或 30 天未收到实体卡仍不联系 DMV': [
        NV_QUICK,
        NV_RENEW,
        NV_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '同时保留外州 license/ID 与 Nevada credential，或同时保留 driver license 和 Nevada ID card': [
        NV_REAL_ID,
        NV_DAC,
        NV_FAQ,
        NV_ID,
      ],
    },
  },
  oregon: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      OR_REAL_ID,
      OR_REAL_ID_FAQ,
      OR_IDENTITY,
      OR_DRIVER_INFO,
      OR_NEW,
      OR_RESIDENCY,
      OR_LICENSE,
      OR_ONLINE_TEST,
      OR_MANUAL_TESTING,
      OR_DRIVE_TEST,
      OR_TESTING_BUSINESS,
      OR_FEES,
      OR_ADDRESS,
      OR_NAME,
      OR_APPOINTMENTS,
      OR_OFFICES,
      OR_ID_CARD,
      OR_HB2015,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Oregon DMV 的 Standard、REAL ID、identity/residency、HB 2015、新居民、外国驾照、成人 license、简体中文 online/office knowledge test、drive test、费用、续补证、改名改址、office、ID 与邮寄正文。',
    notes:
      '重写 Standard/REAL ID 判断与材料差异，补齐中国大陆与 Taiwan、无 SSN online-test 限制、30 天新居民路径、当前费用及续补证边界，并纠正地址 printout 与 identity 原件不能混用的旧说法；仍待真实人工签字。',
    claims: {
      '俄勒冈州先在 Standard credential 与带星 REAL ID 之间选择：Standard noncommercial license、permit 或 ID 要证明身份、出生日期、Oregon residence，并在已获配 SSN 时提供可核验号码，但不要求证明美国合法居留': [OR_HB2015, OR_DRIVER_INFO, OR_REAL_ID],
      'REAL ID 另要求 lawful status，才可作为州证件用于受 REAL ID 约束的联邦场景': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '成为 Oregon resident 后，如要驾驶，应在 30 天内取得 Oregon 驾照，并在同一期限内完成车辆 title 和 registration': [OR_NEW],
      '交回有效或过期不超过 1 年的美国州/领地/DC/国务院、Canada、Germany、Japan、South Korea 或 Taiwan 驾照时，多数新居民可能免 knowledge 与 drive tests': [OR_NEW, OR_LICENSE],
      '中国大陆驾照不在当前免试名单中，不能套用 Taiwan 路径，通常要按首次 Oregon Class C 路径完成 vision、knowledge 和 drive tests': [OR_NEW, OR_LICENSE],
      'Standard 申请人可用符合期限和翻译要求的 foreign passport 等证明身份，没有获配 SSN 时在申请中作电子声明': [OR_IDENTITY, OR_DRIVER_INFO],
      '第一次申请或从 Standard 升级 Oregon REAL ID 必须到 DMV office，带 identity 与 lawful-status 原件或签发机关认证副本、SSN 或不符合 SSN 的官方证明、两份不同来源的打印版 Oregon residence-address 证明，以及连接每次姓名变化的认证文件': [OR_REAL_ID, OR_REAL_ID_FAQ, OR_IDENTITY],
      '地址证明可以是合格文件的 photocopy 或电子文件 printout，但 identity、lawful-status 与 name-change 文件不能用普通复印件替代': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '已经持有 Oregon REAL ID 的人符合条件时可在线续期或补证，单独升级并不会延长原卡到期日': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '多数 office 业务可通过 DMV2U 预约，也可到开放办公室等 standby service，但各点时段和服务不同，walk-in 不保证当天办完': [OR_OFFICES, OR_APPOINTMENTS, OR_REAL_ID_FAQ],
      'Class C knowledge test 可在线或在 office 完成，并提供简体中文读题与语音': [OR_ONLINE_TEST, OR_MANUAL_TESTING, OR_LICENSE],
      'drive test 只能预约 Oregon DMV 或 DMV-contracted Class C testing business，第三方自行定价': [OR_DRIVER_INFO, OR_DRIVE_TEST, OR_TESTING_BUSINESS],
      'Oregon REAL ID 是可选的联邦合规 license、permit 或 ID，右上角有星标': [OR_REAL_ID, OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      '未升级的卡标有 Not for REAL ID Act，仍可在有效驾驶权限范围内驾驶，但不能单独用于要求 REAL ID 的联邦用途': [OR_REAL_ID, OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      '18 岁及以上旅客自 2025 年 5 月 7 日起进入 TSA checkpoint 时，应出示 REAL ID 或 passport 等 TSA 接受的替代证件': [TSA_IDENTIFICATION, OR_REAL_ID_FAQ],
      '有效外国政府护照也在 TSA 当前接受名单中': [TSA_IDENTIFICATION, OR_REAL_ID_FAQ],
      'Oregon office 签发的 interim paper credential 和 online receipt 可证明适用的驾驶权限，但 TSA 不把 temporary driver license 当作可接受身份证件': [OR_LICENSE, OR_REAL_ID_FAQ, TSA_IDENTIFICATION],
      '第一次申请 Oregon REAL ID 或把 Standard 卡升级为 REAL ID 不能完全在线完成，必须到 office 出示 federally required documents': [OR_REAL_ID, OR_REAL_ID_FAQ, OR_IDENTITY],
      'DMV 会扫描并保存 REAL ID 文件副本 10 年': [OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      'REAL ID identity/lawful-status 常见路径包括未过期 U.S. passport、U.S. birth certificate、Certificate of Naturalization/Citizenship、未过期 Permanent Resident Card、I-766，或符合 visa 与 I-94 条件的未过期 foreign passport': [OR_IDENTITY, OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      'REAL ID 的 identity、lawful-status 与姓名文件必须用原件或签发机关认证副本，普通 photocopy、电子图像和仅自行扫描的文件不能替代': [OR_IDENTITY],
      'REAL ID 申请人可口头提供 SSN，不必仅为此携带实体 Social Security card，但号码和当前法定姓名必须通过 SSA 核验': [OR_IDENTITY, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '没有资格取得 SSN 的 REAL ID 申请人要带 SSA、DHS、其他联邦机关或联邦法院出具的不符合资格证明，并在 office 签 Form 735-7255': [OR_IDENTITY, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      'Original REAL ID 要两份显示当前姓名和 Oregon residence address 的打印文件，两份来自不同 agency、business 或 institution，mailing address 可以另列但不能用 P.O. Box 取代 residence address': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      'REAL ID 地址材料允许使用合格 photocopy 或电子账单 printout': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '这项规则不同于 identity、lawful-status 和 name-change 原件要求，不要把两类材料混为一谈': [OR_IDENTITY],
      '住在同一地址的人也可亲自陪同并出示自己的 residence proof，以 verbal statement 支持申请人的地址，但不要只带一封没有其他核验路径的私人说明': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '当前姓名与 identity 文件不同时，要用政府 marriage certificate、domestic-partnership record、divorce decree、adoption decree 或 court order 连起变化，文件仍须是原件或签发机关认证副本': [OR_IDENTITY],
      '临时合法居留申请人的 limited-term REAL ID 通常到 authorized stay 截止，最长不超过同类八年期限': [OR_DRIVER_INFO, OR_LICENSE, OR_REAL_ID_FAQ],
      '如果停留期限不确定，通常自签发日起 1 年': [OR_DRIVER_INFO, OR_LICENSE, OR_REAL_ID_FAQ],
      'Oregon 自 2021 年实施 HB 2015 后，Standard noncommercial license、permit 和 ID 不再要求证明 legal presence': [OR_HB2015, OR_DRIVER_INFO],
      '这不表示持卡人具有移民身份，也不把 Standard 卡变成 REAL ID': [OR_REAL_ID, OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      'Standard non-REAL ID 通常用一份 primary identity/date-of-birth 原件或认证副本': [OR_IDENTITY, OR_DRIVER_INFO],
      '当前清单接受含英文或附英文翻译、有效或过期不超过 5 年的 foreign passport': [OR_IDENTITY, OR_DRIVER_INFO],
      '外国政府驾照在 Standard identity 清单中属于 secondary document': [OR_IDENTITY, OR_DRIVER_INFO],
      '没有 primary document 时通常要从不同机关或法院准备至少两份 secondary documents，且至少一份同时显示姓名和出生日期': [OR_IDENTITY, OR_DRIVER_INFO],
      'Standard 申请人如已获配 SSN 必须提供可核验号码': [OR_IDENTITY, OR_DRIVER_INFO],
      '从未获配 SSN 的人可在申请流程中作电子声明，不应虚构号码或把 ITIN 当作 SSN': [OR_IDENTITY, OR_DRIVER_INFO],
      'Non-REAL ID 申请要一份显示姓名和当前 Oregon residence address 的文件，合格 photocopy 或在电子设备上展示的版本通常可接受，但 DMV 保留要求额外证据或拒绝文件的权利': [OR_IDENTITY, OR_DRIVER_INFO],
      'Oregon 一人只能持有一张有效州级 driver license 或 ID credential': [OR_LICENSE, OR_DRIVER_INFO, OR_ID_CARD],
      '取得 Oregon license、permit 或 ID 会使外州卡失效，申请时还要交回手中的 Oregon、外州或外国 license、permit 或 ID': [OR_LICENSE, OR_DRIVER_INFO, OR_ID_CARD],
      '当前八年期 Class C 首次 Standard license 为 $64，首次 REAL ID license 为 $94': [OR_DRIVER_INFO, OR_FEES],
      '八年期续期分别为 $54 与 $84，REAL ID 的 $30 附加费在 original、renewal 和 replacement 每次都收取': [OR_DRIVER_INFO, OR_FEES, OR_REAL_ID_FAQ],
      '当前 replacement license/permit 为 Standard $30、REAL ID $60': [OR_DRIVER_INFO, OR_FEES],
      'Class C knowledge test 每次 $7，DMV Class C drive test 每次 $45，contracted testing business 另按自己的价格收费': [OR_DRIVER_INFO, OR_DRIVE_TEST, OR_TESTING_BUSINESS],
      '成为 Oregon resident 后 30 天内，如要驾驶应取得 Oregon license，并为车辆办理 Oregon title 与 registration': [OR_NEW],
      '只处理驾照而漏掉车辆并不满足新居民页面的完整要求': [OR_NEW],
      'Oregon residency 判断会看每年连续居住至少 6 个月、子女公校非居民学费、resident tuition、居民税、军籍 home of record 等事实': [OR_RESIDENCY, OR_NEW],
      '仅在 Oregon 拥有房产本身不必然构成居民': [OR_RESIDENCY, OR_NEW],
      '交回有效或过期不超过 1 年的美国州、领地、DC、U.S. Department of State、Canada、Germany、Japan、South Korea 或 Taiwan 驾照时，多数申请人可能免 knowledge 和 drive tests，但 DMV 仍可按记录或安全问题要求考试': [OR_NEW, OR_LICENSE],
      'Oregon visitor 如保持州外永久住所且未采取建立 Oregon residency 的行动，可凭有效外国政府驾照在 Oregon 驾驶': [OR_RESIDENCY, OR_NEW],
      '成为 resident 后则进入 30 天换证规则': [OR_NEW],
      '中国大陆不在 Oregon 当前 foreign-license 免试名单': [OR_NEW, OR_LICENSE],
      '中国大陆驾照不能按 Taiwan 证件处理，也不能单独代替 Oregon 申请所需的 identity、address、SSN 声明和适用考试': [OR_NEW, OR_LICENSE, OR_IDENTITY],
      '成年人首次申请 Oregon Class C license 时要通过 vision test，并在不符合转入或 driver-education 豁免时完成 knowledge 与 drive tests': [OR_LICENSE, OR_MANUAL_TESTING],
      'Class C knowledge test 有 35 道选择题，答对 28 题才通过': [OR_MANUAL_TESTING, OR_LICENSE],
      'online 和 office 版本都提供 English、Spanish、Arabic、Chinese (Simplified Mandarin)、Japanese、Korean、Russian 与 Vietnamese': [OR_ONLINE_TEST, OR_MANUAL_TESTING, OR_LICENSE],
      'Online knowledge test 必须使用带 mouse、keyboard 和 webcam 的 desktop 或 laptop，不能用手机、平板或其他 touchscreen device': [OR_ONLINE_TEST],
      'Online test 注册要求考生和适用 proctor 都有可核验 SSN': [OR_ONLINE_TEST, OR_IDENTITY],
      '从未获配 SSN 或无法通过供应商身份核验的人应到 DMV office 考试': [OR_ONLINE_TEST, OR_IDENTITY],
      '18 岁及以上 online tester 不要求 proctor': [OR_ONLINE_TEST],
      '未满 18 岁要由 21 岁以上、持 SSN 且过去 12 个月监考不超过 5 次的人注册并监督': [OR_ONLINE_TEST, OR_IDENTITY],
      '同类 online knowledge test 每 24 小时最多两次、线上总计最多四次，之后要到 office': [OR_ONLINE_TEST],
      'office 资源允许时，失败后可能同日重考，但每次仍收考试费': [OR_LICENSE, OR_MANUAL_TESTING, OR_DRIVER_INFO],
      'Knowledge test 禁止书本、笔记、手机、交谈或他人代考': [OR_ONLINE_TEST, OR_MANUAL_TESTING, OR_LICENSE],
      '作弊会中止考试并导致 90 天不得重考，让他人代考还可能触发一年驾驶权限或申请权暂停及刑事后果': [OR_ONLINE_TEST, OR_MANUAL_TESTING, OR_LICENSE],
      '需要 drive test 时必须先通过 knowledge test': [OR_LICENSE, OR_MANUAL_TESTING],
      '考试只能预约 DMV 或 contracted Class C testing business，后者只负责 Class C 并自行确定营业日和费用': [OR_LICENSE, OR_TESTING_BUSINESS, OR_APPOINTMENTS],
      'DMV drive test 当天要提供 current liability insurance、车辆 current registration，并使用符合安全要求的 passenger vehicle': [OR_DRIVE_TEST, OR_MANUAL_TESTING],
      'DMV test fee 当前每次 $45': [OR_DRIVER_INFO, OR_DRIVE_TEST],
      '18 岁以上 applicant 若要在 road test 前上路练习才需要 instruction permit': [OR_LICENSE, OR_MANUAL_TESTING],
      '不需要练习的人可在完成前置要求后直接预约 drive test': [OR_LICENSE, OR_MANUAL_TESTING],
      'Oregon license 可在到期前 12 个月至到期后 2 年内续期': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '过期超过 2 年要按新申请付 original fee，并重新完成 vision、knowledge 和 drive tests': [OR_LICENSE, OR_MANUAL_TESTING],
      'Online renewal 通常要求 DMV 照片不足 9 年、保留现有照片/身高/体重、没有要新增或删除的 restriction/endorsement、不是 limited-term，且驾驶权限未 suspended、cancelled 或 revoked': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '已有 Oregon REAL ID 的人符合其他条件时可 online renewal': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '第一次换成 REAL ID 仍要 office，65 岁及以上也不能 online renewal，必须到 office 做 vision test': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '遗失、被盗或损坏的 credential 通常可在 DMV2U 补办': [OR_LICENSE, OR_DRIVER_INFO],
      '第一次升级 REAL ID、姓名变化或需要提交新身份文件时应改走 office': [OR_REAL_ID, OR_LICENSE, OR_NAME],
      '搬家后必须在 30 天内在线或电话免费更新 DMV 地址': [OR_ADDRESS],
      'DMV 不再发 address sticker，也不会仅因改址自动寄新卡，需要卡面显示新地址时另付 replacement fee': [OR_ADDRESS, OR_LICENSE],
      'Credential 改名应先更新 SSA，再到 office 带 legal-name-change、identity 和 address 文件': [OR_NAME, OR_IDENTITY],
      'REAL ID 姓名必须与 SSA 匹配，driver credential 改名也不会自动修改车辆 title/registration': [OR_NAME, OR_IDENTITY],
      'Permanent card 会寄到 DMV 记录地址且 USPS 不转寄': [OR_LICENSE, OR_REAL_ID_FAQ],
      '官方页面要求最多预留约 20 天，office interim card 或 online receipt 在等待期间不能当作 TSA 接受的身份证件': [OR_LICENSE, OR_REAL_ID_FAQ, TSA_IDENTIFICATION],
      'Oregon office 页面提供 Mandarin 与 Cantonese 版本的 office-service list，但具体地点的营业日、预约类型和可办业务仍要在出发前逐点确认': [OR_OFFICES, OR_APPOINTMENTS],
      'Oregon ID card 没有最低年龄，但不能与另一张有效州级 driver license/ID 并持': [OR_LICENSE, OR_DRIVER_INFO, OR_ID_CARD],
      '当前八年期 original Standard ID 为 $47、REAL ID 为 $77': [OR_ID_CARD, OR_DRIVER_INFO, OR_FEES],
      '先选择 Standard 或 REAL ID：Standard 不要求 lawful-status proof，REAL ID 要按联邦清单证明 identity 与 lawful status': [OR_HB2015, OR_DRIVER_INFO, OR_REAL_ID],
      '两者都不是移民身份决定': [OR_HB2015, OR_DRIVER_INFO],
      'REAL ID identity、lawful-status 与姓名链带原件或签发机关认证副本': [OR_IDENTITY],
      '可用文件包括适用的 U.S. passport/birth certificate、I-551、I-766 或未过期 foreign passport + visa + I-94': [OR_IDENTITY, OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      '提供可核验 SSN': [OR_IDENTITY, OR_DRIVER_INFO],
      'REAL ID 未获配 SSN 者另带联邦机关/法院出具的不符合资格证明并签 Form 735-7255，Standard 未获配者作电子声明': [OR_IDENTITY, OR_DRIVER_INFO],
      'REAL ID 准备两份不同来源、打印版、显示当前姓名和 Oregon residence address 的文件': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      'P.O. Box 只能另作 mailing address，不能取代 residence': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '地址证明可以使用合格 photocopy 或电子文件 printout': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '不要因此把 identity、lawful-status 或 name-change 文件也换成普通复印件': [OR_IDENTITY],
      '姓名不同则准备能连接每次变化的 government marriage/domestic-partnership record、divorce/adoption decree 或 court order，并先完成适用的 SSA 更新': [OR_NAME, OR_IDENTITY],
      'Standard identity 优先准备一份 primary 原件': [OR_IDENTITY, OR_DRIVER_INFO],
      'foreign passport 可有效或过期不超过 5 年，并须含英文或附英文翻译，外国驾照通常只算 secondary evidence': [OR_IDENTITY, OR_DRIVER_INFO],
      'Standard 另备一份当前 Oregon residence-address proof': [OR_IDENTITY, OR_DRIVER_INFO],
      '已获配 SSN 者提供可核验号码，从未获配者在申请中如实声明': [OR_IDENTITY, OR_DRIVER_INFO],
      '外州或外国转入带原 credential': [OR_LICENSE, OR_DRIVER_INFO, OR_ID_CARD],
      '免试名单要求证件有效或过期不超过 1 年，中国大陆驾照持有人按非免试路径准备考试': [OR_NEW, OR_LICENSE],
      'Road test 带 current vehicle registration、current liability insurance 和合格车辆': [OR_DRIVE_TEST, OR_MANUAL_TESTING],
      '需要先练习时再办理 instruction permit': [OR_LICENSE, OR_MANUAL_TESTING],
      'Office 办理后核对 interim card 的姓名和地址，并确保 DMV 记录地址可收件，因为 permanent card 不会被 USPS 转寄': [OR_LICENSE, OR_REAL_ID_FAQ],
      '先判断自己是 visitor 还是已经建立 Oregon residency': [OR_RESIDENCY, OR_NEW],
      'resident 如要驾驶，从成立 residency 起按 30 天安排驾照和车辆业务': [OR_NEW],
      '再按用途选择 Standard 或 REAL ID：有有效 passport 等 TSA accepted ID 时，不必把临行前升级 REAL ID 当作唯一方案': [TSA_IDENTIFICATION, OR_REAL_ID_FAQ],
      '确认交易类型是首次申请、外州/外国转入、续期、replacement、姓名变更、地址变更还是 ID card，不把不同材料清单混用': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '使用 DMV2U REAL ID checklist 生成个人材料清单，并在出发前重新打开 Required Identity Documentation 核对当前可接受文件': [OR_IDENTITY, OR_REAL_ID, OR_LICENSE],
      '走 Standard 路径时，准备 primary identity/date-of-birth 原件、一份 Oregon residence proof、已获配 SSN 或未获配声明': [OR_IDENTITY, OR_DRIVER_INFO],
      '本州 Standard 流程不要求额外提交 lawful-status proof，申请 REAL ID 或 CDL 时则要改用相应清单': [OR_HB2015, OR_DRIVER_INFO, OR_REAL_ID],
      '走 REAL ID 路径时，按 identity/lawful status、SSN/不符合资格证明、两份不同来源地址、完整姓名链四组整理文件': [OR_IDENTITY, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '姓名不一致时先更新 SSA，再准备每一步政府签发的认证文件': [OR_NAME, OR_IDENTITY],
      '同时单独安排 vehicle title/registration 的姓名更新': [OR_NAME, OR_IDENTITY],
      '外州或外国转入先核对旧证签发地和过期时间': [OR_NEW, OR_LICENSE],
      '中国大陆驾照按无 reciprocity 路径规划 vision、knowledge 与 drive tests': [OR_NEW, OR_LICENSE],
      '需要 knowledge test 时可选择简体中文 online 或 office 版本': [OR_ONLINE_TEST, OR_MANUAL_TESTING, OR_LICENSE],
      '没有 SSN、设备不合格或供应商无法核验时直接改约 office': [OR_ONLINE_TEST],
      '线上考试前准备 desktop/laptop、mouse、keyboard 和 webcam，成人本人独立完成，不让他人提示或代考': [OR_ONLINE_TEST],
      '通过 knowledge test 后，如需上路练习先取得 instruction permit': [OR_LICENSE, OR_MANUAL_TESTING],
      '否则按资格直接预约 DMV 或 contracted business 的 drive test': [OR_LICENSE, OR_TESTING_BUSINESS, OR_APPOINTMENTS],
      'Road test 前核对车辆 registration、liability insurance、安全状况，并分别确认 DMV $45 test fee 或第三方报价及 license issuance fee': [OR_DRIVE_TEST, OR_MANUAL_TESTING, OR_TESTING_BUSINESS],
      '通过 DMV2U 预约适当业务，出发前查看 office 实时状态与具体服务': [OR_OFFICES, OR_APPOINTMENTS],
      '没有预约只能按 standby 排队且不保证当天完成': [OR_OFFICES, OR_APPOINTMENTS, OR_REAL_ID_FAQ],
      '窗口付款前按 current fee page 区分 original、renewal、replacement、REAL ID surcharge 和每次 test fee': [OR_DRIVER_INFO, OR_FEES, OR_DRIVE_TEST],
      '当前八年期 Class C REAL ID license 的 original、renewal、replacement 分别为 $94、$84、$60': [OR_DRIVER_INFO, OR_FEES, OR_REAL_ID_FAQ],
      '办结后立即核对 interim card': [OR_LICENSE, OR_REAL_ID_FAQ],
      '实体卡 20 天仍未到就用 DMV2U 查 card status，不要依赖 USPS forwarding': [OR_LICENSE, OR_REAL_ID_FAQ],
      '续期先检查照片年龄、本人年龄、limited-term、restriction/endorsement 和 suspension 状态，再决定 online 或 office': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '搬家后 30 天内免费更新地址': [OR_ADDRESS],
      '只有确实需要卡面显示新地址时才另付费 replacement': [OR_ADDRESS, OR_LICENSE],
      '领取 Oregon credential 时交回其他州或国家 credential，并确认旧证已失效': [OR_LICENSE, OR_DRIVER_INFO, OR_ID_CARD],
      '新居民同时完成 vehicle title/registration，不要把车辆业务误认为会随驾照自动完成': [OR_NEW],
      '以为 Standard Oregon license 也必须证明 lawful status，因而在其实符合 Standard identity 和 residency 路径时放弃申请': [OR_HB2015, OR_DRIVER_INFO],
      '把中国大陆驾照当作 Taiwan 驾照，期待直接免 knowledge 与 drive tests': [OR_NEW, OR_LICENSE],
      '只带中国驾照作为 identity，忽略外国驾照通常只是 secondary document，不能单独完成 Standard 身份证明': [OR_IDENTITY, OR_DRIVER_INFO],
      'REAL ID 两份地址材料来自同一家 institution，或只有 P.O. Box 而没有 Oregon residence address': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      '用手机照片或普通扫描件代替 REAL ID identity、lawful-status 和 name-change 原件/认证副本': [OR_IDENTITY],
      '反过来以为 REAL ID 地址证明也必须全部是原件，遗漏官方允许的合格 photocopy 或电子账单 printout': [OR_IDENTITY, OR_REAL_ID, OR_DRIVER_INFO],
      'REAL ID 姓名与 SSA 不一致，或没有 SSN 资格却只做口头声明、未带联邦不符合资格证明': [OR_IDENTITY, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '在卡片有效期中途升级 REAL ID，却以为 $30 附加费会换来新的八年有效期': [OR_REAL_ID_FAQ, OR_DRIVER_INFO],
      '临近航班才办 REAL ID，或把 interim paper credential / online receipt 当作 TSA 接受证件': [OR_LICENSE, OR_REAL_ID_FAQ, TSA_IDENTIFICATION],
      '没有 SSN 仍尝试 online knowledge test，或用手机/平板进入只支持 desktop/laptop 的考试': [OR_ONLINE_TEST, OR_IDENTITY],
      '已有 current valid license 只为练习而参加正式 online knowledge test，忽略失败可能影响现有 driving privilege': [OR_ONLINE_TEST],
      '没有先通过 knowledge test 就预约 drive test，或考试车辆缺 current registration / liability insurance': [OR_DRIVE_TEST, OR_MANUAL_TESTING],
      '把 standby service 当作当天一定受理，没有先检查 office 实时状态、营业日和具体业务': [OR_OFFICES, OR_APPOINTMENTS],
      '65 岁以上、limited-term 或要首次升级 REAL ID 时直接假定可以 online renewal': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      'Oregon license 过期超过 2 年仍按普通 renewal 准备，没有预算 original fee 和三项考试': [OR_LICENSE, OR_DRIVER_INFO, OR_REAL_ID_FAQ],
      '免费更新地址后等待 DMV 寄 address sticker 或新卡，忽略新卡要另行申请并付 replacement fee': [OR_ADDRESS, OR_LICENSE],
      '搬家超过 30 天仍未通知 DMV，或只改 credential 地址却忘记核对车辆记录': [OR_ADDRESS],
      '先到 DMV 改名，没有先处理 SSA，也以为 credential 改名会自动修改 vehicle title/registration': [OR_NAME, OR_IDENTITY],
      '取得 Oregon credential 后仍同时使用原外州或外国 credential，忽略交回与失效规则': [OR_LICENSE, OR_DRIVER_INFO, OR_ID_CARD],
      '成为 Oregon resident 后只关注驾照，漏掉同为 30 天的 vehicle title/registration': [OR_NEW],
    },
  },
  connecticut: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      CT_REAL_ID,
      CT_REAL_ID_CHECKLIST,
      CT_LICENSE,
      CT_TRANSFER,
      CT_ADULT_PERMIT,
      CT_TESTS,
      CT_ROAD_TEST,
      CT_FEES,
      CT_RENEW,
      CT_DUPLICATE,
      CT_CHANGE,
      CT_DRIVE_ONLY,
      CT_DRIVE_ONLY_CHECKLIST,
      CT_RENEW_DRIVE_ONLY,
      CT_TRANSLATORS,
      CT_ID,
      CT_CENTRAL,
      CT_APPOINTMENTS,
      CT_LOCATIONS,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Connecticut DMV 的 REAL ID、材料清单、普通驾照、外州与外国驾照、成人 permit、中英文考试、路考、费用、续补证、改名改址、Drive Only、non-driver ID、central issuance、预约与 office 正文。',
    notes:
      '重写金色星标、ordinary non-verified 与 Drive Only 判断路径，补齐中国大陆申请人的成人 permit、90 天等待豁免边界、2026 Work Zone 课程、当前费用和邮寄规则；对 SSN documentation、limited-term eligibility 与首证期限的州方页面冲突作显式风险提示，仍待真实人工签字。',
    claims: {
      '康涅狄格州先区分三条证件路径：右上角金色星标的 REAL ID 可用于受 REAL ID 约束的联邦身份场景': [CT_REAL_ID],
      '没有星标并写有 Not for Federal Identification 的普通驾照仍可在有效驾驶权限范围内驾驶': [CT_REAL_ID],
      'Drive Only 只供符合条件、无法证明美国 lawful presence 的居民取得驾驶权限，不能用于联邦身份识别或投票': [CT_DRIVE_ONLY],
      '成为 Connecticut resident 后，外州驾照和车辆 registration 通常都要在 90 天内转入': [CT_TRANSFER],
      '有效或过期不超过两年的美国州/领地驾照，以及 Canada、Germany 或 France 驾照，可按 transfer 路径预约、做 vision test 并支付 $40 application fee 与 $84 license fee': [CT_TRANSFER,CT_FEES],
      '其他国家包括中国大陆不在 transfer 名单中，要先办 adult learner’s permit、完成适用课程和考试': [CT_LICENSE,CT_ADULT_PERMIT],
      '但能出示过去 foreign license 或 driving history 的成年人可能免 90 天持证等待，这不等于免 permit、knowledge 或 road test': [CT_ADULT_PERMIT,CT_LICENSE],
      '第一次申请 Connecticut REAL ID 必须本人到 DMV site': [CT_REAL_ID],
      '当前 checklist 要两份不同 identity documents（至少一份 primary）、原件或 certified copies、两份不同来源且通常在 90 天内的 Connecticut residence hard copies、完整姓名链和 DMV-approved English translation': [CT_REAL_ID_CHECKLIST,CT_TRANSLATORS],
      '普通 photocopy 不接受': [CT_REAL_ID_CHECKLIST],
      'CT DMV 当前 REAL ID 页面又明确说不再要求仅为 REAL ID 提交 SSN 证明文件，但新办 credential 仍要提供并核验 SSN 或适用的 SSA ineligibility 路径，办理前不要只看旧 checklist 的单一句话': [CT_REAL_ID,CT_LICENSE,CT_REAL_ID_CHECKLIST],
      'Learner’s permit 的 vision/knowledge tests 和 road test 都要本人预约': [CT_TESTS,CT_ROAD_TEST,CT_APPOINTMENTS],
      '2026 年 1 月 1 日起 permit applicant 先完成免费线上 Connecticut Work Zone Safety Course 并打印证书': [CT_TESTS],
      'knowledge test 有 25 题、答对 20 题通过，电脑考试提供 Mandarin Chinese，另可申请 Chinese Simplified hard-copy test': [CT_TESTS],
      '首次 REAL ID、非美国公民首次申请、Drive Only、转入和姓名变更要按指定 DMV office 路径办理': [CT_APPOINTMENTS,CT_LOCATIONS],
      'Connecticut REAL ID 是可选的 verified license 或 ID，右上角是金色星标': [CT_REAL_ID],
      '没有星标的 credential 标注 Not for Federal Identification，仍可合法驾驶，但不能单独用于要求 REAL ID 的联邦身份用途': [CT_REAL_ID],
      '18 岁及以上旅客在 TSA checkpoint 应使用 REAL ID 或 passport、Permanent Resident Card 等 TSA 接受的替代证件': [TSA_IDENTIFICATION,CT_REAL_ID],
      '已有可接受证件时，不必把临行前升级 REAL ID 当作唯一方案': [TSA_IDENTIFICATION],
      '第一次取得金色星标必须本人到 DMV site 或适用 partner office 完成一次性 original-document verification，不能只走普通 online renewal': [CT_REAL_ID],
      'REAL ID checklist 要两份不同 identity documents，至少一份来自 primary list': [CT_REAL_ID_CHECKLIST],
      '文件必须 valid/unexpired original 或 certified copy，普通 photocopy、notarized photocopy、损坏文件不接受': [CT_REAL_ID_CHECKLIST],
      'Primary 常见 U.S. passport/birth certificate、I-551、I-766 或附适用 immigration supporting documents 的 foreign passport': [CT_REAL_ID_CHECKLIST],
      'SS card、CT/外州驾照、Canadian photo license、court order 等属于 secondary examples，不能把两份同类证件当作两份不同 identity': [CT_REAL_ID_CHECKLIST],
      'REAL ID 要两份不同来源的 Connecticut residency hard copies，显示申请人姓名和 Connecticut residence address，通常在 90 天内且为 computer-generated': [CT_REAL_ID_CHECKLIST],
      '税单、保险、registration、lease 等少数类别按 checklist 的 12 个月或当前有效期规则': [CT_REAL_ID_CHECKLIST],
      '不要只用 P.O. Box 或 mailing address 代替 Connecticut residence address': [CT_REAL_ID_CHECKLIST],
      '官方清单要求两份文件显示实际 Connecticut residence address': [CT_REAL_ID_CHECKLIST],
      '非英文文件必须由 CT DMV-approved translator 翻译，译文要有 translator number、文件类型、翻译日期、打印姓名/签名，并与 original document 一起提交': [CT_TRANSLATORS,CT_REAL_ID_CHECKLIST],
      '姓名与 primary identity 不一致时，要用 certified marriage/civil-union record、dissolution 或 probate court order 串起每次变化': [CT_REAL_ID_CHECKLIST],
      '多次改名不能只带最后一份': [CT_REAL_ID_CHECKLIST],
      '先在 SSA 完成姓名更新并至少预留 48 小时，再到 DMV 办 name change 或 REAL ID，避免 SSA 与 credential 记录不一致': [CT_CHANGE,CT_REAL_ID_CHECKLIST],
      'CT DMV 当前 REAL ID landing page 明确写明：按 REAL ID Modernization Act 与州政策，申请 REAL ID 不再要求提交 SSN documentation': [CT_REAL_ID],
      '但新办 license/permit/ID 的 general credential page 和 checklist 仍要求提供可核验 SSN，未获配 SSN 的非公民按 SSA ineligibility 规则处理': [CT_LICENSE,CT_REAL_ID_CHECKLIST],
      '因此没有实体 Social Security card 不等于一定不能办 REAL ID': [CT_REAL_ID,CT_LICENSE],
      '仍应准备准确 SSN，并在首次 credential、non-citizen 或 limited-term 场景按当前交易页核对是否要 W-2、1099、SSA letter 或其他文件': [CT_REAL_ID,CT_LICENSE,CT_REAL_ID_CHECKLIST],
      '未在美国出生且不能出示有效 U.S. passport 的申请人通常通过 SAVE 核验 lawful status，官方页面提示可能需要 10 个 business days 或更久，并可能要求回到同一 DMV office': [CT_LICENSE,CT_REAL_ID_CHECKLIST],
      '非美国公民首次申请 Connecticut learner’s permit 或 driver license 必须本人到 DMV hub office，不能把 express office 或普通 online service 当作替代': [CT_LICENSE,CT_LOCATIONS],
      'CT REAL ID 页面上方说其他 visa categories 可能符合 limited-term REAL ID，但同页 FAQ 当前又说 only DACA residents': [CT_REAL_ID],
      '同一官方页面表述不完全一致，非 DACA 临时身份申请人应让 CT DMV 确认当前 eligibility，本站不代替州方判断': [CT_REAL_ID],
      '当前 limited-term FAQ 要 DACA applicant 提交有效 I-766 Category C33、secondary identity、SSN、适用姓名文件和两份 Connecticut residency，并要求 legal-status document 至少剩余 6 个月': [CT_REAL_ID],
      'Limited-term REAL ID 与 legal-status document 的到期日对齐并标注 LIMITED-TERM': [CT_REAL_ID],
      '当前 FAQ 还写明一旦改成 limited-term，之后不能自行恢复 regular full-term credential': [CT_REAL_ID],
      'Drive Only 面向 16 岁以上、无法证明 lawful presence 的 undocumented residents，不是 REAL ID、不能用于投票，也不能作为一般联邦身份证件': [CT_DRIVE_ONLY],
      'Drive Only checklist 要 applicant 在 Connecticut 居住至少 90 天，并用两份来自不同来源、符合年龄窗口的 mail/e-mail 证明': [CT_DRIVE_ONLY_CHECKLIST],
      '最近 90 天内搬家时要按清单准备新旧地址共四份材料': [CT_DRIVE_ONLY_CHECKLIST],
      'Drive Only 身份文件用原件或 certified documents，非英文材料必须由 DMV-approved translator 翻译': [CT_DRIVE_ONLY_CHECKLIST,CT_TRANSLATORS],
      '预约时还要签署在符合资格后申请合法化身份的 affidavit': [CT_DRIVE_ONLY,CT_DRIVE_ONLY_CHECKLIST],
      'Connecticut 当前不接受外州 Drive Only 或类似 driving-privilege license 直接 transfer，申请人要按新的 Connecticut Drive Only permit、training 与 tests 路径办理': [CT_DRIVE_ONLY],
      'Drive Only 页面列出的费用为 $40 testing、$19 learner’s permit 和通过 road test 后 $36 license fee': [CT_DRIVE_ONLY,CT_FEES],
      '遗失 Drive Only 也必须到 DMV office 补办，不能用普通 online duplicate': [CT_DRIVE_ONLY],
      'Drive Only 申请会检查 Connecticut driving issues、fraudulent credential 和 Connecticut felony record': [CT_DRIVE_ONLY],
      '官方页面写明 Connecticut felony 或 CT DMV identity fraud 会影响资格，缺材料、考试失败或 background check 失败通常不退款': [CT_DRIVE_ONLY,CT_DRIVE_ONLY_CHECKLIST],
      '成为 Connecticut resident 后通常有 90 天转入外州驾照，并在同一 90 天内转入 out-of-state vehicle registration': [CT_TRANSFER],
      '两个业务不会因完成其中一个而自动完成另一个': [CT_TRANSFER],
      '外州驾照要 current 或过期不超过 2 年，申请人带原证、acceptable identification、R-229，预约 vision test，并支付 $40 application fee 与 $84 license fee': [CT_TRANSFER,CT_FEES],
      '遗失外州驾照时，可用签发州出具且日期在 60 天内的 certified driving history': [CT_TRANSFER],
      '原证过期超过 2 年则要取得 Connecticut learner’s permit、完成 8-hour Safe Driving Practices Course 并参加 skills test': [CT_TRANSFER,CT_ADULT_PERMIT],
      'Canada、Germany 与 France 的有效驾照可按 out-of-state transfer 流程办理': [CT_TRANSFER],
      '中国大陆、Taiwan 及其他未列国家不能套用这一 transfer waiver，要先办 adult learner’s permit': [CT_TRANSFER,CT_LICENSE],
      '中国大陆或其他非 reciprocity 国家过去签发的驾照/驾驶记录，可用于申请 adult permit 的 90-day wait exemption，但不把外国证件变成可直接转入的 license，也不自动免 vision、knowledge、training 或 road test': [CT_ADULT_PERMIT,CT_LICENSE],
      '仍保持外州或外国永久住所的 full-time student、active-duty military/dependent 或 visitor 可能不必转 Connecticut license': [CT_TRANSFER],
      'visitor/student 可用有效 foreign license 在 Connecticut 驾驶最多一年': [CT_TRANSFER],
      'Foreign license 不是 Connecticut identity document': [CT_LICENSE],
      '若驾照不是 English 或 Spanish，还必须随车携带由原签发国家取得的 IDP，且 IDP 单独不构成有效驾照': [CT_TRANSFER,CT_LICENSE],
      '18 岁以上首次 applicant 先办 adult learner’s permit': [CT_ADULT_PERMIT],
      '一般至少持有 90 天并完成 8-hour Safe Driving Practices Course，曾持 CT、外州、领地或 foreign license 并提供旧证或 driving history 等情况可能免 90 天等待': [CT_ADULT_PERMIT],
      '2026 年 1 月 1 日起任何 learner’s permit applicant 都要完成免费的 online Connecticut Work Zone Safety Course，用 legal name 建立账户、打印 completion certificate，并在 knowledge test 前交给 DMV': [CT_TESTS],
      'Class D knowledge test 有 25 题、至少答对 20 题': [CT_TESTS],
      'vision 要达到 20/40 或更好并有 140-degree binocular peripheral field，先通过 vision 才能参加 knowledge test': [CT_TESTS],
      '电脑 knowledge test 当前提供 Mandarin Chinese': [CT_TESTS],
      '另可提前申请 hard-copy Chinese Simplified test，不要把网站机翻、中文 manual 或口头翻译当作已预约的中文考试': [CT_TESTS],
      'Knowledge test 失败后要等待 7 天并重新支付 $40': [CT_TESTS,CT_FEES],
      'vision 失败可立即重新预约，但同样要重新安排 appointment 和费用': [CT_TESTS,CT_FEES],
      'Permit appointment 当前收 $40 testing fee（覆盖 vision、knowledge 和 road tests）及 $19 Class D learner’s permit fee': [CT_TESTS,CT_FEES],
      '通过 road test 后 first regular license 当前另付 $84': [CT_FEES,CT_LICENSE],
      'Road test 前要通过 vision/knowledge、完成 Work Zone Safety Course、满足 permit 持有期和 training': [CT_ROAD_TEST,CT_TESTS,CT_ADULT_PERMIT],
      '到场带 confirmation、R-229、learner’s permit、current registration 与 Connecticut insurance card': [CT_ROAD_TEST],
      'Road-test vehicle 必须 mechanically safe，registration 与 insurance 要当前有效': [CT_ROAD_TEST],
      '没有有效驾照的 applicant 不能独自把车开到考场，应由合格 licensed driver 陪同': [CT_ROAD_TEST],
      'Road test 至少提前 3 天 reschedule 才能避免损失 prepaid test fee': [CT_ROAD_TEST],
      '到场建议提前 15 分钟，缺 permit、registration、insurance 或车辆不合格会导致改约': [CT_ROAD_TEST],
      'CT Get a Driver’s License 页面当前写首次 noncommercial license 约 6.5 至 8.5 年，DMV fees 页面仍写 $84 对应约 5.5 至 7 年': [CT_LICENSE,CT_FEES],
      '两个官方页面的首证期限表述不一致，本站只采用一致的 $84 费用，实际 expiration 以交易系统和卡面为准': [CT_LICENSE,CT_FEES],
      '普通 license renewal 可在到期前 180 天开始': [CT_RENEW],
      '当前 6-year renewal 为 $72、8-year 为 $96，65 岁以上可选 $24 的 two-year renewal，late fee 为 $25': [CT_RENEW,CT_FEES],
      '第一次 REAL ID、非美国公民、Drive Only、CDL、suspended、过期至少 2 年、部分 endorsement、需要改名或上次未拍新照片的人不能按普通 online renewal 完成': [CT_RENEW],
      '地址变化计划与 online renewal 一起处理时，CT DMV 建议至少提前一周先在线改址': [CT_RENEW,CT_CHANGE],
      '过期 2 年或更久要回到 new-license 流程': [CT_RENEW,CT_LICENSE],
      '普通遗失、被盗或损坏 license 的 duplicate fee 为 $30': [CT_DUPLICATE,CT_FEES],
      'online duplicate 不适用于姓名变化、非美国公民、Drive Only 或 CDL，这些情形应预约 in-person': [CT_DUPLICATE],
      '地址变化后 48 小时内要更新 DMV 的 license/ID 与 vehicle registration 记录': [CT_CHANGE,CT_LICENSE],
      'online change 免费，当前卡背可贴/打印 address label，需要新卡面地址时再付 $30 duplicate': [CT_CHANGE,CT_DUPLICATE,CT_FEES],
      '姓名变更先更新 SSA 并等最多 48 小时，再带 certified supporting document 到 appointment': [CT_CHANGE],
      'material change 会收回旧 credential、发 temporary paper card，并收 $30 change fee': [CT_CHANGE,CT_FEES,CT_CENTRAL],
      'DMV in-person transaction 通常先发 temporary paper credential，永久 license/ID 在 20 business days 内寄到 application address且不转寄': [CT_CENTRAL,CT_DUPLICATE],
      'online renewal/duplicate 页面有时写 30 days，应按对应交易页跟踪': [CT_RENEW,CT_DUPLICATE],
      'Temporary paper credential 可用于适用驾驶权限，但 TSA 不把它当作 standalone airport ID': [CT_CENTRAL,TSA_IDENTIFICATION],
      '续期时通常要与 expiring/expired card 一起使用并以 TSA 当前规则为准': [CT_RENEW,TSA_IDENTIFICATION],
      '没有有效 driver license 的 Connecticut resident 可申请 non-driver ID，new ID 当前 $28、约七年': [CT_ID,CT_FEES],
      '已有 license 或 permit 时需要按 exchange/surrender 路径处理，不能把两张有效 credential 当作可并持': [CT_ID],
      'DMV hub、branch、express 和 partner office 可办业务不同，测试、non-citizen first-time、Drive Only、CDL 等要按具体页面选择地点': [CT_LOCATIONS,CT_APPOINTMENTS],
      '预约页面和 location service list 应在出发前再次核对': [CT_LOCATIONS,CT_APPOINTMENTS],
      '先按 REAL ID、ordinary non-verified license/ID 或 Drive Only 选择对应 checklist，不要把三套 identity、SSN/lawful-status 和 residency 规则混在一起': [CT_REAL_ID,CT_LICENSE,CT_DRIVE_ONLY],
      'REAL ID identity 带两份不同证件且至少一份 primary': [CT_REAL_ID_CHECKLIST],
      '只带 original 或 issuing-agency certified copy，普通/公证复印件和手机照片不接受': [CT_REAL_ID_CHECKLIST],
      '准备两份不同来源、hard-copy、显示姓名与 Connecticut residence address 的 residency proof，通常在 90 天内': [CT_REAL_ID_CHECKLIST],
      '按清单核对税单、保险、registration 或 lease 的例外期限': [CT_REAL_ID_CHECKLIST],
      '提供准确 SSN': [CT_LICENSE,CT_REAL_ID_CHECKLIST],
      '当前 REAL ID page 不再要求仅为 REAL ID 出示 SSN documentation，但首次 credential、non-citizen 或 limited-term 交易仍要按适用页面准备 SSN/SSA 文件': [CT_REAL_ID,CT_LICENSE,CT_REAL_ID_CHECKLIST],
      '姓名不一致时，带 certified marriage/civil-union certificate、dissolution 或 probate court order 串起完整姓名链，并先完成 SSA update': [CT_REAL_ID_CHECKLIST,CT_CHANGE],
      '非英文 identity、residency 或 foreign-license documents 交由 DMV-approved translator，译文与 original document 一起带到现场': [CT_TRANSLATORS,CT_REAL_ID_CHECKLIST],
      '非美国出生申请人带当前 passport、I-94、I-551、I-766、I-20/DS-2019 等与本人 status 相符的组合，并给 SAVE 留出 10+ business days': [CT_LICENSE,CT_REAL_ID_CHECKLIST],
      'DACA limited-term REAL ID 另核对 I-766 Category C33、至少 6 个月 remaining status、SSN、secondary identity、姓名文件和两份地址证明': [CT_REAL_ID],
      'Drive Only 用该项目自己的 original/certified identity 与 90-day Connecticut residency checklist': [CT_DRIVE_ONLY_CHECKLIST],
      '近期搬家者按官方四份新旧地址 mail 规则准备': [CT_DRIVE_ONLY_CHECKLIST],
      '外州转入带 current/不超过两年 expired license、R-229 和 acceptable identity': [CT_TRANSFER],
      '丢证时准备 60 天内 certified driving history': [CT_TRANSFER],
      '中国大陆等 non-reciprocity license holder 另带过去 license 或 country driving history，用于判断 90-day wait exemption，但仍按 adult permit/tests 路径': [CT_ADULT_PERMIT,CT_LICENSE],
      'Road test 带 permit、appointment confirmation、R-229、current registration、Connecticut insurance card 和 mechanically safe vehicle': [CT_ROAD_TEST],
      '先看卡面和目的：金色星标用于 REAL ID federal purpose，普通证件仍可驾驶，Drive Only 只解决符合资格者的 driving privilege': [CT_REAL_ID,CT_DRIVE_ONLY],
      '已有 passport、green card 等 TSA accepted ID 时，先判断是否真的需要在本次 renewal/duplicate 之外额外付 $30 升级': [CT_REAL_ID,CT_FEES,TSA_IDENTIFICATION],
      '打开 current Get REAL ID page 与 PDF checklist，特别比较 SSN-documentation note，不把 2023 checklist 单独当作最新政策全文': [CT_REAL_ID,CT_REAL_ID_CHECKLIST],
      '按 identity、SSN/SSA、two residency、name chain、lawful status/translation 五组放文件': [CT_REAL_ID_CHECKLIST,CT_LICENSE,CT_TRANSLATORS],
      '每份写下 source、日期、是否 original/certified': [CT_REAL_ID_CHECKLIST],
      '非美国公民先确认 full-term、DACA limited-term、ordinary non-verified 或 Drive Only 路径，并让 DMV 解释同页对 non-DACA limited-term 的冲突表述': [CT_REAL_ID,CT_LICENSE,CT_DRIVE_ONLY],
      '需要 SAVE 的人预留至少 10 business days 以上，不在旅行、status document 到期或搬家前最后几天才开始': [CT_LICENSE,CT_REAL_ID_CHECKLIST],
      'Drive Only applicant 使用专用 checklist 核对 90-day Connecticut residency、两份或搬家后的四份 mail、翻译和 affidavit，不套 REAL ID 清单': [CT_DRIVE_ONLY,CT_DRIVE_ONLY_CHECKLIST],
      '新居民先记录 residency established date，在 90 天内分别安排 license transfer 与 vehicle registration transfer': [CT_TRANSFER],
      '外州/Canada/Germany/France license holder 检查原证是否 current 或过期不超过两年，并准备 R-229、identity、vision 与 $40+$84': [CT_TRANSFER,CT_FEES],
      '中国大陆等其他国家 license holder 走 adult learner’s permit': [CT_LICENSE,CT_ADULT_PERMIT],
      '同时带旧证或 driving history，向 DMV 申请适用的 90-day wait exemption': [CT_ADULT_PERMIT,CT_LICENSE],
      'Permit applicant 先用 legal name 完成免费 Work Zone Safety Course并打印证书，再预约 in-person vision/knowledge test': [CT_TESTS],
      '需要中文考试时明确提出 Mandarin computer test 或 Chinese Simplified hard-copy test，预约前确认具体 location 和提供方式': [CT_TESTS],
      'Knowledge appointment 带 original checklist documents、R-229、眼镜/隐形眼镜、Work Zone certificate，并预算 $40 test 与 $19 permit': [CT_TESTS,CT_REAL_ID_CHECKLIST,CT_FEES],
      '取得 permit 后完成 8-hour Safe Driving Practices Course和适用练习期': [CT_ADULT_PERMIT],
      '有过去 license 的人只申请等待期 exemption，不自行跳过其他步骤': [CT_ADULT_PERMIT],
      'Road test 前逐项检查 permit、confirmation、R-229、registration、insurance、车辆安全和 licensed companion': [CT_ROAD_TEST],
      '不能参加时至少提前 3 天 reschedule': [CT_ROAD_TEST],
      '续期先检查 180-day window、online exclusions、6/8-year fee 和 65+ option': [CT_RENEW,CT_FEES],
      '首次 REAL ID、non-citizen、Drive Only、expired 2+ years 等改走对应现场路径': [CT_RENEW,CT_REAL_ID,CT_DRIVE_ONLY],
      '搬家后 48 小时内免费更新 license/ID 与 registration': [CT_CHANGE],
      '准备 online renewal 时至少提前一周改址，需要新卡面地址再付 duplicate fee': [CT_RENEW,CT_CHANGE,CT_DUPLICATE],
      '改名先在 SSA 办理并等 48 小时，带 certified name-change documents 预约 DMV，另核对 vehicle registration 是否也要同场更新': [CT_CHANGE],
      '补证前判断是否符合 online route': [CT_DUPLICATE],
      'non-citizen、Drive Only、CDL、姓名变化或复杂身份情形直接预约 office': [CT_DUPLICATE,CT_LOCATIONS],
      '现场办结后核对 temporary paper credential 与 mailing address，20 business days 未收到就查 card status': [CT_CENTRAL],
      '不要依赖 mail forwarding': [CT_CENTRAL],
      '把金色星标、ordinary non-verified license 和 Drive Only 当成同一证件，只比较费用而没先判断用途与资格': [CT_REAL_ID,CT_LICENSE,CT_DRIVE_ONLY],
      '第一次申请 REAL ID 却走普通 online renewal，或以为网上续期会自动完成 original-document verification': [CT_REAL_ID,CT_RENEW],
      '只带一份 identity，或两份完全相同类别文件，忽略 checklist 要至少一份 primary 和两份不同 identity': [CT_REAL_ID_CHECKLIST],
      '用普通 photocopy、notarized photocopy、手机照片或损坏文件替代 REAL ID original/certified documents': [CT_REAL_ID_CHECKLIST],
      '把 P.O. Box、mailing address 或不显示本人姓名的账单当作 Connecticut residence address proof': [CT_REAL_ID_CHECKLIST],
      '两份 residency 来自同一 source，或都超出 90 天又不属于官方允许的 12-month/current exceptions': [CT_REAL_ID_CHECKLIST],
      '看到旧 checklist 写 SSN proof 就认定丢失实体 Social Security card 一定不能办，也没有阅读当前 REAL ID Modernization note': [CT_REAL_ID,CT_REAL_ID_CHECKLIST],
      '反过来把“不再要求 SSN documentation”理解成 DMV 完全不需要 SSN、SSA ineligibility 或系统核验': [CT_REAL_ID,CT_LICENSE,CT_REAL_ID_CHECKLIST],
      '非英文文件自行翻译，或译文没有 DMV-approved translator number、签名、日期和 original document': [CT_TRANSLATORS,CT_REAL_ID_CHECKLIST],
      '姓名在 SSA、primary identity 与 residency 文件上不一致，也没有完整 certified name-change chain': [CT_REAL_ID_CHECKLIST,CT_CHANGE],
      '非美国公民临近旅行才申请，没有给 SAVE 或 limited-term eligibility clarification 留 10+ business days': [CT_LICENSE,CT_REAL_ID],
      '把中国大陆或 Taiwan 驾照当作 Canada/Germany/France reciprocity，直接预约 out-of-state transfer': [CT_TRANSFER],
      '听说过去 foreign license 可免 90 天，就误以为 adult permit、knowledge、training 和 road test 也都免除': [CT_ADULT_PERMIT,CT_LICENSE],
      '只转入 driver license，漏掉同为 90 天的 vehicle registration': [CT_TRANSFER],
      '或外州 license 过期超过两年仍按普通 transfer 准备': [CT_TRANSFER],
      'IDP 单独使用、在美国购买 IDP，或 foreign license 非 English/Spanish 时只带驾照不带原签发国 IDP': [CT_TRANSFER,CT_LICENSE],
      '2026 permit appointment 没有先完成 Work Zone Safety Course，或忘记打印 completion certificate': [CT_TESTS],
      '把 Mandarin computer test 与 Chinese Simplified hard-copy test 当作同一预约形式，没有提前向 DMV 确认': [CT_TESTS],
      'Knowledge test 失败后立即约次日，忽略 7 天等待和重新支付 $40': [CT_TESTS,CT_FEES],
      'Road test 车辆缺 current registration/Connecticut insurance，或 applicant 没有合格 licensed driver 陪同却自行开到考场': [CT_ROAD_TEST],
      '搬家超过 48 小时仍未更新 license/ID 和 vehicle records，或以为免费 online change 会自动寄一张新卡': [CT_CHANGE],
      '地址已经变化但在 online renewal 前不足一周才改址，导致新卡仍按 transaction 中选择的 shipping address 处理': [CT_RENEW,CT_CHANGE],
      '遗失证件时直接走 online duplicate，忽略 non-citizen、Drive Only、CDL 或 name-change 情形必须 in-person': [CT_DUPLICATE],
      '把 temporary paper credential 当作 TSA standalone ID，或依赖 USPS forwarding 接收永久卡': [CT_CENTRAL,TSA_IDENTIFICATION],
      'Drive Only applicant 把外州 driving-privilege license 当作可直接 transfer，或没有准备 90-day residency 与 background-check 边界': [CT_DRIVE_ONLY,CT_DRIVE_ONLY_CHECKLIST],
    },
  },
};

export function getReviewedStateEvidence(stateId: string) {
  return reviewedStateEvidence[stateId];
}

export function getReviewedStateClaimSources(stateId: string, claim: string) {
  return reviewedStateEvidence[stateId]?.claims[claim];
}
