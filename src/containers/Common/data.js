let clinicalColor = {
  "Basic/Diagnostic Information":"#56a21d",
  "Patient Health Information":"#b71d26",
  "Clinical Information":"#1d52b5",
  "Follow-up Observation":"#db941b"
}

let gene_selection = {
  "user-defined" : {
    "data": []
  },
  "major-genes" : {
    "data": [
      "TP53", "EGFR", "PDGFRA", "MDM2", "CDK4",
      "CDK6", "CDKN2A", "CDKN2B", "PTEN", "NF1",
      "RB1", "BRAF", "PIK3CA", "PIK3R1", "KRAS",
      "NRAS", "HRAS", "ATRX", "MDM4", "MET",
      "FGFR3", "FGFR2", "FGFR1", "IDH1", "PIK3C2G",
      "PIK3CG", "PIK3C2A", "PIK3R2"
    ]
  },
  "brst-major-genes" : {
    "data": [
      "BRCA1", "BRCA2", "PALB2", "PTEN", "TP53",
      "ATM", "CDH1", "CHEK2", "NBN", "NF1",
      "STK11", "BARD1", "BRIP1", "MLH1", "MSH2",
      "MSH6", "PMS2", "EPCAM", "RAD51C", "RAD51D"
    ],
    "reference": "https://www.breastcancer.org"
  },
  "hrd-genes" : {
    "data": [
      "ARID1A", "ATM", "ATRX", "BAP1", "BLM",
      "BRCA1", "BRCA2", "BRIP1", "CHEK2", "FANCC",
      "MRE11A", "NBN", "PALB2", "RAD50", "WRN"
    ],
    "reference": "Hisamitsu Takaya, Hidekatsu Nakai, Shiro Takamastu, Masaki Mandai & Noriomi Matsumura. \"Homologous recombination deficiency status-based classification of high-grade serous ovarian carcinoma\", 2020. Nature, 10"
  },
  "hrd-asso-brst" : {
    "data": [
      "CHEK1","FANCI","RAD51B", "RAD51", "RAD50",
      "NBN", "FANCE", "PTEN", "FANCL", "FANCA",
      "ATRX", "BLM", "FANCM", "RAD54L","EMSY",
      "ATR", "RAD51D","FANCC", "ATM", "BRIP1",
      "CDK12", "FANCD2", "FANCG", "RPA1", "PALB2",
      "CHEK2"
    ],
    "reference": "https://myriad.com/product-services/precision-medicine/mychoice-cdx"
  },
  "tcell-exha-genes" : {
    "data": [
      "PDCD1","CTLA4","LAG3","HAVCR2","CD244",
      "CD160","TIGIT","BTLA"
    ],
    "reference": "John S Yi, Maureen A Cox, and Allan J Zajac. \"T-cell exhaustion: characteristics, causes and conversion\", 2010, Immunology, 129(4): 474-481"
  },
  "cdc-brst-genes" : {
    "data": [
      "BRCA1", "BRCA2", "TP53", "ERBB2", "ESR1",
      "PIK3CA","CHEK2","MTHFR","GSTM1","FGFR2",
      "CYP2D6","ATM","XRCC1","PALB2","GSTP1",
      "GSTT1","COMT","CYP19A1"
    ],
    "reference": "https://phgkb.cdc.gov/PHGKB/hNHome.action",
    "selection-creteria-ko": "2020년 8월 기준 CDC Phenopedia 내 Breast Neoplasms 관련 연구 누적 100건 이상",
    "selection-creteria-en": "Selection Standard: More than 100 cumulative studies of Breast Neplasms in CDC Phenopedia(2020.08)"
  },
  "cell-cycle-ctrl" : {
    "data": [
      "RB1", "RBL1","RBL2","CCNA1","CCNB1",
      "CDK1", "CCNE1", "CDK2", "CDC25A", "CCND1",
      "CDK4", "CDK6", "CCND2", "CDKN2A", "CDKN2B",
      "MYC", "CDKN1A", "CDKN1B", "E2F1", "E2F2",
      "E2F3", "E2F4", "E2F5", "E2F6", "E2F7",
      "E2F8", "SRC", "JAK1", "JAK2", "STAT1",
      "STAT2","STAT3", "STAT5A", "STAT5B"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "p53-signal" : {
    "data": [
      "TP53", "MDM2","MDM4", "CDKN2A", "CDKN2B",
      "TP53BP1"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "notch-signal" : {
    "data": [
      "ADAM10","ADAM17","APH1A","APH1B","ARRDC1",
      "CIR1","CTBP1","CTBP2","CUL1","DLL1",
      "DLL3","DLL4","DTX1","DTX2","DTX3",
      "DTX3L","DTX4","EP300","FBXW7","HDAC1",
      "HDAC2","HES1","HES5","HEYL","ITCH",
      "JAG1","JAG2","KDM5A","LFNG","MAML1",
      "MAML2","MAML3","MFNG","NCOR2","NCSTN",
      "NOTCH1","NOTCH2","NOTCH3","NOTCH4","NRARP",
      "NUMB","NUMBL","PSEN1","PSEN2","PSENEN",
      "RBPJ","RBPJL","RFNG","SNW1","SPEN",
      "HES2","HES4","HES7","HEY1","HEY2"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "dna-damage-resp" : {
    "data": [
      "CHEK1","CHEK2","RAD51","BRCA1","BRCA2",
      "MLH1","MSH2","ATM","ATR","MDC1",
      "PARP1","FANCF"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "other-grow-prol-signal" : {
    "data": [
      "CSF1","CSF1R","IGF1","IGF1R","FGF1",
      "FGFR1","AURKA","DLEC1","PLAGL1","OPCML",
      "DPH1"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "survival-cell-signal" : {
    "data": [
      "NFKB1","NFKB2","CHUK","DIRAS3","FAS",
      "HLA-G","BAD","BCL2","BCL2L1","APAF1",
      "CASP9","CASP8","CASP10","CASP3","CASP6",
      "CASP7","GSK3B","ARL11","WWOX","PEG3",
      "TGFB1","TGFBR1","TGFBR2"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "telo-mere-main" : {
    "data": [
      "TERC", "TERT"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "rtk-signal-family" : {
    "data": [
      "EGFR","ERBB2","ERBB3","ERBB4","PDGFA",
      "PDGFB","PDGFRA","PDGFRB","KIT","FGF1",
      "FGFR1","IGF1","IGF1R","VEGFA","VEGFB",
      "KDR"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "pi3k-akt-mtor-signal" : {
    "data": [
      "PIK3CA","PIK3R1","PIK3R2","PTEN","PDPK1",
      "AKT1","AKT2","FOXO1","FOXO3","MTOR",
      "RICTOR","TSC1","TSC2","RHEB","AKT1S1",
      "RPTOR","MLST8"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "ras-raf-signal" : {
    "data": [
      "KRAS","HRAS","BRAF","RAF1","MAP3K1",
      "MAP3K2","MAP3K3","MAP3K4","MAP3K5","MAP2K1",
      "MAP2K2","MAP2K3","MAP2K4","MAP2K5","MAPK1",
      "MAPK3","MAPK4","MAPK6","MAPK7","MAPK8",
      "MAPK9","MAPK12","MAPK14","DAB2","RASSF1",
      "RAB25"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "regu-ribo-cell" : {
    "data": [
      "RPS6KA1","RPS6KA2","RPS6KB1","RPS6KB2","EIF5A2",
      "EIF4E","EIF4EBP1","RPS6","HIF1A"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "angi-gene" : {
    "data": [
      "VEGFA","VEGFB","KDR","CXCL8","CXCR1",
      "CXCR2"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "fola-trans" : {
    "data": [
      "SLC19A1","FOLR1","FOLR2","FOLR3","IZUMO1R"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "inva-meta" : {
    "data": [
      "MMP1","MMP2","MMP3","MMP7","MMP9",
      "MMP10","MMP11","MMP12","MMP13","MMP14",
      "MMP15","MMP16","MMP17","MMP19","MMP21",
      "MMP23B","MMP24","MMP25","MMP26","MMP27",
      "MMP28","ITGB3","ITGAV","PTK2","CDH1",
      "SPARC","WFDC2"
    ],
    "reference": "https://www.cbioportal.org"
  },
  "tgf-beta-path" : {
    "data": [
      "TGFB1","TGFB2","TGFB3","TGFBR1","TGFBR2",
      "TGFBR3","BMP2","BMP3","BMP4","BMP5",
      "BMP6","BMP7","GDF2","BMP10","BMP15",
      "BMPR1A","BMPR1B","BMPR2","ACVR1","ACVR1B",
      "ACVR1C","ACVR2A","ACVR2B","ACVRL1","Nodal",
      "GDF1","GDF11","INHA","INHBA","INHBB",
      "INHBC","INHBE","SMAD2","SMAD3","SMAD1",
      "SMAD5","SMAD4","SMAD9","SMAD6","SMAD7",
      "SPTBN1","TGFBRAP1","ZFYVE9"
    ],
    "reference": "https://www.cbioportal.org"
  }
}

let filterBoxes = {
  "Basic/Diagnostic Information":{
    "Sex":[
      {'type':'checkbox','name':'sex','id':'sex_male','value':'Male'},
      {'type':'checkbox','name':'sex','id':'sex_female','value':'Female'}
    ],
    "Age of Diagnosis (20-40 Y)":[
      {'type':'number','id':'aod','value':''},

    ],
    "Body Mass Index (15.82-36.33 kg/㎡)":[
      {'type':'number','id':'bmi','value':''},

    ],

    "Diagnosis of Bilateral Breast Cancer)":[
      {'type':'checkbox','id':'dbbc_from','value':'Yes'},
      {'type':'checkbox','id':'dbbc_to','value':'No'}
    ],

  },
  "Patient Health Information":{
    "Smoking Status":[
      {'type':'checkbox','name':'smoking_status','id':'current_smoker','value':'Current Smoker'},
      {'type':'checkbox','name':'smoking_status','id':'former_smoker','value':'Former Smoker'},
      {'type':'checkbox','name':'smoking_status','id':'non_smoker','value':'Nonsmoker'},
    ],
    "Alcohol Consuption":[
      {'type':'checkbox','name':'alcohol_consuption','id':'ac_yes','value':'Yes'},
      {'type':'checkbox','name':'alcohol_consuption','id':'ac_no','value':'No'},
    ],
    "Family History of Breast Cancer":[
      {'type':'checkbox','name':'fhbc','id':'fhbc_yes','value':'Yes'},
      {'type':'checkbox','name':'fhbc','id':'fhbc_no','value':'No'},
    ],
    "First Menstural Age (10-17 Y)":[
      {'type':'number','name':'fma','id':'fma','value':''},
    ],
    "Menopause":[
      {'type':'checkbox','name':'menopause','id':'menopause_yes','value':'Yes'},
      {'type':'checkbox','name':'menopause','id':'menopause_no','value':'No'},
    ],
    "Childbirth":[
      {'type':'checkbox','name':'childbirth','id':'childbirth_yes','value':'Yes'},
      {'type':'checkbox','name':'childbirth','id':'childbirth_no','value':'No'},
    ],
    "Experience of Breastfeeding":[
      {'type':'checkbox','name':'eob','id':'eob_yes','value':'Yes'},
      {'type':'checkbox','name':'eob','id':'eob_no','value':'No'},
    ],
    "Duration of Breastfeeding (1-24 M)":[
      {'type':'number','name':'dob','id':'dob','value':''},
    ],
    "Intake of Oral Contraceptive Pill":[
      {'type':'checkbox','name':'iocp','id':'iocp_yes','value':'Yes'},
      {'type':'checkbox','name':'iocp','id':'iocp_no','value':'No'},
    ],
    "Hormone Replacement Therapy":[
      {'type':'checkbox','name':'hrt','id':'hrt_yes','value':'Yes'},
      {'type':'checkbox','name':'hrt','id':'hrt_no','value':'No'},
    ],
  },
  "Clinical Information":{
    "T Stage":[
      {'type':'checkbox','name':'tstage','id':'tstage_1','value':'Stage I'},
      {'type':'checkbox','name':'tstage','id':'tstage_2','value':'Stage II'},
      {'type':'checkbox','name':'tstage','id':'tstage_3','value':'Stage III'},
      {'type':'checkbox','name':'tstage','id':'tstage_4','value':'Stage IV'},
    ],
    "N Stage":[
      {'type':'checkbox','name':'nstage','id':'nstage_na','value':'Not evaluated'},
      {'type':'checkbox','name':'nstage','id':'nstage_o','value':'Stage O'},
      {'type':'checkbox','name':'nstage','id':'nstage_i','value':'Stage I'},
      {'type':'checkbox','name':'nstage','id':'nstage_ii','value':'Stage II'},
      {'type':'checkbox','name':'nstage','id':'nstage_iii','value':'Stage III'},
    ],
    "ER Test Results":[
      {'type':'checkbox','name':'etr','id':'etr_yes','value':'Positive'},
      {'type':'checkbox','name':'etr','id':'etr_no','value':'Negative'},
      {'type':'checkbox','name':'etr','id':'etr_na','value':'Not evaluated'},

    ],
    "PR Test Results":[
      {'type':'checkbox','name':'ptr','id':'ptr_yes','value':'Positive'},
      {'type':'checkbox','name':'ptr','id':'ptr_no','value':'Negative'},
      {'type':'checkbox','name':'ptr','id':'ptr_na','value':'Not evaluated'},
    ],
    "HER2 Score":[
      {'type':'checkbox','name':'herscore','id':'herscore_o','value':"O"},
      {'type':'checkbox','name':'herscore','id':'herscore_o1','value':'O~1+'},
      {'type':'checkbox','name':'herscore','id':'herscore_1','value':'1+'},
      {'type':'checkbox','name':'herscore','id':'herscore_2','value':'2'},
      {'type':'checkbox','name':'herscore','id':'herscore_2+','value':'2+'},
      {'type':'checkbox','name':'herscore','id':'herscore_3+','value':'3+'},
    ],
    "Ki-67 Index (1-95 %)":[
      {'type':'number','name':'ki67','id':'ki67','value':''},
    ]
  },
  "Follow-up Observation":{
    "Cancer Recurrence":[
      {'type':'checkbox','name':'cr','id':'cr_yes','value':'Yes'},
      {'type':'checkbox','name':'cr','id':'cr_no','value':'No'},
    ],
    "Time until relapse is confirmed (0.8-186.3 M)":[
      {'type':'number','name':'turc','id':'turc','value':''},
    ]
  },
}
let inputJson = {
  "clinicalColor":clinicalColor,
  "filterBoxes":filterBoxes,
  "gene_selection":gene_selection
}

export default inputJson
