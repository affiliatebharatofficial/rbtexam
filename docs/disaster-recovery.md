# Disaster Recovery & Data Preservation Plan

## 1. RPO & RTO Targets
- **Recovery Point Objective (RPO)**: < 5 minutes (Continuous Supabase Point-in-Time Recovery - PITR).
- **Recovery Time Objective (RTO)**: < 15 minutes.

## 2. Backup & Restore Procedures
- PostgreSQL automated daily snapshots + WAL archiving.
- Multi-region object storage replication for assets & PDF documents.
- Emergency restore runbook defined in [backup-restore.md](file:///g:/RBT/docs/backup-restore.md).
