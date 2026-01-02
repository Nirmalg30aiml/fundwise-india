-- Add UPDATE policy for admin_users table to allow admins to modify admin records
CREATE POLICY "Admins can update admin users"
ON public.admin_users FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));