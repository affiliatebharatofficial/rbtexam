# Backup & Restore Strategy — RBT Practice Questions SaaS

## Purpose
Establishes automated daily backup schedules, point-in-time recovery (PITR), and data restoration procedures for enterprise data safety.

## Database Backup Schedule (Supabase Managed)
- **Daily Automated Snapshots**: Retained for 30 days (Pro Plan) / 90 days (Enterprise).
- **Point-in-Time Recovery (PITR)**: Enables granular restoration to any second within the past 7–30 days.

## Manual Database Backup Commands
```bash
# Export full database schema + data dump
pg_dump "postgres://postgres:[PASSWORD]@[HOST]:5432/postgres" > backup_$(date +%Y%m%d_%H%M%S).sql

# Export schema only
pg_dump --schema-only "postgres://postgres:[PASSWORD]@[HOST]:5432/postgres" > schema_backup.sql

# Restore dump to a fresh target database
psql "postgres://postgres:[PASSWORD]@[HOST]:5432/postgres" < backup_20260806.sql
```

## Restoration Verification Checklist
1. Create isolated staging database.
2. Restore dump file using `psql`.
3. Verify vector extension and `pgvector` indexes match source.
4. Execute `npm run test` against staging DB.
5. Update connection strings in Vercel.

## Related Files
- [database/migrations.sql](file:///g:/RBT/database/migrations.sql)
- [docs/disaster-recovery.md](file:///g:/RBT/docs/disaster-recovery.md)
