export const TEST_CATEGORIES = {
  'STIs & STDs': [
    { name: 'HIV 1 & 2', category: 'STIs & STDs' },
    { name: 'Syphilis (RPR_VDRL)', category: 'STIs & STDs' },
    { name: 'Hepatitis B Surface Antigen', category: 'STIs & STDs' },
    { name: 'Hepatitis C Antibody', category: 'STIs & STDs' },
    { name: 'Gonorrhea', category: 'STIs & STDs' },
    { name: 'Chlamydia', category: 'STIs & STDs' },
    { name: 'HSV 1 & 2 IgM_IgG', category: 'STIs & STDs' },
    { name: 'HPV DNA', category: 'STIs & STDs' },
    { name: 'Trichomonas', category: 'STIs & STDs' },
    { name: 'Bacterial Vaginosis', category: 'STIs & STDs' },
    { name: 'Candidiasis', category: 'STIs & STDs' },
    { name: 'Chancroid', category: 'STIs & STDs' },
    { name: 'Lymphogranuloma Venereum', category: 'STIs & STDs' },
    { name: 'Donovanosis', category: 'STIs & STDs' }
  ],
  'Chemistry': [
    { name: 'RBS_FBS', category: 'Chemistry' },
    { name: 'Fasting Lipid profile', category: 'Chemistry' },
    { name: 'LFT', category: 'Chemistry' },
    { name: 'EUCR', category: 'Chemistry' },
    { name: 'Kidney Function Test', category: 'Chemistry' },
    { name: 'Electrolytes', category: 'Chemistry' },
    { name: 'Cardiac Enzymes', category: 'Chemistry' },
    { name: 'Thyroid Function Test', category: 'Chemistry' },
    { name: 'Pancreatic Enzymes', category: 'Chemistry' },
    { name: 'Bone Profile', category: 'Chemistry' },
    { name: 'Iron Studies', category: 'Chemistry' },
    { name: 'Vitamin B12 & Folate', category: 'Chemistry' },
    { name: 'HbA1c', category: 'Chemistry' },
    { name: 'Uric Acid', category: 'Chemistry' },
    { name: 'Amylase_Lipase', category: 'Chemistry' }
  ],
  'Hematology': [
    { name: 'CBC', category: 'Hematology' },
    { name: 'ESR', category: 'Hematology' },
    { name: 'CRP', category: 'Hematology' },
    { name: 'Blood Group & Rh', category: 'Hematology' },
    { name: 'Peripheral Smear', category: 'Hematology' },
    { name: 'Reticulocyte Count', category: 'Hematology' },
    { name: 'Coagulation Profile', category: 'Hematology' },
    { name: 'D-Dimer', category: 'Hematology' },
    { name: 'Fibrinogen', category: 'Hematology' },
    { name: 'PT_INR', category: 'Hematology' },
    { name: 'APTT', category: 'Hematology' }
  ],
  'Immunology': [
    { name: 'ANA', category: 'Immunology' },
    { name: 'Anti-CCP', category: 'Immunology' },
    { name: 'RF', category: 'Immunology' },
    { name: 'ASO', category: 'Immunology' },
    { name: 'CRP', category: 'Immunology' },
    { name: 'Anti-TPO', category: 'Immunology' },
    { name: 'Anti-TG', category: 'Immunology' },
    { name: 'IgE', category: 'Immunology' },
    { name: 'Complement C3_C4', category: 'Immunology' },
    { name: 'ANA Profile', category: 'Immunology' }
  ],
  'Endocrinology': [
    { name: 'TSH, FT3, FT4', category: 'Endocrinology' },
    { name: 'Insulin', category: 'Endocrinology' },
    { name: 'C-Peptide', category: 'Endocrinology' },
    { name: 'Cortisol', category: 'Endocrinology' },
    { name: 'Growth Hormone', category: 'Endocrinology' },
    { name: 'IGF-1', category: 'Endocrinology' },
    { name: 'Prolactin', category: 'Endocrinology' },
    { name: 'ACTH', category: 'Endocrinology' }
  ],
  'Fertility': [
    { name: 'AMH', category: 'Fertility' },
    { name: 'FSH', category: 'Fertility' },
    { name: 'LH', category: 'Fertility' },
    { name: 'Estradiol (E2)', category: 'Fertility' },
    { name: 'Progesterone', category: 'Fertility' },
    { name: 'Testosterone', category: 'Fertility' },
    { name: 'DHEAS', category: 'Fertility' },
    { name: 'Inhibin B', category: 'Fertility' },
    { name: 'Prolactin', category: 'Fertility' }
  ],
  'Pregnancy Test': [
    { name: 'Beta-hCG', category: 'Pregnancy Test' },
    { name: 'Urine Pregnancy Test', category: 'Pregnancy Test' }
  ],
  'MP': [
    { name: 'MP 1', category: 'MP' },
    { name: 'MP 2', category: 'MP' },
    { name: 'MP 3', category: 'MP' }
  ],
  'Microbiology': [
    { name: 'Urine Culture', category: 'Microbiology' },
    { name: 'Blood Culture', category: 'Microbiology' },
    { name: 'Throat Swab', category: 'Microbiology' },
    { name: 'Stool Culture', category: 'Microbiology' },
    { name: 'Wound Swab', category: 'Microbiology' },
    { name: 'Sputum Culture', category: 'Microbiology' },
    { name: 'CSF Culture', category: 'Microbiology' },
    { name: 'Antibiotic Sensitivity', category: 'Microbiology' }
  ],
  'Parasitology': [
    { name: 'Malaria Parasite', category: 'Parasitology' },
    { name: 'Stool Ova & Parasites', category: 'Parasitology' },
    { name: 'Blood Parasites', category: 'Parasitology' }
  ],
  'Serology': [
    { name: 'Widal Test', category: 'Serology' },
    { name: 'Typhoid Test', category: 'Serology' },
    { name: 'Brucella Test', category: 'Serology' },
    { name: 'Leptospira Test', category: 'Serology' },
    { name: 'Dengue NS1 Antigen', category: 'Serology' },
    { name: 'Dengue IgM_IgG', category: 'Serology' },
    { name: 'Chikungunya IgM_IgG', category: 'Serology' },
    { name: 'Yellow Fever', category: 'Serology' }
  ],
  'Molecular': [
    { name: 'PCR - COVID-19', category: 'Molecular' },
    { name: 'PCR - TB', category: 'Molecular' },
    { name: 'PCR - HPV', category: 'Molecular' },
    { name: 'PCR - HIV', category: 'Molecular' },
    { name: 'PCR - Hepatitis C', category: 'Molecular' },
    { name: 'PCR - Hepatitis B', category: 'Molecular' }
  ]
}

export const initializeTestRecords = () => {
  const records = {}
  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  Object.entries(TEST_CATEGORIES).forEach(([category, tests]) => {
    tests.forEach(test => {
      records[`${category}-${test.name}`] = {
        id: `${category}-${test.name}`,
        name: test.name,
        category: category,
        count: 0,
        minStock: 3,
        lastUpdated: now.toISOString(),
        date: now.toISOString().split('T')[0],
        day: days[now.getDay()]
      }
    })
  })
  return records
}
