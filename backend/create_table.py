from sqlalchemy import create_engine
from models import metadata
from database import DATABASE_URL
import os
URL = os.getenv('DATABASE_URL')
engine = create_engine(URL)
metadata.create_all(engine)