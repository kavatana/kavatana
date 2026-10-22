CREATE TABLE raw_objects (
 sha256 TEXT PRIMARY KEY CHECK(length(sha256)=64), bytes INTEGER NOT NULL CHECK(bytes>0),
 object_key TEXT NOT NULL UNIQUE, stored_at TEXT NOT NULL
);
CREATE TABLE ingestion_jobs (
 id TEXT PRIMARY KEY, fingerprint TEXT NOT NULL UNIQUE CHECK(length(fingerprint)=64),
 dataset_id TEXT NOT NULL CHECK(dataset_id='OSD-569'), namespace TEXT NOT NULL CHECK(namespace='RESEARCH:OSD-569'),
 snapshot_id TEXT NOT NULL, parser_version TEXT NOT NULL, completed_at TEXT NOT NULL,
 manifest_json TEXT NOT NULL CHECK(json_valid(manifest_json)), summary_json TEXT NOT NULL CHECK(json_valid(summary_json))
);
CREATE TABLE job_files (
 job_id TEXT NOT NULL REFERENCES ingestion_jobs(id), role TEXT NOT NULL CHECK(role IN ('submitted','transformed')),
 sha256 TEXT NOT NULL REFERENCES raw_objects(sha256), filename TEXT NOT NULL, source_url TEXT NOT NULL,
 PRIMARY KEY(job_id,role), UNIQUE(job_id,sha256)
);
CREATE TABLE research_observations (
 job_id TEXT NOT NULL REFERENCES ingestion_jobs(id), id TEXT NOT NULL,
 source_sha256 TEXT NOT NULL REFERENCES raw_objects(sha256), source_row INTEGER NOT NULL CHECK(source_row>=2),
 namespace TEXT NOT NULL CHECK(namespace='RESEARCH:OSD-569'), subject_id TEXT NOT NULL CHECK(subject_id GLOB 'C[0-9][0-9][0-9]'),
 analyte TEXT NOT NULL, relative_time TEXT NOT NULL, raw_value TEXT NOT NULL, unit TEXT NOT NULL,
 document_json TEXT NOT NULL CHECK(json_valid(document_json)),
 PRIMARY KEY(job_id,id), UNIQUE(job_id,source_row)
);
CREATE TABLE quality_issues (
 job_id TEXT NOT NULL REFERENCES ingestion_jobs(id), issue_id INTEGER NOT NULL,
 kind TEXT NOT NULL CHECK(kind IN ('unit_conflict','structural_quarantine')),
 source_row INTEGER NOT NULL CHECK(source_row>=2), document_json TEXT NOT NULL CHECK(json_valid(document_json)),
 PRIMARY KEY(job_id,issue_id)
);
CREATE TABLE ingestion_attempts (
 id TEXT PRIMARY KEY, job_id TEXT REFERENCES ingestion_jobs(id), attempted_at TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('accepted','replayed','rejected')),
 code TEXT NOT NULL, detail_json TEXT NOT NULL CHECK(json_valid(detail_json))
);
CREATE INDEX research_series ON research_observations(job_id,subject_id,analyte,source_row);
CREATE INDEX research_paging ON research_observations(job_id,source_row);
CREATE INDEX issues_paging ON quality_issues(job_id,issue_id);
CREATE INDEX attempts_time ON ingestion_attempts(attempted_at DESC,id);
CREATE TRIGGER raw_objects_immutable_update BEFORE UPDATE ON raw_objects BEGIN SELECT RAISE(ABORT,'raw object registry is immutable'); END;
CREATE TRIGGER raw_objects_immutable_delete BEFORE DELETE ON raw_objects BEGIN SELECT RAISE(ABORT,'raw object registry is immutable'); END;
CREATE TRIGGER jobs_immutable_update BEFORE UPDATE ON ingestion_jobs BEGIN SELECT RAISE(ABORT,'research jobs are immutable'); END;
CREATE TRIGGER jobs_immutable_delete BEFORE DELETE ON ingestion_jobs BEGIN SELECT RAISE(ABORT,'research jobs are immutable'); END;
CREATE TRIGGER files_immutable_update BEFORE UPDATE ON job_files BEGIN SELECT RAISE(ABORT,'research file links are immutable'); END;
CREATE TRIGGER files_immutable_delete BEFORE DELETE ON job_files BEGIN SELECT RAISE(ABORT,'research file links are immutable'); END;
CREATE TRIGGER research_immutable_update BEFORE UPDATE ON research_observations BEGIN SELECT RAISE(ABORT,'research rows are immutable'); END;
CREATE TRIGGER research_immutable_delete BEFORE DELETE ON research_observations BEGIN SELECT RAISE(ABORT,'research rows are immutable'); END;
CREATE TRIGGER issues_immutable_update BEFORE UPDATE ON quality_issues BEGIN SELECT RAISE(ABORT,'research issues are immutable'); END;
CREATE TRIGGER issues_immutable_delete BEFORE DELETE ON quality_issues BEGIN SELECT RAISE(ABORT,'research issues are immutable'); END;
CREATE TRIGGER attempts_immutable_update BEFORE UPDATE ON ingestion_attempts BEGIN SELECT RAISE(ABORT,'research attempts are immutable'); END;
CREATE TRIGGER attempts_immutable_delete BEFORE DELETE ON ingestion_attempts BEGIN SELECT RAISE(ABORT,'research attempts are immutable'); END;
