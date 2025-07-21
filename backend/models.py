from sqlalchemy import Table, Column, String,Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import metadata

video_links = Table(
    "video_links",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("video_url", String, nullable=False, unique=True),
    Column("name", String, nullable=True),
    Column("title", String, nullable=True),
    Column("hosts", String, nullable=True),
    Column("topic", String, nullable=True),
    Column("img_url", String,nullable=True),
    Column("summary", String,nullable=True),
    Column("transcript", String,nullable=True),
    Column("has_vid", Boolean, nullable=False, default=False)
)


