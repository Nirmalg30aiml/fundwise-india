import { useState, useMemo } from 'react';
import { PhoneAuthGuard } from '@/components/auth/PhoneAuthGuard';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Target,
  GraduationCap,
  Palmtree,
  Home,
  Plane,
  Heart,
  Shield,
  Settings,
  IndianRupee,
  Clock,
  TrendingUp,
  Calculator,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Edit2,
  Plus,
  Lightbulb
} from 'lucide-react';

const goalTypes = [
  { id: 'education', name: "Child's Education", icon: GraduationCap, emoji: '🎓', defaultAmount: 2500000, defaultYears: 13 },
  { id: 'retirement', name: 'Retirement Planning', icon: Palmtree, emoji: '🏖️', defaultAmount: 20000000, defaultYears: 30 },
  { id: 'home', name: 'Buy a Home', icon: Home, emoji: '🏠', defaultAmount: 2000000, defaultYears: 7 },
  { id: 'vacation', name: 'Dream Vacation', icon: Plane, emoji: '✈️', defaultAmount: 500000, defaultYears: 3 },
  { id: 'wedding', name: 'Wedding', icon: Heart, emoji: '💍', defaultAmount: 1500000, defaultYears: 5 },
  { id: 'emergency', name: 'Emergency Fund', icon: Shield, emoji: '🆘', defaultAmount: 300000, defaultYears: 2 },
  { id: 'custom', name: 'Custom Goal', icon: Settings, emoji: '⚙️', defaultAmount: 1000000, defaultYears: 5 },
];

const riskProfiles = [
  { value: 'conservative', label: 'Conservative', returnRate: 8, description: 'Lower risk, stable returns' },
  { value: 'moderate', label: 'Moderate', returnRate: 12, description: 'Balanced risk-return' },
  { value: 'aggressive', label: 'Aggressive', returnRate: 15, description: 'Higher risk, higher potential' },
];

interface Goal {
  id: string;
  type: string;
  name: string;
  targetAmount: number;
  timeHorizon: number;
  currentSavings: number;
  riskProfile: string;
  expectedReturn: number;
  inflationAdjusted: boolean;
  inflationRate: number;
}

