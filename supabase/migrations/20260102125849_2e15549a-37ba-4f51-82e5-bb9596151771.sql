-- Make user_activity table immutable for regular users (audit log protection)
-- Deny UPDATE for all users (audit logs should never be modified)
CREATE POLICY "Deny activity updates"
ON public.user_activity FOR UPDATE
TO authenticated
USING (false);

-- Only allow admins to delete activity (for compliance/cleanup purposes only)
CREATE POLICY "Only admins can delete activity"
ON public.user_activity FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));