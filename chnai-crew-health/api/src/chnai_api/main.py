"""Same-origin local API and web host. Fictional identities only."""
from contextlib import asynccontextmanager
import os
from pathlib import Path
import sqlite3
from threading import Lock
from typing import Annotated, Literal
from urllib.parse import urlsplit
from fastapi import FastAPI, Header, Request, Query, Path as ApiPath
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.trustedhost import TrustedHostMiddleware
from .engine import ROOT, DomainError
from .models import CommandRequest, ResearchImportRequest
from .store import Store
from .research import ResearchStore

Actor = Literal['crew', 'primary', 'backup', 'ground', 'technical']

def create_app(db_path=None, research_directory=None, research_assets=None):
    database = Path(db_path or os.environ.get('CHNAI_DB', ROOT / '.runtime/chnai.sqlite3'))
    research_directory = research_directory or database.parent / (database.stem + '.research')
    if (Path(research_directory) / 'research.sqlite3').resolve() == database.resolve():
        raise ValueError('Research and crew databases must have separate paths.')

    @asynccontextmanager
    async def lifespan(app):
        app.state.store = Store(database)
        app.state.research = None
        app.state.research_lock = Lock()
        yield

    app = FastAPI(
        title='CHNAI local simulation API', version='0.8.0', lifespan=lifespan,
        description='Fictional crew workflow plus a separate retained public-research registry. X-CHNAI-Actor is a demo selector, not authentication. Crew and research use distinct SQLite databases.',
        openapi_url='/api/openapi.json', docs_url=None, redoc_url=None,
    )
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=['localhost', '127.0.0.1', '[::1]', 'terminal.local', 'testserver'])

    @app.middleware('http')
    async def local_boundary(request: Request, call_next):
        if request.url.path.startswith('/api/'):
            origin = request.headers.get('origin')
            if origin and urlsplit(origin).netloc != request.headers.get('host'):
                return JSONResponse({'error': {'code': 'cross_origin', 'message': 'Use the local application origin.'}}, status_code=403)
            if request.method == 'POST' and request.headers.get('x-chnai-request') != 'local-simulation':
                return JSONResponse({'error': {'code': 'request_context', 'message': 'The local simulation request header is required.'}}, status_code=403)
            if int(request.headers.get('content-length', '0')) > 32768:
                return JSONResponse({'error': {'code': 'too_large', 'message': 'Command exceeds 32 KiB.'}}, status_code=413)
        response = await call_next(request)
        response.headers['Cache-Control'] = 'no-store'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Referrer-Policy'] = 'no-referrer'
        response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'"
        return response

    @app.exception_handler(DomainError)
    async def domain_error(_request, error):
        status = 404 if error.code == 'research_not_found' else 403 if error.code in ['forbidden', 'ownership_required'] else 503 if error.code in ['engine_unavailable', 'node_offline', 'lan_offline', 'research_parser_unavailable', 'research_storage_unavailable'] else 409 if error.code in ['version_conflict', 'idempotency_conflict', 'stale', 'hash_conflict', 'immutable_conflict', 'research_source_mismatch', 'research_object_corrupt'] else 422
        return JSONResponse({'error': {'code': error.code, 'message': error.message,
            **({'attemptId': error.attempt_id} if hasattr(error, 'attempt_id') else {})}}, status_code=status)

    @app.exception_handler(sqlite3.OperationalError)
    async def database_error(_request, _error):
        return JSONResponse({'error': {'code': 'storage_unavailable', 'message': 'Local storage is busy or unavailable. Retry the exact command key.'}}, status_code=503)

    @app.get('/api/health')
    def health():
        return {'status': 'ready', 'mode': 'fictional_local_simulation', 'version': '0.8.0'}

    @app.get('/api/workspace')
    def workspace(x_chnai_actor: Annotated[Actor, Header()]):
        return app.state.store.view(x_chnai_actor)

    @app.post('/api/commands')
    def command(body: CommandRequest, x_chnai_actor: Annotated[Actor, Header()]):
        return app.state.store.command(x_chnai_actor, body)

    def research_actor(actor):
        if actor != 'technical':
            raise DomainError('forbidden', 'Use the separate engineering research workspace for public dataset inspection.')
        with app.state.research_lock:
            if app.state.research is None:
                try:
                    app.state.research = ResearchStore(research_directory, assets=research_assets)
                except (sqlite3.Error, OSError, RuntimeError) as exc:
                    raise DomainError('research_storage_unavailable', 'The research registry is unavailable. The crew database remains separate.') from exc
        return app.state.research

    @app.get('/api/research')
    def research_overview(x_chnai_actor: Annotated[Actor, Header()]):
        return research_actor(x_chnai_actor).overview()

    @app.post('/api/research/imports')
    def research_import(body: ResearchImportRequest, x_chnai_actor: Annotated[Actor, Header()]):
        return research_actor(x_chnai_actor).import_retained()

    @app.get('/api/research/imports/{job_id}')
    def research_manifest(job_id: Annotated[str, ApiPath(pattern=r'^RI-[a-f0-9]{64}$')], x_chnai_actor: Annotated[Actor, Header()]):
        return research_actor(x_chnai_actor).job(job_id)

    @app.get('/api/research/imports/{job_id}/observations')
    def research_observations(job_id: Annotated[str, ApiPath(pattern=r'^RI-[a-f0-9]{64}$')],
        x_chnai_actor: Annotated[Actor, Header()],
        subject: Annotated[str | None, Query(pattern=r'^C[0-9]{3}$')] = None,
        analyte: Annotated[str | None, Query(min_length=1, max_length=200)] = None,
        after: Annotated[int, Query(ge=0)] = 0, limit: Annotated[int, Query(ge=1, le=100)] = 50):
        return research_actor(x_chnai_actor).observations(job_id, subject=subject, analyte=analyte, after=after, limit=limit)

    @app.get('/api/research/imports/{job_id}/issues')
    def research_issues(job_id: Annotated[str, ApiPath(pattern=r'^RI-[a-f0-9]{64}$')],
        x_chnai_actor: Annotated[Actor, Header()],
        after: Annotated[int, Query(ge=0)] = 0, limit: Annotated[int, Query(ge=1, le=100)] = 50):
        return research_actor(x_chnai_actor).issues(job_id, after=after, limit=limit)

    @app.get('/', include_in_schema=False)
    def index():
        return FileResponse(ROOT / 'dist/local.html')

    app.mount('/', StaticFiles(directory=ROOT / 'dist', check_dir=False), name='web')
    return app