function GoalPlannerContent() {
  const [step, setStep] = useState<'select' | 'details' | 'results'>('select');
  const [selectedGoalType, setSelectedGoalType] = useState<typeof goalTypes[0] | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [currentGoal, setCurrentGoal] = useState<Partial<Goal>>({
    targetAmount: 1000000,
    timeHorizon: 10,
    currentSavings: 0,
    riskProfile: 'moderate',
    expectedReturn: 12,
    inflationAdjusted: false,
    inflationRate: 6,
  });
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const calculateSIPRequired = (target: number, years: number, rate: number, currentSavings: number) => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    
    // Future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + rate / 100, years);
    const remainingTarget = Math.max(0, target - fvCurrentSavings);
    
    // SIP required for remaining amount
    // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    // P = M / ({[1 + i]^n – 1} / i × (1 + i))
    if (remainingTarget <= 0) return 0;
    
    const factor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.ceil(remainingTarget / factor);
  };

  const adjustedTarget = useMemo(() => {
    if (!currentGoal.inflationAdjusted) return currentGoal.targetAmount || 0;
    const inflatedAmount = (currentGoal.targetAmount || 0) * Math.pow(1 + (currentGoal.inflationRate || 6) / 100, currentGoal.timeHorizon || 10);
    return Math.round(inflatedAmount);
  }, [currentGoal.targetAmount, currentGoal.inflationAdjusted, currentGoal.inflationRate, currentGoal.timeHorizon]);

  const sipRequired = useMemo(() => {
    return calculateSIPRequired(
      adjustedTarget,
      currentGoal.timeHorizon || 10,
      currentGoal.expectedReturn || 12,
      currentGoal.currentSavings || 0
    );
  }, [adjustedTarget, currentGoal.timeHorizon, currentGoal.expectedReturn, currentGoal.currentSavings]);

  const totalInvestment = sipRequired * (currentGoal.timeHorizon || 10) * 12 + (currentGoal.currentSavings || 0);

  const expectedCorpus = useMemo(() => {
    const months = (currentGoal.timeHorizon || 10) * 12;
    const monthlyRate = (currentGoal.expectedReturn || 12) / 12 / 100;
    
    // FV of current savings
    const fvSavings = (currentGoal.currentSavings || 0) * Math.pow(1 + (currentGoal.expectedReturn || 12) / 100, currentGoal.timeHorizon || 10);
    
    // FV of SIP
    const fvSIP = sipRequired * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return Math.round(fvSavings + fvSIP);
  }, [sipRequired, currentGoal.timeHorizon, currentGoal.expectedReturn, currentGoal.currentSavings]);

  const handleGoalTypeSelect = (goalType: typeof goalTypes[0]) => {
    setSelectedGoalType(goalType);
    setCurrentGoal({
      ...currentGoal,
      type: goalType.id,
      name: goalType.name,
      targetAmount: goalType.defaultAmount,
      timeHorizon: goalType.defaultYears,
    });
    setStep('details');
  };

  const handleRiskProfileChange = (value: string) => {
    const profile = riskProfiles.find(p => p.value === value);
    setCurrentGoal({
      ...currentGoal,
      riskProfile: value,
      expectedReturn: profile?.returnRate || 12,
    });
  };

  const handleSaveGoal = () => {
    const newGoal: Goal = {
      id: editingGoalId || Date.now().toString(),
      type: currentGoal.type || 'custom',
      name: currentGoal.name || 'My Goal',
      targetAmount: adjustedTarget,
      timeHorizon: currentGoal.timeHorizon || 10,
      currentSavings: currentGoal.currentSavings || 0,
      riskProfile: currentGoal.riskProfile || 'moderate',
      expectedReturn: currentGoal.expectedReturn || 12,
      inflationAdjusted: currentGoal.inflationAdjusted || false,
      inflationRate: currentGoal.inflationRate || 6,
    };

    if (editingGoalId) {
      setGoals(goals.map(g => g.id === editingGoalId ? newGoal : g));
      setEditingGoalId(null);
    } else {
      setGoals([...goals, newGoal]);
    }
    
    setStep('results');
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setCurrentGoal({
      ...goal,
      targetAmount: goal.targetAmount,
    });
    setSelectedGoalType(goalTypes.find(g => g.id === goal.type) || goalTypes[6]);
    setStep('details');
  };

  const handleAddAnother = () => {
    setCurrentGoal({
      targetAmount: 1000000,
      timeHorizon: 10,
      currentSavings: 0,
      riskProfile: 'moderate',
      expectedReturn: 12,
      inflationAdjusted: false,
      inflationRate: 6,
    });
    setSelectedGoalType(null);
    setEditingGoalId(null);
    setStep('select');
  };

  const totalMonthlySIP = goals.reduce((sum, goal) => {
    return sum + calculateSIPRequired(goal.targetAmount, goal.timeHorizon, goal.expectedReturn, goal.currentSavings);
  }, 0);

  const getGoalIcon = (typeId: string) => {
    const type = goalTypes.find(g => g.id === typeId);
    return type?.emoji || '🎯';
  };

  const getRecommendedFunds = (years: number) => {
    if (years < 3) {
      return {
        category: 'Short-term (< 3 years)',
        recommendation: 'Lower-risk options',
        funds: ['Liquid Funds', 'Ultra Short-term Funds', 'Money Market Funds'],
        reason: 'Capital preservation is priority for near-term goals'
      };
    } else if (years <= 5) {
      return {
        category: 'Medium-term (3-5 years)',
        recommendation: 'Balanced approach',
        funds: ['Hybrid Funds', 'Balanced Advantage Funds', 'Conservative Hybrid'],
        reason: 'Mix of stability and growth for medium-term goals'
      };
    } else {
      return {
        category: 'Long-term (> 5 years)',
        recommendation: 'Equity-focused',
        funds: ['Large Cap Funds', 'Flexi Cap Funds', 'Index Funds', 'Multi Cap Funds'],
        reason: 'Time to ride out market volatility for long-term growth'
      };
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Goal Planner</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Your <span className="gradient-text">Financial Goals</span>
            </h1>
            <p className="text-muted-foreground">
              Set clear financial goals and calculate the monthly SIP needed to achieve them.
              Get personalized fund recommendations based on your timeline.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Step 1: Select Goal Type */}
          {step === 'select' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-center">What are you saving for?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {goalTypes.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalTypeSelect(goal)}
                    className="glass-card rounded-xl p-6 text-center hover:border-primary/50 hover:bg-accent/50 transition-all group"
                  >
                    <div className="text-4xl mb-3">{goal.emoji}</div>
                    <div className="font-medium text-sm group-hover:text-primary transition-colors">{goal.name}</div>
                  </button>
                ))}
              </div>

              {/* Existing Goals */}
              {goals.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">Your Goals ({goals.length})</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map((goal) => {
                      const sip = calculateSIPRequired(goal.targetAmount, goal.timeHorizon, goal.expectedReturn, goal.currentSavings);
                      return (
                        <div key={goal.id} className="glass-card rounded-xl p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{getGoalIcon(goal.type)}</span>
                              <div>
                                <div className="font-medium">{goal.name}</div>
                                <div className="text-xs text-muted-foreground">{goal.timeHorizon} years</div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditGoal(goal)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteGoal(goal.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Target</span>
                              <span className="font-medium">{formatCurrency(goal.targetAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monthly SIP</span>
                              <span className="font-medium text-primary">{formatCurrency(sip)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <div className="mt-6 glass-card rounded-xl p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Goals</div>
                        <div className="text-2xl font-bold">{goals.length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Monthly SIP</div>
                        <div className="text-2xl font-bold text-primary">{formatCurrency(totalMonthlySIP)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Target</div>
                        <div className="text-2xl font-bold">{formatCurrency(goals.reduce((sum, g) => sum + g.targetAmount, 0))}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Goal Details */}
          {step === 'details' && selectedGoalType && (
            <div className="max-w-3xl mx-auto">
              <Button variant="ghost" onClick={() => setStep('select')} className="mb-6">
                ← Back to goals
              </Button>

              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl">{selectedGoalType.emoji}</div>
                  <div>
                    <h2 className="text-xl font-semibold">{editingGoalId ? 'Edit Goal' : 'Set Your Goal'}</h2>
                    <p className="text-sm text-muted-foreground">{selectedGoalType.name}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Goal Name */}
                  <div>
                    <Label className="mb-2 block">Goal Name</Label>
                    <Input
                      value={currentGoal.name || ''}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, name: e.target.value })}
                      placeholder="e.g., Daughter's College Fund"
                    />
                  </div>

                  {/* Target Amount */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Target Amount {currentGoal.inflationAdjusted && <span className="text-xs text-muted-foreground">(in today's value)</span>}
                      </Label>
                      <span className="font-semibold text-primary">{formatCurrency(currentGoal.targetAmount || 0)}</span>
                    </div>
                    <Slider
                      value={[currentGoal.targetAmount || 1000000]}
                      onValueChange={(v) => setCurrentGoal({ ...currentGoal, targetAmount: v[0] })}
                      min={50000}
                      max={100000000}
                      step={50000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹50K</span>
                      <span>₹10 Cr</span>
                    </div>
                  </div>

                  {/* Inflation Adjustment */}
                  <div className="p-4 bg-accent/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <TrendingUp className="w-4 h-4 text-warning-amber" />
                        Adjust for Inflation
                      </Label>
                      <Switch
                        checked={currentGoal.inflationAdjusted}
                        onCheckedChange={(checked) => setCurrentGoal({ ...currentGoal, inflationAdjusted: checked })}
                      />
                    </div>
                    {currentGoal.inflationAdjusted && (
                      <>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Inflation Rate</span>
                          <span className="text-sm font-medium">{currentGoal.inflationRate}%</span>
                        </div>
                        <Slider
                          value={[currentGoal.inflationRate || 6]}
                          onValueChange={(v) => setCurrentGoal({ ...currentGoal, inflationRate: v[0] })}
                          min={4}
                          max={8}
                          step={0.5}
                        />
                        <p className="text-xs text-muted-foreground mt-3">
                          <span className="font-medium">{formatCurrency(currentGoal.targetAmount || 0)}</span> today =
                          <span className="font-medium text-warning-amber"> {formatCurrency(adjustedTarget)}</span> in {currentGoal.timeHorizon} years
                        </p>
                      </>
                    )}
                  </div>

                  {/* Time Horizon */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time Horizon
                      </Label>
                      <span className="font-semibold text-primary">{currentGoal.timeHorizon} Years</span>
                    </div>
                    <Slider
                      value={[currentGoal.timeHorizon || 10]}
                      onValueChange={(v) => setCurrentGoal({ ...currentGoal, timeHorizon: v[0] })}
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

                  {/* Current Savings */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Current Savings (if any)
                      </Label>
                      <span className="font-semibold">{formatCurrency(currentGoal.currentSavings || 0)}</span>
                    </div>
                    <Slider
                      value={[currentGoal.currentSavings || 0]}
                      onValueChange={(v) => setCurrentGoal({ ...currentGoal, currentSavings: v[0] })}
                      min={0}
                      max={Math.min(currentGoal.targetAmount || 1000000, 10000000)}
                      step={10000}
                    />
                  </div>

                  {/* Risk Tolerance */}
                  <div>
                    <Label className="mb-3 block">Risk Tolerance</Label>
                    <RadioGroup
                      value={currentGoal.riskProfile}
                      onValueChange={handleRiskProfileChange}
                      className="grid grid-cols-3 gap-3"
                    >
                      {riskProfiles.map((profile) => (
                        <div key={profile.value}>
                          <RadioGroupItem
                            value={profile.value}
                            id={profile.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={profile.value}
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="font-medium text-sm">{profile.label}</span>
                            <span className="text-xs text-muted-foreground">{profile.returnRate}% returns</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Results Preview */}
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                    <div className="text-center mb-4">
                      <div className="text-sm text-muted-foreground mb-1">Monthly SIP Required</div>
                      <div className="text-4xl font-bold text-primary">{formatCurrency(sipRequired)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-muted-foreground">Total Investment</div>
                        <div className="font-semibold">{formatCurrency(totalInvestment)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground">Expected Corpus</div>
                        <div className="font-semibold text-secondary">{formatCurrency(expectedCorpus)}</div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveGoal} className="w-full" size="lg">
                    {editingGoalId ? 'Update Goal' : 'Save Goal & See Recommendations'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Results & Recommendations */}
          {step === 'results' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold">Your Financial Plan</h2>
                <Button onClick={handleAddAnother} variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Another Goal
                </Button>
              </div>

              {/* Goals Summary */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {goals.map((goal) => {
                  const sip = calculateSIPRequired(goal.targetAmount, goal.timeHorizon, goal.expectedReturn, goal.currentSavings);
                  const urgencyColor = goal.timeHorizon < 3 ? 'border-l-destructive' : goal.timeHorizon <= 7 ? 'border-l-warning-amber' : 'border-l-secondary';
                  return (
                    <div key={goal.id} className={`glass-card rounded-xl p-5 border-l-4 ${urgencyColor}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{getGoalIcon(goal.type)}</span>
                        <div>
                          <div className="font-medium">{goal.name}</div>
                          <div className="text-xs text-muted-foreground">{goal.timeHorizon} years</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target</span>
                          <span className="font-medium">{formatCurrency(goal.targetAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly SIP</span>
                          <span className="font-bold text-primary text-lg">{formatCurrency(sip)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Summary */}
              <div className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Goals</div>
                    <div className="text-3xl font-bold">{goals.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Monthly SIP</div>
                    <div className="text-3xl font-bold text-primary">{formatCurrency(totalMonthlySIP)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Target Corpus</div>
                    <div className="text-3xl font-bold">{formatCurrency(goals.reduce((sum, g) => sum + g.targetAmount, 0))}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Nearest Goal</div>
                    <div className="text-3xl font-bold text-warning-amber">{Math.min(...goals.map(g => g.timeHorizon))} yrs</div>
                  </div>
                </div>
              </div>

              {/* Fund Recommendations */}
              <h3 className="text-lg font-semibold mb-4">Recommended Fund Categories</h3>
              <div className="space-y-4">
                {goals.map((goal) => {
                  const recommendation = getRecommendedFunds(goal.timeHorizon);
                  return (
                    <div key={goal.id} className="glass-card rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl">{getGoalIcon(goal.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{goal.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent">{recommendation.category}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{recommendation.reason}</p>
                          <div className="flex flex-wrap gap-2">
                            {recommendation.funds.map((fund) => (
                              <span key={fund} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                                {fund}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* What-if Analysis */}
              <div className="mt-8 glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-warning-amber" />
                  <h3 className="font-semibold">What-If Scenarios</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Invest ₹2,000 more/month</div>
                    <div className="text-xs text-muted-foreground">
                      Reach your goals <span className="text-secondary font-medium">6-12 months faster</span>
                    </div>
                  </div>
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">If returns are 2% lower</div>
                    <div className="text-xs text-muted-foreground">
                      Need <span className="text-warning-amber font-medium">~15% more</span> monthly investment
                    </div>
                  </div>
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Start 2 years later</div>
                    <div className="text-xs text-muted-foreground">
                      SIP increases by <span className="text-destructive font-medium">~25%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => setStep('select')} variant="outline" className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  Manage Goals
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default function GoalPlanner() {
  return (
    <PhoneAuthGuard>
      <GoalPlannerContent />
    </PhoneAuthGuard>
  );
}
