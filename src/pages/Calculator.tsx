import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Calculator as CalcIcon, 
  TrendingUp, 
  IndianRupee,
  Percent,
  Clock,
  Info
} from 'lucide-react';
import { calculateProjectedValues } from '@/lib/mfapi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Calculator() {
  const [investment, setInvestment] = useState(100000);
  const [tenure, setTenure] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [directExpenseRatio, setDirectExpenseRatio] = useState(0.5);
  const [regularExpenseRatio, setRegularExpenseRatio] = useState(1.5);

  const results = useMemo(() => {
    return calculateProjectedValues(
      investment,
      tenure,
      directExpenseRatio,
      regularExpenseRatio,
      expectedReturn
    );
  }, [investment, tenure, directExpenseRatio, regularExpenseRatio, expectedReturn]);

  const chartData = useMemo(() => {
    const data = [];
    for (let year = 0; year <= tenure; year++) {
      const directValue = investment * Math.pow(1 + (expectedReturn - directExpenseRatio) / 100, year);
      const regularValue = investment * Math.pow(1 + (expectedReturn - regularExpenseRatio) / 100, year);
      data.push({
        year: `Year ${year}`,
        Direct: Math.round(directValue),
        Regular: Math.round(regularValue),
      });
    }
    return data;
  }, [investment, tenure, expectedReturn, directExpenseRatio, regularExpenseRatio]);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <CalcIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free Calculator</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Direct vs Regular Plan <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-muted-foreground">
              See how much you can save by choosing Direct plans over Regular plans. 
              Direct plans have no distributor commission, saving you 0.5-1% annually.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CalcIcon className="w-5 h-5 text-primary" />
                Investment Details
              </h2>

              <div className="space-y-6">
                {/* Investment Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4" />
                      Investment Amount
                    </Label>
                    <span className="font-semibold rupee">{formatCurrency(investment)}</span>
                  </div>
                  <Slider
                    value={[investment]}
                    onValueChange={(v) => setInvestment(v[0])}
                    min={10000}
                    max={10000000}
                    step={10000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹10K</span>
                    <span>₹1 Cr</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Investment Period
                    </Label>
                    <span className="font-semibold">{tenure} Years</span>
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(v) => setTenure(v[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Expected Annual Return
                    </Label>
                    <span className="font-semibold">{expectedReturn}%</span>
                  </div>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={(v) => setExpectedReturn(v[0])}
                    min={5}
                    max={25}
                    step={0.5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span>25%</span>
                  </div>
                </div>

                {/* Expense Ratios */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Direct Expense Ratio</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={directExpenseRatio}
                        onChange={(e) => setDirectExpenseRatio(parseFloat(e.target.value) || 0)}
                        step="0.1"
                        min="0"
                        max="3"
                        className="pr-8"
                      />
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Regular Expense Ratio</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={regularExpenseRatio}
                        onChange={(e) => setRegularExpenseRatio(parseFloat(e.target.value) || 0)}
                        step="0.1"
                        min="0"
                        max="3"
                        className="pr-8"
                      />
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-info-cyan/10 rounded-xl border border-info-cyan/20">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-info-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Direct plans typically have 0.5-1% lower expense ratio than Regular plans 
                      because they don't include distributor commission.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-5 border-l-4 border-l-primary">
                  <div className="text-sm text-muted-foreground mb-1">Direct Plan Value</div>
                  <div className="text-2xl font-bold text-primary rupee">
                    {formatCurrency(results.directFinalValue)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Returns: {formatCurrency(results.directTotalReturns)}
                  </div>
                </div>
                <div className="glass-card rounded-xl p-5 border-l-4 border-l-muted-foreground">
                  <div className="text-sm text-muted-foreground mb-1">Regular Plan Value</div>
                  <div className="text-2xl font-bold rupee">
                    {formatCurrency(results.regularFinalValue)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Returns: {formatCurrency(results.regularTotalReturns)}
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="glass-card rounded-2xl p-6 bg-gradient-primary text-primary-foreground">
                <div className="text-center">
                  <div className="text-sm opacity-80 mb-2">Your Potential Savings with Direct Plan</div>
                  <div className="text-4xl font-bold rupee mb-2">
                    {formatCurrency(results.savings)}
                  </div>
                  <div className="text-sm opacity-80">
                    That's {((results.savings / investment) * 100).toFixed(1)}% of your investment!
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Growth Comparison</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fontSize: 12 }} 
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        tickFormatter={(v) => formatCurrency(v)} 
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Direct" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Regular" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
