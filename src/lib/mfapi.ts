// MFAPI - Free Mutual Fund API for India
const BASE_URL = 'https://api.mfapi.in/mf';

export interface MutualFundBasic {
  schemeCode: number;
  schemeName: string;
}

export interface NAVData {
  date: string;
  nav: string;
}

export interface MutualFundDetail {
  meta: {
    fund_house: string;
    scheme_type: string;
    scheme_category: string;
    scheme_code: number;
    scheme_name: string;
  };
  data: NAVData[];
  status: string;
}

export interface FundWithMetrics extends MutualFundBasic {
  fundHouse?: string;
  category?: string;
  schemeType?: string;
  currentNAV?: number;
  return1Y?: number;
  return3Y?: number;
  return5Y?: number;
  isDirect?: boolean;
  isRegular?: boolean;
}

// Get all mutual funds
export async function getAllMutualFunds(): Promise<MutualFundBasic[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch funds');
    return response.json();
  } catch (error) {
    console.error('Error fetching all mutual funds:', error);
    return [];
  }
}

// Get specific fund details
export async function getFundDetails(schemeCode: number): Promise<MutualFundDetail | null> {
  try {
    const response = await fetch(`${BASE_URL}/${schemeCode}`);
    if (!response.ok) throw new Error('Failed to fetch fund details');
    return response.json();
  } catch (error) {
    console.error(`Error fetching fund ${schemeCode}:`, error);
    return null;
  }
}

// Calculate returns from NAV history
export function calculateReturns(navHistory: NAVData[]): { return1Y: number; return3Y: number; return5Y: number } {
  if (!navHistory || navHistory.length === 0) {
    return { return1Y: 0, return3Y: 0, return5Y: 0 };
  }

  const currentNAV = parseFloat(navHistory[0]?.nav || '0');
  const sortedData = [...navHistory].sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  const findNAVAtYearsAgo = (years: number): number => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() - years);
    
    // Find closest NAV to target date
    let closestNAV = sortedData[sortedData.length - 1];
    for (const nav of sortedData) {
      const navDate = new Date(nav.date.split('-').reverse().join('-'));
      if (navDate <= targetDate) {
        closestNAV = nav;
        break;
      }
    }
    return parseFloat(closestNAV?.nav || '0');
  };

  const nav1YAgo = findNAVAtYearsAgo(1);
  const nav3YAgo = findNAVAtYearsAgo(3);
  const nav5YAgo = findNAVAtYearsAgo(5);

  const return1Y = nav1YAgo > 0 ? ((currentNAV - nav1YAgo) / nav1YAgo) * 100 : 0;
  const return3Y = nav3YAgo > 0 ? (Math.pow(currentNAV / nav3YAgo, 1/3) - 1) * 100 : 0;
  const return5Y = nav5YAgo > 0 ? (Math.pow(currentNAV / nav5YAgo, 1/5) - 1) * 100 : 0;

  return { return1Y, return3Y, return5Y };
}

// Filter equity funds from all funds
export function filterEquityFunds(funds: MutualFundBasic[]): MutualFundBasic[] {
  const equityKeywords = [
    'equity', 'large cap', 'largecap', 'mid cap', 'midcap', 
    'small cap', 'smallcap', 'flexi cap', 'flexicap', 
    'multi cap', 'multicap', 'elss', 'focused', 'value',
    'contra', 'dividend yield', 'sectoral', 'thematic',
    'infrastructure', 'banking', 'pharma', 'technology', 'fmcg'
  ];
  
  const excludeKeywords = ['debt', 'liquid', 'overnight', 'money market', 'gilt', 'fixed', 'bond'];

  return funds.filter(fund => {
    const name = fund.schemeName.toLowerCase();
    const hasEquityKeyword = equityKeywords.some(kw => name.includes(kw));
    const hasExcludeKeyword = excludeKeywords.some(kw => name.includes(kw));
    return hasEquityKeyword && !hasExcludeKeyword;
  });
}

// Determine fund category from name
export function getFundCategory(schemeName: string): string {
  const name = schemeName.toLowerCase();
  
  if (name.includes('large cap') || name.includes('largecap') || name.includes('large-cap')) {
    return 'Large Cap';
  }
  if (name.includes('mid cap') || name.includes('midcap') || name.includes('mid-cap')) {
    return 'Mid Cap';
  }
  if (name.includes('small cap') || name.includes('smallcap') || name.includes('small-cap')) {
    return 'Small Cap';
  }
  if (name.includes('flexi cap') || name.includes('flexicap') || name.includes('flexi-cap')) {
    return 'Flexi Cap';
  }
  if (name.includes('multi cap') || name.includes('multicap') || name.includes('multi-cap')) {
    return 'Multi Cap';
  }
  if (name.includes('elss') || name.includes('tax')) {
    return 'ELSS';
  }
  if (name.includes('focused')) {
    return 'Focused';
  }
  if (name.includes('sectoral') || name.includes('thematic') || 
      name.includes('banking') || name.includes('pharma') || 
      name.includes('technology') || name.includes('infrastructure')) {
    return 'Sectoral/Thematic';
  }
  if (name.includes('value') || name.includes('contra')) {
    return 'Value/Contra';
  }
  
  return 'Equity';
}

