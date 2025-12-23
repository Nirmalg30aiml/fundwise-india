import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  ArrowRight, 
  ChevronLeft,
  Quote,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  User,
  Share2,
  Home,
  GraduationCap,
  Briefcase,
  Heart,
  XCircle,
  BarChart3,
  Users,
  Calendar,
  IndianRupee,
  Percent,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Story categories for filtering
const goalCategories = [
  { id: 'all', label: 'All Stories', icon: BarChart3 },
  { id: 'retirement', label: 'Retirement', icon: Heart },
  { id: 'home', label: 'Home Purchase', icon: Home },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'wealth', label: 'Wealth Building', icon: TrendingUp },
  { id: 'mistake', label: 'Lessons Learned', icon: Lightbulb },
];

const ageGroups = [
  { id: 'all', label: 'All Ages' },
  { id: '20s', label: '20s Starters' },
  { id: '30s', label: '30s Warriors' },
  { id: '40s', label: '40s Catch-uppers' },
];

const sipRanges = [
  { id: 'all', label: 'All SIP Amounts' },
  { id: 'small', label: '< ₹5K' },
  { id: 'medium', label: '₹5K - ₹20K' },
  { id: 'large', label: '> ₹20K' },
];

const stories = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 38,
    startAge: 23,
    profession: 'School Teacher',
    avatar: '👩‍🏫',
    goal: 'Retirement Foundation',
    goalCategory: 'retirement',
    ageGroup: '20s',
    sipRange: 'small',
    keyMetric: 'Built ₹18.5 lakhs in 15 years',
    investmentSnapshot: '₹3,000 SIP with annual step-up',
    readTime: '5 min',
    heroImage: '🎓',
    pullQuote: 'Starting early beats investing more later. Time is your biggest asset.',
    story: {
      situation: {
        startAge: 23,
        salary: 25000,
        financialSituation: 'Fresh out of college, living with parents, minimal expenses',
        trigger: 'A colleague introduced her to mutual funds when parents suggested FDs',
        fears: 'Worried about losing money in stock market, didn\'t understand NAV'
      },
      strategy: [
        'Started with just ₹3,000/month SIP in diversified equity fund',
        'Increased by ₹500 every year (step-up SIP)',
        'Never stopped, even during 2008 crash and COVID',
        'Switched from Regular to Direct plan in 2013'
      ],
      fundsSelected: ['HDFC Top 100 Fund (Direct)', 'ICICI Prudential Bluechip Fund (Direct)'],
      challenges: [
        { challenge: '2008 crash: Portfolio down 45%', overcome: "Didn't panic, continued SIP", lesson: 'Market crashes are temporary' },
        { challenge: 'Friends laughed at "only ₹3,000" investment', overcome: 'Ignored social pressure', lesson: 'Small amounts compound big' },
        { challenge: 'Tempted to use money for wedding expenses', overcome: 'Stayed disciplined', lesson: 'Separate goal-based investing' },
        { challenge: 'Market noise and "hot tips" from relatives', overcome: 'Trusted her research', lesson: 'Stick to your strategy' }
      ],
      outcome: {
        totalInvested: 720000,
        currentValue: 1850000,
        returns: '157%',
        cagr: '12.8%',
        goalAchieved: 'Retirement corpus foundation - achieved!',
        howUsed: 'Continuing to grow for retirement at 55'
      },
      learnings: [
        'Starting early beats investing more later. Time is your biggest asset.',
        'The 2008 crash taught me that SIPs buy more units when markets fall',
        'Switching to Direct plan saved me ₹2.5 lakhs in fees'
      ],
      advice: 'Start today, even with ₹500. The best time to invest was yesterday. The second best is today.',
      wouldDoDifferently: 'Would have switched to Direct plans earlier - lost 5 years of extra fees'
    },
    interactiveCalculator: {
      title: 'Calculate YOUR Early Start Advantage',
      type: 'delay-cost',
      defaultSIP: 3000,
      defaultYears: 15,
      defaultReturn: 12
    }
  },
  {
    id: 2,
    name: 'Amit Patel',
    age: 45,
    startAge: 35,
    profession: 'Business Owner',
    avatar: '👨‍💼',
    goal: 'Direct Plan Switch',
    goalCategory: 'wealth',
    ageGroup: '30s',
    sipRange: 'large',
    keyMetric: 'Saved ₹8.2 lakhs by switching',
    investmentSnapshot: '₹10 lakhs portfolio, 20 years',
    readTime: '4 min',
    heroImage: '💼',
    pullQuote: '1% sounds small, but compounds to lakhs over decades.',
    story: {
      situation: {
        startAge: 35,
        salary: 100000,
        financialSituation: 'Had ₹10 lakhs accumulated in Regular plan through bank advisor',
        trigger: 'Stumbled upon articles about Direct plans in 2018',
        fears: 'Worried about managing investments without advisor'
      },
      strategy: [
        'Did research on expense ratio impact',
        'Calculated his losses in Regular plan',
        'Switched entire portfolio to Direct plans',
        'Educated himself on fund selection through Varsity, Value Research'
      ],
      fundsSelected: ['Parag Parikh Flexi Cap (Direct)', 'UTI Nifty 50 Index (Direct)'],
      challenges: [
        { challenge: 'Bank advisor called 50 times, created guilt', overcome: 'Trusted research over sales pitch', lesson: 'Advisors have commission incentive' },
        { challenge: '"Who will help in bear markets?" fear', overcome: 'Learned basic market cycles', lesson: 'Market knowledge isn\'t rocket science' },
        { challenge: 'Family said "let experts handle"', overcome: 'Became the family expert', lesson: 'DIY investing is possible' }
      ],
      outcome: {
        regularReturn: 2840000,
        directReturn: 3090000,
        savedOver20Years: 820000,
        returns: '247%',
        cagr: '11.5%',
        goalAchieved: 'Saved ₹8.2 lakhs in unnecessary fees',
        howUsed: 'Used savings to start child\'s education fund'
      },
      learnings: [
        '1% sounds small, but compounds to lakhs over decades',
        "Fund manager doesn't care if you're in Direct or Regular - same portfolio!",
        "I'm not a financial expert, but I can read fund factsheets. That's enough."
      ],
      advice: 'Check your Regular plan fees today. Every day you delay is money lost.',
      wouldDoDifferently: 'Would have switched the day I learned about Direct plans, not after 6 months of deliberation'
    },
    interactiveCalculator: {
      title: 'Calculate YOUR Regular Plan Losses',
      type: 'expense-ratio',
      defaultPortfolio: 1000000,
      defaultYears: 10,
      defaultExpenseGap: 1
    }
  },
  {
    id: 3,
    name: 'Sunita Reddy',
    age: 35,
    startAge: 30,
    profession: 'Doctor',
    avatar: '👩‍⚕️',
    goal: 'Home Down Payment',
    goalCategory: 'home',
    ageGroup: '30s',
    sipRange: 'medium',
    keyMetric: 'On track for ₹30L goal despite COVID crash',
    investmentSnapshot: '₹15,000/month SIP since 2019',
    readTime: '6 min',
    heroImage: '🏠',
    pullQuote: 'Market timing is impossible. Time in market beats timing the market.',
    story: {
      situation: {
        startAge: 30,
        salary: 150000,
        financialSituation: 'Dual income, wanted to buy home in 7 years',
        trigger: 'Started SIP for home down payment goal (7 years, ₹30 lakhs)',
        fears: 'What if market crashes just before we need the money?'
      },
      strategy: [
        'Invested in 2 large cap funds for stability',
        'Set auto-debit on salary day, forget about it',
        'Goal: ₹30 lakhs in 7 years',
        'Plan to shift to debt funds 1 year before goal'
      ],
      fundsSelected: ['Axis Bluechip Fund (Direct)', 'Mirae Asset Large Cap (Direct)'],
      challenges: [
        { challenge: 'COVID crash March 2020: Portfolio down 31%', overcome: 'Read about rupee cost averaging', lesson: 'Crashes are buying opportunities' },
        { challenge: 'Husband said: Stop SIP, market will crash more', overcome: 'Understood lower prices = more units', lesson: 'Don\'t let emotions drive decisions' },
        { challenge: 'Friends stopped their SIPs in panic', overcome: 'Continued despite fear', lesson: 'Most investors quit at the worst time' }
      ],
      outcome: {
        invested: 900000,
        currentValue: 2180000,
        onTrack: true,
        expectedFinal: 3000000,
        returns: '142%',
        cagr: '18.2%',
        goalAchieved: 'On track to exceed ₹30 lakh goal!',
        howUsed: 'Will use for 2BHK down payment in Hyderabad'
      },
      learnings: [
        'Market timing is impossible. Time in market beats timing the market.',
        "SIP's biggest advantage: Forces you to buy when others are fearful",
        'Falls are buying opportunities, not selling moments'
      ],
      advice: 'Set auto-debit and delete your brokerage app. The less you check, the better.',
      wouldDoDifferently: 'Would have invested more during COVID crash if I had emergency fund ready'
    },
    interactiveCalculator: {
      title: 'COVID Crash: What If You Stopped SIP?',
      type: 'crash-recovery',
      defaultSIP: 15000,
      defaultCrashMonth: 3,
      defaultRecoveryMonths: 18
    },
    timeline: {
      title: 'Portfolio Value Journey Through COVID',
      data: [
        { month: 'Jan 20', value: 180000, event: null },
        { month: 'Feb 20', value: 195000, event: null },
        { month: 'Mar 20', value: 145000, event: 'COVID Crash' },
        { month: 'Apr 20', value: 155000, event: null },
        { month: 'May 20', value: 175000, event: null },
        { month: 'Jun 20', value: 200000, event: null },
        { month: 'Dec 20', value: 380000, event: null },
        { month: 'Jun 21', value: 520000, event: null },
        { month: 'Dec 21', value: 620000, event: 'Full Recovery + 45%' },
        { month: 'Jun 24', value: 1850000, event: null },
        { month: 'Dec 24', value: 2180000, event: 'Current' }
      ]
    }
  },
  {
    id: 4,
    name: 'Karthik & Divya',
    age: 32,
    startAge: 25,
    profession: 'Young Couple (IT Professionals)',
    avatar: '👫',
    goal: 'Dream Home Purchase',
    goalCategory: 'home',
    ageGroup: '20s',
    sipRange: 'medium',
    keyMetric: 'Achieved ₹27.3L - 2 months early!',
    investmentSnapshot: '₹20,000/month with step-up',
    readTime: '5 min',
    heroImage: '🏡',
    pullQuote: 'Every ₹100 we didn\'t waste on unnecessary things is now ₹180 in our home.',
    story: {
      situation: {
        startAge: 25,
        salary: 120000,
        financialSituation: 'Married in 2017, combined income ₹1.2 lakhs, wanted home by 2024',
        trigger: 'Needed ₹25 lakhs down payment (30% of ₹83 lakh home)',
        fears: 'What if we can\'t maintain SIP discipline for 7 years?'
      },
      strategy: [
        'Clear goal: ₹25 lakhs in 7 years',
        'Calculated: Need ₹20,000/month SIP at 12% returns',
        '₹12,000 in Flexi Cap (higher risk, longer time)',
        '₹8,000 in Balanced Advantage (moderate risk)',
        'Auto-debit on salary day - no chance to skip',
        'Every yearly increment → ₹2,000 SIP increase'
      ],
      fundsSelected: ['Parag Parikh Flexi Cap (Direct)', 'ICICI Balanced Advantage (Direct)'],
      challenges: [
        { challenge: 'Treating SIP as non-negotiable expense', overcome: 'Cut dining out, unnecessary shopping', lesson: 'SIP first, expenses later' },
        { challenge: 'Temptation for vacation and car', overcome: 'Stayed focused on home goal', lesson: 'One big goal at a time' },
        { challenge: '2020 crash scared us', overcome: 'Remembered our 7-year horizon', lesson: 'Time heals all crashes' }
      ],
      outcome: {
        target: 2500000,
        achieved: 2730000,
        timeline: '2 months early!',
        returns: '36.5%',
        cagr: '13.2%',
        goalAchieved: 'Bought dream 2BHK in Bangalore',
        howUsed: 'Down payment for ₹83 lakh apartment, loan for rest'
      },
      learnings: [
        'Having a clear goal kept us motivated through market ups and downs',
        'Auto-debit removed the temptation to skip months',
        "Every ₹100 we didn't waste is now ₹180 in our home"
      ],
      advice: 'Set up auto-debit and forget about it. Review only once a year.',
      wouldDoDifferently: 'Would have started step-up SIP from day 1, not year 3'
    },
    interactiveCalculator: {
      title: 'Plan YOUR Home Down Payment',
      type: 'goal-planning',
      defaultGoal: 2500000,
      defaultYears: 7,
      defaultReturn: 12
    }
  },
  {
    id: 5,
    name: 'Rohit Malhotra',
    age: 40,
    startAge: 35,
    profession: 'IT Manager',
    avatar: '👨‍💻',
    goal: 'Mistake Recovery',
    goalCategory: 'mistake',
    ageGroup: '30s',
    sipRange: 'large',
    keyMetric: 'Lost ₹3.2L by chasing returns',
    investmentSnapshot: 'Lesson learned after 5 years of mistakes',
    readTime: '5 min',
    heroImage: '📉',
    pullQuote: 'Chasing performance is like driving looking at the rearview mirror.',
    story: {
      situation: {
        startAge: 35,
        salary: 80000,
        financialSituation: 'Good income, no financial knowledge, got tips from colleagues',
        trigger: 'Started investing ₹25,000/month in 2015 after bonus',
        fears: 'FOMO - fear of missing out on hot funds'
      },
      mistakes: [
        { mistake: 'Chased last year\'s winners', detail: '2015: Small cap gave 52%, switched entire portfolio to small caps. 2016: Small caps fell 18%, panic-switched to large caps. 2017: Missed small cap recovery' },
        { mistake: 'Frequent switching', detail: 'Switched funds 12 times in 5 years. Exit loads cost: ₹38,000. Tax on short-term gains: ₹67,000. Lost compounding time' },
        { mistake: 'No strategy', detail: 'No goal, no asset allocation. Invested based on tips. Reacted to every news headline' }
      ],
      challenges: [
        { challenge: 'Chased last year\'s winners', overcome: 'Learned about mean reversion', lesson: 'Past performance ≠ Future returns' },
        { challenge: 'Panic selling in dips', overcome: 'Understood market cycles', lesson: 'Dips are normal, not emergencies' },
        { challenge: 'No investment thesis', overcome: 'Created proper asset allocation', lesson: 'Strategy beats tactics' }
      ],
      outcome: {
        hisPortfolio: 1820000,
        simpleNifty: 2140000,
        opportunityLost: 320000,
        returns: '21%',
        niftyReturns: '43%',
        goalAchieved: 'Learned expensive lesson',
        howUsed: 'Now follows disciplined approach'
      },
      turnaround: [
        'Hired fee-only advisor (₹10,000 consultation)',
        'Created proper asset allocation: 60% equity, 30% debt, 10% gold',
        'Stopped switching, started holding',
        'Set 10-year horizon with clear goals',
        'New approach (2020-2024): 58% returns in 4 years!'
      ],
      learnings: [
        'Chasing performance is like driving looking at rearview mirror',
        'Every switch costs you money and time. Hold for long-term.',
        "Index funds would've beaten my 'smart' strategy easily"
      ],
      advice: 'If you can\'t resist checking daily, buy index funds and delete the app.',
      wouldDoDifferently: 'Would have started with index funds and never looked at sector funds'
    },
    interactiveCalculator: {
      title: 'Calculate Your Switching Costs',
      type: 'switching-cost',
      defaultSwitches: 5,
      defaultAvgInvestment: 200000,
      defaultExitLoad: 1
    }
  },
  {
    id: 6,
    name: 'Meera Iyer',
    age: 44,
    startAge: 38,
    profession: 'HR Professional',
    avatar: '👩‍💼',
    goal: "Single Parent's Triumph",
    goalCategory: 'education',
    ageGroup: '30s',
    sipRange: 'small',
    keyMetric: 'Securing daughter\'s future on single income',
    investmentSnapshot: '₹5,000 to ₹12,000/month growth',
    readTime: '6 min',
    heroImage: '💪',
    pullQuote: 'If a single parent can do it, anyone can. Start where you are, with what you have.',
    story: {
      situation: {
        startAge: 38,
        salary: 55000,
        financialSituation: 'Divorced at 38 with 7-year-old daughter. Sole earning member. Expenses: ₹35,000/month',
        trigger: 'Daughter\'s future education weighing on mind',
        fears: 'What if I lose my job? What if medical emergency wipes savings?'
      },
      strategy: [
        'Started small: ₹5,000/month (all she could afford)',
        'Three separate SIPs for three goals:',
        '₹3,000 → Daughter\'s education (15 years) in equity',
        '₹1,500 → Retirement (20 years) in equity',
        '₹500 → Emergency fund (2 years) in liquid fund',
        'Every increment: 30% goes to SIP increase'
      ],
      fundsSelected: ['Axis Bluechip (Education)', 'PPFAS Flexi Cap (Retirement)', 'HDFC Liquid Fund (Emergency)'],
      challenges: [
        { challenge: 'First month was terrifying - ₹5,000 felt like a lot', overcome: 'Started anyway, adjusted other expenses', lesson: 'Start before you\'re ready' },
        { challenge: 'Year 2: Job promotion tempted lifestyle inflation', overcome: 'Increased SIP to ₹8,000 instead', lesson: 'Invest raises, not spend them' },
        { challenge: 'Year 4: Medical emergency for daughter', overcome: 'Emergency fund saved the day, didn\'t touch investments', lesson: 'Emergency fund = Peace of mind' }
      ],
      outcome: {
        educationFund: 420000,
        retirementFund: 180000,
        emergencyFund: 120000,
        currentSIP: 12000,
        goalAchieved: 'On track for ₹18 lakh education goal',
        howUsed: 'Daughter is 13, college fund looking secure'
      },
      progress: {
        educationFund: { current: 420000, target: 1800000, years: 9 },
        retirementFund: { current: 180000, target: 5000000, years: 14 },
        emergencyFund: { current: 120000, target: 120000, status: 'Fully built!' }
      },
      learnings: [
        "You don't need ₹50,000 to start. Start with what you can.",
        'Small, consistent investments beat large, irregular ones',
        "Emergency fund gave me courage to stay invested during daughter's medical crisis"
      ],
      advice: 'Your children\'s future is worth more than that weekend brunch. Start today.',
      wouldDoDifferently: 'Would have started at 30, not 38. But better late than never!'
    },
    interactiveCalculator: {
      title: 'Build Your Goal-Based Portfolio',
      type: 'multi-goal',
      goals: [
        { name: 'Education', defaultAmount: 1800000, defaultYears: 15 },
        { name: 'Retirement', defaultAmount: 5000000, defaultYears: 20 },
        { name: 'Emergency', defaultAmount: 300000, defaultYears: 2 }
      ]
    }
  },
  {
    id: 7,
    name: 'Vikram Desai',
    age: 52,
    startAge: 30,
    profession: 'Retired IT Consultant',
    avatar: '🧘',
    goal: 'Early Retirement at 50',
    goalCategory: 'retirement',
    ageGroup: '30s',
    sipRange: 'medium',
    keyMetric: 'Built ₹2.1 Crores in 22 years',
    investmentSnapshot: '₹15K→₹30K/month with age-based strategy',
    readTime: '7 min',
    heroImage: '🏖️',
    pullQuote: 'Early retirement isn\'t luck, it\'s disciplined investing over decades.',
    story: {
      situation: {
        startAge: 30,
        salary: 50000,
        financialSituation: 'Started career at 28, wanted to retire by 50. FIRE before FIRE was cool.',
        trigger: 'Read "Rich Dad Poor Dad" and had an epiphany about passive income',
        fears: 'What if 22 years isn\'t enough? What if I need to work forever?'
      },
      strategy: [
        'Age 30-40: Aggressive equity (₹15,000 SIP, 100% equity)',
        'Age 40-45: Balanced (₹25,000 SIP, 60% equity 40% debt)',
        'Age 45-50: Conservative shift (₹30,000 SIP, 40% equity 60% debt)',
        'Systematic asset allocation change every 5 years',
        'Reinvested all dividends',
        'Never touched the corpus, not even for home down payment'
      ],
      fundsSelected: [
        'Franklin India Prima Plus (now PGIM India Flexi Cap)',
        'HDFC Top 100',
        'ICICI Pru Value Discovery',
        'HDFC Balanced Advantage'
      ],
      challenges: [
        { challenge: '2008 crash: Portfolio dropped 52%', overcome: 'Had 15+ years horizon, doubled SIP', lesson: 'Crashes are sales for long-term investors' },
        { challenge: 'Colleagues bought fancy cars, felt left out', overcome: 'Remembered the goal', lesson: 'Delayed gratification pays exponentially' },
        { challenge: '2020 COVID crash at age 48', overcome: 'Had already shifted to 40% equity', lesson: 'De-risk as you approach goal' }
      ],
      outcome: {
        totalInvested: 6050000,
        portfolioValue: 21000000,
        returns: '247%',
        cagr: '11.3%',
        passiveIncome: 70000,
        withdrawalRate: '4%',
        goalAchieved: 'Retired at 50 with ₹70K/month passive income',
        howUsed: 'Travels 4 months/year, corpus still growing'
      },
      blueprint: [
        'Start SIP in 20s (even ₹5,000)',
        'Increase by 10-15% every year',
        'Stay 100% equity till 40',
        'Shift to balanced after 40',
        'Never stop SIP, even after quitting job',
        'Live below means, invest the difference',
        'Avoid lifestyle inflation'
      ],
      learnings: [
        "Early retirement isn't luck, it's disciplined investing over decades",
        'The hardest part is starting. The second hardest is not stopping.',
        'Your 20s and 30s SIPs are worth 10x your 40s SIPs due to compounding time'
      ],
      advice: 'The best investment is the one you don\'t touch for 20 years. Start now.',
      wouldDoDifferently: 'Would have started at 25 instead of 30. Those 5 years cost me ~₹50 lakhs.'
    },
    interactiveCalculator: {
      title: 'Plan Your Early Retirement',
      type: 'retirement',
      defaultAge: 30,
      defaultRetireAge: 50,
      defaultSIP: 15000,
      defaultReturn: 12
    }
  }
];

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

