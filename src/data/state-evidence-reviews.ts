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

export const reviewedStateEvidence: Record<string, ReviewedStateEvidence> = {
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
};

export function getReviewedStateEvidence(stateId: string) {
  return reviewedStateEvidence[stateId];
}

export function getReviewedStateClaimSources(stateId: string, claim: string) {
  return reviewedStateEvidence[stateId]?.claims[claim];
}
