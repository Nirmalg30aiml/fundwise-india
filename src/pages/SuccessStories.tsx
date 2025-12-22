import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
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
  User
} from 'lucide-react';

const stories = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 38,
    profession: 'School Teacher',
    avatar: '👩‍🏫',
    goal: 'Retirement Foundation',
    keyMetric: 'Built ₹18.5 lakhs in 15 years',
    investmentSnapshot: '₹3,000 SIP with annual step-up',
    readTime: '5 min',
    heroImage: '🎓',
    pullQuote: 'Starting early beats investing more later. Time is your biggest asset.',
    story: {
      situation: {
        startAge: 23,
        salary: 25000,
        trigger: 'A colleague introduced her to mutual funds when parents suggested FDs'
      },
      strategy: [
        'Started with just ₹3,000/month SIP in diversified equity fund',
        'Increased by ₹500 every year (step-up SIP)',
        'Never stopped, even during 2008 crash and COVID',
        'Switched from Regular to Direct plan in 2013'
      ],
      challenges: [
        { challenge: '2008 crash: Portfolio down 45%', overcome: "Didn't panic, continued SIP" },
        { challenge: 'Friends laughed at "only ₹3,000" investment', overcome: 'Ignored social pressure' },
        { challenge: 'Tempted to use for wedding expenses', overcome: 'Stayed disciplined' }
      ],
      outcome: {
        totalInvested: 720000,
        currentValue: 1850000,
        returns: '157%',
        cagr: '12.8%'
      },
      learnings: [
        'Starting early beats investing more later. Time is your biggest asset.',
        'The 2008 crash taught me that SIPs buy more units when markets fall',
        'Switching to Direct plan saved me ₹2.5 lakhs in fees'
      ]
    },
    interactiveExample: {
      title: 'If Priya started at 30 instead of 23',
      comparison: [
        { label: 'Starting at 23', value: 1850000, years: 15 },
        { label: 'Starting at 30', value: 520000, years: 8 }
      ],
      loss: 1330000,
      message: 'Cost of 7-year delay: ₹13.3 lakhs lost!'
    }
  },
  {
    id: 2,
    name: 'Amit Patel',
    age: 45,
    profession: 'Business Owner',
    avatar: '👨‍💼',
    goal: 'Direct Plan Switch',
    keyMetric: 'Saved ₹8.2 lakhs by switching',
    investmentSnapshot: '₹10 lakhs portfolio, 20 years',
    readTime: '4 min',
    heroImage: '💼',
    pullQuote: '1% sounds small, but compounds to lakhs over decades.',
    story: {
      situation: {
        startAge: 35,
        salary: 100000,
        trigger: 'Had ₹10 lakhs in Regular plan for 10 years through bank advisor. Discovered Direct plans in 2018.'
      },
      strategy: [
        'Researched expense ratio impact',
        'Calculated losses in Regular plan',
        'Switched entire portfolio to Direct plans',
        'Educated himself on fund selection'
      ],
      challenges: [
        { challenge: 'Bank advisor called 50 times, created guilt', overcome: 'Trusted research over sales pitch' },
        { challenge: '"Who will help in bear markets?" fear', overcome: 'Learned basic market cycles' },
        { challenge: 'Family said "let experts handle"', overcome: 'Became the family expert' }
      ],
      outcome: {
        regularReturn: 2840000,
        directReturn: 3090000,
        savedOver20Years: 820000
      },
      learnings: [
        '1% sounds small, but compounds to lakhs over decades',
        "Fund manager doesn't care if you're in Direct or Regular - same portfolio!",
        "I'm not a financial expert, but I can read fund factsheets. That's enough."
      ]
    },
    interactiveExample: {
      title: 'Calculate YOUR Regular plan losses',
      comparison: [
        { label: 'Regular Plan (10 yrs)', value: 2840000 },
        { label: 'Direct Plan (10 yrs)', value: 3090000 }
      ],
      loss: 250000,
      message: 'Switch now to stop bleeding fees!'
    }
  },
  {
    id: 3,
    name: 'Sunita Reddy',
    age: 35,
    profession: 'Doctor',
    avatar: '👩‍⚕️',
    goal: 'Home Down Payment',
    keyMetric: 'On track for ₹30L goal despite COVID crash',
    investmentSnapshot: '₹15,000/month SIP since 2019',
    readTime: '6 min',
    heroImage: '🏠',
    pullQuote: 'Market timing is impossible. Time in market beats timing the market.',
    story: {
      situation: {
        startAge: 30,
        salary: 150000,
        trigger: 'Started SIP for home down payment goal (7 years, ₹30 lakhs)'
      },
      strategy: [
        'Invested in 2 large cap funds',
        'Set auto-debit, forget about it',
        'Goal: ₹30 lakhs in 7 years'
      ],
      challenges: [
        { challenge: 'COVID crash March 2020: Portfolio down 31%', overcome: 'Read about rupee cost averaging' },
        { challenge: 'Husband said: Stop SIP', overcome: 'Understood lower prices = more units' },
        { challenge: 'Friends stopped their SIPs', overcome: 'Continued despite fear' }
      ],
      outcome: {
        invested: 900000,
        currentValue: 2180000,
        onTrack: true,
        expectedFinal: 3000000
      },
      learnings: [
        'Market timing is impossible. Time in market beats timing the market.',
        "SIP's biggest advantage: Forces you to buy when others are fearful",
        'Falls are buying opportunities, not selling moments'
      ]
    },
    interactiveExample: {
      title: 'COVID crash buying opportunity',
      comparison: [
        { label: 'Pre-COVID NAV', value: 58, isNAV: true },
        { label: 'COVID crash NAV', value: 42, isNAV: true }
      ],
      message: 'Those "cheap" units gave 72% returns when market recovered!'
    }
  },
  {
    id: 4,
    name: 'Karthik & Divya',
    age: 32,
    profession: 'Young Couple',
    avatar: '👫',
    goal: 'Dream Home Purchase',
    keyMetric: 'Achieved ₹27.3L - 2 months early!',
    investmentSnapshot: '₹20,000/month with step-up',
    readTime: '5 min',
    heroImage: '🏡',
    pullQuote: 'Every ₹100 we didn\'t waste is now ₹180 in our home.',
    story: {
      situation: {
        startAge: 25,
        trigger: 'Married in 2017, wanted to buy home by 2024. Needed ₹25 lakhs down payment.'
      },
      strategy: [
        'Clear goal: ₹25 lakhs in 7 years',
        'Calculated: Need ₹20,000/month SIP at 12% returns',
        '₹12,000 in Flexi Cap (higher risk) + ₹8,000 in Balanced Advantage',
        'Auto-debit on salary day, yearly increment → increased SIP'
      ],
      challenges: [
        { challenge: 'Treated SIP as non-negotiable expense', overcome: 'Cut dining out, unnecessary shopping' },
        { challenge: 'Temptation for vacation/car', overcome: 'Stayed focused on home goal' }
      ],
      outcome: {
        target: 2500000,
        achieved: 2730000,
        timeline: '2 months early',
        method: 'Step-up SIPs + slightly better returns (13% vs 12%)'
      },
      learnings: [
        'Having a clear goal kept us motivated through market ups and downs',
        'Auto-debit removed the temptation to skip months',
        "Every ₹100 we didn't waste is now ₹180 in our home"
      ]
    }
  },
  {
    id: 5,
    name: 'Rohit Malhotra',
    age: 40,
    profession: 'Manager',
    avatar: '👨‍💻',
    goal: 'Mistake Recovery',
    keyMetric: 'Lost ₹3.2L by chasing returns',
    investmentSnapshot: 'Lesson learned after 5 years',
    readTime: '5 min',
    heroImage: '📉',
    pullQuote: 'Chasing performance is like driving looking at rearview mirror.',
    story: {
      situation: {
        startAge: 35,
        salary: 80000,
        trigger: 'Started investing ₹25,000/month in 2015. Made every mistake possible.'
      },
      mistakes: [
        'Chased last year\'s winners - switched to small caps after 52% return',
        'Switched funds 12 times in 5 years',
        'Exit loads: ₹38,000, Short-term tax: ₹67,000',
        'Invested based on colleague tips'
      ],
      outcome: {
        hisPortfolio: 1820000,
        simpleNifty: 2140000,
        opportunityLost: 320000
      },
      turnaround: [
        'Hired fee-only advisor (₹10,000 consultation)',
        'Created proper asset allocation',
        'Stopped switching, started holding',
        'New approach: 58% returns in 4 years'
      ],
      learnings: [
        'Chasing performance is like driving looking at rearview mirror',
        'Every switch costs you money and time. Hold for long-term.',
        "Index funds would've beaten my 'smart' strategy easily"
      ]
    }
  },
  {
    id: 6,
    name: 'Meera Iyer',
    age: 44,
    profession: 'HR Professional',
    avatar: '👩‍💼',
    goal: "Single Parent's Triumph",
    keyMetric: 'Securing daughter\'s future on one income',
    investmentSnapshot: '₹5,000 to ₹12,000/month journey',
    readTime: '6 min',
    heroImage: '💪',
    pullQuote: 'If a single parent can do it, anyone can.',
    story: {
      situation: {
        startAge: 38,
        salary: 55000,
        expenses: 35000,
        trigger: 'Divorced at 38 with 7-year-old daughter. Sole earning member.'
      },
      strategy: [
        'Started small: ₹5,000/month (all she could afford)',
        '₹3,000 → Daughter\'s education (15 years)',
        '₹1,500 → Retirement (20 years)',
        '₹500 → Emergency fund',
        'Every increment: 30% to SIP increase'
      ],
      progress: {
        educationFund: { current: 420000, target: 1800000, years: 15 },
        retirementFund: { current: 180000, years: 20 },
        emergencyFund: { current: 120000, status: 'Fully built!' },
        currentSIP: 12000
      },
      learnings: [
        "You don't need ₹50,000 to start. Start with what you can.",
        'Small, consistent investments beat large, irregular ones',
        "Emergency fund gave me courage to stay invested during daughter's medical crisis"
      ]
    }
  },
  {
    id: 7,
    name: 'Vikram Desai',
    age: 52,
    profession: 'Retired IT Consultant',
    avatar: '🧘',
    goal: 'Early Retirement at 50',
    keyMetric: 'Built ₹2.1 Cr in 22 years',
    investmentSnapshot: '₹15K-₹30K/month with age-based strategy',
    readTime: '7 min',
    heroImage: '🏖️',
    pullQuote: 'Early retirement isn\'t luck, it\'s disciplined investing over decades.',
    story: {
      situation: {
        startAge: 30,
        retiredAt: 50,
        investmentYears: 22
      },
      strategy: [
        'Age 30-40: Aggressive equity (₹15,000 SIP)',
        'Age 40-45: Balanced (₹25,000 SIP, 60% equity 40% debt)',
        'Age 45-50: Conservative shift (₹30,000 SIP, 40% equity 60% debt)'
      ],
      outcome: {
        totalInvested: 6050000,
        portfolioValue: 21000000,
        returns: '247%',
        cagr: '11.3%',
        passiveIncome: 70000,
        withdrawalRate: '4%'
      },
      blueprint: [
        'Start SIP in 20s (even ₹5,000)',
        'Increase by 10-15% every year',
        'Stay 100% equity till 40',
        'Shift to balanced after 40',
        'Never stop SIP, even after quitting job',
        'Live below means, invest the difference'
      ],
      learnings: [
        "Early retirement isn't luck, it's disciplined investing over decades",
        'The hardest part is starting. The second hardest is not stopping.',
        'Your 20s and 30s SIPs are worth 10x your 40s SIPs due to compounding time'
      ]
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

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);

  if (selectedStory) {
    return (
      <Layout>
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => setSelectedStory(null)} className="mb-6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>

            <div className="max-w-3xl mx-auto">
              {/* Hero */}
              <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-surface">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{selectedStory.heroImage}</div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl">{selectedStory.avatar}</span>
                    <div>
                      <h1 className="text-2xl font-bold">{selectedStory.name}</h1>
                      <p className="text-muted-foreground">{selectedStory.age}, {selectedStory.profession}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Target className="w-4 h-4" />
                    {selectedStory.goal}
                  </div>
                </div>
                
                <blockquote className="text-center">
                  <Quote className="w-8 h-8 mx-auto text-primary/50 mb-3" />
                  <p className="text-xl italic text-foreground">"{selectedStory.pullQuote}"</p>
                </blockquote>
              </div>

              {/* The Situation */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  The Starting Point
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  {selectedStory.story.situation.startAge && (
                    <p>Started at age <span className="font-medium text-foreground">{selectedStory.story.situation.startAge}</span></p>
                  )}
                  {selectedStory.story.situation.salary && (
                    <p>Salary: <span className="font-medium text-foreground">{formatCurrency(selectedStory.story.situation.salary)}/month</span></p>
                  )}
                  <p>{selectedStory.story.situation.trigger}</p>
                </div>
              </div>

              {/* The Strategy */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  The Strategy
                </h2>
                <ul className="space-y-3">
                  {(selectedStory.story.strategy || selectedStory.story.mistakes)?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Challenges */}
              {selectedStory.story.challenges && (
                <div className="glass-card rounded-xl p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning-amber" />
                    Challenges Faced
                  </h2>
                  <div className="space-y-4">
                    {selectedStory.story.challenges.map((item, i) => (
                      <div key={i} className="p-4 bg-accent/50 rounded-lg">
                        <div className="font-medium text-sm mb-1">{item.challenge}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-secondary" />
                          {item.overcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* The Outcome */}
              <div className="glass-card rounded-xl p-6 mb-6 bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  The Results
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {selectedStory.story.outcome.totalInvested && (
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Invested</div>
                      <div className="text-xl font-bold">{formatCurrency(selectedStory.story.outcome.totalInvested)}</div>
                    </div>
                  )}
                  {selectedStory.story.outcome.currentValue && (
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Value</div>
                      <div className="text-xl font-bold text-secondary">{formatCurrency(selectedStory.story.outcome.currentValue)}</div>
                    </div>
                  )}
                  {selectedStory.story.outcome.portfolioValue && (
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Portfolio Value</div>
                      <div className="text-xl font-bold text-secondary">{formatCurrency(selectedStory.story.outcome.portfolioValue)}</div>
                    </div>
                  )}
                  {selectedStory.story.outcome.savedOver20Years && (
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Saved (20 years)</div>
                      <div className="text-xl font-bold text-secondary">{formatCurrency(selectedStory.story.outcome.savedOver20Years)}</div>
                    </div>
                  )}
                  {selectedStory.story.outcome.returns && (
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Returns</div>
                      <div className="text-xl font-bold text-primary">{selectedStory.story.outcome.returns}</div>
                    </div>
                  )}
                  {selectedStory.story.outcome.cagr && (
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">CAGR</div>
                      <div className="text-xl font-bold">{selectedStory.story.outcome.cagr}%</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Learnings */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning-amber" />
                  Key Learnings
                </h2>
                <div className="space-y-3">
                  {selectedStory.story.learnings.map((learning, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-warning-amber/5 rounded-lg border border-warning-amber/20">
                      <CheckCircle2 className="w-5 h-5 text-warning-amber flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{learning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Example */}
              {selectedStory.interactiveExample && (
                <div className="glass-card rounded-xl p-6 bg-destructive/5 border border-destructive/20">
                  <h3 className="font-semibold mb-4">{selectedStory.interactiveExample.title}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {selectedStory.interactiveExample.comparison.map((item, i) => (
                      <div key={i} className="text-center p-4 bg-card rounded-lg">
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        <div className="text-xl font-bold">
                          {item.isNAV ? `₹${item.value}` : formatCurrency(item.value)}
                        </div>
                        {item.years && <div className="text-xs text-muted-foreground">{item.years} years</div>}
                      </div>
                    ))}
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-lg font-bold text-destructive">{selectedStory.interactiveExample.message}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
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

      {/* Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
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

                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-3">
                    <Target className="w-3 h-3" />
                    {story.goal}
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-surface">
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
