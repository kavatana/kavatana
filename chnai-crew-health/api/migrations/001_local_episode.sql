CREATE TABLE subjects (id TEXT PRIMARY KEY, namespace TEXT NOT NULL CHECK(namespace='SIM-CHNAI-01'));
CREATE TABLE actors (id TEXT PRIMARY KEY, role TEXT NOT NULL);
CREATE TABLE source_references (id TEXT PRIMARY KEY, url TEXT NOT NULL, applicability TEXT NOT NULL);
CREATE TABLE workspaces (
 id TEXT PRIMARY KEY CHECK(id='assessment-day'), version INTEGER NOT NULL CHECK(version>=0),
 state_json TEXT NOT NULL CHECK(json_valid(state_json)), updated_at TEXT NOT NULL
);
CREATE TABLE observations (
 id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES subjects(id),
 kind TEXT NOT NULL CHECK(kind IN ('baseline','current')), revision INTEGER NOT NULL CHECK(revision>0),
 value_text TEXT NOT NULL, unit TEXT NOT NULL, method TEXT NOT NULL, time_basis TEXT NOT NULL,
 supersedes TEXT REFERENCES observations(id), document_json TEXT NOT NULL CHECK(json_valid(document_json)),
 UNIQUE(subject_id, kind, revision)
);
CREATE TRIGGER observations_no_update BEFORE UPDATE ON observations BEGIN SELECT RAISE(ABORT,'observations are immutable'); END;
CREATE TRIGGER observations_no_delete BEFORE DELETE ON observations BEGIN SELECT RAISE(ABORT,'observations are immutable'); END;
CREATE TABLE episodes (
 id TEXT PRIMARY KEY, subject_id TEXT NOT NULL UNIQUE REFERENCES subjects(id),
 owner_id TEXT REFERENCES actors(id), state TEXT NOT NULL, document_json TEXT NOT NULL CHECK(json_valid(document_json))
);
CREATE TABLE followups (
 id TEXT PRIMARY KEY, episode_id TEXT NOT NULL REFERENCES episodes(id), owner_id TEXT NOT NULL REFERENCES actors(id),
 state TEXT NOT NULL CHECK(state IN ('pending','complete')), document_json TEXT NOT NULL CHECK(json_valid(document_json))
);
CREATE TABLE packet_drafts (
 id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES subjects(id), stale INTEGER NOT NULL CHECK(stale IN (0,1)),
 released INTEGER NOT NULL CHECK(released IN (0,1)), document_json TEXT NOT NULL CHECK(json_valid(document_json))
);
CREATE TABLE packets (
 id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES subjects(id), payload_bytes TEXT NOT NULL,
 sha256 TEXT NOT NULL CHECK(length(sha256)=64), approved_by TEXT NOT NULL REFERENCES actors(id), approved_at TEXT NOT NULL
);
CREATE TRIGGER packets_no_update BEFORE UPDATE ON packets BEGIN SELECT RAISE(ABORT,'approved packets are immutable'); END;
CREATE TRIGGER packets_no_delete BEFORE DELETE ON packets BEGIN SELECT RAISE(ABORT,'approved packets are immutable'); END;
CREATE TABLE outbox (
 packet_id TEXT PRIMARY KEY REFERENCES packets(id), state TEXT NOT NULL CHECK(state IN ('queued','received')),
 attempts INTEGER NOT NULL CHECK(attempts>=0), historical INTEGER NOT NULL CHECK(historical IN (0,1))
);
CREATE TABLE ground_receipts (
 packet_id TEXT PRIMARY KEY REFERENCES packets(id), sha256 TEXT NOT NULL, document_json TEXT NOT NULL CHECK(json_valid(document_json))
);
CREATE TABLE ground_reviews (
 packet_id TEXT PRIMARY KEY REFERENCES packets(id), actor_id TEXT NOT NULL REFERENCES actors(id), document_json TEXT NOT NULL CHECK(json_valid(document_json))
);
CREATE TABLE audit_events (
 id TEXT PRIMARY KEY, subject_id TEXT REFERENCES subjects(id), actor_id TEXT NOT NULL REFERENCES actors(id),
 code TEXT NOT NULL, document_json TEXT NOT NULL CHECK(json_valid(document_json))
);
CREATE TRIGGER audit_no_update BEFORE UPDATE ON audit_events BEGIN SELECT RAISE(ABORT,'audit events are immutable'); END;
CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit_events BEGIN SELECT RAISE(ABORT,'audit events are immutable'); END;
CREATE TABLE command_receipts (
 actor_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, request_sha256 TEXT NOT NULL,
 committed_version INTEGER NOT NULL, command_name TEXT NOT NULL, committed_at TEXT NOT NULL,
 PRIMARY KEY(actor_key,idempotency_key)
);
CREATE INDEX observation_subject_revision ON observations(subject_id,kind,revision DESC);
CREATE INDEX pending_followup_owner ON followups(owner_id,state);
CREATE INDEX outbox_pending ON outbox(state,packet_id);
