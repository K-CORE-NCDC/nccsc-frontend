let clinicalColor = {
  "Basic/Diagnostic Information":"#56a21d",
  "Patient Health Information":"#b71d26",
  "Clinical Information":"#1d52b5",
  "Follow-up Observation":"#db941b"
}

let clinical_info_title = {
  "Age Of Daignosis":"Age",
  "Body Mass Index":"kg/m2",
  "Duration of Breastfeeding":"month",
  "First Menstrual Age":'Year',
  'T Category':'Category',
  'N Category':'Category',
  'Time until relapse is confirmed':'Year'
}


let filterBoxes = {
  "Basic/Diagnostic Information":{
    "Sex":[
      {'type':'checkbox','name':'sex','id':'sex_male','value':'Male'},
      {'type':'checkbox','name':'sex','id':'sex_female','value':'Female'}
    ],
    "Age Of Daignosis":[
      {'type':'number','id':'aod','value':'', 'min':20,'max':40},
      

    ],
    "Body Mass Index":[
      {'type':'number','id':'bmi','value':'','min':15.82,'max':36.33},
    ],
    "Diagnosis Of Bilateral Breast Cancer":[
      {'type':'checkbox','name':'dbbc','id':'dbbc_from','value':'Yes'},
      {'type':'checkbox','name':'dbbc','id':'dbbc_to','value':'No'}
    ],

  },
  "Patient Health Information":{
    "Smoking Status":[
      {'type':'checkbox','name':'smoking_status','id':'current_smoker','value':'Current Smoker'},
      {'type':'checkbox','name':'smoking_status','id':'former_smoker','value':'Former Smoker'},
      {'type':'checkbox','name':'smoking_status','id':'non_smoker','value':'Nonsmoker'},
    ],
    "Alcohol Consumption":[
      {'type':'checkbox','name':'alcohol_consuption','id':'ac_yes','value':'Yes'},
      {'type':'checkbox','name':'alcohol_consuption','id':'ac_no','value':'No'},
    ],
    "Family History of Breast Cancer":[
      {'type':'checkbox','name':'fhbc','id':'fhbc_yes','value':'Yes'},
      {'type':'checkbox','name':'fhbc','id':'fhbc_no','value':'No'},
    ],
    "First Menstrual Age":[
      {'type':'number','name':'fma','id':'fma','value':'','min':10,'max':17},
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
    "Duration of Breastfeeding":[
      {'type':'number','name':'dob','id':'dob','value':'','min':1,'max':24},
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
      {'type':'checkbox','name':'tstage','id':'tstage_is','value':'Tis'},
      {'type':'checkbox','name':'tstage','id':'tstage_1','value':'T1(1, 1a, 1b, 1c, 1mi)'},
      {'type':'checkbox','name':'tstage','id':'tstage_2','value':'T2(2)'},
      {'type':'checkbox','name':'tstage','id':'tstage_3','value':'T3(3)'},
      {'type':'checkbox','name':'tstage','id':'tstage_4','value':'T4(4b, 4d)'},
    ],
    "N Stage":[
      {'type':'checkbox','name':'nstage','id':'nstage_nx','value':'Nx'},
      {'type':'checkbox','name':'nstage','id':'nstage_n0','value':'N0'},
      {'type':'checkbox','name':'nstage','id':'nstage_n1','value':'N1(1mi, 1a, 1b)'},
      {'type':'checkbox','name':'nstage','id':'nstage_n2','value':' N2(2, 2a)'},
      {'type':'checkbox','name':'nstage','id':'nstage_n3','value':'N3(3, 3a)'},
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
    "Ki-67 Index":[
      {'type':'number','name':'ki67','id':'ki67','value':'','min':1,'max':95},
    ]
  },
  "Follow-up Observation":{
    "Cancer Recurrence":[
      {'type':'checkbox','name':'cr','id':'cr_yes','value':'Yes'},
      {'type':'checkbox','name':'cr','id':'cr_no','value':'No'},
    ],
    "Time until relapse is confirmed":[
      {'type':'number','name':'turc','id':'turc','value':'','min':1,'max':16},
    ]
  },
}

let inputJson = {
  "clinicalColor":clinicalColor,
  "filterBoxes":filterBoxes,
  "clinical_info_title":clinical_info_title
}

export default inputJson
