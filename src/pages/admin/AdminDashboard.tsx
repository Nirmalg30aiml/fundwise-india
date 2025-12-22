import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, 
  Users, 
  Activity,
  Calendar,
  Search,
  UserPlus,
  Trash2,
  TrendingUp,
  Clock,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  phone_number: string;
  role: string;
  created_at: string;
}

interface ProfileData {
  id: string;
  phone_number: string | null;
  created_at: string | null;
  last_login: string | null;
  login_count: number | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [users, setUsers] = useState<ProfileData[]>([]);
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdmins();
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchAdmins = async () => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setAdmins(data);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (!error && data) {
      setUsers(data);
    }
  };

  const addAdmin = async () => {
    if (!newAdminPhone || !newAdminPhone.match(/^\+91[6-9]\d{9}$/)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid Indian mobile number with +91",
        variant: "destructive"
      });
      return;
    }

    setIsAddingAdmin(true);
    
    const { error } = await supabase
      .from('admin_users')
      .insert({
        phone_number: newAdminPhone,
        role: 'admin'
      });

    setIsAddingAdmin(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({ title: "Admin Added Successfully" });
      setNewAdminPhone('');
      fetchAdmins();
    }
  };

  const removeAdmin = async (id: string, phone: string) => {
    if (phone === '+919876543210') {
      toast({
        title: "Cannot Remove",
        description: "Super admin cannot be removed.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({ title: "Admin Removed" });
      fetchAdmins();
    }
  };

  const maskPhone = (phone: string | null) => {
    if (!phone) return 'N/A';
    return phone.replace(/(\+91)(\d{3})(\d{3})(\d{4})/, '$1-XXX-XXX-$4');
  };

  const filteredUsers = users.filter(u => 
    u.phone_number?.includes(searchQuery) || 
    u.id.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <section className="py-8 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Manage users and monitor platform activity</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <div className="text-sm text-muted-foreground">Total Users</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{admins.length}</div>
                  <div className="text-sm text-muted-foreground">Admins</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-info-cyan/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-info-cyan" />
                </div>
                <div>
                  <div className="text-2xl font-bold">--</div>
                  <div className="text-sm text-muted-foreground">Active Today</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-warning-amber/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning-amber" />
                </div>
                <div>
                  <div className="text-2xl font-bold">--</div>
                  <div className="text-sm text-muted-foreground">Avg Session</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Admin Management */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Admin Management
                </h2>

                {/* Add Admin */}
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="+91 phone number"
                    value={newAdminPhone}
                    onChange={(e) => setNewAdminPhone(e.target.value)}
                  />
                  <Button 
                    onClick={addAdmin} 
                    disabled={isAddingAdmin}
                    size="icon"
                  >
                    <UserPlus className="w-5 h-5" />
                  </Button>
                </div>

                {/* Admin List */}
                <div className="space-y-3">
                  {admins.map(admin => (
                    <div 
                      key={admin.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">{admin.phone_number}</div>
                        <div className="text-xs text-muted-foreground">{admin.role}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAdmin(admin.id, admin.phone_number)}
                        disabled={admin.phone_number === '+919876543210'}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Registered Users
                  </h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Registered</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Login</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Logins</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 px-4 text-sm">{maskPhone(u.phone_number)}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString('en-IN') : 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {u.last_login ? new Date(u.last_login).toLocaleString('en-IN') : 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-sm">{u.login_count || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No users found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
