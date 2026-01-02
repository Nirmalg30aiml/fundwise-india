import { useState, useMemo } from 'react';
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

// Quick return presets for Expected Annual Return
const returnPresets = [
  { value: 8, label: '8%', description: 'Conservative' },
  { value: 12, label: '12%', description: 'Moderate' },
  { value: 15, label: '15%', description: 'Aggressive' },
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
  stepUpEnabled: boolean;
  stepUpPercent: number;
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
    stepUpEnabled: false,
    stepUpPercent: 10,
  });
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatInputValue = (value: number) => {
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    }
    return value.toLocaleString('en-IN');
  };

  const parseInputValue = (value: string): number => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    if (value.toLowerCase().includes('l')) {
      return parseFloat(cleanValue) * 100000 || 0;
    }
    return parseFloat(cleanValue) || 0;
  };

  const calculateSIPRequired = (target: number, years: number, rate: number, currentSavings: number, stepUpEnabled: boolean = false, stepUpPercent: number = 10) => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    
    // Future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + rate / 100, years);
    const remainingTarget = Math.max(0, target - fvCurrentSavings);
    
    if (remainingTarget <= 0) return 0;
    
    if (!stepUpEnabled) {
      // Simple SIP calculation
      const factor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      return Math.ceil(remainingTarget / factor);
    }
    
    // Step-up SIP: Binary search for initial SIP amount
    let low = 100;
    let high = remainingTarget / 12;
    let bestSIP = high;
    
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let currentSIP = mid;
      let fv = 0;
      
      for (let month = 1; month <= months; month++) {
        if (month > 1 && (month - 1) % 12 === 0) {
          currentSIP = currentSIP * (1 + stepUpPercent / 100);
        }
        fv = (fv + currentSIP) * (1 + monthlyRate);
      }
      
      if (fv >= remainingTarget) {
        bestSIP = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    
    return Math.ceil(bestSIP);
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
      currentGoal.currentSavings || 0,
      currentGoal.stepUpEnabled || false,
      currentGoal.stepUpPercent || 10
    );
  }, [adjustedTarget, currentGoal.timeHorizon, currentGoal.expectedReturn, currentGoal.currentSavings, currentGoal.stepUpEnabled, currentGoal.stepUpPercent]);

  const { totalInvestment, expectedCorpus } = useMemo(() => {
    const months = (currentGoal.timeHorizon || 10) * 12;
    const monthlyRate = (currentGoal.expectedReturn || 12) / 12 / 100;
    const stepUpEnabled = currentGoal.stepUpEnabled || false;
    const stepUpPercent = currentGoal.stepUpPercent || 10;
    
    // FV of current savings
    const fvSavings = (currentGoal.currentSavings || 0) * Math.pow(1 + (currentGoal.expectedReturn || 12) / 100, currentGoal.timeHorizon || 10);
    
    let totalInvested = currentGoal.currentSavings || 0;
    let fvSIP = 0;
    let currentSIP = sipRequired;
    
    for (let month = 1; month <= months; month++) {
      if (stepUpEnabled && month > 1 && (month - 1) % 12 === 0) {
        currentSIP = currentSIP * (1 + stepUpPercent / 100);
      }
      totalInvested += currentSIP;
      fvSIP = (fvSIP + currentSIP) * (1 + monthlyRate);
    }
    
    return {
      totalInvestment: Math.round(totalInvested),
      expectedCorpus: Math.round(fvSavings + fvSIP)
    };
  }, [sipRequired, currentGoal.timeHorizon, currentGoal.expectedReturn, currentGoal.currentSavings, currentGoal.stepUpEnabled, currentGoal.stepUpPercent]);

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

  const handleExpectedReturnChange = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 1), 30);
    setCurrentGoal({
      ...currentGoal,
      expectedReturn: clampedValue,
    });
  };

  const handleNumericInput = (field: keyof Goal, value: string, min: number, max: number, allowLakh: boolean = false) => {
    // Allow empty input for user-friendly editing
    if (value === '' || value === '₹') {
      setCurrentGoal({ ...currentGoal, [field]: 0 });
      return;
    }
    
    const numValue = allowLakh ? parseInputValue(value) : parseFloat(value.replace(/[^\d.]/g, ''));
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, min), max);
      setCurrentGoal({ ...currentGoal, [field]: clampedValue });
    }
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
      stepUpEnabled: currentGoal.stepUpEnabled || false,
      stepUpPercent: currentGoal.stepUpPercent || 10,
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
      stepUpEnabled: false,
      stepUpPercent: 10,
    });
    setSelectedGoalType(null);
    setEditingGoalId(null);
    setStep('select');
  };

  const totalMonthlySIP = goals.reduce((sum, goal) => {
    return sum + calculateSIPRequired(goal.targetAmount, goal.timeHorizon, goal.expectedReturn, goal.currentSavings, goal.stepUpEnabled, goal.stepUpPercent);
  }, 0);

  const getGoalIcon = (typeId: string) => {
    const type = goalTypes.find(g => g.id === typeId);
    return type?.emoji || '🎯';
  };

  const getRecommendedFunds = (years: number, riskProfile: string) => {
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
      // Long-term recommendations based on risk profile
      if (riskProfile === 'conservative') {
        return {
          category: 'Long-term (> 5 years)',
          recommendation: 'Low-cost passive investing',
          funds: ['Nifty 50 Index Fund', 'Sensex Index Fund', 'Large Cap Funds', 'Nifty Next 50 Index Fund'],
          reason: 'Index funds offer low-cost, diversified exposure ideal for conservative long-term investors'
        };
      } else if (riskProfile === 'aggressive') {
        return {
          category: 'Long-term (> 5 years)',
          recommendation: 'Growth-focused',
          funds: ['Flexi Cap Funds', 'Mid Cap Funds', 'Small Cap Funds', 'Nifty Midcap 150 Index Fund'],
          reason: 'Higher growth potential with mix of active and passive options'
        };
      }
      return {
        category: 'Long-term (> 5 years)',
        recommendation: 'Balanced equity exposure',
        funds: ['Nifty 50 Index Fund', 'Flexi Cap Funds', 'Large & Mid Cap Funds', 'Multi Cap Funds'],
        reason: 'Diversified equity exposure with index funds for cost-efficiency'
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
                      const sip = calculateSIPRequired(goal.targetAmount, goal.timeHorizon, goal.expectedReturn, goal.currentSavings, goal.stepUpEnabled, goal.stepUpPercent);
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
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Target Amount {currentGoal.inflationAdjusted && <span className="text-xs text-muted-foreground">(in today's value)</span>}
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">₹</span>
                        <Input
                          type="text"
                          value={formatInputValue(currentGoal.targetAmount || 0)}
                          onChange={(e) => handleNumericInput('targetAmount', e.target.value, 50000, 100000000, true)}
                          className="w-32 h-8 text-right font-semibold text-primary"
                        />
                      </div>
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
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">Inflation Rate</span>
                          <div className="flex items-center gap-1">
                            <Input
                              type="text"
                              value={currentGoal.inflationRate || ''}
                              onChange={(e) => handleNumericInput('inflationRate', e.target.value, 1, 15)}
                              className="w-16 h-7 text-right text-sm font-medium"
                            />
                            <span className="text-sm">%</span>
                          </div>
                        </div>
                        <Slider
                          value={[currentGoal.inflationRate || 6]}
                          onValueChange={(v) => setCurrentGoal({ ...currentGoal, inflationRate: v[0] })}
                          min={1}
                          max={15}
                          step={0.5}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1%</span>
                          <span>15%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          <span className="font-medium">{formatCurrency(currentGoal.targetAmount || 0)}</span> today =
                          <span className="font-medium text-warning-amber"> {formatCurrency(adjustedTarget)}</span> in {currentGoal.timeHorizon} years
                        </p>
                      </>
                    )}
                  </div>

                  {/* Time Horizon */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time Horizon
                      </Label>
                      <div className="flex items-center gap-1">
                        <Input
                          type="text"
                          value={currentGoal.timeHorizon || ''}
                          onChange={(e) => handleNumericInput('timeHorizon', e.target.value, 1, 40)}
                          className="w-16 h-8 text-right font-semibold text-primary"
                        />
                        <span className="text-sm text-muted-foreground">Years</span>
                      </div>
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
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Current Savings (if any)
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">₹</span>
                        <Input
                          type="text"
                          value={formatInputValue(currentGoal.currentSavings || 0)}
                          onChange={(e) => handleNumericInput('currentSavings', e.target.value, 0, 100000000, true)}
                          className="w-32 h-8 text-right font-semibold"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[currentGoal.currentSavings || 0]}
                      onValueChange={(v) => setCurrentGoal({ ...currentGoal, currentSavings: v[0] })}
                      min={0}
                      max={Math.min(currentGoal.targetAmount || 1000000, 10000000)}
                      step={10000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹0</span>
                      <span>{formatCurrency(Math.min(currentGoal.targetAmount || 1000000, 10000000))}</span>
                    </div>
                  </div>

                  {/* Expected Annual Return */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Expected Annual Return
                      </Label>
                      <div className="flex items-center gap-1">
                        <Input
                          type="text"
                          value={currentGoal.expectedReturn || ''}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : parseFloat(e.target.value.replace(/[^\d.]/g, '')) || 0;
                            handleExpectedReturnChange(val);
                          }}
                          className="w-16 h-8 text-right font-semibold text-primary"
                        />
                        <span className="text-sm">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[currentGoal.expectedReturn || 12]}
                      onValueChange={(v) => handleExpectedReturnChange(v[0])}
                      min={1}
                      max={30}
                      step={0.5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                    {/* Quick Presets */}
                    <div className="flex gap-2">
                      {returnPresets.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => handleExpectedReturnChange(preset.value)}
                          className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${
                            currentGoal.expectedReturn === preset.value
                              ? 'border-primary bg-primary/10 text-primary font-medium'
                              : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <div className="font-medium">{preset.label}</div>
                          <div className="text-xs text-muted-foreground">{preset.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step-up SIP */}
                  <div className="p-4 bg-accent/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        Enable Step-up SIP
                      </Label>
                      <Switch
                        checked={currentGoal.stepUpEnabled}
                        onCheckedChange={(checked) => setCurrentGoal({ ...currentGoal, stepUpEnabled: checked })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Increase your SIP annually with salary increments to reach goals faster
                    </p>
                    {currentGoal.stepUpEnabled && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">Annual SIP Increase</span>
                          <div className="flex items-center gap-1">
                            <Input
                              type="text"
                              value={currentGoal.stepUpPercent || ''}
                              onChange={(e) => handleNumericInput('stepUpPercent', e.target.value, 1, 50)}
                              className="w-16 h-7 text-right text-sm font-medium text-secondary"
                            />
                            <span className="text-sm">%</span>
                          </div>
                        </div>
                        <Slider
                          value={[currentGoal.stepUpPercent || 10]}
                          onValueChange={(v) => setCurrentGoal({ ...currentGoal, stepUpPercent: v[0] })}
                          min={1}
                          max={50}
                          step={1}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1%</span>
                          <span>50%</span>
                        </div>
                      </div>
                    )}
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
                  const recommendation = getRecommendedFunds(goal.timeHorizon, goal.riskProfile);
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
  return <GoalPlannerContent />;
}
