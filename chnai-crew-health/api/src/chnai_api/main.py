"""Same-origin local API and web host. Fictional identities only."""
from contextlib import asynccontextmanager
import os
from pathlib import Path
import sqlite3
from typing import Annotated, Literal
from urllib.parse import urlsplit
from fastapi import FastAPI, Header, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.trustedhost import TrustedHostMiddleware
from .engine import ROOT, DomainError
from .models import CommandRequest
from .store import Store

Actor = Literal['crew', 'primary', 'backup', 'ground', 'technical']

def create_app(db_path=None):
    database = Path(db_path or os.environ.get('CHNAI_DB', ROOT / '.runtime/chnai.sqlite3'))

    @asynccontextmanager
    async def lifespan(app):
        app.state.store = Store(database)
        yield

    app = FastAPI(
        title='CHNAI local simulation API', version='0.7.1', lifespan=lifespan,
        description='Fictional actors and measurements only. X-CHNAI-Actor is a demo selector, not authentication. One local API owns SQLite.',
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
        status = 403 if error.code in ['forbidden', 'ownership_required'] else 503 if error.code in ['engine_unavailable', 'node_offline', 'lan_offline'] else 409 if error.code in ['version_conflict', 'idempotency_conflict', 'stale', 'hash_conflict', 'immutable_conflict'] else 422
        return JSONResponse({'error': {'code': error.code, 'message': error.message}}, status_code=status)

    @app.exception_handler(sqlite3.OperationalError)
    async def database_error(_request, _error):
        return JSONResponse({'error': {'code': 'storage_unavailable', 'message': 'Local storage is busy or unavailable. Retry the exact command key.'}}, status_code=503)

    @app.get('/api/health')
    def health():
        return {'status': 'ready', 'mode': 'fictional_local_simulation', 'version': '0.7.1'}

    @app.get('/api/workspace')
    def workspace(x_chnai_actor: Annotated[Actor, Header()]):
        return app.state.store.view(x_chnai_actor)

    @app.post('/api/commands')
    def command(body: CommandRequest, x_chnai_actor: Annotated[Actor, Header()]):
        return app.state.store.command(x_chnai_actor, body)

    @app.get('/', include_in_schema=False)
    def index():
        return FileResponse(ROOT / 'dist/local.html')

    app.mount('/', StaticFiles(directory=ROOT / 'dist', check_dir=False), name='web')
    return app
