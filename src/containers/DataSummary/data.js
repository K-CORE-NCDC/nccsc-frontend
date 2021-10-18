let clinicalColor = {
  "Basic/Diagnostic Information":"#56a21d",
  "Patient Health Information":"#b71d26",
  "Clinical Information":"#1d52b5",
  "Follow-up Observation":"#db941b"
}

let clinical_info_title = {
  "Age":"Age",
  "BMI":"kg/m2",
  "Lactation period(1-24 M)":"month",
  "Menarche age (10-17 Y)":'Year',
  'Lactation period (1-24 M)':'Month',
  'T Category':'Stage',
  'N Category':'Stage',
  'Time until relapse is confirmed (1-16 Y)':'Year'
}


let filterBoxes = {
  "Basic/Diagnostic Information":{
    "Sex":[
      {'type':'checkbox','name':'sex','id':'sex_male','value':'Male'},
      {'type':'checkbox','name':'sex','id':'sex_female','value':'Female'}
    ],
    "Age(20-40 Y)":[
      {'type':'number','id':'aod','value':''},

    ],
    "BMI (15.82-36.33 kg/㎡)":[
      {'type':'number','id':'bmi','value':''},

    ],

    "Bilateral breast cancer":[
      {'type':'checkbox','id':'dbbc_from','value':'Yes'},
      {'type':'checkbox','id':'dbbc_to','value':'No'}
    ],

  },
  "Patient Health Information":{
    "Smoking information":[
      {'type':'checkbox','name':'smoking_status','id':'current_smoker','value':'Current Smoker'},
      {'type':'checkbox','name':'smoking_status','id':'former_smoker','value':'Former Smoker'},
      {'type':'checkbox','name':'smoking_status','id':'non_smoker','value':'Nonsmoker'},
    ],
    "Drinking information":[
      {'type':'checkbox','name':'alcohol_consuption','id':'ac_yes','value':'Yes'},
      {'type':'checkbox','name':'alcohol_consuption','id':'ac_no','value':'No'},
    ],
    "Breast cancer family history":[
      {'type':'checkbox','name':'fhbc','id':'fhbc_yes','value':'Yes'},
      {'type':'checkbox','name':'fhbc','id':'fhbc_no','value':'No'},
    ],
    "Menarche age (10-17 Y)":[
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
    "Breastfeeding experience":[
      {'type':'checkbox','name':'eob','id':'eob_yes','value':'Yes'},
      {'type':'checkbox','name':'eob','id':'eob_no','value':'No'},
    ],
    "Lactation period (months)":[
      {'type':'number','name':'dob','id':'dob','value':''},
    ],
    "Contraceptives":[
      {'type':'checkbox','name':'iocp','id':'iocp_yes','value':'Yes'},
      {'type':'checkbox','name':'iocp','id':'iocp_no','value':'No'},
    ],
    "HRT":[
      {'type':'checkbox','name':'hrt','id':'hrt_yes','value':'Yes'},
      {'type':'checkbox','name':'hrt','id':'hrt_no','value':'No'},
    ],
  },
  "Clinical Information":{
    "T Category":[
      {'type':'checkbox','name':'tstage','id':'tstage_1','value':'Stage I'},
      {'type':'checkbox','name':'tstage','id':'tstage_2','value':'Stage II'},
      {'type':'checkbox','name':'tstage','id':'tstage_3','value':'Stage III'},
      {'type':'checkbox','name':'tstage','id':'tstage_4','value':'Stage IV'},
    ],
    "N Category":[
      {'type':'checkbox','name':'nstage','id':'nstage_na','value':'Not evaluated'},
      {'type':'checkbox','name':'nstage','id':'nstage_o','value':'Stage O'},
      {'type':'checkbox','name':'nstage','id':'nstage_i','value':'Stage I'},
      {'type':'checkbox','name':'nstage','id':'nstage_ii','value':'Stage II'},
      {'type':'checkbox','name':'nstage','id':'nstage_iii','value':'Stage III'},
    ],
    "ER Test":[
      {'type':'checkbox','name':'etr','id':'etr_yes','value':'Positive'},
      {'type':'checkbox','name':'etr','id':'etr_no','value':'Negative'},
      {'type':'checkbox','name':'etr','id':'etr_na','value':'Not evaluated'},

    ],
    "PR tset":[
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
    "Ki-67 (1-95 %)":[
      {'type':'number','name':'ki67','id':'ki67','value':''},
    ]
  },
  "Follow-up Observation":{
    "Recurrence":[
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
  "clinical_info_title":clinical_info_title
}

export default inputJson
