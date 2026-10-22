"""Versioned commands: callers cannot submit arbitrary state or actor grants."""
from typing import Annotated, Literal, Union
from pydantic import BaseModel, ConfigDict, Field

Text500 = Annotated[str, Field(min_length=1, max_length=500)]
Text1000 = Annotated[str, Field(min_length=1, max_length=1000)]
Identifier = Annotated[str, Field(min_length=1, max_length=100)]
Dependency = Annotated[str, Field(min_length=1, max_length=1000)]

class StrictModel(BaseModel):
    model_config = ConfigDict(extra='forbid', strict=True)

class Import(StrictModel):
    name: Literal['fixture.import']
class Request(StrictModel):
    name: Literal['review.request']
class Offer(StrictModel):
    name: Literal['assignment.offer']
    to: Literal['SIM-A02', 'SIM-A06']
    reason: Text500
class Accept(StrictModel):
    name: Literal['assignment.accept']
    assignmentId: Identifier
    expectedDependency: Dependency
class Review(StrictModel):
    name: Literal['review.record']
    note: Text1000
    trigger: Annotated[str, Field(min_length=1, max_length=300)]
    expectedDependency: Dependency
class Correct(StrictModel):
    name: Literal['assessment.correct']
    value: Annotated[str, Field(pattern=r'^\d{1,9}(\.\d{1,9})?$')]
    unit: Literal['mL/min/kg', 'L/min']
    reason: Text1000
    expectedCurrentId: Identifier
class Preview(StrictModel):
    name: Literal['packet.preview']
    question: Annotated[str, Field(max_length=500)] = ''
    includeNote: bool = True
class Approve(StrictModel):
    name: Literal['packet.approve']
    draftId: Identifier
    expectedHash: Annotated[str, Field(pattern=r'^[a-f0-9]{64}$')]
class Deliver(StrictModel):
    name: Literal['packet.deliver']
    packetId: Identifier
class GroundReview(StrictModel):
    name: Literal['ground.review']
    packetId: Identifier
    note: Text1000
class Complete(StrictModel):
    name: Literal['followup.complete']
    followupId: Identifier
    outcome: Text1000
class Duty(StrictModel):
    name: Literal['duty.set']
    reviewerId: Literal['SIM-A02', 'SIM-A06']
    available: bool
class Link(StrictModel):
    name: Literal['link.set']
    link: Literal['earth', 'lan', 'node', 'grant']
    available: bool
class Step(StrictModel):
    name: Literal['scenario.step']
    seconds: Annotated[int, Field(ge=1, le=300)] = 15

Command = Annotated[Union[Import, Request, Offer, Accept, Review, Correct, Preview, Approve, Deliver, GroundReview, Complete, Duty, Link, Step], Field(discriminator='name')]

class CommandRequest(StrictModel):
    expectedVersion: Annotated[int, Field(ge=0)]
    idempotencyKey: Annotated[str, Field(pattern=r'^[a-zA-Z0-9_-]{16,100}$')]
    command: Command

class ResearchImportRequest(StrictModel):
    datasetId: Literal['OSD-569']
    snapshotId: Literal['retained-cbc-2026-10-21']
