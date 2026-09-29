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
    { name: 'Trichomonas', category: 'STIs & STDs' }
  ],
  'Chemistry': [
    { name: 'RBS_FBS', category: 'Chemistry' },
    { name: 'Fasting Lipid profile', category: 'Chemistry' },
    { name: 'LFT', category: 'Chemistry' },
    { name: 'EUCR', category: 'Chemistry' },
    { name: 'Kidney Function Test', category: 'Chemistry' },
    { name: 'Thyroid Function Test', category: 'Chemistry' },
    { name: 'Vitamin B12 & Folate', category: 'Chemistry' },
    { name: 'HbA1c', category: 'Chemistry' },
    { name: 'Uric Acid', category: 'Chemistry' }
  ],
  'Hematology': [
    { name: 'CBC', category: 'Hematology' },
    { name: 'ESR', category: 'Hematology' },
    { name: 'Blood Group & Rh', category: 'Hematology' }
  ],
  'Immunology': [
  ],
  'Endocrinology': [
    { name: 'TSH, FT3, FT4', category: 'Endocrinology' },
    { name: 'Insulin', category: 'Endocrinology' },
    { name: 'Prolactin', category: 'Endocrinology' }
  ],
  'Fertility': [
    { name: 'AMH', category: 'Fertility' },
    { name: 'FSH', category: 'Fertility' },
    { name: 'LH', category: 'Fertility' },
    { name: 'Estradiol (E2)', category: 'Fertility' },
    { name: 'Progesterone', category: 'Fertility' },
    { name: 'Testosterone', category: 'Fertility' },
    { name: 'DHEAS', category: 'Fertility' },
    { name: 'Prolactin', category: 'Fertility' }
  ],
  'Pregnancy Test': [
    { name: 'Urine Pregnancy Test', category: 'Pregnancy Test' }
  ],
  'MP': [
    { name: 'MP 1', category: 'MP' }
  ],
  'Microbiology': [
    { name: 'Urine Culture', category: 'Microbiology' },
    { name: 'Throat Swab', category: 'Microbiology' },
    { name: 'Stool Culture', category: 'Microbiology' },
    { name: 'Antibiotic Sensitivity', category: 'Microbiology' }
  ],
  'Parasitology': [
    { name: 'Malaria Parasite', category: 'Parasitology' }
  ],
  'Serology': [
    { name: 'Widal Test', category: 'Serology' },
    { name: 'Typhoid Test', category: 'Serology' }
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
