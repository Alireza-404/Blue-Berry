import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://svdclvycbhhkygbhingb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZGNsdnljYmhoa3lnYmhpbmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5OTgxOTYsImV4cCI6MjA5NjU3NDE5Nn0.1QbSVn0WC745DSYGO-mA0nt4z_7JQQMRdw7W02Q0MRo";

export const supabase = createClient(supabaseUrl, supabaseKey);