// Check if fund is Direct or Regular
export function isPlanType(schemeName: string): { isDirect: boolean; isRegular: boolean } {
  const name = schemeName.toLowerCase();
  const isDirect = name.includes('direct') || name.includes('- direct');
  const isRegular = name.includes('regular') || name.includes('- regular') || (!isDirect && !name.includes('direct'));
  return { isDirect, isRegular: isRegular && !isDirect };
}

// Get fund house from scheme name
export function getFundHouse(schemeName: string): string {
  const fundHouses = [
    'HDFC', 'ICICI Prudential', 'SBI', 'Axis', 'Kotak', 'Nippon India',
    'Aditya Birla Sun Life', 'UTI', 'DSP', 'Tata', 'Franklin Templeton',
    'Mirae Asset', 'Motilal Oswal', 'IDFC', 'L&T', 'Invesco', 'Sundaram',
    'Edelweiss', 'Canara Robeco', 'HSBC', 'BNP Paribas', 'Principal',
    'Quantum', 'PGIM India', 'Parag Parikh', 'Quant', 'ITI', 'Mahindra Manulife'
  ];

  for (const house of fundHouses) {
    if (schemeName.toLowerCase().includes(house.toLowerCase())) {
      return house;
    }
  }
  
  // Extract first few words as fund house
  const words = schemeName.split(' ').slice(0, 2).join(' ');
  return words;
}

// Calculate projected values for Direct vs Regular comparison
export function calculateProjectedValues(
  investmentAmount: number,
  tenureYears: number,
  directExpenseRatio: number,
  regularExpenseRatio: number,
  expectedReturn: number
): {
  directFinalValue: number;
  regularFinalValue: number;
  directTotalReturns: number;
  regularTotalReturns: number;
  savings: number;
} {
  const directReturn = expectedReturn - directExpenseRatio;
  const regularReturn = expectedReturn - regularExpenseRatio;

  const directFinalValue = investmentAmount * Math.pow(1 + directReturn / 100, tenureYears);
  const regularFinalValue = investmentAmount * Math.pow(1 + regularReturn / 100, tenureYears);

  const directTotalReturns = directFinalValue - investmentAmount;
  const regularTotalReturns = regularFinalValue - investmentAmount;
  const savings = directFinalValue - regularFinalValue;

  return {
    directFinalValue,
    regularFinalValue,
    directTotalReturns,
    regularTotalReturns,
    savings
  };
}

// Sample equity funds data for demo
export const sampleEquityFunds: FundWithMetrics[] = [
  {
    schemeCode: 119551,
    schemeName: "HDFC Mid-Cap Opportunities Fund - Direct Plan - Growth",
    fundHouse: "HDFC",
    category: "Mid Cap",
    currentNAV: 165.23,
    return1Y: 32.5,
    return3Y: 25.8,
    return5Y: 22.4,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 120503,
    schemeName: "Axis Bluechip Fund - Direct Plan - Growth",
    fundHouse: "Axis",
    category: "Large Cap",
    currentNAV: 54.87,
    return1Y: 18.2,
    return3Y: 12.4,
    return5Y: 14.8,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 125494,
    schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    fundHouse: "Parag Parikh",
    category: "Flexi Cap",
    currentNAV: 72.45,
    return1Y: 28.7,
    return3Y: 22.1,
    return5Y: 21.5,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 120505,
    schemeName: "Nippon India Small Cap Fund - Direct Plan - Growth",
    fundHouse: "Nippon India",
    category: "Small Cap",
    currentNAV: 142.35,
    return1Y: 45.2,
    return3Y: 38.6,
    return5Y: 29.8,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 118989,
    schemeName: "Mirae Asset Large Cap Fund - Direct Plan - Growth",
    fundHouse: "Mirae Asset",
    category: "Large Cap",
    currentNAV: 98.45,
    return1Y: 22.4,
    return3Y: 14.8,
    return5Y: 16.2,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 120716,
    schemeName: "Kotak Emerging Equity Fund - Direct Plan - Growth",
    fundHouse: "Kotak",
    category: "Mid Cap",
    currentNAV: 88.92,
    return1Y: 35.1,
    return3Y: 28.4,
    return5Y: 24.7,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 125497,
    schemeName: "Quant Small Cap Fund - Direct Plan - Growth",
    fundHouse: "Quant",
    category: "Small Cap",
    currentNAV: 215.67,
    return1Y: 52.8,
    return3Y: 42.3,
    return5Y: 35.6,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 119597,
    schemeName: "SBI Focused Equity Fund - Direct Plan - Growth",
    fundHouse: "SBI",
    category: "Focused",
    currentNAV: 285.42,
    return1Y: 24.6,
    return3Y: 18.2,
    return5Y: 17.9,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 118834,
    schemeName: "ICICI Prudential Technology Fund - Direct Plan - Growth",
    fundHouse: "ICICI Prudential",
    category: "Sectoral/Thematic",
    currentNAV: 178.34,
    return1Y: 38.9,
    return3Y: 15.7,
    return5Y: 24.2,
    isDirect: true,
    isRegular: false
  },
  {
    schemeCode: 120847,
    schemeName: "UTI Nifty 50 Index Fund - Direct Plan - Growth",
    fundHouse: "UTI",
    category: "Large Cap",
    currentNAV: 145.23,
    return1Y: 19.8,
    return3Y: 13.5,
    return5Y: 15.1,
    isDirect: true,
    isRegular: false
  }
];