// Interactive Calculator Component
function InteractiveCalculator({ story }: { story: typeof stories[0] }) {
  const [sipAmount, setSipAmount] = useState(story.interactiveCalculator?.defaultSIP || 5000);
  const [years, setYears] = useState(story.interactiveCalculator?.defaultYears || 10);
  const [delayYears, setDelayYears] = useState(7);
  const [returnRate] = useState(story.interactiveCalculator?.defaultReturn || 12);

  const calculateSIP = (sip: number, yrs: number, rate: number) => {
    const months = yrs * 12;
    const monthlyRate = rate / 12 / 100;
    return sip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  };

  if (story.interactiveCalculator?.type === 'delay-cost') {
    const onTimeValue = calculateSIP(sipAmount, years, returnRate);
    const delayedValue = calculateSIP(sipAmount, years - delayYears, returnRate);
    const costOfDelay = onTimeValue - delayedValue;
    const totalInvested = sipAmount * years * 12;
    const delayedInvested = sipAmount * (years - delayYears) * 12;

    return (
      <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          {story.interactiveCalculator.title}
        </h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <Label>Monthly SIP</Label>
              <span className="font-medium">{formatCurrency(sipAmount)}</span>
            </div>
            <Slider
              value={[sipAmount]}
              onValueChange={(v) => setSipAmount(v[0])}
              min={1000}
              max={50000}
              step={1000}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <Label>Total Investment Period</Label>
              <span className="font-medium">{years} years</span>
            </div>
            <Slider
              value={[years]}
              onValueChange={(v) => setYears(v[0])}
              min={5}
              max={30}
              step={1}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <Label>If you delay by...</Label>
              <span className="font-medium text-destructive">{delayYears} years</span>
            </div>
            <Slider
              value={[delayYears]}
              onValueChange={(v) => setDelayYears(v[0])}
              min={1}
              max={years - 1}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-secondary/10 rounded-lg text-center border border-secondary/30">
            <div className="text-xs text-muted-foreground mb-1">Start Now ({years} yrs)</div>
            <div className="text-lg font-bold text-secondary">{formatCurrency(Math.round(onTimeValue))}</div>
            <div className="text-xs text-muted-foreground">Invested: {formatCurrency(totalInvested)}</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-xs text-muted-foreground mb-1">Delay {delayYears} yrs ({years - delayYears} yrs)</div>
            <div className="text-lg font-bold">{formatCurrency(Math.round(delayedValue))}</div>
            <div className="text-xs text-muted-foreground">Invested: {formatCurrency(delayedInvested)}</div>
          </div>
        </div>

        <div className="p-4 bg-destructive/10 rounded-lg text-center border border-destructive/30">
          <div className="text-sm text-muted-foreground mb-1">Cost of {delayYears}-Year Delay</div>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(Math.round(costOfDelay))}</div>
          <div className="text-xs text-muted-foreground mt-1">That's money you'll never get back!</div>
        </div>
      </div>
    );
  }

  // Default simple calculator
  const totalValue = calculateSIP(sipAmount, years, returnRate);
  const totalInvested = sipAmount * years * 12;

  return (
    <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        Calculate Your Potential
      </h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <Label>Monthly SIP</Label>
            <span className="font-medium">{formatCurrency(sipAmount)}</span>
          </div>
          <Slider
            value={[sipAmount]}
            onValueChange={(v) => setSipAmount(v[0])}
            min={1000}
            max={50000}
            step={1000}
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <Label>Investment Period</Label>
            <span className="font-medium">{years} years</span>
          </div>
          <Slider
            value={[years]}
            onValueChange={(v) => setYears(v[0])}
            min={1}
            max={30}
            step={1}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg text-center">
          <div className="text-xs text-muted-foreground mb-1">Total Invested</div>
          <div className="text-lg font-bold">{formatCurrency(totalInvested)}</div>
        </div>
        <div className="p-4 bg-secondary/10 rounded-lg text-center border border-secondary/30">
          <div className="text-xs text-muted-foreground mb-1">Expected Value</div>
          <div className="text-lg font-bold text-secondary">{formatCurrency(Math.round(totalValue))}</div>
        </div>
      </div>
    </div>
  );
}

