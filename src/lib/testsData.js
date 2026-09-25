export const TEST_CATEGORIES = {
  'STIs & STDs': [
    'HIV I & II',
    'Hepatitis A',
    'HbsAg',
    'HCV',
    'VDRL',
    'CHLAMYDIA',
    'HPV',
    'HERPES II',
    'Gonorrhoea',
    'TB test',
    'Pap Smear'
  ],
  'CHEMISTRY': [
    'EUCR',
    'LFT',
    'RBS/FBS',
    'Fasting Lipid profile'
  ],
  'HAEMATOLOGY': [
    'FBC',
    'MP',
    'WIDAL',
    'BLOOD Group',
    'Pregnancy Test',
    'PCV',
    'ESR',
    'GENOTYPE'
  ],
  'FERTILITY': [
    'LH',
    'FSH',
    'E2',
    'AMH',
    'Prolactin',
    'Progesterone',
    'Testosterone',
    'T3',
    'T4',
    'Semen Fluid analysis',
    'Semen Analysis'
  ],
  'Microbiology': [
    'Urine Macs',
    'Urethra swab mcs',
    'High vaginal swab mcs',
    'Blood culture',
    'Semen culture'
  ]
}

export const initializeTestRecords = () => {
  const records = {}
  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  Object.entries(TEST_CATEGORIES).forEach(([category, tests]) => {
    tests.forEach(test => {
      records[`${category}-${test}`] = {
        id: `${category}-${test}`,
        name: test,
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
