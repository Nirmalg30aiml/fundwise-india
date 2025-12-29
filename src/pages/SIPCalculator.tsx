import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  Percent,
  Clock,
  Info,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  BarChart3,
  PieChart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const presetScenarios = [
  { name: 'Conservative Saver', sip: 5000, years: 15, returns: 10, icon: '🛡️' },
  { name: 'Aggressive Investor', sip: 25000, years: 20, returns: 14, icon: '🚀' },
  { name: 'Retirement Planner', sip: 15000, years: 30, returns: 12, icon: '🏖️' },
];

export default function SIPCalculator() {
  const [sipAmount, setSipAmount] = useState(5000);
  const [tenure, setTenure] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [directExpenseRatio, setDirectExpenseRatio] = useState(0.5);
  const [regularExpenseRatio, setRegularExpenseRatio] = useState(1.5);
  const [planType, setPlanType] = useState<'compare' | 'direct' | 'regular'>('compare');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const calculateSIP = (monthlyAmount: number, years: number, annualRate: number, stepUp: boolean, stepUpRate: number) => {
    const months = years * 12;
    let totalInvested = 0;
    let currentValue = 0;
    const monthlyRate = annualRate / 12 / 100;
    let currentSIP = monthlyAmount;

    for (let month = 1; month <= months; month++) {
      if (stepUp && month > 1 && (month - 1) % 12 === 0) {
        currentSIP = currentSIP * (1 + stepUpRate / 100);
      }
      totalInvested += currentSIP;
      currentValue = (currentValue + currentSIP) * (1 + monthlyRate);
    }

    return {
      maturityValue: Math.round(currentValue),
      totalInvested: Math.round(totalInvested),
      returns: Math.round(currentValue - totalInvested)
    };
  };

  const results = useMemo(() => {
    const directRate = expectedReturn - directExpenseRatio;
    const regularRate = expectedReturn - regularExpenseRatio;

    const direct = calculateSIP(sipAmount, tenure, directRate, stepUpEnabled, stepUpPercent);
    const regular = calculateSIP(sipAmount, tenure, regularRate, stepUpEnabled, stepUpPercent);

    return {
      direct,
      regular,
      savings: direct.maturityValue - regular.maturityValue,
      savingsPercent: ((direct.maturityValue - regular.maturityValue) / regular.maturityValue * 100).toFixed(1)
    };
  }, [sipAmount, tenure, expectedReturn, directExpenseRatio, regularExpenseRatio, stepUpEnabled, stepUpPercent]);

  const chartData = useMemo(() => {
    const data = [];
    const directRate = (expectedReturn - directExpenseRatio) / 12 / 100;
    const regularRate = (expectedReturn - regularExpenseRatio) / 12 / 100;

    let directValue = 0;
    let regularValue = 0;
    let currentSIP = sipAmount;

    for (let year = 0; year <= tenure; year++) {
      if (year === 0) {
        data.push({ year: `Year ${year}`, Direct: 0, Regular: 0, Invested: 0 });
        continue;
      }

      for (let month = 1; month <= 12; month++) {
        const monthIndex = (year - 1) * 12 + month;
        if (stepUpEnabled && monthIndex > 1 && (monthIndex - 1) % 12 === 0) {
          currentSIP = currentSIP * (1 + stepUpPercent / 100);
        }
        directValue = (directValue + currentSIP) * (1 + directRate);
        regularValue = (regularValue + currentSIP) * (1 + regularRate);
      }

      data.push({
        year: `Year ${year}`,
        Direct: Math.round(directValue),
        Regular: Math.round(regularValue),
        Invested: Math.round(results.direct.totalInvested * year / tenure),
        Gap: Math.round(directValue - regularValue)
      });
    }

    return data;
  }, [sipAmount, tenure, expectedReturn, directExpenseRatio, regularExpenseRatio, stepUpEnabled, stepUpPercent, results.direct.totalInvested]);

  const yearlyBreakdown = useMemo(() => {
    const breakdown = [];
    const directRate = (expectedReturn - directExpenseRatio) / 12 / 100;
    const regularRate = (expectedReturn - regularExpenseRatio) / 12 / 100;

    let directValue = 0;
    let regularValue = 0;
    let totalInvested = 0;
    let currentSIP = sipAmount;

    for (let year = 1; year <= tenure; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthIndex = (year - 1) * 12 + month;
        if (stepUpEnabled && monthIndex > 1 && (monthIndex - 1) % 12 === 0) {
          currentSIP = currentSIP * (1 + stepUpPercent / 100);
        }
        totalInvested += currentSIP;
        directValue = (directValue + currentSIP) * (1 + directRate);
        regularValue = (regularValue + currentSIP) * (1 + regularRate);
      }

      breakdown.push({
        year,
        invested: Math.round(totalInvested),
        directValue: Math.round(directValue),
        regularValue: Math.round(regularValue),
        gap: Math.round(directValue - regularValue),
        cumulativeSavings: Math.round(directValue - regularValue)
      });
    }

    return breakdown;
  }, [sipAmount, tenure, expectedReturn, directExpenseRatio, regularExpenseRatio, stepUpEnabled, stepUpPercent]);

  const directPieData = [
    { name: 'Invested', value: results.direct.totalInvested, color: 'hsl(var(--muted))' },
    { name: 'Returns', value: results.direct.returns, color: 'hsl(var(--primary))' },
  ];

  const regularPieData = [
    { name: 'Invested', value: results.regular.totalInvested, color: 'hsl(var(--muted))' },
    { name: 'Returns', value: results.regular.returns, color: 'hsl(210 40% 50%)' },
    { name: 'Extra Fees', value: results.savings, color: 'hsl(var(--destructive))' },
  ];

  const barChartData = [
    { name: 'Invested', amount: results.direct.totalInvested, fill: 'hsl(var(--muted))' },
    { name: 'Direct Plan', amount: results.direct.maturityValue, fill: 'hsl(var(--primary))' },
    { name: 'Regular Plan', amount: results.regular.maturityValue, fill: 'hsl(210 40% 50%)' },
  ];

  const applyScenario = (scenario: typeof presetScenarios[0]) => {
    setSipAmount(scenario.sip);
    setTenure(scenario.years);
    setExpectedReturn(scenario.returns);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">SIP Calculator</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              SIP Calculator with <span className="gradient-text">Direct vs Regular</span> Comparison
            </h1>
            <p className="text-muted-foreground">
              Calculate your SIP returns and see how much you can save by choosing Direct plans.
              The difference of 1% can mean lakhs over time!
            </p>
          </div>
        </div>
      </section>

      {/* Preset Scenarios */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm text-muted-foreground">Quick scenarios:</span>
            {presetScenarios.map((scenario) => (
              <Button
                key={scenario.name}
                variant="outline"
                size="sm"
                onClick={() => applyScenario(scenario)}
                className="gap-2"
              >
                <span>{scenario.icon}</span>
                {scenario.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calculator Inputs - 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  SIP Details
                </h2>

                <div className="space-y-6">
                  {/* Monthly SIP Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <IndianRupee className="w-4 h-4" />
                        Monthly SIP Amount
                      </Label>
                      <div className="relative w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                        <Input
                          type="text"
                          value={sipAmount >= 100000 ? `${(sipAmount / 100000).toFixed(2)}L` : sipAmount.toLocaleString('en-IN')}
                          onChange={(e) => {
                            let val = e.target.value.replace(/[^\d.]/g, '');
                            if (e.target.value.toLowerCase().includes('l')) {
                              val = String(parseFloat(val) * 100000 || 100000);
                            }
                            const numVal = Math.min(200000, Math.max(1000, parseInt(val) || 1000));
                            setSipAmount(numVal);
                          }}
                          className="pl-7 pr-2 h-8 text-right font-semibold text-primary"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[sipAmount]}
                      onValueChange={(v) => setSipAmount(v[0])}
                      min={1000}
                      max={200000}
                      step={500}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹1,000</span>
                      <span>₹2L</span>
                    </div>
                  </div>

                  {/* Investment Period */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        Investment Period
                      </Label>
                      <div className="relative w-24">
                        <Input
                          type="number"
                          value={tenure}
                          onChange={(e) => {
                            const val = Math.min(40, Math.max(1, parseInt(e.target.value) || 1));
                            setTenure(val);
                          }}
                          className="pr-12 h-8 text-right font-semibold text-primary"
                          min={1}
                          max={40}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[tenure]}
                      onValueChange={(v) => setTenure(v[0])}
                      min={1}
                      max={40}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 Year</span>
                      <span>40 Years</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        Expected Annual Return
                      </Label>
                      <div className="relative w-20">
                        <Input
                          type="number"
                          value={expectedReturn}
                          onChange={(e) => {
                            const val = Math.min(40, Math.max(5, parseFloat(e.target.value) || 5));
                            setExpectedReturn(val);
                          }}
                          className="pr-6 h-8 text-right font-semibold text-primary"
                          min={5}
                          max={40}
                          step={0.5}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={(v) => setExpectedReturn(v[0])}
                      min={5}
                      max={40}
                      step={0.5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>40%</span>
                    </div>
                  </div>

                  {/* Step-up SIP */}
                  <div className="p-4 bg-accent/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2 text-sm cursor-pointer">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        Enable Step-up SIP
                      </Label>
                      <Switch
                        checked={stepUpEnabled}
                        onCheckedChange={setStepUpEnabled}
                      />
                    </div>
                    {stepUpEnabled && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">Annual increase</span>
                          <div className="relative w-16">
                            <Input
                              type="number"
                              value={stepUpPercent}
                              onChange={(e) => {
                                const val = Math.min(50, Math.max(0, parseInt(e.target.value) || 0));
                                setStepUpPercent(val);
                              }}
                              className="pr-5 h-7 text-right text-sm font-medium"
                              min={0}
                              max={50}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                          </div>
                        </div>
                        <Slider
                          value={[stepUpPercent]}
                          onValueChange={(v) => setStepUpPercent(v[0])}
                          min={0}
                          max={50}
                          step={1}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expense Ratio Inputs */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  Expense Ratios
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-xs mb-2 block text-muted-foreground">Direct Plan</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={directExpenseRatio}
                        onChange={(e) => setDirectExpenseRatio(parseFloat(e.target.value) || 0)}
                        step="0.1"
                        min="0.1"
                        max="1.5"
                        className="pr-8"
                      />
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs mb-2 block text-muted-foreground">Regular Plan</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={regularExpenseRatio}
                        onChange={(e) => setRegularExpenseRatio(parseFloat(e.target.value) || 0)}
                        step="0.1"
                        min="0.5"
                        max="2.5"
                        className="pr-8"
                      />
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-info-cyan/10 rounded-lg border border-info-cyan/20">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-info-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Regular plans charge 0.5-1% more due to distributor commission. Same fund, same manager - just higher fees!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results - 3 cols */}
            <div className="lg:col-span-3 space-y-6">
              {/* Plan Type Toggle */}
              <Tabs value={planType} onValueChange={(v) => setPlanType(v as typeof planType)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="compare">Compare Both</TabsTrigger>
                  <TabsTrigger value="direct">Direct Only</TabsTrigger>
                  <TabsTrigger value="regular">Regular Only</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Comparison Cards */}
              {(planType === 'compare' || planType === 'direct') && (
                <div className={planType === 'compare' ? 'grid md:grid-cols-2 gap-4' : ''}>
                  <div className="glass-card rounded-xl p-5 border-2 border-primary/50 relative">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Recommended
                    </div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 mt-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Direct Plan
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Invested</span>
                        <span className="font-medium">{formatCurrency(results.direct.totalInvested)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expected Returns</span>
                        <span className="font-medium text-primary">{formatCurrency(results.direct.returns)}</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Maturity Value</span>
                          <span className="text-xl font-bold text-primary">{formatCurrency(results.direct.maturityValue)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Expense Ratio: {directExpenseRatio}%
                      </div>
                    </div>
                  </div>

                  {planType === 'compare' && (
                    <div className="glass-card rounded-xl p-5 relative opacity-80">
                      <div className="absolute -top-3 left-4 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Higher Fees
                      </div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 mt-2">
                        <BarChart3 className="w-5 h-5" />
                        Regular Plan
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Invested</span>
                          <span className="font-medium">{formatCurrency(results.regular.totalInvested)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Expected Returns</span>
                          <span className="font-medium">{formatCurrency(results.regular.returns)}</span>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between">
                            <span className="font-medium">Maturity Value</span>
                            <span className="text-xl font-bold">{formatCurrency(results.regular.maturityValue)}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Expense Ratio: {regularExpenseRatio}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {planType === 'regular' && (
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Regular Plan Results
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Invested</span>
                      <span className="font-medium">{formatCurrency(results.regular.totalInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Returns</span>
                      <span className="font-medium">{formatCurrency(results.regular.returns)}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Maturity Value</span>
                        <span className="text-2xl font-bold">{formatCurrency(results.regular.maturityValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Savings Highlight */}
              {planType === 'compare' && (
                <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/30">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <div className="text-sm text-muted-foreground mb-2">You Save with Direct Plan</div>
                    <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                      {formatCurrency(results.savings)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      That's <span className="text-secondary font-semibold">{results.savingsPercent}%</span> more wealth!
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
                      By avoiding distributor commission of ~{(regularExpenseRatio - directExpenseRatio).toFixed(1)}%, 
                      you earn {formatCurrency(results.savings)} more over {tenure} years
                    </p>
                  </div>
                </div>
              )}

              {/* Charts */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Wealth Growth Over Time
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        formatter={(value: number, name: string) => [formatCurrency(value), name]}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="Direct" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Regular" stroke="hsl(210 40% 50%)" fill="hsl(210 40% 50% / 0.1)" strokeWidth={2} strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Charts Side by Side */}
              {planType === 'compare' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-card rounded-xl p-5">
                    <h4 className="font-medium mb-4 text-center text-sm">Direct Plan Breakdown</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={directPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {directPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h4 className="font-medium mb-4 text-center text-sm">Regular Plan Breakdown</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={regularPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {regularPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* Year-by-Year Breakdown */}
              <div className="glass-card rounded-2xl p-6">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Year-by-Year Breakdown
                  </span>
                  {showBreakdown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {showBreakdown && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-medium">Year</th>
                          <th className="text-right py-2 font-medium">Invested</th>
                          <th className="text-right py-2 font-medium text-primary">Direct Value</th>
                          <th className="text-right py-2 font-medium">Regular Value</th>
                          <th className="text-right py-2 font-medium text-secondary">Savings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="border-b border-border/50">
                            <td className="py-2">{row.year}</td>
                            <td className="text-right py-2">{formatCurrency(row.invested)}</td>
                            <td className="text-right py-2 text-primary font-medium">{formatCurrency(row.directValue)}</td>
                            <td className="text-right py-2">{formatCurrency(row.regularValue)}</td>
                            <td className="text-right py-2 text-secondary font-medium">{formatCurrency(row.cumulativeSavings)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Example */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Real Example: The ₹10 Lakh Difference</h2>
              <p className="text-muted-foreground">See how 1% expense ratio difference adds up over 20 years</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">Monthly SIP</div>
                <div className="text-2xl font-bold text-primary">₹10,000</div>
                <div className="text-xs text-muted-foreground mt-1">for 20 years @ 12% p.a.</div>
              </div>
              <div className="glass-card rounded-xl p-6 text-center border-2 border-primary">
                <div className="text-sm text-muted-foreground mb-2">Direct Plan (0.5% expense)</div>
                <div className="text-2xl font-bold text-primary">₹99.91 L</div>
                <div className="flex items-center justify-center gap-1 text-xs text-secondary mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Recommended
                </div>
              </div>
              <div className="glass-card rounded-xl p-6 text-center opacity-80">
                <div className="text-sm text-muted-foreground mb-2">Regular Plan (1.5% expense)</div>
                <div className="text-2xl font-bold">₹89.73 L</div>
                <div className="text-xs text-destructive mt-1">Loses ₹10.18 L to fees!</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-destructive/10 border border-destructive/30 rounded-xl text-center">
              <div className="text-4xl mb-2">⚠️</div>
              <div className="text-2xl font-bold text-destructive mb-2">You lose ₹10,18,205 in Regular Plan!</div>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                That's a 1% difference in expense ratio costing you over ₹10 lakhs! 
                This is why experts recommend Direct Plans for DIY investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Callouts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-3">Why Direct Plans Save You More</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  No distributor commission (0.5-1% saved annually)
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  Same fund manager, same portfolio
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  Same investment strategy
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  Only difference: Lower fees = Higher returns
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-warning-amber/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-warning-amber" />
              </div>
              <h3 className="font-semibold mb-3">When to Choose Regular Plans</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-warning-amber mt-0.5 flex-shrink-0" />
                  Need hand-holding and advice
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-warning-amber mt-0.5 flex-shrink-0" />
                  Don't have time to research
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-warning-amber mt-0.5 flex-shrink-0" />
                  Want professional guidance
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-warning-amber mt-0.5 flex-shrink-0" />
                  But know the cost: ~1% of your wealth annually
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-3">How Much is 1%?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                It sounds small, but watch it compound!
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>On ₹10 lakhs</span>
                  <span className="font-semibold text-destructive">₹10,000/year</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>On ₹50 lakhs</span>
                  <span className="font-semibold text-destructive">₹50,000/year</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>On ₹1 Crore</span>
                  <span className="font-semibold text-destructive">₹1,00,000/year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