// Story Detail Component
function StoryDetail({ story, onBack }: { story: typeof stories[0]; onBack: () => void }) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-surface">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{story.heroImage}</div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">{story.avatar}</span>
                <div>
                  <h1 className="text-2xl font-bold">{story.name}</h1>
                  <p className="text-muted-foreground">{story.age}, {story.profession}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Target className="w-4 h-4" />
                {story.goal}
              </div>
            </div>
            
            <blockquote className="text-center mb-6">
              <Quote className="w-8 h-8 mx-auto text-primary/50 mb-3" />
              <p className="text-xl italic text-foreground">"{story.pullQuote}"</p>
            </blockquote>

            {/* Share buttons */}
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Story
              </Button>
            </div>
          </div>

          {/* The Starting Point */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              The Starting Point
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Age When Started</div>
                <div className="text-lg font-semibold">{story.story.situation.startAge} years old</div>
              </div>
              {story.story.situation.salary && (
                <div className="p-4 bg-accent/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Monthly Salary</div>
                  <div className="text-lg font-semibold">{formatCurrency(story.story.situation.salary)}</div>
                </div>
              )}
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p><span className="font-medium text-foreground">Situation:</span> {story.story.situation.financialSituation}</p>
              <p><span className="font-medium text-foreground">Trigger:</span> {story.story.situation.trigger}</p>
              {story.story.situation.fears && (
                <p><span className="font-medium text-foreground">Initial Fears:</span> {story.story.situation.fears}</p>
              )}
            </div>
          </div>

          {/* The Strategy */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              The Strategy
            </h2>
            <ul className="space-y-3 mb-4">
              {(story.story.strategy || story.story.mistakes?.map(m => m.mistake))?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            {story.story.fundsSelected && (
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-2">Funds Selected</div>
                <div className="flex flex-wrap gap-2">
                  {story.story.fundsSelected.map((fund, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {fund}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* The Challenges */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning-amber" />
              Challenges Faced
            </h2>
            <div className="space-y-4">
              {story.story.challenges?.map((item, i) => (
                <div key={i} className="p-4 bg-accent/50 rounded-lg">
                  <div className="font-medium text-sm mb-2 text-destructive">{item.challenge}</div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                    <ArrowRight className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{item.overcome}</span>
                  </div>
                  {item.lesson && (
                    <div className="flex items-start gap-2 text-xs text-primary">
                      <Lightbulb className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>Lesson: {item.lesson}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mistakes (for Rohit's story) */}
          {story.story.mistakes && (
            <div className="glass-card rounded-xl p-6 mb-6 bg-destructive/5 border border-destructive/20">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                The Mistakes
              </h2>
              <div className="space-y-4">
                {story.story.mistakes.map((item, i) => (
                  <div key={i} className="p-4 bg-card/80 rounded-lg">
                    <div className="font-medium text-sm mb-2 text-destructive">{item.mistake}</div>
                    <div className="text-sm text-muted-foreground">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Turnaround (for Rohit's story) */}
          {story.story.turnaround && (
            <div className="glass-card rounded-xl p-6 mb-6 bg-secondary/5 border border-secondary/20">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                The Turnaround
              </h2>
              <ul className="space-y-3">
                {story.story.turnaround.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline Chart */}
          {story.timeline && (
            <div className="glass-card rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                {story.timeline.title}
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={story.timeline.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), 'Value']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* The Results */}
          <div className="glass-card rounded-xl p-6 mb-6 bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              The Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {story.story.outcome.totalInvested && (
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground">Total Invested</div>
                  <div className="text-lg font-bold">{formatCurrency(story.story.outcome.totalInvested)}</div>
                </div>
              )}
              {story.story.outcome.currentValue && (
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground">Current Value</div>
                  <div className="text-lg font-bold text-secondary">{formatCurrency(story.story.outcome.currentValue)}</div>
                </div>
              )}
              {story.story.outcome.portfolioValue && (
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground">Portfolio Value</div>
                  <div className="text-lg font-bold text-secondary">{formatCurrency(story.story.outcome.portfolioValue)}</div>
                </div>
              )}
              {story.story.outcome.returns && (
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground">Total Returns</div>
                  <div className="text-lg font-bold text-primary">{story.story.outcome.returns}</div>
                </div>
              )}
              {story.story.outcome.cagr && (
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground">CAGR</div>
                  <div className="text-lg font-bold">{story.story.outcome.cagr}%</div>
                </div>
              )}
              {story.story.outcome.passiveIncome && (
                <div className="text-center p-4 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground">Monthly Passive Income</div>
                  <div className="text-lg font-bold text-secondary">{formatCurrency(story.story.outcome.passiveIncome)}</div>
                </div>
              )}
            </div>
            {story.story.outcome.goalAchieved && (
              <div className="p-4 bg-secondary/20 rounded-lg text-center">
                <div className="text-sm font-medium text-secondary">{story.story.outcome.goalAchieved}</div>
                {story.story.outcome.howUsed && (
                  <div className="text-xs text-muted-foreground mt-1">{story.story.outcome.howUsed}</div>
                )}
              </div>
            )}
          </div>

          {/* Progress (for Meera's story) */}
          {story.story.progress && (
            <div className="glass-card rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Goal Progress
              </h2>
              <div className="space-y-4">
                {Object.entries(story.story.progress).map(([key, goal]: [string, any]) => (
                  <div key={key} className="p-4 bg-accent/50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      {goal.status ? (
                        <span className="text-secondary text-sm">{goal.status}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{goal.years} years to go</span>
                      )}
                    </div>
                    {goal.target && (
                      <>
                        <div className="w-full bg-muted rounded-full h-2 mb-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formatCurrency(goal.current)}</span>
                          <span>{formatCurrency(goal.target)}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blueprint (for Vikram's story) */}
          {story.story.blueprint && (
            <div className="glass-card rounded-xl p-6 mb-6 bg-primary/5 border border-primary/20">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                The Blueprint: How to Retire Early
              </h2>
              <ol className="space-y-3">
                {story.story.blueprint.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Key Learnings */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning-amber" />
              Key Learnings
            </h2>
            <div className="space-y-3 mb-4">
              {story.story.learnings.map((learning, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-warning-amber/5 rounded-lg border border-warning-amber/20">
                  <CheckCircle2 className="w-5 h-5 text-warning-amber flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{learning}</span>
                </div>
              ))}
            </div>
            {story.story.advice && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Advice for Beginners</div>
                <p className="text-sm font-medium">{story.story.advice}</p>
              </div>
            )}
            {story.story.wouldDoDifferently && (
              <div className="p-4 bg-muted/50 rounded-lg mt-3">
                <div className="text-xs text-muted-foreground mb-1">What They'd Do Differently</div>
                <p className="text-sm">{story.story.wouldDoDifferently}</p>
              </div>
            )}
          </div>

          {/* Interactive Calculator */}
          <InteractiveCalculator story={story} />

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Inspired by {story.name.split(' ')[0]}'s story?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/sip-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Your SIP
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/goal-planner">
                  <Target className="w-4 h-4 mr-2" />
                  Plan Your Goal
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [goalFilter, setGoalFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [sipFilter, setSipFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      if (goalFilter !== 'all' && story.goalCategory !== goalFilter) return false;
      if (ageFilter !== 'all' && story.ageGroup !== ageFilter) return false;
      if (sipFilter !== 'all' && story.sipRange !== sipFilter) return false;
      return true;
    });
  }, [goalFilter, ageFilter, sipFilter]);

  if (selectedStory) {
    return (
      <Layout>
        <StoryDetail story={selectedStory} onBack={() => setSelectedStory(null)} />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Real Stories</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Real People, Real Results <span className="gradient-text">📈</span>
            </h1>
            <p className="text-muted-foreground">
              Learn from investors who achieved their financial goals. These stories show 
              that consistent investing, patience, and discipline can transform your financial future.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Goal Category Tabs */}
            <div className="flex-1 overflow-x-auto pb-2 md:pb-0">
              <div className="flex gap-2">
                {goalCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={goalFilter === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGoalFilter(cat.id)}
                    className="whitespace-nowrap gap-1.5"
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* More Filters Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 md:ml-auto"
            >
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Age Group</Label>
                <div className="flex gap-2">
                  {ageGroups.map((age) => (
                    <Button
                      key={age.id}
                      variant={ageFilter === age.id ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setAgeFilter(age.id)}
                      className="text-xs"
                    >
                      {age.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">SIP Amount</Label>
                <div className="flex gap-2">
                  {sipRanges.map((sip) => (
                    <Button
                      key={sip.id}
                      variant={sipFilter === sip.id ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setSipFilter(sip.id)}
                      className="text-xs"
                    >
                      {sip.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">No stories match your filters</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
              <Button variant="outline" onClick={() => { setGoalFilter('all'); setAgeFilter('all'); setSipFilter('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <div 
                  key={story.id} 
                  className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{story.avatar}</div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.age}, {story.profession}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                        <Target className="w-3 h-3" />
                        {story.goal}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                        <Calendar className="w-3 h-3" />
                        Started at {story.startAge}
                      </span>
                    </div>

                    <div className="text-xl font-bold mb-2 text-primary">{story.keyMetric}</div>
                    <p className="text-sm text-muted-foreground mb-4">{story.investmentSnapshot}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {story.readTime} read
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
                        Read Story <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-1">7</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-secondary mb-1">₹3.5 Cr+</div>
                <div className="text-sm text-muted-foreground">Wealth Created</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-1">22 yrs</div>
                <div className="text-sm text-muted-foreground">Longest Journey</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-secondary mb-1">₹3K</div>
                <div className="text-sm text-muted-foreground">Smallest SIP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-6">
              Every success story started with a single SIP. Calculate how much you need to invest to achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/sip-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Try SIP Calculator
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/goal-planner">
                  <Target className="w-4 h-4 mr-2" />
                  Plan Your Goals
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
