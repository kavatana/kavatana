"""Temporary process boundary to the tested JS engine; see ADR-007."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

class DomainError(Exception):
    def __init__(self, code: str, message: str):
        self.code, self.message = code, message
        super().__init__(message)

def call_engine(operation: str, **kwargs) -> dict:
    try:
        result = subprocess.run(
            ['node', str(ROOT / 'scripts/domain-bridge.mjs')],
            input=json.dumps({'operation': operation, **kwargs}),
            text=True, capture_output=True, timeout=5, check=True,
        )
        output = json.loads(result.stdout)
    except (subprocess.SubprocessError, OSError, ValueError) as exc:
        raise DomainError('engine_unavailable', 'The local rule engine is unavailable. No change was committed.') from exc
    if not output['ok']:
        raise DomainError(output['error']['code'], output['error']['message'])
    return output
